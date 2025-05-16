#!/bin/bash

echo "🔧 Fixing MiniOxygen JSON parsing error..."

cd /Users/yvonne/Desktop/shopify/care-shopify/care

# 1. Stop any running dev servers
echo "Stopping any running processes..."
pkill -f "shopify hydrogen dev" || true
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
echo "Regenerating GraphQL types..."
rm -f storefrontapi.generated.d.ts
rm -f customer-accountapi.generated.d.ts
shopify hydrogen build --codegen --force

# 6. Clear Vite cache and build
echo "Rebuilding application..."
npx vite build --force

# 7. Restart development server with fresh state
echo "🚀 Starting development server with clean state..."
shopify hydrogen dev --codegen --port 3000

echo "✅ JSON parsing error fix complete!"
echo "The application should now start without issues."
