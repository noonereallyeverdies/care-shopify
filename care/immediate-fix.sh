#!/bin/bash

echo "🔧 IMMEDIATE FIX: Remove MiniOxygen from Vite Config"
echo "=================================================="

cd /Users/yvonne/Desktop/shopify/care-shopify/care

# Kill all processes
pkill -f "hydrogen\|mini-oxygen\|vite" || true

echo "The error occurs because MiniOxygen expects Vite 6.x but you have Vite 5.x"
echo "Solution: Remove MiniOxygen plugin from vite.config.ts"

# Create working vite config without MiniOxygen
cat > vite.config.ts << 'EOF'
import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {vitePlugin as remix} from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    hydrogen(),
    // Removed oxygen() plugin to fix the error
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
echo "✅ Fixed vite.config.ts - removed oxygen() plugin"
echo ""
echo "Now starting dev server..."
npm run dev
