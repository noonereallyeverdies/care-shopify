// Test file to check Node.js built-in module resolution
// Import crypto module using both styles

// Standard import (without node: prefix)
import crypto from 'crypto';

// Node.js protocol import
import * as nodeCrypto from 'node:crypto';

// Export a function that uses both modules
export function testCrypto(data) {
  // Use standard crypto import
  const hash1 = crypto.createHash('sha256').update(data).digest('hex');
  
  // Use node: protocol import
  const hash2 = nodeCrypto.createHash('sha256').update(data).digest('hex');
  
  return {
    standardImport: hash1,
    nodeProtocolImport: hash2
  };
}

// This file can be built with both client-side and SSR to verify
// that Node.js built-ins are properly externalized in SSR builds
