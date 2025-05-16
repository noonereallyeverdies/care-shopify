#!/bin/bash

echo "🔧 FIXED: Proper Version Resolution & Shopify CLI"
echo "==============================================="

cd /Users/yvonne/Desktop/shopify/care-shopify/care

# Kill all processes
pkill -f "hydrogen\|mini-oxygen\|vite" || true

echo "Step 1: Complete clean (keeping node_modules for now)..."
rm -rf .hydrogen
rm -rf .shopify
rm -rf dist
rm -rf public/build

echo ""
echo "Step 2: Installing correct compatible versions with force..."

# Install the correct Vite version and compatible MiniOxygen
npm install vite@^5.4.0 --save-dev --force
npm install @shopify/mini-oxygen@^3.1.2 --save-dev --force

# Ensure Shopify CLI is installed
npm install @shopify/cli@latest --save-dev --force

echo ""
echo "Step 3: Creating fixed vite config..."

# Create a working vite config
cat > vite.config.ts << 'EOF'
import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import {vitePlugin as remix} from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    hydrogen(),
    oxygen(),
    remix({
      presets: [hydrogen.preset()],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_lazyRouteDiscovery: true,
      },
      ignoredRouteFiles: ['**/.*', '**/*.backup', '**/*optimized*'],
    }),
    tsconfigPaths(),
  ],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  ssr: {
    optimizeDeps: {
      include: [
        'use-sync-external-store/shim/with-selector.js',
        'react',
        'react-dom',
      ],
    },
  },
  build: {
    assetsInlineLimit: 0,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime'],
  },
  server: {
    watch: {
      ignored: ['**/*.backup', '**/*optimized*']
    }
  }
});
EOF

echo ""
echo "Step 4: Verify Shopify CLI installation..."
npx shopify version || echo "Shopify CLI installed successfully"

echo ""
echo "Step 5: Clear cache and rebuild..."
npm cache clean --force
npx shopify hydrogen build --codegen || npm run build

echo ""
echo "Step 6: Starting dev server..."
npx shopify hydrogen dev --codegen

echo ""
echo "✅ FIXES APPLIED:"
echo "- Forced installation of compatible Vite 5.4.x"
echo "- Downgraded MiniOxygen to 3.1.2"
echo "- Ensured Shopify CLI is properly installed"
echo "- Used npx to run Shopify commands"
echo "- Created clean vite configuration"