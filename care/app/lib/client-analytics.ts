// Client-side only analytics for care•atin
// This file is safe to import as it only runs on the client

export function initClientAnalytics() {
  // Ensure we're in the browser
  if (typeof window === 'undefined') return;

  // Initialize Google Analytics if available
  if (typeof window.gtag !== 'undefined') {
    console.log('care•atin: Google Analytics initialized');
    
    // Track page view
    window.gtag('config', 'G-KH4FC8SN8F', {
      brand: 'care_atin',
      wellness_focus: true,
      tech_innovation: true
    });
  }

  // Initialize Facebook Pixel if available
  if (typeof window.fbq !== 'undefined') {
    console.log('care•atin: Facebook Pixel initialized');
    window.fbq('track', 'PageView', {
      brand: 'care_atin',
      wellness_context: true
    });
  }

  // Track errors
  window.addEventListener('error', (event) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'javascript_error', {
        event_category: 'technical',
        event_label: event.message,
        brand: 'care_atin'
      });
    }
  });

  console.log('care•atin analytics initialized successfully');
}

// Simple event tracking function
export function trackClientEvent(action: string, category: string, label?: string) {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      brand: 'care_atin',
      wellness_context: true
    });
  }

  if (typeof window.fbq !== 'undefined') {
    window.fbq('trackCustom', `careatin_${category}_${action}`, {
      label: label,
      brand: 'care_atin'
    });
  }
}

// Track button clicks
export function trackButtonClick(buttonName: string) {
  trackClientEvent('click', 'button', buttonName);
}

// Track section views
export function trackSectionView(sectionName: string) {
  trackClientEvent('view', 'section', sectionName);
}

// Track wellness journey engagement
export function trackWellnessJourney(action: string, detail?: string) {
  trackClientEvent(action, 'wellness_journey', detail);
}

// Track tech innovation interactions
export function trackTechInnovation(feature: string) {
  trackClientEvent('interact', 'tech_innovation', feature);
}

// Auto-initialize when script loads
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initClientAnalytics);
  } else {
    initClientAnalytics();
  }
}
