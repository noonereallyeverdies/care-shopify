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

// List of Node.js built-in modules to externalize
const nodeBuiltins = [
  // Node.js modules with node: prefix
  /^node:/,
  
  // Regular Node.js modules
  'fs', 'path', 'crypto', 'stream', 'url', 'util', 'events', 'http', 'https',
  'assert', 'buffer', 'querystring', 'os', 'net', 'zlib', 'tls', 'vm',
  'async_hooks', 'worker_threads', 'diagnostics_channel', 'perf_hooks',
  'tty', 'dns', 'http2', 'console', 'fs/promises', 'child_process'
];

// Packages known to cause issues
const problemPackages = [
  '@remix-run/node',  // Critical to externalize 
  'undici'
];

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
  ssr: {
    // Critical for MiniOxygen compatibility - externalize problematic modules
    external: [...nodeBuiltins, ...problemPackages],
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
      timeout: 10000,
    },
    fs: {
      strict: false,
    },
    watch: {
      usePolling: true,
    },
  },
});
