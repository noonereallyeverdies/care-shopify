/**
 * Lighthouse CI Configuration
 * 
 * Configures Lighthouse for automated performance testing
 * with Shopify-specific optimizations and budgets.
 */

module.exports = {
  ci: {
    collect: {
      // URLs to test
      url: [
        'http://localhost:3000',                    // Homepage
        'http://localhost:3000/products/sample',    // Product page
        'http://localhost:3000/collections/all',    // Collection page
        'http://localhost:3000/cart',               // Cart page
      ],
      
      // Override URL if preview URL is provided
      ...(process.env.PREVIEW_URL && {
        url: [
          process.env.PREVIEW_URL,
          `${process.env.PREVIEW_URL}/products/sample`,
          `${process.env.PREVIEW_URL}/collections/all`,
          `${process.env.PREVIEW_URL}/cart`,
        ],
      }),
      
      // Number of runs for more reliable results
      numberOfRuns: 3,
      
      // Lighthouse settings
      settings: {
        // Use desktop preset for consistent results
        preset: 'desktop',
        
        // Chrome flags for CI environment
        chromeFlags: [
          '--no-sandbox',
          '--headless',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-extensions',
          '--no-first-run',
          '--disable-background-timer-throttling',
          '--disable-renderer-backgrounding',
          '--disable-backgrounding-occluded-windows',
        ],
        
        // Disable certain audits for Shopify
        skipAudits: [
          'uses-http2',                 // Shopify handles HTTP/2
          'redirects-http',            // Shopify handles redirects
          'canonical',                 // Shopify manages canonical URLs
        ],
      },
    },
    
    // Performance budgets and assertions
    assert: {
      // Budget file for resource sizes and timing
      budgetsFile: './performance-budgets.json',
      
      // Lighthouse assertions
      assertions: {
        // Performance category
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        
        // Core Web Vitals - Shopify optimized
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 1800 }],
        'speed-index': ['warn', { maxNumericValue: 3400 }],
        'total-blocking-time': ['warn', { maxNumericValue: 200 }],
        'first-meaningful-paint': ['warn', { maxNumericValue: 2000 }],
        
        // Resource optimization
        'unused-javascript': ['warn', { maxNumericValue: 30000 }],  // 30KB unused JS
        'unused-css-rules': ['warn', { maxNumericValue: 20000 }],   // 20KB unused CSS
        'uses-optimized-images': 'error',
        'modern-image-formats': 'warn',
        'uses-text-compression': 'error',
        'uses-responsive-images': 'warn',
        
        // Loading optimizations
        'render-blocking-resources': 'warn',
        'uses-rel-preconnect': 'warn',
        'uses-rel-preload': 'warn',
        'prioritize-lcp-image': 'warn',
        
        // JavaScript optimizations
        'bootup-time': ['warn', { maxNumericValue: 3500 }],
        'mainthread-work-breakdown': ['warn', { maxNumericValue: 4000 }],
        'third-party-summary': 'warn',
        
        // Shopify-specific audits (if available)
        'uses-passive-event-listeners': 'warn',
        'uses-geolocation-on-start': 'error',
        'notification-on-start': 'error',
      },
    },
    
    // Upload configuration
    upload: {
      // Upload results to temporary public storage
      target: 'temporary-public-storage',
      
      // Alternative: Upload to Lighthouse CI server
      // serverBaseUrl: 'https://your-lhci-server.com',
      // token: process.env.LHCI_TOKEN,
      
      // Alternative: Upload to GitHub Pages
      // target: 'filesystem',
      // outputDir: './lighthouse-reports',
    },
    
    // Server configuration (if using LHCI server)
    server: {
      // port: 9001,
      // storage: {
      //   type: 'sql',
      //   databaseUrl: process.env.DATABASE_URL,
      // },
    },
  },
  
  // Additional configuration for Shopify
  extends: [
    // Use Shopify-specific Lighthouse config if available
    // '@shopify/lighthouse-config',
  ],
};