/**
 * Performance Optimization Utilities
 * 
 * Collection of utilities for performance monitoring and optimization
 */
import * as React from 'react';

// Intersection Observer singleton for better performance
class IntersectionObserverManager {
  private static observers = new Map<string, IntersectionObserver>();
  private static callbacks = new Map<Element, Set<(entry: IntersectionObserverEntry) => void>>();

  static observe(
    element: Element,
    callback: (entry: IntersectionObserverEntry) => void,
    options: IntersectionObserverInit = {}
  ) {
    const key = this.generateKey(options);
    
    if (!this.observers.has(key)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const callbacks = this.callbacks.get(entry.target);
          if (callbacks) {
            callbacks.forEach(cb => cb(entry));
          }
        });
      }, options);
      this.observers.set(key, observer);
    }

    const observer = this.observers.get(key)!;
    observer.observe(element);

    if (!this.callbacks.has(element)) {
      this.callbacks.set(element, new Set());
    }
    this.callbacks.get(element)!.add(callback);

    return () => this.unobserve(element, callback, key);
  }

  private static unobserve(
    element: Element,
    callback: (entry: IntersectionObserverEntry) => void,
    key: string
  ) {
    const callbacks = this.callbacks.get(element);
    if (callbacks) {
      callbacks.delete(callback);
      if (callbacks.size === 0) {
        this.callbacks.delete(element);
        const observer = this.observers.get(key);
        if (observer) {
          observer.unobserve(element);
        }
      }
    }
  }

  private static generateKey(options: IntersectionObserverInit): string {
    return JSON.stringify({
      threshold: options.threshold || 0,
      rootMargin: options.rootMargin || '0px',
      root: options.root ? options.root.toString() : null,
    });
  }
}

// Image preloading utilities
export class ImagePreloader {
  private static cache = new Map<string, HTMLImageElement>();
  private static loading = new Set<string>();

  static preload(src: string): Promise<HTMLImageElement> {
    // Return cached image if available
    if (this.cache.has(src)) {
      return Promise.resolve(this.cache.get(src)!);
    }

    // Return loading promise if already loading
    if (this.loading.has(src)) {
      return new Promise((resolve, reject) => {
        const checkLoaded = () => {
          if (this.cache.has(src)) {
            resolve(this.cache.get(src)!);
          } else if (!this.loading.has(src)) {
            reject(new Error('Failed to load image'));
          } else {
            setTimeout(checkLoaded, 10);
          }
        };
        checkLoaded();
      });
    }

    // Start loading
    this.loading.add(src);
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.loading.delete(src);
        this.cache.set(src, img);
        resolve(img);
      };
      img.onerror = () => {
        this.loading.delete(src);
        reject(new Error(`Failed to load image: ${src}`));
      };
      img.src = src;
    });
  }

  static preloadMultiple(srcs: string[]): Promise<HTMLImageElement[]> {
    return Promise.all(srcs.map(src => this.preload(src)));
  }

  static clearCache() {
    this.cache.clear();
    this.loading.clear();
  }

  static getCacheSize(): number {
    return this.cache.size;
  }
}

// Resource preloading utilities
export class ResourcePreloader {
  private static preloadedResources = new Set<string>();

  static preloadCSS(href: string): Promise<void> {
    if (this.preloadedResources.has(href)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      link.onload = () => {
        this.preloadedResources.add(href);
        resolve();
      };
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  static preloadScript(src: string): Promise<void> {
    if (this.preloadedResources.has(src)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = src;
      link.onload = () => {
        this.preloadedResources.add(src);
        resolve();
      };
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  static preloadFont(href: string, crossOrigin = true): Promise<void> {
    if (this.preloadedResources.has(href)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.href = href;
      if (crossOrigin) {
        link.crossOrigin = 'anonymous';
      }
      link.onload = () => {
        this.preloadedResources.add(href);
        resolve();
      };
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }
}

// Performance monitoring utilities
export class PerformanceMonitor {
  private static metrics = new Map<string, number[]>();
  private static observers: PerformanceObserver[] = [];

  static startTiming(label: string): () => void {
    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      this.recordMetric(label, duration);
      return duration;
    };
  }

  static recordMetric(label: string, value: number) {
    if (!this.metrics.has(label)) {
      this.metrics.set(label, []);
    }
    this.metrics.get(label)!.push(value);
  }

  static getMetric(label: string): {
    values: number[];
    average: number;
    min: number;
    max: number;
    count: number;
  } | null {
    const values = this.metrics.get(label);
    if (!values || values.length === 0) return null;

    return {
      values,
      average: values.reduce((sum, val) => sum + val, 0) / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      count: values.length,
    };
  }

  static getAllMetrics() {
    const result: Record<string, any> = {};
    this.metrics.forEach((values, label) => {
      result[label] = this.getMetric(label);
    });
    return result;
  }

  static observeLongTasks() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.recordMetric('long-task', entry.duration);
        });
      });
      observer.observe({ entryTypes: ['longtask'] });
      this.observers.push(observer);
    }
  }

  static observeLayoutShifts() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            this.recordMetric('layout-shift', entry.value);
          }
        });
      });
      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(observer);
    }
  }

  static observeFirstContentfulPaint() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            this.recordMetric('first-contentful-paint', entry.startTime);
          }
        });
      });
      observer.observe({ entryTypes: ['paint'] });
      this.observers.push(observer);
    }
  }

  static clear() {
    this.metrics.clear();
    this.observers.forEach(observer => observer.disconnect());
    this.observers.length = 0;
  }
}

