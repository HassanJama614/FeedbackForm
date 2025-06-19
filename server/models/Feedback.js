// server/models/Feedback.js
const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
  },
}, {
  // This adds `createdAt` and `updatedAt` fields automatically
  timestamps: true,
});

module.exports = mongoose.model('Feedback', FeedbackSchema);