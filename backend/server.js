// Add missing imports at the top
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path'); // Add this for file path handling

// Import routes and middleware
const analysisRoutes = require('./routes/analysis');
const statusRoutes = require('./routes/status');
const healthRoutes = require('./routes/health'); // Add health route
const requestLogger = require('./middleware/requestLogger');

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(requestLogger);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Atlas connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/analyze', analysisRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/health', healthRoutes); 

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));