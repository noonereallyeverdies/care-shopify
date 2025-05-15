/**
 * Performance Budgets Configuration
 * 
 * Defines performance budgets for different aspects of the application
 * including Core Web Vitals, bundle sizes, and resource loading times.
 */

// Core Web Vitals budgets (in milliseconds, except CLS)
export const CORE_WEB_VITALS_BUDGETS = {
  // Largest Contentful Paint (LCP)
  LCP: {
    good: 2500,
    needsImprovement: 4000,
    poor: 4000,
  },
  
  // First Input Delay (FID)
  FID: {
    good: 100,
    needsImprovement: 300,
    poor: 300,
  },
  
  // Cumulative Layout Shift (CLS) - unitless score
  CLS: {
    good: 0.1,
    needsImprovement: 0.25,
    poor: 0.25,
  },
  
  // First Contentful Paint (FCP)
  FCP: {
    good: 1800,
    needsImprovement: 3000,
    poor: 3000,
  },
  
  // Time to First Byte (TTFB)
  TTFB: {
    good: 800,
    needsImprovement: 1800,
    poor: 1800,
  },
  
  // Interaction to Next Paint (INP) - replaces FID
  INP: {
    good: 200,
    needsImprovement: 500,
    poor: 500,
  },
};

// Bundle size budgets (in bytes)
export const BUNDLE_SIZE_BUDGETS = {
  // JavaScript
  javascript: {
    main: 300 * 1024,        // 300KB main bundle
    vendor: 200 * 1024,      // 200KB vendor libraries
    chunks: 150 * 1024,      // 150KB per lazy chunk
    total: 800 * 1024,       // 800KB total JS
    gzippedTotal: 300 * 1024, // 300KB gzipped total
  },
  
  // CSS
  css: {
    main: 50 * 1024,         // 50KB main CSS
    total: 100 * 1024,       // 100KB total CSS
    gzippedTotal: 30 * 1024, // 30KB gzipped total
  },
  
  // Images
  images: {
    hero: 150 * 1024,        // 150KB hero image
    product: 100 * 1024,     // 100KB product images
    total: 2 * 1024 * 1024,  // 2MB total images
  },
  
  // Fonts
  fonts: {
    family: 100 * 1024,      // 100KB per font family
    total: 500 * 1024,       // 500KB total fonts
  },
  
  // Overall bundle
  total: {
    uncompressed: 1.5 * 1024 * 1024,  // 1.5MB total
    gzipped: 500 * 1024,              // 500KB gzipped
  },
};

// Resource loading budgets (in milliseconds)
export const RESOURCE_LOADING_BUDGETS = {
  // Critical resources (above the fold)
  critical: {
    css: 1000,               // Critical CSS load time
    fonts: 2000,             // Font load time
    heroImage: 2500,         // Hero image load time
    javascript: 3000,        // Critical JS load time
  },
  
  // Non-critical resources
  nonCritical: {
    css: 3000,               // Non-critical CSS
    javascript: 5000,        // Non-critical JS
    images: 3000,            // Non-critical images
  },
  
  // Third-party resources
  thirdParty: {
    analytics: 2000,         // Analytics scripts
    chatWidget: 3000,        // Chat widgets
    embedsAndPlugins: 4000,  // Embeds and plugins
  },
};

// Page-specific budgets
export const PAGE_SPECIFIC_BUDGETS = {
  homepage: {
    LCP: 2000,               // Homepage LCP should be faster
    totalBundleSize: 1 * 1024 * 1024,  // 1MB for homepage
    criticalCSS: 40 * 1024,  // 40KB critical CSS
  },
  
  productPage: {
    LCP: 2500,
    totalBundleSize: 1.2 * 1024 * 1024,  // 1.2MB for product pages
    productImageLoad: 2000,   // Product images should load quickly
  },
  
  collectionPage: {
    LCP: 3000,
    totalBundleSize: 1.3 * 1024 * 1024,  // 1.3MB for collection pages
    productGridLoad: 3000,    // Product grid load time
  },
  
  checkoutPage: {
    LCP: 2000,               // Checkout should be very fast
    FID: 50,                 // Checkout interactions must be instant
    totalBundleSize: 800 * 1024,  // 800KB for checkout
  },
  
  cartPage: {
    LCP: 2000,
    FID: 100,
    totalBundleSize: 800 * 1024,
  },
};

