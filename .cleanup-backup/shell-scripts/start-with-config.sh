#!/bin/bash

# Script to switch between different vite configurations and start the app

# Change to the project directory
cd "$(dirname "$0")"

# Default configuration file
CONFIG_FILE="vite.config.ts"

# Function to start the app with a specific configuration
start_with_config() {
  if [ "$1" != "$CONFIG_FILE" ]; then
    echo "Switching to $1 configuration..."
    cp "$1" "$CONFIG_FILE"
  fi
  
  echo "Starting Hydrogen app with $(basename $1) configuration..."
  NODE_OPTIONS='--max-old-space-size=4096' npx shopify hydrogen dev --port 4000
}

# Clean any temporary directories
echo "Cleaning temporary directories..."
rm -rf ./.cache
rm -rf ./node_modules/.vite

# Kill any existing Hydrogen processes
echo "Stopping any running Hydrogen processes..."
pkill -f "shopify hydrogen" || true
sleep 1

# Check which configuration to use
if [ "$1" == "simple" ]; then
  start_with_config "vite.config.simple.ts"
else
  # Try the default configuration first
  start_with_config "$CONFIG_FILE"
  
  # If it fails, try the simple configuration
  if [ $? -ne 0 ]; then
    echo "Default configuration failed, trying simple configuration..."
    start_with_config "vite.config.simple.ts"
  fi
fi
