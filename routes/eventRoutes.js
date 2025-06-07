const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/User');
const authenticateToken = require('../middleware/authMiddleware');


router.post('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newEvent = new Event({
      title: req.body.title,
      location: req.body.location,
      date: req.body.date,
      description: req.body.description,
      userId: user._id
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create event', error: err.message });
  }
});


router.get('/my-events', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const events = await Event.find({ userId: user._id });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events', error: err.message });
  }
});

module.exports = router;
