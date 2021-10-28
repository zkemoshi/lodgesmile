const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const emailKey = config.get('SENDGRID_API_KEY');
const sgMail = require('@sendgrid/mail');
const { body, validationResult } = require('express-validator');

// Model
const Attendant = require('../models/Attendant');
const User = require('../models/User');

// ***** Attendants CRUD ****

// @route   GET    api/attendants
// @desc    Get all attendants
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const attendants = await Attendant.find({ user: req.user.id }).sort({
      name: 1,
    });
    res.send(attendants);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST    api/attendants
// @desc    Add new attendant
// @access  Private
router.post('/', auth, async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const user = await User.findById(req.user.id);
    let newAttendant = await Attendant.findOne({ username });

    if (newAttendant) {
      return res.status(400).json({ msg: 'Username already exists' });
    }

    const attendantCount = await Attendant.find({ user: req.user.id }).count();


    // Create a new User
    newAttendant = new Attendant({
      name,
      username,
      password,
      user: req.user.id,
    });

    // Save to DB
    const attendant = await newAttendant.save();

    res.json(attendant);
  } catch (error) {
    console.error(error.message);
    res.status(500).res.send('Server Error...');
  }
});

// @route   PUT    api/attendants/:id
// @desc    Update attendant
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { name, username, password } = req.body;

  // Build room object
  const attendantFields = {};
  if (name) attendantFields.name = name;
  if (username) attendantFields.username = username;
  if (password) attendantFields.password = password;

  try {
    let attendant = await Attendant.findById(req.params.id);

    if (!attendant) return res.status(404).json({ msg: 'Attendant not found' });

    // Make sure user owns contact
    if (attendant.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    attendant = await Attendant.findByIdAndUpdate(
      req.params.id,
      { $set: attendantFields },
      { new: true }
    );

    res.json(attendant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE    api/attendants/:id
// @desc    Delete attendant
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let attendant = await Attendant.findById(req.params.id);

    if (!attendant) return res.status(404).json({ msg: 'Attendant not found' });

    // Make sure user owns room
    if (attendant.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Attendant.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Attendant removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
