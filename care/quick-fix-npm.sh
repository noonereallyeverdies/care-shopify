#!/bin/bash

echo "🔧 Quick fix for MiniOxygen JSON parsing error..."

cd /Users/yvonne/Desktop/shopify/care-shopify/care

# 1. Kill any running dev server
pkill -f "hydrogen dev" || true
pkill -f "mini-oxygen" || true

# 2. Remove problematic cache files
rm -rf .hydrogen
rm -rf node_modules/.vite
rm -rf public/build

# 3. Rebuild with force using npm run commands
echo "Building application..."
npm run build

# 4. Clean restart
echo "🚀 Restarting development server..."
npm run dev

echo "✅ Fix applied!"
