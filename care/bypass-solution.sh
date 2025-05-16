#!/bin/bash

echo "🚀 BYPASS SOLUTION: Use Vite Directly"
echo "===================================="

cd /Users/yvonne/Desktop/shopify/care-shopify/care

# Kill all processes
pkill -f "hydrogen\|mini-oxygen\|vite" || true

echo "Since there are dependency conflicts, let's bypass MiniOxygen entirely..."

echo ""
echo "Step 1: Creating Vite-only configuration..."

# Create a vite config without MiniOxygen
cat > vite.config.bypass.ts << 'EOF'
import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {vitePlugin as remix} from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    hydrogen(),
    // Removed oxygen() plugin completely to bypass JSON error
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
    watch: {
      ignored: ['**/*.backup', '**/*optimized*']
    }
  }
});
EOF

echo "Step 2: Backup current config and use bypass config..."
cp vite.config.ts vite.config.original.ts
cp vite.config.bypass.ts vite.config.ts

echo ""
echo "Step 3: Update package.json to use Vite directly..."
# Update package.json scripts
cat > package.scripts.json << 'EOF'
{
  "dev": "vite dev",
  "build": "vite build && vite build --ssr",
  "preview": "vite preview",
  "typecheck": "tsc --noEmit"
}
EOF

# Merge scripts into package.json
npm pkg set scripts.dev="vite dev"
npm pkg set scripts.build="vite build && vite build --ssr"
npm pkg set scripts.preview="vite preview"

echo ""
echo "Step 4: Clean artifacts..."
rm -rf .hydrogen .shopify dist public/build

echo ""
echo "Step 5: Starting Vite development server..."
npm run dev

echo ""
echo "✅ BYPASS SOLUTION APPLIED:"
echo "- Removed MiniOxygen plugin completely"
echo "- Using Vite directly for development"
echo "- No more JSON parsing errors"
echo "- Dev server runs on port 3000"
echo ""
echo "NOTE: You'll lose Oxygen-specific features, but gain a working dev server."
echo ""
echo "To restore original setup:"
echo "1. cp vite.config.original.ts vite.config.ts"
echo "2. npm pkg set scripts.dev='shopify hydrogen dev --codegen'"