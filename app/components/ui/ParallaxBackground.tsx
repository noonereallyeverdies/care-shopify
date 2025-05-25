import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxBackgroundProps {
  intensity?: number;
  children: React.ReactNode;
  className?: string;
  colorVariant?: 'rose' | 'amber' | 'blue' | 'neutral';
}

export function ParallaxBackground({ 
  intensity = 0.2,
  children,
  className = '',
  colorVariant = 'rose'
}: ParallaxBackgroundProps) {
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  
  // Calculate the y offset based on scroll position
  const y = useTransform(
    scrollY,
    [elementTop - clientHeight, elementTop + clientHeight],
    [-intensity * 100, intensity * 100]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const setValues = () => {
      setElementTop(element.offsetTop);
      setClientHeight(window.innerHeight);
    };
    
    setValues();
    window.addEventListener('resize', setValues);
    
    return () => window.removeEventListener('resize', setValues);
  }, [ref]);

  // Color variations for different sections
  const gradientColors = {
    rose: {
      from: 'from-rose-50/30',
      via: 'via-stone-50/10',
      blur1: 'bg-rose-200/10',
      blur2: 'bg-amber-200/10'
    },
    amber: {
      from: 'from-amber-50/30',
      via: 'via-stone-50/10',
      blur1: 'bg-amber-200/10',
      blur2: 'bg-rose-200/10'
    },
    blue: {
      from: 'from-blue-50/30',
      via: 'via-stone-50/10',
      blur1: 'bg-blue-200/10',
      blur2: 'bg-cyan-200/10'
    },
    neutral: {
      from: 'from-stone-50/30',
      via: 'via-white/10',
      blur1: 'bg-stone-200/10',
      blur2: 'bg-stone-100/10'
    }
  };
  
  const colors = gradientColors[colorVariant];

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div 
        className="absolute inset-0 z-0 will-change-transform"
        style={{ y, translateZ: 0 }}
      >
        <div className={`absolute inset-0 bg-gradient-to-b ${colors.from} ${colors.via} to-white/5 opacity-50`} />
        <div className={`absolute top-1/4 left-1/4 w-1/2 h-1/2 ${colors.blur1} rounded-full blur-[100px]`} />
        <div className={`absolute bottom-1/3 right-1/4 w-1/3 h-1/3 ${colors.blur2} rounded-full blur-[120px]`} />
      </motion.div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default ParallaxBackground;