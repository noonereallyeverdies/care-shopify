import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  staggerChildren?: number;
  staggerDirection?: 1 | -1;
};

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
  staggerChildren = 0.1,
  staggerDirection = 1,
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  // Adjust duration and stagger timing for reduced motion preference
  const effectiveDuration = prefersReducedMotion ? Math.max(duration * 0.7, 0.3) : duration;
  const effectiveStagger = prefersReducedMotion ? Math.max(staggerChildren * 0.7, 0.05) : staggerChildren;
  
  const variants: Variants = {
    hidden: {
      opacity: 0,
      scale: prefersReducedMotion ? 0.98 : 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: effectiveDuration,
        delay,
        ease: "easeOut",
        staggerChildren: effectiveStagger,
        staggerDirection,
        delayChildren: delay,
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