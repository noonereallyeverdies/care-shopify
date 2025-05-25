import React, { useRef, useEffect } from 'react';
import { useInView, animate } from 'framer-motion';

// Extracted AnimatedCounter component
export const AnimatedCounter: React.FC<{ 
  targetValue: number; 
  suffix?: string; 
  duration?: number 
}> = ({ targetValue, suffix = '%', duration = 1.5 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 }); // Trigger when 50% visible

  useEffect(() => {
    if (isInView && ref.current) {
      // Animate from 0 to targetValue
      animate(0, targetValue, {
        duration: duration,
        onUpdate(value) {
          if (ref.current) {
            // Update the text content with the rounded value and suffix
            ref.current.textContent = Math.round(value) + suffix;
          }
        }
      });
    }
  }, [isInView, targetValue, duration, suffix]); // Add dependencies

  // Initial text is 0 + suffix
  return <span ref={ref}>0{suffix}</span>;
}; 