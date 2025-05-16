#!/bin/bash

echo "🔍 Investigating MiniOxygen JSON Parsing Error"
echo "=============================================="

cd /Users/yvonne/Desktop/shopify/care-shopify/care

# Kill any running processes
pkill -f "hydrogen\|mini-oxygen" || true

# 1. Check MiniOxygen version and compatibility
echo "📦 Checking MiniOxygen version..."
npm list @shopify/mini-oxygen --depth=0

# 2. Check for any hidden .json files or manifests
echo "🔍 Looking for hidden JSON files..."
find . -name "*.json" -type f 2>/dev/null | head -10

# 3. Check .hydrogen directory if it exists
if [ -d ".hydrogen" ]; then
    echo "📁 Checking .hydrogen directory..."
    ls -la .hydrogen/
fi

# 4. Try to force generate the .hydrogen directory
echo "🏗️  Attempting to generate .hydrogen directory..."
mkdir -p .hydrogen

# 5. Try starting with explicit MiniOxygen configuration
echo "🚀 Starting with debug mode..."
DEBUG=mini-oxygen* npm run dev

echo "If you see debug output, it will help identify what MiniOxygen is trying to load."