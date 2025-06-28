const { v4: uuidv4 } = require('uuid'); // Add this import at the top
const AnalysisJob = require('../models/AnalysisJob');
const { uploadToSupabase } = require('../services/storage');
const { addToQueue } = require('../services/queue');

exports.analyzePitch = async (req, res) => {
  try {
    console.log('Starting analysis process...');
    
    // Enhanced validation
    if (!req.files) {
      console.error('No files in request');
      return res.status(400).json({ error: 'No files uploaded' });
    }
    
    if (!req.files.video || req.files.video.length === 0) {
      console.error('No video file uploaded');
      return res.status(400).json({ error: 'No video file uploaded' });
    }
    
    if (!req.files.deck || req.files.deck.length === 0) {
      console.error('No deck file uploaded');
      return res.status(400).json({ error: 'No deck file uploaded' });
    }

    const videoFile = req.files.video[0];
    const deckFile = req.files.deck[0];
    
    console.log(`Video file: ${videoFile.originalname} (${videoFile.size} bytes)`);
    console.log(`Deck file: ${deckFile.originalname} (${deckFile.size} bytes)`);
    
    // Validate file types
    if (!videoFile.mimetype.startsWith('video/')) {
      console.error(`Invalid video type: ${videoFile.mimetype}`);
      return res.status(400).json({ error: 'Invalid video file type' });
    }
    
    if (deckFile.mimetype !== 'application/pdf') {
      console.error(`Invalid deck type: ${deckFile.mimetype}`);
      return res.status(400).json({ error: 'Invalid deck file type' });
    }

    const jobId = uuidv4(); // Now properly defined
    console.log(`Creating job: ${jobId}`);
    
    // Upload files to Supabase
    console.log('Uploading to Supabase...');
    const videoUrl = await uploadToSupabase(videoFile);
    const deckUrl = await uploadToSupabase(deckFile);
    
    console.log(`Video URL: ${videoUrl}`);
    console.log(`Deck URL: ${deckUrl}`);
    
    // Create new analysis job
    const newJob = new AnalysisJob({
      jobId,
      status: 'processing',
      videoUrl,
      deckUrl,
      createdAt: new Date()
    });
    
    await newJob.save();
    console.log('Job saved to database');
    
    // Add to processing queue
    await addToQueue({
      jobId,
      videoUrl,
      deckUrl
    });
    console.log('Job added to queue');
    
    res.status(202).json({ jobId, message: 'Analysis started' });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to start analysis', details: error.message });
  }
};