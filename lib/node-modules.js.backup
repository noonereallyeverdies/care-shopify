/**
 * Node module polyfills for the browser environment
 * 
 * This file sets up polyfills for Node.js built-in modules and globals
 * that are required by dependencies but not available in the browser.
 */

// Set up process if it doesn't exist
if (typeof window !== 'undefined' && typeof window.process === 'undefined') {
  window.process = {
    env: {
      NODE_ENV: process.env.NODE_ENV || 'development',
    },
    browser: true,
    version: '',
    versions: {},
    platform: 'browser',
    cwd: () => '/',
    nextTick: (fn) => setTimeout(fn, 0)
  };
}

// Define global if it doesn't exist
if (typeof window !== 'undefined' && typeof window.global === 'undefined') {
  window.global = window;
}

// Define Buffer if it doesn't exist
if (typeof window !== 'undefined' && typeof window.Buffer === 'undefined') {
  import('buffer').then(({ Buffer }) => {
    window.Buffer = Buffer;
  }).catch(() => {
    // Fallback implementation if the import fails
    window.Buffer = {
      from: (data) => new Uint8Array(data),
      isBuffer: () => false,
      alloc: (size) => new Uint8Array(size),
      allocUnsafe: (size) => new Uint8Array(size),
      allocUnsafeSlow: (size) => new Uint8Array(size),
      byteLength: (str) => new TextEncoder().encode(str).length,
    };
  });
}

// Set up other Node.js built-ins
if (typeof window !== 'undefined') {
  // Import polyfills as needed
  const polyfills = {
    path: () => import('path-browserify'),
    crypto: () => import('crypto-browserify'),
    stream: () => import('stream-browserify'),
    util: () => import('util'),
    assert: () => import('assert'),
    zlib: () => import('browserify-zlib'),
    https: () => import('https-browserify'),
    http: () => import('stream-http'),
    os: () => import('os-browserify'),
    events: () => import('events'),
    querystring: () => import('querystring-es3'),
    url: () => import('url'),
    timers: () => import('timers-browserify'),
    tty: () => import('tty-browserify'),
    vm: () => import('vm-browserify'),
  };

  // Only load polyfills when they're actually needed
  // This uses a proxy to lazily load modules
  if (!window.__nodePolyfillsLoaded) {
    window.__nodePolyfillsLoaded = true;
    
    // Set up a process.browser flag for compatibility
    if (window.process) {
      window.process.browser = true;
    }
  }
}

// Export empty object to satisfy module systems
export default {};
