import { Suspense, lazy, ComponentType, useState, useEffect } from 'react';
import type { MotionProps, HTMLMotionProps } from 'framer-motion';

// Lazy load framer-motion
const MotionDiv = lazy(async () => {
  const { motion } = await import('framer-motion');
  return { default: motion.div };
});

const MotionSection = lazy(async () => {
  const { motion } = await import('framer-motion');
  return { default: motion.section };
});

const MotionSpan = lazy(async () => {
  const { motion } = await import('framer-motion');
  return { default: motion.span };
});

const MotionButton = lazy(async () => {
  const { motion } = await import('framer-motion');
  return { default: motion.button };
});

const MotionH1 = lazy(async () => {
  const { motion } = await import('framer-motion');
  return { default: motion.h1 };
});

const MotionH2 = lazy(async () => {
  const { motion } = await import('framer-motion');
  return { default: motion.h2 };
});

const MotionH3 = lazy(async () => {
  const { motion } = await import('framer-motion');
  return { default: motion.h3 };
});

const MotionP = lazy(async () => {
  const { motion } = await import('framer-motion');
  return { default: motion.p };
});

const MotionA = lazy(async () => {
  const { motion } = await import('framer-motion');
  return { default: motion.a };
});

const MotionImg = lazy(async () => {
  const { motion } = await import('framer-motion');
  return { default: motion.img };
});

const MotionLi = lazy(async () => {
  const { motion } = await import('framer-motion');
  return { default: motion.li };
});

// Fallback component for loading state
const MotionFallback = ({ 
  children, 
  className,
  ...props 
}: { 
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => (
  <div className={className} {...props}>
    {children}
  </div>
);

// HOC for creating dynamic motion components
function createDynamicMotion<T extends keyof JSX.IntrinsicElements>(
  LazyComponent: ComponentType<any>,
  fallbackTag: T
) {
  return function DynamicMotionComponent(props: HTMLMotionProps<T>) {
    return (
      <Suspense fallback={<MotionFallback {...props} />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

// Export dynamic motion components
export const motion = {
  div: createDynamicMotion(MotionDiv, 'div'),
  section: createDynamicMotion(MotionSection, 'section'),
  span: createDynamicMotion(MotionSpan, 'span'),
  button: createDynamicMotion(MotionButton, 'button'),
  h1: createDynamicMotion(MotionH1, 'h1'),
  h2: createDynamicMotion(MotionH2, 'h2'),
  h3: createDynamicMotion(MotionH3, 'h3'),
  p: createDynamicMotion(MotionP, 'p'),
  a: createDynamicMotion(MotionA, 'a'),
  img: createDynamicMotion(MotionImg, 'img'),
  li: createDynamicMotion(MotionLi, 'li'),
};

// Dynamic AnimatePresence
export const AnimatePresence = lazy(async () => {
  const { AnimatePresence } = await import('framer-motion');
  return { default: AnimatePresence };
});

// Dynamic hooks
export const useScroll = () => {
  const [scrollHook, setScrollHook] = useState(null);
  
  useEffect(() => {
    import('framer-motion').then(({ useScroll }) => {
      setScrollHook(useScroll);
    });
  }, []);
  
  return scrollHook ? scrollHook() : { scrollY: { current: 0 } };
};

export const useTransform = (...args: any[]) => {
  const [transform, setTransform] = useState(() => () => args[0]);
  
  useEffect(() => {
    import('framer-motion').then(({ useTransform }) => {
      setTransform(() => useTransform(...args));
    });
  }, []);
  
  return transform;
};

export const useAnimation = () => {
  const [controls, setControls] = useState(null);
  
  useEffect(() => {
    import('framer-motion').then(({ useAnimation }) => {
      setControls(useAnimation());
    });
  }, []);
  
  return controls || { start: () => {}, stop: () => {} };
};

export const useInView = (ref: any, options?: any) => {
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    import('framer-motion').then(({ useInView }) => {
      const result = useInView(ref, options);
      setInView(result);
    });
  }, [ref, options]);
  
  return inView;
};

// Helper to check if animations should be disabled
export const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return reducedMotion;
};
