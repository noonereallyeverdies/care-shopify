#!/bin/bash

echo "🔧 Manual Fix - Step by Step"
echo "============================"

cd /Users/yvonne/Desktop/shopify/care-shopify/care

echo "Step 1: Kill all processes"
pkill -f "hydrogen\|mini-oxygen\|vite" || true

echo "Step 2: Check current versions"
npm list vite @shopify/mini-oxygen @shopify/hydrogen --depth=0

echo "Step 3: Clean everything"
rm -rf .hydrogen .shopify dist public/build node_modules/.vite

echo "Step 4: Check if dev server can start without build"
echo "This will tell us if the issue is with the build or runtime..."

# Set environment variables to help with debugging
export NODE_ENV=development
export DEBUG=hydrogen:*

npm run dev