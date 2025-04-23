import React from 'react';
import type { LucideProps } from 'lucide-react'; // Import type for icon components

// Extracted SectionIcon component
export const SectionIcon: React.FC<{ 
  icon: React.ComponentType<LucideProps>; // Use ComponentType with LucideProps
  className?: string; 
}> = ({icon: Icon, className = ''}) => (
  <div className={`flex justify-center mb-8 ${className}`}>
    <div className="bg-rose-100 rounded-full p-3 relative">
      <Icon className="h-8 w-8 md:h-10 md:w-10 text-rose-600 relative z-10" strokeWidth={1.5} />
    </div>
  </div>
); 