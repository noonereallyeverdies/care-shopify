/**
 * Critical CSS extraction and optimization utilities
 * Used to identify and inline critical CSS for faster page rendering
 */

// Define RouteData type instead of importing from ~/types
type RouteData = {
  id: string;
  path: string;
};

// Interface for Critical CSS configuration
export interface CriticalCSSConfig {
  enabled: boolean;
  inlineSize: number;
  excludedSelectors: Array<string | RegExp>;
  routes: Record<string, RouteCriticalCSSConfig>;
}

// Configuration for route-specific Critical CSS
export interface RouteCriticalCSSConfig {
  // CSS selector patterns to include for this route
  includeSelectors: string[];
  // Additional CSS rules to explicitly include
  additionalRules: string[];
  // Whether to include above-the-fold styles automatically
  extractAboveTheFold: boolean;
  // Routes that share similar critical CSS
  similarRoutes: string[];
}

// Default configuration for Critical CSS
export const defaultCriticalCSSConfig: CriticalCSSConfig = {
  enabled: true,
  inlineSize: 10 * 1024, // 10KB max inline size
  excludedSelectors: [
    // Animation classes (not critical)
    /\.*animate-/ as unknown as string,
    // Print styles
    /@media print/ as unknown as string,
    // Large background images
    /\.bg-hero-/ as unknown as string,
    // Non-critical utility classes
    /\.(opacity|rotate|scale|skew|translate)-/ as unknown as string,
  ],
  routes: {
    // Home page critical CSS
    'routes/($locale)._index': {
      includeSelectors: [
        // Header and hero section
        '.header', '.hero', '.hero-content',
        // Primary navigation
        '.nav', '.nav-item',
        // Above-the-fold product cards
        '.featured-products', '.product-card'
      ],
      additionalRules: [
        // Custom hero styling
        '.hero-gradient { background: linear-gradient(to right, var(--color-primary), var(--color-secondary)); }',
      ],
      extractAboveTheFold: true,
      similarRoutes: []
    },
    // Cart page critical CSS
    'routes/($locale).cart': {
      includeSelectors: [
        // Cart components
        '.cart', '.cart-item', '.cart-summary',
        // Checkout button
        '.checkout-button',
        // Line items
        '.line-item', '.quantity-adjuster'
      ],
      additionalRules: [],
      extractAboveTheFold: true,
      similarRoutes: ['routes/cart']
    },
    // Product page critical CSS
    'routes/($locale).products.$handle': {
      includeSelectors: [
        // Product details
        '.product-details', '.product-title', '.product-price',
        // Gallery
        '.product-gallery', '.product-image',
        // Add to cart
        '.add-to-cart', '.quantity-selector',
        // Reviews
        '.reviews-summary'
      ],
      additionalRules: [],
      extractAboveTheFold: true,
      similarRoutes: ['routes/products/$handle']
    }
  }
};

/**
 * Extract critical CSS for a specific route
 */
export function extractCriticalCSS(
  fullCSS: string,
  routeId: string,
  config: CriticalCSSConfig = defaultCriticalCSSConfig
): string {
  if (!config.enabled) return '';
  
  // Get route config or use empty default
  const routeConfig = config.routes[routeId] || {
    includeSelectors: [],
    additionalRules: [],
    extractAboveTheFold: false,
    similarRoutes: []
  };
  
  // Parse the CSS
  const rules = parseCSS(fullCSS);
  
  // Filter rules based on selectors
  const criticalRules = rules.filter(rule => {
    // Skip excluded selectors
    for (const excludePattern of config.excludedSelectors) {
      if (typeof excludePattern === 'string') {
        if (rule.selector.includes(excludePattern)) return false;
      } else if (excludePattern instanceof RegExp) {
        if (excludePattern.test(rule.selector)) return false;
      }
    }
    
    // Include if it matches route-specific selectors
    for (const includeSelector of routeConfig.includeSelectors) {
      if (rule.selector.includes(includeSelector)) return true;
    }
    
    // Include common critical selectors for all routes
    const commonCriticalSelectors = [
      'html', 'body', 'a', '.container', '.sr-only',
      '.header', '.main-content', '.visually-hidden'
    ];
    
    for (const selector of commonCriticalSelectors) {
      if (rule.selector.includes(selector)) return true;
    }
    
    return false;
  });
  
  // Convert back to CSS string
  let criticalCSS = criticalRules.map(rule => 
    `${rule.selector} { ${rule.properties} }`
  ).join('\n');
  
  // Add route-specific additional rules
  if (routeConfig.additionalRules.length > 0) {
    criticalCSS += '\n' + routeConfig.additionalRules.join('\n');
  }
  
  // Ensure the size is under the limit
  if (criticalCSS.length > config.inlineSize) {
    console.warn(`Critical CSS for route ${routeId} exceeds size limit (${criticalCSS.length} > ${config.inlineSize})`);
    // TODO: Implement better size reduction strategy if needed
  }
  
  return criticalCSS;
}

