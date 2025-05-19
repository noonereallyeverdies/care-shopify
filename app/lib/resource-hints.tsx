/**
 * Enhanced resource hints utility with support for:
 * - Real user navigation patterns
 * - Prefetch and preconnect directives
 * - Priority hints
 * - Resource hints monitoring
 */
import { useLocation, useMatches } from '@remix-run/react';
import { useState, useEffect, useMemo } from 'react';

// Types for resource hints
export interface ResourceHint {
  rel: 'preload' | 'prefetch' | 'preconnect' | 'dns-prefetch' | 'modulepreload';
  href: string;
  as?: string;
  type?: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
  media?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
  importance?: 'high' | 'low' | 'auto';
}

// Navigation analytics type
interface NavigationPattern {
  from: string;
  to: string;
  frequency: number; // Percentage probability (0-100)
  medianTimeSpent: number; // Median time spent on "from" page in ms
}

// Critical domains to preconnect
export const CRITICAL_DOMAINS = [
  { domain: 'cdn.shopify.com', priority: 'high' },
  { domain: 'cdn.jsdelivr.net', priority: 'high' },
  { domain: 'fonts.googleapis.com', priority: 'high' },
  { domain: 'fonts.gstatic.com', priority: 'high' },
  { domain: 'connect.facebook.net', priority: 'low' },
  { domain: 'www.googletagmanager.com', priority: 'low' },
  { domain: 'www.google-analytics.com', priority: 'low' },
];

// Navigation patterns based on analytics data
// These values should ideally come from real analytics data
const NAVIGATION_PATTERNS: NavigationPattern[] = [
  // Homepage → Product page patterns
  { from: '^/$', to: '^/products/', frequency: 65, medianTimeSpent: 15000 },
  // Homepage → Collections patterns
  { from: '^/$', to: '^/collections/', frequency: 25, medianTimeSpent: 12000 },
  // Collections → Product patterns
  { from: '^/collections/', to: '^/products/', frequency: 80, medianTimeSpent: 20000 },
  // Product → Cart patterns
  { from: '^/products/', to: '^/cart', frequency: 15, medianTimeSpent: 45000 },
  // Product → Related product patterns
  { from: '^/products/', to: '^/products/', frequency: 20, medianTimeSpent: 30000 },
  // Cart → Checkout patterns
  { from: '^/cart', to: '^/checkouts/', frequency: 70, medianTimeSpent: 15000 },
];

// Critical resources by route with priority information
const ROUTE_CRITICAL_RESOURCES: Record<string, ResourceHint[]> = {
  // Homepage critical resources
  '^/$': [
    { 
      rel: 'preload', 
      href: '/fonts/IBMPlexSerif-Text.woff2', 
      as: 'font', 
      type: 'font/woff2', 
      crossOrigin: 'anonymous',
      fetchPriority: 'high'
    },
    { 
      rel: 'preload', 
      href: '/api/hero-banner', 
      as: 'fetch', 
      crossOrigin: 'anonymous',
      fetchPriority: 'high'
    },
    { 
      rel: 'modulepreload', 
      href: '/build/routes/($locale)._index-[hash].js',
      fetchPriority: 'high'
    },
  ],
  
  // Product page critical resources
  '^/products/': [
    { 
      rel: 'preload', 
      href: '/fonts/IBMPlexSerif-Text.woff2', 
      as: 'font', 
      type: 'font/woff2', 
      crossOrigin: 'anonymous',
      fetchPriority: 'high'
    },
    { 
      rel: 'preload', 
      href: '/styles/product.css', 
      as: 'style',
      fetchPriority: 'high'
    },
    { 
      rel: 'modulepreload', 
      href: '/build/routes/($locale).products.$handle-[hash].js',
      fetchPriority: 'high'
    },
  ],
  
  // Collection page critical resources
  '^/collections/': [
    { 
      rel: 'preload', 
      href: '/fonts/IBMPlexSerif-Text.woff2', 
      as: 'font', 
      type: 'font/woff2', 
      crossOrigin: 'anonymous',
      fetchPriority: 'high'
    },
    { 
      rel: 'preload', 
      href: '/styles/collection.css', 
      as: 'style',
      fetchPriority: 'high'
    },
    { 
      rel: 'modulepreload', 
      href: '/build/routes/($locale).collections.$collectionHandle-[hash].js',
      fetchPriority: 'high'
    },
  ],
  
  // Cart page critical resources
  '^/cart': [
    { 
      rel: 'preload', 
      href: '/fonts/IBMPlexSerif-Text.woff2', 
      as: 'font', 
      type: 'font/woff2', 
      crossOrigin: 'anonymous',
      fetchPriority: 'high'
    },
    { 
      rel: 'preload', 
      href: '/styles/cart.css', 
      as: 'style',
      fetchPriority: 'high'
    },
    { 
      rel: 'modulepreload', 
      href: '/build/routes/($locale).cart-[hash].js',
      fetchPriority: 'high'
    },
  ],
  
  // Default critical resources for all routes
  'default': [
    { 
      rel: 'preload', 
      href: '/fonts/IBMPlexSerif-Text.woff2', 
      as: 'font', 
      type: 'font/woff2', 
      crossOrigin: 'anonymous',
      fetchPriority: 'high'
    },
  ],
};

