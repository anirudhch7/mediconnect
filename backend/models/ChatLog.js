const mongoose = require('mongoose');

const chatLogSchema = mongoose.Schema(
  {
    sessionId: { type: String, required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional
    messages: [
      {
        role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
      }
    ]
  },
  {
    timestamps: true,
  }
);

const ChatLog = mongoose.model('ChatLog', chatLogSchema);
module.exports = ChatLog;
