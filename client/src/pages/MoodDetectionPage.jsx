import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Heart, Camera, Mic, Smile, Frown, Zap, Leaf, Music } from 'lucide-react';
import Card3D from '../components/Card3D';

const MoodDetectionPage = () => {
  const { currentTheme, changeMood } = useTheme();
  const [detectionMode, setDetectionMode] = useState('manual');
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedMood, setDetectedMood] = useState(null);

  const moodOptions = [
    {
      mood: 'happy',
      icon: Smile,
      color: '#FFD700',
      description: 'Feeling joyful and upbeat',
      gradient: 'linear-gradient(135deg, #FFD700, #FF6B6B)',
    },
    {
      mood: 'sad',
      icon: Frown,
      color: '#4A90E2',
      description: 'Feeling melancholic or blue',
      gradient: 'linear-gradient(135deg, #4A90E2, #7B68EE)',
    },
    {
      mood: 'energetic',
      icon: Zap,
      color: '#FF1744',
      description: 'Full of energy and excitement',
      gradient: 'linear-gradient(135deg, #FF1744, #FF9100)',
    },
    {
      mood: 'calm',
      icon: Leaf,
      color: '#81C784',
      description: 'Peaceful and relaxed',
      gradient: 'linear-gradient(135deg, #81C784, #A5D6A7)',
    },
  ];

  const simulateDetection = () => {
    setIsDetecting(true);
    setDetectedMood(null);

    // Simulate detection process
    setTimeout(() => {
      const randomMood = moodOptions[Math.floor(Math.random() * moodOptions.length)];
      setDetectedMood(randomMood);
      setIsDetecting(false);
      changeMood(randomMood.mood);
    }, 3000);
  };

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="content-wrapper">
        <motion.div
          className="mood-detection-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="section-title text-gradient">Mood Detection</h1>
          <p className="section-subtitle" style={{ color: currentTheme.colors.textSecondary }}>
            Let our AI analyze your current emotional state to create the perfect musical experience
          </p>
        </motion.div>

        {/* Detection Mode Selector */}
        <motion.div
          className="detection-modes"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card3D>
            <div className="mode-selector">
              <h3 style={{ color: currentTheme.colors.text, marginBottom: '20px', textAlign: 'center' }}>
                Choose Detection Method
              </h3>
              <div className="mode-buttons">
                <button
                  className={`mode-button ${detectionMode === 'manual' ? 'active' : ''}`}
                  onClick={() => setDetectionMode('manual')}
                  style={{
                    background: detectionMode === 'manual' ? currentTheme.colors.primary : 'transparent',
                    borderColor: currentTheme.colors.primary,
                    color: detectionMode === 'manual' ? '#fff' : currentTheme.colors.primary,
                  }}
                >
                  <Heart size={20} />
                  Manual Selection
                </button>
                <button
                  className={`mode-button ${detectionMode === 'auto' ? 'active' : ''}`}
                  onClick={() => setDetectionMode('auto')}
                  style={{
                    background: detectionMode === 'auto' ? currentTheme.colors.primary : 'transparent',
                    borderColor: currentTheme.colors.primary,
                    color: detectionMode === 'auto' ? '#fff' : currentTheme.colors.primary,
                  }}
                >
                  <Camera size={20} />
                  AI Detection
                </button>
              </div>
            </div>
          </Card3D>
        </motion.div>

        {/* Manual Mood Selection */}
        {detectionMode === 'manual' && (
          <motion.div
            className="manual-selection"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="selection-title" style={{ color: currentTheme.colors.text }}>
              How are you feeling right now?
            </h3>
            <div className="mood-grid">
              {moodOptions.map((option, index) => (
                <motion.div
                  key={option.mood}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card3D>
                    <button
                      className="mood-option"
                      onClick={() => changeMood(option.mood)}
                      style={{
                        background: option.gradient,
                      }}
                    >
                      <div className="mood-icon">
                        <option.icon size={40} color="white" />
                      </div>
                      <h4 className="mood-name">
                        {option.mood.charAt(0).toUpperCase() + option.mood.slice(1)}
                      </h4>
                      <p className="mood-description">
                        {option.description}
                      </p>
                    </button>
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* AI Detection */}
        {detectionMode === 'auto' && (
          <motion.div
            className="ai-detection"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Card3D>
              <div className="detection-interface">
                {!isDetecting && !detectedMood && (
                  <div className="detection-start">
                    <div 
                      className="detection-icon"
                      style={{ color: currentTheme.colors.primary }}
                    >
                      <Camera size={80} />
                    </div>
                    <h3 style={{ color: currentTheme.colors.text }}>
                      AI Mood Analysis
                    </h3>
                    <p style={{ color: currentTheme.colors.textSecondary }}>
                      Our advanced AI will analyze facial expressions, voice patterns, 
                      and behavioral cues to determine your current mood.
                    </p>
                    <button
                      className="detection-button"
                      onClick={simulateDetection}
                      style={{
                        background: `linear-gradient(45deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                      }}
                    >
                      <Mic size={20} />
                      Start Detection
                    </button>
                  </div>
                )}

                {isDetecting && (
                  <div className="detection-progress">
                    <motion.div
                      className="scanning-animation"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      style={{ color: currentTheme.colors.primary }}
                    >
                      <Camera size={80} />
                    </motion.div>
                    <h3 style={{ color: currentTheme.colors.text }}>
                      Analyzing your mood...
                    </h3>
                    <div className="progress-dots">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="dot"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                          style={{ background: currentTheme.colors.primary }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {detectedMood && (
                  <motion.div
                    className="detection-result"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div 
                      className="result-icon"
                      style={{ background: detectedMood.gradient }}
                    >
                      <detectedMood.icon size={60} color="white" />
                    </div>
                    <h3 style={{ color: currentTheme.colors.text }}>
                      Mood Detected: {detectedMood.mood.charAt(0).toUpperCase() + detectedMood.mood.slice(1)}
                    </h3>
                    <p style={{ color: currentTheme.colors.textSecondary }}>
                      {detectedMood.description}
                    </p>
                    <div className="result-actions">
                      <button
                        className="accept-button"
                        onClick={() => window.location.href = '/recommendations'}
                        style={{
                          background: `linear-gradient(45deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                        }}
                      >
                        <Music size={20} />
                        Get Recommendations
                      </button>
                      <button
                        className="retry-button"
                        onClick={() => setDetectedMood(null)}
                        style={{
                          borderColor: currentTheme.colors.primary,
                          color: currentTheme.colors.primary,
                        }}
                      >
                        Try Again
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </Card3D>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .mood-detection-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .detection-modes {
          margin-bottom: 60px;
        }

        .mode-selector {
          padding: 30px;
          text-align: center;
        }

        .mode-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .mode-button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px 25px;
          border: 2px solid;
          border-radius: 25px;
          background: transparent;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .mode-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .selection-title {
          text-align: center;
          font-size: 1.5rem;
          margin-bottom: 40px;
        }

        .mood-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .mood-option {
          width: 100%;
          padding: 30px 20px;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
          text-align: center;
        }

        .mood-option:hover {
          transform: scale(1.02);
        }

        .mood-icon {
          margin-bottom: 15px;
        }

        .mood-name {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .mood-description {
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .detection-interface {
          padding: 50px 30px;
          text-align: center;
        }

        .detection-start,
        .detection-progress,
        .detection-result {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .detection-icon,
        .scanning-animation {
          margin-bottom: 20px;
        }

        .detection-button,
        .accept-button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px 30px;
          border: none;
          border-radius: 25px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .detection-button:hover,
        .accept-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .progress-dots {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .result-icon {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }

        .result-actions {
          display: flex;
          gap: 20px;
          margin-top: 30px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .retry-button {
          padding: 15px 25px;
          border: 2px solid;
          border-radius: 25px;
          background: transparent;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .retry-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
          .mood-grid {
            grid-template-columns: 1fr;
          }

          .mode-buttons {
            flex-direction: column;
            align-items: center;
          }

          .detection-interface {
            padding: 30px 20px;
          }

          .result-actions {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default MoodDetectionPage;