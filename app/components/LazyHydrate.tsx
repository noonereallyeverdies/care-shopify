/**
 * LazyHydrate component for optimized client-side hydration
 * Delays hydration of non-critical components until they're needed
 */
import React, { useState, useRef, useEffect, useCallback, Suspense } from 'react';
import { useInView } from 'react-intersection-observer';

export type LazyHydrateProps = {
  /**
   * The component to hydrate
   */
  children: React.ReactNode;
  
  /**
   * Hydration trigger method
   * - 'whenVisible': Hydrate when the component comes into viewport
   * - 'whenIdle': Hydrate during browser idle time
   * - 'onInteraction': Hydrate on user interaction (hover, click, focus)
   * - 'never': Never client-side hydrate (server-rendered HTML only)
   * - 'onMount': Hydrate immediately when mounted
   */
  whenToHydrate?: 'whenVisible' | 'whenIdle' | 'onInteraction' | 'never' | 'onMount';
  
  /**
   * Root margin for intersection observer (when using 'whenVisible')
   */
  rootMargin?: string;
  
  /**
   * Priority level (higher numbers hydrate earlier)
   */
  priority?: number;
  
  /**
   * Event types to listen for (when using 'onInteraction')
   */
  eventTypes?: Array<'mouseenter' | 'click' | 'focus' | 'touchstart'>;
  
  /**
   * Placeholder to show while not hydrated
   */
  placeholder?: React.ReactNode;
  
  /**
   * Optional ID for tracking
   */
  id?: string;
  
  /**
   * Additional class name
   */
  className?: string;
};

/**
 * LazyHydrate component for optimized client-side hydration
 */
export const LazyHydrate: React.FC<LazyHydrateProps> = ({
  children,
  whenToHydrate = 'whenVisible',
  rootMargin = '200px',
  priority = 0,
  eventTypes = ['mouseenter', 'click', 'focus', 'touchstart'],
  placeholder,
  id,
  className,
}) => {
  // State to track if component is hydrated
  const [isHydrated, setIsHydrated] = useState(
    // Hydrate immediately if SSR is disabled or when strategy is 'onMount'
    typeof window !== 'undefined' && 
    (whenToHydrate === 'onMount' || whenToHydrate === 'never') 
  );
  
  // Ref to track event listeners
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Helper function to hydrate component
  const hydrate = useCallback(() => {
    if (whenToHydrate !== 'never' && !isHydrated) {
      setIsHydrated(true);
      
      // Log hydration in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[LazyHydrate] Hydrating component${id ? ` "${id}"` : ''} (strategy: ${whenToHydrate})`);
      }
    }
  }, [whenToHydrate, isHydrated, id]);
  
  // Initialize IntersectionObserver for 'whenVisible' strategy
  const { ref: inViewRef } = useInView({
    rootMargin,
    triggerOnce: true,
    skip: whenToHydrate !== 'whenVisible' || isHydrated,
    onChange: (inView) => {
      if (inView && whenToHydrate === 'whenVisible') {
        hydrate();
      }
    },
  });
  
  // Combine refs
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (whenToHydrate === 'whenVisible') {
        inViewRef(node);
      }
    },
    [inViewRef, whenToHydrate]
  );
  
  // Set up event listeners for 'onInteraction' strategy
  useEffect(() => {
    if (
      whenToHydrate === 'onInteraction' &&
      !isHydrated &&
      containerRef.current &&
      typeof window !== 'undefined'
    ) {
      const element = containerRef.current;
      
      // Add event listeners
      eventTypes.forEach((eventType) => {
        element.addEventListener(eventType, hydrate, { once: true });
      });
      
      // Cleanup event listeners
      return () => {
        eventTypes.forEach((eventType) => {
          element.removeEventListener(eventType, hydrate);
        });
      };
    }
  }, [whenToHydrate, isHydrated, eventTypes, hydrate]);
  
  // Set up requestIdleCallback for 'whenIdle' strategy
  useEffect(() => {
    if (
      whenToHydrate === 'whenIdle' &&
      !isHydrated &&
      typeof window !== 'undefined'
    ) {
      // Use requestIdleCallback or setTimeout fallback
      const idleCallback =
        'requestIdleCallback' in window
          ? window.requestIdleCallback
          : (cb: IdleRequestCallback) => setTimeout(cb, 1000 + priority * 500);
      
      const handle = idleCallback(() => {
        hydrate();
      }, { timeout: 4000 + priority * 1000 });
      
      // Cleanup
      return () => {
        if ('cancelIdleCallback' in window) {
          window.cancelIdleCallback(handle as number);
        } else {
          clearTimeout(handle as number);
        }
      };
    }
  }, [whenToHydrate, isHydrated, hydrate, priority]);
  
  // Add data attributes for debugging in development
  const devAttributes = process.env.NODE_ENV === 'development'
    ? {
        'data-hydrate-when': whenToHydrate,
        'data-hydrated': isHydrated ? 'true' : 'false',
        'data-priority': priority.toString(),
      }
    : {};
  
  // Return the component with appropriate hydration state
  return (
    <div
      ref={setRefs}
      className={className}
      id={id}
      {...devAttributes}
    >
      {isHydrated ? (
        <Suspense fallback={placeholder || null}>
          {children}
        </Suspense>
      ) : (
        placeholder || children
      )}
    </div>
  );
};

export default LazyHydrate;
