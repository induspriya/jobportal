import axios from 'axios'
import { User, LoginForm, RegisterForm, ApiResponse } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authService = {
  async login(credentials: LoginForm): Promise<{ user: User; token: string }> {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>('/auth/login', credentials)
    return response.data.data!
  },

  async register(userData: RegisterForm): Promise<{ user: User; token: string }> {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>('/auth/register', userData)
    return response.data.data!
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<ApiResponse<{ user: User }>>('/auth/me')
    return response.data.data!.user
  },

  async forgotPassword(email: string): Promise<void> {
    await api.post<ApiResponse>('/auth/forgot-password', { email })
  },

  async resetPassword(token: string, password: string): Promise<void> {
    await api.post<ApiResponse>('/auth/reset-password', { token, password })
  },

  async updateProfile(profileData: Partial<User>): Promise<User> {
    const response = await api.put<ApiResponse<{ user: User }>>('/auth/me', profileData)
    return response.data.data!.user
  },
} 