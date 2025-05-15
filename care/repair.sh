#!/bin/bash
echo "Repairing dependencies..."

# Clear only the vite cache
echo "Clearing Vite cache..."
rm -rf node_modules/.vite

# Clean up only the dist directory
echo "Clearing dist directory..."
rm -rf dist

# Force reinstall @shopify/cli package
echo "Reinstalling Shopify CLI..."
npm install @shopify/cli@latest --force

# Reinstall other shopify dependencies
echo "Reinstalling Hydrogen and Oxygen dependencies..."
npm install @shopify/hydrogen@latest @shopify/remix-oxygen@latest --save

echo "Repair completed. You can now try running: ./normal-start.sh" 