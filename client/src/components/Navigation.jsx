import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { 
  Home, 
  User, 
  Music, 
  Heart, 
  Settings, 
  Menu, 
  X,
  Palette
} from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const location = useLocation();
  const { currentTheme, currentMood, changeMood, availableMoods } = useTheme();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/mood-detection', icon: Heart, label: 'Mood' },
    { path: '/recommendations', icon: Music, label: 'Music' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/auth', icon: Settings, label: 'Auth' },
  ];

  const moodIcons = {
    happy: '😊',
    sad: '😢',
    energetic: '⚡',
    calm: '😌',
    romantic: '💕',
    focused: '🎯'
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="navigation"
        style={{
          background: `${currentTheme.colors.cardBg}`,
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${currentTheme.colors.primary}30`,
        }}
      >
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <motion.div
              className="logo-text"
              style={{ color: currentTheme.colors.primary }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎵 MoodTunes
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-links desktop">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  style={{
                    color: isActive ? currentTheme.colors.primary : currentTheme.colors.text,
                  }}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      className="nav-indicator"
                      layoutId="nav-indicator"
                      style={{ background: currentTheme.colors.primary }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mood Selector */}
          <div className="mood-selector">
            <motion.button
              className="mood-button"
              onClick={() => setShowMoodSelector(!showMoodSelector)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: currentTheme.colors.primary,
                color: '#fff',
              }}
            >
              <Palette size={16} />
              <span>{moodIcons[currentMood]}</span>
            </motion.button>

            {showMoodSelector && (
              <motion.div
                className="mood-dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{
                  background: currentTheme.colors.cardBg,
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${currentTheme.colors.primary}30`,
                }}
              >
                {availableMoods.map((mood) => (
                  <motion.button
                    key={mood}
                    className={`mood-option ${mood === currentMood ? 'active' : ''}`}
                    onClick={() => {
                      changeMood(mood);
                      setShowMoodSelector(false);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      background: mood === currentMood ? currentTheme.colors.primary : 'transparent',
                      color: currentTheme.colors.text,
                    }}
                  >
                    <span className="mood-emoji">{moodIcons[mood]}</span>
                    <span className="mood-name">{mood.charAt(0).toUpperCase() + mood.slice(1)}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="mobile-menu-button"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
            style={{ color: currentTheme.colors.primary }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`mobile-nav ${isOpen ? 'open' : ''}`}
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          style={{
            background: `${currentTheme.colors.cardBg}`,
            backdropFilter: 'blur(20px)',
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
                style={{
                  color: isActive ? currentTheme.colors.primary : currentTheme.colors.text,
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </motion.div>
      </motion.nav>

      <style jsx>{`
        .navigation {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 0;
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 30px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .nav-logo {
          text-decoration: none;
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .nav-links.desktop {
          display: none;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 20px;
          transition: all 0.3s ease;
          position: relative;
          font-weight: 500;
        }

        .nav-link:hover {
          transform: translateY(-2px);
        }

        .nav-indicator {
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          border-radius: 1px;
        }

        .mood-selector {
          position: relative;
        }

        .mood-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .mood-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 8px;
          border-radius: 12px;
          padding: 8px;
          min-width: 150px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .mood-option {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 12px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
        }

        .mood-emoji {
          font-size: 1.2rem;
        }

        .mobile-menu-button {
          display: flex;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
        }

        .mobile-nav {
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px 30px;
          text-decoration: none;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .mobile-nav-link:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        @media (min-width: 768px) {
          .nav-links.desktop {
            display: flex;
          }
          
          .mobile-menu-button {
            display: none;
          }
        }

        @media (max-width: 767px) {
          .nav-container {
            padding: 15px 20px;
          }
        }
      `}</style>
    </>
  );
};

export default Navigation;