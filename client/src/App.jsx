import React from 'react'
import MoodDetection from './components/MoodDetection'

function App() {
  return (
    <div className="app">
      <h1>🎵 MoodTunes</h1>
      <p className="subtitle">Discover music that matches your mood</p>
      <MoodDetection />
    </div>
  )
}

export default App