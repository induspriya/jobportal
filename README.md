# 🚀 Job Portal - Modern Job Search Platform

A full-stack job portal application built with the MERN stack (MongoDB, Express.js, React, Node.js) and TypeScript. This platform connects job seekers with employers through a modern, responsive interface.

## ✨ Features

### For Job Seekers
- 🔍 **Advanced Job Search** - Search by title, location, category, and salary range
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 👤 **User Profiles** - Create and manage your professional profile
- 📄 **Resume Upload** - Upload and manage your resume
- 🔔 **Job Alerts** - Get notified about new opportunities
- 📊 **Application Tracking** - Track your job applications and status

### For Employers
- 🏢 **Job Posting** - Create and manage job listings
- 👥 **Candidate Management** - Review and manage applications
- 📈 **Analytics Dashboard** - Track job performance and applications
- 🔧 **Job Management** - Edit, deactivate, or delete job postings

### General Features
- 🔐 **Secure Authentication** - JWT-based authentication with password reset
- 📧 **Email Notifications** - Welcome emails and password reset functionality
- 🎨 **Modern UI/UX** - Beautiful, intuitive interface with Tailwind CSS
- ⚡ **Fast Performance** - Optimized for speed and user experience
- 🔒 **Role-based Access** - Different features for job seekers and employers

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety and better development experience
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email functionality
- **Express Validator** - Input validation

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **React Hook Form** - Form handling
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd job-portal
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Configuration

#### Backend Environment
Create a `.env` file in the `backend` directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/job-portal

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Email Configuration (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. Database Setup
Make sure MongoDB is running on your system or use a cloud MongoDB instance.

### 5. Start the Application

#### Development Mode
```bash
# Start both frontend and backend
npm run dev

# Or start them separately:
# Backend
npm run dev:backend

# Frontend
npm run dev:frontend
```

#### Production Mode
```bash
# Build the application
npm run build

# Start production servers
npm start
```

## 🚀 Usage

### Starting the Application
1. Start MongoDB service
2. Set up environment variables
3. Run `npm run dev` from the root directory
4. Access the application at `http://localhost:3000`

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/me` - Update user profile

#### Jobs
- `GET /api/jobs` - Get all jobs with filters
- `GET /api/jobs/:id` - Get single job
- `POST /api/jobs` - Create new job (employers only)
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `GET /api/jobs/categories` - Get job categories
- `GET /api/jobs/my-jobs` - Get user's posted jobs

#### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/applications` - Get user applications
- `GET /api/users/stats` - Get user statistics

## 📁 Project Structure

```
job-portal/
├── backend/                 # Backend API
│   ├── src/
│   │   ├── config/         # Database and app configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── types/          # TypeScript type definitions
│   │   ├── utils/          # Utility functions
│   │   └── index.ts        # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # App entry point
│   ├── package.json
│   └── vite.config.ts
├── package.json            # Root package.json
└── README.md
```

## 🎨 Design System

The application uses a modern design system with:
- **Color Palette**: Primary blues and secondary purples
- **Typography**: Inter font family
- **Components**: Reusable UI components with consistent styling
- **Responsive Design**: Mobile-first approach
- **Animations**: Smooth transitions and micro-interactions

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting
- CORS configuration
- Helmet.js for security headers
- Environment variable protection

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## 📦 Deployment

### 🚀 Vercel Deployment (Recommended)

This application is configured for easy deployment on Vercel. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

#### Quick Setup:
1. **Connect to Vercel**: Import your GitHub repository
2. **Set Environment Variables**: Configure MongoDB, JWT, and other settings
3. **Deploy**: Vercel automatically builds and deploys both frontend and backend

#### Required Environment Variables:
```env
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/job-portal
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### Alternative Deployment Options

#### Backend Deployment
1. Set up environment variables for production
2. Build the application: `npm run build`
3. Deploy to your preferred platform (Heroku, DigitalOcean, AWS, etc.)

#### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to Vercel, Netlify, or your preferred hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Express.js](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vite](https://vitejs.dev/) - Build tool

---

**Happy coding! 🎉** # Force redeploy Sat Aug  2 08:46:00 IST 2025
