#!/bin/bash
cd "$(dirname "$0")"

# Set higher memory limit for Node.js
export NODE_OPTIONS="--max-old-space-size=4096"

# Clean any temporary directories
rm -rf ./.cache
rm -rf ./node_modules/.vite

# Kill any existing Hydrogen processes
pkill -f "shopify hydrogen" || true
sleep 1

# Start Hydrogen
echo "Starting Hydrogen app on port 4000..."
npx shopify hydrogen dev --port 4000
