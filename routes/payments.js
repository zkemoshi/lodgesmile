const express = require('express');
const moment = require('moment');
const router = express.Router();
const config = require('config');
const emailKey = config.get('SENDGRID_API_KEY');
const sgMail = require('@sendgrid/mail');
const auth = require('../middleware/auth');

// EfdReceipt Model
const Payment = require('../models/Payment');
const User = require('../models/User');

// @route   POST    api/payments/:amount/:plan
// @desc    Add a payments
// @access  Private
router.get('/:price/:days/:scheme', auth, async (req, res) => {
  const { price, days, scheme } = req.params;

  try {
    // Create a new Payment
    const newpay = new Payment({
      price,
      days,
      scheme,
      user: req.user.id,
    });

    // Update User Model
    const user = await User.findById(req.user.id);
    let renewDate;
    const today = moment().format('DD-MM-YYYY');
    const isExpired = moment(user.expiredAt, 'DD-MM-YYYY').isSameOrAfter();
    if (!isExpired) {
      renewDate = moment(today, 'DD-MM-YYYY').add(days, 'd').toDate();

      renewDate = moment(renewDate).format('DD-MM-YYYY');
    } else {
      renewDate = moment(user.expiredAt, 'DD-MM-YYYY').add(days, 'd').toDate();
      renewDate = moment(renewDate).format('DD-MM-YYYY');
    }

    // Update User Days
    await User.findByIdAndUpdate(
      req.user.id,
      { $set: { expiredAt: renewDate, scheme } },
      { new: true }
    );

    // Save to DB
    const pay = await newpay.save();
    res.json(pay);
  } catch (error) {
    console.error(error.message);
    res.status(500).res.send('Server Error...');
  }
});

module.exports = router;
