// model/Appointment.js

const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
  },
  appointmentDate: {
    type: Date,
  },
  userNote: {
    type: String,
  },
  userName: {
    type: String,
  },
  userContact: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
