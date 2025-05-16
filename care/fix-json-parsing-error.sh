#!/bin/bash

# Fix JSON parsing error script
echo "🔧 Fixing JSON parsing error..."

cd /Users/yvonne/Desktop/shopify/care-shopify/care

# 1. Remove duplicate product route file
echo "Removing duplicate product route file..."
if [ -f "app/routes/(\$locale).products.\$productHandle.tsx" ]; then
    rm "app/routes/(\$locale).products.\$productHandle.tsx"
    echo "✅ Removed duplicate product route file"
else
    echo "⚠️  Duplicate file already removed"
fi

# 2. Clear all cache and build artifacts
echo "Clearing cache and build artifacts..."
rm -rf .shopify
rm -rf dist
rm -rf public/build
rm -rf node_modules/.vite
rm -rf node_modules/.cache

# 3. Clean and reinstall node_modules
echo "Cleaning and reinstalling node_modules..."
rm -rf node_modules
rm -f package-lock.json
npm cache clean --force
npm install

# 4. Generate fresh GraphQL types and restart dev server
echo "Generating fresh GraphQL types..."
npm run graphql-codegen
shopify hydrogen build --codegen

# 5. Start the development server
echo "🚀 Starting development server..."
shopify hydrogen dev --codegen --port 3000

echo "✅ Fix applied! The JSON parsing error should be resolved."
