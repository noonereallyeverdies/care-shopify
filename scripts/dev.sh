#!/bin/bash

# 🚀 CONSOLIDATED DEVELOPMENT SCRIPT
# Replaces 10+ shell scripts with one reliable solution

# Change to project root
cd "$(dirname "$0")/.."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 Care-atin Development Server${NC}"
echo -e "${BLUE}===============================${NC}"

# Pre-flight checks
echo -e "${YELLOW}🔍 Pre-flight checks...${NC}"

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js 18+ required. Current: $(node -v)${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node -v)${NC}"

# Clean environment
echo -e "${YELLOW}🧹 Cleaning environment...${NC}"
pkill -f "shopify hydrogen" 2>/dev/null || true
rm -rf ./.cache ./node_modules/.vite
echo -e "${GREEN}✅ Environment cleaned${NC}"

# Set optimized environment
export NODE_OPTIONS="--max-old-space-size=4096"
export HYDROGEN_DEV_FIX_JSON=true

# Start server
echo -e "${GREEN}🌟 Starting development server...${NC}"
echo -e "${BLUE}📱 App will be available at: http://localhost:4000${NC}"
echo -e "${YELLOW}🛑 Press Ctrl+C to stop${NC}"
echo ""

# Use npm script which handles everything properly
npm run dev-port
