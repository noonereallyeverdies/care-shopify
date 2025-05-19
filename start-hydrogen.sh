#!/bin/bash

# Script to start the Hydrogen application with better error handling

# Change to the project directory
cd "$(dirname "$0")"

# Kill any running Hydrogen processes
echo "Stopping any running Hydrogen processes..."
pkill -f "shopify hydrogen" || true
sleep 1

# Clean temporary directories that might cause issues
echo "Cleaning temporary directories..."
rm -rf ./.cache
rm -rf ./node_modules/.vite

# Set higher memory limit for Node.js
export NODE_OPTIONS="--max-old-space-size=4096"

# Define alternative ways to start the app
start_with_default_config() {
  echo "Starting Hydrogen app with default configuration..."
  npx shopify hydrogen dev --port 4000
}

start_with_debug() {
  echo "Starting Hydrogen app in debug mode..."
  DEBUG=hydrogen npx shopify hydrogen dev --port 4000
}

start_with_custom_vite() {
  echo "Starting Hydrogen app with custom Vite config..."
  NODE_ENV=development npx vite --config vite.custom.js
}

# Start the app with the default method
echo "Starting Hydrogen app on port 4000..."
start_with_default_config

# If the default method fails, try with debug mode
if [ $? -ne 0 ]; then
  echo "Default start failed, trying debug mode..."
  start_with_debug
fi

# If debug mode fails, try with custom Vite config
if [ $? -ne 0 ]; then
  echo "Debug mode failed, trying with custom Vite config..."
  start_with_custom_vite
fi
