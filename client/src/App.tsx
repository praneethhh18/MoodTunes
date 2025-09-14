import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import './App.css';

// Loading component
const LoadingSpinner: React.FC = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
);

// Auth wrapper component to handle routing based on auth state
const AuthWrapper: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <div className="auth-wrapper">
      {authMode === 'login' ? <Login /> : <Register />}
      <div className="auth-switch">
        {authMode === 'login' ? (
          <p>
            Don't have an account?{' '}
            <button 
              className="switch-button" 
              onClick={() => setAuthMode('register')}
            >
              Sign up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <button 
              className="switch-button" 
              onClick={() => setAuthMode('login')}
            >
              Sign in
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<AuthWrapper />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
