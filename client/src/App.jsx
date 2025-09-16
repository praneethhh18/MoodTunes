import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import MoodDetectionPage from './pages/MoodDetectionPage';
import RecommendationsPage from './pages/RecommendationsPage';
import ProfilePage from './pages/ProfilePage';
import Background3D from './components/Background3D';
import Navigation from './components/Navigation';
import './styles/App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Background3D />
          <Navigation />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/mood-detection" element={<MoodDetectionPage />} />
              <Route path="/recommendations" element={<RecommendationsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;