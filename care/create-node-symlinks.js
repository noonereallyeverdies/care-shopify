/**
 * This script creates symlinks in node_modules for Node.js built-in modules
 * to help resolve the issues with Node.js built-in resolution
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to node_modules
const nodeModulesDir = path.join(__dirname, 'node_modules');

// Create node modules directory if it doesn't exist
if (!fs.existsSync(nodeModulesDir)) {
  fs.mkdirSync(nodeModulesDir, { recursive: true });
}

// Node.js built-in modules to create symlinks for
const modulesToSymlink = [
  'fs', 'path', 'crypto', 'stream', 'http', 'https', 'net',
  'os', 'events', 'util', 'buffer', 'assert', 'url',
  'querystring', 'zlib', 'dns', 'tls', 'console',
  'worker_threads', 'diagnostics_channel', 'async_hooks', 'perf_hooks',
  'http2'
];

// Create Node.js module resolver files
console.log('Creating Node.js module resolver files...');

// Process each module
for (const moduleName of modulesToSymlink) {
  const moduleDir = path.join(nodeModulesDir, moduleName);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(moduleDir)) {
    fs.mkdirSync(moduleDir, { recursive: true });
  }
  
  // Create package.json file
  const packageJson = {
    name: moduleName,
    version: process.version,
    description: `Resolver for Node.js built-in module: ${moduleName}`,
    main: 'index.js'
  };
  
  fs.writeFileSync(
    path.join(moduleDir, 'package.json'),
    JSON.stringify(packageJson, null, 2),
    'utf8'
  );
  
  // Create index.js file that exports the Node.js built-in module
  const indexJs = `/**
 * Resolver for Node.js built-in module: ${moduleName}
 * This is auto-generated - DO NOT EDIT
 */

// Export the Node.js built-in module
module.exports = global.${moduleName} || require('${moduleName}');
`;
  
  fs.writeFileSync(
    path.join(moduleDir, 'index.js'),
    indexJs,
    'utf8'
  );
}

// Special handling for fs/promises
const fsPromisesDir = path.join(nodeModulesDir, 'fs', 'promises');
if (!fs.existsSync(fsPromisesDir)) {
  fs.mkdirSync(fsPromisesDir, { recursive: true });
  
  // Create index.js file
  const fsPromisesIndex = `/**
 * Resolver for Node.js built-in module: fs/promises
 * This is auto-generated - DO NOT EDIT
 */

// Export the Node.js built-in module
module.exports = (global.fs && global.fs.promises) || require('fs/promises');
`;
  
  fs.writeFileSync(
    path.join(fsPromisesDir, 'index.js'),
    fsPromisesIndex,
    'utf8'
  );
}

// Special handling for util/types
const utilTypesDir = path.join(nodeModulesDir, 'util', 'types');
if (!fs.existsSync(utilTypesDir)) {
  fs.mkdirSync(utilTypesDir, { recursive: true });
  
  // Create index.js file
  const utilTypesIndex = `/**
 * Resolver for Node.js built-in module: util/types
 * This is auto-generated - DO NOT EDIT
 */

// Export the Node.js built-in module
module.exports = (global.util && global.util.types) || require('util/types');
`;
  
  fs.writeFileSync(
    path.join(utilTypesDir, 'index.js'),
    utilTypesIndex,
    'utf8'
  );
}

console.log('✅ Node.js module resolver files created successfully!');
