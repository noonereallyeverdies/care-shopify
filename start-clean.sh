#!/bin/bash

# Simple script to start Hydrogen app with clean cache
# This script cleans any cache or temporary files that might cause issues
# and then starts the Hydrogen development server

# Change to the project directory
cd "$(dirname "$0")"

# Set higher memory limit for Node.js
export NODE_OPTIONS="--max-old-space-size=4096"

# Kill any existing Hydrogen processes
echo "Stopping any running Hydrogen processes..."
pkill -f "shopify hydrogen" || true
sleep 1

# Clean temporary directories
echo "Cleaning temporary directories..."
rm -rf ./.cache
rm -rf ./node_modules/.vite

# Create a fresh start.lock file to force a clean start
echo "Creating fresh start lock..."
touch ./start.lock

# Start the Hydrogen app
echo "Starting Hydrogen app on port 4000..."
npx shopify hydrogen dev --port 4000
