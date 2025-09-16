import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/dashboard" className="nav-logo">
          🎵 MoodTunes
        </Link>

        <div className="nav-links">
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            🏠 Dashboard
          </Link>
          <Link 
            to="/profile" 
            className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
          >
            👤 Profile
          </Link>
        </div>

        <div className="nav-user">
          <div className="user-info">
            <span className="user-greeting">Hi, {user.name}!</span>
            <div className="user-stats">
              <span className="stat-item">
                ❤️ {user.favorites?.length || 0}
              </span>
              <span className="stat-item">
                📈 {user.moodHistory?.length || 0}
              </span>
            </div>
          </div>
          <button onClick={logout} className="logout-btn" title="Logout">
            🚪 Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar