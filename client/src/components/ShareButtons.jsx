import { useState } from 'react'

const ShareButtons = ({ type, mood, playlist = [], shareText }) => {
  const [copySuccess, setCopySuccess] = useState(false)

  // Generate shareable URL with encoded data
  const generateShareableUrl = () => {
    const baseUrl = window.location.origin + window.location.pathname
    const shareData = {
      mood,
      timestamp: Date.now(),
      ...(type === 'playlist' && { 
        playlist: playlist.slice(0, 5).map(song => ({
          title: song.title,
          artist: song.artist
        }))
      })
    }
    
    // Encode the share data in the URL
    const encodedData = btoa(JSON.stringify(shareData))
    return `${baseUrl}?share=${encodedData}`
  }

  const shareUrl = generateShareableUrl()

  // Copy to clipboard functionality
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = shareUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }

  // Social media sharing URLs
  const getShareUrls = () => {
    const encodedText = encodeURIComponent(shareText)
    const encodedUrl = encodeURIComponent(shareUrl)
    
    return {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`
    }
  }

  const shareUrls = getShareUrls()

  return (
    <div className="share-buttons">
      <button 
        className="share-button copy"
        onClick={copyToClipboard}
        title="Copy shareable link"
      >
        📋 {copySuccess ? 'Copied!' : 'Copy Link'}
      </button>
      
      <a 
        href={shareUrls.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="share-button twitter"
        title="Share on Twitter/X"
      >
        🐦 Twitter
      </a>
      
      <a 
        href={shareUrls.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="share-button facebook"
        title="Share on Facebook"
      >
        📘 Facebook
      </a>
      
      <a 
        href={shareUrls.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="share-button whatsapp"
        title="Share on WhatsApp"
      >
        💬 WhatsApp
      </a>
    </div>
  )
}

export default ShareButtons