/**
 * Parse CSS text into rule objects
 */
function parseCSS(css: string): Array<{selector: string, properties: string}> {
  const rules: Array<{selector: string, properties: string}> = [];
  
  // Simple CSS parser for demonstration
  // In production, use a proper CSS parser library
  const ruleRegex = /([^{]+)\{([^}]+)\}/g;
  let match;
  
  while ((match = ruleRegex.exec(css)) !== null) {
    const selector = match[1].trim();
    const properties = match[2].trim();
    
    // Skip @-rules for this simple implementation
    if (selector.startsWith('@')) continue;
    
    rules.push({
      selector,
      properties
    });
  }
  
  return rules;
}

/**
 * Get critical CSS for the current route
 */
export function getCriticalCSSForRoute(
  routeId: string, 
  allCSS: string,
  config: CriticalCSSConfig = defaultCriticalCSSConfig
): string {
  // Check if we have cached this route's critical CSS
  const cachedCSS = getCachedCriticalCSS(routeId);
  if (cachedCSS) return cachedCSS;
  
  // Extract critical CSS
  const criticalCSS = extractCriticalCSS(allCSS, routeId, config);
  
  // Cache for future use
  cacheCriticalCSS(routeId, criticalCSS);
  
  return criticalCSS;
}

/**
 * Cache critical CSS for a route
 */
function cacheCriticalCSS(routeId: string, css: string): void {
  // In a real implementation, this would use a proper cache mechanism
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`critical-css:${routeId}`, css);
    } catch (e) {
      console.error('Failed to cache critical CSS:', e);
    }
  }
}

/**
 * Get cached critical CSS for a route
 */
function getCachedCriticalCSS(routeId: string): string | null {
  // In a real implementation, this would use a proper cache mechanism
  if (typeof window !== 'undefined') {
    try {
      return localStorage.getItem(`critical-css:${routeId}`);
    } catch (e) {
      console.error('Failed to retrieve cached critical CSS:', e);
    }
  }
  return null;
}

/**
 * Analyze CSS usage on the current page
 * This runs in the browser to identify used styles
 */
export function analyzePageCSSUsage(): {used: string[], unused: string[]} {
  if (typeof window === 'undefined') {
    return { used: [], unused: [] };
  }
  
  const usedSelectors: string[] = [];
  const unusedSelectors: string[] = [];
  
  // Get all stylesheets
  const styleSheets = Array.from(document.styleSheets);
  
  styleSheets.forEach(sheet => {
    try {
      // Skip external stylesheets
      if (!sheet.href || !sheet.href.startsWith(window.location.origin)) return;
      
      // Get all rules
      const rules = Array.from(sheet.cssRules || sheet.rules || []);
      
      rules.forEach(rule => {
        // Only process style rules (not @-rules)
        if (rule.type !== 1) return;
        
        const styleRule = rule as CSSStyleRule;
        const selector = styleRule.selectorText;
        
        try {
          // Test if any elements match this selector
          const elements = document.querySelectorAll(selector);
          if (elements.length > 0) {
            usedSelectors.push(selector);
          } else {
            unusedSelectors.push(selector);
          }
        } catch (e) {
          // Invalid selector, skip
        }
      });
    } catch (e) {
      // CORS or other error, skip this stylesheet
    }
  });
  
  return {
    used: usedSelectors,
    unused: unusedSelectors
  };
}

/**
 * Detects critical elements above the fold
 */
export function detectAboveTheFoldElements(): Element[] {
  if (typeof window === 'undefined') return [];
  
  const viewportHeight = window.innerHeight;
  const elements: Element[] = [];
  
  // Get all elements
  const allElements = document.querySelectorAll('*');
  
  allElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    
    // Check if element is at least partially above the fold
    if (rect.top < viewportHeight) {
      elements.push(element);
    }
  });
  
  return elements;
}

/**
 * Generate CSS from above-the-fold elements
 */
export function generateAboveTheFoldCSS(): string {
  const elements = detectAboveTheFoldElements();
  const selectors = new Set<string>();
  
  elements.forEach(element => {
    // Get all classes
    const classes = Array.from(element.classList);
    if (classes.length > 0) {
      selectors.add('.' + classes.join('.'));
    }
    
    // Get element type
    const tagName = element.tagName.toLowerCase();
    selectors.add(tagName);
    
    // Get ID if present
    if (element.id) {
      selectors.add('#' + element.id);
    }
  });
  
  // This would need to be expanded to properly extract the CSS rules
  // for these selectors from the stylesheets
  return Array.from(selectors).join(',\n');
} 