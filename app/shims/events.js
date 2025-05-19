/**
 * Browser-compatible shim for the Node.js events module.
 * This provides a minimal EventEmitter implementation.
 */

// EventEmitter implementation
export class EventEmitter {
  constructor() {
    this._events = {};
    this._maxListeners = 10;
  }

  setMaxListeners(n) {
    this._maxListeners = n;
    return this;
  }

  getMaxListeners() {
    return this._maxListeners;
  }

  emit(type, ...args) {
    if (!this._events[type]) return false;
    
    const handlers = this._events[type].slice();
    for (const handler of handlers) {
      try {
        handler.apply(this, args);
      } catch (err) {
        console.error(err);
      }
    }
    
    return true;
  }

  addListener(type, listener) {
    return this.on(type, listener);
  }

  on(type, listener) {
    if (!this._events[type]) {
      this._events[type] = [];
    }
    
    this._events[type].push(listener);
    
    // Warn if exceeding max listeners
    if (this._events[type].length > this._maxListeners) {
      console.warn(`Possible EventEmitter memory leak detected. ${this._events[type].length} ${type} listeners added.`);
    }
    
    return this;
  }

  once(type, listener) {
    const wrapper = (...args) => {
      this.removeListener(type, wrapper);
      listener.apply(this, args);
    };
    
    // Store reference to original listener
    wrapper._originalListener = listener;
    
    return this.on(type, wrapper);
  }

  removeListener(type, listener) {
    if (!this._events[type]) return this;
    
    const list = this._events[type];
    const index = list.findIndex((item) => {
      return item === listener || (item._originalListener && item._originalListener === listener);
    });
    
    if (index >= 0) {
      list.splice(index, 1);
    }
    
    return this;
  }

  off(type, listener) {
    return this.removeListener(type, listener);
  }

  removeAllListeners(type) {
    if (type) {
      if (this._events[type]) {
        this._events[type] = [];
      }
    } else {
      this._events = {};
    }
    
    return this;
  }

  listeners(type) {
    return (this._events[type] || []).slice();
  }

  listenerCount(type) {
    return this._events[type] ? this._events[type].length : 0;
  }
}

// Default export
export default {
  EventEmitter,
}; 