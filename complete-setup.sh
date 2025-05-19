#!/bin/bash

# Simple but effective script to fix Node.js module issues in Hydrogen

# Change to the project directory
cd "$(dirname "$0")"

# Set text colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Setting up simplified Vite configuration...${NC}"

# Create a backup of the current vite.config.ts
cp vite.config.ts vite.config.ts.bak.$(date +%Y%m%d%H%M%S)

# Create a simplified Vite configuration that focuses solely on running the app
cat > vite.config.ts << 'EOL'
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
  ssr: {
    // The key fix: Handle all node: prefixes by ignoring them in SSR
    // They'll be handled by Node.js automatically
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
  server: {
    port: 4000,
    hmr: {
      timeout: 5000,
    },
  },
});
EOL

# Create clean .env to ensure all required environment variables are set
cat > .env << 'EOL'
SESSION_SECRET=development_session_secret
NODE_ENV=development
HYDROGEN_DEBUG=1
HYDROGEN_DEV_FIX_JSON=1
SHOPIFY_FLAG_STOREFRONT_RENDERER=1
EOL

# Update package.json to add a development script with higher memory limit
node -e '
const fs = require("fs");
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

// Update scripts
packageJson.scripts["dev"] = "NODE_OPTIONS=\"--max-old-space-size=4096\" shopify hydrogen dev --codegen";
packageJson.scripts["dev-port"] = "NODE_OPTIONS=\"--max-old-space-size=4096\" shopify hydrogen dev --port 4000 --codegen";
packageJson.scripts["clean-start"] = "./clean-start.sh";

// Write updated package.json
fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));
'

# Create clean start script
cat > clean-start.sh << 'EOL'
#!/bin/bash
cd "$(dirname "$0")"

# Clean cache directories
rm -rf ./.cache
rm -rf ./node_modules/.vite

# Kill any running Hydrogen processes
pkill -f "shopify hydrogen" || true
sleep 1

# Set higher memory limit
export NODE_OPTIONS="--max-old-space-size=4096"

# Run with debug mode enabled
export HYDROGEN_DEBUG=1
export HYDROGEN_DEV_FIX_JSON=1

# Start the app
echo "Starting Hydrogen app with clean environment..."
npx shopify hydrogen dev --port 4000
EOL

chmod +x clean-start.sh

# Complete remaining migration tasks
echo -e "${BLUE}Completing remaining migration tasks...${NC}"

# Create placeholders directory
mkdir -p public/images/placeholders

# Create timeline directory and move timeline images if they exist
mkdir -p public/images/timeline
if [ -d "../theapp/public/images/timeline" ]; then
  cp -r ../theapp/public/images/timeline/* public/images/timeline/
fi

# Update HeroSection import in _index.tsx if necessary
if [ -f "app/routes/(\$locale)/_index.tsx" ]; then
  # Check if the file needs to be updated
  if grep -q "import { HeroSection } from '~/components/HeroSection';" "app/routes/(\$locale)/_index.tsx"; then
    # Update the import path
    sed -i.bak 's|import { HeroSection } from '\''~/components/HeroSection'\''|import { HeroSection } from '\''~/components/containers/HeroSection'\''|g' "app/routes/(\$locale)/_index.tsx"
    echo "Updated HeroSection import path in _index.tsx"
  fi
fi

echo -e "${GREEN}Setup complete!${NC}"
echo -e "Run ${BLUE}./clean-start.sh${NC} to start the application"
