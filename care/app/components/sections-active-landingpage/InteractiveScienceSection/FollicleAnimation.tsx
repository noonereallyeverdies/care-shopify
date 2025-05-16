import React from 'react';
import { motion } from 'framer-motion';

interface FollicleAnimationProps {
  animationState: string;
}

export const FollicleAnimation: React.FC<FollicleAnimationProps> = ({ animationState }) => {
  const stateColors = {
    dormant: '#F3F4F6', // Light gray
    penetration: '#FECACA', // Light red
    activation: '#FEE2E2', // Lighter red
    nourishment: '#BBDEFB', // Light blue
    growth: '#C7E8CA' // Light green
  };
  
  // Apple x Glossier aesthetic color palette adjustments
  const glossierStateColors = {
    dormant: '#F8F7F5', // Softer, creamier off-white
    penetration: '#FADBD8', // Soft rose pink for penetration
    activation: '#FDECEA', // Lighter, more delicate rose
    nourishment: '#E8F0FE', // Pale sky blue for nourishment
    growth: '#E6F5E0'      // Gentle sage green for growth
  };

  return (
    <motion.div 
      className="relative h-64 w-64 overflow-hidden rounded-full md:h-80 md:w-80 shadow-soft-lg border border-neutral-200/50 bg-cream-light visualizationPulse"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } }}
    >
      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-cream-light">
        <svg width="80%" height="80%" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M30,20 Q50,0 70,20 L70,150 Q50,180 30,150 Z" 
            fill={glossierStateColors[animationState as keyof typeof glossierStateColors] || glossierStateColors.dormant} 
            strokeWidth="1.5"
            stroke="#E0D9D0" // Softened stroke color
            className="transition-all duration-700"
          />
          <path 
            d="M50,20 L50,0" 
            stroke={animationState === 'growth' ? '#5C5650' : '#D4CAC2'} // Darker charcoal for growth, lighter for dormant
            strokeWidth={animationState === 'growth' ? "3" : "1.5"}
            className="transition-all duration-700 growth-hair"
          />
          {animationState !== 'dormant' && (
            <motion.circle 
              cx="50" 
              cy="130" 
              r={animationState === 'growth' ? "18" : "9"} // Slightly smaller circles for a more delicate feel
              fill={glossierStateColors[animationState as keyof typeof glossierStateColors]}
              initial={{ opacity: 0.5, scale: 0.8 }}
              animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1, 0.9], transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut"} }}
              className="pulse-effect"
            />
          )}
        </svg>
        <div className="absolute bottom-4 text-xs font-medium text-charcoal-muted">
          {animationState.charAt(0).toUpperCase() + animationState.slice(1)}
        </div>
      </div>
    </motion.div>
  );
}; 