import React from 'react';
import clsx from 'clsx';

type CardVariant = 'default' | 'outlined' | 'elevated' | 'flat';

interface CardProps {
  variant?: CardVariant;
  className?: string;
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  as?: React.ElementType;
  onClick?: () => void;
  hoverable?: boolean;
  fullWidth?: boolean;
}

export function Card({
  variant = 'default',
  className,
  children,
  padding = 'md',
  as: Component = 'div',
  onClick,
  hoverable = false,
  fullWidth = false,
}: CardProps) {
  return (
    <Component
      className={clsx(
        'section-card rounded-lg overflow-hidden',
        {
          // Variant styles
          'bg-white border border-neutral-200': variant === 'default',
          'bg-white border-2 border-rose-100': variant === 'outlined',
          'bg-white border border-neutral-100 shadow-md': variant === 'elevated',
          'bg-neutral-50': variant === 'flat',
          
          // Padding styles
          'p-0': padding === 'none',
          'p-3': padding === 'sm',
          'p-5': padding === 'md',
          'p-8': padding === 'lg',
          
          // Hover styles
          'transition-all duration-200 hover:-translate-y-1 hover:shadow-lg': hoverable,
          'cursor-pointer': onClick || hoverable,
          
          // Width
          'w-full': fullWidth,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export function CardContent({ className, children }: CardContentProps) {
  return (
    <div className={clsx('brand-body', className)}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function CardHeader({ className, children, action }: CardHeaderProps) {
  return (
    <div className={clsx('flex items-center justify-between mb-4', className)}>
      <div className="brand-heading">{children}</div>
      {action && <div>{action}</div>}
    </div>
  );
}

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right' | 'between';
}

export function CardFooter({ className, children, align = 'left' }: CardFooterProps) {
  return (
    <div 
      className={clsx(
        'mt-4 pt-4 border-t border-neutral-200 brand-body', 
        {
          'text-left': align === 'left',
          'text-center': align === 'center',
          'text-right': align === 'right',
          'flex items-center justify-between': align === 'between',
        },
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: '1/1' | '16/9' | '3/2' | '4/3';
}

export function CardImage({ src, alt, className, aspectRatio = '16/9' }: CardImageProps) {
  return (
    <div 
      className={clsx(
        'w-full overflow-hidden', 
        {
          'aspect-square': aspectRatio === '1/1',
          'aspect-video': aspectRatio === '16/9',
          'aspect-[3/2]': aspectRatio === '3/2',
          'aspect-[4/3]': aspectRatio === '4/3',
        },
        className
      )}
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
      />
    </div>
  );
} 