// Device-specific budgets
export const DEVICE_SPECIFIC_BUDGETS = {
  mobile: {
    // Stricter budgets for mobile
    LCP: CORE_WEB_VITALS_BUDGETS.LCP.good,
    FID: CORE_WEB_VITALS_BUDGETS.FID.good * 0.8,  // 20% stricter
    totalBundleSize: BUNDLE_SIZE_BUDGETS.total.gzipped * 0.8,  // 400KB
  },
  
  tablet: {
    // Moderate budgets for tablet
    LCP: CORE_WEB_VITALS_BUDGETS.LCP.good * 1.1,
    FID: CORE_WEB_VITALS_BUDGETS.FID.good,
    totalBundleSize: BUNDLE_SIZE_BUDGETS.total.gzipped,
  },
  
  desktop: {
    // Standard budgets for desktop
    LCP: CORE_WEB_VITALS_BUDGETS.LCP.good * 1.2,
    FID: CORE_WEB_VITALS_BUDGETS.FID.good * 1.2,
    totalBundleSize: BUNDLE_SIZE_BUDGETS.total.uncompressed,
  },
};

// Network-specific budgets
export const NETWORK_SPECIFIC_BUDGETS = {
  // Slow 3G (1.6 Mbps down, 150ms RTT)
  slow3G: {
    LCP: 5000,
    FID: 200,
    TTFB: 2000,
    totalBundleSize: 300 * 1024,  // 300KB total
  },
  
  // Fast 3G (1.6 Mbps down, 150ms RTT)
  fast3G: {
    LCP: 4000,
    FID: 150,
    TTFB: 1500,
    totalBundleSize: 500 * 1024,  // 500KB total
  },
  
  // 4G (9 Mbps down, 170ms RTT)
  '4g': {
    LCP: 3000,
    FID: 100,
    TTFB: 1000,
    totalBundleSize: 800 * 1024,  // 800KB total
  },
  
  // WiFi/Cable
  wifi: {
    LCP: 2500,
    FID: 100,
    TTFB: 800,
    totalBundleSize: 1.5 * 1024 * 1024,  // 1.5MB total
  },
};

// Shopify-specific budgets
export const SHOPIFY_SPECIFIC_BUDGETS = {
  // Checkout flow
  checkout: {
    stepTransition: 500,      // Time between checkout steps
    paymentProcessing: 3000,  // Payment processing time
    orderConfirmation: 2000,  // Order confirmation load time
  },
  
  // Product interactions
  product: {
    variantSwitch: 200,       // Variant switching time
    addToCart: 500,           // Add to cart response time
    imageZoom: 300,           // Product image zoom time
  },
  
  // Cart operations
  cart: {
    itemAdd: 300,             // Add item to cart
    itemRemove: 300,          // Remove item from cart
    quantityUpdate: 300,      // Update quantity
    cartUpdate: 500,          // Full cart update
  },
  
  // Search and filtering
  search: {
    autocomplete: 200,        // Search autocomplete
    results: 1000,            // Search results load time
    filterApply: 500,         // Filter application time
  },
};

// Budget enforcement levels
export const BUDGET_ENFORCEMENT = {
  // Error - Build fails, blocks deployment
  error: {
    coreBudgetExceeded: 1.5,    // 150% of budget
    bundleSizeExceeded: 1.3,    // 130% of budget
    criticalResourceSlow: 1.5,   // 150% of budget
  },
  
  // Warning - Shows warning but doesn't block
  warning: {
    coreBudgetExceeded: 1.2,    // 120% of budget
    bundleSizeExceeded: 1.1,    // 110% of budget
    criticalResourceSlow: 1.2,   // 120% of budget
  },
  
  // Info - Just logs information
  info: {
    coreBudgetExceeded: 1.0,    // 100% of budget
    bundleSizeExceeded: 1.0,    // 100% of budget
    criticalResourceSlow: 1.0,   // 100% of budget
  },
};