// Get prefetch targets based on current route and navigation patterns
function getPrefetchTargetsForRoute(currentRoute: string): ResourceHint[] {
  // Find navigation patterns that match the current route
  const relevantPatterns = NAVIGATION_PATTERNS.filter(pattern => 
    new RegExp(pattern.from).test(currentRoute)
  );
  
  // Sort by frequency (most likely transitions first)
  relevantPatterns.sort((a, b) => b.frequency - a.frequency);
  
  // Take top 3 most likely destinations
  const topDestinations = relevantPatterns.slice(0, 3);
  
  // Create prefetch hints
  return topDestinations.map(pattern => {
    // Convert RegExp-style pattern to a representative route
    const destination = pattern.to.replace('^', '').replace('$', '').replace(/\\/g, '');
    
    // Use our understanding of the route structure to determine the JS chunks to prefetch
    let moduleUrl = '';
    if (destination.includes('/products/')) {
      moduleUrl = '/build/routes/($locale).products.$handle-[hash].js';
    } else if (destination.includes('/collections/')) {
      moduleUrl = '/build/routes/($locale).collections.$collectionHandle-[hash].js';
    } else if (destination.includes('/cart')) {
      moduleUrl = '/build/routes/($locale).cart-[hash].js';
    } else if (destination === '/') {
      moduleUrl = '/build/routes/($locale)._index-[hash].js';
    }
    
    // Create a prefetch hint with appropriate priority
    if (moduleUrl) {
      return {
        rel: 'prefetch',
        href: moduleUrl,
        as: 'script',
        // Higher frequency → higher priority
        importance: pattern.frequency > 50 ? 'high' : 'low',
      } as ResourceHint;
    }
    
    // Fallback for unknown routes
    return null;
  }).filter(Boolean) as ResourceHint[];
}

/**
 * Get domain preconnect hints with priority information
 * @param includeCriticalDomains Whether to include critical domains in the results
 * @returns Array of preconnect resource hints
 */
export function getPreconnectHints(includeCriticalDomains = true): ResourceHint[] {
  const hints: ResourceHint[] = [];
  
  if (includeCriticalDomains) {
    CRITICAL_DOMAINS.forEach(({ domain, priority }) => {
      // Add preconnect
      hints.push({
        rel: 'preconnect',
        href: `https://${domain}`,
        crossOrigin: 'anonymous',
        fetchPriority: priority as 'high' | 'low' | 'auto',
      });
      
      // Add dns-prefetch as fallback for browsers that don't support preconnect
      hints.push({
        rel: 'dns-prefetch',
        href: `https://${domain}`,
      });
    });
  }
  
  return hints;
}

/**
 * Get resource hints for a specific route
 * @param pathname Current route pathname
 * @returns Array of resource hints for the route
 */
