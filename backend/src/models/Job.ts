import mongoose, { Document, Schema } from 'mongoose';
import { IJob } from '../types';

export interface JobDocument extends Omit<IJob, '_id'>, Document {}

const jobSchema = new Schema<JobDocument>({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
    maxlength: [100, 'Job title cannot be more than 100 characters']
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot be more than 100 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [100, 'Location cannot be more than 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Job category is required'],
    trim: true,
    enum: [
      'Technology',
      'Healthcare',
      'Finance',
      'Education',
      'Marketing',
      'Sales',
      'Design',
      'Engineering',
      'Customer Service',
      'Administration',
      'Other'
    ]
  },
  type: {
    type: String,
    required: [true, 'Job type is required'],
    enum: ['full-time', 'part-time', 'contract', 'internship']
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    trim: true,
    maxlength: [5000, 'Job description cannot be more than 5000 characters']
  },
  requirements: [{
    type: String,
    trim: true,
    maxlength: [200, 'Each requirement cannot be more than 200 characters']
  }],
  salary: {
    min: {
      type: Number,
      min: [0, 'Minimum salary cannot be negative']
    },
    max: {
      type: Number,
      min: [0, 'Maximum salary cannot be negative']
    },
    currency: {
      type: String,
      default: 'USD',
      enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
    }
  },
  benefits: [{
    type: String,
    trim: true,
    maxlength: [100, 'Each benefit cannot be more than 100 characters']
  }],
  postedBy: {
    type: String,
    required: [true, 'Job poster is required']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  applications: [{
    type: String
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for search functionality
jobSchema.index({ title: 'text', description: 'text', company: 'text' });
jobSchema.index({ category: 1 });
jobSchema.index({ location: 1 });
jobSchema.index({ type: 1 });
jobSchema.index({ isActive: 1 });
jobSchema.index({ createdAt: -1 });

// Virtual for application count
jobSchema.virtual('applicationCount').get(function() {
  return this.applications.length;
});

// Virtual for job poster details
jobSchema.virtual('poster', {
  ref: 'User',
  localField: 'postedBy',
  foreignField: '_id',
  justOne: true
});

// Pre-save middleware to validate salary range
jobSchema.pre('save', function(next) {
  if (this.salary && this.salary.min && this.salary.max) {
    if (this.salary.min > this.salary.max) {
      return next(new Error('Minimum salary cannot be greater than maximum salary'));
    }
  }
  next();
});

// Static method to search jobs
jobSchema.statics.searchJobs = function(filters: any) {
  const query: any = { isActive: true };

  if (filters.search) {
    query.$text = { $search: filters.search };
  }

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.location) {
    query.location = { $regex: filters.location, $options: 'i' };
  }

  if (filters.type) {
    query.type = filters.type;
  }

  if (filters.minSalary || filters.maxSalary) {
    query.salary = {};
    if (filters.minSalary) query.salary.$gte = filters.minSalary;
    if (filters.maxSalary) query.salary.$lte = filters.maxSalary;
  }

  return this.find(query)
    .populate('postedBy', 'name company')
    .sort({ createdAt: -1 });
};

export const Job = mongoose.model<JobDocument>('Job', jobSchema); 