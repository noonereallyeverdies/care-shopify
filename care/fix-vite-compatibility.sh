#!/bin/bash

echo "🔧 Fixing Vite Version Compatibility Issue"
echo "=========================================="

cd /Users/yvonne/Desktop/shopify/care-shopify/care

# Kill all processes
pkill -f "hydrogen\|mini-oxygen\|vite" || true

# 1. Restore Vite 6.x (it's required for MiniOxygen)
echo "🔧 Restoring Vite 6.x for MiniOxygen compatibility..."
npm install vite@^6.3.5 --save-dev

# 2. Update MiniOxygen to latest version for Vite 6 compatibility
echo "📦 Updating MiniOxygen to latest version..."
npm install @shopify/mini-oxygen@latest --save-dev

# 3. Update Hydrogen to latest stable version
echo "📦 Updating Hydrogen to latest stable version..."
npm install @shopify/hydrogen@latest

# 4. Clean all caches again after version updates
echo "🧹 Cleaning caches after version updates..."
rm -rf .hydrogen .shopify dist public/build node_modules/.vite

# 5. Try building without force flag (it doesn't exist)
echo "🏗️  Building application..."
npm run build

# 6. Start dev server
echo "🚀 Starting development server..."
npm run dev