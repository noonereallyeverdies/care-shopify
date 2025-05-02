import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type AnimationProps = {
  animationType?: string;
  particleCount?: number;
  particleSize?: number;
  colors?: string[];
};

export const SparkParticleAnimation = ({
  animationType = 'default',
  particleCount = 24,
  particleSize = 3,
  colors = ['#f472b6', '#ec4899', '#db2777', '#be185d'],
}: AnimationProps) => {
  const [particles, setParticles] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  
  // Consistent animation timing variables
  const baseAnimationDuration = 2.5;
  const staggerDelay = 0.15;
  const easingType = "easeInOut";

  useEffect(() => {
    setIsClient(true);
    
    // Generate particles with more controlled randomness
    const generateParticles = () => {
      return [...Array(particleCount)].map((_, i) => {
        // Create evenly distributed particles with slight randomness
        const angle = (i * (360 / particleCount)) + (Math.random() * 10 - 5);
        const distance = 40 + (Math.random() * 30);
        
        // Calculate position using angle and distance
        const x = Math.cos(angle * (Math.PI / 180)) * distance;
        const y = Math.sin(angle * (Math.PI / 180)) * distance;
        
        // Select color from provided colors array
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Calculate particle size with controlled randomness
        const size = particleSize * (0.8 + (Math.random() * 0.4));
        
        // Animation duration with slight variation but not too much
        const duration = baseAnimationDuration * (0.9 + (Math.random() * 0.2));
        
        // Staggered delay for more natural effect
        const delay = i * staggerDelay;
        
        return {
          id: i,
          x,
          y,
          color,
          size,
          duration,
          delay,
          opacity: 0.7 + (Math.random() * 0.3),
        };
      });
    };
    
    setParticles(generateParticles());
  }, [particleCount, particleSize, colors]);

  // Modified animation variants based on reduced motion preference
  const getVariants = (particle: any) => {
    if (prefersReducedMotion) {
      // Simple fade for reduced motion
      return {
        initial: { 
          opacity: 0,
          x: 0,
          y: 0,
          scale: 0.5
        },
        animate: { 
          opacity: [0, particle.opacity * 0.8, 0],
          scale: [0.5, 1, 0.5],
          transition: {
            duration: particle.duration * 0.8,
            delay: particle.delay,
            repeat: Infinity,
            ease: easingType
          }
        }
      };
    }
    
    // Full motion animation with consistent easing
    return {
      initial: { 
        opacity: 0,
        x: 0,
        y: 0,
        scale: 0
      },
      animate: { 
        opacity: [0, particle.opacity, 0],
        scale: [0, 1, 0],
        x: [0, particle.x, particle.x * 1.3],
        y: [0, particle.y, particle.y * 1.3],
        transition: {
          duration: particle.duration,
          delay: particle.delay,
          repeat: Infinity,
          ease: easingType
        }
      }
    };
  };
  
  // Render particles with reduced count for reduced motion
  const renderParticles = () => {
    // For reduced motion, show fewer particles
    const displayParticles = prefersReducedMotion 
      ? particles.filter((_, i) => i % 3 === 0) // Show only 1/3 of particles
      : particles;
      
    return displayParticles.map(particle => {
      const variants = getVariants(particle);
      
      return (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            backgroundColor: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: '50%',
            top: '50%',
            marginLeft: `-${particle.size / 2}px`,
            marginTop: `-${particle.size / 2}px`,
            filter: `blur(${particleSize < 3 ? 0 : 1}px)`,
            zIndex: 10,
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
      {/* Central glow */}
      <motion.div
        className="absolute rounded-full bg-pink-500"
        style={{
          width: '12px',
          height: '12px',
          left: '50%',
          top: '50%',
          marginLeft: '-6px',
          marginTop: '-6px',
          filter: 'blur(2px)',
          zIndex: 5,
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: prefersReducedMotion ? 0.8 : [0.7, 1, 0.7], 
          scale: prefersReducedMotion ? 1 : [0.9, 1.1, 0.9] 
        }}
        transition={{
          duration: baseAnimationDuration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: easingType
        }}
      />
      
      {/* Outer glow for depth */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '30px',
          height: '30px',
          left: '50%',
          top: '50%',
          marginLeft: '-15px',
          marginTop: '-15px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(236, 72, 153, 0.1) 70%, transparent 100%)',
          zIndex: 4,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: prefersReducedMotion ? 0.6 : [0.5, 0.8, 0.5], 
          scale: prefersReducedMotion ? 1 : [0.9, 1.1, 0.9] 
        }}
        transition={{
          duration: baseAnimationDuration * 1.2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: easingType
        }}
      />
      
      {/* Spark particles */}
      {isClient && renderParticles()}
      
      {/* Background glow for enhanced visual effect */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '200px',
          height: '200px',
          left: '50%',
          top: '50%',
          marginLeft: '-100px',
          marginTop: '-100px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, rgba(236, 72, 153, 0.05) 50%, transparent 80%)',
          zIndex: 1,
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