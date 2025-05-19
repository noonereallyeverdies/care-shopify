/**
 * Browser-compatible shim for the Node.js crypto module.
 * This provides minimal implementation for compatibility.
 */

// Simple shim for random bytes
export function randomBytes(size) {
  const array = new Uint8Array(size);
  if (window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(array);
  } else {
    // Fallback for older browsers (not cryptographically secure)
    for (let i = 0; i < size; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return array;
}

// Minimal implementation of createHash
export function createHash(algorithm) {
  return {
    update: (data) => {
      console.warn('crypto.createHash is not fully implemented in browser environment');
      return {
        digest: () => {
          // Return a dummy hash
          return 'browser-environment-hash';
        }
      };
    }
  };
}

// Export a default empty object
export default {
  randomBytes,
  createHash,
}; 