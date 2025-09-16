import { useState } from 'react'
import { useAuth } from '../utils/AuthContext'

function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [editingProfile, setEditingProfile] = useState(false)
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email
  })

  const handleProfileUpdate = () => {
    updateUser(profileForm)
    setEditingProfile(false)
  }

  const getMoodStats = () => {
    const moodHistory = user.moodHistory || []
    const moodCounts = {}
    
    moodHistory.forEach(mood => {
      moodCounts[mood.emotion] = (moodCounts[mood.emotion] || 0) + 1
    })
    
    return Object.entries(moodCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
  }

  const getRecentActivity = () => {
    const activities = []
    
    // Add recent moods
    if (user.moodHistory) {
      user.moodHistory.slice(-5).forEach(mood => {
        activities.push({
          type: 'mood',
          data: mood,
          timestamp: mood.timestamp
        })
      })
    }
    
    // Add recent favorites
    if (user.favorites) {
      user.favorites.slice(-5).forEach(fav => {
        activities.push({
          type: 'favorite',
          data: fav,
          timestamp: fav.favoritedAt
        })
      })
    }
    
    return activities
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10)
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="profile-details">
            {editingProfile ? (
              <div className="edit-profile-form">
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                  placeholder="Your name"
                />
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                  placeholder="Your email"
                />
                <div className="edit-actions">
                  <button className="btn btn-primary" onClick={handleProfileUpdate}>
                    Save
                  </button>
                  <button className="btn btn-secondary" onClick={() => setEditingProfile(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1>{user.name}</h1>
                <p className="user-email">{user.email}</p>
                <button 
                  className="edit-profile-btn"
                  onClick={() => setEditingProfile(true)}
                >
                  ✏️ Edit Profile
                </button>
              </>
            )}
          </div>
        </div>
        
        <div className="profile-stats">
          <div className="stat-card">
            <h3>{user.favorites?.length || 0}</h3>
            <p>Favorite Songs</p>
          </div>
          <div className="stat-card">
            <h3>{user.moodHistory?.length || 0}</h3>
            <p>Moods Tracked</p>
          </div>
          <div className="stat-card">
            <h3>{new Set(user.moodHistory?.map(m => m.emotion) || []).size}</h3>
            <p>Unique Moods</p>
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          ❤️ Favorites
        </button>
        <button 
          className={`tab-btn ${activeTab === 'moods' ? 'active' : ''}`}
          onClick={() => setActiveTab('moods')}
        >
          😊 Mood History
        </button>
        <button 
          className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          📈 Activity
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="overview-grid">
              <div className="overview-card">
                <h3>🎭 Top Moods</h3>
                <div className="mood-stats">
                  {getMoodStats().map(([emotion, count]) => (
                    <div key={emotion} className="mood-stat-item">
                      <span className="mood-name">{emotion}</span>
                      <span className="mood-count">{count} times</span>
                    </div>
                  ))}
                  {getMoodStats().length === 0 && (
                    <p className="no-data">No mood data yet. Start tracking your moods!</p>
                  )}
                </div>
              </div>

              <div className="overview-card">
                <h3>🎵 Music Preferences</h3>
                <div className="music-prefs">
                  {user.favorites?.length > 0 ? (
                    <>
                      <p><strong>Favorite Genres:</strong></p>
                      <div className="genre-tags">
                        {[...new Set(user.favorites.map(fav => fav.genre))].map(genre => (
                          <span key={genre} className="genre-tag">{genre}</span>
                        ))}
                      </div>
                      <p><strong>Recent Favorites:</strong></p>
                      <div className="recent-favorites">
                        {user.favorites.slice(-3).map(fav => (
                          <div key={fav.id} className="mini-track">
                            {fav.title} - {fav.artist}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="no-data">No favorites yet. Start liking songs to see your preferences!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="favorites-tab">
            <h3>❤️ Your Favorite Songs</h3>
            {user.favorites?.length > 0 ? (
              <div className="favorites-grid">
                {user.favorites.map(fav => (
                  <div key={fav.id} className="favorite-item">
                    <div className="track-info">
                      <h4>{fav.title}</h4>
                      <p>{fav.artist}</p>
                      <small>{fav.genre} • Added when feeling {fav.mood}</small>
                    </div>
                    <div className="track-actions">
                      <span className="favorite-date">
                        {new Date(fav.favoritedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-data-state">
                <p>No favorite songs yet!</p>
                <p>Discover songs on the dashboard and add them to your favorites.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'moods' && (
          <div className="moods-tab">
            <h3>😊 Your Mood Journey</h3>
            {user.moodHistory?.length > 0 ? (
              <div className="mood-timeline">
                {user.moodHistory.slice().reverse().map((mood, index) => (
                  <div key={index} className="mood-timeline-item">
                    <div className="mood-info">
                      <span className="mood-emoji">{mood.emoji}</span>
                      <div className="mood-details">
                        <h4>{mood.emotion}</h4>
                        <p>{mood.description}</p>
                        {mood.originalText && (
                          <blockquote>"{mood.originalText}"</blockquote>
                        )}
                      </div>
                    </div>
                    <div className="mood-meta">
                      <span className="mood-date">
                        {new Date(mood.timestamp).toLocaleDateString()}
                      </span>
                      <span className="mood-method">
                        via {mood.method === 'text-analysis' ? 'text analysis' : 'emoji selection'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-data-state">
                <p>No mood history yet!</p>
                <p>Use the mood detector on the dashboard to start tracking your emotional journey.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="activity-tab">
            <h3>📈 Recent Activity</h3>
            {getRecentActivity().length > 0 ? (
              <div className="activity-feed">
                {getRecentActivity().map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon">
                      {activity.type === 'mood' ? '😊' : '❤️'}
                    </div>
                    <div className="activity-content">
                      {activity.type === 'mood' ? (
                        <p>Detected mood: <strong>{activity.data.emotion}</strong></p>
                      ) : (
                        <p>Favorited: <strong>{activity.data.title}</strong> by {activity.data.artist}</p>
                      )}
                      <small>{new Date(activity.timestamp).toLocaleString()}</small>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-data-state">
                <p>No activity yet!</p>
                <p>Start using MoodTunes to see your activity feed.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage