const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  price: {
    type: String,
    required: true,
  },
  days: {
    type: String,
    required: true,
  },
  scheme: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('payment', PaymentSchema);
