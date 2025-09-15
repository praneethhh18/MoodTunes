import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Music, User, LogOut, Home, Heart } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <Music size={24} style={{ marginRight: '8px', display: 'inline' }} />
            MoodTunes
          </Link>
          
          {isAuthenticated ? (
            <div className="navbar-nav">
              <Link to="/">
                <Home size={18} style={{ marginRight: '4px', display: 'inline' }} />
                Home
              </Link>
              <Link to="/moods">
                <Heart size={18} style={{ marginRight: '4px', display: 'inline' }} />
                Moods
              </Link>
              <Link to="/profile">
                <User size={18} style={{ marginRight: '4px', display: 'inline' }} />
                Profile
              </Link>
              <button 
                onClick={handleLogout} 
                className="btn btn-secondary"
                style={{ padding: '8px 16px', fontSize: '14px' }}
              >
                <LogOut size={16} style={{ marginRight: '4px', display: 'inline' }} />
                Logout
              </button>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                Welcome, {user?.username}!
              </span>
            </div>
          ) : (
            <div className="navbar-nav">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;