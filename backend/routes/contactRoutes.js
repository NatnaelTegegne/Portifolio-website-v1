const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST a new message
// URL: http://localhost:5000/api/contact
router.post('/', async (req, res) => {
  try {
    const newMessage = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    });

    const savedMessage = await newMessage.save(); // Save to MongoDB
    res.status(201).json(savedMessage); // Send back the saved message as confirmation
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;