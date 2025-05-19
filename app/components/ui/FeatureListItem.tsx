import React from 'react';
import type { LucideProps } from 'lucide-react';

// Extracted FeatureListItem component
export const FeatureListItem: React.FC<{ 
  icon: React.ComponentType<LucideProps>; 
  text: string; 
}> = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-3">
    <div className="bg-rose-50 rounded-full p-2 shrink-0 w-8 h-8 flex items-center justify-center border border-rose-100">
      <Icon className="h-4 w-4 text-rose-600" strokeWidth={1.5} />
    </div>
    <p className="text-neutral-700 text-sm md:text-base leading-snug">{text}</p>
  </div>
); 