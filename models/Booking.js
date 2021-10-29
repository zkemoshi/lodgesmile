const mongoose = require('mongoose');
const BookingSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  checkIn: {
    type: Date,
    default: Date.now,
  },
  checkOut: {
    type: Date,
  },
  vacancy: {
    type: Boolean,
  },
});

module.exports = mongoose.model('booking', BookingSchema);
