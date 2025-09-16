import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Heart, Music, Sparkles, Play } from 'lucide-react';

const HeroSection = () => {
  const { currentTheme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const floatingElements = [
    { icon: Music, delay: 0, position: { top: '20%', left: '10%' } },
    { icon: Heart, delay: 1, position: { top: '60%', right: '15%' } },
    { icon: Sparkles, delay: 2, position: { top: '40%', left: '80%' } },
  ];

  return (
    <section className="hero-section">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="hero-badge"
            variants={itemVariants}
            style={{
              background: `${currentTheme.colors.primary}20`,
              border: `1px solid ${currentTheme.colors.primary}`,
              color: currentTheme.colors.primary,
            }}
          >
            <Sparkles size={16} />
            <span>AI-Powered Music Experience</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            variants={itemVariants}
          >
            Music That
            <span 
              className="hero-highlight"
              style={{
                background: `linear-gradient(45deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {' '}Feels{' '}
            </span>
            Your Mood
          </motion.h1>

          <motion.p
            className="hero-description"
            variants={itemVariants}
            style={{ color: currentTheme.colors.textSecondary }}
          >
            Experience the future of music discovery with our AI-powered mood detection technology. 
            Get personalized playlists that perfectly match your emotional state, enhanced with 
            stunning 3D visuals and immersive themes.
          </motion.p>

          <motion.div
            className="hero-buttons"
            variants={itemVariants}
          >
            <Link 
              to="/mood-detection"
              className="hero-button primary"
              style={{
                background: `linear-gradient(45deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
              }}
            >
              <Heart size={20} />
              <span>Detect My Mood</span>
              <motion.div
                className="button-glow"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  background: `linear-gradient(45deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                }}
              />
            </Link>

            <Link 
              to="/recommendations"
              className="hero-button secondary"
              style={{
                border: `2px solid ${currentTheme.colors.primary}`,
                color: currentTheme.colors.primary,
              }}
            >
              <Play size={20} />
              <span>Explore Music</span>
            </Link>
          </motion.div>

          <motion.div
            className="hero-stats"
            variants={itemVariants}
          >
            <div className="stat">
              <span className="stat-number text-gradient">50K+</span>
              <span className="stat-label" style={{ color: currentTheme.colors.textSecondary }}>
                Active Users
              </span>
            </div>
            <div className="stat-divider" style={{ background: currentTheme.colors.primary }} />
            <div className="stat">
              <span className="stat-number text-gradient">1M+</span>
              <span className="stat-label" style={{ color: currentTheme.colors.textSecondary }}>
                Songs Analyzed
              </span>
            </div>
            <div className="stat-divider" style={{ background: currentTheme.colors.primary }} />
            <div className="stat">
              <span className="stat-number text-gradient">99%</span>
              <span className="stat-label" style={{ color: currentTheme.colors.textSecondary }}>
                Accuracy
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <div className="floating-elements">
          {floatingElements.map((element, index) => (
            <motion.div
              key={index}
              className="floating-element"
              style={{
                position: 'absolute',
                ...element.position,
                color: currentTheme.colors.accent,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4 + element.delay,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: element.delay,
              }}
            >
              <element.icon size={40} />
            </motion.div>
          ))}
        </div>

        {/* Geometric Shapes */}
        <div className="geometric-shapes">
          <motion.div
            className="shape shape-1"
            style={{
              background: `linear-gradient(45deg, ${currentTheme.colors.primary}40, ${currentTheme.colors.secondary}40)`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className="shape shape-2"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.colors.accent}30, ${currentTheme.colors.primary}30)`,
            }}
            animate={{
              rotate: [360, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 20px 40px;
          overflow: hidden;
        }

        .hero-container {
          position: relative;
          max-width: 1200px;
          width: 100%;
          text-align: center;
        }

        .hero-content {
          position: relative;
          z-index: 3;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 30px;
          backdrop-filter: blur(10px);
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 30px;
          color: white;
        }

        .hero-description {
          font-size: 1.3rem;
          line-height: 1.6;
          max-width: 700px;
          margin: 0 auto 50px;
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-bottom: 80px;
          flex-wrap: wrap;
        }

        .hero-button {
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .hero-button.primary {
          color: white;
          border: none;
        }

        .hero-button.secondary {
          background: transparent;
        }

        .hero-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }

        .button-glow {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border-radius: 52px;
          opacity: 0;
          z-index: -1;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 900;
        }

        .stat-label {
          font-size: 0.9rem;
          font-weight: 500;
          opacity: 0.8;
        }

        .stat-divider {
          width: 1px;
          height: 40px;
          opacity: 0.3;
        }

        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        }

        .floating-element {
          opacity: 0.6;
        }

        .geometric-shapes {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
        }

        .shape-1 {
          width: 300px;
          height: 300px;
          top: 20%;
          right: -100px;
        }

        .shape-2 {
          width: 200px;
          height: 200px;
          bottom: 20%;
          left: -50px;
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 60px 15px 30px;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }

          .hero-stats {
            gap: 20px;
          }

          .stat-divider {
            display: none;
          }

          .floating-element {
            display: none;
          }

          .shape {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;