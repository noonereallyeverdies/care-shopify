/**
 * Browser-compatible shim for the Node.js buffer module.
 * This provides minimal implementation for compatibility.
 */

// Use the browser's TextEncoder and TextDecoder for string conversion
const textEncoder = typeof TextEncoder !== 'undefined' ? new TextEncoder() : null;
const textDecoder = typeof TextDecoder !== 'undefined' ? new TextDecoder() : null;

// Basic Buffer class that wraps Uint8Array
export class Buffer extends Uint8Array {
  static from(value, encoding) {
    if (typeof value === 'string') {
      if (textEncoder) {
        return new Buffer(textEncoder.encode(value));
      }
      // Fallback for older browsers
      const buf = new Uint8Array(value.length);
      for (let i = 0; i < value.length; i++) {
        buf[i] = value.charCodeAt(i) & 0xff;
      }
      return new Buffer(buf);
    }
    
    if (value instanceof ArrayBuffer || ArrayBuffer.isView(value)) {
      return new Buffer(value);
    }
    
    // Default to empty buffer
    return new Buffer(0);
  }

  toString(encoding) {
    if (textDecoder) {
      return textDecoder.decode(this);
    }
    
    // Fallback for older browsers
    let result = '';
    for (let i = 0; i < this.length; i++) {
      result += String.fromCharCode(this[i]);
    }
    return result;
  }
}

// Constants
Buffer.isBuffer = (obj) => obj instanceof Buffer;
Buffer.alloc = (size) => new Buffer(new Uint8Array(size));
Buffer.allocUnsafe = (size) => new Buffer(new Uint8Array(size));
Buffer.concat = (list, length) => {
  if (length === undefined) {
    length = list.reduce((total, buf) => total + buf.length, 0);
  }
  const result = Buffer.alloc(length);
  let pos = 0;
  for (const buf of list) {
    result.set(buf, pos);
    pos += buf.length;
  }
  return result;
};

// Default export
export default {
  Buffer,
}; 