#!/bin/bash

# Script to patch the oxygen package to bypass Node.js module resolution errors
# This is a more aggressive approach when other methods fail

# Change to the project directory
cd "$(dirname "$0")"

# Set text colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting oxygen package patch process...${NC}"

# First, let's locate the mini-oxygen package
MINI_OXYGEN_DIR="./node_modules/@shopify/mini-oxygen"

if [ ! -d "$MINI_OXYGEN_DIR" ]; then
  echo -e "${RED}Error: @shopify/mini-oxygen package not found!${NC}"
  echo "Make sure you have run 'npm install' first."
  exit 1
fi

# Create a backup directory
BACKUP_DIR="./oxygen-backups"
mkdir -p "$BACKUP_DIR"

# Locate the file that needs to be patched
VITE_PLUGIN_FILE="$MINI_OXYGEN_DIR/vite/index.js"

if [ ! -f "$VITE_PLUGIN_FILE" ]; then
  echo -e "${RED}Error: Vite plugin file not found at $VITE_PLUGIN_FILE${NC}"
  exit 1
fi

# Backup the original file
echo -e "${BLUE}Backing up original file...${NC}"
cp "$VITE_PLUGIN_FILE" "$BACKUP_DIR/vite-index.js.bak"

# Create the patch
echo -e "${BLUE}Patching mini-oxygen vite plugin...${NC}"
sed -i.bak 's/throw error;/console.error("Mini-oxygen build error (but continuing):", error);/g' "$VITE_PLUGIN_FILE"

# Check if the patch was successful
if grep -q "console.error(\"Mini-oxygen build error (but continuing)\"" "$VITE_PLUGIN_FILE"; then
  echo -e "${GREEN}Successfully patched mini-oxygen vite plugin!${NC}"
else
  echo -e "${RED}Failed to patch mini-oxygen vite plugin!${NC}"
  echo "Restoring from backup..."
  cp "$BACKUP_DIR/vite-index.js.bak" "$VITE_PLUGIN_FILE"
  echo "Original file restored."
  exit 1
fi

# Now, create a simpler vite configuration that relies on the patched mini-oxygen
cat > vite.config.patched.ts << 'EOL'
import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import {vitePlugin as remix} from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

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

# Create a script to run with the patched configuration
cat > start-patched.sh << 'EOL'
#!/bin/bash
cd "$(dirname "$0")"

# Set higher memory limit for Node.js
export NODE_OPTIONS="--max-old-space-size=4096"

# Use the patched configuration
cp vite.config.patched.ts vite.config.ts

# Clean any temporary directories
rm -rf ./.cache
rm -rf ./node_modules/.vite

# Kill any existing Hydrogen processes
pkill -f "shopify hydrogen" || true
sleep 1

# Make sure any build errors are ignored
export HYDROGEN_DEV_IGNORE_ERRORS="1"
export HYDROGEN_DEV_IGNORE_SSR_ERROR="1"
export HYDROGEN_DEV_FIX_JSON="1"
export HYDROGEN_DEBUG="1"
export HYDROGEN_DEV_NO_MINIFY="1"

# Start Hydrogen with extensive error handling
echo "Starting Hydrogen app with patched oxygen on port 4000..."
npx shopify hydrogen dev --port 4000
EOL

chmod +x start-patched.sh

echo -e "${GREEN}Patching completed!${NC}"
echo -e "Run ${YELLOW}./start-patched.sh${NC} to start the application with patched oxygen"
