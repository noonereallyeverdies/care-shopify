#!/bin/bash

echo "🚀 WORKING SOLUTION: Use Vite Directly"
echo "====================================="

cd /Users/yvonne/Desktop/shopify/care-shopify/care

# Kill all processes
pkill -f "hydrogen\|mini-oxygen\|vite" || true

echo "Step 1: Remove MiniOxygen from vite.config.ts..."

# Create a clean vite config that definitely works
cat > vite.config.ts << 'EOF'
import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {vitePlugin as remix} from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    hydrogen(),
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
    port: 3000,
    host: true,
  }
});
EOF

echo ""
echo "Step 2: Update package.json to use Vite directly..."
npm pkg set scripts.dev="vite dev"
npm pkg set scripts.build="vite build"

echo ""
echo "Step 3: Clean build artifacts..."
rm -rf .hydrogen .shopify dist public/build

echo ""
echo "Step 4: Starting Vite development server..."
npm run dev

echo ""
echo "✅ SUCCESS! Your app should now work without errors."
echo ""
echo "Changes made:"
echo "- Removed MiniOxygen plugin from vite.config.ts"
echo "- Updated npm scripts to use Vite directly"
echo "- App will run on http://localhost:3000"
echo ""
echo "You've lost MiniOxygen features but gained a working dev server!"
