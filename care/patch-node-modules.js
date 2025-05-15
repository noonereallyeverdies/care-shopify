/**
 * This script patches node_modules to replace 'node:' protocol imports with standard imports.
 * Run this script before building your application to avoid Node.js built-in module resolution issues.
 * 
 * Usage: node patch-node-modules.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories and files to patch
const dirsToProcess = [
  path.join(__dirname, 'node_modules', '@remix-run', 'node'),
  path.join(__dirname, 'node_modules', 'undici')
];

// List of node built-ins to check for
const nodeBuiltins = [
  'assert', 'async_hooks', 'buffer', 'child_process', 'cluster', 'console',
  'constants', 'crypto', 'dgram', 'diagnostics_channel', 'dns', 'domain',
  'events', 'fs', 'http', 'http2', 'https', 'module', 'net', 'os',
  'path', 'perf_hooks', 'punycode', 'querystring', 'readline', 'repl',
  'stream', 'string_decoder', 'sys', 'timers', 'tls', 'tty', 'url',
  'util', 'vm', 'worker_threads', 'zlib'
];

// Function to process a file
async function processFile(filePath) {
  // Read file content
  let content = await fs.promises.readFile(filePath, 'utf8');
  let modified = false;

  // Check if file contains any node: imports
  if (content.includes('node:')) {
    console.log(`Processing file: ${filePath}`);
    
    // Replace all node: protocol imports
    const originalContent = content;
    
    // Replace require statements - require('node:fs') -> require('fs')
    for (const builtin of nodeBuiltins) {
      const requireRegex = new RegExp(`require\\(['"]node:${builtin}(?:\\/([^'"]*?))?['"]\\)`, 'g');
      content = content.replace(requireRegex, (match, subpath) => {
        modified = true;
        return subpath ? `require('${builtin}/${subpath}')` : `require('${builtin}')`;
      });
    }
    
    // Replace import statements - import x from 'node:fs' -> import x from 'fs'
    for (const builtin of nodeBuiltins) {
      const importRegex = new RegExp(`from\\s+['"]node:${builtin}(?:\\/([^'"]*?))?['"]`, 'g');
      content = content.replace(importRegex, (match, subpath) => {
        modified = true;
        return subpath ? `from '${builtin}/${subpath}'` : `from '${builtin}'`;
      });
    }
    
    // Write modified content back to file if changes were made
    if (modified) {
      await fs.promises.writeFile(filePath, content, 'utf8');
      console.log(`✅ Patched: ${filePath}`);
    }
  }
  
  return modified;
}

// Function to recursively process a directory
async function processDirectory(dirPath) {
  // Get all entries in the directory
  const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
  let patchedFiles = 0;
  
  // Process each entry
  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      // Skip node_modules inside node_modules to prevent recursion issues
      if (entry.name === 'node_modules') {
        continue;
      }
      // Process subdirectory
      patchedFiles += await processDirectory(entryPath);
    } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.cjs') || entry.name.endsWith('.mjs'))) {
      // Process JS files
      if (await processFile(entryPath)) {
        patchedFiles++;
      }
    }
  }
  
  return patchedFiles;
}

// Main function
async function main() {
  console.log('🔧 Starting to patch node_modules...');
  
  let totalPatched = 0;
  
  for (const dir of dirsToProcess) {
    if (fs.existsSync(dir)) {
      console.log(`Processing directory: ${dir}`);
      const patched = await processDirectory(dir);
      totalPatched += patched;
      console.log(`Patched ${patched} files in ${dir}`);
    } else {
      console.log(`Directory ${dir} does not exist, skipping.`);
    }
  }
  
  console.log(`🎉 Finished patching ${totalPatched} files in node_modules!`);
}

// Run the main function
main().catch(error => {
  console.error('Error patching node_modules:', error);
  process.exit(1);
});
