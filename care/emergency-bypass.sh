#!/bin/bash

echo "🚨 Emergency Fix - Bypass MiniOxygen Issues"
echo "=========================================="

cd /Users/yvonne/Desktop/shopify/care-shopify/care

# Kill all running processes
pkill -f "hydrogen\|mini-oxygen" || true

echo "This error suggests MiniOxygen itself has an issue parsing entry points."
echo "Let's try a different approach - updating to the latest versions:"

# Update all Shopify packages to their latest versions
echo "Updating Shopify packages..."
npm update @shopify/hydrogen @shopify/mini-oxygen @shopify/remix-oxygen @shopify/cli

# Clear all caches again
echo "Clearing all caches..."
rm -rf .hydrogen .shopify dist public/build node_modules/.vite

# Try a different approach - use a different port and explicit flags
echo "Starting with explicit configuration..."
PORT=4000 npm run dev

echo ""
echo "If this still fails, the issue might be:"
echo "1. A bug in the current MiniOxygen version"
echo "2. A Vite/Node.js version compatibility issue"
echo "3. A corrupted entry point file that Vite is generating"