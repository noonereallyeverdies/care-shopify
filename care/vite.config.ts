import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import {vitePlugin as remix} from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';

declare module "@remix-run/server-runtime" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    oxygen(),
    remix({
      presets: [hydrogen.preset()],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_lazyRouteDiscovery: true,
        v3_singleFetch: true,
      },
    }),
    hydrogen(),
    tsconfigPaths(),
  ],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react-router-dom',
      '@shopify/hydrogen',
      '@remix-run/react',
      // Add polyfills for development
      'buffer',
      'process',
    ],
    exclude: [
      // Exclude problematic modules from optimization
      'fsevents',
    ],
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      // Polyfills for Node.js built-ins to fix SSR errors
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
  ssr: {
    noExternal: [
      // Ensure these are bundled for SSR
      'react-hook-form',
      'framer-motion',
      'lucide-react',
    ],
  },
});
