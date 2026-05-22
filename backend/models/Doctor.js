const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: String, required: true },
    fees: { type: Number, required: true },
    about: { type: String },
    image: { type: String, default: "" },
    address: { type: String },
    availableSlots: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
