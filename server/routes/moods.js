const express = require('express');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Available moods (this could be from a database in the future)
const AVAILABLE_MOODS = [
  'happy', 'sad', 'energetic', 'calm', 'romantic', 'angry', 
  'motivated', 'nostalgic', 'adventurous', 'melancholic',
  'peaceful', 'excited', 'thoughtful', 'uplifting'
];

// Get all available moods
router.get('/', (req, res) => {
  res.json({ moods: AVAILABLE_MOODS });
});

// Get mood-based playlist recommendations
router.get('/:mood', authenticateToken, (req, res) => {
  try {
    const { mood } = req.params;
    
    if (!AVAILABLE_MOODS.includes(mood.toLowerCase())) {
      return res.status(404).json({ error: 'Mood not found' });
    }

    // TODO: In a real app, this would connect to Spotify API or similar
    // For now, return mock recommendations
    const mockRecommendations = {
      mood: mood.toLowerCase(),
      playlists: [
        {
          id: `${mood}_1`,
          name: `${mood.charAt(0).toUpperCase() + mood.slice(1)} Vibes`,
          description: `Perfect songs for when you're feeling ${mood}`,
          tracks: [
            { name: 'Sample Song 1', artist: 'Sample Artist 1' },
            { name: 'Sample Song 2', artist: 'Sample Artist 2' }
          ]
        },
        {
          id: `${mood}_2`,
          name: `${mood.charAt(0).toUpperCase() + mood.slice(1)} Mix`,
          description: `Another great ${mood} playlist`,
          tracks: [
            { name: 'Sample Song 3', artist: 'Sample Artist 3' },
            { name: 'Sample Song 4', artist: 'Sample Artist 4' }
          ]
        }
      ]
    };

    res.json(mockRecommendations);
  } catch (error) {
    console.error('Get mood recommendations error:', error);
    res.status(500).json({ error: 'Failed to fetch mood recommendations' });
  }
});

module.exports = router;