export function getResourceHintsForRoute(pathname: string): ResourceHint[] {
  // Start with preconnects to critical domains
  const hints = getPreconnectHints();
  
  // Find matching route pattern for critical resources
  const matchingPattern = Object.keys(ROUTE_CRITICAL_RESOURCES).find(pattern => {
    return new RegExp(pattern).test(pathname);
  });
  
  // Add route-specific critical hints
  if (matchingPattern) {
    hints.push(...ROUTE_CRITICAL_RESOURCES[matchingPattern]);
  } else {
    // Use default hints if no matching pattern
    hints.push(...ROUTE_CRITICAL_RESOURCES.default);
  }
  
  // Add prefetch hints for likely next pages
  const prefetchHints = getPrefetchTargetsForRoute(pathname);
  hints.push(...prefetchHints);
  
  // De-duplicate hints (in case there are overlaps)
  const deduplicatedHints: ResourceHint[] = [];
  const seenHints = new Set<string>();
  
  hints.forEach(hint => {
    const hintKey = `${hint.rel}-${hint.href}-${hint.as || ''}`;
    if (!seenHints.has(hintKey)) {
      seenHints.add(hintKey);
      deduplicatedHints.push(hint);
    }
  });
  
  return deduplicatedHints;
}

/**
 * React hook to get resource hints based on current route
 * @returns Array of resource hints for the current route
 */
export function useResourceHints(): ResourceHint[] {
  const location = useLocation();
  const matches = useMatches();
  
  // Track time spent on the current page for analytics
  const [pageEntryTime] = useState(Date.now());
  
  // Log page visit duration on navigation
  useEffect(() => {
    return () => {
      const timeSpent = Date.now() - pageEntryTime;
      if (typeof window !== 'undefined' && timeSpent > 1000) {
        // Log navigation pattern to localStorage for future enhancements
        try {
          const storedPatterns = JSON.parse(localStorage.getItem('navigationPatterns') || '[]');
          storedPatterns.push({
            from: location.pathname,
            timestamp: Date.now(),
            timeSpent,
          });
          
          // Keep only the last 100 patterns
          if (storedPatterns.length > 100) {
            storedPatterns.shift();
          }
          
          localStorage.setItem('navigationPatterns', JSON.stringify(storedPatterns));
        } catch (e) {
          // Silent fail if localStorage is not available
        }
      }
    };
  }, [location.pathname, pageEntryTime]);
  
  return useMemo(() => {
    // Get routes from matches to inform hint generation
    const routeIds = matches.map(match => match.id);
    
    // Use both exact pathname and route IDs to generate optimal hints
    return getResourceHintsForRoute(location.pathname);
  }, [location.pathname, matches]);
}

/**
 * Resource hints monitoring utility to track which hints were actually used
 */
export function monitorResourceHints() {
  if (typeof window === 'undefined' || typeof performance === 'undefined') return;
  
  // Use PerformanceObserver to track resource loads
  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries() as PerformanceResourceTiming[];
      
      // Collect resource timing data
      const resourceTimings = entries.map(entry => ({
        name: entry.name,
        initiatorType: entry.initiatorType,
        startTime: entry.startTime,
        duration: entry.duration,
        transferSize: entry.transferSize,
        decodedBodySize: entry.decodedBodySize,
      }));
      
      // Log resource timings for analysis
      if (process.env.NODE_ENV === 'development') {
        console.debug('[ResourceHints] Loaded resources:', resourceTimings);
      }
      
      // Store resource timing data for analysis
      try {
        // Get existing timing data
        const storedTimings = JSON.parse(sessionStorage.getItem('resourceTimings') || '[]');
        
        // Add new timings
        storedTimings.push(...resourceTimings);
        
        // Keep only most recent 100 entries
        if (storedTimings.length > 100) {
          storedTimings.splice(0, storedTimings.length - 100);
        }
        
        // Store updated timings
        sessionStorage.setItem('resourceTimings', JSON.stringify(storedTimings));
      } catch (e) {
        // Silent fail if sessionStorage is not available
      }
    });
    
    // Observe resource timings
    observer.observe({ entryTypes: ['resource'] });
    
    return observer;
  } catch (e) {
    console.warn('ResourceHints monitoring not supported in this browser');
    return null;
  }
}

