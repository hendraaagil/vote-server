const Result = require('../models/Result');

module.exports.send_result = async (req, res) => {
  const { username, fullName, candidateNumber } = req.body;

  try {
    const result = await Result.create({
      username,
      fullName,
      candidateNumber,
    });
    res.status(201).json({ result: result._id });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

module.exports.get_result = async (req, res) => {
  try {
    const result = await Result.find();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};
