import React from 'react';
import { motion, MotionProps } from 'framer-motion';

interface PremiumCardProps extends MotionProps {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
}

export const PremiumCard: React.FC<PremiumCardProps> = ({ 
  children, 
  hover = true, 
  className = '', 
  ...props 
}) => {
  return (
    <motion.div
      className={`bg-white border border-neutral-100 relative overflow-hidden ${className}`}
      whileHover={hover ? { 
        y: -5, 
        boxShadow: "0 15px 30px rgba(0,0,0,0.05)",
        borderColor: "rgba(255, 127, 80, 0.2)" // Assuming photonique-coral with 20% opacity
      } : {}}
      transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      {...props}
    >
      {/* Material edge highlight */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-70 mix-blend-overlay"></div>
      </div>
      
      {children}
    </motion.div>
  );
}; 