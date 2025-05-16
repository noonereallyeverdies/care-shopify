#!/bin/bash

echo "🚀 ALTERNATIVE SOLUTION: Bypass MiniOxygen"
echo "========================================="

cd /Users/yvonne/Desktop/shopify/care-shopify/care

echo "Since MiniOxygen has a persistent JSON parsing bug, let's use Vite directly."

# Kill all processes
pkill -f "hydrogen\|mini-oxygen\|vite" || true

# Create a vite config that doesn't use the MiniOxygen plugin
cat > vite.config.no-oxygen.ts << 'EOF'
import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {vitePlugin as remix} from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    hydrogen(),
    // Removed oxygen() plugin to bypass MiniOxygen
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
    watch: {
      ignored: ['**/*.backup', '**/*optimized*']
    }
  }
});
EOF

# Backup original and use bypass config
cp vite.config.ts vite.config.original.ts
cp vite.config.no-oxygen.ts vite.config.ts

# Update package.json scripts to use vite directly
npm pkg set scripts.dev="vite dev"
npm pkg set scripts.build="vite build"

echo ""
echo "✅ BYPASSED MiniOxygen - Using Vite directly"
echo ""
echo "Starting development server with Vite..."
npm run dev

echo ""
echo "NOTE: This bypasses MiniOxygen entirely."
echo "You'll lose some Oxygen-specific features but gain a working dev server."
echo ""
echo "To restore original config:"
echo "1. cp vite.config.original.ts vite.config.ts"
echo "2. npm pkg set scripts.dev='shopify hydrogen dev --codegen'"
echo "3. npm pkg set scripts.build='shopify hydrogen build --codegen'"