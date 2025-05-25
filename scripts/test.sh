#!/bin/bash

# 🧪 PLAYWRIGHT TEST RUNNER
# Simplified test setup and execution

cd "$(dirname "$0")/.."

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
NC='\033[0m'

echo -e "${BLUE}🧪 Setting up Playwright tests...${NC}"

# Install if not present
if [ ! -d "node_modules/@playwright" ]; then
    echo -e "${YELLOW}📦 Installing Playwright...${NC}"
    npm install -D @playwright/test
    npx playwright install
fi

echo -e "${GREEN}✅ Playwright ready${NC}"
echo -e "${BLUE}🎯 Running tests...${NC}"

# Run the cart mutation tests
npm run test:cart
