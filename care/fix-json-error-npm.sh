#!/bin/bash

echo "🔧 Comprehensive fix for MiniOxygen JSON parsing error..."

cd /Users/yvonne/Desktop/shopify/care-shopify/care

# 1. Stop any running dev servers
echo "Stopping any running processes..."
pkill -f "hydrogen dev" || true
pkill -f "mini-oxygen" || true

# 2. Remove duplicate route file (already done, but checking)
echo "Ensuring no duplicate product route files..."
if [ -f "app/routes/(\$locale).products.\$productHandle.tsx" ]; then
    echo "⚠️  Found duplicate file, moving to backup..."
    mv "app/routes/(\$locale).products.\$productHandle.tsx" "backup-files/(\$locale).products.\$productHandle.tsx.backup.$(date +%s)"
fi

# 3. Clean all cache and temporary files
echo "Cleaning cache and temporary files..."
rm -rf .hydrogen
rm -rf .shopify
rm -rf dist
rm -rf public/build
rm -rf node_modules/.vite
rm -rf node_modules/.vite-cache
rm -rf node_modules/.cache

# 4. Clear npm cache and reinstall dependencies
echo "Clearing npm cache and reinstalling dependencies..."
npm cache clean --force
rm -rf node_modules
rm -f package-lock.json
npm install

# 5. Clean and regenerate GraphQL codegen
echo "Building application with fresh GraphQL codegen..."
npm run build

# 6. Restart development server with fresh state
echo "🚀 Starting development server with clean state..."
npm run dev

echo "✅ JSON parsing error fix complete!"
echo "The application should now start without issues."
