import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';

type CircleProps = {
  delay?: number;
  intensity?: number;
};

export const BlueRadiatingCircle = ({ delay = 0, intensity = 1 }: CircleProps) => {
  const prefersReducedMotion = useReducedMotion();
  
  // Consistent animation timing variables
  const baseAnimationDuration = 4;
  const easingType = "easeInOut";
  
  // Scale intensity based on reduced motion preference
  const effectiveIntensity = prefersReducedMotion ? Math.min(intensity * 0.5, 0.7) : intensity;
  
  // Adjust animations based on reduced motion preference
  const circleVariants: Variants = {
    initial: { 
      opacity: 0.8,
      scale: 0.2,
    },
    animate: { 
      opacity: [0.8, 0.2, 0],
      scale: [0.2, 1, 1.2],
      transition: {
        duration: prefersReducedMotion ? baseAnimationDuration * 1.5 : baseAnimationDuration,
        delay: delay,
        repeat: Infinity,
        repeatDelay: prefersReducedMotion ? 0.5 : 0,
        ease: easingType,
      }
    }
  };

  return (
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{
        background: `radial-gradient(circle, rgba(59, 130, 246, ${0.4 * effectiveIntensity}) 0%, rgba(59, 130, 246, ${0.2 * effectiveIntensity}) 70%, transparent 100%)`,
        filter: prefersReducedMotion ? 'blur(1px)' : 'blur(2px)',
      }}
      initial="initial"
      animate="animate"
      variants={circleVariants}
    />
  );
}; 