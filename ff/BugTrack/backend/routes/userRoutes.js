const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET developers
router.get('/developers', async (req, res) => {
  try {
    const developers = await User.find({ role: 'Developer' }).select('name email');
    res.json(developers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;