// node-polyfills-plugin.js
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Create more robust module implementations for Node.js built-ins
const createEmptyModule = (moduleName) => {
  // Base implementation for all modules
  let baseImplementation = `
// Polyfill for Node.js built-in: ${moduleName}
export default {};
`;

  // Add specific implementations based on module name
  switch (moduleName) {
    case 'events':
      return baseImplementation + `
export class EventEmitter {
  constructor() {
    this._events = {};
  }
  on() { return this; }
  once() { return this; }
  emit() { return true; }
  addListener() { return this; }
  removeListener() { return this; }
  removeAllListeners() { return this; }
  listenerCount() { return 0; }
}
export function once() { return () => {}; }
`;
    
    case 'stream':
      return baseImplementation + `
export class Stream { 
  pipe() { return this; }
}
export class Readable extends Stream {
  constructor() { super(); }
  _read() {}
  read() { return null; }
  push() { return true; }
}
export class Writable extends Stream {
  constructor() { super(); }
  _write() {}
  write() { return true; }
  end() {}
}
export class Duplex extends Readable {
  constructor() { super(); }
  _write() {}
  write() { return true; }
}
export class Transform extends Duplex {
  constructor() { super(); }
  _transform() {}
}
export class PassThrough extends Transform {
  constructor() { super(); }
}
`;
    
    case 'http':
    case 'https':
      return baseImplementation + `
export function createServer() { 
  return { 
    listen() { return this; },
    on() { return this; },
    close() {}
  }; 
}
export function request() {
  return {
    on() { return this; },
    write() { return true; },
    end() {}
  };
}
export function get() {
  return {
    on() { return this; },
    write() { return true; },
    end() {}
  };
}
`;
    
    case 'fs':
      return baseImplementation + `
export function readFileSync() { return ''; }
export function readFile() { return Promise.resolve(''); }
export function writeFileSync() { return true; }
export function writeFile() { return Promise.resolve(); }
export function statSync() { return { isFile: () => true, isDirectory: () => false }; }
export function stat() { return Promise.resolve({ isFile: () => true, isDirectory: () => false }); }
export function existsSync() { return false; }
export function createReadStream() { return { on() { return this; }, pipe() { return this; } }; }
export function createWriteStream() { return { on() { return this; }, write() {}, end() {} }; }
export const promises = {
  readFile() { return Promise.resolve(''); },
  writeFile() { return Promise.resolve(); },
  stat() { return Promise.resolve({ isFile: () => true, isDirectory: () => false }); }
};
`;
    
    case 'path':
      return baseImplementation + `
export function join(...args) { return args.join('/'); }
export function resolve(...args) { return args.join('/'); }
export function dirname(p) { return p.split('/').slice(0, -1).join('/') || '.'; }
export function basename(p, ext) { 
  const base = p.split('/').pop() || '';
  return ext && base.endsWith(ext) ? base.slice(0, -ext.length) : base; 
}
export function extname(p) { 
  const base = p.split('/').pop() || '';
  const i = base.lastIndexOf('.');
  return i < 0 ? '' : base.substr(i);
}
export const sep = '/';
export function normalize(p) { return p; }
export function isAbsolute(p) { return p.startsWith('/'); }
`;
    
    case 'crypto':
      return baseImplementation + `
export function createHash() { 
  return { 
    update() { return this; }, 
    digest() { return ''; } 
  }; 
}
export function randomBytes() { return Buffer.from([]); }
export function createHmac() { 
  return { 
    update() { return this; }, 
    digest() { return ''; } 
  }; 
}
`;
    
    case 'util':
      return baseImplementation + `
export function promisify(fn) { return (...args) => Promise.resolve(fn(...args)); }
export function inspect() { return ''; }
export function inherits(ctor, superCtor) {
  ctor.super_ = superCtor;
  Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
}
export function format() { return ''; }
export const types = {
  isDate: () => false,
  isRegExp: () => false,
  isArray: Array.isArray,
  isBoolean: (obj) => typeof obj === 'boolean',
  isNull: (obj) => obj === null,
  isNullOrUndefined: (obj) => obj == null,
  isNumber: (obj) => typeof obj === 'number',
  isString: (obj) => typeof obj === 'string',
  isSymbol: (obj) => typeof obj === 'symbol',
  isUndefined: (obj) => obj === undefined,
  isObject: (obj) => obj !== null && typeof obj === 'object',
  isFunction: (obj) => typeof obj === 'function',
  isPrimitive: (obj) => obj === null || ['undefined', 'boolean', 'number', 'string', 'symbol'].includes(typeof obj)
};
`;
    
    case 'url':
      return baseImplementation + `
export function parse(urlStr) { 
  try {
    const url = new URL(urlStr);
    return {
      protocol: url.protocol,
      hostname: url.hostname,
      port: url.port,
      pathname: url.pathname,
      search: url.search,
      hash: url.hash
    };
  } catch (e) {
    return {};
  }
}
export function resolve(from, to) { return to; }
export function format(urlObj) { return ''; }
export class URL {
  constructor(input) {
    this.href = input;
    this.protocol = 'https:';
    this.hostname = 'example.com';
    this.pathname = '/';
    this.search = '';
    this.hash = '';
  }
}
export class URLSearchParams {
  constructor() {
    this._params = new Map();
  }
  get() { return null; }
  set() {}
  has() { return false; }
  delete() {}
  append() {}
  forEach() {}
  entries() { return []; }
  keys() { return []; }
  values() { return []; }
  toString() { return ''; }
}
`;
    
    default:
      // Generic implementation for other modules
      return baseImplementation;
  }
};

// List of all Node.js built-ins we need to handle
const NODE_BUILTINS = [
  'events', 'url', 'path', 'http', 'https', 'querystring', 'net',
  'zlib', 'fs', 'async_hooks', 'stream', 'crypto', 'util', 'buffer',
  'assert', 'tty', 'os', 'constants', 'timers', 'string_decoder', 
  'punycode', 'readline', 'repl', 'child_process', 'worker_threads',
  'dns', 'dgram', 'perf_hooks', 'domain', 'console'
];

/**
 * Vite plugin to provide polyfills for Node.js built-in modules
 * @returns {import('vite').Plugin} Vite plugin with enforce: 'pre'
 */
export function nodePolyfillsPlugin() {
  /** @type {import('vite').Plugin} */
  const plugin = {
    name: 'vite-plugin-node-polyfills',
    enforce: 'pre',
    
    configResolved(config) {
      console.log('Node.js polyfills plugin active - using enhanced polyfills');
    },
    
    resolveId(id, importer) {
      // Handle Node.js built-ins
      if (NODE_BUILTINS.includes(id)) {
        console.log(`Providing polyfill for Node.js built-in: ${id}`);
        return `\0node-polyfill:${id}`;
      }
      
      // Handle node:xyz protocol imports
      if (id.startsWith('node:')) {
        const modName = id.slice(5);
        if (NODE_BUILTINS.includes(modName)) {
          console.log(`Providing polyfill for Node.js protocol import: ${id}`);
          return `\0node-polyfill:${modName}`;
        }
      }
      
      return null;
    },
    
    load(id) {
      if (id.startsWith('\0node-polyfill:')) {
        const moduleName = id.slice(15); // Remove '\0node-polyfill:' prefix
        return createEmptyModule(moduleName);
      }
      return null;
    }
  };
  
  return plugin;
} 