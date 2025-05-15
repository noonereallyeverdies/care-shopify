#!/bin/bash

# This script does a clean rebuild of the project by removing node_modules and reinstalling

echo "🧹 Cleaning project..."

# Stop any running processes
echo "Stopping any running processes..."
pkill -f "shopify hydrogen" || true
pkill -f "shopify hydrogen" || true

# Remove the node_modules directory
echo "Removing node_modules..."
rm -rf node_modules

# Remove any build artifacts
echo "Removing build artifacts..."
rm -rf dist
rm -rf .shopify
rm -rf .hydrogen

# Remove any generated files
echo "Removing generated files..."
rm -f node-bundle.mjs
rm -f node-bundle.cjs

# Clear npm cache
echo "Clearing npm cache..."
npm cache clean --force

# Reinstall dependencies
echo "Reinstalling dependencies (this may take a while)..."
npm install

# Run our custom scripts
echo "Patching node_modules for node: protocol imports..."
node patch-node-modules.js

echo "Applying direct patches to problematic files..."
node direct-patches.js

echo "Patching Node.js import paths..."
node patch-node-import-paths.js

echo "Creating Node.js module bundle..."
node create-node-bundle.js

echo "Creating Node.js module symlinks..."
node create-node-symlinks.js

echo "Checking Node.js modules..."
NODE_OPTIONS="-r ./node-simple-solution.cjs" node check-node-modules.js

echo "✅ Clean and rebuild completed!"
echo "You can now run 'npm run dev' to start the development server."



