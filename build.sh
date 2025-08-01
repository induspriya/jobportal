#!/bin/bash

echo "🚀 Starting Vercel build process..."

# Install dependencies in frontend
echo "📦 Installing frontend dependencies..."
cd frontend
npm install

# Build frontend
echo "🏗️ Building frontend..."
npm run build

# Verify build output
echo "✅ Verifying build output..."
if [ -d "dist" ]; then
    echo "✅ Frontend dist directory created successfully"
    ls -la dist/
else
    echo "❌ Frontend dist directory not found"
    exit 1
fi

echo "🎉 Build completed successfully!" 