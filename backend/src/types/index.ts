import { Request } from 'express';

// User types
export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'jobseeker' | 'employer' | 'admin';
  company?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  experience?: string;
  education?: string;
  resume?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Job types
export interface IJob {
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
  postedBy: string; // User ID
  isActive: boolean;
  applications: string[]; // Array of application IDs
  createdAt: Date;
  updatedAt: Date;
}

// Application types
export interface IApplication {
  _id: string;
  jobId: string;
  userId: string;
  coverLetter: string;
  resume: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  appliedAt: Date;
  updatedAt: Date;
}

// Password reset token
export interface IPasswordResetToken {
  _id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

// Authentication types
export interface AuthRequest extends Request {
  user?: IUser;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Search and filter types
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

// Email types
export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
} 