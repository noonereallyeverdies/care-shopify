#!/bin/bash

echo "🔧 Final Fix for Shopify Development Environment"
echo "=============================================="

# Step 1: Stop all processes
echo "1. Stopping all running processes..."
pkill -f "shopify" 2>/dev/null
pkill -f "hydrogen" 2>/dev/null
pkill -f "vite" 2>/dev/null
pkill -f "node.*remix" 2>/dev/null

# Step 2: Remove misplaced files that shouldn't be in root
echo "2. Cleaning up misplaced files..."
rm -f "($locale)._index.tsx" 2>/dev/null
rm -f "root.tsx" 2>/dev/null
rm -f "*.backup" 2>/dev/null

# Step 3: Verify that the correct files exist in the right locations
echo "3. Verifying file structure..."
if [ ! -f "app/root.tsx" ]; then
    echo "⚠️  Warning: app/root.tsx not found"
fi

if [ ! -f "app/routes/(\$locale)._index.tsx" ]; then
    echo "⚠️  Warning: app/routes/(\$locale)._index.tsx not found"
fi

# Step 4: Clean all caches and build artifacts
echo "4. Cleaning build artifacts and caches..."
rm -rf .shopify
rm -rf .hydrogen
rm -rf build
rm -rf dist
rm -rf .cache
rm -rf .tmp
rm -rf node_modules/.vite
rm -rf node_modules/.cache

# Step 5: Clear npm cache
echo "5. Clearing npm cache..."
npm cache clean --force

# Step 6: Check for any problematic files
echo "6. Removing any remaining problematic files..."
find . -name "*.backup" -delete 2>/dev/null
find app -name "*optimized*" -not -path "*/node_modules/*" -delete 2>/dev/null

# Step 7: Wait for file system
echo "7. Waiting for file system to settle..."
sleep 3

# Step 8: Start fresh development server
echo "8. Starting development server..."
echo ""
echo "🚀 Launching Shopify Hydrogen development server..."
echo "   URL: http://localhost:3000"
echo ""

# Set clean environment variables
export NODE_ENV=development
unset VITE_HMR_PORT

# Start the development server
npm run dev

echo ""
echo "✅ If the server starts successfully, the issue should be resolved!"
echo "💡 If you still see errors, please restart your terminal completely."
