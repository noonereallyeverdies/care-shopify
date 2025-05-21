import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}

/**
 * Standard container component for consistent layout and alignment across sections
 * @param {React.ReactNode} children - Content to be displayed inside the container
 * @param {string} className - Additional classes to apply
 * @param {boolean} narrow - Whether to use a narrower max width (for text-heavy sections)
 */
export function Container({ children, className = '', narrow = false }: ContainerProps) {
  return (
    <div className={`container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 ${narrow ? 'max-w-5xl' : 'max-w-7xl'} ${className}`}>
      {children}
    </div>
  );
}

export default Container;
