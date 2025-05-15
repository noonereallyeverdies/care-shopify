import React from 'react';
import { Link } from '@remix-run/react';
import clsx from 'clsx';

/**
 * Button Component
 * 
 * A flexible button component with various styling options,
 * designed to be consistent with the Care•atin brand identity.
 * 
 * @param {string} variant - The button styling variant ('primary', 'secondary', 'outline', 'text')
 * @param {string} size - Button size ('sm', 'md', 'lg')
 * @param {React.ReactNode} children - Button text/content
 * @param {string} className - Additional CSS classes to apply
 * @param {React.ButtonHTMLAttributes} props - Additional button props
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  // Map variant to className
  const variantClasses = {
    'primary': 'bg-rose-500 text-white hover:bg-rose-600 shadow-md',
    'secondary': 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-md',
    'outline': 'bg-transparent border border-rose-500 text-rose-500 hover:bg-rose-50',
    'text': 'bg-transparent text-rose-500 hover:text-rose-600 shadow-none',
  }[variant] || 'bg-rose-500 text-white hover:bg-rose-600';
  
  // Map size to className
  const sizeClasses = {
    'sm': 'text-sm px-4 py-2',
    'md': 'text-base px-6 py-3',
    'lg': 'text-lg px-8 py-4',
  }[size] || 'text-base px-6 py-3';

  return (
    <button
      className={clsx(
        'font-medium rounded-full transition-all duration-300',
        variantClasses,
        sizeClasses,
        variant !== 'text' && 'hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * ButtonLink Component
 * 
 * A link styled as a button, with the same styling options as the Button component.
 * 
 * @param {string} variant - The button styling variant ('primary', 'secondary', 'outline', 'text')
 * @param {string} size - Button size ('sm', 'md', 'lg')
 * @param {string} to - The destination URL
 * @param {React.ReactNode} children - Button text/content
 * @param {string} className - Additional CSS classes to apply
 * @param {React.AnchorHTMLAttributes} props - Additional anchor props
 */
export const ButtonLink = ({
  variant = 'primary',
  size = 'md',
  to,
  children,
  className,
  ...props
}: {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  to: string;
  children: React.ReactNode;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) => {
  // Map variant to className
  const variantClasses = {
    'primary': 'bg-rose-500 text-white hover:bg-rose-600 shadow-md',
    'secondary': 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-md',
    'outline': 'bg-transparent border border-rose-500 text-rose-500 hover:bg-rose-50',
    'text': 'bg-transparent text-rose-500 hover:text-rose-600 shadow-none',
  }[variant] || 'bg-rose-500 text-white hover:bg-rose-600';
  
  // Map size to className
  const sizeClasses = {
    'sm': 'text-sm px-4 py-2',
    'md': 'text-base px-6 py-3',
    'lg': 'text-lg px-8 py-4',
  }[size] || 'text-base px-6 py-3';

  // External link check
  const isExternal = to.startsWith('http') || to.startsWith('mailto:') || to.startsWith('tel:');

  if (isExternal) {
    return (
      <a
        href={to}
        className={clsx(
          'inline-block text-center font-medium rounded-full transition-all duration-300',
          variantClasses,
          sizeClasses,
          variant !== 'text' && 'hover:-translate-y-0.5',
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      to={to}
      className={clsx(
        'inline-block text-center font-medium rounded-full transition-all duration-300',
        variantClasses,
        sizeClasses,
        variant !== 'text' && 'hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
