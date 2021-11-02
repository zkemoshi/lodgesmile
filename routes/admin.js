const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Model
const User = require('../models/User');

// ***** Users CRUD ****

// @route   GET    api/attendants
// @desc    Get all attendants
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().sort({
      date: 1,
    });
    res.send(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
