/**
 * Custom Node.js module resolver
 * This file helps resolve Node.js built-in modules for the browser
 */
export function resolveNodeModules() {
  const nodeModules = {
    crypto: () => import('crypto-browserify'),
    stream: () => import('stream-browserify'),
    path: () => import('path-browserify'),
    fs: () => ({ default: {} }),
    os: () => ({ default: {} }),
    util: () => import('util'),
    buffer: () => import('buffer'),
    events: () => import('events'),
    http: () => ({ default: {} }),
    https: () => ({ default: {} }),
    url: () => import('url'),
    querystring: () => import('querystring-es3'),
    assert: () => import('assert'),
    zlib: () => ({ default: {} }),
    'node:crypto': () => import('crypto-browserify'),
    'node:stream': () => import('stream-browserify'),
    'node:path': () => import('path-browserify'),
    'node:fs': () => ({ default: {} }),
    'node:buffer': () => import('buffer'),
    'node:util': () => import('util'),
    'node:events': () => import('events'),
    'node:url': () => import('url'),
    'node:http': () => ({ default: {} }),
    'node:https': () => ({ default: {} }),
    'node:os': () => ({ default: {} }),
    'node:fs/promises': () => ({ default: {} }),
    'node:assert': () => import('assert'),
    'node:zlib': () => ({ default: {} }),
    'node:querystring': () => import('querystring-es3'),
    'node:async_hooks': () => ({ default: {} }),
    'node:console': () => ({ default: { Console: console.Console } }),
    'node:diagnostics_channel': () => ({ default: {} }),
    'node:dns': () => ({ default: {} }),
    'node:http2': () => ({ default: {} }),
    'node:net': () => ({ default: {} }),
    'node:perf_hooks': () => ({ default: {} }),
    'node:tls': () => ({ default: {} }),
    'node:util/types': () => ({ default: {} }),
    'node:worker_threads': () => ({ default: {} }),
  };

  return nodeModules;
} 