// Budget calculation utilities
export class PerformanceBudgetCalculator {
  /**
   * Get budget for specific page and device
   */
  static getBudgetForPage(
    pageType: keyof typeof PAGE_SPECIFIC_BUDGETS,
    deviceType: keyof typeof DEVICE_SPECIFIC_BUDGETS,
    networkType: keyof typeof NETWORK_SPECIFIC_BUDGETS
  ) {
    const pageBudget = PAGE_SPECIFIC_BUDGETS[pageType] || {};
    const deviceBudget = DEVICE_SPECIFIC_BUDGETS[deviceType] || {};
    const networkBudget = NETWORK_SPECIFIC_BUDGETS[networkType] || {};
    
    // Merge budgets with network taking precedence over device over page over default
    return {
      ...CORE_WEB_VITALS_BUDGETS,
      ...BUNDLE_SIZE_BUDGETS,
      ...pageBudget,
      ...deviceBudget,
      ...networkBudget,
    };
  }
  
  /**
   * Check if metric exceeds budget
   */
  static checkBudget(
    metricName: string,
    value: number,
    budget: any,
    enforcementLevel: keyof typeof BUDGET_ENFORCEMENT = 'warning'
  ): {
    passed: boolean;
    status: 'pass' | 'info' | 'warning' | 'error';
    percentage: number;
    message: string;
  } {
    const budgetValue = this.getBudgetValue(budget, metricName);
    if (!budgetValue) {
      return {
        passed: true,
        status: 'pass',
        percentage: 0,
        message: `No budget defined for ${metricName}`,
      };
    }
    
    const percentage = (value / budgetValue) * 100;
    const threshold = BUDGET_ENFORCEMENT[enforcementLevel];
    
    let status: 'pass' | 'info' | 'warning' | 'error' = 'pass';
    
    if (value > budgetValue * threshold.coreBudgetExceeded) {
      status = 'error';
    } else if (value > budgetValue * threshold.warning.coreBudgetExceeded) {
      status = 'warning';
    } else if (value > budgetValue) {
      status = 'info';
    }
    
    return {
      passed: status === 'pass',
      status,
      percentage,
      message: `${metricName}: ${value} (${percentage.toFixed(1)}% of budget ${budgetValue})`,
    };
  }
  
  /**
   * Get budget value for metric
   */
  private static getBudgetValue(budget: any, metricName: string): number | null {
    // Handle nested budget objects
    const parts = metricName.split('.');
    let current = budget;
    
    for (const part of parts) {
      if (current && typeof current === 'object') {
        current = current[part];
      } else {
        return null;
      }
    }
    
    // Handle budget objects with good/warning/poor structure
    if (current && typeof current === 'object' && 'good' in current) {
      return current.good;
    }
    
    return typeof current === 'number' ? current : null;
  }
  
  /**
   * Generate budget report
   */
  static generateBudgetReport(
    metrics: Record<string, number>,
    pageType: keyof typeof PAGE_SPECIFIC_BUDGETS,
    deviceType: keyof typeof DEVICE_SPECIFIC_BUDGETS,
    networkType: keyof typeof NETWORK_SPECIFIC_BUDGETS
  ) {
    const budget = this.getBudgetForPage(pageType, deviceType, networkType);
    const results: Array<{
      metric: string;
      value: number;
      budget: number;
      status: string;
      percentage: number;
    }> = [];
    
    Object.entries(metrics).forEach(([metric, value]) => {
      const check = this.checkBudget(metric, value, budget);
      const budgetValue = this.getBudgetValue(budget, metric);
      
      if (budgetValue) {
        results.push({
          metric,
          value,
          budget: budgetValue,
          status: check.status,
          percentage: check.percentage,
        });
      }
    });
    
    return {
      results,
      summary: {
        total: results.length,
        passed: results.filter(r => r.status === 'pass').length,
        warnings: results.filter(r => r.status === 'warning').length,
        errors: results.filter(r => r.status === 'error').length,
      },
    };
  }
}

// Export budget configurations
export const PERFORMANCE_BUDGETS = {
  coreWebVitals: CORE_WEB_VITALS_BUDGETS,
  bundleSize: BUNDLE_SIZE_BUDGETS,
  resourceLoading: RESOURCE_LOADING_BUDGETS,
  pageSpecific: PAGE_SPECIFIC_BUDGETS,
  deviceSpecific: DEVICE_SPECIFIC_BUDGETS,
  networkSpecific: NETWORK_SPECIFIC_BUDGETS,
  shopifySpecific: SHOPIFY_SPECIFIC_BUDGETS,
  enforcement: BUDGET_ENFORCEMENT,
};

export default PERFORMANCE_BUDGETS;