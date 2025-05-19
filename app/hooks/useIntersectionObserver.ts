import { useRef, useState, useEffect } from 'react';

type IntersectionObserverOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
};

/**
 * A hook to efficiently detect when an element enters or leaves the viewport
 * using the IntersectionObserver API
 * 
 * @param options - IntersectionObserver options plus 'once' option to disconnect after first intersection
 * @returns [ref, isIntersecting, entry] - Tuple with ref to attach, boolean indicating visibility, and the full intersection entry
 */
export function useIntersectionObserver(options: IntersectionObserverOptions = {}) {
  const { 
    root = null, 
    rootMargin = '0px', 
    threshold = 0, 
    once = false 
  } = options;
  
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const elementRef = useRef<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    const node = elementRef.current;
    
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    
    // Skip if no element to observe or SSR
    if (!node || typeof IntersectionObserver === 'undefined') return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
        setIsIntersecting(entry.isIntersecting);
        
        // Disconnect observer after first intersection if 'once' is true
        if (entry.isIntersecting && once && observer) {
          observer.disconnect();
        }
      },
      { root, rootMargin, threshold }
    );
    
    observer.observe(node);
    observerRef.current = observer;
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [root, rootMargin, threshold, once]);
  
  const setRef = (node: Element | null) => {
    elementRef.current = node;
  };
  
  return [setRef, isIntersecting, entry] as const;
}
