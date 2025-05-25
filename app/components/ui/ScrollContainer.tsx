import React from 'react';

interface ScrollContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * ScrollContainer - A wrapper component with position: relative
 * Fixes Framer Motion scroll warning: "Please ensure that the container has a non-static position"
 */
export function ScrollContainer({ children, className = '' }: ScrollContainerProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
} 