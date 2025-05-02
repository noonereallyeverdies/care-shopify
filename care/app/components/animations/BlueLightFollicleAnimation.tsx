import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';

type AnimationProps = {
  animationType?: string;
  beamCount?: number;
  intensity?: number;
};

export const BlueLightFollicleAnimation = ({
  animationType = 'default',
  beamCount = 12,
  intensity = 1,
}: AnimationProps) => {
  const [beams, setBeams] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Consistent animation timing variables
  const baseAnimationDuration = 3;
  const staggerDelay = 0.2;
  const easingType = "easeInOut";

  useEffect(() => {
    setIsClient(true);
    
    // Generate beams with controlled randomness
    const generateBeams = () => {
      return [...Array(beamCount)].map((_, i) => {
        // Create evenly distributed beams with slight randomness
        const angle = (i * (360 / beamCount)) + (Math.random() * 10 - 5);
        
        // Calculate length with controlled randomness
        const length = 50 + (Math.random() * 30 * intensity);
        
        // Calculate width with controlled randomness
        const width = 1 + (Math.random() * 1.5 * intensity);
        
        // Calculate rotation with slight randomness based on angle
        const rotation = angle + (Math.random() * 5 - 2.5);
        
        // Calculate duration with slight variation
        const duration = baseAnimationDuration * (0.9 + (Math.random() * 0.2));
        
        // Staggered delay for more natural effect
        const delay = i * staggerDelay;
        
        return {
          id: i,
          angle,
          length,
          width,
          rotation,
          duration,
          delay,
          opacity: 0.5 + (Math.random() * 0.5 * intensity),
        };
      });
    };
    
    setBeams(generateBeams());
  }, [beamCount, intensity]);

  // Render beams with modifications for reduced motion
  const renderBeams = () => {
    // For reduced motion, render fewer beams
    const displayBeams = prefersReducedMotion 
      ? beams.filter((_, i) => i % 3 === 0) // Show only 1/3 of beams
      : beams;
    
    return displayBeams.map(beam => {
      // Define motion variants based on reduced motion preference
      const variants: Variants = prefersReducedMotion ? {
        initial: { 
          opacity: 0.3,
          scale: 0.9,
          width: beam.width,
          height: beam.length * 0.7, // Shorter beams for reduced motion
        },
        animate: { 
          opacity: [0.3, 0.6, 0.3],
          scale: [0.9, 1, 0.9],
          transition: {
            duration: beam.duration * 0.8,
            repeat: Infinity,
            repeatType: "reverse" as const,
            ease: easingType
          }
        }
      } : {
        initial: { 
          opacity: 0.3,
          scale: 0.8,
          width: beam.width,
          height: beam.length,
        },
        animate: { 
          opacity: [0.3, beam.opacity, 0.3],
          scale: [0.8, 1.1, 0.8],
          height: [beam.length * 0.8, beam.length * 1.1, beam.length * 0.8],
          transition: {
            duration: beam.duration,
            delay: beam.delay,
            repeat: Infinity,
            repeatType: "reverse" as const,
            ease: easingType
          }
        }
      };
      
      return (
        <motion.div
          key={beam.id}
          className="absolute rounded-full bg-blue-400"
          style={{
            transformOrigin: 'bottom center',
            left: '50%',
            top: '50%',
            marginLeft: `-${beam.width / 2}px`,
            filter: 'blur(0.5px)',
            transform: `rotate(${beam.rotation}deg) translateY(-50%)`,
            zIndex: 5,
          }}
          initial="initial"
          animate="animate"
          variants={variants}
        />
      );
    });
  };

  return (
    <div className="relative w-full h-full">
      {/* Central blue light */}
      <motion.div
        className="absolute rounded-full bg-blue-500"
        style={{
          width: '12px',
          height: '12px',
          left: '50%',
          top: '50%',
          marginLeft: '-6px',
          marginTop: '-6px',
          filter: 'blur(2px)',
          zIndex: 10,
        }}
        initial={{ opacity: 0.4, scale: 0.8 }}
        animate={{ 
          opacity: prefersReducedMotion ? 0.7 : [0.6, 0.9, 0.6], 
          scale: prefersReducedMotion ? 1 : [0.9, 1.1, 0.9] 
        }}
        transition={{
          duration: baseAnimationDuration * 0.8,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: easingType
        }}
      />
      
      {/* Outer glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '30px',
          height: '30px',
          left: '50%',
          top: '50%',
          marginLeft: '-15px',
          marginTop: '-15px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0.1) 70%, transparent 100%)',
          zIndex: 8,
        }}
        initial={{ opacity: 0.4, scale: 0.8 }}
        animate={{ 
          opacity: prefersReducedMotion ? 0.6 : [0.5, 0.8, 0.5], 
          scale: prefersReducedMotion ? 1 : [0.9, 1.1, 0.9] 
        }}
        transition={{
          duration: baseAnimationDuration,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: easingType
        }}
      />
      
      {/* Light beams */}
      {isClient && renderBeams()}
      
      {/* Background glow for enhanced effect */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '200px',
          height: '200px',
          left: '50%',
          top: '50%',
          marginLeft: '-100px',
          marginTop: '-100px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 80%)',
          zIndex: 1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: prefersReducedMotion ? 0.3 : [0.2, 0.4, 0.2] }}
        transition={{
          duration: baseAnimationDuration * 1.2,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: easingType
        }}
      />
    </div>
  );
}; 