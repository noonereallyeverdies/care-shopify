// browser-env.js - ES Module version
import { Buffer } from 'buffer';

// Set up global Buffer
globalThis.Buffer = Buffer;

// Set up process for browser environment
globalThis.process = globalThis.process || {
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

// Set up global reference
if (typeof globalThis.global === 'undefined') {
  globalThis.global = globalThis;
}

// Ensure critical Node.js APIs are available
// These are needed by various Node.js modules
globalThis.setImmediate = globalThis.setImmediate || ((fn, ...args) => setTimeout(() => fn(...args), 0));
globalThis.clearImmediate = globalThis.clearImmediate || clearTimeout;

// Ensure the URL constructor is available
globalThis.URL = globalThis.URL || URL;
