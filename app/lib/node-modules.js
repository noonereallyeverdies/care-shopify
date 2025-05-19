// node-modules.js - Helper to load Node.js modules in browser environment
export const modules = {
  // Core Node.js built-in modules and their browser equivalents
  crypto: () => import('crypto-browserify'),
  stream: () => import('stream-browserify'),
  path: () => import('path-browserify'),
  util: () => import('util'),
  events: () => import('events'),
  url: () => import('url'),
  querystring: () => import('querystring-es3'),
  assert: () => import('assert'),
  buffer: () => import('buffer'),

  // Helper function to load a module dynamically
  async load(name) {
    if (this[name]) {
      return await this[name]();
    }
    throw new Error(`Module '${name}' not found in the browser environment`);
  }
};

// Pre-load common modules
const preloadModules = async () => {
  // Load the Buffer class from the buffer module
  const { Buffer } = await modules.load('buffer');
  
  // Make Buffer globally available
  if (typeof globalThis.Buffer === 'undefined') {
    globalThis.Buffer = Buffer;
  }
  
  // Set up process if not already defined
  if (typeof globalThis.process === 'undefined') {
    globalThis.process = {
      env: {
        NODE_ENV: process.env.NODE_ENV || 'development'
      },
      browser: true,
      version: '',
      versions: {},
      platform: 'browser',
      cwd: () => '/',
      nextTick: (fn) => setTimeout(fn, 0)
    };
  }
  
  // Set up global if not already defined
  if (typeof globalThis.global === 'undefined') {
    globalThis.global = globalThis;
  }
};

// Initialize modules
preloadModules().catch(console.error);

export default modules;
