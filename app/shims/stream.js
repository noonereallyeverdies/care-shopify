/**
 * Browser-compatible shim for the Node.js stream module.
 * This provides minimal implementation for compatibility.
 */

// Minimal implementation of Readable
export class Readable {
  constructor(options) {
    this.options = options || {};
    this.readable = true;
    this._events = {};
  }

  on(event, handler) {
    this._events[event] = this._events[event] || [];
    this._events[event].push(handler);
    return this;
  }

  pipe() {
    console.warn('stream.Readable.pipe is not implemented in browser environment');
    return this;
  }

  read() {
    console.warn('stream.Readable.read is not implemented in browser environment');
    return null;
  }
}

// Minimal implementation of Writable
export class Writable {
  constructor(options) {
    this.options = options || {};
    this.writable = true;
    this._events = {};
  }

  on(event, handler) {
    this._events[event] = this._events[event] || [];
    this._events[event].push(handler);
    return this;
  }

  write() {
    console.warn('stream.Writable.write is not implemented in browser environment');
    return true;
  }

  end() {
    console.warn('stream.Writable.end is not implemented in browser environment');
    return this;
  }
}

// Minimal implementation of Transform
export class Transform extends Readable {
  constructor(options) {
    super(options);
    this.writable = true;
  }

  write() {
    console.warn('stream.Transform.write is not implemented in browser environment');
    return true;
  }

  end() {
    console.warn('stream.Transform.end is not implemented in browser environment');
    return this;
  }
}

// Default export
export default {
  Readable,
  Writable,
  Transform,
}; 