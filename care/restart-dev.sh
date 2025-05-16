#!/bin/bash

# Stop any running dev servers
pkill -f "shopify hydrogen dev" 2>/dev/null

# Clear any cached builds
rm -rf .shopify
rm -rf .hydrogen
rm -rf build

# Start the dev server
echo "Starting development server..."
npm run dev
