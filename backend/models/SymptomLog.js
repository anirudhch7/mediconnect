const mongoose = require('mongoose');

const symptomLogSchema = mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional for guests
    symptomsInput: { type: String, required: true },
    aiResponse: {
      conditions: [{
        name: String,
        likelihood: Number
      }],
      specialist: String,
      urgency: String
    }
  },
  {
    timestamps: true,
  }
);

const SymptomLog = mongoose.model('SymptomLog', symptomLogSchema);
module.exports = SymptomLog;
