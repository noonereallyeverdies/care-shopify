#!/bin/bash

echo "🔧 Comprehensive Fix for MiniOxygen JSON Parsing Error"
echo "====================================================="

cd /Users/yvonne/Desktop/shopify/care-shopify/care

# 1. Kill all running processes
echo "🔪 Stopping all running processes..."
pkill -f "hydrogen" || true
pkill -f "mini-oxygen" || true
pkill -f "vite" || true
pkill -f "node.*dev" || true
sleep 2

# 2. Deep clean all caches and build artifacts
echo "🧹 Deep cleaning all caches and build artifacts..."
rm -rf .hydrogen
rm -rf .shopify
rm -rf dist
rm -rf public/build
rm -rf public/dist
rm -rf .cache
rm -rf build
rm -rf .vite
rm -rf .remix

# Clean node_modules caches
rm -rf node_modules/.vite
rm -rf node_modules/.cache
rm -rf node_modules/.hydrogen
rm -rf node_modules/.remix
rm -rf node_modules/@shopify/hydrogen/.vite

# Clean TypeScript build info
rm -f tsconfig.tsbuildinfo
rm -f .tsbuildinfo

# 3. Clear npm cache completely
echo "🗑️  Clearing npm cache..."
npm cache clean --force
npm cache clean --force # Run twice to ensure complete clean

# 4. Remove and reinstall dependencies
echo "📦 Reinstalling dependencies..."
rm -rf node_modules
rm -f package-lock.json

# Install dependencies
npm install

# 5. Fix potential Vite version compatibility issue
echo "🔧 Checking Vite version compatibility..."
# Check current versions
VITE_VERSION=$(npm list vite --depth=0 | grep vite@ | sed 's/.*vite@//')
HYDROGEN_VERSION=$(npm list @shopify/hydrogen --depth=0 | grep @shopify/hydrogen@ | sed 's/.*@shopify\/hydrogen@//')

echo "Current Vite version: $VITE_VERSION"
echo "Current Hydrogen version: $HYDROGEN_VERSION"

# If using Vite 6.x, try downgrading to 5.x for compatibility
if [[ $VITE_VERSION == 6.* ]]; then
    echo "⚠️  Detected Vite 6.x, attempting compatibility fix..."
    npm install vite@^5.4.0 --save-dev
    echo "Downgraded Vite to 5.x for compatibility"
fi

# 6. Generate fresh GraphQL types
echo "📝 Generating fresh GraphQL types..."
rm -f storefrontapi.generated.d.ts
rm -f customer-accountapi.generated.d.ts

# 7. Build with specific flags to ensure proper generation
echo "🏗️  Building application with clean state..."
# Run build with force flag to ensure fresh generation
NODE_ENV=production npx shopify hydrogen build --codegen --force

# 8. Verify build output
if [ -d "dist" ] || [ -d "public/build" ]; then
    echo "✅ Build completed successfully"
else
    echo "❌ Build failed - trying alternative approach..."
    
    # Alternative build approach
    echo "🔄 Trying alternative build approach..."
    
    # Clear everything again
    rm -rf dist public/build .hydrogen
    
    # Try with different Node environment
    NODE_OPTIONS="--max-old-space-size=4096" npx shopify hydrogen build --codegen
fi

# 9. Start development server with clean environment
echo "🚀 Starting development server..."
NODE_OPTIONS="--max-old-space-size=4096" npx shopify hydrogen dev --codegen --port 3000

echo "✅ Fix applied! If the error persists, the issue may require:"
echo "   - Hydrogen version upgrade/downgrade"
echo "   - Manual resolution of specific build conflicts"
echo "   - Checking for circular dependencies in routes"
