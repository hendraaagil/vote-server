const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  leader: {
    type: String,
    required: true,
  },
  coLeader: {
    type: String,
    required: true,
  },
  photoLink: {
    type: String,
    required: true,
  },
  mainProgram: {
    type: String,
    required: true,
  },
  vision: {
    type: Array,
    required: true,
  },
  mission: {
    type: Array,
    required: true,
  },
});

const Candidate = mongoose.model('candidate', candidateSchema);

module.exports = Candidate;
