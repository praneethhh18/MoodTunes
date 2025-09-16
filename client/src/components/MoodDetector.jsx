import { useState } from 'react'

function MoodDetector({ onMoodDetected }) {
  const [textInput, setTextInput] = useState('')
  const [selectedEmoji, setSelectedEmoji] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const moodEmojis = [
    { emoji: '😊', emotion: 'happy', description: 'Feeling joyful and upbeat' },
    { emoji: '😢', emotion: 'sad', description: 'Feeling down or melancholy' },
    { emoji: '😠', emotion: 'angry', description: 'Feeling frustrated or upset' },
    { emoji: '😴', emotion: 'calm', description: 'Feeling peaceful and relaxed' },
    { emoji: '🤗', emotion: 'excited', description: 'Feeling enthusiastic and energetic' },
    { emoji: '😍', emotion: 'romantic', description: 'Feeling love and affection' },
    { emoji: '🤔', emotion: 'thoughtful', description: 'Feeling contemplative' },
    { emoji: '😎', emotion: 'confident', description: 'Feeling cool and self-assured' }
  ]

  const analyzeSentiment = (text) => {
    // Simple sentiment analysis (in real app, this would use NLP API)
    const positiveWords = ['happy', 'joy', 'great', 'awesome', 'love', 'excited', 'amazing', 'wonderful', 'fantastic', 'good']
    const negativeWords = ['sad', 'angry', 'terrible', 'awful', 'hate', 'disappointed', 'frustrated', 'bad', 'horrible', 'depressed']
    const calmWords = ['calm', 'peaceful', 'relaxed', 'tranquil', 'serene', 'quiet', 'zen', 'meditation', 'rest']
    const energeticWords = ['energetic', 'pump', 'workout', 'exercise', 'dance', 'party', 'hyped', 'motivated', 'active']

    const words = text.toLowerCase().split(' ')
    
    let positiveScore = 0
    let negativeScore = 0
    let calmScore = 0
    let energeticScore = 0

    words.forEach(word => {
      if (positiveWords.some(pw => word.includes(pw))) positiveScore++
      if (negativeWords.some(nw => word.includes(nw))) negativeScore++
      if (calmWords.some(cw => word.includes(cw))) calmScore++
      if (energeticWords.some(ew => word.includes(ew))) energeticScore++
    })

    const scores = {
      happy: positiveScore,
      sad: negativeScore,
      calm: calmScore,
      energetic: energeticScore
    }

    const maxScore = Math.max(...Object.values(scores))
    const dominantMood = Object.keys(scores).find(key => scores[key] === maxScore) || 'happy'
    
    const confidence = maxScore > 0 ? Math.min(0.9, 0.5 + (maxScore * 0.2)) : 0.6

    return {
      emotion: dominantMood,
      confidence,
      scores
    }
  }

  const handleTextAnalysis = async () => {
    if (!textInput.trim()) return

    setIsAnalyzing(true)
    
    // Simulate API delay
    setTimeout(() => {
      const analysis = analyzeSentiment(textInput)
      const moodData = moodEmojis.find(m => m.emotion === analysis.emotion) || moodEmojis[0]
      
      onMoodDetected({
        ...moodData,
        confidence: analysis.confidence,
        method: 'text-analysis',
        originalText: textInput
      })
      
      setIsAnalyzing(false)
      setTextInput('')
    }, 1500)
  }

  const handleEmojiSelect = (moodData) => {
    setSelectedEmoji(moodData.emoji)
    onMoodDetected({
      ...moodData,
      confidence: 0.9,
      method: 'emoji-selection'
    })
  }

  return (
    <div className="mood-detector">
      <h2>🧠 Detect Your Mood</h2>
      
      <div className="detection-methods">
        <div className="text-analysis">
          <h3>Tell us how you're feeling</h3>
          <div className="text-input-section">
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Describe your current mood or how your day is going... (e.g., 'I'm feeling great today, really excited about my new project!')"
              className="mood-textarea"
              rows="4"
            />
            <button 
              onClick={handleTextAnalysis}
              disabled={!textInput.trim() || isAnalyzing}
              className="btn btn-primary analyze-btn"
            >
              {isAnalyzing ? (
                <>
                  <span className="mini-spinner"></span>
                  Analyzing...
                </>
              ) : (
                'Analyze My Mood'
              )}
            </button>
          </div>
        </div>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="emoji-selection">
          <h3>Pick your current mood</h3>
          <div className="emoji-grid">
            {moodEmojis.map((mood) => (
              <button
                key={mood.emotion}
                className={`emoji-btn ${selectedEmoji === mood.emoji ? 'selected' : ''}`}
                onClick={() => handleEmojiSelect(mood)}
                title={mood.description}
              >
                <span className="emoji">{mood.emoji}</span>
                <span className="emotion-label">{mood.emotion}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mood-tips">
        <h4>💡 Mood Detection Tips</h4>
        <ul>
          <li>Be honest about your feelings for better recommendations</li>
          <li>Describe your day or current situation for more accurate analysis</li>
          <li>Use both methods to get the most personalized experience</li>
          <li>Your mood can change - feel free to update it anytime!</li>
        </ul>
      </div>
    </div>
  )
}

export default MoodDetector