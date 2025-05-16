import React, { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  endValue: number;
  duration?: number;
  className?: string;
  inView: boolean;
  startValue?: number;
}

export function AnimatedCounter({
  endValue,
  duration = 2000,
  className = '',
  inView,
  startValue = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(startValue);

  useEffect(() => {
    if (inView) {
      let currentVal = startValue;
      const increment = Math.ceil((endValue - startValue) / (duration / 16)); // 16ms per frame (approx 60fps)
      
      if (increment <= 0 && endValue > startValue) { // Ensure increment is at least 1 if endValue > startValue
        const estimatedFrames = duration / 16;
        const actualIncrement = Math.max(1, Math.ceil((endValue - startValue) / estimatedFrames));
        const timer = setInterval(() => {
          currentVal += actualIncrement;
          if (currentVal >= endValue) {
            setCount(endValue);
            clearInterval(timer);
          } else {
            setCount(currentVal);
          }
        }, 16);
        return () => clearInterval(timer);
      } else if (increment > 0) {
        const timer = setInterval(() => {
          currentVal += increment;
          if (currentVal >= endValue) {
            setCount(endValue);
            clearInterval(timer);
          } else {
            setCount(currentVal);
          }
        }, 16);
        return () => clearInterval(timer);
      } else {
        setCount(endValue); // if increment is 0 or negative (and endValue is not greater), just set to endValue
      }
    } else {
      // Optional: Reset counter when not in view if desired
      // setCount(startValue);
    }
  }, [inView, endValue, duration, startValue]);

  return <span className={className}>{count}%</span>;
} 