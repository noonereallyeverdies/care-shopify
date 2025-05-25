#!/bin/bash

# This script installs all missing Node.js module polyfills
# and configures the application to use them

# Change to the project directory
cd "$(dirname "$0")"

# Set text colors for better output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Installing Node.js module polyfills...${NC}"

# Install all the polyfills we need
npm install --save-dev \
  buffer \
  crypto-browserify \
  events \
  path-browserify \
  stream-browserify \
  querystring-es3 \
  util \
  assert \
  url \
  os-browserify \
  https-browserify \
  http-browserify \
  vm-browserify \
  dns.js \
  browser-process \
  browser-fs-access \
  constants-browserify \
  diagnostics_channel \
  browserify-fs \
  perf_hooks \
  worker_threads \
  console-browserify \
  zlib-browserify \
  tls-browserify \
  browserify-zlib

echo -e "${GREEN}Polyfills installed successfully${NC}"

echo -e "${BLUE}Creating optimized vite configuration...${NC}"

# Create a simplified vite configuration
cat > vite.config.optimized.ts << 'EOL'
import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import {vitePlugin as remix} from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

declare module '@remix-run/server-runtime' {
  interface Future {
    v3_singleFetch: true;
  }
}

// Simple approach: ignore all node: prefixed imports
// These will be handled by Node.js on the server side
export default defineConfig({
  plugins: [
    tailwindcss(),
    hydrogen(),
    oxygen(),
    remix({
      presets: [hydrogen.v3preset()],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_lazyRouteDiscovery: true,
        v3_routeConfig: true,
        v3_singleFetch: true,
      },
    }),
    tsconfigPaths(),
  ],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      // Just externalize everything with node: prefix
      external: [/^node:/]
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    port: 4000,
    hmr: {
      timeout: 5000,
    },
  },
  ssr: {
    // Externalize all node: imports
    external: [/^node:/, '@remix-run/node', 'undici'],
    noExternal: ['@shopify/hydrogen', '@shopify/remix-oxygen'],
    optimizeDeps: {
      include: [
        'typographic-base',
        'use-sync-external-store/with-selector',
        '@headlessui/react',
      ],
    },
  },
});
EOL

# Create a script to run with the optimized configuration
cat > start-optimized.sh << 'EOL'
#!/bin/bash
cd "$(dirname "$0")"

# Set higher memory limit for Node.js
export NODE_OPTIONS="--max-old-space-size=4096"

# Use the optimized configuration
cp vite.config.optimized.ts vite.config.ts

# Clean any temporary directories
rm -rf ./.cache
rm -rf ./node_modules/.vite

# Kill any existing Hydrogen processes
pkill -f "shopify hydrogen" || true
sleep 1

# Start Hydrogen
echo "Starting Hydrogen app with optimized configuration on port 4000..."
npx shopify hydrogen dev --port 4000
EOL

chmod +x start-optimized.sh

echo -e "${GREEN}Setup completed!${NC}"
echo -e "Run ${BLUE}./start-optimized.sh${NC} to start the application with optimized settings"
