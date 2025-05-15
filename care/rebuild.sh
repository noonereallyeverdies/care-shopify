#!/bin/bash
echo "Starting complete rebuild..."

# Backup package.json just in case
echo "Backing up package.json..."
cp package.json package.json.backup

# Remove node_modules
echo "Removing node_modules..."
rm -rf node_modules

# Remove dist
echo "Removing dist..."
rm -rf dist

# Reinstall dependencies
echo "Reinstalling all dependencies..."
npm install

echo "Rebuild completed. You can now try: npm run dev" 