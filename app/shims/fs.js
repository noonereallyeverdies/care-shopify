/**
 * Browser-compatible shim for the Node.js fs module.
 * This provides empty implementations for compatibility.
 */

// Warning function for fs operations in browser
function notImplemented(methodName) {
  console.warn(`fs.${methodName} is not implemented in browser environment`);
  return null;
}

// Empty implementations
export function readFile() {
  return notImplemented('readFile');
}

export function readFileSync() {
  return notImplemented('readFileSync');
}

export function writeFile() {
  return notImplemented('writeFile');
}

export function writeFileSync() {
  return notImplemented('writeFileSync');
}

export function existsSync() {
  console.warn('fs.existsSync is not implemented in browser environment');
  return false;
}

export function mkdirSync() {
  return notImplemented('mkdirSync');
}

export function readdirSync() {
  console.warn('fs.readdirSync is not implemented in browser environment');
  return [];
}

export function statSync() {
  console.warn('fs.statSync is not implemented in browser environment');
  return {
    isFile: () => false,
    isDirectory: () => false,
    size: 0,
    mtime: new Date(),
  };
}

// Default export
export default {
  readFile,
  readFileSync,
  writeFile,
  writeFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  createReadStream: () => notImplemented('createReadStream'),
  createWriteStream: () => notImplemented('createWriteStream'),
}; 