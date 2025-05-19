import {forwardRef} from 'react';
import {cn} from '~/lib/utils';

export const Input = forwardRef(
  (
    {
      className = '',
      type = 'text',
      variant = 'default',
      error,
      ...props
    }: {
      className?: string;
      type?: string;
      variant?: 'default' | 'search';
      error?: string;
      [key: string]: any;
    },
    ref,
  ) => {
    const baseStyles = 'w-full px-3 py-2 text-sm rounded-md border border-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200';
    
    const variantStyles = {
      default: '',
      search: 'pl-10', // Extra padding for search icon
    };

    const errorStyles = error 
      ? 'border-red-500 focus:ring-red-200 focus:border-red-500' 
      : '';

    const styles = cn(
      baseStyles,
      variantStyles[variant],
      errorStyles,
      className
    );

    return (
      <div className="relative">
        <input
          type={type}
          className={styles}
          ref={ref as any}
          {...props}
        />
        {error && (
          <p className="text-red-500 text-xs mt-1">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
