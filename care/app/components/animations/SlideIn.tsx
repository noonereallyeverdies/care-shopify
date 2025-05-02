import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';

type SlideInProps = {
  children: React.ReactNode;
  delay?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
  className?: string;
  once?: boolean;
  distance?: number;
};

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  delay = 0,
  direction = 'left',
  duration = 0.6,
  className = '',
  once = true,
  distance = 100,
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  // Adjust duration and distance for reduced motion preference
  const effectiveDuration = prefersReducedMotion ? Math.max(duration * 0.7, 0.3) : duration;
  const effectiveDistance = prefersReducedMotion ? Math.min(distance * 0.5, 50) : distance;
  
  // Get initial position based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case 'left': return { x: -effectiveDistance, y: 0 };
      case 'right': return { x: effectiveDistance, y: 0 };
      case 'up': return { x: 0, y: -effectiveDistance };
      case 'down': return { x: 0, y: effectiveDistance };
      default: return { x: -effectiveDistance, y: 0 };
    }
  };
  
  const initialPosition = getInitialPosition();
  
  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...initialPosition,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: effectiveDuration,
        delay,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {children}
    </motion.div>
  );
}; 