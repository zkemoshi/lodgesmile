const mongoose = require('mongoose');

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
  vacancy: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('room', RoomSchema);
