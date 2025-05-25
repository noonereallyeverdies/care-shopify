#!/bin/bash

# This script installs the required dependencies and sets up a working configuration
# for Hydrogen with proper Node.js polyfills

# Change to the project directory
cd "$(dirname "$0")"

# Make sure we have the latest vite-plugin-node-polyfills
echo "Installing latest Node.js polyfills..."
npm install --save-dev vite-plugin-node-polyfills@latest

# Create a backup of the current config
echo "Creating backup of current vite.config.ts..."
cp vite.config.ts vite.config.ts.backup

# Create a simpler vite.config.ts that should work
echo "Creating simplified vite.config.ts with node polyfills..."
cat > vite.config.ts << 'EOL'
import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import {vitePlugin as remix} from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

declare module '@remix-run/server-runtime' {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    // Node.js polyfills must come first
    nodePolyfills({
      // To exclude specific polyfills, add them to this list
      exclude: [],
      // Whether to polyfill specific globals
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      // Whether to polyfill specific modules
      protocolImports: true,
    }),
    
    // Standard Hydrogen plugins
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
  
  // Global definitions
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  
  // Server configuration
  server: {
    port: 4000,
    hmr: {
      timeout: 5000,
    },
  },
  
  // SSR configuration
  ssr: {
    optimizeDeps: {
      include: [
        'typographic-base',
        'use-sync-external-store/with-selector',
        '@headlessui/react',
      ],
    },
    noExternal: ['@shopify/hydrogen', '@shopify/remix-oxygen'],
  },
});
EOL

# Create a simple runner script
echo "Creating simple runner script..."
cat > run-hydrogen.sh << 'EOL'
#!/bin/bash
cd "$(dirname "$0")"

# Set higher memory limit for Node.js
export NODE_OPTIONS="--max-old-space-size=4096"

# Clean any temporary directories
rm -rf ./.cache
rm -rf ./node_modules/.vite

# Kill any existing Hydrogen processes
pkill -f "shopify hydrogen" || true
sleep 1

# Start Hydrogen
echo "Starting Hydrogen app on port 4000..."
npx shopify hydrogen dev --port 4000
EOL

# Make the script executable
chmod +x run-hydrogen.sh

# Remove custom server and related scripts
echo "Removing custom server..."
rm -f server.js
rm -f customserver.js

# Update package.json to remove custom server scripts
node -e '
const fs = require("fs");
const path = require("path");
const packageJsonPath = path.join(process.cwd(), "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

// Remove any scripts related to custom server
delete packageJson.scripts["custom-server"];
delete packageJson.scripts["server"];

// Update script definitions
packageJson.scripts["dev-fixed"] = "NODE_OPTIONS=\"--max-old-space-size=4096\" shopify hydrogen dev --port 4000";
packageJson.scripts["dev-debug"] = "NODE_OPTIONS=\"--max-old-space-size=4096\" DEBUG=hydrogen shopify hydrogen dev --port 4000";

// Save the updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
'

echo "Finished setting up Hydrogen with Node.js polyfills."
echo "You can now run the app with './run-hydrogen.sh'"