/**
 * Analyze resource hints effectiveness
 * @returns Analysis of resource hints effectiveness
 */
export function analyzeResourceHintsEffectiveness() {
  if (typeof window === 'undefined') return null;
  
  try {
    // Get stored resource timings
    const storedTimings = JSON.parse(sessionStorage.getItem('resourceTimings') || '[]');
    
    // Get stored navigation patterns
    const storedPatterns = JSON.parse(localStorage.getItem('navigationPatterns') || '[]');
    
    // Analyze which preloaded resources were actually used
    const preloadedResources = document.querySelectorAll('link[rel="preload"], link[rel="prefetch"]');
    const preloadedUrls = Array.from(preloadedResources).map(el => (el as HTMLLinkElement).href);
    
    // Check which preloaded resources were actually loaded
    const usedPreloads = preloadedUrls.filter(url => 
      storedTimings.some((timing: any) => timing.name === url)
    );
    
    // Calculate effectiveness
    const effectiveness = preloadedUrls.length > 0 
      ? (usedPreloads.length / preloadedUrls.length) * 100 
      : 0;
    
    // Analyze navigation patterns
    const patternFrequency: Record<string, number> = {};
    
    if (storedPatterns.length > 1) {
      for (let i = 0; i < storedPatterns.length - 1; i++) {
        const from = storedPatterns[i].from;
        const to = storedPatterns[i + 1].from;
        
        const key = `${from}→${to}`;
        patternFrequency[key] = (patternFrequency[key] || 0) + 1;
      }
    }
    
    return {
      preloadedResources: preloadedUrls.length,
      usedPreloads: usedPreloads.length,
      effectiveness: effectiveness.toFixed(2) + '%',
      navigationPatterns: Object.entries(patternFrequency)
        .sort(([, a], [, b]) => (b as number) - (a as number))
        .slice(0, 5),
    };
  } catch (e) {
    console.warn('Error analyzing resource hints effectiveness:', e);
    return null;
  }
}

/**
 * Utility to generate link tags for resource hints
 * @param hints Array of resource hints
 * @returns JSX elements for link tags
 */
export function generateResourceHintTags(hints: ResourceHint[]) {
  return hints.map((hint, index) => {
    const key = `${hint.rel}-${hint.href}-${index}`;
    
    return (
      <link
        key={key}
        rel={hint.rel}
        href={hint.href}
        {...(hint.as ? { as: hint.as } : {})}
        {...(hint.type ? { type: hint.type } : {})}
        {...(hint.crossOrigin ? { crossOrigin: hint.crossOrigin } : {})}
        {...(hint.media ? { media: hint.media } : {})}
        {...(hint.fetchPriority ? { fetchpriority: hint.fetchPriority } : {})}
        {...(hint.importance ? { importance: hint.importance } : {})}
      />
    );
  });
}

/**
 * Component to render resource hints based on current route
 */
export function ResourceHints() {
  const hints = useResourceHints();
  
  // Initialize monitoring on client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      monitorResourceHints();
    }
  }, []);
  
  return <>{generateResourceHintTags(hints)}</>;
}

/**
 * Utility to inject resource hints into the document head
 * @param hints Array of resource hints
 */
export function injectResourceHints(hints: ResourceHint[]) {
  if (typeof document === 'undefined') return;
  
  hints.forEach(hint => {
    // Skip if this exact link already exists
    const existing = document.querySelector(
      `link[rel="${hint.rel}"][href="${hint.href}"]${hint.as ? `[as="${hint.as}"]` : ''}`
    );
    if (existing) return;
    
    // Create and append link element
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    if (hint.as) link.as = hint.as;
    if (hint.type) link.type = hint.type;
    if (hint.crossOrigin) link.crossOrigin = hint.crossOrigin;
    if (hint.media) link.media = hint.media;
    if (hint.fetchPriority) link.setAttribute('fetchpriority', hint.fetchPriority);
    if (hint.importance) link.setAttribute('importance', hint.importance);
    
    document.head.appendChild(link);
  });
}

export default ResourceHints;
