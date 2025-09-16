import { useState } from 'react'
import { useAuth } from '../utils/AuthContext'

function RecommendationsList({ recommendations, currentMood }) {
  const { user, updateUser } = useAuth()
  const [playingTrack, setPlayingTrack] = useState(null)

  const handleFavorite = (track) => {
    const favorites = user.favorites || []
    const isAlreadyFavorite = favorites.some(fav => fav.id === track.id)
    
    let updatedFavorites
    if (isAlreadyFavorite) {
      updatedFavorites = favorites.filter(fav => fav.id !== track.id)
    } else {
      updatedFavorites = [...favorites, { ...track, favoritedAt: new Date().toISOString(), mood: currentMood.emotion }]
    }
    
    updateUser({ favorites: updatedFavorites })
  }

  const isFavorite = (trackId) => {
    return user.favorites?.some(fav => fav.id === trackId) || false
  }

  const handlePlay = (track) => {
    if (playingTrack?.id === track.id) {
      setPlayingTrack(null) // Stop playing
    } else {
      setPlayingTrack(track) // Start playing
      // In a real app, this would trigger actual audio playback
      setTimeout(() => setPlayingTrack(null), 3000) // Auto-stop after 3 seconds for demo
    }
  }

  const getMoodColor = (emotion) => {
    const colors = {
      happy: '#ffd700',
      sad: '#87ceeb',
      angry: '#ff6b6b',
      calm: '#98fb98',
      excited: '#ff69b4',
      romantic: '#ff1493',
      thoughtful: '#dda0dd',
      confident: '#ffa500',
      energetic: '#ff4500'
    }
    return colors[emotion] || '#ffd700'
  }

  return (
    <div className="recommendations-list">
      <div className="recommendations-header">
        <div className="mood-indicator" style={{ backgroundColor: getMoodColor(currentMood.emotion) }}>
          <span className="mood-emoji">{currentMood.emoji}</span>
          <span className="mood-name">{currentMood.emotion}</span>
        </div>
        <p className="recommendations-subtitle">
          {recommendations.length} songs curated for your {currentMood.emotion} mood
        </p>
      </div>

      <div className="tracks-grid">
        {recommendations.map((track) => (
          <div key={track.id} className="track-card">
            <div className="track-image">
              <span className="track-emoji">{track.image}</span>
              <button 
                className={`play-btn ${playingTrack?.id === track.id ? 'playing' : ''}`}
                onClick={() => handlePlay(track)}
                title={playingTrack?.id === track.id ? 'Stop' : 'Play'}
              >
                {playingTrack?.id === track.id ? '⏸️' : '▶️'}
              </button>
            </div>
            
            <div className="track-info">
              <h4 className="track-title">{track.title}</h4>
              <p className="track-artist">{track.artist}</p>
              <div className="track-meta">
                <span className="track-genre">{track.genre}</span>
                <span className="track-duration">{track.duration}</span>
              </div>
            </div>

            <div className="track-actions">
              <button
                className={`favorite-btn ${isFavorite(track.id) ? 'favorited' : ''}`}
                onClick={() => handleFavorite(track)}
                title={isFavorite(track.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFavorite(track.id) ? '❤️' : '🤍'}
              </button>
              
              <button className="more-options-btn" title="More options">
                ⋯
              </button>
            </div>

            {playingTrack?.id === track.id && (
              <div className="playing-indicator">
                <div className="sound-wave">
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                  <div className="wave-bar"></div>
                </div>
                <span>Now Playing</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="playlist-actions">
        <button className="btn btn-secondary">
          💾 Save as Playlist
        </button>
        <button className="btn btn-secondary">
          🔄 Get More Recommendations
        </button>
        <button className="btn btn-secondary">
          📱 Download for Offline
        </button>
      </div>

      <div className="recommendation-stats">
        <div className="stat-item">
          <span className="stat-number">{recommendations.length}</span>
          <span className="stat-label">Songs</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {recommendations.reduce((total, track) => {
              const [minutes, seconds] = track.duration.split(':').map(Number)
              return total + minutes + (seconds / 60)
            }, 0).toFixed(0)}
          </span>
          <span className="stat-label">Minutes</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {new Set(recommendations.map(track => track.genre)).size}
          </span>
          <span className="stat-label">Genres</span>
        </div>
      </div>
    </div>
  )
}

export default RecommendationsList