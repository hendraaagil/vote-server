const User = require('../models/User');

const handleErrors = (err) => {
  let errors = { fullName: '', username: '', password: '' };

  if (err.message === 'incorrect username') {
    errors.username = 'Username tidak terdaftar';
  }

  if (err.message === 'incorrect password') {
    errors.password = 'Password salah';
  }

  if (err.code === 11000) {
    errors.username = 'Username sudah terdaftar';
    return errors;
  }

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.signup = async (req, res) => {
  const { username, password, fullName } = req.body;

  try {
    const user = await User.create({ username, password, fullName });
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

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.updateUserById = async (req, res) => {
  try {
    const user = await User.updateOne(
      { _id: req.params.userId },
      { $set: { voted: true } }
    );
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
