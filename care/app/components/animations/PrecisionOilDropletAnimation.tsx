import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from "framer-motion";

// Define types for our style objects
interface PositionStyle {
  top: string;
  left: string;
}

export const PrecisionOilDropletAnimation = () => {
  const [dropletStyles, setDropletStyles] = useState<PositionStyle[]>([]);
  const [trailStyles, setTrailStyles] = useState<PositionStyle[]>([]);
  const [splashTimings, setSplashTimings] = useState<number[]>([]);
  const [isClient, setIsClient] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsClient(true);
    
    // Create droplets with controlled randomness for aesthetic grouping
    const newDropletStyles = [...Array(6)].map((_, i) => {
      // Create a more natural droplet pattern
      const centerX = 50;
      const spread = 15;
      // The formula below creates a natural distribution around the center
      const leftPos = centerX + (Math.random() * spread - spread/2);
      
      return {
        top: "5%",
        left: `${leftPos}%`,
      };
    });
    
    setDropletStyles(newDropletStyles);

    // Create trails with more intentional positioning
    const newTrailStyles = [...Array(16)].map(() => ({
      top: `${15 + Math.random() * 60}%`,
      left: `${35 + Math.random() * 30}%`,
    }));
    
    setTrailStyles(newTrailStyles);

    // Create staggered splash timings
    const newSplashTimings = [0, 1.2, 2.4, 3.6, 4.8, 6];
    setSplashTimings(newSplashTimings);
  }, []);

  // Helper function to get simplified animations for reduced motion
  const getReducedMotionStyles = (type: string) => {
    if (!prefersReducedMotion) return null;
    
    switch (type) {
      case 'droplet':
        return {
          y: "30%", // Minimal movement, just enough to show the effect
          opacity: [0, 0.8, 0],
          scale: 1,
          transition: { 
            duration: 4,
            repeat: Infinity,
            repeatDelay: 2
          }
        };
      case 'splash':
        return {
          scale: [0, 1],
          opacity: [0, 0.5, 0],
          transition: {
            duration: 2,
            repeat: Infinity,
            repeatDelay: 4
          }
        };
      case 'sparkle':
        return {
          opacity: [0, 0.3, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2
          }
        };
      case 'shimmer':
        return {
          opacity: 0 // Hide shimmer entirely
        };
      default:
        return {
          opacity: 1
        };
    }
  };

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Enhanced Radial Background Glow with depth */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-rose-50 via-white to-white opacity-70" />
        
        {/* Bottom glow where droplets land */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-radial from-rose-100 to-transparent"
          style={{ 
            borderRadius: '50%',
            width: '60%',
            height: '30%',
            left: '20%',
            bottom: '-5%'
          }}
          initial={{ opacity: 0 }}
          animate={prefersReducedMotion ? 
            { opacity: 0.5 } : 
            { opacity: [0.4, 0.7, 0.4] }
          }
          transition={{
            duration: prefersReducedMotion ? 1 : 6,
            repeat: prefersReducedMotion ? 0 : Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Premium Oil Droplets with enhanced physics and visuals */}
      <div className="absolute inset-0 pointer-events-none">
        {isClient && dropletStyles.map((style, i) => {
          // Calculate a slightly unique path for each droplet
          const xDeviation = Math.random() > 0.5 ? 
            [0, 3 + Math.random() * 2, 6 + Math.random() * 3] : 
            [0, -3 - Math.random() * 2, -6 - Math.random() * 3];
          
          const squishAmount = 0.75 + Math.random() * 0.1;
          const duration = 3.5 + Math.random() * 1.5;
          const delayOffset = i * 1.2;
          
          return (
            <React.Fragment key={`droplet-group-${i}`}>
              {/* Main droplet body */}
              <motion.div
                className="absolute opacity-0"
                style={{
                  width: '8px',
                  height: '12px',
                  background: 'linear-gradient(to bottom, #fb7185 0%, #f43f5e 100%)',
                  borderRadius: '100%',
                  filter: 'blur(1px)',
                  top: style.top,
                  left: style.left,
                  transformOrigin: 'center bottom',
                  zIndex: 20
                }}
                initial={{ opacity: 0, y: 0 }}
                animate={getReducedMotionStyles('droplet') || {
                  opacity: [0, 1, 1, 0.8, 0],
                  y: ['0%', '75%'],
                  x: xDeviation,
                  scaleX: [1, 1, squishAmount, 1, 0.5],
                  scaleY: [0.9, 1.1, 1.2, 0.8, 0.3],
                }}
                transition={!getReducedMotionStyles('droplet') ? {
                  duration: duration,
                  times: [0, 0.1, 0.85, 0.95, 1],
                  repeat: Infinity,
                  delay: delayOffset,
                  ease: "easeInOut",
                } : undefined}
              />
              
              {/* Only show shine and shadow for full motion */}
              {!prefersReducedMotion && (
                <>
                  {/* Droplet highlight/shine */}
                  <motion.div
                    className="absolute opacity-0"
                    style={{
                      width: '3px',
                      height: '5px',
                      background: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '100%',
                      top: style.top,
                      left: `calc(${style.left} + 2px)`,
                      transformOrigin: 'center bottom',
                      zIndex: 21
                    }}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{
                      opacity: [0, 0.8, 0.8, 0.6, 0],
                      y: ['0%', '75%'],
                      x: xDeviation,
                      scaleX: [1, 1, squishAmount, 0.9, 0.4],
                      scaleY: [0.9, 1.1, 1.2, 0.8, 0.3],
                    }}
                    transition={{
                      duration: duration,
                      times: [0, 0.1, 0.85, 0.95, 1],
                      repeat: Infinity,
                      delay: delayOffset,
                      ease: "easeInOut",
                    }}
                  />
                  
                  {/* Droplet shadow */}
                  <motion.div
                    className="absolute opacity-0"
                    style={{
                      width: '10px',
                      height: '4px',
                      background: 'rgba(244, 63, 94, 0.2)',
                      borderRadius: '50%',
                      filter: 'blur(2px)',
                      bottom: '10%',
                      left: `calc(${style.left} - 1px)`,
                      zIndex: 15
                    }}
                    initial={{ opacity: 0, scale: 0, x: 0 }}
                    animate={{
                      opacity: [0, 0, 0, 0.7, 0],
                      scale: [0.3, 0.3, 0.3, 1.2, 0],
                      x: xDeviation[2],
                    }}
                    transition={{
                      duration: duration,
                      times: [0, 0.7, 0.85, 0.95, 1],
                      repeat: Infinity,
                      delay: delayOffset,
                      ease: "easeInOut",
                    }}
                  />
                </>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Enhanced Splash Ripples */}
      <div className="absolute bottom-4 w-full flex justify-center items-end pointer-events-none">
        {isClient && splashTimings.map((delay, i) => (
          <React.Fragment key={`splash-group-${i}`}>
            {/* Main ripple - simplified for reduced motion */}
            <motion.div
              className="absolute bottom-0 rounded-full blur-sm"
              style={{
                background: 'linear-gradient(to bottom, rgba(251, 113, 133, 0.4) 0%, rgba(244, 63, 94, 0.1) 100%)',
                width: '30px',
                height: '5px'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={getReducedMotionStyles('splash') || {
                scale: [0, 1.8], 
                opacity: [0, 0.7, 0] 
              }}
              transition={!getReducedMotionStyles('splash') ? {
                duration: 1.8,
                times: [0, 0.3, 1],
                repeat: Infinity,
                repeatDelay: 5,
                delay: delay,
                ease: "easeOut",
              } : undefined}
            />
            
            {/* Secondary smaller ripple for depth - hide for reduced motion */}
            {!prefersReducedMotion && (
              <motion.div
                className="absolute bottom-0 rounded-full blur-sm"
                style={{
                  background: 'rgba(251, 113, 133, 0.6)',
                  width: '20px',
                  height: '3px'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.5], 
                  opacity: [0, 0.9, 0] 
                }}
                transition={{
                  duration: 1.2,
                  times: [0, 0.2, 1],
                  repeat: Infinity,
                  repeatDelay: 5,
                  delay: delay + 0.1,
                  ease: "easeOut",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Enhanced Sparkle Trails - simplified for reduced motion */}
      <div className="absolute inset-0 pointer-events-none">
        {isClient && trailStyles.map((style, i) => {
          const size = 0.5 + Math.random() * 1;
          const duration = 3 + Math.random() * 3;
          
          return (
            <motion.div
              key={`trail-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                background: i % 3 === 0 ? 
                  'rgba(255, 255, 255, 0.9)' : 
                  'rgba(251, 113, 133, 0.7)',
                boxShadow: i % 3 === 0 ? 
                  '0 0 3px rgba(255, 255, 255, 0.8)' : 
                  '0 0 2px rgba(251, 113, 133, 0.5)',
                ...style
              }}
              initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
              animate={getReducedMotionStyles('sparkle') || {
                opacity: [0, 0.8, 0],
                y: [0, 15 + Math.random() * 10],
                x: [0, Math.random() > 0.5 ? 6 : -6],
                scale: [0, 1, 0.5]
              }}
              transition={!getReducedMotionStyles('sparkle') ? {
                duration: duration,
                repeat: Infinity,
                repeatDelay: Math.random() * 3,
                ease: "easeInOut",
              } : undefined}
            />
          );
        })}
      </div>

      {/* Cinematic Shimmer Effects - hide entirely for reduced motion */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute w-full h-full opacity-0 pointer-events-none"
          style={{
            background: 'linear-gradient(-45deg, transparent, rgba(255,255,255,0.3), transparent)',
            transform: 'skewX(-20deg)',
          }}
          initial={{ x: "-100%", opacity: 0 }}
          animate={{
            x: ["0%", "200%"], 
            opacity: [0, 0.5, 0] 
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 7,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      )}
    </motion.div>
  );
};