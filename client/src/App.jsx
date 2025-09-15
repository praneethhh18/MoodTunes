import { useState, useEffect } from 'react'
import MoodDetection from './components/MoodDetection'
import PlaylistRecommendation from './components/PlaylistRecommendation'

function App() {
  const [currentMood, setCurrentMood] = useState(null)
  const [playlist, setPlaylist] = useState([])
  const [isSharedContent, setIsSharedContent] = useState(false)

  const handleMoodDetected = (mood) => {
    setCurrentMood(mood)
    setIsSharedContent(false)
    // Generate playlist based on mood
    generatePlaylist(mood)
  }

  // Check for shared content on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const shareData = urlParams.get('share')
    
    if (shareData) {
      try {
        const decodedData = JSON.parse(atob(shareData))
        setCurrentMood(decodedData.mood)
        setIsSharedContent(true)
        
        if (decodedData.playlist) {
          // Use shared playlist data
          const sharedPlaylist = decodedData.playlist.map((song, index) => ({
            id: index + 1,
            title: song.title,
            artist: song.artist,
            duration: "3:30" // Default duration for shared songs
          }))
          setPlaylist(sharedPlaylist)
        } else {
          // Generate playlist based on shared mood
          generatePlaylist(decodedData.mood)
        }
      } catch (error) {
        console.error('Error parsing shared data:', error)
        // Fall back to normal app behavior
      }
    }
  }, [])

  const generatePlaylist = (mood) => {
    // Mock playlist generation based on mood
    const moodPlaylists = {
      happy: [
        { id: 1, title: "Good as Hell", artist: "Lizzo", duration: "3:31" },
        { id: 2, title: "Happy", artist: "Pharrell Williams", duration: "3:53" },
        { id: 3, title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", duration: "4:30" },
        { id: 4, title: "Can't Stop the Feeling!", artist: "Justin Timberlake", duration: "3:56" },
        { id: 5, title: "Walking on Sunshine", artist: "Katrina and the Waves", duration: "3:59" }
      ],
      sad: [
        { id: 1, title: "Someone Like You", artist: "Adele", duration: "4:45" },
        { id: 2, title: "Hurt", artist: "Johnny Cash", duration: "3:38" },
        { id: 3, title: "Mad World", artist: "Gary Jules", duration: "3:07" },
        { id: 4, title: "The Sound of Silence", artist: "Simon & Garfunkel", duration: "3:05" },
        { id: 5, title: "Everybody Hurts", artist: "R.E.M.", duration: "5:17" }
      ],
      energetic: [
        { id: 1, title: "Eye of the Tiger", artist: "Survivor", duration: "4:04" },
        { id: 2, title: "Pump It", artist: "The Black Eyed Peas", duration: "3:33" },
        { id: 3, title: "Thunder", artist: "Imagine Dragons", duration: "3:07" },
        { id: 4, title: "Stronger", artist: "Kelly Clarkson", duration: "3:42" },
        { id: 5, title: "Roar", artist: "Katy Perry", duration: "3:43" }
      ],
      relaxed: [
        { id: 1, title: "Weightless", artist: "Marconi Union", duration: "8:10" },
        { id: 2, title: "Clair de Lune", artist: "Claude Debussy", duration: "5:00" },
        { id: 3, title: "Gymnopédie No. 1", artist: "Erik Satie", duration: "3:30" },
        { id: 4, title: "River", artist: "Joni Mitchell", duration: "4:00" },
        { id: 5, title: "The Night We Met", artist: "Lord Huron", duration: "3:28" }
      ]
    }

    setPlaylist(moodPlaylists[mood] || [])
  }

  return (
    <div className="container">
      <h1>🎵 MoodTunes</h1>
      <p>Discover music that matches your mood and share it with friends!</p>
      
      {isSharedContent && (
        <div style={{ 
          background: '#4CAF50', 
          color: 'white', 
          padding: '10px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          🎵 You're viewing a shared mood and playlist from a friend!
        </div>
      )}
      
      <MoodDetection 
        onMoodDetected={handleMoodDetected}
        currentMood={currentMood}
      />
      
      {currentMood && playlist.length > 0 && (
        <PlaylistRecommendation 
          mood={currentMood}
          playlist={playlist}
        />
      )}
    </div>
  )
}

export default App