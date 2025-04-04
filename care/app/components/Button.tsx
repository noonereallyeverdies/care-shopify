import {forwardRef} from 'react';
import {Link} from '@remix-run/react';
import clsx from 'clsx';

import {missingClass} from '~/lib/utils';

export const Button = forwardRef(
  (
    {
      as = 'button',
      className = '',
      variant = 'primary',
      width = 'auto',
      size = 'medium',
      ...props
    }: {
      as?: React.ElementType;
      className?: string;
      variant?: 'primary' | 'secondary' | 'inline' | 'apple' | 'glossier' | 'ghost' | 'minimal';
      width?: 'auto' | 'full';
      size?: 'small' | 'medium' | 'large';
      [key: string]: any;
    },
    ref,
  ) => {
    const Component = props?.to ? Link : as;

    // Common styles
    const baseButtonClasses = 'font-medium text-center transition-all duration-300 focus:outline-none';
    
    // Size variations
    const sizes = {
      small: 'py-2 px-4 text-sm rounded-full',
      medium: 'py-3 px-6 rounded-full',
      large: 'py-4 px-8 text-lg rounded-full',
    };

    // Style variations
    const variants = {
      // Enhanced versions of original variants
      primary: `${baseButtonClasses} ${sizes[size]} bg-primary text-contrast hover:bg-primary/90 shadow-apple-sm hover:shadow-apple-md active:scale-[0.98]`,
      secondary: `${baseButtonClasses} ${sizes[size]} border border-primary/10 bg-contrast text-primary hover:bg-stone-100 shadow-apple-sm hover:shadow-apple-md active:scale-[0.98]`,
      inline: 'border-b border-primary/10 leading-none pb-1 hover:border-primary/30 transition-all duration-300',
      
      // New Apple-inspired variant
      apple: `${baseButtonClasses} ${sizes[size]} bg-stone-900 text-white hover:bg-stone-800 shadow-apple-sm hover:shadow-apple-md active:scale-[0.98]`,
      
      // New Glossier-inspired variant
      glossier: `${baseButtonClasses} ${sizes[size]} bg-rose-100 text-rose-800 hover:bg-rose-200 hover:text-rose-900 shadow-apple-sm hover:shadow-apple-md active:scale-[0.98]`,
      
      // Minimal variants
      ghost: `${baseButtonClasses} ${sizes[size]} bg-white/10 backdrop-blur-sm border border-white/20 text-primary hover:bg-white/20 active:scale-[0.98]`,
      minimal: `${baseButtonClasses} ${sizes[size]} text-primary/60 hover:text-primary hover:bg-stone-100/50 active:scale-[0.98]`,
    };

    const widths = {
      auto: 'w-auto',
      full: 'w-full',
    };

    const styles = clsx(
      missingClass(className, 'bg-') && variants[variant],
      missingClass(className, 'w-') && widths[width],
      className,
    );

    return (
      <Component
        // @todo: not supported until react-router makes it into Remix.
        // preventScrollReset={true}
        className={styles}
        {...props}
        ref={ref}
      />
    );
  },
);

// Add displayName for debugging
Button.displayName = 'Button';
