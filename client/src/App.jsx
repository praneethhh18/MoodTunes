import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'
import ProfilePage from './pages/ProfilePage'
import Navbar from './components/Navbar'
import { AuthProvider, useAuth } from './utils/AuthContext'

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppContent />
      </div>
    </AuthProvider>
  )
}

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading MoodTunes...</p>
      </div>
    )
  }

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" /> : <HomePage />} 
        />
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" /> : <LoginPage />} 
        />
        <Route 
          path="/signup" 
          element={user ? <Navigate to="/dashboard" /> : <SignupPage />} 
        />
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard /> : <Navigate to="/" />} 
        />
        <Route 
          path="/profile" 
          element={user ? <ProfilePage /> : <Navigate to="/" />} 
        />
      </Routes>
    </>
  )
}

export default App