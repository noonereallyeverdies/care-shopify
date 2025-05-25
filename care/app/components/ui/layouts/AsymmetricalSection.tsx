import React from 'react';

// Extracted AsymmetricalSection component
export const AsymmetricalSection: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  reverse?: boolean; 
}> = ({children, className = '', reverse = false}) => (
  <section className={`relative w-full py-16 md:py-20 lg:py-24 ${className}`}> 
    <div className={`grid grid-cols-12 gap-6 lg:gap-12 ${reverse ? 'direction-rtl' : ''}`}>
      {children}
    </div>
  </section>
); 