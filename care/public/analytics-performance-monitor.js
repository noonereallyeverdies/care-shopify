/**
 * Analytics Performance Monitor
 * 
 * This script monitors the performance impact of analytics scripts
 * and provides insights into optimization effectiveness.
 */

class AnalyticsPerformanceMonitor {
  constructor() {
    this.metrics = {
      analyticsLoadTime: [],
      mainThreadBlockTime: 0,
      totalAnalyticsRequests: 0,
      partytownWorkerActive: false,
      coreWebVitals: {}
    };
    
    this.observers = [];
    this.startTime = performance.now();
    
    this.init();
  }

  init() {
    this.setupPerformanceObservers();
    this.monitorAnalyticsRequests();
    this.checkPartytownWorker();
    this.measureCoreWebVitals();
    
    // Report after page load
    window.addEventListener('load', () => {
      setTimeout(() => this.generateReport(), 3000);
    });
  }

  setupPerformanceObservers() {
    if ('PerformanceObserver' in window) {
      // Monitor Long Tasks (main thread blocking)
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.metrics.mainThreadBlockTime += entry.duration;
        });
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });
      this.observers.push(longTaskObserver);

      // Monitor Resource Loading
      const resourceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (this.isAnalyticsResource(entry.name)) {
            this.metrics.analyticsLoadTime.push({
              name: entry.name,
              duration: entry.duration,
              transferSize: entry.transferSize || 0,
              decodedBodySize: entry.decodedBodySize || 0
            });
            this.metrics.totalAnalyticsRequests++;
          }
        });
      });
      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.push(resourceObserver);

      // Monitor Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.coreWebVitals.lcp = lastEntry.startTime;
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);
    }
  }

  isAnalyticsResource(url) {
    const analyticsPatterns = [
      'google-analytics.com',
      'googletagmanager.com', 
      'clarity.ms',
      'partytown',
      'gtag',
      'analytics'
    ];
    
    return analyticsPatterns.some(pattern => url.includes(pattern));
  }

  monitorAnalyticsRequests() {
    // Intercept fetch requests
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      const url = args[0];
      if (typeof url === 'string' && this.isAnalyticsResource(url)) {
        performance.mark(`analytics-fetch-start-${url}`);
        return originalFetch.apply(this, args).then(response => {
          performance.mark(`analytics-fetch-end-${url}`);
          return response;
        });
      }
      return originalFetch.apply(this, args);
    }.bind(this);

    // Intercept XMLHttpRequest
    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...args) {
      if (this.isAnalyticsResource(url)) {
        this.addEventListener('loadend', () => {
          this.metrics.totalAnalyticsRequests++;
        });
      }
      return originalXHROpen.call(this, method, url, ...args);
    }.bind(this);
  }

  async checkPartytownWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        this.metrics.partytownWorkerActive = registrations.some(
          reg => reg.scope.includes('partytown') || reg.scope.includes('~partytown')
        );
      } catch (error) {
        console.warn('Could not check service workers:', error);
      }
    }
  }

  measureCoreWebVitals() {
    // Measure First Contentful Paint
    if (window.performance) {
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        this.metrics.coreWebVitals.fcp = fcpEntry.startTime;
      }
    }

    // Measure Cumulative Layout Shift
    if ('PerformanceObserver' in window) {
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        list.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.metrics.coreWebVitals.cls = clsValue;
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    }

    // Measure First Input Delay (requires user interaction)
    if ('PerformanceObserver' in window) {
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.metrics.coreWebVitals.fid = entry.processingStart - entry.startTime;
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);
    }
  }

  generateReport() {
    const report = {
      summary: {
        totalAnalyticsRequests: this.metrics.totalAnalyticsRequests,
        averageAnalyticsLoadTime: this.calculateAverageLoadTime(),
        mainThreadBlockTime: this.metrics.mainThreadBlockTime,
        partytownActive: this.metrics.partytownWorkerActive,
        optimizationScore: this.calculateOptimizationScore()
      },
      coreWebVitals: this.metrics.coreWebVitals,
      analyticsResources: this.metrics.analyticsLoadTime,
      recommendations: this.generateRecommendations()
    };

    console.group('📊 Analytics Performance Report');
    console.log('⏱️ Summary:', report.summary);
    console.log('🚀 Core Web Vitals:', report.coreWebVitals);
    console.log('📈 Analytics Resources:', report.analyticsResources);
    console.log('💡 Recommendations:', report.recommendations);
    console.groupEnd();

    // Store report for later access
    window.analyticsPerformanceReport = report;
    
    return report;
  }

  calculateAverageLoadTime() {
    if (this.metrics.analyticsLoadTime.length === 0) return 0;
    const totalTime = this.metrics.analyticsLoadTime.reduce((sum, item) => sum + item.duration, 0);
    return totalTime / this.metrics.analyticsLoadTime.length;
  }

  calculateOptimizationScore() {
    let score = 100;
    
    // Deduct points for high main thread blocking
    if (this.metrics.mainThreadBlockTime > 50) score -= 20;
    if (this.metrics.mainThreadBlockTime > 100) score -= 30;
    
    // Add points for Partytown usage
    if (this.metrics.partytownWorkerActive) score += 10;
    
    // Deduct points for slow analytics loading
    const avgLoadTime = this.calculateAverageLoadTime();
    if (avgLoadTime > 100) score -= 15;
    if (avgLoadTime > 200) score -= 25;
    
    // Consider Core Web Vitals impact
    if (this.metrics.coreWebVitals.fcp > 1800) score -= 10;
    if (this.metrics.coreWebVitals.lcp > 2500) score -= 15;
    if (this.metrics.coreWebVitals.cls > 0.1) score -= 10;
    if (this.metrics.coreWebVitals.fid > 100) score -= 10;
    
    return Math.max(0, Math.min(100, score));
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (!this.metrics.partytownWorkerActive) {
      recommendations.push('🚀 Consider enabling Partytown to move analytics to web workers');
    }
    
    if (this.metrics.mainThreadBlockTime > 50) {
      recommendations.push('⚡ High main thread blocking detected. Ensure analytics run asynchronously');
    }
    
    const avgLoadTime = this.calculateAverageLoadTime();
    if (avgLoadTime > 150) {
      recommendations.push('📦 Analytics scripts are loading slowly. Consider optimizing or delaying non-critical analytics');
    }
    
    if (this.metrics.coreWebVitals.fcp > 1800) {
      recommendations.push('🎯 First Contentful Paint is slow. Ensure analytics don\'t block critical resources');
    }
    
    if (this.metrics.coreWebVitals.cls > 0.1) {
      recommendations.push('📏 Cumulative Layout Shift is high. Check if analytics scripts cause layout shifts');
    }
    
    if (this.metrics.totalAnalyticsRequests > 5) {
      recommendations.push('🔄 Multiple analytics requests detected. Consider consolidating analytics providers');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('✅ Analytics performance looks good! No major issues detected');
    }
    
    return recommendations;
  }

  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
  }
}

// Initialize monitoring when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.analyticsPerformanceMonitor = new AnalyticsPerformanceMonitor();
  });
} else {
  window.analyticsPerformanceMonitor = new AnalyticsPerformanceMonitor();
}

// Export for manual access
window.AnalyticsPerformanceMonitor = AnalyticsPerformanceMonitor;
