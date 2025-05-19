/**
 * Browser-compatible shim for the Node.js util module.
 * This provides minimal implementation for compatibility.
 */

// Simple implementation of inherits
export function inherits(ctor, superCtor) {
  if (ctor === undefined || ctor === null) {
    throw new TypeError('The constructor to "inherits" must not be null or undefined');
  }
  if (superCtor === undefined || superCtor === null) {
    throw new TypeError('The super constructor to "inherits" must not be null or undefined');
  }
  if (superCtor.prototype === undefined) {
    throw new TypeError('The super constructor to "inherits" must have a prototype');
  }
  ctor.super_ = superCtor;
  Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
}

// Simple implementation of inspect
export function inspect(obj, options) {
  return JSON.stringify(obj, null, 2);
}

// Promisify implementation
export function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, ...values) => {
        if (err) {
          return reject(err);
        }
        if (values.length === 1) {
          return resolve(values[0]);
        }
        resolve(values);
      });
    });
  };
}

// Types utilities
export const types = {
  isDate: (obj) => obj instanceof Date,
  isRegExp: (obj) => obj instanceof RegExp,
  isArray: Array.isArray,
  isBoolean: (obj) => typeof obj === 'boolean',
  isNull: (obj) => obj === null,
  isNullOrUndefined: (obj) => obj == null,
  isNumber: (obj) => typeof obj === 'number',
  isString: (obj) => typeof obj === 'string',
  isSymbol: (obj) => typeof obj === 'symbol',
  isUndefined: (obj) => obj === undefined,
  isObject: (obj) => typeof obj === 'object' && obj !== null,
  isFunction: (obj) => typeof obj === 'function',
  isPrimitive: (obj) => {
    return obj === null ||
      typeof obj === 'boolean' ||
      typeof obj === 'number' ||
      typeof obj === 'string' ||
      typeof obj === 'symbol' ||
      typeof obj === 'undefined';
  },
  isBuffer: (obj) => !!(obj && obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj)),
  isArrayBuffer: (obj) => obj instanceof ArrayBuffer,
  isTypedArray: (obj) => {
    return ArrayBuffer.isView(obj) && !(obj instanceof DataView);
  },
};

// Default export
export default {
  inherits,
  inspect,
  promisify,
  types,
  // Additional utility functions
  format: (fmt, ...args) => {
    // Very simple formatting implementation
    if (typeof fmt !== 'string') {
      return args.map(String).join(' ');
    }
    let i = 0;
    return fmt.replace(/%[sdjO%]/g, (match) => {
      if (match === '%%') return '%';
      if (i >= args.length) return match;
      const arg = args[i++];
      switch (match) {
        case '%s': return String(arg);
        case '%d': return Number(arg).toString();
        case '%j': return JSON.stringify(arg);
        case '%O': return inspect(arg);
        default: return match;
      }
    });
  },
}; 