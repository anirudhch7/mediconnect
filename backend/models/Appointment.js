const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    docId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['booked', 'cancelled', 'completed'], default: 'booked' },
    paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
    noShowRiskScore: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
