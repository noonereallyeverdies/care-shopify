/**
 * Performance optimization utilities
 * Export all performance-related utilities from a single file
 */

// Export cache utilities
export * from './api/cache';

// Export resource hints
export * from './resource-hints';

// Export component optimization utilities
export * from './component-optimization';

// Re-export performance monitoring
export * from './performance';

// Bundle size analyzer function
export function analyzeBundleSize() {
  if (typeof window === 'undefined') return null;
  
  try {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    // Filter for JS and CSS resources
    const bundles = resources.filter(resource => 
      resource.name.includes('.js') || resource.name.includes('.css')
    );
    
    // Group by file extension
    const jsFiles = bundles.filter(bundle => bundle.name.includes('.js'));
    const cssFiles = bundles.filter(bundle => bundle.name.includes('.css'));
    
    // Calculate totals
    const totalJsSize = jsFiles.reduce((sum, file) => sum + (file.encodedBodySize || 0), 0);
    const totalCssSize = cssFiles.reduce((sum, file) => sum + (file.encodedBodySize || 0), 0);
    
    // Create analysis
    const analysis = {
      totalBundleSize: totalJsSize + totalCssSize,
      jsBundle: {
        count: jsFiles.length,
        totalSize: totalJsSize,
        files: jsFiles.map(file => ({
          name: file.name.split('/').pop(),
          size: file.encodedBodySize,
          transferSize: file.transferSize,
          loadTime: file.duration,
        })),
      },
      cssBundle: {
        count: cssFiles.length,
        totalSize: totalCssSize,
        files: cssFiles.map(file => ({
          name: file.name.split('/').pop(),
          size: file.encodedBodySize,
          transferSize: file.transferSize,
          loadTime: file.duration,
        })),
      },
    };
    
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.table([
        { type: 'JavaScript', count: jsFiles.length, size: formatSize(totalJsSize) },
        { type: 'CSS', count: cssFiles.length, size: formatSize(totalCssSize) },
        { type: 'Total', count: jsFiles.length + cssFiles.length, size: formatSize(totalJsSize + totalCssSize) },
      ]);
      
      console.log('Top 5 largest files:');
      const allFiles = [...jsFiles, ...cssFiles]
        .sort((a, b) => (b.encodedBodySize || 0) - (a.encodedBodySize || 0))
        .slice(0, 5);
        
      console.table(
        allFiles.map(file => ({
          file: file.name.split('/').pop(),
          size: formatSize(file.encodedBodySize || 0),
          type: file.name.includes('.js') ? 'JavaScript' : 'CSS',
        }))
      );
    }
    
    return analysis;
  } catch (error) {
    console.error('Error analyzing bundle size:', error);
    return null;
  }
}

// Format bytes to human-readable size
function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
}

// Detect lazy-loaded components in viewport
export function observeComponents() {
  if (typeof window === 'undefined' || !window.IntersectionObserver) return;
  
  // Find all lazy-loaded components
  const lazyComponents = document.querySelectorAll('[data-hydrate-when="whenVisible"]');
  
  // Create observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Log component coming into view
          const element = entry.target as HTMLElement;
          const componentId = element.id || 'unknown';
          console.log(`[Performance] Component '${componentId}' entered viewport`);
          
          // Stop observing this component
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '50px',
      threshold: 0.1,
    }
  );
  
  // Start observing components
  lazyComponents.forEach(component => {
    observer.observe(component);
  });
  
  return observer;
}

// Utility to monitor memory usage
export function monitorMemory() {
  if (
    typeof window === 'undefined' || 
    !('performance' in window) || 
    !('memory' in (performance as any))
  ) {
    return null;
  }
  
  const memory = (performance as any).memory;
  
  return {
    totalHeapSize: memory.totalJSHeapSize,
    usedHeapSize: memory.usedJSHeapSize,
    heapLimit: memory.jsHeapSizeLimit,
    usagePercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
  };
}

// Initialize performance monitoring on client
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;
  
  // Wait for page load
  window.addEventListener('load', () => {
    // Report performance metrics after a short delay
    setTimeout(() => {
      // Analyze bundle size
      analyzeBundleSize();
      
      // Monitor memory if available
      const memoryStats = monitorMemory();
      if (memoryStats && memoryStats.usagePercentage > 80) {
        console.warn(`[Performance] High memory usage: ${memoryStats.usagePercentage.toFixed(1)}%`);
      }
      
      // Get Web Vitals metrics
      const lcpElement = document.querySelector('[largest-contentful-paint="true"]');
      if (lcpElement) {
        console.log(`[Performance] LCP element: ${lcpElement.tagName}${lcpElement.id ? '#' + lcpElement.id : ''}`);
      }
    }, 3000);
  });
  
  // Observe lazy-loaded components
  if (process.env.NODE_ENV === 'development') {
    window.addEventListener('DOMContentLoaded', () => {
      observeComponents();
    });
  }
}

// Export a default object with all utilities
export default {
  analyzeBundleSize,
  observeComponents,
  monitorMemory,
  initPerformanceMonitoring,
};
