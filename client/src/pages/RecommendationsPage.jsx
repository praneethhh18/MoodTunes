import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Play, Pause, Heart, Share2, SkipForward, SkipBack, Volume2, Plus } from 'lucide-react';
import Card3D from '../components/Card3D';

const RecommendationsPage = () => {
  const { currentTheme, currentMood } = useTheme();
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [likedSongs, setLikedSongs] = useState(new Set());

  const recommendations = [
    {
      id: 1,
      title: 'Sunny Day Vibes',
      artist: 'The Happy Collective',
      album: 'Positive Energy',
      duration: '3:45',
      mood: 'happy',
      cover: '🌟',
      color: '#FFD700',
    },
    {
      id: 2,
      title: 'Midnight Blues',
      artist: 'Melancholy Sounds',
      album: 'Deep Thoughts',
      duration: '4:12',
      mood: 'sad',
      cover: '🌙',
      color: '#4A90E2',
    },
    {
      id: 3,
      title: 'Electric Storm',
      artist: 'Energy Rush',
      album: 'High Voltage',
      duration: '2:58',
      mood: 'energetic',
      cover: '⚡',
      color: '#FF1744',
    },
    {
      id: 4,
      title: 'Forest Meditation',
      artist: 'Peaceful Mind',
      album: 'Nature Sounds',
      duration: '5:30',
      mood: 'calm',
      cover: '🌿',
      color: '#81C784',
    },
    {
      id: 5,
      title: 'Love Letters',
      artist: 'Romantic Hearts',
      album: 'Sweet Serenade',
      duration: '3:21',
      mood: 'romantic',
      cover: '💕',
      color: '#E91E63',
    },
    {
      id: 6,
      title: 'Focus Flow',
      artist: 'Concentration Zone',
      album: 'Deep Work',
      duration: '6:15',
      mood: 'focused',
      cover: '🎯',
      color: '#9C27B0',
    },
  ];

  const playlists = [
    {
      id: 1,
      name: 'My Happy Mix',
      songCount: 25,
      mood: 'happy',
      cover: '🎵',
    },
    {
      id: 2,
      name: 'Calm Evening',
      songCount: 18,
      mood: 'calm',
      cover: '🌅',
    },
    {
      id: 3,
      name: 'Energy Boost',
      songCount: 32,
      mood: 'energetic',
      cover: '🔥',
    },
  ];

  const togglePlay = (songId) => {
    setCurrentlyPlaying(currentlyPlaying === songId ? null : songId);
  };

  const toggleLike = (songId) => {
    const newLiked = new Set(likedSongs);
    if (newLiked.has(songId)) {
      newLiked.delete(songId);
    } else {
      newLiked.add(songId);
    }
    setLikedSongs(newLiked);
  };

  const moodFilteredSongs = recommendations.filter(song => song.mood === currentMood);
  const otherSongs = recommendations.filter(song => song.mood !== currentMood);

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="content-wrapper">
        <motion.div
          className="recommendations-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="section-title text-gradient">Music Recommendations</h1>
          <p className="section-subtitle" style={{ color: currentTheme.colors.textSecondary }}>
            Discover music perfectly tailored to your {currentMood} mood
          </p>
        </motion.div>

        {/* Current Mood Section */}
        <motion.section
          className="section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="section-title" style={{ color: currentTheme.colors.text }}>
            Perfect for Your {currentMood.charAt(0).toUpperCase() + currentMood.slice(1)} Mood
          </h2>
          <div className="songs-grid">
            {moodFilteredSongs.map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card3D>
                  <div className="song-card">
                    <div 
                      className="song-cover"
                      style={{ background: `linear-gradient(135deg, ${song.color}, ${song.color}80)` }}
                    >
                      <span className="cover-emoji">{song.cover}</span>
                      <div className="song-overlay">
                        <button
                          className="play-button"
                          onClick={() => togglePlay(song.id)}
                          style={{ background: currentTheme.colors.primary }}
                        >
                          {currentlyPlaying === song.id ? <Pause size={24} /> : <Play size={24} />}
                        </button>
                      </div>
                    </div>
                    <div className="song-info">
                      <h3 className="song-title" style={{ color: currentTheme.colors.text }}>
                        {song.title}
                      </h3>
                      <p className="song-artist" style={{ color: currentTheme.colors.textSecondary }}>
                        {song.artist}
                      </p>
                      <p className="song-duration" style={{ color: currentTheme.colors.textSecondary }}>
                        {song.duration}
                      </p>
                    </div>
                    <div className="song-actions">
                      <button
                        className={`action-button ${likedSongs.has(song.id) ? 'liked' : ''}`}
                        onClick={() => toggleLike(song.id)}
                        style={{ 
                          color: likedSongs.has(song.id) ? '#FF1744' : currentTheme.colors.textSecondary 
                        }}
                      >
                        <Heart size={18} fill={likedSongs.has(song.id) ? '#FF1744' : 'none'} />
                      </button>
                      <button
                        className="action-button"
                        style={{ color: currentTheme.colors.textSecondary }}
                      >
                        <Share2 size={18} />
                      </button>
                      <button
                        className="action-button"
                        style={{ color: currentTheme.colors.textSecondary }}
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Playlists Section */}
        <motion.section
          className="section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="section-title" style={{ color: currentTheme.colors.text }}>
            Your Playlists
          </h2>
          <div className="playlists-grid">
            {playlists.map((playlist, index) => (
              <motion.div
                key={playlist.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card3D>
                  <div className="playlist-card">
                    <div 
                      className="playlist-cover"
                      style={{ 
                        background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})` 
                      }}
                    >
                      <span className="playlist-emoji">{playlist.cover}</span>
                    </div>
                    <div className="playlist-info">
                      <h3 className="playlist-name" style={{ color: currentTheme.colors.text }}>
                        {playlist.name}
                      </h3>
                      <p className="playlist-count" style={{ color: currentTheme.colors.textSecondary }}>
                        {playlist.songCount} songs
                      </p>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Other Moods Section */}
        <motion.section
          className="section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="section-title" style={{ color: currentTheme.colors.text }}>
            Explore Other Moods
          </h2>
          <div className="other-songs-grid">
            {otherSongs.map((song, index) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <div className="compact-song-card" style={{ background: currentTheme.colors.cardBg }}>
                  <div 
                    className="compact-cover"
                    style={{ background: `linear-gradient(135deg, ${song.color}, ${song.color}80)` }}
                  >
                    <span>{song.cover}</span>
                  </div>
                  <div className="compact-info">
                    <h4 style={{ color: currentTheme.colors.text }}>{song.title}</h4>
                    <p style={{ color: currentTheme.colors.textSecondary }}>{song.artist}</p>
                  </div>
                  <div className="compact-actions">
                    <button
                      onClick={() => togglePlay(song.id)}
                      style={{ color: currentTheme.colors.primary }}
                    >
                      {currentlyPlaying === song.id ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <button
                      onClick={() => toggleLike(song.id)}
                      style={{ 
                        color: likedSongs.has(song.id) ? '#FF1744' : currentTheme.colors.textSecondary 
                      }}
                    >
                      <Heart size={16} fill={likedSongs.has(song.id) ? '#FF1744' : 'none'} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Player Controls */}
        {currentlyPlaying && (
          <motion.div
            className="player-controls"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            style={{
              background: currentTheme.colors.cardBg,
              borderColor: currentTheme.colors.primary,
            }}
          >
            <div className="player-info">
              <div 
                className="player-cover"
                style={{ 
                  background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})` 
                }}
              >
                🎵
              </div>
              <div>
                <h4 style={{ color: currentTheme.colors.text }}>Now Playing</h4>
                <p style={{ color: currentTheme.colors.textSecondary }}>
                  {recommendations.find(s => s.id === currentlyPlaying)?.title}
                </p>
              </div>
            </div>
            <div className="player-buttons">
              <button style={{ color: currentTheme.colors.primary }}>
                <SkipBack size={20} />
              </button>
              <button 
                onClick={() => togglePlay(currentlyPlaying)}
                style={{ 
                  background: currentTheme.colors.primary,
                  color: 'white',
                }}
              >
                <Pause size={24} />
              </button>
              <button style={{ color: currentTheme.colors.primary }}>
                <SkipForward size={20} />
              </button>
              <button style={{ color: currentTheme.colors.primary }}>
                <Volume2 size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .recommendations-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .songs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
        }

        .song-card {
          padding: 20px;
          text-align: center;
        }

        .song-cover {
          position: relative;
          width: 200px;
          height: 200px;
          border-radius: 20px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .song-cover:hover {
          transform: scale(1.05);
        }

        .cover-emoji {
          font-size: 4rem;
          transition: transform 0.3s ease;
        }

        .song-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .song-cover:hover .song-overlay {
          opacity: 1;
        }

        .song-cover:hover .cover-emoji {
          transform: scale(0.8);
        }

        .play-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        .play-button:hover {
          transform: scale(1.1);
        }

        .song-info {
          margin-bottom: 15px;
        }

        .song-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .song-artist, .song-duration {
          font-size: 0.9rem;
          margin-bottom: 3px;
        }

        .song-actions {
          display: flex;
          justify-content: center;
          gap: 15px;
        }

        .action-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .action-button:hover {
          transform: scale(1.1);
        }

        .playlists-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 25px;
        }

        .playlist-card {
          padding: 25px;
          text-align: center;
        }

        .playlist-cover {
          width: 120px;
          height: 120px;
          border-radius: 15px;
          margin: 0 auto 15px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .playlist-emoji {
          font-size: 3rem;
        }

        .playlist-name {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .playlist-count {
          font-size: 0.9rem;
        }

        .other-songs-grid {
          display: grid;
          gap: 15px;
        }

        .compact-song-card {
          display: flex;
          align-items: center;
          padding: 15px 20px;
          border-radius: 12px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.3s ease;
        }

        .compact-song-card:hover {
          transform: translateX(5px);
        }

        .compact-cover {
          width: 50px;
          height: 50px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          font-size: 1.5rem;
        }

        .compact-info {
          flex: 1;
        }

        .compact-info h4 {
          margin: 0 0 3px 0;
          font-size: 1rem;
          font-weight: 600;
        }

        .compact-info p {
          margin: 0;
          font-size: 0.85rem;
        }

        .compact-actions {
          display: flex;
          gap: 10px;
        }

        .compact-actions button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: transform 0.3s ease;
        }

        .compact-actions button:hover {
          transform: scale(1.1);
        }

        .player-controls {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 30px;
          padding: 15px 25px;
          border-radius: 50px;
          backdrop-filter: blur(20px);
          border: 1px solid;
          z-index: 1000;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .player-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .player-cover {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .player-info h4 {
          margin: 0;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .player-info p {
          margin: 0;
          font-size: 0.8rem;
        }

        .player-buttons {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .player-buttons button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
          border-radius: 50%;
          transition: transform 0.3s ease;
        }

        .player-buttons button:hover {
          transform: scale(1.1);
        }

        .player-buttons button:nth-child(2) {
          padding: 12px;
          border-radius: 50%;
        }

        @media (max-width: 768px) {
          .songs-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .song-cover {
            width: 150px;
            height: 150px;
          }

          .cover-emoji {
            font-size: 3rem;
          }

          .playlists-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }

          .player-controls {
            left: 20px;
            right: 20px;
            transform: none;
            flex-direction: column;
            gap: 15px;
          }

          .player-info {
            order: 2;
          }

          .player-buttons {
            order: 1;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default RecommendationsPage;