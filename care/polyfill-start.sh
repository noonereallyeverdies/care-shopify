#!/bin/bash
echo "========================================================"
echo "Starting Shopify Hydrogen with enhanced Node.js polyfills"
echo "========================================================"

# Clean temporary build files
echo "Cleaning temporary files..."
rm -rf ./.cache ./dist ./public/build

# Set environment variables for better performance and debugging
export NODE_OPTIONS="--max-old-space-size=4096 --trace-warnings"
export SHOPIFY_FLAG_HYDROGEN_EXPERIMENTAL_DISABLE_NODE_BUILTIN_WARNINGS=true
export VITE_CJS_IGNORE_WARNING=true
export VITE_CJS_TRACE_IGNORE=true
export DEBUG="vite:*,shopify:*"

# Attempt to use optimized startup flags
echo "Running Vite with enhanced polyfills..."
npx vite --clearScreen false --force --open --host localhost 