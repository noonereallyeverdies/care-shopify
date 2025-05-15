/**
 * This script checks that all required Node.js built-in modules
 * are available and properly resolved
 */
 
// List of Node.js built-in modules to check
const modules = [
  'fs', 'path', 'crypto', 'stream', 'http', 'https',
  'net', 'os', 'events', 'assert', 'util', 'buffer',
  'url', 'querystring', 'zlib', 'async_hooks', 
  'worker_threads', 'diagnostics_channel', 'tls', 'console',
  'dns', 'perf_hooks', 'http2'
];

// Special subpath modules to check
const subpathModules = [
  'fs/promises', 'util/types'
];

console.log('🔍 Checking Node.js built-in modules...');

// Check availability of each module
let allAvailable = true;
let results = [];

for (const moduleName of modules) {
  try {
    const module = require(moduleName);
    results.push(`✅ ${moduleName} - Available`);
  } catch (error) {
    results.push(`❌ ${moduleName} - ERROR: ${error.message}`);
    allAvailable = false;
  }
}

// Check subpath modules
for (const modulePath of subpathModules) {
  try {
    const module = require(modulePath);
    results.push(`✅ ${modulePath} - Available`);
  } catch (error) {
    results.push(`❌ ${modulePath} - ERROR: ${error.message}`);
    allAvailable = false;
  }
}

// Output results
console.log('\n===== Module Availability Results =====');
results.forEach(result => console.log(result));
console.log('\n');

if (allAvailable) {
  console.log('🎉 All Node.js modules are available!');
} else {
  console.log('⚠️  Some Node.js modules are not available. This may cause issues during build.');
}

// Check if the global shims are working
console.log('\n===== Checking Global Shims =====');
if (global.fs) {
  console.log('✅ global.fs is available');
} else {
  console.log('❌ global.fs is NOT available');
}

if (global.path) {
  console.log('✅ global.path is available');
} else {
  console.log('❌ global.path is NOT available');
}

if (global.crypto) {
  console.log('✅ global.crypto is available');
} else {
  console.log('❌ global.crypto is NOT available');
}

console.log('\nModule check completed!');
