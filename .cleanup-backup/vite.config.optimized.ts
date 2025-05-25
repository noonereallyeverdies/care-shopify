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
    // Inline assets for better performance
    assetsInlineLimit: 4096,
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          hydrogen: ['@shopify/hydrogen'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          animations: ['framer-motion', '@motionone/dom'],
        },
      },
    },
  },
  optimizeDeps: {
    // Pre-bundle these dependencies for faster dev startup
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      '@shopify/hydrogen',
      '@remix-run/react',
      'graphql',
      'clsx',
      'framer-motion',
      'three',
      'lucide-react',
    ],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  ssr: {
    // Only externalize actual Node.js modules that should stay on server
    external: [
      /^node:/,
      '@remix-run/node',
    ],
    // Keep Hydrogen and Remix Oxygen bundled for SSR
    noExternal: [
      '@shopify/hydrogen',
      '@shopify/remix-oxygen',
      // Bundle UI libraries for SSR
      'lucide-react',
      'clsx',
      'tailwind-merge',
    ],
    optimizeDeps: {
      include: [
        'typographic-base',
        'use-sync-external-store/with-selector',
        '@headlessui/react',
        'react-intersection-observer',
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
