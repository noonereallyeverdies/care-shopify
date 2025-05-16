#!/bin/bash

echo "🚀 Quick Emergency Fix for JSON Parsing Error"
echo "============================================"

cd /Users/yvonne/Desktop/shopify/care-shopify/care

# Kill all processes
pkill -f "hydrogen\|mini-oxygen\|vite" || true

# Nuclear clean
rm -rf .hydrogen .shopify dist public/build node_modules/.vite

# Quick dependency fix
npm cache clean --force

# Try development without build first
echo "🔄 Attempting to start dev server without full build..."
npx shopify hydrogen dev --no-build --codegen

echo "If this works, the issue is in the build process."
echo "If it still fails, run the comprehensive fix script."
