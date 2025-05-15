/**
 * SSR-safe analytics implementation
 * This file safely handles analytics in both server and client environments
 */

// Define event types
export const careAtinEvents = {
  HERO_CTA_CLICK: { action: 'click', category: 'hero', label: 'primary_cta' },
  PRODUCT_VIEW: { action: 'view', category: 'product', label: 'product_detail' },
  FEATURE_INTERACTION: { action: 'interact', category: 'feature' },
  SECTION_VIEW: { action: 'view', category: 'section' },
  ADD_TO_CART: { action: 'click', category: 'cart', label: 'add_item' }
};

// Type definitions
type TrackingEvent = {
  action: string;
  category: string;
  label?: string;
};

// SSR-safe page tracking hook
export function useCareAtinPageTracking() {
  // Server-side: return no-op function
  if (typeof window === 'undefined') {
    return { trackEvent: () => {} };
  }
  
  // Client-side: import and use client-side analytics
  // This won't be executed during SSR
  try {
    // Load the event tracking functionality
    const trackEvent = (event: TrackingEvent, properties = {}) => {
      // Only runs in browser
      if (typeof window !== 'undefined') {
        console.log('Analytics event tracked:', event);
        // Here we would normally call the actual tracking logic
        // But we'll defer that to a client-side module
      }
    };
    
    return { trackEvent };
  } catch (error) {
    // Safely handle any errors
    console.error('Analytics failed to initialize', error);
    return { trackEvent: () => {} };
  }
}

// Safe server-side stubs for all analytics functions
export function trackEvent(event?: TrackingEvent | string, category?: string, label?: string) {
  // No-op implementation for server
  if (typeof window !== 'undefined') {
    // Import client analytics only on client-side
    import('./client-analytics').then(analytics => {
      if (typeof event === 'string') {
        // Handle call pattern: trackEvent(action, category, label)
        analytics.trackClientEvent(event, category || '', label);
      } else if (event) {
        // Handle call pattern: trackEvent({ action, category, label })
        analytics.trackClientEvent(event.action, event.category, event.label);
      }
    }).catch(err => {
      console.error('Failed to load client analytics:', err);
    });
  }
}

// Export a serializable analytics config object
export const analyticsConfig = {
  enabled: true,
  trackingId: 'G-KH4FC8SN8F', // This is safe to include in SSR
  anonymizeIp: true
};