// Memory management utilities
export class MemoryManager {
  private static observers = new Set<() => void>();
  private static cleanupInterval: number | null = null;

  static addCleanupObserver(cleanup: () => void) {
    this.observers.add(cleanup);
  }

  static removeCleanupObserver(cleanup: () => void) {
    this.observers.delete(cleanup);
  }

  static startPeriodicCleanup(intervalMs = 60000) {
    if (this.cleanupInterval) return;

    this.cleanupInterval = window.setInterval(() => {
      this.runCleanup();
    }, intervalMs);
  }

  static stopPeriodicCleanup() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }

  static runCleanup() {
    this.observers.forEach(cleanup => {
      try {
        cleanup();
      } catch (error) {
        console.warn('Cleanup function failed:', error);
      }
    });

    // Force garbage collection if available
    if ('gc' in window && typeof (window as any).gc === 'function') {
      (window as any).gc();
    }
  }

  static getMemoryInfo() {
    if ('memory' in performance && (performance as any).memory) {
      const memory = (performance as any).memory;
      return {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
        usedPercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
      };
    }
    return null;
  }
}

// Lazy loading hook with performance optimization
export function useOptimizedLazyLoading(
  threshold = 0.1,
  rootMargin = '50px'
) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [hasLoaded, setHasLoaded] = React.useState(false);
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!ref.current || hasLoaded) return;

    const cleanup = IntersectionObserverManager.observe(
      ref.current,
      (entry) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
        }
      },
      { threshold, rootMargin }
    );

    return cleanup;
  }, [threshold, rootMargin, hasLoaded]);

  return { ref, isVisible, hasLoaded };
}

// Performance-optimized event listeners
export class OptimizedEventManager {
  private static passive = { passive: true };
  private static active = { passive: false };
  private static listeners = new Map<string, Set<{ element: Element; listener: EventListener; options?: any }>>();

  static addEventListener(
    element: Element,
    event: string,
    listener: EventListener,
    options?: AddEventListenerOptions
  ) {
    // Use passive listeners for scroll/touch events by default
    const optimizedOptions = this.shouldUsePassive(event) 
      ? { ...options, ...this.passive }
      : options || this.active;

    element.addEventListener(event, listener, optimizedOptions);

    // Track for cleanup
    const key = `${event}_${optimizedOptions.passive ? 'passive' : 'active'}`;
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key)!.add({ element, listener, options: optimizedOptions });

    return () => this.removeEventListener(element, event, listener, optimizedOptions);
  }

  static removeEventListener(
    element: Element,
    event: string,
    listener: EventListener,
    options?: AddEventListenerOptions
  ) {
    element.removeEventListener(event, listener, options);

    // Remove from tracking
    this.listeners.forEach((listeners, key) => {
      const toRemove = Array.from(listeners).find(
        item => item.element === element && item.listener === listener
      );
      if (toRemove) {
        listeners.delete(toRemove);
      }
    });
  }

  private static shouldUsePassive(event: string): boolean {
    return ['scroll', 'wheel', 'touchstart', 'touchmove', 'touchend', 'touchcancel'].includes(event);
  }

  static cleanup() {
    this.listeners.forEach((listeners) => {
      listeners.forEach(({ element, listener, options }) => {
        element.removeEventListener('unknown' as any, listener, options);
      });
    });
    this.listeners.clear();
  }
}

// Bundle size optimization utilities
export class BundleOptimizer {
  private static loadedChunks = new Set<string>();
  private static chunkLoadTimes = new Map<string, number>();

  static async loadChunk(
    chunkName: string,
    loader: () => Promise<any>
  ): Promise<any> {
    if (this.loadedChunks.has(chunkName)) {
      return Promise.resolve();
    }

    const startTime = performance.now();
    
    try {
      const result = await loader();
      const loadTime = performance.now() - startTime;
      
      this.loadedChunks.add(chunkName);
      this.chunkLoadTimes.set(chunkName, loadTime);
      
      PerformanceMonitor.recordMetric(`chunk-load-${chunkName}`, loadTime);
      
      return result;
    } catch (error) {
      console.error(`Failed to load chunk ${chunkName}:`, error);
      throw error;
    }
  }

  static getLoadedChunks(): string[] {
    return Array.from(this.loadedChunks);
  }

  static getChunkLoadTimes(): Record<string, number> {
    return Object.fromEntries(this.chunkLoadTimes);
  }

  static getAverageChunkLoadTime(): number {
    const times = Array.from(this.chunkLoadTimes.values());
    return times.length > 0 ? times.reduce((sum, time) => sum + time, 0) / times.length : 0;
  }
}

// Initialize performance monitoring on module load
if (typeof window !== 'undefined') {
  // Start monitoring long tasks and layout shifts
  PerformanceMonitor.observeLongTasks();
  PerformanceMonitor.observeLayoutShifts();
  PerformanceMonitor.observeFirstContentfulPaint();
  
  // Start periodic memory cleanup
  MemoryManager.startPeriodicCleanup();
  
  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    PerformanceMonitor.clear();
    MemoryManager.stopPeriodicCleanup();
    MemoryManager.runCleanup();
    OptimizedEventManager.cleanup();
  });
}

// Export IntersectionObserverManager
export { IntersectionObserverManager };