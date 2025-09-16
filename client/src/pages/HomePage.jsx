import { useState } from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0)
  
  const backgroundImages = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  ]

  return (
    <div className="homepage" style={{ background: backgroundImages[currentBgIndex] }}>
      <div className="homepage-content">
        <header className="hero-section">
          <div className="logo-section">
            <h1 className="app-title">🎵 MoodTunes</h1>
            <p className="app-tagline">Music that matches your mood</p>
          </div>
          
          <div className="hero-text">
            <h2>Discover music that resonates with your emotions</h2>
            <p>Let AI analyze your mood and curate the perfect playlist just for you</p>
          </div>
          
          <div className="cta-buttons">
            <Link to="/signup" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Sign In
            </Link>
          </div>
        </header>

        <section className="features-preview">
          <h3>What makes MoodTunes special?</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">😊</div>
              <h4>Mood Detection</h4>
              <p>Advanced sentiment analysis to understand your emotions</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎶</div>
              <h4>Smart Recommendations</h4>
              <p>AI-powered music suggestions tailored to your mood</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">❤️</div>
              <h4>Personal Favorites</h4>
              <p>Save and organize your favorite moods and playlists</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔗</div>
              <h4>Social Sharing</h4>
              <p>Share your mood and music with friends across platforms</p>
            </div>
          </div>
        </section>

        <section className="mood-emojis">
          <p>How are you feeling today?</p>
          <div className="emoji-preview">
            {['😊', '😢', '😠', '😴', '🤗', '😍', '🤔', '😎'].map((emoji, index) => (
              <span 
                key={index} 
                className="emoji-demo"
                onClick={() => setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length)}
              >
                {emoji}
              </span>
            ))}
          </div>
          <small>Click the emojis to see different themes!</small>
        </section>
      </div>
    </div>
  )
}

export default HomePage