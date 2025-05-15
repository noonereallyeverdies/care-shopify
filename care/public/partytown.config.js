// Partytown configuration for care-atin analytics optimization
// This file configures Partytown to run analytics scripts in a web worker

self.partytown = {
  // Configure which globals are forwarded to the main thread
  forward: [
    'gtag',
    'dataLayer.push', 
    'clarity',
    'fbq',
    // Add any other analytics methods as needed
  ],
  
  // Enable debug mode in development
  debug: process.env.NODE_ENV === 'development',
  
  // Configure script loading behavior
  resolveUrl: function(url: URL, location: Location, isScript: boolean) {
    // Allow analytics domains to load in worker
    const allowedDomains = [
      'www.googletagmanager.com',
      'www.google-analytics.com', 
      'google-analytics.com',
      'www.clarity.ms',
      'clarity.ms',
      'connect.facebook.net'
    ];
    
    if (allowedDomains.some(domain => url.hostname.includes(domain))) {
      return url;
    }
    
    // For all other scripts, use default behavior
    return url;
  },
  
  // Configure sandbox restrictions
  sandbox: {
    // Allow analytics to access these APIs
    allows: [
      'forms',
      'popups',
      'presentation',
      'same-origin',
      'scripts'
    ]
  },
  
  // Performance optimizations
  maxWorkerCount: 1, // Use single worker for analytics
  
  // Configure how Partytown handles script execution
  mainWindowAccessors: {
    // Allow access to specific window properties
    dataLayer: true,
    gtag: true,
    clarity: true,
    fbq: true
  }
};
