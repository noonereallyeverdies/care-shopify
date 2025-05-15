/**
 * Core Web Vitals monitoring
 * This module integrates the web-vitals library to track Core Web Vitals metrics
 */
import type { Metric } from 'web-vitals';

// Add gtag type definition
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    webVitalsMonitor?: any;
  }
}

// Core Web Vitals thresholds based on Google's recommendations
export const CORE_WEB_VITALS_THRESHOLDS = {
  LCP: {
    GOOD: 2500,
    NEEDS_IMPROVEMENT: 4000,
  },
  FID: {
    GOOD: 100,
    NEEDS_IMPROVEMENT: 300,
  },
  CLS: {
    GOOD: 0.1,
    NEEDS_IMPROVEMENT: 0.25,
  },
  FCP: {
    GOOD: 1800,
    NEEDS_IMPROVEMENT: 3000,
  },
  TTFB: {
    GOOD: 800,
    NEEDS_IMPROVEMENT: 1800,
  },
  INP: {
    GOOD: 200,
    NEEDS_IMPROVEMENT: 500,
  }
};

// Configuration for the Web Vitals monitoring
interface WebVitalsConfig {
  // Enable debug messages for development
  debug?: boolean;
  
  // Sample rate to determine which users report metrics
  // Range: 0.0 to 1.0 (0% to 100%)
  sampleRate?: number;
  
  // Send metrics to Google Analytics (if available)
  googleAnalytics?: boolean;
  
  // Send metrics to Shopify Analytics (if available)
  shopifyAnalytics?: boolean;
  
  // Optional custom endpoint for submitting metrics
  customEndpoint?: string;
}

// Default configuration
const defaultConfig: WebVitalsConfig = {
  debug: false,
  sampleRate: 0.1, // Sample 10% by default
  googleAnalytics: true,
  shopifyAnalytics: false,
  customEndpoint: undefined
};

// Initialize web-vitals monitoring
export async function initializeWebVitalsMonitoring(config: WebVitalsConfig = defaultConfig): Promise<void> {
  // Apply defaults to partial config
  const fullConfig = { ...defaultConfig, ...config };
  
  // Only include some users based on sample rate
  if (Math.random() > (fullConfig.sampleRate || 0.1)) {
    if (fullConfig.debug) {
      console.debug('[Web Vitals] User skipped due to sampling');
    }
    return;
  }
  
  try {
    // Dynamically import web-vitals for better code splitting
    const { onCLS, onFID, onLCP, onFCP, onTTFB, onINP } = await import('web-vitals');
    
    if (fullConfig.debug) {
      console.debug('[Web Vitals] Monitoring initialized');
    }
    
    // Create a generic handler for all metrics
    const reportWebVital = (metric: Metric) => {
      if (fullConfig.debug) {
        console.debug(`[Web Vitals] ${metric.name}: ${metric.value}`);
      }
      
      // Send to Google Analytics if enabled and available
      if (fullConfig.googleAnalytics && typeof window.gtag === 'function') {
        window.gtag('event', 'web_vitals', {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          metric_id: metric.id,
          metric_name: metric.name,
          metric_value: metric.value,
          non_interaction: true,
        });
      }
      
      // Send to custom endpoint if provided
      if (fullConfig.customEndpoint) {
        const data = {
          name: metric.name,
          id: metric.id,
          value: metric.value,
          rating: metric.rating,
          delta: metric.delta,
          navigationType: metric.navigationType,
          timestamp: Date.now(),
          url: window.location.href,
        };
        
        try {
          // Use sendBeacon for better reliability during page unload
          if (navigator.sendBeacon) {
            const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
            navigator.sendBeacon(fullConfig.customEndpoint, blob);
          } else {
            // Fall back to fetch with keepalive
            fetch(fullConfig.customEndpoint, {
              method: 'POST',
              body: JSON.stringify(data),
              headers: { 'Content-Type': 'application/json' },
              keepalive: true,
            }).catch(err => {
              if (fullConfig.debug) {
                console.error('[Web Vitals] Error sending to endpoint:', err);
              }
            });
          }
        } catch (e) {
          if (fullConfig.debug) {
            console.error('[Web Vitals] Error sending data:', e);
          }
        }
      }
    };
    
    // Register all the metrics
    onCLS(reportWebVital);   // Cumulative Layout Shift
    onLCP(reportWebVital);   // Largest Contentful Paint
    onFID(reportWebVital);   // First Input Delay
    onFCP(reportWebVital);   // First Contentful Paint
    onTTFB(reportWebVital);  // Time to First Byte
    onINP(reportWebVital);   // Interaction to Next Paint
    
    return;
  } catch (error) {
    console.error('[Web Vitals] Failed to initialize monitoring:', error);
    throw error;
  }
}

// Helper functions to determine environment
export function isDevelopment(env?: any): boolean {
  return process.env.NODE_ENV === 'development';
}

export function isProduction(env?: any): boolean {
  return process.env.NODE_ENV === 'production';
}

export default { 
  initializeWebVitalsMonitoring,
  isDevelopment,
  isProduction
};