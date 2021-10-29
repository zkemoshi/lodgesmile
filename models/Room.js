const mongoose = require('mongoose');
const moment = require('moment');

const RoomSchema = mongoose.Schema({
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
  checkout: {
    type: String,
    default: moment().format('DD-MM-YYYY 00:00:00'),
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('room', RoomSchema);
