import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>MoodTunes Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.email}</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="welcome-card">
          <h2>Welcome to MoodTunes! 🎵</h2>
          <p>Your music journey starts here. Authentication is working perfectly!</p>
          
          <div className="user-details">
            <h3>Your Account Details:</h3>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>User ID:</strong> {user?.id}</p>
            <p><strong>Member since:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
          </div>

          <div className="features-preview">
            <h3>Coming Soon:</h3>
            <ul>
              <li>🎵 Mood-based music recommendations</li>
              <li>🎧 Personalized playlists</li>
              <li>📊 Music analytics and insights</li>
              <li>👥 Social features and sharing</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;