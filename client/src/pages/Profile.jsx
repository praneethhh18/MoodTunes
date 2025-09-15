import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Heart, 
  Music, 
  History, 
  Trash2, 
  Star,
  Calendar,
  Clock
} from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [playlistHistory, setPlaylistHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('favorites');

  useEffect(() => {
    fetchProfile();
    fetchHistory();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/profile');
      setProfile(response.data.profile);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const fetchHistory = async () => {
    try {
      const [moodResponse, playlistResponse] = await Promise.all([
        axios.get('/api/profile/mood-history'),
        axios.get('/api/profile/playlist-history')
      ]);
      
      setMoodHistory(moodResponse.data.history);
      setPlaylistHistory(playlistResponse.data.history);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavoriteMood = async (mood) => {
    try {
      const newFavorites = profile.favorite_moods.filter(m => m !== mood);
      
      await axios.put('/api/profile/favorites', {
        favorite_moods: newFavorites,
        favorite_playlists: profile.favorite_playlists
      });
      
      setProfile(prev => ({ ...prev, favorite_moods: newFavorites }));
      setMessage('Removed from favorite moods');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Failed to remove favorite mood:', error);
    }
  };

  const removeFavoritePlaylist = async (playlistId) => {
    try {
      const newFavorites = profile.favorite_playlists.filter(p => p.id !== playlistId);
      
      await axios.put('/api/profile/favorites', {
        favorite_moods: profile.favorite_moods,
        favorite_playlists: newFavorites
      });
      
      setProfile(prev => ({ ...prev, favorite_playlists: newFavorites }));
      setMessage('Removed from favorite playlists');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Failed to remove favorite playlist:', error);
    }
  };

  const clearMoodHistory = async () => {
    if (!window.confirm('Are you sure you want to clear your mood history? This action cannot be undone.')) {
      return;
    }

    try {
      await axios.delete('/api/profile/mood-history');
      setMoodHistory([]);
      setMessage('Mood history cleared');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Failed to clear mood history:', error);
    }
  };

  const clearPlaylistHistory = async () => {
    if (!window.confirm('Are you sure you want to clear your playlist history? This action cannot be undone.')) {
      return;
    }

    try {
      await axios.delete('/api/profile/playlist-history');
      setPlaylistHistory([]);
      setMessage('Playlist history cleared');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Failed to clear playlist history:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateShort = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div>
      {/* Profile Header */}
      <div className="card" style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          borderRadius: '50%', 
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px'
        }}>
          <User size={40} color="white" />
        </div>
        <h1 style={{ marginBottom: '8px' }}>{user?.username}</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '16px' }}>
          {user?.email}
        </p>
        <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
          <Calendar size={16} style={{ marginRight: '4px', display: 'inline' }} />
          Member since {formatDateShort(profile?.created_at)}
        </div>
      </div>

      {message && (
        <div className="success" style={{ marginBottom: '24px' }}>
          {message}
        </div>
      )}

      {/* Tabs */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '24px',
          borderBottom: '1px solid rgba(255,255,255,0.2)'
        }}>
          <button
            onClick={() => setActiveTab('favorites')}
            style={{
              background: activeTab === 'favorites' ? 'rgba(102, 126, 234, 0.3)' : 'transparent',
              border: 'none',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              borderBottom: activeTab === 'favorites' ? '2px solid #667eea' : '2px solid transparent'
            }}
          >
            <Heart size={16} style={{ marginRight: '8px', display: 'inline' }} />
            Favorites
          </button>
          <button
            onClick={() => setActiveTab('history')}
            style={{
              background: activeTab === 'history' ? 'rgba(102, 126, 234, 0.3)' : 'transparent',
              border: 'none',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              borderBottom: activeTab === 'history' ? '2px solid #667eea' : '2px solid transparent'
            }}
          >
            <History size={16} style={{ marginRight: '8px', display: 'inline' }} />
            History
          </button>
        </div>
      </div>

      {/* Favorites Tab */}
      {activeTab === 'favorites' && (
        <div className="grid grid-2">
          <div className="card">
            <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center' }}>
              <Heart size={20} style={{ marginRight: '8px' }} />
              Favorite Moods ({profile?.favorite_moods?.length || 0})
            </h3>
            
            {profile?.favorite_moods?.length > 0 ? (
              <div className="grid" style={{ gap: '12px' }}>
                {profile.favorite_moods.map((mood) => (
                  <div 
                    key={mood}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'rgba(255,255,255,0.05)',
                      padding: '12px',
                      borderRadius: '8px'
                    }}
                  >
                    <span style={{ textTransform: 'capitalize', fontWeight: '500' }}>
                      {mood}
                    </span>
                    <button
                      onClick={() => removeFavoriteMood(mood)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255,255,255,0.5)',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
                No favorite moods yet. Explore moods to add favorites!
              </p>
            )}
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center' }}>
              <Star size={20} style={{ marginRight: '8px' }} />
              Favorite Playlists ({profile?.favorite_playlists?.length || 0})
            </h3>
            
            {profile?.favorite_playlists?.length > 0 ? (
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {profile.favorite_playlists.map((playlist) => (
                  <div 
                    key={playlist.id}
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      padding: '16px',
                      borderRadius: '8px',
                      marginBottom: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ marginBottom: '4px' }}>{playlist.name}</h4>
                        <p style={{ 
                          fontSize: '12px', 
                          color: 'rgba(255,255,255,0.6)',
                          marginBottom: '8px'
                        }}>
                          {playlist.description}
                        </p>
                        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                          {playlist.tracks?.length || 0} tracks
                        </span>
                      </div>
                      <button
                        onClick={() => removeFavoritePlaylist(playlist.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'rgba(255,255,255,0.5)',
                          cursor: 'pointer',
                          padding: '4px'
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
                No favorite playlists yet. Save playlists to see them here!
              </p>
            )}
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="grid grid-2">
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center' }}>
                <Clock size={20} style={{ marginRight: '8px' }} />
                Mood History ({moodHistory.length})
              </h3>
              {moodHistory.length > 0 && (
                <button
                  onClick={clearMoodHistory}
                  className="btn btn-danger"
                  style={{ fontSize: '12px', padding: '6px 12px' }}
                >
                  <Trash2 size={14} style={{ marginRight: '4px', display: 'inline' }} />
                  Clear
                </button>
              )}
            </div>
            
            {moodHistory.length > 0 ? (
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {moodHistory.map((entry) => (
                  <div key={entry.id} className="history-item">
                    <div className="history-date">{formatDate(entry.created_at)}</div>
                    <div className="history-content" style={{ textTransform: 'capitalize' }}>
                      {entry.mood}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
                No mood history yet. Start exploring moods to build your history!
              </p>
            )}
          </div>

          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center' }}>
                <Music size={20} style={{ marginRight: '8px' }} />
                Playlist History ({playlistHistory.length})
              </h3>
              {playlistHistory.length > 0 && (
                <button
                  onClick={clearPlaylistHistory}
                  className="btn btn-danger"
                  style={{ fontSize: '12px', padding: '6px 12px' }}
                >
                  <Trash2 size={14} style={{ marginRight: '4px', display: 'inline' }} />
                  Clear
                </button>
              )}
            </div>
            
            {playlistHistory.length > 0 ? (
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {playlistHistory.map((entry) => (
                  <div key={entry.id} className="history-item">
                    <div className="history-date">{formatDate(entry.created_at)}</div>
                    <div className="history-content">{entry.playlist_name}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
                      {entry.playlist_data.tracks?.length || 0} tracks
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
                No playlist history yet. Save playlists to build your history!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;