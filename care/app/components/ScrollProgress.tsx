import React from 'react';
import { motion, useScroll } from 'framer-motion';

/**
 * ScrollProgress - A thin progress bar that shows how far the user has scrolled down the page
 * This helps with spatial awareness and encourages completion of long landing pages
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-0.5 bg-rose-600 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
