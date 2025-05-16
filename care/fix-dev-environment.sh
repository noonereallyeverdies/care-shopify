#!/bin/bash

echo "🚀 Fixing Shopify Development Environment"
echo "========================================"

# Step 1: Kill all related processes
echo "1. Stopping all processes..."
pkill -f "shopify" 2>/dev/null
pkill -f "hydrogen" 2>/dev/null
pkill -f "vite" 2>/dev/null
pkill -f "node.*remix" 2>/dev/null

# Step 2: Clean all cache and build directories  
echo "2. Cleaning build artifacts..."
rm -rf .shopify
rm -rf .hydrogen  
rm -rf build
rm -rf dist
rm -rf .cache
rm -rf .tmp

# Step 3: Clean node_modules cache
echo "3. Cleaning Node.js cache..."
rm -rf node_modules/.vite
rm -rf node_modules/.cache
npm cache clean --force

# Step 4: Remove problematic files
echo "4. Removing backup/optimized files..."
find . -name "*.backup" -delete 2>/dev/null
find app -name "*optimized*" -not -path "*/node_modules/*" -delete 2>/dev/null

# Step 5: Verify main files exist
echo "5. Verifying main files..."
if [ ! -f "app/routes/(\$locale)._index.tsx" ]; then
    echo "❌ Main index file missing. Please check the file exists."
    exit 1
fi

if [ ! -f "app/root.tsx" ]; then
    echo "❌ Root file missing. Please check the file exists."
    exit 1
fi

echo "✅ Main files verified"

# Step 6: Reinstall dependencies (if needed)
if [ ! -d "node_modules" ]; then
    echo "6. Installing dependencies..."
    npm install
else
    echo "6. Dependencies already installed"
fi

# Step 7: Wait a moment for file system to settle
echo "7. Waiting for file system to settle..."
sleep 2

# Step 8: Start development server with clean environment
echo "8. Starting development server..."
echo "   Server will start at http://localhost:3000"
echo ""

# Set clean environment and start
unset VITE_HMR_PORT
export NODE_ENV=development

npm run dev

echo ""
echo "✅ Development server should now be running"
echo "If you still see errors, please restart your terminal and try again."
