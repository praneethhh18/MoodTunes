const express = require('express');
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All playlist routes require authentication
router.use(authenticateToken);

// Mock playlist storage (in a real app, this would be in a database)
let userPlaylists = {};

// Get user's custom playlists
router.get('/', (req, res) => {
  try {
    const userId = req.user.id;
    const playlists = userPlaylists[userId] || [];
    
    res.json({ playlists });
  } catch (error) {
    console.error('Get playlists error:', error);
    res.status(500).json({ error: 'Failed to fetch playlists' });
  }
});

// Create a new playlist
router.post('/', [
  body('name').isString().isLength({ min: 1 }).trim().escape(),
  body('description').optional().isString().trim().escape(),
  body('tracks').optional().isArray()
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.id;
    const { name, description, tracks } = req.body;

    if (!userPlaylists[userId]) {
      userPlaylists[userId] = [];
    }

    const newPlaylist = {
      id: Date.now().toString(),
      name,
      description: description || '',
      tracks: tracks || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    userPlaylists[userId].push(newPlaylist);

    res.status(201).json({
      message: 'Playlist created successfully',
      playlist: newPlaylist
    });
  } catch (error) {
    console.error('Create playlist error:', error);
    res.status(500).json({ error: 'Failed to create playlist' });
  }
});

// Get a specific playlist
router.get('/:id', (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    
    const playlists = userPlaylists[userId] || [];
    const playlist = playlists.find(p => p.id === id);
    
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    res.json({ playlist });
  } catch (error) {
    console.error('Get playlist error:', error);
    res.status(500).json({ error: 'Failed to fetch playlist' });
  }
});

// Update a playlist
router.put('/:id', [
  body('name').optional().isString().isLength({ min: 1 }).trim().escape(),
  body('description').optional().isString().trim().escape(),
  body('tracks').optional().isArray()
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.id;
    const { id } = req.params;
    const { name, description, tracks } = req.body;
    
    const playlists = userPlaylists[userId] || [];
    const playlistIndex = playlists.findIndex(p => p.id === id);
    
    if (playlistIndex === -1) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    const playlist = playlists[playlistIndex];
    
    if (name !== undefined) playlist.name = name;
    if (description !== undefined) playlist.description = description;
    if (tracks !== undefined) playlist.tracks = tracks;
    playlist.updated_at = new Date().toISOString();

    res.json({
      message: 'Playlist updated successfully',
      playlist
    });
  } catch (error) {
    console.error('Update playlist error:', error);
    res.status(500).json({ error: 'Failed to update playlist' });
  }
});

// Delete a playlist
router.delete('/:id', (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    
    const playlists = userPlaylists[userId] || [];
    const playlistIndex = playlists.findIndex(p => p.id === id);
    
    if (playlistIndex === -1) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    playlists.splice(playlistIndex, 1);

    res.json({ message: 'Playlist deleted successfully' });
  } catch (error) {
    console.error('Delete playlist error:', error);
    res.status(500).json({ error: 'Failed to delete playlist' });
  }
});

module.exports = router;