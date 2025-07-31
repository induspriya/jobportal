# 🚀 Deployment Guide

## GitHub Setup

### 1. Create a New Repository
1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Name it `job-portal`
4. Make it **Public** (required for free Vercel deployment)
5. **Don't** initialize with README, .gitignore, or license
6. Click "Create repository"

### 2. Push Your Code
```bash
# Remove the current remote (if it exists)
git remote remove origin

# Add your new repository as remote
git remote add origin https://github.com/YOUR_USERNAME/job-portal.git

# Push to GitHub
git push -u origin main
```

## Vercel Deployment

### 1. Connect to Vercel
1. Go to [Vercel](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your `job-portal` repository
4. Configure the project settings:

### 2. Project Configuration
- **Framework Preset**: Other
- **Root Directory**: `./` (root)
- **Build Command**: `npm run build`
- **Output Directory**: `frontend/dist`
- **Install Command**: `npm run install:all`

### 3. Environment Variables
Add these environment variables in Vercel:

```
# Backend
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=production

# Frontend
VITE_API_URL=https://your-vercel-domain.vercel.app/api
```

### 4. MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Replace `your_mongodb_atlas_connection_string` with your actual connection string

### 5. Deploy
1. Click "Deploy"
2. Wait for the build to complete
3. Your app will be live at `https://your-project-name.vercel.app`

## Alternative: Manual Deployment

If you prefer to deploy manually:

### 1. Build the Frontend
```bash
cd frontend
npm run build
```

### 2. Deploy Backend to Railway/Render
1. Go to [Railway](https://railway.app) or [Render](https://render.com)
2. Connect your GitHub repository
3. Set the root directory to `backend`
4. Add environment variables
5. Deploy

### 3. Update Frontend API URL
Update `frontend/.env` with your backend URL:
```
VITE_API_URL=https://your-backend-url.com/api
```

## Troubleshooting

### Common Issues:
1. **Build fails**: Check if all dependencies are in `package.json`
2. **API not working**: Verify environment variables are set correctly
3. **MongoDB connection fails**: Check your connection string and network access

### Local Testing:
```bash
# Test the build locally
npm run build

# Test the production build
npm run preview
```

## Production Checklist

- [ ] Environment variables configured
- [ ] MongoDB Atlas cluster set up
- [ ] JWT secret changed from default
- [ ] Email service configured (optional)
- [ ] Domain configured (optional)
- [ ] SSL certificate active
- [ ] Performance monitoring set up

## Support

If you encounter issues:
1. Check the Vercel build logs
2. Verify all environment variables are set
3. Test the API endpoints manually
4. Check MongoDB connection 