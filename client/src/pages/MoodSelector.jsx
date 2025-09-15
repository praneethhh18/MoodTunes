import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, Plus, Music, Star } from 'lucide-react';

const MoodSelector = () => {
  const [moods, setMoods] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [favorites, setFavorites] = useState({ moods: [], playlists: [] });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const moodEmojis = {
    happy: '😄',
    sad: '😢',
    energetic: '⚡',
    calm: '😌',
    romantic: '💕',
    angry: '😠',
    motivated: '💪',
    nostalgic: '📻',
    adventurous: '🌟',
    melancholic: '🌧️',
    peaceful: '🕊️',
    excited: '🎉',
    thoughtful: '🤔',
    uplifting: '🌈'
  };

  useEffect(() => {
    fetchMoods();
    fetchProfile();
  }, []);

  const fetchMoods = async () => {
    try {
      const response = await axios.get('/api/moods');
      setMoods(response.data.moods);
    } catch (error) {
      console.error('Failed to fetch moods:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/profile');
      setFavorites({
        moods: response.data.profile.favorite_moods || [],
        playlists: response.data.profile.favorite_playlists || []
      });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood);
    setPlaylists([]);
    
    try {
      // Add to mood history
      await axios.post('/api/profile/mood-history', { mood });
      
      // Get mood recommendations
      const response = await axios.get(`/api/moods/${mood}`);
      setPlaylists(response.data.playlists);
    } catch (error) {
      console.error('Failed to select mood:', error);
    }
  };

  const toggleFavoriteMood = async (mood) => {
    try {
      const newFavorites = favorites.moods.includes(mood)
        ? favorites.moods.filter(m => m !== mood)
        : [...favorites.moods, mood];
      
      await axios.put('/api/profile/favorites', {
        favorite_moods: newFavorites,
        favorite_playlists: favorites.playlists
      });
      
      setFavorites(prev => ({ ...prev, moods: newFavorites }));
      setMessage(
        favorites.moods.includes(mood) 
          ? 'Removed from favorite moods' 
          : 'Added to favorite moods'
      );
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Failed to update favorite moods:', error);
    }
  };

  const toggleFavoritePlaylist = async (playlist) => {
    try {
      const newFavorites = favorites.playlists.find(p => p.id === playlist.id)
        ? favorites.playlists.filter(p => p.id !== playlist.id)
        : [...favorites.playlists, playlist];
      
      await axios.put('/api/profile/favorites', {
        favorite_moods: favorites.moods,
        favorite_playlists: newFavorites
      });
      
      setFavorites(prev => ({ ...prev, playlists: newFavorites }));
      setMessage(
        favorites.playlists.find(p => p.id === playlist.id)
          ? 'Removed from favorite playlists' 
          : 'Added to favorite playlists'
      );
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Failed to update favorite playlists:', error);
    }
  };

  const savePlaylistToHistory = async (playlist) => {
    try {
      await axios.post('/api/profile/playlist-history', {
        playlist_name: playlist.name,
        playlist_data: playlist
      });
      setMessage('Playlist saved to history');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Failed to save playlist:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading moods...</div>;
  }

  return (
    <div>
      <div className="card" style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ marginBottom: '16px' }}>How are you feeling today?</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)' }}>
          Select a mood to discover music that matches your vibe
        </p>
      </div>

      {message && (
        <div className="success" style={{ maxWidth: '600px', margin: '0 auto 24px' }}>
          {message}
        </div>
      )}

      <div className="grid grid-3" style={{ marginBottom: '32px' }}>
        {moods.map((mood) => (
          <div
            key={mood}
            className={`mood-card ${selectedMood === mood ? 'selected' : ''}`}
            onClick={() => handleMoodSelect(mood)}
            style={{
              background: selectedMood === mood 
                ? 'rgba(102, 126, 234, 0.3)' 
                : 'rgba(255, 255, 255, 0.1)',
              position: 'relative'
            }}
          >
            <div className="mood-emoji">{moodEmojis[mood] || '🎵'}</div>
            <div className="mood-name">{mood}</div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavoriteMood(mood);
              }}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: favorites.moods.includes(mood) ? '#ff6b6b' : 'rgba(255,255,255,0.5)'
              }}
            >
              <Heart size={20} fill={favorites.moods.includes(mood) ? 'currentColor' : 'none'} />
            </button>
          </div>
        ))}
      </div>

      {selectedMood && playlists.length > 0 && (
        <div className="card">
          <h2 style={{ marginBottom: '24px', textTransform: 'capitalize' }}>
            {selectedMood} Playlists
          </h2>
          <div className="grid grid-2">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="card" style={{ position: 'relative' }}>
                <button
                  onClick={() => toggleFavoritePlaylist(playlist)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: favorites.playlists.find(p => p.id === playlist.id) 
                      ? '#ff6b6b' 
                      : 'rgba(255,255,255,0.5)'
                  }}
                >
                  <Star 
                    size={20} 
                    fill={favorites.playlists.find(p => p.id === playlist.id) ? 'currentColor' : 'none'} 
                  />
                </button>
                
                <h3 style={{ marginBottom: '12px', paddingRight: '40px' }}>
                  {playlist.name}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
                  {playlist.description}
                </p>
                
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Tracks:</h4>
                  {playlist.tracks.map((track, index) => (
                    <div key={index} style={{ 
                      fontSize: '12px', 
                      color: 'rgba(255,255,255,0.6)',
                      marginBottom: '4px'
                    }}>
                      {track.name} - {track.artist}
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => savePlaylistToHistory(playlist)}
                  className="btn btn-primary"
                  style={{ fontSize: '14px', padding: '8px 16px' }}
                >
                  <Plus size={16} style={{ marginRight: '4px', display: 'inline' }} />
                  Save Playlist
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedMood && playlists.length === 0 && (
        <div className="card" style={{ textAlign: 'center' }}>
          <Music size={48} style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '16px' }} />
          <p style={{ color: 'rgba(255,255,255,0.6)' }}>
            Loading playlists for {selectedMood} mood...
          </p>
        </div>
      )}
    </div>
  );
};

export default MoodSelector;