/**
 * Consolidated Analytics Manager for Care-atin
 * 
 * This module provides a unified interface for all analytics tracking,
 * consolidating Google Analytics, Microsoft Clarity, and any future providers.
 * 
 * Features:
 * - Partytown integration for web worker analytics
 * - Lazy loading of analytics scripts
 * - Unified event tracking interface
 * - Error handling and fallbacks
 * - SSR-safe implementation
 */

// Analytics provider types
interface AnalyticsProvider {
  name: string;
  initialized: boolean;
  initialize: () => Promise<void>;
  track: (event: AnalyticsEvent) => void;
}

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

interface AnalyticsConfig {
  googleAnalytics: {
    measurementId: string;
    config?: Record<string, any>;
  };
  microsoftClarity: {
    projectId: string;
    config?: Record<string, any>;
  };
  partytown: {
    enabled: boolean;
    debug?: boolean;
  };
}

class AnalyticsManager {
  private providers: Map<string, AnalyticsProvider> = new Map();
  private config: AnalyticsConfig;
  private initialized = false;
  private isSSR = typeof window === 'undefined';
  private eventQueue: AnalyticsEvent[] = [];

  constructor(config: AnalyticsConfig) {
    this.config = config;
    
    if (!this.isSSR) {
      this.setupProviders();
    }
  }

  /**
   * Initialize all analytics providers
   */
  async initialize(): Promise<void> {
    if (this.isSSR || this.initialized) return;

    try {
      // Initialize all providers in parallel
      const initPromises = Array.from(this.providers.values()).map(
        provider => provider.initialize().catch(err => {
          console.warn(`Failed to initialize ${provider.name}:`, err);
        })
      );

      await Promise.all(initPromises);
      
      // Process queued events
      while (this.eventQueue.length > 0) {
        const event = this.eventQueue.shift();
        if (event) this.track(event);
      }

      this.initialized = true;
      console.log('Analytics Manager initialized successfully');
    } catch (error) {
      console.error('Analytics Manager initialization failed:', error);
    }
  }

  /**
   * Track an analytics event
   */
  track(event: AnalyticsEvent): void {
    if (this.isSSR) return;

    // Queue events until initialization is complete
    if (!this.initialized) {
      this.eventQueue.push(event);
      return;
    }

    // Send event to all initialized providers
    this.providers.forEach(provider => {
      if (provider.initialized) {
        try {
          provider.track(event);
        } catch (error) {
          console.warn(`${provider.name} tracking failed:`, error);
        }
      }
    });
  }

  /**
   * Track page views
   */
  trackPageView(path?: string): void {
    this.track({
      action: 'page_view',
      category: 'navigation',
      label: path || window.location.pathname,
      custom_parameters: {
        page_title: document.title,
        page_location: window.location.href,
      }
    });
  }

  /**
   * Track button clicks
   */
  trackButtonClick(buttonName: string, category = 'button'): void {
    this.track({
      action: 'click',
      category,
      label: buttonName,
      custom_parameters: {
        brand: 'care_atin',
        element_type: 'button'
      }
    });
  }

  /**
   * Track section views (for viewport intersection)
   */
  trackSectionView(sectionName: string): void {
    this.track({
      action: 'view',
      category: 'section',
      label: sectionName,
      custom_parameters: {
        brand: 'care_atin',
        element_type: 'section'
      }
    });
  }

  /**
   * Track wellness journey interactions
   */
  trackWellnessJourney(action: string, detail?: string): void {
    this.track({
      action,
      category: 'wellness_journey',
      label: detail,
      custom_parameters: {
        brand: 'care_atin',
        wellness_focus: true
      }
    });
  }

  /**
   * Track technology feature interactions
   */
  trackTechFeature(feature: string, action = 'interact'): void {
    this.track({
      action,
      category: 'tech_innovation',
      label: feature,
      custom_parameters: {
        brand: 'care_atin',
        tech_innovation: true
      }
    });
  }

  /**
   * Track errors
   */
  trackError(error: Error, context?: string): void {
    this.track({
      action: 'javascript_error',
      category: 'technical',
      label: error.message,
      custom_parameters: {
        error_context: context,
        error_stack: error.stack?.substring(0, 500),
        brand: 'care_atin'
      }
    });
  }

