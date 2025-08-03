const mongoose = require('mongoose');

const internSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  referralCode: {
    type: String,
    required: true,
    unique: true
  },
  donationsRaised: {
    type: Number,
    default: 0
  },
  goal: {
    type: Number,
    default: 1000
  },
  joinedDate: {
    type: Date,
    default: Date.now
  },
  rewards: [{
    name: String,
    unlocked: Boolean,
    threshold: Number
  }]
});

module.exports = mongoose.model('Intern', internSchema);