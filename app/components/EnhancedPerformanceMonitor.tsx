import React, { useEffect } from 'react';
import { onLCP, onFID, onCLS, onINP, onTTFB, onFCP } from 'web-vitals';

/**
 * Enhanced performance monitoring component to track Core Web Vitals,
 * advanced metrics, and performance budgets
 */

// Performance budget thresholds
const PERFORMANCE_BUDGETS = {
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100,  // First Input Delay (ms)
  CLS: 0.1,  // Cumulative Layout Shift (score)
  INP: 200,  // Interaction to Next Paint (ms)
  TTFB: 800, // Time to First Byte (ms)
  FCP: 1800, // First Contentful Paint (ms)
  
  // Resource budgets
  JS: 350,   // JavaScript (KB)
  CSS: 50,   // CSS (KB)
  FONTS: 100, // Fonts (KB)
  IMAGES: 500, // Images (KB)
  
  // Load and interaction timing
  LOAD: 3000, // Page load (ms)
  TTI: 3500,  // Time to Interactive (ms)
};

// Helper to convert bytes to KB
const bytesToKB = (bytes: number): number => Math.round(bytes / 1024);

// Record a performance metric
const recordMetric = (name: string, value: number, unit: string, budget?: number): void => {
  // Log to console in development
  if (process.env.NODE_ENV !== 'production') {
    const status = budget && value > budget ? '🔴' : '🟢';
    const budgetInfo = budget ? ` (Budget: ${budget}${unit})` : '';
    console.log(`[Performance] ${status} ${name}: ${value.toFixed(2)}${unit}${budgetInfo}`);
  }
  
  // Report to analytics in production
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'performance-metric',
      metric_name: name,
      metric_value: value,
      metric_unit: unit,
      metric_status: budget && value > budget ? 'exceeded' : 'passed',
    });
  }
  
  // Report to monitoring service if configured
  if (typeof window !== 'undefined' && window.performance && 'mark' in window.performance) {
    try {
      performance.mark(`${name}:${value}`);
    } catch (e) {
      // Silently fail if marking isn't supported
    }
  }
};

