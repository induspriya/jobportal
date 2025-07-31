// User types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'jobseeker' | 'employer' | 'admin';
  company?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  experience?: string;
  education?: string;
  resume?: string;
  createdAt: string;
  updatedAt: string;
}

// Job types
export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  description: string;
  requirements: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  benefits?: string[];
  postedBy: User;
  isActive: boolean;
  applications: string[];
  createdAt: string;
  updatedAt: string;
}

// Application types
export interface Application {
  _id: string;
  jobId: string;
  userId: string;
  coverLetter: string;
  resume: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  appliedAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Pagination types
export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalJobs: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Job search filters
export interface JobSearchFilters {
  search?: string;
  category?: string;
  location?: string;
  type?: string;
  minSalary?: number;
  maxSalary?: number;
  page?: number;
  limit?: number;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'jobseeker' | 'employer';
  company?: string;
}

export interface ForgotPasswordForm {
  email: string;
}

export interface ResetPasswordForm {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface JobForm {
  title: string;
  company: string;
  location: string;
  category: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  description: string;
  requirements: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  benefits?: string[];
}

// Auth context types
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterForm) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
} 