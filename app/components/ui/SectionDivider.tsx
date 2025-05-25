import React from 'react';

interface SectionDividerProps {
  variant?: 'wave' | 'curve' | 'angle' | 'minimal';
  color?: 'white' | 'stone-50';
  flipped?: boolean;
}

export function SectionDivider({
  variant = 'minimal',
  color = 'white',
  flipped = false
}: SectionDividerProps) {
  
  const bgColor = color === 'white' ? 'fill-white' : 'fill-stone-50';
  
  // Rotate if flipped
  const transformClass = flipped ? 'transform rotate-180' : '';
  
  // Different divider shapes based on variant
  const renderDivider = () => {
    switch(variant) {
      case 'wave':
        return (
          <svg className={`w-full h-8 md:h-12 lg:h-16 ${transformClass}`} viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path className={bgColor} d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        );
      case 'curve':
        return (
          <svg className={`w-full h-8 md:h-12 lg:h-16 ${transformClass}`} viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path className={bgColor} d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"></path>
          </svg>
        );
      case 'angle':
        return (
          <svg className={`w-full h-8 md:h-12 lg:h-16 ${transformClass}`} viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path className={bgColor} d="M1200 0L0 0 892.25 114.72 1200 0z"></path>
          </svg>
        );
      case 'minimal':
      default:
        return (
          <div className="flex justify-center">
            <div className={`w-24 h-px bg-gradient-to-r from-transparent via-photonique-coral/30 to-transparent`}></div>
          </div>
        );
    }
  };
  
  return (
    <div className="w-full overflow-hidden">
      {renderDivider()}
    </div>
  );
}

export default SectionDivider;