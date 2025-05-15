/**
 * Temporary stub implementation of performance utilities
 * to fix dashboard errors
 */

export class PerformanceMonitor {
  static getMetric() { return null; }
  static getAllMetrics() { return {}; }
  static clear() {}
}

export class MemoryManager {
  static getMemoryInfo() { 
    return {
      usedJSHeapSize: 0,
      totalJSHeapSize: 0,
      jsHeapSizeLimit: 0,
      usedPercentage: 0
    };
  }
  static runCleanup() {}
}

export class ImagePreloader {
  static getCacheSize() { return 0; }
  static clearCache() {}
}

export class BundleOptimizer {
  static getLoadedChunks() { return []; }
  static getChunkLoadTimes() { return {}; }
  static getAverageChunkLoadTime() { return 0; }
} 