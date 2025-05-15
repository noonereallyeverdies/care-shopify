# Final Fixes Applied

## Summary of Changes

### 1. **Vite Configuration (vite.config.ts)**
- Updated to properly handle Node.js built-ins as external dependencies
- Added explicit handling for Express to prevent it from being bundled
- Configured both `ssr.external` and `environments.ssr.external` for comprehensive coverage

### 2. **Package Dependencies**
- Moved `express` from `dependencies` to `devDependencies`
- This prevents Vite from trying to bundle Express for SSR
- Express is now only used for the standalone server (server.js)

### 3. **Key Issue Identified**
The root cause was that Express was listed as a main dependency, which caused Vite to try to bundle it for SSR. Since Express contains references to Node.js built-ins, this caused the "Cannot read file" errors.

## Changes Made:

### vite.config.ts:
```typescript
import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import {vitePlugin as remix} from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';
import shopifyConfig from './shopify.config';

export default defineConfig({
  plugins: [
    hydrogen(shopifyConfig),
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
    // Don't try to bundle these packages
    noExternal: [],
    external: [
      'express',
      // Node.js built-ins that should be external
      'fs', 'path', 'url', 'http', 'https', 'net', 'stream', 'crypto', 'zlib', 'querystring', 'async_hooks'
    ],
  },
  environments: {
    ssr: {
      external: [
        'express',
        // All Node.js built-ins
        'assert', 'async_hooks', 'buffer', 'child_process', 'cluster', 'console',
        'constants', 'crypto', 'dgram', 'diagnostics_channel', 'dns', 'domain',
        'events', 'fs', 'http', 'http2', 'https', 'module', 'net', 'os',
        'path', 'perf_hooks', 'punycode', 'querystring', 'readline', 'repl',
        'stream', 'string_decoder', 'sys', 'timers', 'tls', 'tty', 'url',
        'util', 'vm', 'worker_threads', 'zlib',
        // Node.js built-ins with subpaths
        'fs/promises', 'util/types',
        // Node protocol imports
        /^node:/,
      ],
    },
  },
});
```

### package.json changes:
- Moved `express` from `dependencies` to `devDependencies`

## Expected Results:
After these changes, `npm run dev` should work without the Node.js module resolution errors.

## Next Steps:
1. Wait for `npm install` to complete
2. Run `npm run dev` to test the changes
3. If successful, test Playwright with the development server

## Note:
The `server.js` file is a standalone Express server that can be run separately for testing purposes. It's not part of the main Hydrogen application flow.
