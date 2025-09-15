import React, { useState, useEffect } from 'react';
import MockMoodDetection from './components/MockMoodDetection';
import PlaylistRecommendation from './components/PlaylistRecommendation';
import { checkServerHealth } from './services/api';

/**
 * Main MoodTunes Application Component
 * 
 * Integrates mood detection with song recommendations to provide
 * a complete mood-based music discovery experience.
 */
function App() {
  const [detectedMood, setDetectedMood] = useState(null);
  const [serverOnline, setServerOnline] = useState(false);
  const [checkingServer, setCheckingServer] = useState(true);

  // Check server health on app load
  useEffect(() => {
    const checkServer = async () => {
      try {
        const isHealthy = await checkServerHealth();
        setServerOnline(isHealthy);
      } catch (error) {
        console.error('Server health check failed:', error);
        setServerOnline(false);
      } finally {
        setCheckingServer(false);
      }
    };

    checkServer();
  }, []);

  const handleMoodDetected = (mood) => {
    setDetectedMood(mood);
  };

  const handleMoodChange = (mood) => {
    setDetectedMood(mood);
  };

  return (
    <div className="container">
      {/* Header */}
      <header style={{ textAlign: 'center', padding: '20px 0' }}>
        <h1 style={{ 
          color: 'white', 
          fontSize: '3em', 
          margin: '0 0 16px 0',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          🎵 MoodTunes
        </h1>
        <p style={{ 
          color: 'rgba(255,255,255,0.9)', 
          fontSize: '1.2em',
          margin: 0,
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
        }}>
          Discover music that matches your mood
        </p>
      </header>

      {/* Server Status */}
      {checkingServer && (
        <div className="card" style={{ textAlign: 'center' }}>
          <p>🔍 Checking server connection...</p>
        </div>
      )}

      {!checkingServer && !serverOnline && (
        <div className="error">
          ⚠️ Backend server is not running. Please start the server at http://localhost:3001
        </div>
      )}

      {!checkingServer && serverOnline && (
        <>
          {/* Mood Detection Section */}
          <MockMoodDetection onMoodDetected={handleMoodDetected} />

          {/* Playlist Recommendation Section */}
          <PlaylistRecommendation 
            detectedMood={detectedMood}
            onMoodChange={handleMoodChange}
          />
        </>
      )}

      {/* Footer */}
      <footer style={{ 
        textAlign: 'center', 
        padding: '40px 20px',
        color: 'rgba(255,255,255,0.8)',
        fontSize: '14px'
      }}>
        <div className="card" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <h3>🚀 Future Enhancements</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '16px',
            textAlign: 'left'
          }}>
            <div>
              <h4>🎭 Mood Detection</h4>
              <ul style={{ fontSize: '12px', paddingLeft: '16px' }}>
                <li>Real-time facial recognition</li>
                <li>Voice emotion analysis</li>
                <li>Confidence scoring</li>
                <li>Multiple detection methods</li>
              </ul>
            </div>
            <div>
              <h4>🎵 Music Integration</h4>
              <ul style={{ fontSize: '12px', paddingLeft: '16px' }}>
                <li>Spotify API integration</li>
                <li>Apple Music support</li>
                <li>YouTube Music connection</li>
                <li>Custom playlist creation</li>
              </ul>
            </div>
            <div>
              <h4>🤖 AI & Personalization</h4>
              <ul style={{ fontSize: '12px', paddingLeft: '16px' }}>
                <li>Machine learning recommendations</li>
                <li>User preference learning</li>
                <li>Collaborative filtering</li>
                <li>Listening history analysis</li>
              </ul>
            </div>
          </div>
        </div>
        
        <p style={{ marginTop: '20px' }}>
          Built with ❤️ using React + Express | 
          <a href="https://github.com/praneethhh18/MoodTunes" 
             style={{ color: 'rgba(255,255,255,0.9)', marginLeft: '8px' }}>
            View on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;