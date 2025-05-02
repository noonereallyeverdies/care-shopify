import React, { useEffect, useState } from 'react';
import { motion, useAnimationControls, useReducedMotion, AnimationControls } from 'framer-motion';

type AnimationProps = {
  animationType: string;
};

export const RedLightFollicleAnimation = ({ animationType }: AnimationProps) => {
  const controls = useAnimationControls();
  const [isClient, setIsClient] = useState(false);
  const [beams, setBeams] = useState<any[]>([]);
  const prefersReducedMotion = useReducedMotion();
  
  // Consistent animation timing variables
  const baseAnimationDuration = 3.5;
  const staggerDelay = 0.2;
  const easingType = "easeInOut";

  useEffect(() => {
    setIsClient(true);
    
    // Create beam data with controlled randomness
    const createBeams = () => {
      return [...Array(8)].map((_, i) => {
        // Make sure beams are evenly distributed around the center
        const angle = (i * (360 / 8)) + (Math.random() * 10 - 5);
        const length = 70 + (Math.random() * 10);
        
        return {
          angle,
          length,
          duration: baseAnimationDuration + (Math.random() * 0.5),
          delay: staggerDelay * i
        };
      });
    };
    
    setBeams(createBeams());
    
    const startAnimation = async () => {
      await controls.start('visible');
    };
    
    startAnimation();
    
    return () => {
      controls.stop();
    };
  }, [controls]);
  
  // Reduced motion animations
  const getReducedMotionVariants = () => {
    if (!prefersReducedMotion) return null;
    
    return {
      centerLight: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
          opacity: 0.8,
          scale: 1,
          transition: {
            duration: 1.5,
            ease: easingType
          }
        }
      },
      halo: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
          opacity: 0.6,
          scale: 1,
          transition: {
            duration: 1.5,
            ease: easingType
          }
        }
      },
      beam: {
        hidden: { opacity: 0, scale: 0 },
        visible: {
          opacity: 0.4,
          scale: 1,
          transition: {
            duration: 2,
            ease: easingType
          }
        }
      }
    };
  };

  // Standard motion variants with consistent easing
  const fullMotionVariants = {
    centerLight: {
      hidden: { opacity: 0, scale: 0 },
      visible: {
        opacity: [0, 1, 0.8, 0.9, 0.7, 0.8],
        scale: [0, 1.1, 0.9, 1.05, 0.95, 1],
        transition: {
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          duration: baseAnimationDuration,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: easingType
        }
      }
    },
    halo: {
      hidden: { opacity: 0, scale: 0 },
      visible: {
        opacity: [0, 0.7, 0.5, 0.6, 0.4, 0.5],
        scale: [0, 1.2, 1, 1.1, 0.9, 1],
        transition: {
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          duration: baseAnimationDuration * 1.2,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: easingType
        }
      }
    },
    beam: {
      hidden: { opacity: 0, scaleY: 0, originY: 0 },
      visible: (i: number) => ({
        opacity: [0, 0.9, 0.7, 0.8, 0.6, 0.7],
        scaleY: [0, 1, 0.9, 0.95, 0.85, 0.9],
        transition: {
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          duration: baseAnimationDuration,
          delay: i * staggerDelay,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: easingType
        }
      })
    }
  };
  
  // Use reduced motion variants if preferred, otherwise use full motion
  const variants = prefersReducedMotion ? getReducedMotionVariants() : fullMotionVariants;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative">
        {/* Central Red Light Source */}
        <motion.div
          className="absolute rounded-full bg-red-500 glow-red-light"
          style={{ 
            width: '16px', 
            height: '16px', 
            top: '50%', 
            left: '50%', 
            marginLeft: '-8px',
            marginTop: '-8px',
            boxShadow: '0 0 15px 5px rgba(239, 68, 68, 0.7)',
            zIndex: 10,
            filter: 'blur(2px)'
          }}
          variants={variants?.centerLight || fullMotionVariants.centerLight}
          initial="hidden"
          animate="visible"
        />
        
        {/* Outer Glow Halo */}
        <motion.div
          className="absolute rounded-full bg-red-400"
          style={{ 
            width: '30px', 
            height: '30px',
            top: '50%', 
            left: '50%', 
            marginLeft: '-15px',
            marginTop: '-15px',
            filter: 'blur(8px)',
            zIndex: 5
          }}
          variants={variants?.halo || fullMotionVariants.halo}
          initial="hidden"
          animate="visible"
        />
        
        {/* Light Beams */}
        {isClient && beams.map((beam, i) => (
          <motion.div
            key={`beam-${i}`}
            className="absolute bg-gradient-to-b from-red-500 to-transparent"
            style={{ 
              width: '2px', 
              height: `${beam.length}px`,
              top: '50%', 
              left: '50%', 
              marginLeft: '-1px',
              transformOrigin: 'top center',
              transform: `rotate(${beam.angle}deg)`,
              opacity: 0,
              zIndex: 1
            }}
            custom={i}
            variants={variants?.beam || fullMotionVariants.beam}
            initial="hidden"
            animate="visible"
          />
        ))}
      </div>
      
      {/* Subtle Background Glow for the Hair Follicle Environment */}
      <motion.div
        className="absolute rounded-full"
        style={{ 
          width: '200px', 
          height: '200px', 
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 50%, transparent 80%)',
          top: '50%',
          left: '50%',
          marginLeft: '-100px',
          marginTop: '-100px',
          zIndex: 0
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: prefersReducedMotion ? 0.3 : [0.3, 0.5, 0.3] }}
        transition={{ 
          duration: baseAnimationDuration * 1.5, 
          repeat: Infinity, 
          repeatType: "reverse",
          ease: easingType
        }}
      />
    </div>
  );
};