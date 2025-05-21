import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProductSpotlightProps {
  productImage: string;
  altText: string;
  className?: string;
}

/**
 * Premium product spotlight component with interactive light effect
 */
export function ProductSpotlight({ productImage, altText, className = '' }: ProductSpotlightProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [elementPosition, setElementPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Calculate relative mouse position when hovering
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setElementPosition({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      });
    }
  }, []);

  // Handle mouse movement for spotlight effect
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX - elementPosition.x,
      y: e.clientY - elementPosition.y
    });
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative group overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Dynamic spotlight effect that follows cursor */}
      <motion.div
        className="absolute w-full h-full pointer-events-none"
        animate={{
          opacity: isHovering ? 0.8 : 0.5,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute w-[140%] h-[140%] rounded-full bg-gradient-radial from-photonique-peach/20 to-transparent blur-xl"
          style={{
            top: isHovering ? mousePosition.y : '50%',
            left: isHovering ? mousePosition.x : '50%',
            transform: 'translate(-50%, -50%)',
            opacity: isHovering ? 1 : 0.7,
          }}
          animate={{
            scale: isHovering ? [1, 1.05, 1] : [1, 1.2, 1],
          }}
          transition={{
            scale: {
              duration: isHovering ? 0.5 : 3,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        />
      </motion.div>

      {/* Product image */}
      <motion.div
        className="relative z-10 w-full h-full flex items-center justify-center"
        animate={{
          rotate: [0, 1, 0, -1, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img
          src={productImage}
          alt={altText}
          className="max-w-full max-h-full object-contain drop-shadow-2xl"
        />
      </motion.div>

      {/* Subtle rotating animation */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-[120%] h-[120%] rounded-full border border-rose-200/20"></div>
      </motion.div>

      {/* Light particles effect */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-photonique-coral/40"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 50 - 25],
            y: [0, Math.random() * 50 - 25],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.5,
          }}
        />
      ))}
    </motion.div>
  );
}

export default ProductSpotlight;
