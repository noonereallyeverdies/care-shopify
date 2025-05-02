import { motion, useMotionValue, useTransform, animate, useReducedMotion, AnimationControls } from "framer-motion";
import React, { useEffect, useState } from "react";

// Define type for particle styles
interface ParticleStyle {
  width: string;
  height: string;
  left: string;
  top: string;
}

// Enhanced helper function for smoother Bezier curve calculation
const getQuadraticBezierXY = (t: number, p0: [number, number], p1: [number, number], p2: [number, number]) => {
  const x = Math.pow(1 - t, 2) * p0[0] + 2 * (1 - t) * t * p1[0] + Math.pow(t, 2) * p2[0];
  const y = Math.pow(1 - t, 2) * p0[1] + 2 * (1 - t) * t * p1[1] + Math.pow(t, 2) * p2[1];
  return { x, y };
};

export const ScalpMassageArcAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [particleStyles, setParticleStyles] = useState<ParticleStyle[]>([]); // State for particle styles
  const [isClient, setIsClient] = useState(false); // Client mount flag
  const t = useMotionValue(0);
  // Add reduced motion preference detection
  const prefersReducedMotion = useReducedMotion();

  // Points for our main scalp curve
  const p0: [number, number] = [20, 80];
  const p1: [number, number] = [100, 10];
  const p2: [number, number] = [180, 80];

  // Transform motion value to coordinates on the curve
  const x = useTransform(t, (latest) => getQuadraticBezierXY(latest, p0, p1, p2).x);
  const y = useTransform(t, (latest) => getQuadraticBezierXY(latest, p0, p1, p2).y);

  // Calculate tangent angle for proper orientation along the curve
  const angle = useTransform(t, (latest) => {
    // Small delta to calculate approximate tangent
    const delta = 0.01;
    const t1 = Math.max(0, latest - delta);
    const t2 = Math.min(1, latest + delta);
    
    // Use different variable names to avoid conflict
    const point1 = getQuadraticBezierXY(t1, p0, p1, p2);
    const point2 = getQuadraticBezierXY(t2, p0, p1, p2);
    
    return Math.atan2(point2.y - point1.y, point2.x - point1.x) * (180 / Math.PI);
  });

  // Start animations when component mounts
  useEffect(() => {
    setIsClient(true);
    const visibilityTimeout = setTimeout(() => setIsVisible(true), 300);
    
    // Calculate particle styles only on client
    const newParticleStyles = [...Array(15)].map(() => {
       const startX = Math.random() * 70 + 15;
       const startY = Math.random() * 50 + 25;
       const size = Math.random() * 0.6 + 0.5;
       return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${startX}%`,
        top: `${startY}%`,
      };
    });
    setParticleStyles(newParticleStyles);

    // Animate the pulse along the curve with a natural pace - only if reduced motion is not preferred
    let controls: ReturnType<typeof animate> | undefined;
    if (!prefersReducedMotion) {
      controls = animate(t, [0, 1], {
        duration: 8,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      });
    }
    
    return () => {
      clearTimeout(visibilityTimeout);
      if (controls) controls.stop();
    };
  }, [t, prefersReducedMotion]);

  // Helper function to create staggered touchpoints
  const createTouchpoints = () => {
    const touchpoints = [];
    for (let i = 0; i < 5; i++) {
      const tValue = i * 0.23 + 0.05; // Distribute points along curve
      const point = getQuadraticBezierXY(tValue, p0, p1, p2);
      touchpoints.push({ x: point.x, y: point.y, id: i });
    }
    return touchpoints;
  };

  const touchpoints = createTouchpoints();

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Enhanced background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-rose-50 via-white to-white opacity-60" />
      
      <svg viewBox="0 0 200 100" className="w-full h-full relative z-10">
        <defs>
          {/* Refined gradients for luxury feel */}
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fda4af" />
            <stop offset="50%" stopColor="#fb7185" />
            <stop offset="100%" stopColor="#fda4af" />
          </linearGradient>
          
          <radialGradient id="pulseGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fb7185" stopOpacity="1" />
            <stop offset="70%" stopColor="#fda4af" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fecdd3" stopOpacity="0" />
          </radialGradient>
          
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          {/* Shimmer effect */}
          <linearGradient id="shimmerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.7" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Subtle glow beneath arc - show simplified version for reduced motion */}
        <motion.path
          d="M20,80 Q100,10 180,80"
          fill="none"
          stroke="#fecdd3"
          strokeWidth="10"
          strokeLinecap="round"
          strokeOpacity="0.2"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={prefersReducedMotion ? 
            { pathLength: 1, opacity: 0.3 } : 
            { pathLength: 1, opacity: 0.3 }
          }
          transition={{
            pathLength: { duration: 2, ease: "easeOut" },
            opacity: { duration: 1.5, ease: "easeIn" }
          }}
        />

        {/* Main Scalp Arc with enhanced styling */}
        <motion.path
          d="M20,80 Q100,10 180,80"
          fill="none"
          stroke="url(#arcGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={prefersReducedMotion ? 
            { pathLength: 1, opacity: 0.85 } : 
            { pathLength: 1, opacity: [0.85, 1, 0.85] }
          }
          transition={{
            pathLength: { duration: 2, ease: "easeOut" },
            opacity: prefersReducedMotion ? 
              { duration: 1.5 } : 
              { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        {/* Secondary detail lines for depth */}
        <motion.path
          d="M30,75 Q100,15 170,75"
          fill="none"
          stroke="#fb7185"
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{
            pathLength: { duration: 2.2, ease: "easeOut", delay: 0.3 },
            opacity: { duration: 1.5, ease: "easeIn", delay: 0.3 }
          }}
        />

        {/* Touch points along the scalp - simplified for reduced motion */}
        {touchpoints.map((point) => (
          <motion.g key={`touchpoint-${point.id}`}>
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="3"
              fill="#fda4af"
              fillOpacity="0.6"
              initial={{ opacity: 0, scale: 0 }}
              animate={prefersReducedMotion ?
                { opacity: 0.6, scale: 1 } :
                { opacity: 0.6, scale: 1 }
              }
              transition={{
                duration: 1,
                delay: 1.5 + (point.id * 0.2)
              }}
            />
            
            {/* Pulse effect when energy orb passes nearby - hide for reduced motion */}
            {!prefersReducedMotion && (
              <motion.circle
                cx={point.x}
                cy={point.y}
                r="5"
                fill="url(#pulseGlow)"
                filter="url(#glow)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1.8, 0.5]
                }}
                transition={{
                  duration: 2,
                  times: [0, 0.3, 1],
                  repeat: Infinity,
                  repeatDelay: 8,
                  delay: 2 + (point.id * 2) // Stagger based on position
                }}
              />
            )}
          </motion.g>
        ))}

        {/* Energy Pulse Orb Moving Along Arc with enhanced visuals - only show if not reduced motion */}
        {!prefersReducedMotion && (
          <motion.g style={{ x, y, rotate: angle }}>
            {/* Glow behind pulse */}
            <motion.circle
              r="12"
              fill="url(#pulseGlow)"
              filter="url(#glow)"
              opacity="0.7"
              initial={{ scale: 0 }}
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 0.7, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Main pulse orb */}
            <motion.circle
              r="5"
              fill="#fb7185"
              initial={{ scale: 0 }}
              animate={{ scale: [0.9, 1.1, 0.9] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Inner pulse detail */}
            <motion.circle
              r="2"
              fill="white"
              opacity="0.8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            />
          </motion.g>
        )}

        {/* For reduced motion, show a static pulse along the path instead */}
        {prefersReducedMotion && (
          <motion.circle
            cx="100" 
            cy="45"
            r="5"
            fill="#fb7185"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 2,
              repeat: Infinity, 
              ease: "easeInOut"
            }}
          />
        )}
      </svg>

      {/* Enhanced Ambient Particles with more organic movement - simplified for reduced motion */}
      <div className="absolute inset-0 pointer-events-none">
        {isClient && particleStyles.map((style, i) => {
          const delay = Math.random() * 4;
          const duration = Math.random() * 6 + 8;
          
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-white blur-sm"
              style={style}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={prefersReducedMotion ? 
                {
                  opacity: [0, 0.2, 0],
                  scale: 1,
                  y: 0,
                  x: 0
                } : 
                {
                  opacity: [0, 0.3 + (Math.random() * 0.2), 0],
                  scale: [0.7, 1 + (Math.random() * 0.2), 0.5],
                  x: [
                    0, 
                    Math.sin(i) * (Math.random() * 10) - 5, 
                    Math.sin(i * 2) * (Math.random() * 15)
                  ],
                  y: [0, -10 - (Math.random() * 20)],
                }
              }
              transition={{
                duration: prefersReducedMotion ? 4 : duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Subtle Shimmer Effect - hide for reduced motion */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute w-full h-full opacity-0 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          }}
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ 
            x: ["0%", "200%"], 
            opacity: [0, 0.5, 0] 
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 6,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      )}
    </motion.div>
  );
};