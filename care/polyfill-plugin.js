// polyfill-plugin.js
// Minimal Vite plugin for essential Node.js polyfills only

const nodeBuiltins = {
  // Essential polyfills - only include what's actually needed
  'process': 'process/browser', // Used for process.env
  'path': 'path-browserify',    // Commonly used by bundlers/tools
  'util': 'util',               // Often used by dependencies
  
  // All others disabled - not needed for typical Shopify/React apps
  'assert': false,
  'buffer': false,
  'crypto': false,
  'events': false,
  'https': false,
  'http': false,
  'os': false,
  'stream': false,
  'url': false,
  'fs': false,
  'net': false,
  'tls': false,
  'dns': false,
  'domain': false,
  'zlib': false,
  'querystring': false,
  'punycode': false,
  'console': false,
  'constants': false,
  'timers': false,
  'tty': false,
  'vm': false,
  'string_decoder': false
};

export default function nodePolyfillPlugin() {
  return {
    name: 'minimal-node-polyfill',
    config(config) {
      // Ensure resolve.alias exists
      config.resolve = config.resolve || {};
      config.resolve.alias = config.resolve.alias || {};
      
      // Add only essential polyfills as aliases
      Object.entries(nodeBuiltins).forEach(([nodeBuiltin, polyfill]) => {
        if (polyfill && polyfill !== false) {
          config.resolve.alias[nodeBuiltin] = polyfill;
        }
      });
      
      // Minimal global definition - only what's actually needed
      config.define = config.define || {};
      config.define.global = 'globalThis';
      config.define.process = JSON.stringify({
        env: {}, // Empty env object for browser
        browser: true,
        version: '',
        versions: { node: '18.0.0' }
      });
    },
    resolveId(id) {
      // Handle Node.js built-ins that shouldn't be polyfilled
      if (nodeBuiltins[id] === false) {
        return {
          id: id,
          external: false
        };
      }
      return null;
    },
    load(id) {
      // Provide empty modules for disabled built-ins
      if (nodeBuiltins[id] === false) {
        return 'export default {}; export const constants = {}; export * from {};';
      }
      return null;
    }
  };
}
