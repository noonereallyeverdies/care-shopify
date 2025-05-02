import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  y?: number;
};

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  className = '',
  once = true,
  y = 20,
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  // Adjust duration and y offset for reduced motion preference
  const effectiveDuration = prefersReducedMotion ? Math.max(duration * 0.7, 0.3) : duration;
  const effectiveY = prefersReducedMotion ? Math.min(y * 0.5, 10) : y;
  
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: effectiveY,
    },
    visible: {
      opacity: 1,
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