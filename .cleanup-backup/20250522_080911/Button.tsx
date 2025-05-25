import React from 'react';
import { Link } from '@remix-run/react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface ButtonLinkProps extends Omit<ButtonProps, 'onClick'> {
  to: string;
  external?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center transition-colors font-normal rounded-md brand-body w-full md:w-auto',
        {
          // Variant styles
          'bg-rose-500 text-white hover:bg-rose-600 focus:ring-2 focus:ring-rose-500/50': variant === 'primary',
          'bg-neutral-800 text-white hover:bg-neutral-900 focus:ring-2 focus:ring-neutral-800/50': variant === 'secondary',
          'bg-transparent border border-current text-rose-500 hover:text-rose-600 focus:ring-2 focus:ring-rose-500/50': variant === 'outline',
          'bg-transparent text-rose-500 hover:text-rose-600 hover:underline underline-offset-2': variant === 'text',
          
          // Size styles
          'text-sm px-4 py-2': size === 'sm',
          'text-base px-6 py-3': size === 'md',
          'text-lg px-8 py-4': size === 'lg',
          
          // Width - Apply fullWidth override specifically for larger screens if needed
          'md:w-full': fullWidth,
          
          // Disabled state
          'opacity-50 cursor-not-allowed pointer-events-none': disabled,
        },
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className,
  to,
  external = false,
  disabled,
  ...props
}: ButtonLinkProps) {
  const buttonClasses = clsx(
    'inline-flex items-center justify-center transition-colors font-normal rounded-md brand-body w-full md:w-auto',
    {
      // Variant styles
      'bg-rose-500 text-white hover:bg-rose-600 focus:ring-2 focus:ring-rose-500/50': variant === 'primary',
      'bg-neutral-800 text-white hover:bg-neutral-900 focus:ring-2 focus:ring-neutral-800/50': variant === 'secondary',
      'bg-transparent border border-current text-rose-500 hover:text-rose-600 focus:ring-2 focus:ring-rose-500/50': variant === 'outline',
      'bg-transparent text-rose-500 hover:text-rose-600 hover:underline underline-offset-2': variant === 'text',
      
      // Size styles
      'text-sm px-4 py-2': size === 'sm',
      'text-base px-6 py-3': size === 'md',
      'text-lg px-8 py-4': size === 'lg',
      
      // Width - Apply fullWidth override specifically for larger screens if needed
      'md:w-full': fullWidth,
      
      // Disabled state
      'opacity-50 cursor-not-allowed pointer-events-none': disabled,
    },
    className
  );

  if (external) {
    return (
      <a 
        href={to} 
        className={buttonClasses} 
        target="_blank" 
        rel="noopener noreferrer" 
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link 
      to={to} 
      className={buttonClasses} 
      {...props}
    >
      {children}
    </Link>
  );
} 