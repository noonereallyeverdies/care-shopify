import { lazy } from 'react';
import type { ComponentType } from 'react';

/**
 * Route-based lazy loading for better code splitting
 * 
 * This module provides lazy-loaded route components that split the bundle
 * and load only when needed, improving initial load performance.
 */

// Lazy load main route components
export const LazyHomePage = lazy(() => 
  import('~/routes/($locale)._index').then(module => ({ default: module.default }))
);

export const LazyProductPage = lazy(() => 
  import('~/routes/($locale).products.$handle').then(module => ({ default: module.default }))
);

export const LazyCollectionPage = lazy(() => 
  import('~/routes/($locale).collections.$collectionHandle').then(module => ({ default: module.default }))
);

export const LazyCartPage = lazy(() => 
  import('~/routes/($locale).cart').then(module => ({ default: module.default }))
);

export const LazyAccountPage = lazy(() => 
  import('~/routes/($locale).account').then(module => ({ default: module.default }))
);

export const LazySearchPage = lazy(() => 
  import('~/routes/($locale).search').then(module => ({ default: module.default }))
);

// Lazy load complex components that aren't needed immediately
export const LazyScienceSection = lazy(() => 
  import('~/components/sections/FixedScienceSection').then(module => ({ default: module.FixedScienceSection }))
);

export const LazyTestimonialsSection = lazy(() => 
  import('~/components/sections/TestimonialsSection').then(module => ({ default: module.TestimonialsSection }))
);

export const LazyBeforeAfterGallery = lazy(() => 
  import('~/components/sections/BeforeAfterGallery').then(module => ({ default: module.BeforeAfterGallery }))
);

export const LazyProductGallery = lazy(() => 
  import('~/components/ProductGallery').then(module => ({ default: module.ProductGallery }))
);

export const LazyFaqSection = lazy(() => 
  import('~/components/sections/FaqSection').then(module => ({ default: module.FaqSection }))
);

export const LazyHowItWorksSection = lazy(() => 
  import('~/components/sections/HowItWorks').then(module => ({ default: module.HowItWorks }))
);

// Advanced lazy loading with prefetching
export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T } | T>,
  options?: {
    /** Prefetch delay in milliseconds */
    prefetchDelay?: number;
    /** Prefetch on hover */
    prefetchOnHover?: boolean;
    /** Prefetch on visible */
    prefetchOnVisible?: boolean;
  }
) {
  const LazyComponent = lazy(async () => {
    const module = await importFn();
    return 'default' in module ? module : { default: module };
  });

  if (options?.prefetchDelay && options.prefetchDelay > 0) {
    setTimeout(() => {
      importFn().catch(() => {
        // Silently fail prefetch
      });
    }, options.prefetchDelay);
  }

  return LazyComponent;
}

// Preload components for better UX
export async function preloadComponent<T>(
  componentLoader: () => Promise<T>
): Promise<T> {
  try {
    return await componentLoader();
  } catch (error) {
    console.warn('Failed to preload component:', error);
    throw error;
  }
}

// Batch preload multiple components
export async function preloadComponents(
  loaders: Array<() => Promise<any>>
): Promise<void> {
  const promises = loaders.map(loader => 
    loader().catch(error => {
      console.warn('Failed to preload component:', error);
      return null;
    })
  );

  await Promise.allSettled(promises);
}

// Hook for prefetching components on interaction
export function usePrefetch() {
  const prefetchedComponents = new Set<string>();

  const prefetch = async (
    componentName: string,
    loader: () => Promise<any>
  ) => {
    if (prefetchedComponents.has(componentName)) {
      return;
    }

    prefetchedComponents.add(componentName);
    
    try {
      await loader();
    } catch (error) {
      console.warn(`Failed to prefetch ${componentName}:`, error);
      prefetchedComponents.delete(componentName);
    }
  };

  return { prefetch };
}

// Component registry for dynamic imports
export class ComponentRegistry {
  private static components = new Map<string, ComponentType>();
  private static loaders = new Map<string, () => Promise<ComponentType>>();

  static register(name: string, loader: () => Promise<ComponentType>) {
    this.loaders.set(name, loader);
  }

  static async load(name: string): Promise<ComponentType | null> {
    if (this.components.has(name)) {
      return this.components.get(name)!;
    }

    const loader = this.loaders.get(name);
    if (!loader) {
      console.warn(`Component ${name} not found in registry`);
      return null;
    }

    try {
      const component = await loader();
      this.components.set(name, component);
      return component;
    } catch (error) {
      console.error(`Failed to load component ${name}:`, error);
      return null;
    }
  }

  static clear() {
    this.components.clear();
    this.loaders.clear();
  }
}

// Performance monitoring for lazy components
export class LazyLoadingMonitor {
  private static loadTimes = new Map<string, number>();
  private static chunkSizes = new Map<string, number>();
  private static loadErrors = new Map<string, number>();

  static recordLoad(chunkName: string, loadTime: number, size?: number) {
    this.loadTimes.set(chunkName, loadTime);
    if (size) {
      this.chunkSizes.set(chunkName, size);
    }
  }

  static recordError(chunkName: string) {
    const current = this.loadErrors.get(chunkName) || 0;
    this.loadErrors.set(chunkName, current + 1);
  }

  static getStats() {
    return {
      loadTimes: Object.fromEntries(this.loadTimes),
      chunkSizes: Object.fromEntries(this.chunkSizes),
      loadErrors: Object.fromEntries(this.loadErrors),
      averageLoadTime: this.calculateAverageLoadTime(),
      totalChunkSize: this.calculateTotalChunkSize(),
    };
  }

  private static calculateAverageLoadTime(): number {
    const times = Array.from(this.loadTimes.values());
    return times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0;
  }

  private static calculateTotalChunkSize(): number {
    return Array.from(this.chunkSizes.values()).reduce((a, b) => a + b, 0);
  }

  static reset() {
    this.loadTimes.clear();
    this.chunkSizes.clear();
    this.loadErrors.clear();
  }
}

// Route prefetching based on user navigation patterns
export class RoutePredictor {
  private static navigationHistory: string[] = [];
  private static patterns = new Map<string, string[]>();

  static recordNavigation(from: string, to: string) {
    this.navigationHistory.push(to);
    
    // Keep history limited
    if (this.navigationHistory.length > 100) {
      this.navigationHistory.shift();
    }

    // Update patterns
    if (!this.patterns.has(from)) {
      this.patterns.set(from, []);
    }
    this.patterns.get(from)!.push(to);
  }

  static getPredictedRoutes(currentRoute: string, limit = 3): string[] {
    const destinations = this.patterns.get(currentRoute) || [];
    const counts = new Map<string, number>();

    destinations.forEach(dest => {
      counts.set(dest, (counts.get(dest) || 0) + 1);
    });

    return Array.from(counts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([route]) => route);
  }

  static clear() {
    this.navigationHistory.length = 0;
    this.patterns.clear();
  }
}