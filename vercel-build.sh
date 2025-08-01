#!/bin/bash

# Vercel Build Script for Job Portal
echo "🚀 Starting Vercel build process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build frontend
echo "🏗️ Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Build backend
echo "🏗️ Building backend..."
cd backend
npm install
npm run build
cd ..

# Verify dist directory exists
echo "✅ Verifying build output..."
if [ -d "frontend/dist" ]; then
    echo "✅ Frontend dist directory created successfully"
    ls -la frontend/dist/
else
    echo "❌ Frontend dist directory not found"
    exit 1
fi

echo "🎉 Build completed successfully!" 