// Temporary analytics file with stub implementations
// This allows the app to build without serialization issues

// Simple no-op tracking function
export function useCareAtinPageTracking(): void {
  // No-op implementation for SSR compatibility
  console.log('Analytics tracking disabled in development mode');
}

// Export other stub functions if needed
export const careAtinEvents = {
  HERO_CTA_CLICK: { action: 'click', category: 'hero', label: 'primary_cta' }
};

export function trackEvent(): void {
  // No-op implementation
}

export function trackPageView(): void {
  // No-op implementation
}

export function trackPerformanceMetrics(): void {
  // No-op implementation
}

export function initCareAtinTracking(): void {
  // No-op implementation
} 