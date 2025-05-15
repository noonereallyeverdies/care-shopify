import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
  targetValue: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  startOnScroll?: boolean;
  precision?: number;
  delay?: number;
}

export function AnimatedCounter({
  targetValue,
  duration = 2,
  prefix = '',
  suffix = '',
  startOnScroll = true,
  precision = 0,
  delay = 0
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Set up intersection observer for scroll-based triggering
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const animate = () => {
    const currentTime = performance.now();
    
    if (startTimeRef.current === null) {
      startTimeRef.current = currentTime;
    }
    
    const elapsedTime = currentTime - startTimeRef.current;
    const progress = Math.min(elapsedTime / (duration * 1000), 1);
    
    // Use easeOutQuart for a pleasing deceleration effect
    const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);
    const easedProgress = easeOutQuart(progress);
    
    const currentValue = easedProgress * targetValue;
    setDisplayValue(currentValue);
    
    if (progress < 1) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      setDisplayValue(targetValue);
      setHasAnimated(true);
    }
  };
  
  useEffect(() => {
    // Reset state when target value changes
    setDisplayValue(0);
    setHasAnimated(false);
    startTimeRef.current = null;
    
    // Cleanup previous animation frame if it exists
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    const shouldStart = !startOnScroll || inView;
    
    if (shouldStart && !hasAnimated) {
      // Start animation after specified delay
      const timer = setTimeout(() => {
        animationFrameRef.current = requestAnimationFrame(animate);
      }, delay * 1000);
      
      return () => {
        clearTimeout(timer);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [targetValue, duration, inView, startOnScroll, hasAnimated, delay]);
  
  // Format the displayed value with specified precision
  const formattedValue = displayValue.toFixed(precision);
  
  return (
    <span ref={ref} className="inline-block tabular-nums">
      {prefix}{formattedValue}{suffix}
    </span>
  );
}

export default AnimatedCounter;