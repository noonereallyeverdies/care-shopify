#!/bin/bash

echo "🧹 Cleaning up..."

# Stop any running processes
pkill -f "shopify hydrogen" 2>/dev/null
pkill -f "vite" 2>/dev/null

# Clean all caches and builds
rm -rf .shopify
rm -rf .hydrogen
rm -rf build
rm -rf dist
rm -rf node_modules/.vite

# Remove any backup files that might be confusing Vite
find app -name "*.backup" -delete

echo "✅ Cleanup complete"

# Install dependencies if needed
echo "📦 Installing dependencies..."
npm install

echo "🚀 Starting development server..."
npm run dev
