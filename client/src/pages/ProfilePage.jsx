import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { User, Settings, Heart, Music, Share2, Edit3, Camera, Bell, Shield, Palette } from 'lucide-react';
import Card3D from '../components/Card3D';

const ProfilePage = () => {
  const { currentTheme, currentMood, changeMood, availableMoods } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'music', label: 'My Music', icon: Music },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const userStats = [
    { label: 'Songs Played', value: '1,234', icon: Music },
    { label: 'Favorite Mood', value: 'Happy', icon: Heart },
    { label: 'Playlists Created', value: '12', icon: Share2 },
    { label: 'Hours Listened', value: '145', icon: User },
  ];

  const recentActivity = [
    { action: 'Listened to', item: 'Sunny Day Vibes', time: '2 hours ago', mood: 'happy' },
    { action: 'Created playlist', item: 'Calm Evening Mix', time: '1 day ago', mood: 'calm' },
    { action: 'Shared', item: 'Electric Storm', time: '2 days ago', mood: 'energetic' },
    { action: 'Liked', item: 'Forest Meditation', time: '3 days ago', mood: 'calm' },
  ];

  const favoriteGenres = [
    { name: 'Pop', percentage: 85, color: '#FF6B6B' },
    { name: 'Electronic', percentage: 70, color: '#4ECDC4' },
    { name: 'Indie', percentage: 60, color: '#45B7D1' },
    { name: 'Jazz', percentage: 45, color: '#96CEB4' },
    { name: 'Classical', percentage: 30, color: '#FECA57' },
  ];

  const moodHistory = [
    { mood: 'happy', count: 45, color: '#FFD700' },
    { mood: 'calm', count: 32, color: '#81C784' },
    { mood: 'energetic', count: 28, color: '#FF1744' },
    { mood: 'focused', count: 20, color: '#9C27B0' },
    { mood: 'sad', count: 15, color: '#4A90E2' },
    { mood: 'romantic', count: 12, color: '#E91E63' },
  ];

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="content-wrapper">
        {/* Profile Header */}
        <motion.div
          className="profile-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card3D>
            <div className="profile-banner">
              <div className="profile-avatar">
                <div 
                  className="avatar-circle"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})` 
                  }}
                >
                  <User size={40} color="white" />
                </div>
                <button 
                  className="avatar-edit"
                  style={{ 
                    background: currentTheme.colors.primary,
                    color: 'white',
                  }}
                >
                  <Camera size={16} />
                </button>
              </div>
              <div className="profile-info">
                <h1 className="profile-name" style={{ color: currentTheme.colors.text }}>
                  Alex Johnson
                </h1>
                <p className="profile-email" style={{ color: currentTheme.colors.textSecondary }}>
                  alex.johnson@example.com
                </p>
                <div className="profile-mood">
                  <span style={{ color: currentTheme.colors.textSecondary }}>Current Mood: </span>
                  <span 
                    className="current-mood-badge"
                    style={{ 
                      background: currentTheme.colors.primary,
                      color: 'white',
                    }}
                  >
                    {currentMood.charAt(0).toUpperCase() + currentMood.slice(1)}
                  </span>
                </div>
              </div>
              <button 
                className="edit-profile-btn"
                style={{ 
                  borderColor: currentTheme.colors.primary,
                  color: currentTheme.colors.primary,
                }}
              >
                <Edit3 size={16} />
                Edit Profile
              </button>
            </div>
          </Card3D>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          className="profile-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? currentTheme.colors.primary : 'transparent',
                borderColor: currentTheme.colors.primary,
                color: activeTab === tab.id ? 'white' : currentTheme.colors.primary,
              }}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div
          className="tab-content"
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'overview' && (
            <div className="overview-content">
              {/* Stats Cards */}
              <div className="stats-grid">
                {userStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card3D>
                      <div className="stat-card">
                        <div 
                          className="stat-icon"
                          style={{ color: currentTheme.colors.primary }}
                        >
                          <stat.icon size={32} />
                        </div>
                        <h3 className="stat-value text-gradient">{stat.value}</h3>
                        <p className="stat-label" style={{ color: currentTheme.colors.textSecondary }}>
                          {stat.label}
                        </p>
                      </div>
                    </Card3D>
                  </motion.div>
                ))}
              </div>

              {/* Mood Analytics */}
              <motion.div
                className="analytics-section"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card3D>
                  <div className="analytics-content">
                    <h3 className="analytics-title" style={{ color: currentTheme.colors.text }}>
                      Mood Analytics
                    </h3>
                    <div className="mood-chart">
                      {moodHistory.map((item, index) => (
                        <div key={item.mood} className="mood-bar">
                          <div className="mood-info">
                            <span style={{ color: currentTheme.colors.text }}>
                              {item.mood.charAt(0).toUpperCase() + item.mood.slice(1)}
                            </span>
                            <span style={{ color: currentTheme.colors.textSecondary }}>
                              {item.count}
                            </span>
                          </div>
                          <div className="bar-container">
                            <motion.div
                              className="bar-fill"
                              style={{ background: item.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${(item.count / 50) * 100}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card3D>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                className="activity-section"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card3D>
                  <div className="activity-content">
                    <h3 className="activity-title" style={{ color: currentTheme.colors.text }}>
                      Recent Activity
                    </h3>
                    <div className="activity-list">
                      {recentActivity.map((activity, index) => (
                        <motion.div
                          key={index}
                          className="activity-item"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <div 
                            className="activity-icon"
                            style={{ background: currentTheme.colors.primary }}
                          >
                            <Music size={16} color="white" />
                          </div>
                          <div className="activity-details">
                            <p style={{ color: currentTheme.colors.text }}>
                              <span style={{ color: currentTheme.colors.textSecondary }}>
                                {activity.action}
                              </span>{' '}
                              <strong>{activity.item}</strong>
                            </p>
                            <span 
                              className="activity-time"
                              style={{ color: currentTheme.colors.textSecondary }}
                            >
                              {activity.time}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            </div>
          )}

          {activeTab === 'music' && (
            <div className="music-content">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card3D>
                  <div className="genres-analysis">
                    <h3 className="section-title" style={{ color: currentTheme.colors.text }}>
                      Favorite Genres
                    </h3>
                    <div className="genres-chart">
                      {favoriteGenres.map((genre, index) => (
                        <div key={genre.name} className="genre-item">
                          <div className="genre-info">
                            <span style={{ color: currentTheme.colors.text }}>{genre.name}</span>
                            <span style={{ color: currentTheme.colors.textSecondary }}>
                              {genre.percentage}%
                            </span>
                          </div>
                          <div className="genre-bar">
                            <motion.div
                              className="genre-fill"
                              style={{ background: genre.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${genre.percentage}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-content">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card3D>
                  <div className="settings-section">
                    <h3 className="settings-title" style={{ color: currentTheme.colors.text }}>
                      Theme Preferences
                    </h3>
                    <div className="mood-selector-grid">
                      {availableMoods.map((mood) => (
                        <button
                          key={mood}
                          className={`mood-theme-btn ${currentMood === mood ? 'active' : ''}`}
                          onClick={() => changeMood(mood)}
                          style={{
                            background: currentMood === mood ? currentTheme.colors.primary : currentTheme.colors.cardBg,
                            borderColor: currentTheme.colors.primary,
                            color: currentMood === mood ? 'white' : currentTheme.colors.text,
                          }}
                        >
                          <Palette size={20} />
                          {mood.charAt(0).toUpperCase() + mood.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </Card3D>

                <Card3D style={{ marginTop: '30px' }}>
                  <div className="settings-section">
                    <h3 className="settings-title" style={{ color: currentTheme.colors.text }}>
                      Notifications
                    </h3>
                    <div className="settings-options">
                      <div className="setting-item">
                        <div className="setting-info">
                          <Bell size={20} style={{ color: currentTheme.colors.primary }} />
                          <div>
                            <h4 style={{ color: currentTheme.colors.text }}>New Recommendations</h4>
                            <p style={{ color: currentTheme.colors.textSecondary }}>
                              Get notified when new music matches your mood
                            </p>
                          </div>
                        </div>
                        <label className="toggle">
                          <input type="checkbox" defaultChecked />
                          <span 
                            className="slider"
                            style={{ background: currentTheme.colors.primary }}
                          />
                        </label>
                      </div>
                      <div className="setting-item">
                        <div className="setting-info">
                          <Shield size={20} style={{ color: currentTheme.colors.primary }} />
                          <div>
                            <h4 style={{ color: currentTheme.colors.text }}>Privacy Mode</h4>
                            <p style={{ color: currentTheme.colors.textSecondary }}>
                              Hide your listening activity from others
                            </p>
                          </div>
                        </div>
                        <label className="toggle">
                          <input type="checkbox" />
                          <span 
                            className="slider"
                            style={{ background: currentTheme.colors.textSecondary }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>

      <style jsx>{`
        .profile-header {
          margin-bottom: 40px;
        }

        .profile-banner {
          display: flex;
          align-items: center;
          gap: 30px;
          padding: 40px;
          flex-wrap: wrap;
        }

        .profile-avatar {
          position: relative;
        }

        .avatar-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .avatar-edit {
          position: absolute;
          bottom: 5px;
          right: 5px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .profile-info {
          flex: 1;
          min-width: 250px;
        }

        .profile-name {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .profile-email {
          font-size: 1rem;
          margin-bottom: 15px;
        }

        .profile-mood {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
        }

        .current-mood-badge {
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .edit-profile-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border: 2px solid;
          border-radius: 25px;
          background: transparent;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .edit-profile-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .profile-tabs {
          display: flex;
          gap: 15px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .tab-button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 25px;
          border: 2px solid;
          border-radius: 25px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .tab-button:hover {
          transform: translateY(-2px);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 25px;
          margin-bottom: 40px;
        }

        .stat-card {
          text-align: center;
          padding: 30px 20px;
        }

        .stat-icon {
          margin-bottom: 15px;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .analytics-section,
        .activity-section {
          margin-bottom: 40px;
        }

        .analytics-content,
        .activity-content {
          padding: 30px;
        }

        .analytics-title,
        .activity-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 25px;
        }

        .mood-chart {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .mood-bar {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mood-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .bar-container {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 1s ease;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .activity-details {
          flex: 1;
        }

        .activity-details p {
          margin: 0 0 4px 0;
          font-size: 0.95rem;
        }

        .activity-time {
          font-size: 0.8rem;
        }

        .genres-analysis {
          padding: 30px;
        }

        .genres-chart {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .genre-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .genre-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .genre-bar {
          height: 12px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          overflow: hidden;
        }

        .genre-fill {
          height: 100%;
          border-radius: 6px;
          transition: width 1s ease;
        }

        .settings-section {
          padding: 30px;
        }

        .settings-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 25px;
        }

        .mood-selector-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
        }

        .mood-theme-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px 20px;
          border: 2px solid;
          border-radius: 15px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .mood-theme-btn:hover {
          transform: scale(1.02);
        }

        .settings-options {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .setting-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .setting-info {
          display: flex;
          align-items: center;
          gap: 15px;
          flex: 1;
        }

        .setting-info h4 {
          margin: 0 0 4px 0;
          font-size: 1rem;
          font-weight: 600;
        }

        .setting-info p {
          margin: 0;
          font-size: 0.85rem;
        }

        .toggle {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }

        .toggle input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 34px;
          transition: 0.4s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          border-radius: 50%;
          transition: 0.4s;
        }

        .toggle input:checked + .slider:before {
          transform: translateX(26px);
        }

        @media (max-width: 768px) {
          .profile-banner {
            flex-direction: column;
            text-align: center;
            gap: 20px;
            padding: 30px 20px;
          }

          .profile-tabs {
            justify-content: center;
          }

          .tab-button {
            flex: 1;
            min-width: 120px;
            justify-content: center;
          }

          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
          }

          .setting-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .mood-selector-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default ProfilePage;