import React from 'react';
import { motion } from 'framer-motion';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
  withContainer?: boolean;
  animate?: boolean;
  maxWidth?: string;
  id?: string;
}

/**
 * SectionContainer - A consistent wrapper for section content
 * Ensures proper positioning and layout for all section components
 */
export function SectionContainer({ 
  children, 
  className = '', 
  bgColor = 'bg-white',
  withContainer = true,
  animate = true,
  maxWidth = 'max-w-7xl',
  id
}: SectionContainerProps) {
  
  const sectionClasses = `py-16 md:py-24 relative ${bgColor} ${className}`;
  
  const content = withContainer ? (
    <div className={`container mx-auto px-4 sm:px-6 relative ${maxWidth}`}>
      {children}
    </div>
  ) : children;
  
  if (animate) {
    return (
      <motion.section
        id={id}
        className={sectionClasses}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {content}
      </motion.section>
    );
  }
  
  return (
    <section id={id} className={sectionClasses}>
      {content}
    </section>
  );
}

/**
 * SectionHeadingContainer - A consistent wrapper for section headings
 */
export function SectionHeadingContainer({ 
  children, 
  className = '',
  maxWidth = 'max-w-3xl'
}: {
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
}) {
  return (
    <div className={`text-center mb-12 md:mb-16 mx-auto ${maxWidth} flex flex-col items-center justify-center ${className}`}>
      {children}
    </div>
  );
} 