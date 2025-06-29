const { exec } = require('child_process');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const AnalysisJob = require('../models/AnalysisJob');

const PYTHON_CMD = 'C:\\Users\\AKANKSHA\\anaconda3\\python.exe';

const tmpDir = path.join(__dirname, '../../tmp');
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true });
}

const progressTracker = {};

// ✅ Updated Helper to safely extract final JSON from stdout
function extractJSON(stdout) {
  try {
    // Find the start of the JSON by looking for the first '{'
    const startIndex = stdout.indexOf('{');
    if (startIndex === -1) throw new Error('No JSON found in output');

    // Find the end of the JSON by looking for the last '}'
    const endIndex = stdout.lastIndexOf('}');
    if (endIndex === -1) throw new Error('No closing brace found in output');
    if (endIndex < startIndex) throw new Error('Invalid JSON structure');

    // Extract the JSON portion
    const jsonString = stdout.substring(startIndex, endIndex + 1);

    // Try to parse the JSON
    return JSON.parse(jsonString);
  } catch (e) {
    // Improved error logging for debugging
    console.error('JSON Extraction Error:', e.message);
    console.log('Problematic Content:', stdout);
    throw new Error(`JSON extraction failed: ${e.message}`);
  }
}

// ✅ Main job handler
exports.addToQueue = async (jobData) => {
  try {
    progressTracker[jobData.jobId] = {
      status: 'downloading',
      message: 'Downloading files...',
      progress: 0
    };

    await AnalysisJob.updateOne(
      { jobId: jobData.jobId },
      { message: 'Downloading files...', progress: 0 }
    );

    const videoPath = await downloadFile(jobData.videoUrl, 'video');
    const deckPath = await downloadFile(jobData.deckUrl, 'deck');

    progressTracker[jobData.jobId] = {
      status: 'processing',
      message: 'Processing files...',
      progress: 20
    };

    await AnalysisJob.updateOne(
      { jobId: jobData.jobId },
      { message: 'Processing files...', progress: 20 }
    );

    const pythonProcess = exec(
      `${PYTHON_CMD} ai/analyze.py "${videoPath}" "${deckPath}" "${jobData.jobId}"`,
      {
        env: {
          ...process.env,
          PYTHONPATH: 'C:\\Users\\AKANKSHA\\anaconda3\\Lib\\site-packages',
          TF_ENABLE_ONEDNN_OPTS: '0'
        }
      },
      async (error, stdout, stderr) => {
        try {
          if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
          if (fs.existsSync(deckPath)) fs.unlinkSync(deckPath);
          delete progressTracker[jobData.jobId];
        } catch (cleanupError) {
          console.error('Cleanup error:', cleanupError);
        }

        if (error) {
          console.error(`Execution error: ${error}`);
          await AnalysisJob.updateOne(
            { jobId: jobData.jobId },
            {
              status: 'failed',
              message: 'Analysis failed during execution',
              progress: 100
            }
          );
          return;
        }

        try {
          console.log('Raw stdout:', stdout);
          let result = extractJSON(stdout);
          console.log('Parsed result:', result);

          
          await AnalysisJob.updateOne(
            { jobId: jobData.jobId },
            {
              status: 'completed',
              result,
              progress: 100,
              completedAt: new Date()
            }
          );
        } catch (parseError) {
          console.error('Parsing Error:', parseError);
          console.error('Problematic stdout:', stdout);

          await AnalysisJob.updateOne(
            { jobId: jobData.jobId },
            {
              status: 'failed',
              message: parseError.message || 'Failed to parse analysis result',
              progress: 100,
              error: parseError.message
            }
          );
        }
      }
    );

    // ✅ Live progress tracking
    pythonProcess.stdout.on('data', async (data) => {
      console.log(`[Python] ${data}`);

      if (data.includes('PROGRESS:')) {
        const match = data.match(/PROGRESS:\s*(\d+)/);
        if (match) {
          const progress = parseInt(match[1]);
          progressTracker[jobData.jobId].progress = progress;
          await AnalysisJob.updateOne(
            { jobId: jobData.jobId },
            { progress }
          );
        }
      }

      if (data.includes('STATUS:')) {
        const message = data.split('STATUS: ')[1]?.trim();
        if (message) {
          progressTracker[jobData.jobId].message = message;
          await AnalysisJob.updateOne(
            { jobId: jobData.jobId },
            { message }
          );
        }
      }
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`[Python Error] ${data}`);
    });

  } catch (error) {
    console.error('Queue processing error:', error);
    await AnalysisJob.updateOne(
      { jobId: jobData.jobId },
      {
        status: 'failed',
        message: 'File download or processing setup failed',
        progress: 100,
        error: error.message
      }
    );
  }
};

// ✅ Progress tracking endpoint
exports.getJobProgress = (jobId) => {
  return progressTracker[jobId] || {
    status: 'unknown',
    message: 'Processing not started',
    progress: 0
  };
};

// ✅ Helper: download file to temp directory
async function downloadFile(url, type) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  const extension = type === 'video'
    ? url.split('.').pop().split('?')[0]
    : 'pdf';

  const filePath = path.join(tmpDir, `${Date.now()}-${type}.${extension}`);
  const writer = fs.createWriteStream(filePath);

  return new Promise((resolve, reject) => {
    response.data.pipe(writer);
    writer.on('finish', () => resolve(filePath));
    writer.on('error', reject);
  });
}