  /**
   * Setup analytics providers
   */
  private setupProviders(): void {
    // Google Analytics 4 Provider
    this.providers.set('ga4', {
      name: 'Google Analytics 4',
      initialized: false,
      initialize: async () => {
        const { measurementId, config } = this.config.googleAnalytics;
        
        if (this.config.partytown.enabled) {
          // Load GA4 via Partytown
          await this.loadWithPartytown(
            `https://www.googletagmanager.com/gtag/js?id=${measurementId}`,
            'ga4'
          );
        } else {
          // Standard loading
          await this.loadScript(`https://www.googletagmanager.com/gtag/js?id=${measurementId}`);
        }

        // Initialize gtag
        (window as any).dataLayer = (window as any).dataLayer || [];
        function gtag(...args: any[]) {
          (window as any).dataLayer.push(args);
        }
        (window as any).gtag = gtag;

        gtag('js', new Date());
        gtag('config', measurementId, {
          brand: 'care_atin',
          wellness_focus: true,
          tech_innovation: true,
          ...config
        });

        this.providers.get('ga4')!.initialized = true;
      },
      track: (event) => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', event.action, {
            event_category: event.category,
            event_label: event.label,
            value: event.value,
            ...event.custom_parameters
          });
        }
      }
    });

    // Microsoft Clarity Provider
    this.providers.set('clarity', {
      name: 'Microsoft Clarity',
      initialized: false,
      initialize: async () => {
        const { projectId } = this.config.microsoftClarity;
        
        if (this.config.partytown.enabled) {
          // Initialize Clarity via Partytown
          const w = window as any;
          w.clarity = w.clarity || function(...args: any[]) {
            (w.clarity.q = w.clarity.q || []).push(args);
          };
          
          await this.loadWithPartytown(
            `https://www.clarity.ms/tag/${projectId}`,
            'clarity'
          );
        } else {
          // Standard Clarity initialization
          const script = document.createElement('script');
          script.innerHTML = `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${projectId}");
          `;
          document.head.appendChild(script);
        }

        this.providers.get('clarity')!.initialized = true;
      },
      track: (event) => {
        if (typeof window !== 'undefined' && (window as any).clarity) {
          // Clarity doesn't have a direct event API like GA4
          // We can use custom events via clarity's set method
          (window as any).clarity('set', 'custom_event', {
            action: event.action,
            category: event.category,
            label: event.label,
            ...event.custom_parameters
          });
        }
      }
    });
  }

  /**
   * Load analytics script via Partytown
   */
  private async loadWithPartytown(src: string, provider: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/partytown';
      script.src = src;
      script.async = true;
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${provider} script`));
      
      document.head.appendChild(script);
    });
  }

  /**
   * Load script normally (fallback)
   */
  private async loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      
      document.head.appendChild(script);
    });
  }

  /**
   * Get provider status for debugging
   */
  getStatus(): { provider: string; initialized: boolean }[] {
    return Array.from(this.providers.entries()).map(([name, provider]) => ({
      provider: name,
      initialized: provider.initialized
    }));
  }
}

// Default configuration
export const defaultAnalyticsConfig: AnalyticsConfig = {
  googleAnalytics: {
    measurementId: 'G-KH4FC8SN8F',
    config: {
      send_page_view: false, // We'll send manually
      custom_map: { custom_parameter_1: 'brand' }
    }
  },
  microsoftClarity: {
    projectId: 'rhpnn7b8cz'
  },
  partytown: {
    enabled: true,
    debug: process.env.NODE_ENV === 'development'
  }
};

// Global analytics instance
let analyticsInstance: AnalyticsManager | null = null;

/**
 * Get or create the global analytics instance
 */
export function getAnalytics(config: AnalyticsConfig = defaultAnalyticsConfig): AnalyticsManager {
  if (!analyticsInstance) {
    analyticsInstance = new AnalyticsManager(config);
  }
  return analyticsInstance;
}

/**
 * Initialize analytics - call this in your app startup
 */
export async function initAnalytics(config?: AnalyticsConfig): Promise<AnalyticsManager> {
  const analytics = getAnalytics(config);
  await analytics.initialize();
  return analytics;
}

// Convenience exports for common tracking methods
export const analytics = {
  track: (event: AnalyticsEvent) => getAnalytics().track(event),
  trackPageView: (path?: string) => getAnalytics().trackPageView(path),
  trackButtonClick: (name: string, category?: string) => getAnalytics().trackButtonClick(name, category),
  trackSectionView: (name: string) => getAnalytics().trackSectionView(name),
  trackWellnessJourney: (action: string, detail?: string) => getAnalytics().trackWellnessJourney(action, detail),
  trackTechFeature: (feature: string, action?: string) => getAnalytics().trackTechFeature(feature, action),
  trackError: (error: Error, context?: string) => getAnalytics().trackError(error, context),
};

// Export types for external use
export type { AnalyticsEvent, AnalyticsConfig };
