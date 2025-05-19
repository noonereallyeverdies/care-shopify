import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Extracted AnimatedTextWord component
export const AnimatedTextWord: React.FC<{ 
  text: string; 
  className?: string; 
  staggerAmount?: number 
}> = ({ text, className, staggerAmount = 0.03 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const wordVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const containerVariants = {
    animate: {
      transition: { staggerChildren: staggerAmount },
    },
  };

  return (
    <motion.span
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={containerVariants} 
      aria-hidden
      className={className}
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants} 
          style={{ display: 'inline-block', paddingRight: '0.25em' }} 
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}; 