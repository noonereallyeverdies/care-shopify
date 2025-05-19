import React, { memo, useMemo, useCallback, forwardRef } from 'react';
import { cn } from '~/lib/utils';

// Optimized Button Component with better performance patterns
interface OptimizedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const OptimizedButton = memo(forwardRef<HTMLButtonElement, OptimizedButtonProps>(
  ({ variant = 'primary', size = 'md', loading, className, children, onClick, ...props }, ref) => {
    // Memoize class computation
    const buttonClasses = useMemo(() => cn(
      // Base styles
      'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      // Variant styles
      {
        'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'secondary',
        'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
      },
      // Size styles
      {
        'h-9 rounded-md px-3 text-sm': size === 'sm',
        'h-10 px-4 py-2 rounded-md': size === 'md',
        'h-11 rounded-md px-8 text-lg': size === 'lg',
      },
      className
    ), [variant, size, className]);

    // Memoize click handler to prevent unnecessary re-renders
    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      if (!loading && onClick) {
        onClick(e);
      }
    }, [loading, onClick]);

    return (
      <button
        ref={ref}
        className={buttonClasses}
        onClick={handleClick}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && (
          <svg 
            className="mr-2 h-4 w-4 animate-spin" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
));

OptimizedButton.displayName = 'OptimizedButton';

// Optimized Image Component with lazy loading and performance optimizations
interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

export const OptimizedImage = memo(forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ src, alt, loading = 'lazy', priority = false, sizes, quality = 75, className, ...props }, ref) => {
    // Memoize responsive image logic
    const { srcSet, optimizedSrc } = useMemo(() => {
      // If Shopify image, generate responsive srcSet
      if (src.includes('cdn.shopify.com')) {
        const baseUrl = src.split('?')[0];
        const srcSet = [
          `${baseUrl}?width=480&quality=${quality} 480w`,
          `${baseUrl}?width=768&quality=${quality} 768w`,
          `${baseUrl}?width=1024&quality=${quality} 1024w`,
          `${baseUrl}?width=1440&quality=${quality} 1440w`,
          `${baseUrl}?width=1920&quality=${quality} 1920w`,
        ].join(', ');
        
        return {
          srcSet,
          optimizedSrc: `${baseUrl}?width=768&quality=${quality}`
        };
      }
      
      return { srcSet: undefined, optimizedSrc: src };
    }, [src, quality]);

    const imageClasses = useMemo(() => cn(
      'transition-opacity duration-300',
      className
    ), [className]);

    return (
      <img
        ref={ref}
        src={optimizedSrc}
        srcSet={srcSet}
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
        alt={alt}
        loading={priority ? 'eager' : loading}
        className={imageClasses}
        {...props}
      />
    );
  }
));

OptimizedImage.displayName = 'OptimizedImage';

// Optimized Text Component with performance patterns
interface OptimizedTextProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'muted' | 'accent';
  className?: string;
  children: React.ReactNode;
}

export const OptimizedText = memo<OptimizedTextProps>(({
  as: Tag = 'p',
  size = 'base',
  weight = 'normal',
  color = 'primary',
  className,
  children,
  ...props
}) => {
  // Memoize class computation
  const textClasses = useMemo(() => cn(
    // Size styles
    {
      'text-xs': size === 'xs',
      'text-sm': size === 'sm',
      'text-base': size === 'base',
      'text-lg': size === 'lg',
      'text-xl': size === 'xl',
      'text-2xl': size === '2xl',
      'text-3xl': size === '3xl',
      'text-4xl': size === '4xl',
    },
    // Weight styles
    {
      'font-light': weight === 'light',
      'font-normal': weight === 'normal',
      'font-medium': weight === 'medium',
      'font-semibold': weight === 'semibold',
      'font-bold': weight === 'bold',
    },
    // Color styles
    {
      'text-primary': color === 'primary',
      'text-secondary': color === 'secondary',
      'text-muted-foreground': color === 'muted',
      'text-accent': color === 'accent',
    },
    className
  ), [size, weight, color, className]);

  return (
    <Tag className={textClasses} {...props}>
      {children}
    </Tag>
  );
});

OptimizedText.displayName = 'OptimizedText';

// Optimized Container Component with responsive logic
interface OptimizedContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export const OptimizedContainer = memo<OptimizedContainerProps>(({
  size = 'lg',
  padding = 'md',
  className,
  children,
  ...props
}) => {
  // Memoize container classes
  const containerClasses = useMemo(() => cn(
    'mx-auto',
    // Size styles
    {
      'max-w-sm': size === 'sm',
      'max-w-2xl': size === 'md', 
      'max-w-4xl': size === 'lg',
      'max-w-6xl': size === 'xl',
      'max-w-none': size === 'full',
    },
    // Padding styles
    {
      'px-0': padding === 'none',
      'px-4': padding === 'sm',
      'px-6': padding === 'md',
      'px-8': padding === 'lg',
    },
    className
  ), [size, padding, className]);

  return (
    <div className={containerClasses} {...props}>
      {children}
    </div>
  );
});

