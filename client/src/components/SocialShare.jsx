import { useState } from 'react'

function SocialShare({ mood, recommendations }) {
  const [shareMessage, setShareMessage] = useState('')
  const [showCustomMessage, setShowCustomMessage] = useState(false)

  const generateShareText = () => {
    const topTracks = recommendations.slice(0, 3).map(track => `${track.title} by ${track.artist}`).join(', ')
    return `I'm feeling ${mood.emotion} ${mood.emoji} and MoodTunes found the perfect songs for me! Currently listening to: ${topTracks}. Check out MoodTunes for music that matches your mood! #MoodTunes #Music #${mood.emotion}`
  }

  const getShareUrl = () => {
    // In a real app, this would be a proper share URL with mood/playlist data
    try {
      const shareData = { 
        mood: { ...mood, emoji: '' }, // Remove emoji to avoid btoa encoding issues
        tracks: recommendations.slice(0, 3).map(track => ({ ...track, image: '' })) // Remove emojis
      }
      return `${window.location.origin}/shared-mood/${btoa(JSON.stringify(shareData))}`
    } catch (error) {
      // Fallback URL if encoding fails
      return `${window.location.origin}/?mood=${mood.emotion}`
    }
  }

  const handleShare = (platform) => {
    const text = shareMessage || generateShareText()
    const url = getShareUrl()
    
    let shareUrl = ''
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`
        break
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
        break
      case 'copy':
        navigator.clipboard.writeText(text + ' ' + url).then(() => {
          alert('Link copied to clipboard!')
        })
        return
      default:
        return
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  return (
    <div className="social-share">
      <h3>🔗 Share Your Mood & Music</h3>
      <p>Let your friends know what you're listening to!</p>
      
      <div className="share-preview">
        <div className="preview-card">
          <div className="preview-header">
            <span className="mood-badge">
              {mood.emoji} {mood.emotion}
            </span>
            <span className="source-badge">via MoodTunes</span>
          </div>
          <div className="preview-content">
            <p>{mood.description}</p>
            <div className="preview-tracks">
              <strong>Now playing:</strong>
              <ul>
                {recommendations.slice(0, 3).map((track, index) => (
                  <li key={track.id}>
                    {track.title} by {track.artist}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="share-options">
        <div className="quick-share">
          <h4>Quick Share</h4>
          <div className="share-buttons">
            <button 
              className="share-btn twitter-btn"
              onClick={() => handleShare('twitter')}
              title="Share on Twitter/X"
            >
              🐦 Twitter
            </button>
            <button 
              className="share-btn facebook-btn"
              onClick={() => handleShare('facebook')}
              title="Share on Facebook"
            >
              📘 Facebook
            </button>
            <button 
              className="share-btn whatsapp-btn"
              onClick={() => handleShare('whatsapp')}
              title="Share on WhatsApp"
            >
              💬 WhatsApp
            </button>
            <button 
              className="share-btn copy-btn"
              onClick={() => handleShare('copy')}
              title="Copy link"
            >
              📋 Copy Link
            </button>
          </div>
        </div>

        <div className="custom-share">
          <button 
            className="toggle-custom-btn"
            onClick={() => setShowCustomMessage(!showCustomMessage)}
          >
            {showCustomMessage ? '▼' : '▶'} Customize Message
          </button>
          
          {showCustomMessage && (
            <div className="custom-message-section">
              <textarea
                value={shareMessage}
                onChange={(e) => setShareMessage(e.target.value)}
                placeholder={generateShareText()}
                className="custom-message-input"
                rows="4"
              />
              <div className="message-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShareMessage(generateShareText())}
                >
                  Reset to Default
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShareMessage('')}
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="share-stats">
        <div className="stat-item">
          <span className="stat-icon">🎵</span>
          <span className="stat-text">{recommendations.length} songs ready to share</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🌐</span>
          <span className="stat-text">Share across all platforms</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">🎯</span>
          <span className="stat-text">Perfect for your {mood.emotion} mood</span>
        </div>
      </div>

      <div className="share-tips">
        <h4>💡 Sharing Tips</h4>
        <ul>
          <li>Your shared link will show your current mood and top 3 song recommendations</li>
          <li>Friends can click the link to discover MoodTunes and see your music taste</li>
          <li>Customize your message to add a personal touch</li>
          <li>Share different moods throughout the day to show your musical journey</li>
        </ul>
      </div>
    </div>
  )
}

export default SocialShare