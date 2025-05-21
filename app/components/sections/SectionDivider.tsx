import React from 'react';
import { motion } from 'framer-motion';

type SectionDividerProps = {
  fromColor?: string;
  toColor?: string;
  height?: number;
  flip?: boolean;
  className?: string;
};

/**
 * SectionDivider creates a visually appealing transition between page sections
 * Height is responsive: base height on mobile, 1.5x on tablets, and 2x on desktop
 */
export function SectionDivider({ 
  fromColor = 'bg-white', 
  toColor = 'bg-stone-50', 
  height = 16, // Base height that scales responsively
  flip = false,
  className = ''
}: SectionDividerProps) {
  
  return (
    <div className={`relative ${fromColor} ${className}`}>
      <div 
        className={`absolute bottom-0 inset-x-0 overflow-hidden h-[${height}px] md:h-[${height * 1.5}px] lg:h-[${height * 2}px]`}
      >
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          style={{ 
            width: '100%', 
            height: '100%', // Use 100% height to fill the container
            transform: flip ? 'rotate(180deg)' : 'none'
          }}
        >
          <motion.path 
            className={`${toColor.startsWith('bg-') ? toColor.replace('bg-', 'fill-') : `fill-[${toColor}]`} opacity-50`}
            d="M0,0 Q300,50 600,25 T1200,50 V120 H0 Z" // Smoother, more subtle wave
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true }}
          />
        </svg>
      </div>
    </div>
  );
}

export default SectionDivider;
