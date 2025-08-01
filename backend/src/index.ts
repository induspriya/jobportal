import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import { connectDB } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth';
import jobRoutes from './routes/jobs';
import userRoutes from './routes/users';
import adminRoutes from './routes/admin';
import { populateSampleData } from './utils/sampleData';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000', 
  'http://localhost:3001', 
  'http://localhost:3002', 
  'http://localhost:3003', 
  'http://localhost:3004'
];

// Add production URLs from environment variables
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

// Add common Vercel deployment patterns
if (process.env.NODE_ENV === 'production') {
  allowedOrigins.push(
    'https://jobportal-frontend-9dny-2a66n0l7j-induspriyas-projects.vercel.app',
    'https://jobportal-frontend.vercel.app',
    'https://jobportal.vercel.app',
    'https://job-portal-frontend.vercel.app',
    'https://job-portal.vercel.app'
  );
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Job Portal API is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Populate sample data in development
    if (process.env.NODE_ENV === 'development') {
      await populateSampleData();
    }
    
    // In production (Vercel), don't call app.listen()
    if (process.env.NODE_ENV === 'production') {
      console.log(`🚀 Server ready for production`);
      console.log(`📊 Environment: ${process.env.NODE_ENV}`);
      console.log(`🔗 API URL: /api`);
    } else {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📊 Environment: ${process.env.NODE_ENV}`);
        console.log(`🔗 API URL: http://localhost:${PORT}/api`);
      });
    }
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Export for Vercel
export default app;

// Start server if not in production
if (process.env.NODE_ENV !== 'production') {
  startServer();
} 