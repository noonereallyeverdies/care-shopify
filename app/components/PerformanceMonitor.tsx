/**
 * Performance monitoring component to track Core Web Vitals
 * and other performance metrics
 */
import {useEffect} from 'react';
import {onLCP, onFID, onCLS, onINP, onTTFB, onFCP} from 'web-vitals';
import {ErrorSeverity} from '~/lib/monitoring/errorMonitor';
import {trackPerformance} from '~/lib/monitoring/sentry';

interface PerformanceMetrics {
  LCP?: number; // Largest Contentful Paint
  FID?: number; // First Input Delay
  CLS?: number; // Cumulative Layout Shift
  INP?: number; // Interaction to Next Paint
  TTFB?: number; // Time to First Byte
  FCP?: number; // First Contentful Paint
}

// Records the metrics
function recordMetric(name: string, value: number, unit: string) {
  const metric = {
    name,
    value,
    unit,
    timestamp: Date.now()
  };
  
  // In development, log to console
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Performance]', metric);
  }

  // Send to monitoring service
  trackPerformance('core-web-vitals', () => {
    // Send metric to your analytics service here
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'core_web_vitals',
        metric_name: name,
        metric_value: value,
        metric_unit: unit
      });
    }
  });
}

/**
 * PerformanceMonitor component to be mounted once at the root level
 * to track performance metrics
 */
export default function PerformanceMonitor() {
  useEffect(() => {
    // Track only in browser environment
    if (typeof window === 'undefined') return;
    
    // Don't measure performance for bots
    const userAgent = navigator.userAgent || '';
    if (/bot|crawler|spider|googlebot/i.test(userAgent)) return;
    
    // Register listeners for Core Web Vitals
    onLCP(({value}) => recordMetric('LCP', value, 'ms'));
    onFID(({value}) => recordMetric('FID', value, 'ms'));
    onCLS(({value}) => recordMetric('CLS', value, 'score'));
    onINP(({value}) => recordMetric('INP', value, 'ms'));
    onTTFB(({value}) => recordMetric('TTFB', value, 'ms'));
    onFCP(({value}) => recordMetric('FCP', value, 'ms'));
    
    // Track custom measurements - for example, time to interactive for key flows
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        recordMetric(entry.name, entry.duration, 'ms');
      });
    });
    
    observer.observe({entryTypes: ['measure']});
    
    // Custom metric for JS Heap size
    if (window.performance && performance.memory) {
      const measureMemory = () => {
        recordMetric(
          'JSHeapSize', 
          performance.memory.usedJSHeapSize / (1024 * 1024), 
          'MB'
        );
      };
      
      // Measure every 10 seconds
      const memoryInterval = setInterval(measureMemory, 10000);
      return () => clearInterval(memoryInterval);
    }
  }, []);

  // This component doesn't render anything
  return null;
}

/**
 * Utility function to mark the start of a custom performance measurement
 */
export function markStart(name: string) {
  if (typeof performance !== 'undefined') {
    performance.mark(`${name}-start`);
  }
}

/**
 * Utility function to mark the end of a custom performance measurement
 */
export function markEnd(name: string) {
  if (typeof performance !== 'undefined') {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
  }
}
