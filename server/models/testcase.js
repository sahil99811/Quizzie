const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  submissionId: {
    type: String,
    required: true
  },
  status: {
    type: String
  },
  time: {
    type: Number
  },
  memory: {
    type: Number
  },
  tokenId: {
    type: String
  },
  stdin:{
      type: String,
    
  },
  expectedOutput:{
      type: String
  },
  stdout:{
      type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('TestCase', testCaseSchema);
