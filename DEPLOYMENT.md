# 🚀 Job Portal Deployment Guide

## Vercel Deployment Setup

### 1. Connect Your Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository: `https://github.com/induspriya/jobportal.git`
4. Select the repository and click "Deploy"

### 2. Configure Environment Variables

In your Vercel project dashboard, go to **Settings → Environment Variables** and add:

#### Required Environment Variables:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/job-portal?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Environment
NODE_ENV=production

# Frontend URL (update after deployment)
FRONTEND_URL=https://your-frontend-domain.vercel.app

# Email Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. MongoDB Atlas Setup (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string
5. Replace `your-username`, `your-password`, and `your-cluster` in the MONGODB_URI

### 4. Deploy the Application

1. Vercel will automatically detect the configuration from `vercel.json`
2. The build process will:
   - Build the frontend (React + Vite)
   - Set up the backend (Node.js + Express)
   - Configure API routing

### 5. Update Frontend URL

After deployment, update the `FRONTEND_URL` environment variable with your actual deployed frontend URL.

### 6. Test Your Deployment

1. **Frontend**: Visit your deployed frontend URL
2. **API Health Check**: `https://your-domain.vercel.app/api/health`
3. **Test Login**: Use the sample credentials:
   - Email: `test@example.com`
   - Password: `password123`

## 🔧 Troubleshooting

### Common Issues:

1. **405 Method Not Allowed**: 
   - ✅ Fixed in latest deployment configuration
   - API routing is now properly configured

2. **CORS Errors**:
   - ✅ CORS is configured to allow your deployed domain
   - Update `FRONTEND_URL` environment variable

3. **Database Connection**:
   - Ensure MongoDB Atlas cluster is running
   - Check network access settings
   - Verify connection string format

4. **Build Errors**:
   - ✅ TypeScript configuration is fixed
   - ✅ Vite environment types are configured

## 📊 Deployment Status

- ✅ **Frontend**: React + Vite configured
- ✅ **Backend**: Express + Node.js configured  
- ✅ **API Routing**: Vercel rewrites configured
- ✅ **CORS**: Production-ready configuration
- ✅ **Environment Variables**: Template provided
- ✅ **Database**: MongoDB Atlas ready

## 🎯 Next Steps

1. **Deploy to Vercel** using the steps above
2. **Set environment variables** in Vercel dashboard
3. **Test all features** after deployment
4. **Update CORS** with your actual frontend URL

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoints individually
4. Check MongoDB connection

---

**Your job portal is ready for deployment! 🚀** 