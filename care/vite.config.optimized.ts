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
    }),
    tsconfigPaths(),
  ],
  // Force Vite to use a single instance of React/ReactDOM
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      // Optimize lodash imports
      'lodash': 'lodash-es',
      // Direct path for performance
      '~': __dirname + '/app',
    },
  },
  ssr: {
    optimizeDeps: {
      include: [
        'use-sync-external-store/shim/with-selector.js',
        'lodash-es/some',
        'lodash-es/range', 
        'lodash-es/first',
        'lodash-es/isBoolean',
        'lodash-es/isPlainObject',
        'lodash-es/minBy',
        'lodash-es/maxBy',
        'prop-types',
        'lodash-es/last',
        'lodash-es/isEqual',
        'lodash-es/flatMap',
        'lodash-es/min',
        'lodash-es/max',
        'lodash-es/throttle',
        'lodash-es/sortBy',
        'lodash-es/uniqBy',
        'lodash-es/upperFirst',
        'lodash-es/isNumber',
        'lodash-es/isNaN',
        'react-is',
        'lodash-es/isObject',
        'lodash-es/isFunction',
        'lodash-es/isString',
        'lodash-es/isNil',
        'lodash-es/get',
        'typographic-base',
      ],
    },
  },
  optimizeDeps: {
    include: [
      'clsx',
      '@headlessui/react',
      'typographic-base',
      'react-intersection-observer',
      'react-use/esm/useScroll',
      'react-use/esm/useDebounce',
      'react-use/esm/useWindowScroll',
    ],
    // Exclude heavy dependencies that should be loaded dynamically
    exclude: [
      'framer-motion',
      '@react-three/fiber',
      '@react-three/drei', 
      'three',
    ],
  },
  build: {
    // Allow a strict Content-Security-Policy
    assetsInlineLimit: 0,
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'vendor-react': ['react', 'react-dom'],
          'vendor-hydrogen': ['@shopify/hydrogen', '@shopify/remix-oxygen'],
          'vendor-motion': ['framer-motion'],
          'vendor-3d': ['@react-three/fiber', '@react-three/drei', 'three'],
          // Feature chunks
          'landing-page': [
            './app/components/sections/Hero',
            './app/components/sections/ProblemSolutionSection',
            './app/components/sections/SelfCareRitualSection',
            './app/components/sections/ResultsTimeline',
            './app/components/sections/ProductHighlight',
            './app/components/sections/SocialProofBanner',
          ],
          // Heavy interactive components
          'interactive': [
            './app/components/sections/BeforeAfterSliderSection',
            './app/components/sections/HairLossVisualization', 
            './app/components/sections/InteractiveScienceSection',
          ],
        },
      },
    },
    // Enable compression
    minify: 'esbuild',
    cssMinify: true,
    // Reduce bundle size
    target: 'esnext',
    sourcemap: process.env.NODE_ENV === 'development',
  },
  // CSS optimization
  css: {
    preprocessorOptions: {
      scss: {
        // Enable tree shaking for unused CSS
        // This will be helpful if you convert to SCSS later
      },
    },
  },
  // Development optimizations
  server: {
    warmup: {
      clientFiles: [
        './app/routes/($locale)._index.tsx',
        './app/components/sections/Hero.tsx',
        './app/lib/utils.ts',
      ],
    },
  },
});