export function EnhancedPerformanceMonitor() {
  useEffect(() => {
    // Skip in SSR context
    if (typeof window === 'undefined') return;
    
    // Don't measure performance for bots
    const userAgent = navigator.userAgent || '';
    if (/bot|crawler|spider|googlebot/i.test(userAgent)) return;
    
    // Register listeners for Core Web Vitals with budget checks
    onLCP(({value}) => recordMetric('LCP', value, 'ms', PERFORMANCE_BUDGETS.LCP));
    onFID(({value}) => recordMetric('FID', value, 'ms', PERFORMANCE_BUDGETS.FID));
    onCLS(({value}) => recordMetric('CLS', value, 'score', PERFORMANCE_BUDGETS.CLS));
    onINP(({value}) => recordMetric('INP', value, 'ms', PERFORMANCE_BUDGETS.INP));
    onTTFB(({value}) => recordMetric('TTFB', value, 'ms', PERFORMANCE_BUDGETS.TTFB));
    onFCP(({value}) => recordMetric('FCP', value, 'ms', PERFORMANCE_BUDGETS.FCP));
    
    // Track custom measurements
    const observe = (type: string, callback: (entries: any[]) => void) => {
      if (!('PerformanceObserver' in window)) return null;
      try {
        const observer = new PerformanceObserver((list) => {
          callback(list.getEntries());
        });
        observer.observe({entryTypes: [type]});
        return observer;
      } catch (e) {
        console.error(`Error observing ${type}:`, e);
        return null;
      }
    };
    
    // Resource observers
    const resourceObserver = observe('resource', (entries) => {
      // Group resources by type
      const resources = {
        js: 0,
        css: 0,
        font: 0,
        image: 0,
        other: 0,
      };
      
      // Analyze resources
      entries.forEach((entry) => {
        const url = entry.name;
        const size = entry.transferSize || 0;
        
        if (url.endsWith('.js')) resources.js += size;
        else if (url.endsWith('.css')) resources.css += size;
        else if (/\.(woff2?|ttf|otf|eot)/.test(url)) resources.font += size;
        else if (/\.(jpe?g|png|gif|svg|webp|avif)/.test(url)) resources.image += size;
        else resources.other += size;
        
        // Track slow resources (over 1000ms)
        if (entry.duration > 1000) {
          console.warn(`[Performance] Slow resource: ${url} - ${entry.duration.toFixed(2)}ms`);
          
          // Send slow resource data to analytics in production
          if (process.env.NODE_ENV === 'production' && window.dataLayer) {
            window.dataLayer.push({
              event: 'slow-resource',
              event_category: 'Performance',
              event_action: 'Slow Resource',
              event_label: url,
              event_value: Math.round(entry.duration),
              non_interaction: true,
            });
          }
        }
      });
      
      // Record resource metrics against budgets
      recordMetric('JS Size', bytesToKB(resources.js), 'KB', PERFORMANCE_BUDGETS.JS);
      recordMetric('CSS Size', bytesToKB(resources.css), 'KB', PERFORMANCE_BUDGETS.CSS);
      recordMetric('Fonts Size', bytesToKB(resources.font), 'KB', PERFORMANCE_BUDGETS.FONTS);
      recordMetric('Images Size', bytesToKB(resources.image), 'KB', PERFORMANCE_BUDGETS.IMAGES);
    });
    
    // Navigation timing
    const navigationObserver = observe('navigation', (entries) => {
      const navEntry = entries[0];
      if (navEntry) {
        // Page load timing
        recordMetric('Load Time', navEntry.loadEventEnd - navEntry.startTime, 'ms', PERFORMANCE_BUDGETS.LOAD);
        recordMetric('DOM Content Loaded', navEntry.domContentLoadedEventEnd - navEntry.startTime, 'ms');
        recordMetric('Server Response Time', navEntry.responseEnd - navEntry.requestStart, 'ms');
        recordMetric('DOM Processing Time', navEntry.domComplete - navEntry.domInteractive, 'ms');
      }
    });
    
    // Layout shifts
    const layoutShiftObserver = observe('layout-shift', (entries) => {
      // Group shifts by cluster to avoid over-reporting
      const clusteredShifts = new Map();
      
      entries.forEach((entry) => {
        // Only process after page load (after hydration)
        const timeFromLoad = performance.now() - (window.performance.timing?.loadEventEnd || 0);
        if (timeFromLoad > 1000) {
          // Record details about large shifts
          if (entry.value > 0.05) {
            console.warn(`[Performance] Large layout shift: ${entry.value.toFixed(3)}`);
            
            // If we have element attribution, record what moved
            if (entry.sources) {
              entry.sources.forEach((source: any) => {
                if (source.node && source.node.nodeName) {
                  console.warn(`  - Element shifted: ${source.node.nodeName.toLowerCase()}`);
                }
              });
            }
          }
        }
      });
    });
    
    // Memory monitoring
    const monitorMemory = () => {
      if (window.performance && 'memory' in performance) {
        // Track memory usage every 10 seconds
        const memoryInterval = setInterval(() => {
          const memory = (performance as any).memory;
          if (memory) {
            recordMetric('JS Heap Size', bytesToKB(memory.usedJSHeapSize) / 1024, 'MB');
            recordMetric('JS Heap Limit', bytesToKB(memory.jsHeapSizeLimit) / 1024, 'MB');
            
            // Alert if memory usage is high (>80% of limit)
            const usageRatio = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
            if (usageRatio > 0.8) {
              console.warn(`[Performance] High memory usage: ${(usageRatio * 100).toFixed(1)}% of limit`);
            }
          }
        }, 10000);
        
        return () => clearInterval(memoryInterval);
      }
      return undefined;
    };
    
    const memoryCleanup = monitorMemory();
    
    // Long task detection
    const longTaskObserver = observe('longtask', (entries) => {
      entries.forEach(entry => {
        recordMetric('Long Task', entry.duration, 'ms');
        
        // Report long tasks that block the main thread significantly
        if (entry.duration > 100) {
          console.warn(`[Performance] Long task: ${entry.duration.toFixed(2)}ms`);
        }
      });
    });
    
    // Custom route change timing for SPAs
    if (typeof window !== 'undefined') {
      // Start tracking time on link click
      document.addEventListener('click', (e) => {
        const target = e.target as Element;
        const link = target.closest('a');
        if (link && link.href && link.href.startsWith(window.location.origin)) {
          performance.mark('route_change_start');
        }
      });
      
      // Complete timing after the route fully renders (approximation)
      window.addEventListener('load', () => {
        try {
          performance.mark('route_load_complete');
          performance.measure('route_change_to_load', 'route_change_start', 'route_load_complete');
          
          const measure = performance.getEntriesByName('route_change_to_load')[0];
          if (measure) {
            recordMetric('Route Change', measure.duration, 'ms');
          }
        } catch (e) {
          // Silently fail if marks don't exist
        }
      });
    }
    
    // Cleanup all observers on unmount
    return () => {
      if (resourceObserver) resourceObserver.disconnect();
      if (navigationObserver) navigationObserver.disconnect();
      if (layoutShiftObserver) layoutShiftObserver.disconnect();
      if (longTaskObserver) longTaskObserver.disconnect();
      if (memoryCleanup) memoryCleanup();
    };
  }, []); // Run once on mount
  
  // This component doesn't render anything
  return null;
}

export default EnhancedPerformanceMonitor;