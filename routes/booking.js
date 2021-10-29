const express = require('express');
const router = express.Router();
const config = require('config');
const emailKey = config.get('SENDGRID_API_KEY');
const sgMail = require('@sendgrid/mail');
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// Model
const Booking = require('../models/Booking');

// ***** Book CRUD ****

// @route   POST    api/booking
// @desc    Add new Booking
// @access  Private
router.post('/', auth, async (req, res) => {
  const { name, number, checkOut, vacancy } = req.body;

  const email = req.user.email;
  try {
    let newBook = await Booking.findOne({
      user: req.user.id,
      number,
      vacancy: false,
    });

    if (newBook) {
      return res.status(400).json({ msg: 'Room Already Booked' });
    }

    // Create a New Booking
    newBook = new Booking({
      name,
      number,
      vacancy,
      checkOut,
      user: req.user.id,
    });

    const book = await newBook.save();

    // Sending response from DB
    res.json(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET    api/booking
// @desc    Get all booking
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    //Update all booking status
    await Booking.updateMany(
      {
        user: req.user.id,
        checkOut: { $lt: new Date() },
      },
      { $set: { vacancy: true } }
    );

    //Get all bookings
    const allBooking = await Booking.find({ user: req.user.id }).sort({
      checkIn: -1,
      number: 1,
    });
    res.send(allBooking);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET    api/booking/:id
// @desc    Get Active  booking
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const book = await Booking.find({
      user: req.user.id,
      vacancy: false,
    }).sort({
      number: 1,
    });
    res.send(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   PATCH    api/booking/:id
// @desc    Update Booking
// @access  Private
router.patch('/:id', auth, async (req, res) => {
  const { checkOut } = req.body;

  // Build room object
  const bookingFields = {};
  if (checkOut) bookingFields.checkOut = checkOut;

  const filter = { _id: req.params.id };

  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ msg: 'booking not found' });

    // Make sure user owns contact
    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    book = await Booking.findOneAndUpdate(filter, bookingFields, { new: true });

    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE    api/booking/:id
// @desc    Delete Booking
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ msg: 'booking not found' });

    // Make sure user owns room
    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Booking.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Booking removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
