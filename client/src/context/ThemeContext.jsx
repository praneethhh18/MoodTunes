import React, { createContext, useContext, useState, useEffect } from 'react';

// Mood-based theme configurations
export const moodThemes = {
  happy: {
    name: 'Happy',
    colors: {
      primary: '#FFD700',
      secondary: '#FF6B6B',
      accent: '#4ECDC4',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      cardBg: 'rgba(255, 215, 0, 0.1)',
      text: '#FFFFFF',
      textSecondary: '#E0E0E0',
    },
    particles: {
      color: '#FFD700',
      shape: 'circle',
      count: 80,
      speed: 2,
    },
    effects: {
      glow: true,
      bounce: true,
      sparkles: true,
    }
  },
  sad: {
    name: 'Sad',
    colors: {
      primary: '#4A90E2',
      secondary: '#7B68EE',
      accent: '#87CEEB',
      background: 'linear-gradient(135deg, #2C3E50 0%, #3498DB 100%)',
      cardBg: 'rgba(74, 144, 226, 0.1)',
      text: '#FFFFFF',
      textSecondary: '#B0C4DE',
    },
    particles: {
      color: '#4A90E2',
      shape: 'circle',
      count: 40,
      speed: 1,
    },
    effects: {
      glow: false,
      bounce: false,
      sparkles: false,
    }
  },
  energetic: {
    name: 'Energetic',
    colors: {
      primary: '#FF1744',
      secondary: '#FF9100',
      accent: '#FFEA00',
      background: 'linear-gradient(135deg, #FF1744 0%, #FF9100 50%, #FFEA00 100%)',
      cardBg: 'rgba(255, 23, 68, 0.1)',
      text: '#FFFFFF',
      textSecondary: '#FFE0E0',
    },
    particles: {
      color: '#FF1744',
      shape: 'triangle',
      count: 120,
      speed: 4,
    },
    effects: {
      glow: true,
      bounce: true,
      sparkles: true,
    }
  },
  calm: {
    name: 'Calm',
    colors: {
      primary: '#81C784',
      secondary: '#A5D6A7',
      accent: '#C8E6C9',
      background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
      cardBg: 'rgba(129, 199, 132, 0.1)',
      text: '#FFFFFF',
      textSecondary: '#E8F5E8',
    },
    particles: {
      color: '#81C784',
      shape: 'circle',
      count: 30,
      speed: 0.5,
    },
    effects: {
      glow: false,
      bounce: false,
      sparkles: false,
    }
  },
  romantic: {
    name: 'Romantic',
    colors: {
      primary: '#E91E63',
      secondary: '#F06292',
      accent: '#F8BBD9',
      background: 'linear-gradient(135deg, #E91E63 0%, #AD1457 100%)',
      cardBg: 'rgba(233, 30, 99, 0.1)',
      text: '#FFFFFF',
      textSecondary: '#FCE4EC',
    },
    particles: {
      color: '#E91E63',
      shape: 'heart',
      count: 60,
      speed: 1.5,
    },
    effects: {
      glow: true,
      bounce: false,
      sparkles: true,
    }
  },
  focused: {
    name: 'Focused',
    colors: {
      primary: '#9C27B0',
      secondary: '#BA68C8',
      accent: '#E1BEE7',
      background: 'linear-gradient(135deg, #9C27B0 0%, #673AB7 100%)',
      cardBg: 'rgba(156, 39, 176, 0.1)',
      text: '#FFFFFF',
      textSecondary: '#F3E5F5',
    },
    particles: {
      color: '#9C27B0',
      shape: 'polygon',
      count: 50,
      speed: 1,
    },
    effects: {
      glow: false,
      bounce: false,
      sparkles: false,
    }
  }
};

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentMood, setCurrentMood] = useState('happy');
  const [currentTheme, setCurrentTheme] = useState(moodThemes.happy);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const changeMood = (mood) => {
    if (mood === currentMood) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentMood(mood);
      setCurrentTheme(moodThemes[mood]);
      setIsTransitioning(false);
    }, 300);
  };

  // Auto-detect mood based on time (demo functionality)
  useEffect(() => {
    const hour = new Date().getHours();
    let autoMood = 'happy';
    
    if (hour >= 22 || hour <= 6) autoMood = 'calm';
    else if (hour >= 18) autoMood = 'romantic';
    else if (hour >= 14) autoMood = 'energetic';
    else if (hour >= 9) autoMood = 'focused';
    else autoMood = 'calm';
    
    setCurrentMood(autoMood);
    setCurrentTheme(moodThemes[autoMood]);
  }, []);

  const value = {
    currentMood,
    currentTheme,
    isTransitioning,
    changeMood,
    availableMoods: Object.keys(moodThemes),
    moodThemes,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};