import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Music, Heart, History, User } from 'lucide-react';
import axios from 'axios';

const Home = () => {
  const { user } = useAuth();
  const [recentMoods, setRecentMoods] = useState([]);
  const [recentPlaylists, setRecentPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        const [moodResponse, playlistResponse] = await Promise.all([
          axios.get('/api/profile/mood-history?limit=3'),
          axios.get('/api/profile/playlist-history?limit=3')
        ]);
        
        setRecentMoods(moodResponse.data.history);
        setRecentPlaylists(playlistResponse.data.history);
      } catch (error) {
        console.error('Failed to fetch recent activity:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentActivity();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className="card" style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>
          <Music size={48} style={{ marginRight: '16px', display: 'inline' }} />
          Welcome to MoodTunes
        </h1>
        <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>
          Discover music that matches your mood, {user?.username}!
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/moods" className="btn btn-primary">
            <Heart size={20} style={{ marginRight: '8px', display: 'inline' }} />
            Explore Moods
          </Link>
          <Link to="/profile" className="btn btn-secondary">
            <User size={20} style={{ marginRight: '8px', display: 'inline' }} />
            View Profile
          </Link>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center' }}>
            <History size={24} style={{ marginRight: '12px' }} />
            Recent Moods
          </h3>
          
          {loading ? (
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>
              Loading...
            </div>
          ) : recentMoods.length > 0 ? (
            <div>
              {recentMoods.map((mood) => (
                <div key={mood.id} className="history-item">
                  <div className="history-date">{formatDate(mood.created_at)}</div>
                  <div className="history-content" style={{ textTransform: 'capitalize' }}>
                    {mood.mood}
                  </div>
                </div>
              ))}
              <Link to="/profile" style={{ color: '#667eea', fontSize: '14px' }}>
                View all mood history →
              </Link>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>
              <p>No mood history yet.</p>
              <Link to="/moods" className="btn btn-primary" style={{ fontSize: '14px', padding: '8px 16px' }}>
                Start exploring moods
              </Link>
            </div>
          )}
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center' }}>
            <Music size={24} style={{ marginRight: '12px' }} />
            Recent Playlists
          </h3>
          
          {loading ? (
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>
              Loading...
            </div>
          ) : recentPlaylists.length > 0 ? (
            <div>
              {recentPlaylists.map((playlist) => (
                <div key={playlist.id} className="history-item">
                  <div className="history-date">{formatDate(playlist.created_at)}</div>
                  <div className="history-content">{playlist.playlist_name}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
                    {playlist.playlist_data.tracks?.length || 0} tracks
                  </div>
                </div>
              ))}
              <Link to="/profile" style={{ color: '#667eea', fontSize: '14px' }}>
                View all playlist history →
              </Link>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>
              <p>No playlist history yet.</p>
              <Link to="/moods" className="btn btn-primary" style={{ fontSize: '14px', padding: '8px 16px' }}>
                Create your first playlist
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;