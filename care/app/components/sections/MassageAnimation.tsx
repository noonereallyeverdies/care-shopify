import { motion } from "framer-motion";

export const MassageAnimation = () => (
  <motion.div
    className="relative w-full h-full"
    whileHover={{ scale: 1.02 }} // Simplified hover effect
    transition={{ type: "spring", stiffness: 120, damping: 20 }}
  >
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Definitions for Gradient */}
      <defs>
        <linearGradient id="scalpGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fecdd3" />
          <stop offset="100%" stopColor="#fda4af" />
        </linearGradient>
      </defs>

      {/* Scalp Arc */}
      <motion.path
        d="M20 80 Q50 30 80 80"
        fill="none"
        stroke="url(#scalpGradient)"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />

      {/* Traveling Ripple */}
      <motion.circle
        cx="20" // Start position X
        cy="80" // Start position Y (on the path)
        r="5"
        fill="url(#scalpGradient)"
        // Animate along the quadratic bezier curve path (approximate)
        // We need to calculate points along the curve M20,80 Q50,30 80,80
        // Or simplify by animating x and y based on the curve's shape
        initial={{ offsetDistance: "0%" }} 
        animate={{ offsetDistance: "100%" }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
         {/* Apply motion path animation - requires path defined */}
         <animateMotion dur="5s" repeatCount="indefinite" path="M20 80 Q50 30 80 80" />
      </motion.circle>
    </svg>

    {/* Sparkles at Touchpoints */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden"> {/* Added overflow hidden */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-white rounded-full blur-sm"
          style={{
             // Place sparkles along the scalp arc path approximately
            top: `${80 - Math.abs(Math.sin((i / 4) * Math.PI)) * 50}%`, // Y position follows curve shape
            left: `${20 + i * 15}%`, // Distribute along X
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatDelay: 2 + Math.random() * 2, // Randomize delay slightly more
            ease: "easeInOut",
          }}
        />
      ))}
    </div>

    {/* Soft Ambient Particle Field */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden"> {/* Added overflow hidden */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full blur-sm"
          style={{
            top: `${Math.random() * 70 + 15}%`, // Constrain particles a bit
            left: `${Math.random() * 70 + 15}%`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0.7, 1.1, 0.7],
             // Subtle random drift
            x: [0, Math.random() * 10 - 5, 0],
            y: [0, Math.random() * 10 - 5, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 5, // Longer, varied duration
            repeat: Infinity,
            repeatDelay: Math.random() * 8,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  </motion.div>
); 