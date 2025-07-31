import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, AuthContextType, RegisterForm } from '@/types'
import { authService } from '@/services/authService'
import toast from 'react-hot-toast'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          const userData = await authService.getCurrentUser()
          setUser(userData)
        } catch (error) {
          console.error('Failed to get current user:', error)
          localStorage.removeItem('token')
          setToken(null)
        }
      }
      setIsLoading(false)
    }

    initializeAuth()
  }, [token])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await authService.login({ email, password })
      setUser(response.user)
      setToken(response.token)
      localStorage.setItem('token', response.token)
      toast.success('Login successful!')
    } catch (error: any) {
      toast.error(error.message || 'Login failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterForm) => {
    try {
      setIsLoading(true)
      const response = await authService.register(userData)
      setUser(response.user)
      setToken(response.token)
      localStorage.setItem('token', response.token)
      toast.success('Registration successful!')
    } catch (error: any) {
      toast.error(error.message || 'Registration failed')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    toast.success('Logged out successfully')
  }

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated: !!user && !!token,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 