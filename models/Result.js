const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  candidateNumber: {
    type: Number,
    required: true,
  },
});

const Result = mongoose.model('result', resultSchema);

module.exports = Result;
