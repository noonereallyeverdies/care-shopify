import React from 'react';
import clsx from 'clsx';

/**
 * Card Component
 * 
 * A flexible card component with various styling options,
 * designed to be consistent with the Care•atin brand identity.
 * 
 * @param {string} variant - The card styling variant ('default', 'outlined', 'elevated', 'flat')
 * @param {string} padding - Padding size ('sm', 'md', 'lg')
 * @param {boolean} hoverable - Whether the card should have hover effects
 * @param {React.ReactNode} children - Card content
 * @param {string} className - Additional CSS classes to apply
 */
export const Card = ({
  variant = 'default',
  padding = 'md',
  hoverable = false,
  children,
  className,
}: {
  variant?: 'default' | 'outlined' | 'elevated' | 'flat';
  padding?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  children: React.ReactNode;
  className?: string;
}) => {
  // Map variant to className
  const variantClasses = {
    'default': 'bg-white border border-neutral-100',
    'outlined': 'bg-white border border-rose-200',
    'elevated': 'bg-white shadow-md',
    'flat': 'bg-neutral-50',
  }[variant] || 'bg-white border border-neutral-100';
  
  // Map padding to className
  const paddingClasses = {
    'sm': 'p-4',
    'md': 'p-6',
    'lg': 'p-8',
  }[padding] || 'p-6';
  
  // Hover effect classes
  const hoverClasses = hoverable
    ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1'
    : '';

  return (
    <div
      className={clsx(
        'rounded-lg overflow-hidden',
        variantClasses,
        paddingClasses,
        hoverClasses,
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * CardHeader Component
 * 
 * The header section of a Card component.
 */
export const CardHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx('mb-4', className)}>
      {children}
    </div>
  );
};

/**
 * CardContent Component
 * 
 * The main content section of a Card component.
 */
export const CardContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx('', className)}>
      {children}
    </div>
  );
};

/**
 * CardFooter Component
 * 
 * The footer section of a Card component.
 * 
 * @param {string} align - Alignment of footer content ('start', 'center', 'end', 'between')
 */
export const CardFooter = ({
  align = 'start',
  children,
  className,
}: {
  align?: 'start' | 'center' | 'end' | 'between';
  children: React.ReactNode;
  className?: string;
}) => {
  // Map alignment to className
  const alignClasses = {
    'start': 'justify-start',
    'center': 'justify-center',
    'end': 'justify-end',
    'between': 'justify-between',
  }[align] || 'justify-start';

  return (
    <div className={clsx('mt-4 flex items-center', alignClasses, className)}>
      {children}
    </div>
  );
};
