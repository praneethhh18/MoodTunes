const express = require('express');
const cors = require('cors');
const recommendationRoutes = require('./routes/recommendation');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'MoodTunes API',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/recommendation', recommendationRoutes);

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    error: 'API endpoint not found',
    path: req.originalUrl
  });
});

// Basic route for root
app.get('/', (req, res) => {
  res.json({
    message: 'MoodTunes API Server',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      recommendations: '/api/recommendation?mood={mood}&limit={limit}',
      availableMoods: '/api/recommendation/moods'
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎵 MoodTunes API server running on port ${PORT}`);
  console.log(`🌐 Access the API at: http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🎶 Recommendations: http://localhost:${PORT}/api/recommendation?mood=happy`);
});

module.exports = app;