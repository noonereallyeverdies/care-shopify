#!/bin/bash

# Clean start script for Hydrogen app
# This script cleans the cache and runs the app with debugging enabled

# Change to the script directory
cd "$(dirname "$0")"

# Set text colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Preparing to start Hydrogen app...${NC}"

# Clean temporary directories
echo -e "${YELLOW}Cleaning cache directories...${NC}"
rm -rf ./.cache
rm -rf ./node_modules/.vite

# Kill any running Hydrogen processes
echo -e "${YELLOW}Stopping any running Hydrogen processes...${NC}"
pkill -f "shopify hydrogen" || true
sleep 1

# Set environment variables
export NODE_OPTIONS="--max-old-space-size=4096"
export HYDROGEN_DEBUG=1
export HYDROGEN_DEV_FIX_JSON=1
export HYDROGEN_DEV_IGNORE_SSR_ERROR=1

# Start the app
echo -e "${GREEN}Starting Hydrogen app on port 4000...${NC}"
echo -e "${YELLOW}View app at:${NC} http://localhost:4000/"
npx shopify hydrogen dev --port 4000 --codegen
