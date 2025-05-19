// vite.custom.js
import { defineConfig } from 'vite';
import { hydrogen } from '@shopify/hydrogen/vite';
import { oxygen } from '@shopify/mini-oxygen/vite';
import { vitePlugin as remix } from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    // Node.js polyfills
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
    
    // Tailwind CSS
    tailwindcss(),
    
    // Hydrogen
    hydrogen(),
    
    // Mini Oxygen
    oxygen(),
    
    // Remix
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
    
    // TypeScript paths
    tsconfigPaths(),
  ],
  
  // Build configuration
  build: {
    assetsInlineLimit: 0,
  },
  
  // Server configuration
  server: {
    port: 4000,
    hmr: {
      timeout: 5000,
    },
  },
  
  // Define global variables
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'global': 'globalThis',
  },
  
  // Resolve configuration
  resolve: {
    // Ensure that node: prefixed imports are properly resolved
    conditions: ['node', 'import', 'module', 'browser'],
  },
  
  // SSR configuration
  ssr: {
    // Explicitly exclude Node.js built-in modules
    noExternal: ['@shopify/hydrogen', '@shopify/remix-oxygen'],
  },
});
