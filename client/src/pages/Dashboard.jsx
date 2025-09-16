import { useState, useEffect } from 'react'
import { useAuth } from '../utils/AuthContext'
import MoodDetector from '../components/MoodDetector'
import RecommendationsList from '../components/RecommendationsList'
import SocialShare from '../components/SocialShare'

function Dashboard() {
  const { user, updateUser } = useAuth()
  const [currentMood, setCurrentMood] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)

  const handleMoodDetected = async (moodData) => {
    setCurrentMood(moodData)
    setLoading(true)

    try {
      // Mock API call to get recommendations based on mood
      const mockRecommendations = generateMockRecommendations(moodData)
      setRecommendations(mockRecommendations)
      
      // Update user's mood history
      const updatedHistory = [...(user.moodHistory || []), {
        ...moodData,
        timestamp: new Date().toISOString(),
        recommendations: mockRecommendations
      }]
      updateUser({ moodHistory: updatedHistory })
      
    } catch (error) {
      console.error('Error fetching recommendations:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateMockRecommendations = (mood) => {
    const recommendations = {
      happy: [
        { id: 1, title: "Good as Hell", artist: "Lizzo", genre: "Pop", image: "🎵", duration: "3:15" },
        { id: 2, title: "Happy", artist: "Pharrell Williams", genre: "Pop", image: "🎵", duration: "3:53" },
        { id: 3, title: "Walking on Sunshine", artist: "Katrina & The Waves", genre: "Rock", image: "🎵", duration: "3:59" }
      ],
      sad: [
        { id: 4, title: "Someone Like You", artist: "Adele", genre: "Soul", image: "🎵", duration: "4:45" },
        { id: 5, title: "Hurt", artist: "Johnny Cash", genre: "Country", image: "🎵", duration: "3:38" },
        { id: 6, title: "Mad World", artist: "Gary Jules", genre: "Alternative", image: "🎵", duration: "3:07" }
      ],
      energetic: [
        { id: 7, title: "Thunder", artist: "Imagine Dragons", genre: "Rock", image: "🎵", duration: "3:07" },
        { id: 8, title: "Pump It", artist: "Black Eyed Peas", genre: "Hip Hop", image: "🎵", duration: "3:33" },
        { id: 9, title: "Stronger", artist: "Kanye West", genre: "Hip Hop", image: "🎵", duration: "5:11" }
      ],
      calm: [
        { id: 10, title: "Weightless", artist: "Marconi Union", genre: "Ambient", image: "🎵", duration: "8:10" },
        { id: 11, title: "Clair de Lune", artist: "Claude Debussy", genre: "Classical", image: "🎵", duration: "5:30" },
        { id: 12, title: "Aqueous Transmission", artist: "Incubus", genre: "Alternative", image: "🎵", duration: "7:49" }
      ]
    }

    return recommendations[mood.emotion] || recommendations.happy
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome back, {user.name}! 👋</h1>
        <p>How are you feeling today? Let's find the perfect music for your mood.</p>
      </header>

      <div className="dashboard-content">
        <section className="mood-section">
          <MoodDetector onMoodDetected={handleMoodDetected} />
        </section>

        {currentMood && (
          <section className="mood-result">
            <div className="mood-display">
              <h3>Current Mood: {currentMood.emoji} {currentMood.emotion}</h3>
              <p className="mood-description">{currentMood.description}</p>
              <div className="mood-confidence">
                Confidence: {Math.round(currentMood.confidence * 100)}%
              </div>
            </div>
          </section>
        )}

        {loading && (
          <div className="loading-recommendations">
            <div className="spinner"></div>
            <p>Finding perfect songs for your mood...</p>
          </div>
        )}

        {recommendations.length > 0 && (
          <section className="recommendations-section">
            <h3>🎶 Recommended for You</h3>
            <RecommendationsList 
              recommendations={recommendations}
              currentMood={currentMood}
            />
          </section>
        )}

        {currentMood && recommendations.length > 0 && (
          <section className="share-section">
            <SocialShare 
              mood={currentMood}
              recommendations={recommendations}
            />
          </section>
        )}

        <section className="quick-actions">
          <div className="action-cards">
            <div className="action-card">
              <h4>Recent Moods</h4>
              <div className="recent-moods">
                {user.moodHistory?.slice(-3).map((mood, index) => (
                  <div key={index} className="recent-mood-item">
                    <span className="mood-emoji">{mood.emoji}</span>
                    <span className="mood-name">{mood.emotion}</span>
                    <small>{new Date(mood.timestamp).toLocaleDateString()}</small>
                  </div>
                )) || <p>No mood history yet</p>}
              </div>
            </div>

            <div className="action-card">
              <h4>Quick Mood Check</h4>
              <div className="quick-moods">
                {[
                  { emoji: '😊', emotion: 'happy', description: 'Feeling great!' },
                  { emoji: '😢', emotion: 'sad', description: 'Feeling down' },
                  { emoji: '⚡', emotion: 'energetic', description: 'Full of energy!' },
                  { emoji: '😌', emotion: 'calm', description: 'Peaceful and relaxed' }
                ].map((mood) => (
                  <button
                    key={mood.emotion}
                    className="quick-mood-btn"
                    onClick={() => handleMoodDetected({...mood, confidence: 0.8, method: 'quick-select'})}
                  >
                    {mood.emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard