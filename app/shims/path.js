/**
 * Browser-compatible shim for the Node.js path module.
 * This provides minimal implementation for compatibility.
 */

// Platform detection for path separator
const isWindows = typeof navigator !== 'undefined' && /win/i.test(navigator.platform);
export const sep = isWindows ? '\\' : '/';
export const delimiter = isWindows ? ';' : ':';

// Implementation of path.basename
export function basename(path, ext) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string');
  }
  
  // Handle empty path
  if (path.length === 0) return '';
  
  // Normalize path by removing trailing separators
  path = path.replace(/[\/\\]+$/, '');
  
  // Find the last separator
  const lastSepIndex = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'));
  
  // Extract the basename
  const base = lastSepIndex >= 0 ? path.slice(lastSepIndex + 1) : path;
  
  // Remove extension if specified
  if (ext && base.endsWith(ext)) {
    return base.slice(0, -ext.length);
  }
  
  return base;
}

// Implementation of path.dirname
export function dirname(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string');
  }
  
  // Handle empty path
  if (path.length === 0) return '.';
  
  // Normalize path by removing trailing separators
  path = path.replace(/[\/\\]+$/, '');
  
  // Find the last separator
  const lastSepIndex = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'));
  
  // Handle root paths
  if (lastSepIndex === 0) return '/';
  if (lastSepIndex < 0) return '.';
  
  return path.slice(0, lastSepIndex);
}

// Implementation of path.extname
export function extname(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string');
  }
  
  // Find the base name
  const base = basename(path);
  
  // Find the last dot
  const lastDotIndex = base.lastIndexOf('.');
  
  // Handle no extension or dot at the start of the basename
  if (lastDotIndex <= 0) return '';
  
  return base.slice(lastDotIndex);
}

// Implementation of path.join
export function join(...paths) {
  if (paths.length === 0) return '.';
  
  let joined = '';
  
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    if (typeof path !== 'string') {
      throw new TypeError('Path must be a string');
    }
    
    if (path.length > 0) {
      if (joined.length > 0) {
        joined += sep;
      }
      joined += path;
    }
  }
  
  // Normalize the path
  return normalize(joined);
}

// Implementation of path.normalize
export function normalize(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string');
  }
  
  // Replace all backslashes with forward slashes
  path = path.replace(/\\/g, '/');
  
  // Replace multiple consecutive slashes with a single slash
  path = path.replace(/\/+/g, '/');
  
  // Remove trailing slash
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  
  return path;
}

// Default export
export default {
  basename,
  dirname,
  extname,
  join,
  normalize,
  sep,
  delimiter,
}; 