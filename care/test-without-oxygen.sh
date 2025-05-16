#!/bin/bash

echo "🔧 Testing Without MiniOxygen Plugin"
echo "==================================="

cd /Users/yvonne/Desktop/shopify/care-shopify/care

# Kill any running processes
pkill -f "hydrogen\|mini-oxygen" || true

# 1. Backup original vite config
cp vite.config.ts vite.config.backup.ts

# 2. Use test config without oxygen plugin
cp vite.config.test.ts vite.config.ts

# 3. Clean build artifacts
rm -rf .hydrogen .shopify dist public/build node_modules/.vite

# 4. Try starting dev server without MiniOxygen
echo "🚀 Starting dev server without MiniOxygen plugin..."
npm run dev

echo "If this works, the issue is with the MiniOxygen plugin configuration."
echo "Press Ctrl+C to stop, then run restore script to restore original config."