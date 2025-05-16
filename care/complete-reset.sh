#!/bin/bash

echo "🔧 Complete Environment Reset for JSON Parsing Error"
echo "=================================================="

# Step 1: Kill all processes aggressively
echo "1. Stopping ALL related processes..."
pkill -9 -f "shopify" 2>/dev/null
pkill -9 -f "hydrogen" 2>/dev/null
pkill -9 -f "vite" 2>/dev/null
pkill -9 -f "node" 2>/dev/null
pkill -9 -f "remix" 2>/dev/null

# Step 2: Remove all build artifacts and caches
echo "2. Deep cleaning all build artifacts..."
rm -rf .shopify .hydrogen build dist .cache .tmp
rm -rf node_modules/.vite node_modules/.cache
rm -rf .vite .tsbuildinfo

# Step 3: Clear all Node.js and npm caches
echo "3. Clearing all caches..."
npm cache clean --force
rm -rf ~/.npm/_cacache
rm -rf /tmp/npm-*

# Step 4: Remove and reinstall node_modules
echo "4. Rebuilding dependencies..."
rm -rf node_modules package-lock.json
npm install

# Step 5: Check for duplicate files that might cause conflicts
echo "5. Checking for problematic files..."
# Remove any files in root that shouldn't be there
rm -f root.tsx
rm -f "($locale)._index.tsx"
rm -f "*.backup"

# Step 6: Verify GraphQL codegen
echo "6. Regenerating GraphQL types..."
rm -f storefrontapi.generated.d.ts
rm -f customer-accountapi.generated.d.ts

# Step 7: Reset TypeScript cache
echo "7. Clearing TypeScript cache..."
rm -rf .tsbuildinfo

# Step 8: Wait for file system
echo "8. Waiting for file system to stabilize..."
sleep 5

# Step 9: Set clean environment
echo "9. Setting up clean environment..."
export NODE_ENV=development
export NODE_OPTIONS="--max-old-space-size=4096"
unset VITE_HMR_PORT

# Step 10: Start development server with verbose logging
echo "10. Starting development server with verbose logging..."
echo ""
echo "🚀 Starting Shopify Hydrogen with clean environment..."
echo ""

# Start with explicit codegen
npm run dev -- --verbose

echo ""
echo "If the error persists, please check the console output above for specific details."
echo "The issue might be related to:"
echo "1. Corrupt GraphQL generated files"
echo "2. Invalid .env variables"
echo "3. Malformed JSON in config files"
echo "4. TypeScript compilation errors being misinterpreted as JSON errors"
