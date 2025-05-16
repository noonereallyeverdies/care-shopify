#!/bin/bash

echo "🔧 Alternative fix using npx..."

cd /Users/yvonne/Desktop/shopify/care-shopify/care

# 1. Kill any running dev server
pkill -f "hydrogen dev" || true
pkill -f "mini-oxygen" || true

# 2. Remove problematic cache files
rm -rf .hydrogen
rm -rf node_modules/.vite
rm -rf public/build

# 3. Try to run Shopify CLI with npx
echo "Building application with npx..."
npx shopify hydrogen build --codegen --force || npm run build

# 4. Clean restart
echo "🚀 Restarting development server..."
npx shopify hydrogen dev || npm run dev

echo "✅ Fix applied!"
