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
  ssr: {
    optimizeDeps: {
      include: [
        'lodash/some',
        'lodash/range',
        'lodash/first',
        'lodash/isBoolean',
        'lodash/isPlainObject',
        'lodash/minBy',
        'lodash/maxBy',
        'prop-types',
        'lodash/last',
        'lodash/isEqual',
        'lodash/flatMap',
        'lodash/min',
        'lodash/max',
        'lodash/throttle',
        'lodash/sortBy',
        'lodash/uniqBy',
        'lodash/upperFirst',
        'lodash/isNumber',
        'lodash/isNaN',
        'react-is',
        'lodash/isObject',
        'lodash/isFunction',
        'lodash/isString',
        'lodash/isNil',
        'lodash/get',
        'lodash',
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
  },
  build: {
    // Allow a strict Content-Security-Policy
    // withtout inlining assets as base64:
    assetsInlineLimit: 0,
  },
});
