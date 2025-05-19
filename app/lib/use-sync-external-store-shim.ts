/**
 * This file serves as a shim for use-sync-external-store
 * to fix "module is not defined" errors that occur when importing it directly.
 * 
 * This shim properly handles the CommonJS to ESM transition.
 */

/**
 * Create our own implementation of useSyncExternalStore with selector
 * to avoid the CJS/ESM compatibility issues
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Type definitions
type Snapshot<T> = T;
type GetSnapshot<T> = () => Snapshot<T>;
type Subscribe = (callback: () => void) => () => void;
type EqualityFn<T> = (a: T, b: T) => boolean;
type Selector<T, U> = (state: T) => U;

// Simple implementation of useSyncExternalStore
export function useSyncExternalStore<T>(
  subscribe: Subscribe, 
  getSnapshot: GetSnapshot<T>
): T {
  const [state, setState] = useState<T>(getSnapshot);
  
  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setState(getSnapshot());
    });
    
    return unsubscribe;
  }, [subscribe, getSnapshot]);
  
  return state;
}

// Implementation of useSyncExternalStoreWithSelector
export function useSyncExternalStoreWithSelector<T, U>(
  subscribe: Subscribe,
  getSnapshot: GetSnapshot<T>,
  getServerSnapshot: GetSnapshot<T> | null,
  selector: Selector<T, U>,
  isEqual?: EqualityFn<U>
): U {
  // Use memoized selector
  const selectorFn = useCallback(
    () => selector(getSnapshot()),
    [getSnapshot, selector]
  );
  
  // Get selected state
  const selectedState = useSyncExternalStore<U>(
    subscribe,
    selectorFn as GetSnapshot<U>
  );
  
  // Previous value ref for equality check
  const prevRef = useRef<U | null>(null);
  
  // Compare with previous if equality function provided
  return useMemo(() => {
    // First render or if no equality function
    if (prevRef.current === null || !isEqual) {
      prevRef.current = selectedState;
      return selectedState;
    }
    
    // Check if equal
    const prev = prevRef.current;
    if (isEqual(prev, selectedState)) {
      return prev;
    }
    
    // Update ref and return new value
    prevRef.current = selectedState;
    return selectedState;
  }, [selectedState, isEqual]);
}

// Main export for with-selector
export const withSelector = { useSyncExternalStoreWithSelector };

// Default export
export default {
  useSyncExternalStore,
  withSelector
}; 