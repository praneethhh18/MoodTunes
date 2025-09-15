const express = require('express');
const { body, validationResult } = require('express-validator');

const Profile = require('../models/Profile');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All profile routes require authentication
router.use(authenticateToken);

// Get user profile
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.getByUserId(req.user.id);
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({
      user: req.user,
      profile: {
        favorite_moods: profile.favorite_moods,
        favorite_playlists: profile.favorite_playlists,
        created_at: profile.created_at,
        updated_at: profile.updated_at
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update favorite moods and playlists
router.put('/favorites', [
  body('favorite_moods').optional().isArray(),
  body('favorite_playlists').optional().isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { favorite_moods, favorite_playlists } = req.body;
    
    await Profile.updateFavorites(req.user.id, {
      favorite_moods,
      favorite_playlists
    });

    res.json({ message: 'Favorites updated successfully' });
  } catch (error) {
    console.error('Update favorites error:', error);
    res.status(500).json({ error: 'Failed to update favorites' });
  }
});

// Get mood history
router.get('/mood-history', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const history = await Profile.getMoodHistory(req.user.id, limit);
    
    res.json({ history });
  } catch (error) {
    console.error('Get mood history error:', error);
    res.status(500).json({ error: 'Failed to fetch mood history' });
  }
});

// Add mood to history
router.post('/mood-history', [
  body('mood').isString().isLength({ min: 1 }).trim().escape()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { mood } = req.body;
    const entry = await Profile.addMoodHistory(req.user.id, mood);
    
    res.status(201).json({ 
      message: 'Mood added to history',
      entry: {
        ...entry,
        created_at: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Add mood history error:', error);
    res.status(500).json({ error: 'Failed to add mood to history' });
  }
});

// Get playlist history
router.get('/playlist-history', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const history = await Profile.getPlaylistHistory(req.user.id, limit);
    
    res.json({ history });
  } catch (error) {
    console.error('Get playlist history error:', error);
    res.status(500).json({ error: 'Failed to fetch playlist history' });
  }
});

// Add playlist to history
router.post('/playlist-history', [
  body('playlist_name').isString().isLength({ min: 1 }).trim().escape(),
  body('playlist_data').isObject()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { playlist_name, playlist_data } = req.body;
    const entry = await Profile.addPlaylistHistory(req.user.id, playlist_name, playlist_data);
    
    res.status(201).json({ 
      message: 'Playlist added to history',
      entry: {
        ...entry,
        created_at: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Add playlist history error:', error);
    res.status(500).json({ error: 'Failed to add playlist to history' });
  }
});

// Clear mood history
router.delete('/mood-history', async (req, res) => {
  try {
    const result = await Profile.clearMoodHistory(req.user.id);
    
    res.json({ 
      message: 'Mood history cleared successfully',
      deleted_count: result.deleted
    });
  } catch (error) {
    console.error('Clear mood history error:', error);
    res.status(500).json({ error: 'Failed to clear mood history' });
  }
});

// Clear playlist history
router.delete('/playlist-history', async (req, res) => {
  try {
    const result = await Profile.clearPlaylistHistory(req.user.id);
    
    res.json({ 
      message: 'Playlist history cleared successfully',
      deleted_count: result.deleted
    });
  } catch (error) {
    console.error('Clear playlist history error:', error);
    res.status(500).json({ error: 'Failed to clear playlist history' });
  }
});

module.exports = router;