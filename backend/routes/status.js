const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');

router.get('/:jobId', statusController.getAnalysisStatus);

module.exports = router;