const AnalysisJob = require('../models/AnalysisJob');

exports.getAnalysisStatus = async (req, res) => {
  try {
    const job = await AnalysisJob.findOne({ jobId: req.params.jobId });
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    res.json({
      status: job.status,
      message: job.message,
      results: job.results
    });
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({ error: 'Failed to get status' });
  }
};