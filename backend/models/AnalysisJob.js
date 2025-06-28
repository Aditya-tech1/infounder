const mongoose = require('mongoose');

const analysisJobSchema = new mongoose.Schema({
  jobId: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing'
  },
  message: String,
  videoUrl: String,
  deckUrl: String,
  results: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date
}, {
  versionKey: false // Disable the version key (__v)
});

module.exports = mongoose.model('AnalysisJob', analysisJobSchema);