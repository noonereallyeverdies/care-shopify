#!/bin/bash

# Script to modify the node_modules directory to remove node: prefixes
# This is a more direct approach to fix the Node.js module resolution issues

# Change to the project directory
cd "$(dirname "$0")"

# Set text colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Initialize counters and arrays
TOTAL_FILES=0
MODIFIED_FILES=0
MODIFIED_FILE_LIST=()

echo -e "${BLUE}Starting node: prefix removal process...${NC}"

# Function to replace node: prefixes in require statements
fix_node_prefixes() {
  local file=$1
  local original_content=$(cat "$file")
  local new_content=""
  
  # Replace node: prefixes in require statements
  new_content=$(sed -E "s/require\\('node:([^']+)'\\)/require('\\1')/g" "$file")
  
  # Replace node: prefixes in import statements
  new_content=$(echo "$new_content" | sed -E "s/from 'node:([^']+)'/from '\\1'/g")
  new_content=$(echo "$new_content" | sed -E 's/from "node:([^"]+)"/from "\\1"/g')
  
  # Check if the content was modified
  if [ "$original_content" != "$new_content" ]; then
    echo "$new_content" > "$file"
    MODIFIED_FILES=$((MODIFIED_FILES + 1))
    MODIFIED_FILE_LIST+=("$file")
    echo -e "${GREEN}Fixed${NC}: $file"
  fi
  
  TOTAL_FILES=$((TOTAL_FILES + 1))
}

# Process JavaScript and TypeScript files
echo -e "${BLUE}Scanning node_modules for node: prefixes...${NC}"
find ./node_modules -type f \( -name "*.js" -o -name "*.ts" -o -name "*.mjs" \) -print0 | while IFS= read -r -d '' file; do
  # Check if the file contains node: prefix
  if grep -q "node:" "$file"; then
    fix_node_prefixes "$file"
  else
    TOTAL_FILES=$((TOTAL_FILES + 1))
  fi
done

echo -e "${BLUE}Creating a custom vite configuration...${NC}"

# Create a modified vite.config.ts that works with node module resolution
cat > vite.config.fixed.ts << 'EOL'
import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import {vitePlugin as remix} from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

declare module '@remix-run/server-runtime' {
  interface Future {
    v3_singleFetch: true;
  }
}

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
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  build: {
    assetsInlineLimit: 0,
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

# Create a script to run with the fixed configuration
cat > start-fixed.sh << 'EOL'
#!/bin/bash
cd "$(dirname "$0")"

# Set higher memory limit for Node.js
export NODE_OPTIONS="--max-old-space-size=4096"

# Use the fixed configuration
cp vite.config.fixed.ts vite.config.ts

# Clean any temporary directories
rm -rf ./.cache
rm -rf ./node_modules/.vite

# Kill any existing Hydrogen processes
pkill -f "shopify hydrogen" || true
sleep 1

# Start Hydrogen
echo "Starting Hydrogen app with fixed configuration on port 4000..."
npx shopify hydrogen dev --port 4000
EOL

chmod +x start-fixed.sh

echo -e "${BLUE}Summary:${NC}"
echo -e "Total files scanned: ${TOTAL_FILES}"
echo -e "Modified files: ${MODIFIED_FILES}"

if [ ${#MODIFIED_FILE_LIST[@]} -gt 0 ]; then
  echo -e "${YELLOW}Top modified files:${NC}"
  for file in "${MODIFIED_FILE_LIST[@]:0:5}"; do
    echo "  - $file"
  done
  
  if [ ${#MODIFIED_FILE_LIST[@]} -gt 5 ]; then
    echo -e "  ...and ${#MODIFIED_FILE_LIST[@]-5} more"
  fi
fi

echo -e "${GREEN}Fix completed!${NC}"
echo -e "Run ${YELLOW}./start-fixed.sh${NC} to start the application"
