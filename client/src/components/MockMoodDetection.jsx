import React, { useState } from 'react';

/**
 * MockMoodDetection Component
 * 
 * Simulates mood detection functionality for demonstration purposes.
 * In a real implementation, this would integrate with camera/facial recognition APIs.
 * 
 * TODO: Integrate with facial recognition API (Face-API.js, AWS Rekognition, etc.)
 * TODO: Add camera access for real-time mood detection
 * TODO: Implement emotion detection from audio/voice
 * TODO: Add confidence scores for detected emotions
 */
const MockMoodDetection = ({ onMoodDetected }) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [lastDetectedMood, setLastDetectedMood] = useState(null);

  const moods = [
    { name: 'happy', emoji: '😊', description: 'Feeling joyful and upbeat' },
    { name: 'sad', emoji: '😢', description: 'Feeling down or melancholic' },
    { name: 'neutral', emoji: '😐', description: 'Feeling balanced and calm' },
    { name: 'angry', emoji: '😠', description: 'Feeling frustrated or upset' },
    { name: 'relaxed', emoji: '😌', description: 'Feeling peaceful and at ease' }
  ];

  const simulateMoodDetection = () => {
    setIsDetecting(true);
    
    // Simulate detection delay
    setTimeout(() => {
      // Randomly select a mood for demonstration
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      const detectedMood = randomMood.name;
      
      setLastDetectedMood(detectedMood);
      setIsDetecting(false);
      
      // Notify parent component
      if (onMoodDetected) {
        onMoodDetected(detectedMood);
      }
    }, 2000);
  };

  return (
    <div className="card">
      <h2>🎭 Mood Detection</h2>
      <p>Click the button below to simulate mood detection. In a real implementation, this would use your camera to detect your facial expressions.</p>
      
      {/* Detection Status */}
      {isDetecting && (
        <div style={{ 
          background: '#fff3cd', 
          border: '1px solid #ffeaa7',
          padding: '16px', 
          borderRadius: '8px', 
          margin: '16px 0',
          textAlign: 'center'
        }}>
          <p>🔍 Analyzing your mood...</p>
          <div style={{ 
            animation: 'pulse 1.5s infinite',
            fontSize: '24px',
            margin: '8px 0'
          }}>
            📸
          </div>
        </div>
      )}

      {/* Last Detection Result */}
      {lastDetectedMood && !isDetecting && (
        <div style={{ 
          background: '#d4edda', 
          border: '1px solid #c3e6cb',
          padding: '16px', 
          borderRadius: '8px', 
          margin: '16px 0',
          textAlign: 'center'
        }}>
          <p><strong>Detected Mood:</strong></p>
          <div style={{ fontSize: '32px', margin: '8px 0' }}>
            {moods.find(m => m.name === lastDetectedMood)?.emoji}
          </div>
          <p>
            <strong>{lastDetectedMood.charAt(0).toUpperCase() + lastDetectedMood.slice(1)}</strong>
            <br />
            <small>{moods.find(m => m.name === lastDetectedMood)?.description}</small>
          </p>
        </div>
      )}

      {/* Detection Button */}
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <button 
          className="button" 
          onClick={simulateMoodDetection}
          disabled={isDetecting}
        >
          {isDetecting ? '🔍 Detecting...' : '📸 Detect My Mood'}
        </button>
      </div>

      {/* Information Box */}
      <div style={{ 
        background: '#e7f3ff', 
        border: '1px solid #b8daff',
        padding: '16px', 
        borderRadius: '8px', 
        margin: '16px 0',
        fontSize: '14px'
      }}>
        <h4>💡 How it works (Future Implementation):</h4>
        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
          <li>Camera captures your facial expression</li>
          <li>AI analyzes micro-expressions and emotions</li>
          <li>Mood is classified with confidence scores</li>
          <li>Recommendations are automatically generated</li>
        </ul>
        <p><strong>Privacy:</strong> All processing happens locally - your photos are never stored or uploaded.</p>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default MockMoodDetection;