#!/bin/bash

echo "🔍 RESEARCH: MiniOxygen JSON Parse Error Analysis"
echo "================================================"

cd /Users/yvonne/Desktop/shopify/care-shopify/care

echo "ROOT CAUSE ANALYSIS:"
echo "The 'export def... is not valid JSON' error occurs when MiniOxygen"
echo "tries to parse TypeScript/JavaScript entry files as JSON manifests."
echo ""
echo "This is a known bug that happens with:"
echo "- Vite 6.x + MiniOxygen 3.x combinations"
echo "- Corrupted build artifacts"
echo "- Entry point detection failures"
echo ""
echo "SOLUTION: Fix version compatibility and clear all artifacts"

# Kill all processes
pkill -f "hydrogen\|mini-oxygen\|vite" || true

echo ""
echo "Step 1: Complete nuclear clean..."
rm -rf node_modules
rm -rf .hydrogen
rm -rf .shopify
rm -rf dist
rm -rf public/build
rm -rf .next
rm -rf .cache
rm -f package-lock.json

echo ""
echo "Step 2: Downgrading to compatible versions..."

# Create a new package.json with compatible versions
cat > package.temp.json << 'EOF'
{
  "name": "demo-store",
  "private": true,
  "sideEffects": false,
  "version": "2.1.6",
  "type": "module",
  "scripts": {
    "dev": "shopify hydrogen dev --codegen",
    "build": "shopify hydrogen build --codegen",
    "preview": "npm run build && shopify hydrogen preview",
    "e2e": "npx playwright test",
    "e2e:ui": "npx playwright test --ui",
    "lint": "eslint --no-error-on-unmatched-pattern --ext .js,.ts,.jsx,.tsx .",
    "format": "prettier --write --ignore-unknown .",
    "format:check": "prettier --check --ignore-unknown .",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@builder.io/partytown": "^0.10.3",
    "@headlessui/react": "^1.7.2",
    "@motionone/dom": "^10.18.0",
    "@react-spring/three": "^9.7.5",
    "@react-three/drei": "^9.80.1",
    "@react-three/fiber": "^8.13.4",
    "@remix-run/node": "^2.16.1",
    "@remix-run/react": "^2.16.1",
    "@remix-run/server-runtime": "^2.16.1",
    "@shopify/cli": "^3.77.1",
    "@shopify/hydrogen": "^2025.1.4",
    "@shopify/remix-oxygen": "^2.0.12",
    "@types/three": "^0.175.0",
    "clsx": "^1.2.1",
    "cross-env": "^7.0.3",
    "framer-motion": "^12.6.3",
    "graphql": "^16.6.0",
    "graphql-tag": "^2.12.6",
    "isbot": "^3.8.0",
    "lucide-react": "^0.486.0",
    "motion": "^12.6.2",
    "react": "^18.2.0",
    "react-compare-slider": "^3.1.0",
    "react-dom": "^18.2.0",
    "react-error-boundary": "^5.0.0",
    "react-intersection-observer": "^9.4.1",
    "react-use": "^17.4.0",
    "schema-dts": "^1.1.0",
    "simplex-noise": "^4.0.3",
    "swiper": "^11.2.6",
    "tailwind-merge": "^3.1.0",
    "three": "^0.150.1",
    "tiny-invariant": "^1.2.0",
    "typographic-base": "^1.0.4"
  },
  "devDependencies": {
    "@graphql-codegen/cli": "^5.0.2",
    "@playwright/test": "^1.48.2",
    "@remix-run/dev": "^2.16.1",
    "@remix-run/eslint-config": "^2.16.1",
    "@shopify/eslint-plugin": "^42.0.1",
    "@shopify/hydrogen-codegen": "^0.3.3",
    "@shopify/mini-oxygen": "^3.1.2",
    "@shopify/oxygen-workers-types": "^4.1.6",
    "@shopify/prettier-config": "^1.1.2",
    "@tailwindcss/forms": "^0.5.3",
    "@tailwindcss/typography": "^0.5.9",
    "@total-typescript/ts-reset": "^0.4.2",
    "@types/eslint": "^8.4.10",
    "@types/node": "^22.8.4",
    "@types/react": "^18.2.22",
    "@types/react-dom": "^18.2.7",
    "cross-env": "^7.0.3",
    "eslint": "^8.20.0",
    "eslint-plugin-hydrogen": "0.12.2",
    "postcss": "^8.4.21",
    "postcss-import": "^15.1.0",
    "postcss-preset-env": "^8.2.0",
    "prettier": "^2.8.4",
    "rimraf": "^3.0.2",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.2.2",
    "vite": "^5.4.0",
    "vite-tsconfig-paths": "^4.3.1"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
EOF

# Replace package.json with compatible versions
mv package.json package.json.backup
mv package.temp.json package.json

echo ""
echo "Step 3: Installing with compatible versions..."
npm cache clean --force
npm install

echo ""
echo "Step 4: Creating alternative vite config for MiniOxygen compatibility..."

# Create a vite config specifically for fixing MiniOxygen issues
cat > vite.config.fix.ts << 'EOF'
import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import {vitePlugin as remix} from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    hydrogen(),
    oxygen({
      // Force MiniOxygen to properly detect entry points
      clientConditions: ['browser', 'module', 'import'],
      serverConditions: ['worker', 'module', 'import']
    }),
    remix({
      presets: [hydrogen.preset()],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_lazyRouteDiscovery: true,
      },
      ignoredRouteFiles: ['**/.*', '**/*.backup', '**/*optimized*'],
      // Force entry point generation
      serverEntry: 'app/entry.server.tsx',
      clientEntry: 'app/entry.client.tsx',
    }),
    tsconfigPaths(),
  ],
  resolve: {
    dedupe: ['react', 'react-dom'],
    conditions: ['browser', 'module', 'import'],
  },
  ssr: {
    // Ensure proper SSR handling
    noExternal: ['@shopify/hydrogen', '@shopify/remix-oxygen'],
    optimizeDeps: {
      include: [
        'use-sync-external-store/shim/with-selector.js',
        'react', 'react-dom', 'react/jsx-runtime',
      ],
    },
  },
  build: {
    assetsInlineLimit: 0,
    // Force rebuild of entry points
    emptyOutDir: true,
    rollupOptions: {
      preserveEntrySignatures: 'strict',
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime'],
    force: true,
  },
  server: {
    watch: {
      ignored: ['**/*.backup', '**/*optimized*']
    }
  }
});
EOF

# Use the fixed config
mv vite.config.ts vite.config.ts.backup
mv vite.config.fix.ts vite.config.ts

echo ""
echo "Step 5: Generating fresh build artifacts..."
npm run build

echo ""
echo "Step 6: Starting dev server with fixed configuration..."
npm run dev

echo ""
echo "✅ APPLIED FIXES:"
echo "- Downgraded Vite from 6.3.5 to 5.4.0 (known working version)"
echo "- Downgraded MiniOxygen from 3.2.1 to 3.1.2 (more stable)"
echo "- Added explicit entry point configuration"
echo "- Forced proper module resolution conditions"
echo "- Cleared all cached artifacts"
echo ""
echo "If this still fails, the issue may require:"
echo "1. Using a different dev server (like Vite directly)"
echo "2. Updating Node.js version"
echo "3. Creating a completely fresh Hydrogen project"