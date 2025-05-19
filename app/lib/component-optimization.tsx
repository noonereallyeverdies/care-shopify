/**
 * Component optimization utilities
 */
import React, { memo, useEffect, useRef } from 'react';

/**
 * Type-safe memo function with optional props comparison function
 * 
 * @param Component The component to memoize
 * @param propsAreEqual Optional function to compare props
 * @returns Memoized component
 */
export function memoWithProps<T extends object>(
  Component: React.ComponentType<T>,
  propsAreEqual?: (prevProps: Readonly<T>, nextProps: Readonly<T>) => boolean
) {
  return memo(Component, propsAreEqual);
}

/**
 * Development-only component render tracker
 * Logs component renders to help identify unnecessary renders
 * 
 * @param componentName Name of the component to track
 */
export function useRenderTracker(componentName: string) {
  if (process.env.NODE_ENV !== 'development') return;
  
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current++;
    console.log(`[RENDER] ${componentName} rendered (${renderCount.current})`);
  });
}

/**
 * Check if an object is empty
 * 
 * @param obj Object to check
 * @returns True if the object is empty
 */
export function isEmptyObject(obj: Record<string, any> | null | undefined): boolean {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
}

/**
 * Generic props equality checker that does deep comparison
 * More efficient than JSON.stringify for complex objects
 * 
 * @param prevProps Previous props
 * @param nextProps Next props
 * @returns True if props are equal
 */
export function arePropsEqual<T extends object>(prevProps: T, nextProps: T): boolean {
  const prevKeys = Object.keys(prevProps);
  const nextKeys = Object.keys(nextProps);
  
  // Check if number of keys is different
  if (prevKeys.length !== nextKeys.length) {
    return false;
  }
  
  // Check each key
  return prevKeys.every(key => {
    const prevValue = prevProps[key as keyof T];
    const nextValue = nextProps[key as keyof T];
    
    // Handle special cases
    if (prevValue === nextValue) return true;
    
    // Handle arrays
    if (Array.isArray(prevValue) && Array.isArray(nextValue)) {
      if (prevValue.length !== nextValue.length) return false;
      return prevValue.every((val, i) => val === nextValue[i]);
    }
    
    // Handle objects (non-array)
    if (
      typeof prevValue === 'object' && prevValue !== null &&
      typeof nextValue === 'object' && nextValue !== null
    ) {
      return arePropsEqual(
        prevValue as unknown as object, 
        nextValue as unknown as object
      );
    }
    
    return false;
  });
}

/**
 * HOC to add render tracking to a component in development
 * 
 * @param Component Component to wrap
 * @param displayName Optional name to display in logs
 * @returns Wrapped component with render tracking
 */
export function withRenderTracking<P extends object>(
  Component: React.ComponentType<P>,
  displayName?: string
): React.FC<P> {
  if (process.env.NODE_ENV !== 'development') {
    return Component as React.FC<P>;
  }
  
  const name = displayName || Component.displayName || Component.name || 'Component';
  
  const TrackedComponent: React.FC<P> = (props) => {
    useRenderTracker(name);
    return <Component {...props} />;
  };
  
  TrackedComponent.displayName = `Tracked(${name})`;
  
  return TrackedComponent;
}

/**
 * Custom equality checker that ignores specific prop keys
 * 
 * @param keysToIgnore Keys to ignore when comparing props
 * @returns Props equality checker function
 */
export function createPropsEqualityChecker<T extends object>(
  keysToIgnore: (keyof T)[]
): (prevProps: T, nextProps: T) => boolean {
  return (prevProps: T, nextProps: T) => {
    const prevEntries = Object.entries(prevProps) as [keyof T, any][];
    
    return prevEntries.every(([key, value]) => {
      // Skip ignored keys
      if (keysToIgnore.includes(key)) return true;
      
      return value === nextProps[key];
    });
  };
}

/**
 * Factory function to create optimized components with configurable memoization
 * 
 * @param component Component to optimize
 * @param options Optimization options
 * @returns Optimized component
 */
export function createOptimizedComponent<P extends object>(
  component: React.ComponentType<P>,
  options: {
    displayName?: string;
    trackRenders?: boolean;
    ignoreProps?: (keyof P)[];
    customPropsComparison?: (prevProps: P, nextProps: P) => boolean;
  } = {}
) {
  const {
    displayName,
    trackRenders = false,
    ignoreProps = [],
    customPropsComparison,
  } = options;
  
  let optimizedComponent = component;
  const name = displayName || component.displayName || component.name || 'Component';
  
  // Apply comparison function if provided, otherwise create one from ignored props
  const propsAreEqual = customPropsComparison || 
    (ignoreProps.length > 0 ? createPropsEqualityChecker(ignoreProps) : undefined);
  
  // Apply memoization
  optimizedComponent = memoWithProps(optimizedComponent, propsAreEqual);
  
  // Apply render tracking in development if requested
  if (trackRenders && process.env.NODE_ENV === 'development') {
    optimizedComponent = withRenderTracking(optimizedComponent, name);
  }
  
  // Set display name
  optimizedComponent.displayName = `Optimized(${name})`;
  
  return optimizedComponent;
}

export default {
  memoWithProps,
  useRenderTracker,
  isEmptyObject,
  arePropsEqual,
  withRenderTracking,
  createPropsEqualityChecker,
  createOptimizedComponent,
};
