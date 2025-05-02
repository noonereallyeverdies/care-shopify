import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';

type ScaleInProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  initialScale?: number;
};

export const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  className = '',
  once = true,
  initialScale = 0.9,
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  // Adjust duration and scale for reduced motion preference
  const effectiveDuration = prefersReducedMotion ? Math.max(duration * 0.7, 0.3) : duration;
  const effectiveInitialScale = prefersReducedMotion ? 
    Math.max(initialScale, 0.95) : // Less dramatic scale for reduced motion
    initialScale;
  
  const variants: Variants = {
    hidden: {
      opacity: 0,
      scale: effectiveInitialScale,
    },
    visible: {
      opacity: 1,
      scale: 1,
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