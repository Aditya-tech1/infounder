const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
    files: 2
  },
  fileFilter: (req, file, cb) => {
    console.log(`Processing file: ${file.fieldname} - ${file.originalname}`);
    cb(null, true);
  }
});

// Add error handling to upload middleware
const uploadMiddleware = (req, res, next) => {
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'deck', maxCount: 1 }
  ])(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ error: err.message });
    }
    
    // Log received files
    if (req.files) {
      console.log('Multer processed files:');
      Object.keys(req.files).forEach(key => {
        req.files[key].forEach(file => {
          console.log(`- ${key}: ${file.originalname} (${file.size} bytes)`);
        });
      });
    } else {
      console.log('Multer: No files processed');
    }
    
    next();
  });
};

router.post('/', uploadMiddleware, analysisController.analyzePitch);

module.exports = router;