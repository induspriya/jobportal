# 🚀 Vercel Deployment Fix Guide

## ❌ **Issue: "No Output Directory named 'dist' found"**

This error occurs when Vercel cannot find the build output directory after the build process completes.

## ✅ **Solution: Updated Configuration with Build Script**

### **1. Updated `vercel.json`**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "frontend/dist",
        "buildCommand": "./build.sh"
      }
    },
    {
      "src": "api/index.ts",
      "use": "@vercel/node"
    }
  ],
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/index.ts"
    },
    {
      "source": "/(.*)",
      "destination": "/frontend/dist/index.html"
    }
  ]
}
```

### **2. Added `build.sh` Script**
A reliable build script that handles the entire build process:
```bash
#!/bin/bash
echo "🚀 Starting Vercel build process..."
cd frontend
npm install
npm run build
# Verify build output
if [ -d "dist" ]; then
    echo "✅ Frontend dist directory created successfully"
else
    echo "❌ Frontend dist directory not found"
    exit 1
fi
```

### **3. Updated Root `package.json`**
Added proper build scripts:
```json
{
  "scripts": {
    "build": "npm run build:frontend",
    "build:frontend": "cd frontend && npm install && npm run build",
    "vercel-build": "cd frontend && npm install && npm run build"
  }
}
```

### **4. Added `.vercelignore`**
Excludes unnecessary files from deployment.

## 🔧 **Manual Verification Steps**

### **Test Build Locally:**
```bash
# Test the build script
./build.sh

# Or test manually
cd frontend
npm install
npm run build
ls -la dist/
```

### **Expected Output:**
```
dist/
├── index.html
├── favicon.svg
├── .htaccess
└── assets/
    ├── index-*.css
    ├── index-*.js
    ├── vendor-*.js
    └── router-*.js
```

## 🚀 **Vercel Deployment Steps**

### **1. Connect Repository**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository: `https://github.com/induspriya/jobportal.git`

### **2. Configure Build Settings**
- **Framework Preset**: Other
- **Root Directory**: `./` (root of repository)
- **Build Command**: `./build.sh` (or leave empty to use vercel.json)
- **Output Directory**: `frontend/dist`

### **3. Set Environment Variables**
Add these environment variables in Vercel:

```env
# Database
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/job-portal

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Environment
NODE_ENV=production

# Frontend URL (update after deployment)
FRONTEND_URL=https://your-domain.vercel.app

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@jobportal.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### **4. Deploy**
Click "Deploy" and wait for the build to complete.

## 🔍 **Troubleshooting**

### **If Build Still Fails:**

1. **Check Build Logs**
   - Look for specific error messages in Vercel build logs
   - Verify all dependencies are installed

2. **Alternative Build Command**
   - Try using: `cd frontend && npm install && npm run build`
   - Or use the root package.json build script

3. **Verify Package.json**
   - Ensure `build` script exists in `frontend/package.json`
   - Check that all dependencies are listed

4. **Test Locally First**
   ```bash
   ./build.sh
   ```

### **Common Issues:**

1. **Missing Dependencies**
   - Solution: Add missing packages to `package.json`

2. **TypeScript Errors**
   - Solution: Fix TypeScript compilation errors

3. **Path Issues**
   - Solution: Ensure all import paths are correct

4. **Environment Variables**
   - Solution: Set all required environment variables in Vercel

5. **Build Script Permissions**
   - Solution: Ensure `build.sh` is executable (`chmod +x build.sh`)

## ✅ **Success Indicators**

When deployment is successful, you should see:

1. **Build Status**: ✅ Success
2. **Frontend**: Accessible at your Vercel domain
3. **API**: Working at `your-domain.vercel.app/api/health`
4. **Database**: Connected and responding
5. **Authentication**: Login/register working

## 🎯 **Post-Deployment Checklist**

- [ ] Frontend loads correctly
- [ ] API endpoints respond
- [ ] Database connection works
- [ ] Authentication functions
- [ ] Job listings display
- [ ] User registration works
- [ ] Email functionality (if configured)

## 📞 **Support**

If you continue to experience issues:

1. Check the build logs in Vercel dashboard
2. Verify all environment variables are set
3. Test the build process locally using `./build.sh`
4. Review the updated configuration files

**Your job portal should now deploy successfully on Vercel!** 🎉 