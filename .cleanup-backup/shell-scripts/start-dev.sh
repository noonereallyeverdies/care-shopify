#!/bin/bash

# Quick Start Script for Care-atin Landing Page
# This script helps you get the development server running quickly

echo "🚀 CARE-ATIN LANDING PAGE - QUICK START"
echo "======================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo ""
echo "🔍 Pre-flight checks..."

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ required. Current version: $(node -v)"
    echo "Please upgrade Node.js: https://nodejs.org/"
    exit 1
else
    echo "✅ Node.js version: $(node -v)"
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "✅ Dependencies ready"

# Quick TypeScript check
echo "🔧 Checking TypeScript..."
if npm run typecheck > /dev/null 2>&1; then
    echo "✅ TypeScript validation passed"
else
    echo "⚠️  TypeScript warnings found (proceeding anyway)"
fi

echo ""
echo "🌟 STARTING DEVELOPMENT SERVER"
echo "==============================="
echo ""
echo "📱 Your landing page will be available at:"
echo "   http://localhost:3000"
echo ""
echo "🔐 First time? You'll need to authenticate with Shopify:"
echo "   • A browser window will open for authentication"
echo "   • Or follow the verification code link shown below"
echo ""
echo "🎯 What to test:"
echo "   • Hero section with video background"
echo "   • CTA button visibility and functionality"  
echo "   • All landing page sections loading"
echo "   • Mobile responsiveness"
echo "   • Component error boundaries"
echo ""
echo "🛑 To stop the server: Press Ctrl+C"
echo ""
echo "───────────────────────────────────────────────────────"

# Start the development server
npm run dev
