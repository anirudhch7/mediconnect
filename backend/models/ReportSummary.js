const mongoose = require('mongoose');

const reportSummarySchema = mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    summaryOutput: {
      keyObservations: [String],
      importantMetrics: [{
        metric: String,
        value: String,
        normalRange: String,
        status: String
      }],
      suggestedNextSteps: [String]
    }
  },
  {
    timestamps: true,
  }
);

const ReportSummary = mongoose.model('ReportSummary', reportSummarySchema);
module.exports = ReportSummary;
