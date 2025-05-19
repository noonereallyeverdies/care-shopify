// Performance monitoring utilities for Care•atin
// ~/app/lib/performance.ts

import React, { useEffect, useRef, useCallback, useState } from 'react';

// Types for performance metrics
interface PerformanceMetrics {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  ttfb: number | null; // Time to First Byte
}

interface ViewportMetrics {
  width: number;
  height: number;
  devicePixelRatio: number;
  isTouch: boolean;
}

// Performance observer for Core Web Vitals
class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    // LCP Observer
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          this.metrics.lcp = lastEntry.startTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (e) {
        console.warn('LCP observer not supported');
      }

      // FID Observer
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            this.metrics.fid = entry.processingStart - entry.startTime;
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (e) {
        console.warn('FID observer not supported');
      }

      // CLS Observer
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              this.metrics.cls = clsValue;
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (e) {
        console.warn('CLS observer not supported');
      }

      // FCP Observer
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (entry.name === 'first-contentful-paint') {
              this.metrics.fcp = entry.startTime;
            }
          });
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
        this.observers.push(fcpObserver);
      } catch (e) {
        console.warn('FCP observer not supported');
      }
    }
  }

  getMetrics(): Partial<PerformanceMetrics> {
    // Add TTFB
    if (typeof window !== 'undefined' && window.performance?.timing) {
      const navigation = window.performance.timing;
      this.metrics.ttfb = navigation.responseStart - navigation.fetchStart;
    }

    return { ...this.metrics };
  }

  disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Bundle size analyzer
export const analyzeBundleSize = () => {
  if (typeof window === 'undefined') return;

  const resources = performance.getEntriesByType('resource') as any[];
  const bundles = resources.filter(resource => 
    resource.name.includes('.js') || resource.name.includes('.css')
  );

  const analysis = bundles.map(bundle => ({
    name: bundle.name.split('/').pop(),
    size: bundle.transferSize,
    loadTime: bundle.duration,
    type: bundle.name.includes('.js') ? 'JavaScript' : 'CSS',
  }));

  console.table(analysis);
  return analysis;
};

// React hook for performance monitoring
export const usePerformanceMonitor = () => {
  const monitorRef = useRef<PerformanceMonitor | null>(null);
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      monitorRef.current = new PerformanceMonitor();

      // Report metrics after page load
      const timeout = setTimeout(() => {
        if (monitorRef.current) {
          setMetrics(monitorRef.current.getMetrics());
        }
      }, 5000);

      return () => {
        clearTimeout(timeout);
        if (monitorRef.current) {
          monitorRef.current.disconnect();
        }
      };
    }
  }, []);

  return metrics;
};

// Viewport-aware component rendering
export const useViewportMetrics = (): ViewportMetrics => {
  const [metrics, setMetrics] = useState<ViewportMetrics>({
    width: 0,
    height: 0,
    devicePixelRatio: 1,
    isTouch: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateMetrics = () => {
      setMetrics({
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio || 1,
        isTouch: 'ontouchstart' in window,
      });
    };

    updateMetrics();
    window.addEventListener('resize', updateMetrics);
    window.addEventListener('orientationchange', updateMetrics);

    return () => {
      window.removeEventListener('resize', updateMetrics);
      window.removeEventListener('orientationchange', updateMetrics);
    };
  }, []);

  return metrics;
};

// Component performance profiler
export const ProfilerComponent = ({ 
  id, 
  children 
}: { 
  id: string; 
  children: React.ReactNode 
}) => {
  const onRenderCallback = useCallback(
    (id: string, phase: 'mount' | 'update', actualDuration: number) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`${id} ${phase} took ${actualDuration}ms`);
      }
    },
    []
  );

  return (
    <React.Profiler id={id} onRender={onRenderCallback}>
      {children}
    </React.Profiler>
  );
};

// Resource loading optimization
export const preloadResource = (href: string, as: string, type?: string) => {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  
  document.head.appendChild(link);
};

// Critical resource detector
export const detectCriticalResources = () => {
  if (typeof window === 'undefined') return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Preload images that are about to come into view
        if (element.tagName === 'IMG' && !element.getAttribute('src')) {
          const dataSrc = element.getAttribute('data-src');
          if (dataSrc) {
            element.setAttribute('src', dataSrc);
          }
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px',
  });

  // Observe all images with data-src
  document.querySelectorAll('img[data-src]').forEach((img) => {
    observer.observe(img);
  });

  return observer;
};

// Performance budget checker
export const checkPerformanceBudget = () => {
  const budget = {
    maxLCP: 2500, // ms
    maxFID: 100,  // ms
    maxCLS: 0.1,
    maxBundleSize: 250000, // bytes
  };

  return new Promise((resolve) => {
    const monitor = new PerformanceMonitor();
    
    setTimeout(() => {
      const metrics = monitor.getMetrics();
      const results = {
        lcp: {
          value: metrics.lcp,
          budget: budget.maxLCP,
          passed: !metrics.lcp || metrics.lcp <= budget.maxLCP,
        },
        fid: {
          value: metrics.fid,
          budget: budget.maxFID,
          passed: !metrics.fid || metrics.fid <= budget.maxFID,
        },
        cls: {
          value: metrics.cls,
          budget: budget.maxCLS,
          passed: !metrics.cls || metrics.cls <= budget.maxCLS,
        },
      };
      
      monitor.disconnect();
      resolve(results);
    }, 3000);
  });
};

// Memory usage tracker
export const trackMemoryUsage = () => {
  if (typeof window === 'undefined' || !('memory' in performance)) return;

  const memory = (performance as any).memory;
  return {
    usedJSHeapSize: memory.usedJSHeapSize,
    totalJSHeapSize: memory.totalJSHeapSize,
    jsHeapSizeLimit: memory.jsHeapSizeLimit,
    usage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
  };
};

export default PerformanceMonitor;
