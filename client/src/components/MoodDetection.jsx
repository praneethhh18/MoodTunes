import { useState } from 'react'
import ShareButtons from './ShareButtons'

const MoodDetection = ({ onMoodDetected, currentMood }) => {
  const [isDetecting, setIsDetecting] = useState(false)

  const moods = [
    { value: 'happy', emoji: '😊', label: 'Happy' },
    { value: 'sad', emoji: '😢', label: 'Sad' },
    { value: 'energetic', emoji: '⚡', label: 'Energetic' },
    { value: 'relaxed', emoji: '😌', label: 'Relaxed' }
  ]

  const detectMood = (selectedMood) => {
    setIsDetecting(true)
    // Simulate mood detection process
    setTimeout(() => {
      onMoodDetected(selectedMood)
      setIsDetecting(false)
    }, 1500)
  }

  return (
    <div className="mood-detection">
      <h2>How are you feeling today?</h2>
      
      {!currentMood ? (
        <div>
          <p>Choose your current mood:</p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => detectMood(mood.value)}
                disabled={isDetecting}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '20px',
                  fontSize: '16px',
                  minWidth: '120px'
                }}
              >
                <span style={{ fontSize: '32px' }}>{mood.emoji}</span>
                {mood.label}
              </button>
            ))}
          </div>
          
          {isDetecting && (
            <div style={{ marginTop: '20px' }}>
              <p>🎵 Analyzing your mood...</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mood-result">
          <h3>Mood Detected!</h3>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>
            {moods.find(m => m.value === currentMood)?.emoji}
          </div>
          <p>You're feeling <strong>{moods.find(m => m.value === currentMood)?.label}</strong> today!</p>
          
          <ShareButtons 
            type="mood"
            mood={currentMood}
            shareText={`I'm feeling ${moods.find(m => m.value === currentMood)?.label} today! Check out my mood-based playlist on MoodTunes 🎵`}
          />
          
          <button 
            onClick={() => onMoodDetected(null)}
            style={{ marginTop: '10px', backgroundColor: '#666' }}
          >
            Detect Again
          </button>
        </div>
      )}
    </div>
  )
}

export default MoodDetection