import axios from 'axios'
import { Job, Application, ApiResponse } from '@/types'

const API_BASE_URL = process.env.VITE_API_URL || '/api'

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

// Sample data for development
const sampleJobs: Job[] = [
  {
    _id: '1',
    id: '1',
    title: 'Senior React Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    category: 'Technology',
    type: 'full-time',
    salary: '$120,000 - $150,000',
    description: 'We are looking for a senior React developer to join our team...',
    requirements: ['React', 'TypeScript', 'Node.js', '5+ years experience'],
    postedAt: '2025-07-30T10:00:00Z',
    createdAt: '2025-07-30T10:00:00Z',
    updatedAt: '2025-07-30T10:00:00Z',
    postedBy: 'employer1',
    applications: [],
    isActive: true
  },
  {
    _id: '2',
    id: '2',
    title: 'Frontend Engineer',
    company: 'StartupXYZ',
    location: 'Remote',
    category: 'Technology',
    type: 'full-time',
    salary: '$90,000 - $110,000',
    description: 'Join our fast-growing startup as a frontend engineer...',
    requirements: ['JavaScript', 'React', 'CSS', '3+ years experience'],
    postedAt: '2025-07-29T14:30:00Z',
    createdAt: '2025-07-29T14:30:00Z',
    updatedAt: '2025-07-29T14:30:00Z',
    postedBy: 'employer2',
    applications: [],
    isActive: true
  },
  {
    _id: '3',
    id: '3',
    title: 'UI/UX Designer',
    company: 'Design Studio Pro',
    location: 'New York, NY',
    category: 'Design',
    type: 'contract',
    salary: '$80,000 - $100,000',
    description: 'Creative UI/UX designer needed for exciting projects...',
    requirements: ['Figma', 'Adobe Creative Suite', 'User Research', '4+ years experience'],
    postedAt: '2025-07-28T09:15:00Z',
    createdAt: '2025-07-28T09:15:00Z',
    updatedAt: '2025-07-28T09:15:00Z',
    postedBy: 'employer3',
    applications: [],
    isActive: true
  },
  {
    _id: '4',
    id: '4',
    title: 'DevOps Engineer',
    company: 'CloudTech Solutions',
    location: 'Austin, TX',
    category: 'Technology',
    type: 'full-time',
    salary: '$110,000 - $130,000',
    description: 'DevOps engineer to manage our cloud infrastructure...',
    requirements: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', '4+ years experience'],
    postedAt: '2025-07-27T16:45:00Z',
    createdAt: '2025-07-27T16:45:00Z',
    updatedAt: '2025-07-27T16:45:00Z',
    postedBy: 'employer4',
    applications: [],
    isActive: true
  },
  {
    _id: '5',
    id: '5',
    title: 'Product Manager',
    company: 'Innovation Labs',
    location: 'Seattle, WA',
    category: 'Other',
    type: 'full-time',
    salary: '$130,000 - $160,000',
    description: 'Lead product strategy and development for our platform...',
    requirements: ['Product Strategy', 'Agile', 'Data Analysis', '6+ years experience'],
    postedAt: '2025-07-26T11:20:00Z',
    createdAt: '2025-07-26T11:20:00Z',
    updatedAt: '2025-07-26T11:20:00Z',
    postedBy: 'employer5',
    applications: [],
    isActive: true
  }
]

const sampleApplications: Application[] = [
  {
    _id: '1',
    id: '1',
    jobId: '1',
    userId: 'user1',
    jobTitle: 'Senior React Developer',
    company: 'TechCorp Inc.',
    appliedAt: '2025-07-30T15:30:00Z',
    updatedAt: '2025-07-30T15:30:00Z',
    status: 'pending',
    coverLetter: 'I am excited to apply for this position...',
    resume: 'resume-senior-react.pdf'
  },
  {
    _id: '2',
    id: '2',
    jobId: '2',
    userId: 'user1',
    jobTitle: 'Frontend Engineer',
    company: 'StartupXYZ',
    appliedAt: '2025-07-29T10:15:00Z',
    updatedAt: '2025-07-29T10:15:00Z',
    status: 'reviewed',
    coverLetter: 'I am excited to apply for this position...',
    resume: 'resume-frontend.pdf'
  },
  {
    _id: '3',
    id: '3',
    jobId: '3',
    userId: 'user1',
    jobTitle: 'UI/UX Designer',
    company: 'Design Studio Pro',
    appliedAt: '2025-07-28T14:45:00Z',
    updatedAt: '2025-07-28T14:45:00Z',
    status: 'interviewed',
    coverLetter: 'I am excited to apply for this position...',
    resume: 'resume-uiux.pdf'
  }
]

const sampleSavedJobs = [
  { id: '4', jobId: '4', savedAt: '2025-07-27T09:30:00Z' },
  { id: '5', jobId: '5', savedAt: '2025-07-26T16:20:00Z' }
]

export const jobService = {
  // Get all jobs
  async getJobs(filters?: any): Promise<Job[]> {
    try {
      const response = await api.get<ApiResponse<Job[]>>('/jobs', { params: filters })
      return response.data.data!
    } catch (error) {
      console.log('Using sample data for jobs')
      return sampleJobs
    }
  },

  // Get job by ID
  async getJobById(id: string): Promise<Job> {
    try {
      const response = await api.get<ApiResponse<Job>>(`/jobs/${id}`)
      return response.data.data!
    } catch (error) {
      console.log('Using sample data for job')
      const job = sampleJobs.find(j => j.id === id || j._id === id)
      if (!job) throw new Error('Job not found')
      return job
    }
  },

  // Get user applications
  async getUserApplications(): Promise<Application[]> {
    try {
      const response = await api.get<ApiResponse<Application[]>>('/users/applications')
      return response.data.data!
    } catch (error) {
      console.log('Using sample data for applications')
      return sampleApplications
    }
  },

  // Get saved jobs
  async getSavedJobs(): Promise<Job[]> {
    try {
      const response = await api.get<ApiResponse<Job[]>>('/users/saved-jobs')
      return response.data.data!
    } catch (error) {
      console.log('Using sample data for saved jobs')
      const savedJobIds = sampleSavedJobs.map(sj => sj.jobId)
      return sampleJobs.filter(job => savedJobIds.includes(job.id || job._id))
    }
  },

  // Apply for a job
  async applyForJob(jobId: string, resume: File): Promise<void> {
    try {
      const formData = new FormData()
      formData.append('resume', resume)
      await api.post<ApiResponse>(`/jobs/${jobId}/apply`, formData)
    } catch (error) {
      console.log('Mock application submitted')
      // In a real app, this would be handled by the backend
    }
  },

  // Save a job
  async saveJob(jobId: string): Promise<void> {
    try {
      await api.post<ApiResponse>(`/jobs/${jobId}/save`)
    } catch (error) {
      console.log('Mock job saved')
      // In a real app, this would be handled by the backend
    }
  },

  // Get dashboard stats
  async getDashboardStats(): Promise<{
    totalApplications: number
    pendingApplications: number
    reviewedApplications: number
    interviewedApplications: number
    savedJobs: number
    recentJobs: Job[]
  }> {
    const applications = await this.getUserApplications()
    const savedJobs = await this.getSavedJobs()
    const recentJobs = await this.getJobs()

    return {
      totalApplications: applications.length,
      pendingApplications: applications.filter(app => app.status === 'pending').length,
      reviewedApplications: applications.filter(app => app.status === 'reviewed').length,
      interviewedApplications: applications.filter(app => app.status === 'interviewed').length,
      savedJobs: savedJobs.length,
      recentJobs: recentJobs.slice(0, 5)
    }
  }
} 