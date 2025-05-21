import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function SparkleSection() {
  return (
    <motion.section 
      className="py-16 md:py-24 bg-gradient-to-r from-white via-stone-50 to-white overflow-hidden relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6">
        {/* Abstract light rays in background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-rose-100/30 blur-3xl"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/4 w-1/4 h-1/4 rounded-full bg-amber-100/20 blur-3xl"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Icon with animation */}
          <motion.div 
            className="inline-flex items-center justify-center mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-50 to-amber-50 flex items-center justify-center shadow-inner">
              <Sparkles className="w-8 h-8 text-photonique-coral/70" />
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h2
            className="text-3xl md:text-5xl font-serif font-light text-neutral-800 mb-8 leading-tight tracking-wide"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
          >
            rediscover your sparkle
          </motion.h2>
          
          {/* Descriptive paragraph */}
          <motion.p
            className="text-xl md:text-2xl text-neutral-700 font-light leading-relaxed mb-12 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true }}
          >
            renewed confidence happens naturally as your hair regains its luminous vitality. 
            the science of light awakens your hair's natural radiance, bringing back the joy of running your fingers through thick, lustrous strands.
          </motion.p>
          
          {/* CTA button */}
          <motion.a
            href="#purchase" 
            className="inline-flex items-center px-8 py-4 bg-photonique-coral text-white rounded-full shadow-lg hover:shadow-xl hover:bg-rose-600 transition-all duration-300 text-lg font-light tracking-wider group"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            begin your transformation
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="ml-3 group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
}

export default SparkleSection;