import { useState, useEffect, useRef } from 'react';

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds have elapsed
 * since the last time the debounced function was invoked.
 * @param fn Function to debounce
 * @param ms Milliseconds to delay (default: 300ms)
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(fn: T, ms = 300): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return function(this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

/**
 * Hook that tracks dimensions of a DOM element with debouncing
 * @param ref React ref to the element to measure
 * @param delay Debounce delay in ms (default: 250ms)
 * @returns Object containing width and height
 */
export function useDebouncedDimensions(ref: React.RefObject<HTMLElement>, delay = 250) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const handleResize = debounce(() => {
      if (ref.current) {
        setDimensions({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight
        });
      }
    }, delay);

    // Initial measurement
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [ref, delay]);

  return dimensions;
}

/**
 * Hook that tracks mouse position with debouncing
 * @param delay Debounce delay in ms (default: 100ms)
 * @returns Object containing x and y coordinates
 */
export function useDebouncedMousePosition(delay = 100) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = debounce((e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }, delay);
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [delay]);
  
  return mousePosition;
}

/**
 * Hook that triggers a callback when an element is scrolled into view
 * Uses IntersectionObserver for better performance than scroll events
 * @param options IntersectionObserver options
 * @returns [ref, isInView] - Ref to attach to element and boolean indicating if element is in view
 */
export function useIntersectionObserver(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, { threshold: 0.1, rootMargin: '0px', ...options });
    
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);
  
  return [ref, isInView];
}
