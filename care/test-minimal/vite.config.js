import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {vitePlugin as remix} from '@remix-run/dev';

export default defineConfig(({ command, mode, isSsrBuild }) => {
  const isSSR = isSsrBuild;

  return {
    plugins: [
      hydrogen(),
      remix({
        presets: [hydrogen.preset()],
      }),
    ],
    resolve: {
      dedupe: ['react', 'react-dom'],
      // Only apply Node.js polyfills for client builds
      alias: !isSSR ? {
        stream: 'stream-browserify',
        crypto: 'crypto-browserify',
        buffer: 'buffer/',
        util: 'util/',
      } : {}
    },
    ssr: {
      target: 'node',
      // Only process specific packages
      noExternal: [
        /^@shopify\//,
        /^@remix-run\//,
      ],
      external: [
        // Both formats of Node.js built-ins
        /^node:.*/,
        'crypto',
        'stream',
        'util',
        'path',
        'http',
        'https',
        'fs',
        'os',
        'zlib',
        'events',
        'assert',
        'buffer',
        'querystring',
        'vm',
      ],
    },
    optimizeDeps: {
      include: isSSR ? [] : [
        'buffer',
        'stream-browserify',
        'crypto-browserify',
        'util',
      ],
    },
  };
});