OptimizedContainer.displayName = 'OptimizedContainer';

// Optimized Grid Component with responsive patterns
interface OptimizedGridProps {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: {
    mobile?: 1 | 2 | 3;
    tablet?: 1 | 2 | 3 | 4;
    desktop?: 1 | 2 | 3 | 4 | 6 | 12;
  };
  className?: string;
  children: React.ReactNode;
}

export const OptimizedGrid = memo<OptimizedGridProps>(({
  cols = 1,
  gap = 'md',
  responsive,
  className,
  children,
  ...props
}) => {
  // Memoize grid classes with responsive logic
  const gridClasses = useMemo(() => {
    const classes = ['grid'];
    
    // Add responsive column classes
    if (responsive) {
      if (responsive.mobile) {
        classes.push(`grid-cols-${responsive.mobile}`);
      }
      if (responsive.tablet) {
        classes.push(`md:grid-cols-${responsive.tablet}`);
      }
      if (responsive.desktop) {
        classes.push(`lg:grid-cols-${responsive.desktop}`);
      }
    } else {
      classes.push(`grid-cols-${cols}`);
    }
    
    // Add gap classes
    const gapClasses = {
      'none': 'gap-0',
      'sm': 'gap-2',
      'md': 'gap-4',
      'lg': 'gap-6',
      'xl': 'gap-8',
    };
    classes.push(gapClasses[gap]);
    
    return cn(classes, className);
  }, [cols, gap, responsive, className]);

  return (
    <div className={gridClasses} {...props}>
      {children}
    </div>
  );
});

OptimizedGrid.displayName = 'OptimizedGrid';

// Optimized Section Component with intersection observer for animations
interface OptimizedSectionProps {
  id?: string;
  className?: string;
  background?: 'white' | 'gray' | 'primary';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  width?: 'container' | 'full';
  animate?: boolean;
  children: React.ReactNode;
}

export const OptimizedSection = memo<OptimizedSectionProps>(({
  id,
  className,
  background = 'white',
  padding = 'lg',
  width = 'container',
  animate = false,
  children,
  ...props
}) => {
  // Memoize section classes
  const sectionClasses = useMemo(() => cn(
    // Background styles
    {
      'bg-white': background === 'white',
      'bg-gray-50': background === 'gray',
      'bg-primary': background === 'primary',
    },
    // Padding styles
    {
      'py-8': padding === 'sm',
      'py-12 md:py-16': padding === 'md',
      'py-16 md:py-24': padding === 'lg',
      'py-20 md:py-32': padding === 'xl',
    },
    className
  ), [background, padding, className]);

  const contentClasses = useMemo(() => cn(
    {
      'container mx-auto px-6': width === 'container',
      'w-full': width === 'full',
    }
  ), [width]);

  // If animation is enabled, use intersection observer
  if (animate) {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return (
      <section
        ref={ref}
        id={id}
        className={sectionClasses}
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        }}
        {...props}
      >
        <div className={contentClasses}>
          {children}
        </div>
      </section>
    );
  }

  return (
    <section id={id} className={sectionClasses} {...props}>
      <div className={contentClasses}>
        {children}
      </div>
    </section>
  );
});

OptimizedSection.displayName = 'OptimizedSection';

// Higher-order component for performance optimization
export const withPerformanceOptimization = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  shouldUpdate?: (prevProps: P, nextProps: P) => boolean
) => {
  const OptimizedComponent = memo(WrappedComponent, shouldUpdate);
  
  return forwardRef<any, P>((props, ref) => (
    <OptimizedComponent {...props} ref={ref} />
  ));
};

// Lazy loading wrapper with error boundary
interface LazyComponentProps {
  fallback?: React.ReactNode;
  error?: React.ReactNode;
  children: React.ReactNode;
}

export const LazyComponentWrapper = memo<LazyComponentProps>(({
  fallback = <div>Loading...</div>,
  error = <div>Something went wrong</div>,
  children,
}) => (
  <React.Suspense fallback={fallback}>
    <ErrorBoundary fallback={error}>
      {children}
    </ErrorBoundary>
  </React.Suspense>
));

// Simple error boundary for lazy components
class ErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lazy component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default {
  OptimizedButton,
  OptimizedImage,
  OptimizedText,
  OptimizedContainer,
  OptimizedGrid,
  OptimizedSection,
  withPerformanceOptimization,
  LazyComponentWrapper,
};
