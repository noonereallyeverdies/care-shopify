import React from 'react';

// Extracted AspirationalMoment component
export const AspirationalMoment: React.FC<{ 
  image: string; 
  quote: string; 
  source: string; 
}> = ({ image, quote, source }) => {
  // Note: Removed framer-motion hooks and elements as per previous simplification steps.
  // If animation is desired here later, it needs to be re-added carefully.
  return (
    <div className="content-card"> {/* Base card style from app.css */}
      <div className="aspect-w-16 aspect-h-9 overflow-hidden">
        <img src={image} alt="Aspirational moment" className="w-full h-full object-cover" />
      </div>
      <div className="p-6 flex-grow flex flex-col justify-between border-t border-neutral-100">
        <blockquote className="text-base md:text-lg italic text-neutral-600 mb-4 leading-relaxed flex-grow">
          "{quote}"
        </blockquote>
        <p className="text-sm text-rose-500 font-medium mt-2">
          {source}
        </p>
      </div>
    </div>
  );
}; 