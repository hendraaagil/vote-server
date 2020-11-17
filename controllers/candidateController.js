const Candidate = require('../models/Candidate');

module.exports.create = async (req, res) => {
  const {
    number,
    leader,
    coLeader,
    photoLink,
    mainProgram,
    vision,
    mission,
  } = req.body;

  try {
    const candidate = await Candidate.create({
      number,
      leader,
      coLeader,
      photoLink,
      mainProgram,
      vision,
      mission,
    });
    res.status(201).json({ candidate: candidate._id });
  } catch (error) {
    res.status(400).json({ errors: error });
  }
};

module.exports.getCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.find();
    res.status(201).json(candidate);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.candidateId);
    res.status(201).json(candidate);
  } catch (error) {
    res.status(400).json(error);
  }
};
