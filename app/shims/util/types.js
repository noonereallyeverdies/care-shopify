/**
 * Browser-compatible shim for the Node.js util/types module.
 * This provides minimal implementations for compatibility.
 */

// Type check utilities
export const isArrayBuffer = (obj) => obj instanceof ArrayBuffer;
export const isUint8Array = (obj) => obj instanceof Uint8Array;
export const isUint16Array = (obj) => obj instanceof Uint16Array;
export const isUint32Array = (obj) => obj instanceof Uint32Array;
export const isInt8Array = (obj) => obj instanceof Int8Array;
export const isInt16Array = (obj) => obj instanceof Int16Array;
export const isInt32Array = (obj) => obj instanceof Int32Array;
export const isFloat32Array = (obj) => obj instanceof Float32Array;
export const isFloat64Array = (obj) => obj instanceof Float64Array;
export const isBigInt64Array = (obj) => obj instanceof BigInt64Array;
export const isBigUint64Array = (obj) => obj instanceof BigUint64Array;

export const isAnyArrayBuffer = (obj) => {
  return obj instanceof ArrayBuffer || 
    (typeof SharedArrayBuffer !== 'undefined' && obj instanceof SharedArrayBuffer);
};

export const isDataView = (obj) => obj instanceof DataView;

export const isTypedArray = (obj) => {
  return ArrayBuffer.isView(obj) && !(obj instanceof DataView);
};

// Default export
export default {
  isArrayBuffer,
  isUint8Array,
  isUint16Array,
  isUint32Array,
  isInt8Array,
  isInt16Array,
  isInt32Array,
  isFloat32Array,
  isFloat64Array,
  isBigInt64Array,
  isBigUint64Array,
  isAnyArrayBuffer,
  isDataView,
  isTypedArray,
}; 