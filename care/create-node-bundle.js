/**
 * This script creates a bundled version of all Node.js built-in modules
 * to simplify their resolution in the build process.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Node.js built-in modules to bundle
const NODE_BUILTINS = [
  'assert', 'async_hooks', 'buffer', 'child_process', 'cluster', 'console',
  'constants', 'crypto', 'dgram', 'diagnostics_channel', 'dns', 'domain',
  'events', 'fs', 'http', 'http2', 'https', 'module', 'net', 'os',
  'path', 'perf_hooks', 'punycode', 'querystring', 'readline', 'repl',
  'stream', 'string_decoder', 'sys', 'timers', 'tls', 'tty', 'url',
  'util', 'vm', 'worker_threads', 'zlib'
];

// Special subpath modules
const SUBPATH_MODULES = [
  'fs/promises', 'util/types'
];

// Create the bundle file
async function createNodeBundle() {
  console.log('Creating Node.js modules bundle...');
  
  // Create ESM bundle
  let esmBundle = `/**
 * Bundled Node.js built-in modules (ESM version)
 * This file is auto-generated - DO NOT EDIT
 */

`;

  // Add imports and exports for each module
  for (const moduleName of NODE_BUILTINS) {
    esmBundle += `import * as ${moduleName.replace(/-/g, '_')} from '${moduleName}';\n`;
  }
  
  // Handle subpath modules
  for (const modulePath of SUBPATH_MODULES) {
    const safeName = modulePath.replace(/\//g, '_');
    esmBundle += `import * as ${safeName} from '${modulePath}';\n`;
  }
  
  // Add the exports
  esmBundle += `\n// Export all modules\nexport {\n`;
  
  for (const moduleName of NODE_BUILTINS) {
    const safeName = moduleName.replace(/-/g, '_');
    esmBundle += `  ${safeName},\n`;
  }
  
  // Add subpath modules
  for (const modulePath of SUBPATH_MODULES) {
    const safeName = modulePath.replace(/\//g, '_');
    esmBundle += `  ${safeName},\n`;
  }
  
  esmBundle += `};\n\n`;
  
  // Add a default export object
  esmBundle += `// Default export with all modules\nexport default {\n`;
  
  for (const moduleName of NODE_BUILTINS) {
    const safeName = moduleName.replace(/-/g, '_');
    esmBundle += `  ${safeName},\n`;
  }
  
  // Add subpath modules
  for (const modulePath of SUBPATH_MODULES) {
    const safeName = modulePath.replace(/\//g, '_');
    esmBundle += `  ${safeName},\n`;
  }
  
  esmBundle += `};\n`;
  
  // Write the ESM bundle
  await fs.promises.writeFile(
    path.join(__dirname, 'node-bundle.mjs'),
    esmBundle,
    'utf8'
  );
  
  // Create CommonJS bundle
  let cjsBundle = `/**
 * Bundled Node.js built-in modules (CommonJS version)
 * This file is auto-generated - DO NOT EDIT
 */

// Require all Node.js built-in modules
`;

  for (const moduleName of NODE_BUILTINS) {
    const safeName = moduleName.replace(/-/g, '_');
    cjsBundle += `const ${safeName} = require('${moduleName}');\n`;
  }
  
  // Handle subpath modules
  for (const modulePath of SUBPATH_MODULES) {
    const safeName = modulePath.replace(/\//g, '_');
    cjsBundle += `const ${safeName} = require('${modulePath}');\n`;
  }
  
  // Create the exports object
  cjsBundle += `\n// Export all modules\nmodule.exports = {\n`;
  
  for (const moduleName of NODE_BUILTINS) {
    const safeName = moduleName.replace(/-/g, '_');
    cjsBundle += `  ${safeName},\n`;
  }
  
  // Add subpath modules
  for (const modulePath of SUBPATH_MODULES) {
    const safeName = modulePath.replace(/\//g, '_');
    cjsBundle += `  ${safeName},\n`;
  }
  
  cjsBundle += `};\n`;
  
  // Add individual exports for direct require access
  cjsBundle += `\n// Add individual exports\n`;
  
  for (const moduleName of NODE_BUILTINS) {
    const safeName = moduleName.replace(/-/g, '_');
    cjsBundle += `module.exports.${moduleName} = ${safeName};\n`;
  }
  
  // Add subpath modules
  for (const modulePath of SUBPATH_MODULES) {
    const safeName = modulePath.replace(/\//g, '_');
    const exportName = modulePath.replace(/\//g, '_');
    cjsBundle += `module.exports['${modulePath}'] = ${safeName};\n`;
  }
  
  // Write the CommonJS bundle
  await fs.promises.writeFile(
    path.join(__dirname, 'node-bundle.cjs'),
    cjsBundle,
    'utf8'
  );
  
  console.log('✅ Node.js module bundles created successfully!');
}

// Run the function
createNodeBundle().catch(error => {
  console.error('Error creating Node.js module bundle:', error);
  process.exit(1);
});
