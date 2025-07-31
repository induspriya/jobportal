#!/bin/bash

# Job Portal Installation Script
echo "🚀 Welcome to Job Portal Installation!"
echo "======================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Create backend .env file if it doesn't exist
if [ ! -f "backend/.env" ]; then
    echo "🔧 Creating backend environment file..."
    cp backend/env.example backend/.env
    echo "⚠️  Please update backend/.env with your configuration values"
fi

# Create frontend .env file if it doesn't exist
if [ ! -f "frontend/.env" ]; then
    echo "🔧 Creating frontend environment file..."
    cat > frontend/.env << EOF
VITE_API_URL=http://localhost:5000/api
EOF
fi

echo ""
echo "🎉 Installation completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Update backend/.env with your MongoDB connection and email settings"
echo "2. Start MongoDB service"
echo "3. Run 'npm run dev' to start the development servers"
echo "4. Access the application at http://localhost:3000"
echo ""
echo "📚 For more information, check the README.md file"
echo ""
echo "Happy coding! 🚀" 