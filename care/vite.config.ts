import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import {vitePlugin as remix} from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    hydrogen(),
    oxygen(),
    remix({
      presets: [hydrogen.preset()],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_lazyRouteDiscovery: true,
      },
      ignoredRouteFiles: ['**/.*', '**/*.backup', '**/*optimized*'],
    }),
    tsconfigPaths(),
  ],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  ssr: {
    optimizeDeps: {
      include: [
        'use-sync-external-store/shim/with-selector.js',
        'react',
        'react-dom',
      ],
    },
  },
  build: {
    assetsInlineLimit: 0,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime'],
  },
  server: {
    watch: {
      ignored: ['**/*.backup', '**/*optimized*']
    }
  }
});
