import React, { useState } from 'react';
import './MoodDetection.css';

// TODO: Future enhancements for advanced mood detection:
// 1. Webcam Integration: Use libraries like @tensorflow/tfjs-models for face emotion detection
//    - Import face-landmarks-detection or face-api.js
//    - Capture video stream and analyze facial expressions
//    - Combine with text sentiment for more accurate results
// 2. Voice/Audio Analysis: Integrate speech recognition and vocal emotion detection
//    - Use Web Speech API or external services like Google Speech-to-Text
//    - Analyze voice tone, pitch, and speech patterns
// 3. Machine Learning Models: Replace simple sentiment with trained models
//    - Use TensorFlow.js for client-side inference
//    - Implement LSTM or transformer models for better context understanding
// 4. Multi-modal fusion: Combine text, audio, and visual inputs for comprehensive mood detection

const MoodDetection = () => {
    const [text, setText] = useState('');
    const [mood, setMood] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!text.trim()) {
            setError('Please enter some text to analyze');
            return;
        }

        setLoading(true);
        setError('');
        setMood(null);

        try {
            const response = await fetch('/api/mood', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text.trim() })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setMood(result);
        } catch (err) {
            console.error('Error detecting mood:', err);
            setError('Failed to detect mood. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getMoodEmoji = (moodType) => {
        switch (moodType) {
            case 'happy': return '😊';
            case 'sad': return '😢';
            case 'neutral': return '😐';
            default: return '🤔';
        }
    };

    const getMoodColor = (moodType) => {
        switch (moodType) {
            case 'happy': return '#4CAF50';
            case 'sad': return '#2196F3';
            case 'neutral': return '#FF9800';
            default: return '#9E9E9E';
        }
    };

    return (
        <div className="mood-detection">
            <h2>✨ Mood Detection</h2>
            <p className="description">
                Share how you're feeling and we'll detect your mood to suggest perfect music!
            </p>
            
            <form onSubmit={handleSubmit} className="mood-form">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Tell us how you're feeling... (e.g., 'I'm having a wonderful day!' or 'Feeling a bit down today')"
                    rows={4}
                    className="mood-input"
                    disabled={loading}
                />
                
                <button 
                    type="submit" 
                    className="detect-button"
                    disabled={loading || !text.trim()}
                >
                    {loading ? 'Analyzing...' : 'Detect My Mood'}
                </button>
            </form>

            {error && (
                <div className="error-message">
                    ❌ {error}
                </div>
            )}

            {mood && (
                <div className="mood-result">
                    <h3>Your Mood Analysis</h3>
                    <div 
                        className="mood-display"
                        style={{ borderColor: getMoodColor(mood.mood) }}
                    >
                        <span className="mood-emoji">{getMoodEmoji(mood.mood)}</span>
                        <span className="mood-text" style={{ color: getMoodColor(mood.mood) }}>
                            {mood.mood.charAt(0).toUpperCase() + mood.mood.slice(1)}
                        </span>
                    </div>
                    
                    <div className="mood-details">
                        <div className="confidence">
                            <strong>Confidence:</strong> {(mood.confidence * 100).toFixed(1)}%
                        </div>
                        <div className="score">
                            <strong>Sentiment Score:</strong> {mood.score}
                        </div>
                        {mood.analysis && (
                            <div className="analysis">
                                <div className="word-analysis">
                                    {mood.analysis.positive.length > 0 && (
                                        <div className="positive-words">
                                            <strong>Positive words:</strong> {mood.analysis.positive.join(', ')}
                                        </div>
                                    )}
                                    {mood.analysis.negative.length > 0 && (
                                        <div className="negative-words">
                                            <strong>Negative words:</strong> {mood.analysis.negative.join(', ')}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="next-steps">
                        <p>🎵 Based on your <strong>{mood.mood}</strong> mood, we can now suggest music that fits your vibe!</p>
                        <p className="todo-note">
                            <em>TODO: Integrate with music recommendation engine and playlist generation</em>
                        </p>
                    </div>
                </div>
            )}

            <div className="future-features">
                <h4>🚀 Coming Soon</h4>
                <ul>
                    <li>📸 Camera-based emotion detection</li>
                    <li>🎤 Voice mood analysis</li>
                    <li>🧠 Advanced AI mood prediction</li>
                    <li>🎵 Personalized music recommendations</li>
                </ul>
            </div>
        </div>
    );
};

export default MoodDetection;