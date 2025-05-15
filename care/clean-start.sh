#!/bin/bash
echo "Cleaning build directories..."
rm -rf dist
rm -rf node_modules/.vite

echo "Reinstalling dependencies..."
npm install

echo "Starting dev server..."
npm run dev 