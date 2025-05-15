/**
 * Analytics Test Suite
 * 
 * This script helps verify that the analytics optimization is working correctly.
 * Run this in the browser console to test various analytics functionality.
 */

// Test analytics initialization
function testAnalyticsInitialization() {
  console.log('🧪 Testing Analytics Initialization...');
  
  if (typeof window !== 'undefined' && window.gtag) {
    console.log('✅ Google Analytics (gtag) is loaded');
  } else {
    console.log('❌ Google Analytics (gtag) is not loaded');
  }
  
  if (typeof window !== 'undefined' && window.clarity) {
    console.log('✅ Microsoft Clarity is loaded');
  } else {
    console.log('❌ Microsoft Clarity is not loaded');
  }
  
  // Check Partytown
  if (document.querySelector('script[type="text/partytown"]')) {
    console.log('✅ Partytown scripts detected');
  } else {
    console.log('⚠️ No Partytown scripts found (this may be normal if Partytown is disabled)');
  }
}

// Test analytics manager
function testAnalyticsManager() {
  console.log('🧪 Testing Analytics Manager...');
  
  try {
    // Import analytics manager (this will only work if the code is properly bundled)
    import('/app/lib/analytics-manager.js').then(({ getAnalytics, analytics }) => {
      console.log('✅ Analytics Manager imported successfully');
      
      // Get analytics instance
      const analyticsInstance = getAnalytics();
      console.log('✅ Analytics instance created:', analyticsInstance);
      
      // Test tracking methods
      if (typeof analytics.track === 'function') {
        console.log('✅ analytics.track method available');
      }
      
      if (typeof analytics.trackPageView === 'function') {
        console.log('✅ analytics.trackPageView method available');
      }
      
      if (typeof analytics.trackButtonClick === 'function') {
        console.log('✅ analytics.trackButtonClick method available');
      }
      
      // Test a sample event
      analytics.track({
        action: 'test_event',
        category: 'test',
        label: 'analytics_test_suite',
        custom_parameters: {
          test_run: Date.now()
        }
      });
      
      console.log('✅ Test event sent successfully');
    }).catch(error => {
      console.log('❌ Failed to import Analytics Manager:', error);
    });
  } catch (error) {
    console.log('❌ Error testing Analytics Manager:', error);
  }
}

// Test network requests
function testAnalyticsNetworkRequests() {
  console.log('🧪 Testing Analytics Network Requests...');
  
  // Monitor network requests for analytics
  const originalFetch = window.fetch;
  const originalXHROpen = XMLHttpRequest.prototype.open;
  
  window.fetch = function(...args) {
    const url = args[0];
    if (typeof url === 'string') {
      if (url.includes('google-analytics.com') || url.includes('googletagmanager.com')) {
        console.log('📡 GA4 request detected:', url);
      }
      if (url.includes('clarity.ms')) {
        console.log('📡 Clarity request detected:', url);
      }
    }
    return originalFetch.apply(this, args);
  };
  
  XMLHttpRequest.prototype.open = function(method, url, ...args) {
    if (typeof url === 'string') {
      if (url.includes('google-analytics.com') || url.includes('googletagmanager.com')) {
        console.log('📡 GA4 XHR request detected:', url);
      }
      if (url.includes('clarity.ms')) {
        console.log('📡 Clarity XHR request detected:', url);
      }
    }
    return originalXHROpen.call(this, method, url, ...args);
  };
  
  console.log('✅ Network monitoring enabled');
}

// Test Partytown functionality
function testPartytown() {
  console.log('🧪 Testing Partytown...');
  
  // Check for Partytown worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      const partytownWorker = registrations.find(reg => 
        reg.scope.includes('partytown') || 
        reg.scope.includes('~partytown')
      );
      
      if (partytownWorker) {
        console.log('✅ Partytown service worker found:', partytownWorker);
      } else {
        console.log('❌ Partytown service worker not found');
      }
    });
  }
  
  // Check for Partytown scripts
  const partytownScripts = document.querySelectorAll('script[type="text/partytown"]');
  console.log(`📊 Found ${partytownScripts.length} Partytown scripts`);
  
  // Check for Partytown proxy
  if (window.partytown) {
    console.log('✅ Partytown proxy object found');
  } else {
    console.log('❌ Partytown proxy object not found');
  }
}

// Test analytics hooks (if available)
function testAnalyticsHooks() {
  console.log('🧪 Testing Analytics Hooks...');
  
  // This would need to be run within a React component context
  console.log('ℹ️ Analytics hooks testing requires React component context');
  console.log('ℹ️ Check component console logs for hook-specific tests');
}

// Performance metrics
function analyzePerformance() {
  console.log('🧪 Analyzing Performance Impact...');
  
  if (window.performance) {
    const navigation = performance.getEntriesByType('navigation')[0];
    const resources = performance.getEntriesByType('resource');
    
    console.log('📊 Page Load Metrics:');
    console.log('  - DOM Content Loaded:', navigation.domContentLoadedEventEnd, 'ms');
    console.log('  - Load Complete:', navigation.loadEventEnd, 'ms');
    
    // Find analytics-related resources
    const analyticsResources = resources.filter(resource => 
      resource.name.includes('google-analytics.com') ||
      resource.name.includes('googletagmanager.com') ||
      resource.name.includes('clarity.ms') ||
      resource.name.includes('partytown')
    );
    
    console.log('📊 Analytics Resources:');
    analyticsResources.forEach(resource => {
      console.log(`  - ${resource.name}: ${resource.duration.toFixed(2)}ms`);
    });
    
    // Check for Largest Contentful Paint
    if (window.PerformanceObserver) {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('📊 Largest Contentful Paint:', entry.startTime, 'ms');
          }
        });
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }
}

// Run all tests
function runAnalyticsTestSuite() {
  console.log('🚀 Starting Analytics Test Suite...');
  console.log('='.repeat(50));
  
  testAnalyticsInitialization();
  console.log('');
  
  testAnalyticsManager();
  console.log('');
  
  testAnalyticsNetworkRequests();
  console.log('');
  
  testPartytown();
  console.log('');
  
  testAnalyticsHooks();
  console.log('');
  
  analyzePerformance();
  console.log('');
  
  console.log('✅ Analytics Test Suite Complete!');
  console.log('='.repeat(50));
}

// Export for manual testing
window.analyticsTestSuite = {
  runAll: runAnalyticsTestSuite,
  testInitialization: testAnalyticsInitialization,
  testManager: testAnalyticsManager,
  testNetwork: testAnalyticsNetworkRequests,
  testPartytown: testPartytown,
  testHooks: testAnalyticsHooks,
  analyzePerformance: analyzePerformance
};

// Auto-run tests if in development mode
if (process.env.NODE_ENV === 'development') {
  setTimeout(() => {
    console.log('Running analytics tests in development mode...');
    runAnalyticsTestSuite();
  }, 2000);
}
