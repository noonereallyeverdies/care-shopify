/**
 * React hooks for analytics tracking
 * 
 * Provides convenient hooks for component-level analytics tracking
 * with the consolidated analytics manager.
 */

import { useEffect, useCallback, useRef } from 'react';
import { analytics, type AnalyticsEvent } from '~/lib/analytics-manager';

/**
 * Hook to track component mount/unmount
 */
export function useAnalyticsPageView(pageName?: string) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      analytics.trackPageView(pageName);
    }
  }, [pageName]);
}

/**
 * Hook to track section visibility using Intersection Observer
 */
export function useAnalyticsSectionView(sectionName: string, threshold = 0.5) {
  const elementRef = useRef<HTMLElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            analytics.trackSectionView(sectionName);
            hasTracked.current = true;
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [sectionName, threshold]);

  return elementRef;
}

/**
 * Hook for button click tracking
 */
export function useAnalyticsButtonClick() {
  return useCallback((buttonName: string, category?: string) => {
    if (typeof window !== 'undefined') {
      analytics.trackButtonClick(buttonName, category);
    }
  }, []);
}

/**
 * Hook for wellness journey tracking
 */
export function useAnalyticsWellnessJourney() {
  return useCallback((action: string, detail?: string) => {
    if (typeof window !== 'undefined') {
      analytics.trackWellnessJourney(action, detail);
    }
  }, []);
}

/**
 * Hook for tech feature tracking
 */
export function useAnalyticsTechFeature() {
  return useCallback((feature: string, action?: string) => {
    if (typeof window !== 'undefined') {
      analytics.trackTechFeature(feature, action);
    }
  }, []);
}

/**
 * Hook for custom event tracking
 */
export function useAnalyticsTrack() {
  return useCallback((event: AnalyticsEvent) => {
    if (typeof window !== 'undefined') {
      analytics.track(event);
    }
  }, []);
}

/**
 * Hook for form analytics
 */
export function useAnalyticsForm(formName: string) {
  const trackFormStart = useCallback(() => {
    analytics.track({
      action: 'form_start',
      category: 'form',
      label: formName,
      custom_parameters: {
        form_name: formName,
        brand: 'care_atin'
      }
    });
  }, [formName]);

  const trackFormSubmit = useCallback((success = true) => {
    analytics.track({
      action: success ? 'form_submit_success' : 'form_submit_failure',
      category: 'form',
      label: formName,
      custom_parameters: {
        form_name: formName,
        success,
        brand: 'care_atin'
      }
    });
  }, [formName]);

  const trackFormFieldFocus = useCallback((fieldName: string) => {
    analytics.track({
      action: 'form_field_focus',
      category: 'form',
      label: `${formName}_${fieldName}`,
      custom_parameters: {
        form_name: formName,
        field_name: fieldName,
        brand: 'care_atin'
      }
    });
  }, [formName]);

  return {
    trackFormStart,
    trackFormSubmit,
    trackFormFieldFocus
  };
}

/**
 * Hook for product analytics
 */
export function useAnalyticsProduct() {
  const trackProductView = useCallback((productId: string, productName: string) => {
    analytics.track({
      action: 'product_view',
      category: 'product',
      label: productName,
      custom_parameters: {
        product_id: productId,
        product_name: productName,
        brand: 'care_atin'
      }
    });
  }, []);

  const trackAddToCart = useCallback((productId: string, productName: string, quantity = 1) => {
    analytics.track({
      action: 'add_to_cart',
      category: 'ecommerce',
      label: productName,
      value: quantity,
      custom_parameters: {
        product_id: productId,
        product_name: productName,
        quantity,
        brand: 'care_atin'
      }
    });
  }, []);

  const trackRemoveFromCart = useCallback((productId: string, productName: string) => {
    analytics.track({
      action: 'remove_from_cart',
      category: 'ecommerce',
      label: productName,
      custom_parameters: {
        product_id: productId,
        product_name: productName,
        brand: 'care_atin'
      }
    });
  }, []);

  return {
    trackProductView,
    trackAddToCart,
    trackRemoveFromCart
  };
}

/**
 * Hook for video analytics
 */
export function useAnalyticsVideo(videoName: string) {
  const trackVideoPlay = useCallback(() => {
    analytics.track({
      action: 'video_play',
      category: 'media',
      label: videoName,
      custom_parameters: {
        video_name: videoName,
        brand: 'care_atin'
      }
    });
  }, [videoName]);

  const trackVideoPause = useCallback((currentTime: number) => {
    analytics.track({
      action: 'video_pause',
      category: 'media',
      label: videoName,
      custom_parameters: {
        video_name: videoName,
        current_time: currentTime,
        brand: 'care_atin'
      }
    });
  }, [videoName]);

  const trackVideoEnd = useCallback(() => {
    analytics.track({
      action: 'video_complete',
      category: 'media',
      label: videoName,
      custom_parameters: {
        video_name: videoName,
        brand: 'care_atin'
      }
    });
  }, [videoName]);

  return {
    trackVideoPlay,
    trackVideoPause,
    trackVideoEnd
  };
}

/**
 * Hook for search analytics
 */
export function useAnalyticsSearch() {
  const trackSearch = useCallback((query: string, resultsCount?: number) => {
    analytics.track({
      action: 'search',
      category: 'search',
      label: query,
      custom_parameters: {
        search_query: query,
        results_count: resultsCount,
        brand: 'care_atin'
      }
    });
  }, []);

  return { trackSearch };
}
