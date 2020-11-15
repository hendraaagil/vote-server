const User = require('../models/User');

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

module.exports.signup = async (req, res) => {
  const { username, password, fullName, voted } = req.body;

  try {
    const user = await User.create({ username, password, fullName, voted });
    res.status(201).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    res.status(200).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};
