const express = require('express');
const cors = require('cors');
const Sentiment = require('sentiment');

const app = express();
const port = process.env.PORT || 3001;
const sentiment = new Sentiment();

// Middleware
app.use(cors());
app.use(express.json());

// TODO: Future enhancements can include:
// - Webcam-based face emotion detection using computer vision libraries
// - Voice/audio analysis for mood detection using speech recognition APIs
// - Integration with machine learning models for more accurate mood prediction
// - User profile-based mood learning and personalization

/**
 * Converts sentiment score to mood category
 * @param {number} score - Sentiment score from the sentiment library
 * @returns {string} - Mood category (happy, sad, neutral)
 */
function scoreToMood(score) {
    if (score > 0) {
        return 'happy';
    } else if (score < 0) {
        return 'sad';
    } else {
        return 'neutral';
    }
}

/**
 * POST /api/mood
 * Endpoint for mood detection based on text input
 * Accepts: { text: string }
 * Returns: { mood: string, confidence: number, score: number }
 */
app.post('/api/mood', (req, res) => {
    try {
        const { text } = req.body;
        
        // Input validation
        if (!text || typeof text !== 'string' || text.trim().length === 0) {
            return res.status(400).json({
                error: 'Text input is required and must be a non-empty string'
            });
        }

        // Perform sentiment analysis
        const result = sentiment.analyze(text);
        const mood = scoreToMood(result.score);
        
        // Calculate confidence based on score magnitude
        // Higher absolute scores indicate higher confidence
        const confidence = Math.min(Math.abs(result.score) / 5, 1); // Normalize to 0-1 range

        res.json({
            mood: mood,
            confidence: confidence,
            score: result.score,
            analysis: {
                positive: result.positive,
                negative: result.negative,
                wordCount: result.words.length
            }
        });
    } catch (error) {
        console.error('Error in mood detection:', error);
        res.status(500).json({
            error: 'Internal server error during mood detection'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', service: 'MoodTunes Mood Detection API' });
});

// Start server
app.listen(port, () => {
    console.log(`MoodTunes server running on port ${port}`);
    console.log(`Health check: http://localhost:${port}/api/health`);
    console.log(`Mood detection: POST http://localhost:${port}/api/mood`);
});

module.exports = app;