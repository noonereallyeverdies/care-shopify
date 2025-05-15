import { useEffect, useState, useRef } from 'react';

/**
 * Lightweight intersection observer hook for CSS animations
 * Alternative to Framer Motion's whileInView
 */
export function useInView(options: IntersectionObserverInit = {}) {
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);
        
        if (inView && !hasBeenInView) {
          setHasBeenInView(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasBeenInView, options]);

  return { ref, isInView, hasBeenInView };
}

/**
 * Simple hover state hook
 * Alternative to Framer Motion hover variants
 */
export function useHover() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { ref, isHovered };
}

/**
 * CSS class toggle hook for animations
 */
export function useAnimationClass(
  className: string,
  trigger: boolean,
  delay: number = 0
) {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (trigger) {
      const timeout = setTimeout(() => {
        setAnimationClass(className);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      setAnimationClass('');
    }
  }, [trigger, className, delay]);

  return animationClass;
}

/**
 * Staggered animation for children
 */
export function useStaggeredAnimation(
  childCount: number,
  baseDelay: number = 100
) {
  const [visibleChildren, setVisibleChildren] = useState(0);
  const { ref, isInView } = useInView();

  useEffect(() => {
    if (isInView && visibleChildren === 0) {
      for (let i = 0; i < childCount; i++) {
        setTimeout(() => {
          setVisibleChildren(prev => prev + 1);
        }, i * baseDelay);
      }
    }
  }, [isInView, childCount, baseDelay, visibleChildren]);

  return { ref, visibleChildren };
}

/**
 * Toggle state for accordions/toggles
 */
export function useToggle(initialState: boolean = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  
  const toggle = () => setIsOpen(prev => !prev);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, toggle, open, close };
}

/**
 * Counter animation hook
 */
export function useCounterAnimation(
  end: number,
  duration: number = 1000,
  start: number = 0
) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const { ref, isInView } = useInView();

  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true);
      let startTime: number;
      
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(start + (end - start) * easeOutQuart));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, isVisible, start, end, duration]);

  return { ref, count };
}

/**
 * Intersection observer with callback
 */
export function useIntersectionObserver(
  callback: (isIntersecting: boolean) => void,
  options: IntersectionObserverInit = {}
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => callback(entry.isIntersecting),
      options
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [callback, options]);

  return ref;
}
