import React, { useState, useEffect } from 'react';
import { getRecommendations, getAvailableMoods } from '../services/api';

/**
 * PlaylistRecommendation Component
 * 
 * Displays mood-based song recommendations and handles mood selection.
 * Integrates with the mood detection flow to automatically show recommendations.
 * 
 * TODO: Integrate with actual mood detection (camera/facial recognition)
 * TODO: Add playlist creation functionality 
 * TODO: Implement user preference learning
 * TODO: Add social sharing features
 */
const PlaylistRecommendation = ({ detectedMood, onMoodChange }) => {
  const [selectedMood, setSelectedMood] = useState(detectedMood || 'happy');
  const [recommendations, setRecommendations] = useState([]);
  const [availableMoods, setAvailableMoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load available moods on component mount
  useEffect(() => {
    const loadMoods = async () => {
      try {
        const moods = await getAvailableMoods();
        setAvailableMoods(moods);
      } catch (err) {
        console.error('Failed to load available moods:', err);
        setAvailableMoods(['happy', 'sad', 'neutral', 'angry', 'relaxed']); // Fallback
      }
    };
    
    loadMoods();
  }, []);

  // Update selected mood when detectedMood prop changes
  useEffect(() => {
    if (detectedMood && detectedMood !== selectedMood) {
      setSelectedMood(detectedMood);
    }
  }, [detectedMood]);

  // Fetch recommendations when mood changes
  useEffect(() => {
    if (selectedMood) {
      fetchRecommendations(selectedMood);
    }
  }, [selectedMood]);

  const fetchRecommendations = async (mood) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getRecommendations(mood, 5);
      setRecommendations(response.recommendations || []);
    } catch (err) {
      setError(`Failed to fetch recommendations: ${err.message}`);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    if (onMoodChange) {
      onMoodChange(mood);
    }
  };

  const formatMoodText = (mood) => {
    return mood.charAt(0).toUpperCase() + mood.slice(1);
  };

  return (
    <div className="card">
      <h2>🎵 Song Recommendations</h2>
      
      {/* Mood Detection Status */}
      {detectedMood && (
        <div style={{ background: '#e6fffa', padding: '12px', borderRadius: '8px', margin: '16px 0' }}>
          <strong>🎭 Detected Mood:</strong> {formatMoodText(detectedMood)}
        </div>
      )}
      
      {/* Manual Mood Selection */}
      <div>
        <h3>Select Your Mood:</h3>
        <div className="mood-selector">
          {availableMoods.map((mood) => (
            <button
              key={mood}
              className={`mood-button ${selectedMood === mood ? 'active' : ''}`}
              onClick={() => handleMoodSelect(mood)}
            >
              {formatMoodText(mood)}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading">
          <p>🎼 Finding perfect songs for your mood...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {/* Recommendations Display */}
      {!loading && !error && recommendations.length > 0 && (
        <div>
          <h3>Recommended for {formatMoodText(selectedMood)} mood:</h3>
          <div className="song-list">
            {recommendations.map((song) => (
              <div key={song.id} className="song-item">
                <h4 className="song-title">{song.title}</h4>
                <p className="song-artist">by {song.artist}</p>
                <div className="song-details">
                  <span>{song.genre}</span>
                  <span>{song.duration}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* TODO: Add buttons for playlist actions */}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button className="button" disabled>
              🎵 Create Playlist (Coming Soon)
            </button>
            <button className="button" disabled>
              📤 Share Recommendations (Coming Soon)
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && recommendations.length === 0 && selectedMood && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          <p>No recommendations found for {formatMoodText(selectedMood)} mood.</p>
          <button className="button" onClick={() => fetchRecommendations(selectedMood)}>
            🔄 Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default PlaylistRecommendation;