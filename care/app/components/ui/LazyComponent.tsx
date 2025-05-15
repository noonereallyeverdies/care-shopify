import React, { 
  useState, 
  useRef, 
  useEffect, 
  Suspense, 
  ComponentType, 
  ReactNode,
  ErrorInfo
} from 'react';
import { cn } from '~/lib/utils';

interface LazyComponentProps {
  /** Component to load lazily */
  component: ComponentType<any>;
  /** Props to pass to the component */
  componentProps?: Record<string, any>;
  /** Fallback content while loading */
  fallback?: ReactNode;
  /** Error fallback content */
  errorFallback?: ComponentType<{ error: Error; retry: () => void }>;
  /** Threshold for intersection observer (0-1) */
  threshold?: number;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** CSS class for wrapper */
  className?: string;
  /** Loading strategy */
  strategy?: 'lazy' | 'eager' | 'visible';
  /** Delay before loading (in ms) */
  delay?: number;
  /** Whether to unload component when out of view */
  unloadOnExit?: boolean;
  /** Children to render inside component */
  children?: ReactNode;
}

/**
 * LazyComponent Wrapper
 * 
 * Provides lazy loading for heavy components using Intersection Observer.
 * Features:
 * - Intersection Observer based loading
 * - Configurable loading strategies
 * - Error boundary with retry functionality
 * - Skeleton/placeholder support
 * - Unload on exit option for memory optimization
 */
export function LazyComponent({
  component: Component,
  componentProps = {},
  fallback,
  errorFallback: ErrorFallback,
  threshold = 0.1,
  rootMargin = '100px',
  className,
  strategy = 'lazy',
  delay = 0,
  unloadOnExit = false,
  children,
}: LazyComponentProps) {
  const [shouldLoad, setShouldLoad] = useState(strategy === 'eager');
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Set up Intersection Observer
  useEffect(() => {
    if (strategy === 'eager' || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        
        if (entry.isIntersecting && !shouldLoad) {
          if (delay > 0) {
            timeoutRef.current = setTimeout(() => {
              setShouldLoad(true);
            }, delay);
          } else {
            setShouldLoad(true);
          }
        } else if (!entry.isIntersecting && unloadOnExit && shouldLoad) {
          setShouldLoad(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [threshold, rootMargin, strategy, shouldLoad, delay, unloadOnExit]);

  // Handle component errors
  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    console.error('LazyComponent error:', error, errorInfo);
    setError(error);
  };

  // Retry loading after error
  const retry = () => {
    setError(null);
    setShouldLoad(true);
  };

  // Default fallback
  const defaultFallback = (
    <div className="animate-pulse">
      <div className="h-32 bg-gray-200 rounded" />
    </div>
  );

  // Error boundary component
  class LazyErrorBoundary extends React.Component<
    { children: ReactNode; onError: (error: Error, errorInfo: ErrorInfo) => void },
    { hasError: boolean }
  > {
    constructor(props: any) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
      return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      this.props.onError(error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return null; // Let parent handle error display
      }

      return this.props.children;
    }
  }

  // Render error state
  if (error && ErrorFallback) {
    return (
      <div ref={ref} className={cn('lazy-component-wrapper', className)}>
        <ErrorFallback error={error} retry={retry} />
      </div>
    );
  }

  // Render loading state
  if (!shouldLoad) {
    return (
      <div ref={ref} className={cn('lazy-component-wrapper', className)}>
        {fallback || defaultFallback}
      </div>
    );
  }

  // Render component
  return (
    <div ref={ref} className={cn('lazy-component-wrapper', className)}>
      <LazyErrorBoundary onError={handleError}>
        <Suspense fallback={fallback || defaultFallback}>
          <Component {...componentProps}>
            {children}
          </Component>
        </Suspense>
      </LazyErrorBoundary>
    </div>
  );
}

// Higher-order component for lazy loading
export function withLazyLoading<P extends object>(
  Component: ComponentType<P>,
  options?: Omit<LazyComponentProps, 'component' | 'componentProps'>
) {
  return function LazyLoadedComponent(props: P) {
    return (
      <LazyComponent
        component={Component}
        componentProps={props}
        {...options}
      />
    );
  };
}

// Hook for lazy loading state
export function useLazyLoading(
  threshold = 0.1,
  rootMargin = '100px'
) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && !hasLoaded) {
          setHasLoaded(true);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, hasLoaded]);

  return { ref, isVisible, hasLoaded };
}

// Skeleton component for lazy loading fallbacks
export function LazyComponentSkeleton({
  height = '200px',
  className,
  lines = 3,
}: {
  height?: string;
  className?: string;
  lines?: number;
}) {
  return (
    <div className={cn('animate-pulse', className)} style={{ height }}>
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded">
            <div
              className="h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"
              style={{
                width: i === lines - 1 ? '75%' : '100%',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Predefined error fallback components
export const LazyErrorFallback = ({ 
  error, 
  retry 
}: { 
  error: Error; 
  retry: () => void;
}) => (
  <div className="p-6 border border-red-200 rounded-lg bg-red-50">
    <h3 className="text-lg font-semibold text-red-800 mb-2">
      Failed to load component
    </h3>
    <p className="text-red-600 mb-4 text-sm">
      {error.message}
    </p>
    <button
      onClick={retry}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
    >
      Retry
    </button>
  </div>
);

// Performance monitoring for lazy components
export class LazyComponentMonitor {
  private static loadTimes = new Map<string, number>();
  private static errorCounts = new Map<string, number>();

  static recordLoadTime(componentName: string, loadTime: number) {
    this.loadTimes.set(componentName, loadTime);
  }

  static recordError(componentName: string) {
    const current = this.errorCounts.get(componentName) || 0;
    this.errorCounts.set(componentName, current + 1);
  }

  static getStats() {
    return {
      loadTimes: Object.fromEntries(this.loadTimes),
      errorCounts: Object.fromEntries(this.errorCounts),
    };
  }

  static reset() {
    this.loadTimes.clear();
    this.errorCounts.clear();
  }
}