/**
 * Browser-compatible shim for the Node.js fs/promises module.
 * This provides empty implementations for compatibility.
 */

// Warning function for fs operations in browser
function notImplemented(methodName) {
  console.warn(`fs/promises.${methodName} is not implemented in browser environment`);
  return Promise.resolve(null);
}

// Empty implementations that return promises
export function readFile() {
  return notImplemented('readFile');
}

export function writeFile() {
  return notImplemented('writeFile');
}

export function mkdir() {
  return notImplemented('mkdir');
}

export function readdir() {
  return notImplemented('readdir');
}

export function stat() {
  return notImplemented('stat');
}

export function unlink() {
  return notImplemented('unlink');
}

export function rmdir() {
  return notImplemented('rmdir');
}

// Default export
export default {
  readFile,
  writeFile,
  mkdir,
  readdir,
  stat,
  unlink,
  rmdir,
}; 