import { Suspense, lazy, ComponentType, useState, useEffect } from 'react';
import type { SwiperProps } from 'swiper/react';

// Lazy load Swiper components
const LazySwiper = lazy(async () => {
  const { Swiper } = await import('swiper/react');
  return { default: Swiper };
});

const LazySwiperSlide = lazy(async () => {
  const { SwiperSlide } = await import('swiper/react');
  return { default: SwiperSlide };
});

// Lazy load Swiper modules
const loadSwiperModules = async (modules: string[]) => {
  const moduleMap: Record<string, any> = {};
  
  if (modules.includes('Navigation')) {
    const { Navigation } = await import('swiper/modules');
    moduleMap.Navigation = Navigation;
  }
  
  if (modules.includes('Pagination')) {
    const { Pagination } = await import('swiper/modules');
    moduleMap.Pagination = Pagination;
  }
  
  if (modules.includes('Autoplay')) {
    const { Autoplay } = await import('swiper/modules');
    moduleMap.Autoplay = Autoplay;
  }
  
  if (modules.includes('EffectFlip')) {
    const { EffectFlip } = await import('swiper/modules');
    moduleMap.EffectFlip = EffectFlip;
  }
  
  if (modules.includes('A11y')) {
    const { A11y } = await import('swiper/modules');
    moduleMap.A11y = A11y;
  }
  
  return Object.values(moduleMap);
};

// Fallback component for loading state
const SwiperFallback = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`swiper-fallback ${className || ''}`} style={{ display: 'flex', overflowX: 'auto' }}>
    {children}
  </div>
);

const SwiperSlideFallback = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`swiper-slide-fallback ${className || ''}`} style={{ minWidth: '100%', flexShrink: 0 }}>
    {children}
  </div>
);

// Dynamic Swiper component
interface DynamicSwiperProps extends SwiperProps {
  modules?: string[];
  fallbackClassName?: string;
}

export const DynamicSwiper = ({ modules = [], children, fallbackClassName, ...props }: DynamicSwiperProps) => {
  const [swiperModules, setSwiperModules] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadModules = async () => {
      const loadedModules = await loadSwiperModules(modules);
      setSwiperModules(loadedModules);
      setIsLoading(false);
    };
    
    loadModules();
  }, [modules]);
  
  if (isLoading) {
    return <SwiperFallback className={fallbackClassName}>{children}</SwiperFallback>;
  }
  
  return (
    <Suspense fallback={<SwiperFallback className={fallbackClassName}>{children}</SwiperFallback>}>
      <LazySwiper {...props} modules={swiperModules}>
        {children}
      </LazySwiper>
    </Suspense>
  );
};

// Dynamic SwiperSlide component
export const DynamicSwiperSlide = ({ children, className, ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => (
  <Suspense fallback={<SwiperSlideFallback className={className}>{children}</SwiperSlideFallback>}>
    <LazySwiperSlide {...props} className={className}>
      {children}
    </LazySwiperSlide>
  </Suspense>
);

// Dynamic CSS loader for Swiper styles
export const loadSwiperStyles = async (styles: string[] = []) => {
  const stylePromises = [
    // Always load core styles
    import('swiper/css'),
  ];
  
  // Load specific style modules
  if (styles.includes('navigation')) {
    stylePromises.push(import('swiper/css/navigation'));
  }
  
  if (styles.includes('pagination')) {
    stylePromises.push(import('swiper/css/pagination'));
  }
  
  if (styles.includes('effect-flip')) {
    stylePromises.push(import('swiper/css/effect-flip'));
  }
  
  if (styles.includes('autoplay')) {
    stylePromises.push(import('swiper/css/autoplay'));
  }
  
  await Promise.all(stylePromises);
};

// Hook for lazy loading Swiper styles
export const useSwiperStyles = (styles: string[] = []) => {
  const [stylesLoaded, setStylesLoaded] = useState(false);
  
  useEffect(() => {
    loadSwiperStyles(styles).then(() => {
      setStylesLoaded(true);
    });
  }, [styles]);
  
  return stylesLoaded;
};
