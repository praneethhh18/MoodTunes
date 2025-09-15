const express = require('express');
const RecommendationService = require('../services/recommendationService');

const router = express.Router();

/**
 * GET /api/recommendation
 * Get song recommendations based on detected mood
 * 
 * Query Parameters:
 * - mood (required): The detected mood (happy, sad, neutral, angry, relaxed)
 * - limit (optional): Maximum number of songs to return (default: 5, max: 20)
 * 
 * Example: GET /api/recommendation?mood=happy&limit=3
 */
router.get('/', (req, res) => {
  try {
    const { mood, limit } = req.query;
    
    // Validate required parameters
    if (!mood) {
      return res.status(400).json({
        error: 'Missing required parameter: mood',
        validMoods: RecommendationService.getAvailableMoods()
      });
    }
    
    // Parse and validate limit
    const songLimit = limit ? Math.min(Math.max(1, parseInt(limit)), 20) : 5;
    
    // Get recommendations
    const recommendations = RecommendationService.getRecommendationsByMood(mood, songLimit);
    
    // Return successful response
    res.json({
      success: true,
      mood: mood.toLowerCase().trim(),
      count: recommendations.length,
      recommendations
    });
    
  } catch (error) {
    // Handle service errors
    if (error.message.includes('Invalid mood')) {
      return res.status(400).json({
        error: error.message,
        validMoods: RecommendationService.getAvailableMoods()
      });
    }
    
    // Handle unexpected errors
    console.error('Recommendation API error:', error);
    res.status(500).json({
      error: 'Internal server error while fetching recommendations'
    });
  }
});

/**
 * GET /api/recommendation/moods
 * Get list of available moods for recommendations
 */
router.get('/moods', (req, res) => {
  try {
    const moods = RecommendationService.getAvailableMoods();
    res.json({
      success: true,
      moods
    });
  } catch (error) {
    console.error('Moods API error:', error);
    res.status(500).json({
      error: 'Internal server error while fetching available moods'
    });
  }
});

module.exports = router;