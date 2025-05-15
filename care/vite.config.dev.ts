import { defineConfig } from 'vite';
import { resolve } from 'path';

// This configuration helps resolve common Node.js built-in module issues in Shopify Hydrogen
export default defineConfig({
  resolve: {
    alias: {
      // Polyfills for Node.js built-ins
      path: 'path-browserify',
      fs: 'browserify-fs',
      process: 'process/browser',
      util: 'util/',
      assert: 'assert/',
      stream: 'stream-browserify',
      events: 'events/',
      url: 'url/',
      querystring: 'querystring-es3',
      crypto: 'crypto-browserify',
      buffer: 'buffer',
    },
  },
  define: {
    // Define globals
    global: 'globalThis',
    process: {
      env: {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    },
  },
  optimizeDeps: {
    include: [
      // Include common polyfills
      'buffer',
      'process',
    ],
    exclude: [
      // Exclude problematic modules from optimization
      'fsevents',
    ],
  },
  ssr: {
    noExternal: [
      // Ensure these are bundled for SSR
      'react-hook-form',
      'framer-motion',
      'lucide-react',
    ],
    // Don't externalize Node.js built-ins in SSR
    target: 'node',
  },
  build: {
    rollupOptions: {
      external: [
        // Keep Node.js built-ins external only in server builds
        'fs',
        'path',
        'crypto',
        'stream',
        'util',
        'events',
        'buffer',
        'querystring',
        'url',
      ],
    },
  },
});
