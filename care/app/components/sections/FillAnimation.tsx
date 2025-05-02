import { motion } from "framer-motion";

export const FillAnimation = () => (
  <motion.div
    className="relative w-full h-full"
    whileHover={{ scale: 1.02 }} // Simplified hover effect
    transition={{ type: "spring", stiffness: 120, damping: 20 }}
  >
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Definitions for Gradients */}
      <defs>
        <linearGradient id="vesselGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fce7f3" />
          <stop offset="100%" stopColor="#fecdd3" />
        </linearGradient>
        <linearGradient id="liquidGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fecdd3" />
          <stop offset="100%" stopColor="#fda4af" />
        </linearGradient>
      </defs>

      {/* Vessel Shape */}
      <motion.path
        d="M30 90 V20 Q50 5 70 20 V90 A10 10 0 0 1 60 100 H40 A10 10 0 0 1 30 90 Z"
        fill="none"
        stroke="url(#vesselGradient)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />

      {/* Liquid Fill Rising with Soft Wave */}
      <motion.rect
        x="31"
        width="38"
        initial={{ height: 0, y: 90 }} // Start from bottom
        animate={{ height: 55, y: 35 }} // End fill level
        rx="6" // Rounded corners for liquid top
        fill="url(#liquidGradient)"
        transition={{ duration: 4.5, ease: "easeInOut" }}
      />

      {/* Shimmer Surface */}
      <motion.rect
        x="31"
        width="38"
        y="32" // Position slightly above liquid start
        height="2"
        fill="white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0], y: [32, 34, 36] }} // Subtle vertical movement
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
        className="blur-sm" // Soft blur effect
      />
    </svg>

    {/* Slow Sparkles Floating Up */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden"> {/* Added overflow hidden */} 
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-white rounded-full blur-sm"
          style={{
            // Random initial position within the liquid area
            top: `${Math.random() * 50 + 35}%`, // Start within liquid y-range
            left: `${Math.random() * 30 + 35}%`, // Start within liquid x-range
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0], // Fade in and out
            scale: [0.8, 1.4, 0.8], // Pulse scale
            y: [0, -40, -50], // Move upwards
          }}
          transition={{
            duration: 8 + Math.random() * 4, // Vary duration slightly
            repeat: Infinity,
            repeatDelay: Math.random() * 5,
            ease: "linear", // Use linear for steady upward float
          }}
        />
      ))}
    </div>
  </motion.div>
); 