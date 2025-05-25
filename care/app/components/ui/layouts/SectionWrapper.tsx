import React from 'react';

// Extracted SectionWrapper component
export const SectionWrapper: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  fullWidth?: boolean; 
  as?: React.ElementType; // Use React.ElementType for the 'as' prop
}> = ({children, className = '', fullWidth = false, as: As = 'section'}) => (
  <As 
    className={`relative w-full ${fullWidth ? '' : 'max-w-5xl mx-auto px-6 md:px-8'} py-24 md:py-32 lg:py-36 ${className}`} 
  >
    {children}
  </As>
); 