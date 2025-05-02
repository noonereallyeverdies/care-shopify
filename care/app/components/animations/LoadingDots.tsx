import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';

type LoadingDotsProps = {
  color?: string;
  size?: number;
  speed?: number;
};

export const LoadingDots: React.FC<LoadingDotsProps> = ({
  color = '#3B82F6',
  size = 8,
  speed = 1,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const dots = [0, 1, 2];
  
  // Consistent animation timing
  const baseAnimationDuration = 0.6;
  const stagger = 0.15;
  const easingType = "easeInOut";
  
  // Adjust the animation duration based on speed and reduced motion preference
  const effectiveSpeed = prefersReducedMotion ? Math.max(speed * 0.7, 0.5) : speed;
  const duration = baseAnimationDuration / effectiveSpeed;
  
  const dotVariants: Variants = {
    initial: { 
      y: 0,
      opacity: 0.5,
    },
    animate: {
      y: prefersReducedMotion ? [-3, 0, -3] : [-8, 0, -8],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration,
        repeat: Infinity,
        ease: easingType,
        repeatType: "loop" as const,
      }
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2" aria-label="Loading">
      {dots.map((dot) => (
        <motion.div
          key={dot}
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: color,
          }}
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: dot * stagger / effectiveSpeed,
          }}
        />
      ))}
    </div>
  );
}; 