#!/bin/bash

echo "🔄 Deep cleaning project..."

# Stop all processes
pkill -f "shopify" 2>/dev/null
pkill -f "hydrogen" 2>/dev/null  
pkill -f "vite" 2>/dev/null
pkill -f "node" 2>/dev/null

# Remove all cache directories
echo "Clearing caches..."
rm -rf .shopify
rm -rf .hydrogen
rm -rf build
rm -rf dist
rm -rf node_modules/.vite
rm -rf node_modules/.cache
rm -rf .cache

# Remove any backup or optimized files in the app directory
echo "Removing backup/optimized files..."
find app -name "*.backup" -delete
find app -name "*optimized*" -delete

# Remove any temp files
rm -rf .tmp
rm -rf tmp

# Clear npm cache
echo "Clearing npm cache..."
npm cache clean --force

echo "✅ Deep clean complete"

# Reinstall dependencies
echo "📦 Reinstalling dependencies..."
rm -rf node_modules
rm -f package-lock.json
npm install

echo "🚀 Starting development server..."
npm run dev
