#!/bin/bash

echo "🔧 Alternative Fix - Direct Build Approach"
echo "========================================="

cd /Users/yvonne/Desktop/shopify/care-shopify/care

# Kill all processes
pkill -f "hydrogen\|mini-oxygen\|vite" || true

# 1. Keep Vite 6.x but ensure all Shopify packages are compatible
echo "📦 Ensuring package compatibility..."

# Install specific compatible versions
npm install \
  @shopify/hydrogen@2025.1.4 \
  @shopify/mini-oxygen@3.2.1 \
  @shopify/remix-oxygen@2.0.12 \
  vite@6.3.5 \
  --save-dev

# 2. Clean build artifacts
echo "🧹 Cleaning build artifacts..."
rm -rf .hydrogen .shopify dist public/build node_modules/.vite

# 3. Generate fresh TypeScript definitions
echo "📝 Generating TypeScript definitions..."
npm run typecheck || true

# 4. Try dev server directly (skip build for now)
echo "🚀 Starting dev server directly..."
npm run dev

echo "If this works, the issue was with the build process."
echo "The dev server can run without a pre-build in development mode."