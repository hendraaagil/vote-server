const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Handle errors
const handleErrors = (err) => {
  let errors = { username: '', password: '' };

  // Incorrect username
  if (err.message === 'incorrect username') {
    errors.username = 'That username is not registered';
  }

  // Incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // Duplicate error code
  if (err.code === 11000) {
    errors.username = 'That username is already registered';
    return errors;
  }

  // Validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;

// Create token
const createToken = (id) => {
  return jwt.sign({ id }, 'this is very secret', { expiresIn: maxAge });
};

module.exports.signup = async (req, res) => {
  const { username, password, fullName, role } = req.body;

  try {
    const user = await User.create({ username, password, fullName, role });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * maxAge });
    res.status(201).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // @ts-ignore
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * maxAge });
    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};
