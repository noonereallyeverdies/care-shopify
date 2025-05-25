#!/bin/bash

# Script to set up Playwright for testing cart mutations

# Install Playwright
npm install -D @playwright/test

# Install Playwright browsers
npx playwright install

# Create a types folder if it doesn't exist
mkdir -p types

# Create playwright.d.ts file for TypeScript
cat > types/playwright.d.ts << 'EOF'
// This file provides type definitions for Playwright
// It helps resolve the TypeScript errors related to @playwright/test

declare module '@playwright/test' {
  export const test: any;
  export const expect: any;
  export type Page = any;
  export type Request = any;
  export type Route = any;
  export const devices: any;
  export function defineConfig(config: any): any;
}
EOF

echo "Playwright setup complete!"
echo "To run the cart mutation tests, use: npm run test:cart" 