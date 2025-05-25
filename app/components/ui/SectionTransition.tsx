import { motion } from 'framer-motion';

export function SectionTransition() {
  return (
    <motion.div
      className="relative h-32 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Premium material transition - inspired by Iris van Herpen's organic futurism */}
      <div className="absolute inset-0 bg-gradient-to-b from-photonique-cream/20 to-white/60 backdrop-blur-sm" />

      {/* Subtle organic lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path
          d="M0,100 C240,130 480,70 720,100 C960,130 1200,70 1440,100"
          fill="none"
          stroke="url(#transitionGradient)"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
        <defs>
          <linearGradient id="transitionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 127, 80, 0)" />
            <stop offset="50%" stopColor="rgba(255, 127, 80, 0.3)" />
            <stop offset="100%" stopColor="rgba(255, 127, 80, 0)" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

export default SectionTransition; 