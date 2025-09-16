import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing user session in localStorage
    const savedUser = localStorage.getItem('moodtunes_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Mock authentication - in real app, this would call backend API
      if (email && password) {
        const userData = {
          id: Date.now(),
          email,
          name: email.split('@')[0],
          favorites: [],
          moodHistory: []
        }
        setUser(userData)
        localStorage.setItem('moodtunes_user', JSON.stringify(userData))
        return { success: true }
      }
      return { success: false, error: 'Invalid credentials' }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const signup = async (email, password, name) => {
    try {
      // Mock signup - in real app, this would call backend API
      if (email && password && name) {
        const userData = {
          id: Date.now(),
          email,
          name,
          favorites: [],
          moodHistory: []
        }
        setUser(userData)
        localStorage.setItem('moodtunes_user', JSON.stringify(userData))
        return { success: true }
      }
      return { success: false, error: 'Please fill all fields' }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('moodtunes_user')
  }

  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData }
    setUser(newUser)
    localStorage.setItem('moodtunes_user', JSON.stringify(newUser))
  }

  const value = {
    user,
    login,
    signup,
    logout,
    updateUser,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}