// Dynamic loading utilities for bundle optimization
import React, { lazy, Suspense, useEffect, useState, useRef } from 'react';

// Simple dynamic component creator
export function createDynamicComponent<T extends Record<string, any>>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>,
  fallbackComponent?: React.ComponentType<T>
) {
  const LazyComponent = lazy(importFn);
  
  return function DynamicComponent(props: T & { enableViewportLoading?: boolean }) {
    const [shouldLoad, setShouldLoad] = useState(!props.enableViewportLoading);
    const ref = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      if (!props.enableViewportLoading) return;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        { 
          threshold: 0.1,
          rootMargin: '100px'
        }
      );
      
      if (ref.current) {
        observer.observe(ref.current);
      }
      
      return () => observer.disconnect();
    }, [props.enableViewportLoading]);
    
    if (!shouldLoad) {
      return (
        <div ref={ref} style={{ minHeight: '100px' }}>
          {fallbackComponent ? React.createElement(fallbackComponent, props) : <div>Loading...</div>}
        </div>
      );
    }
    
    return (
      <Suspense fallback={fallbackComponent ? React.createElement(fallbackComponent, props) : <div>Loading...</div>}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

// Bundle size monitoring utility
export const bundleMonitor = {
  logChunkLoaded: (chunkName: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`📦 Loaded chunk: ${chunkName}`);
    }
  },
  
  trackComponentLoad: (componentName: string, startTime: number) => {
    if (process.env.NODE_ENV === 'development') {
      const loadTime = performance.now() - startTime;
      console.log(`⚡ ${componentName} loaded in ${loadTime.toFixed(2)}ms`);
    }
  }
}; 