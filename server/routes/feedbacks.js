// server/routes/feedbacks.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// @route   POST /api/feedbacks
// @desc    Save a new feedback
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Simple server-side validation
    if (!name || !email || !message) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const newFeedback = new Feedback({
      name,
      email,
      message,
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback); // 201 Created status

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/feedbacks
// @desc    Get all feedbacks
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Find all feedbacks and sort by createdAt in descending order (-1)
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;