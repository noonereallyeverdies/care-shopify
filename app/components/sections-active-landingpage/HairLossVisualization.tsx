import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Leaf, Sparkles, ArrowRight } from 'lucide-react';

export function HairWellnessJourney() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeStage, setActiveStage] = useState(0);
  
  const wellnessStages = [
    {
      title: "natural shedding",
      description: "100-150 strands daily is completely normal and healthy",
      percentage: 15,
      icon: Leaf,
      color: "sage-green",
      positive: true
    },
    {
      title: "early awareness",
      description: "Noticing changes and taking gentle action",
      percentage: 35,
      icon: Heart,
      color: "soft-rose",
      positive: true
    },
    {
      title: "proactive care",
      description: "Investing in your hair's long-term wellness",
      percentage: 85,
      icon: Sparkles,
      color: "soft-taupe",
      positive: true
    }
  ];

  // Auto-advance through stages
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % wellnessStages.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isInView, wellnessStages.length]);

  return (
    <section className="py-20 bg-gradient-to-b from-warm-cream to-white">
      <div className="container mx-auto px-6">
        
        {/* Gentle, positive header */}
        <motion.div
          className="text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-light text-charcoal mb-4">
            your hair&apos;s natural journey
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Understanding your hair&apos;s rhythm helps us create the perfect care routine. 
            Every stage is an opportunity to nurture and strengthen.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center" ref={ref}>
          
          {/* Left: Visual wellness representation */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
          >
            <div className="aspect-square max-w-md mx-auto relative">
              
              {/* Central wellness circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-sage-green/10 to-soft-rose/10 rounded-full">
                
                {/* Hair strands growing animation */}
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full"
                >
                  {/* Healthy hair growth visualization */}
                  {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i * 360) / 12;
                    const startX = 100 + Math.cos((angle * Math.PI) / 180) * 60;
                    const startY = 100 + Math.sin((angle * Math.PI) / 180) * 60;
                    const endX = 100 + Math.cos((angle * Math.PI) / 180) * 90;
                    const endY = 100 + Math.sin((angle * Math.PI) / 180) * 90;
                    
                    return (
                      <motion.line
                        key={i}
                        x1={startX}
                        y1={startY}
                        x2={endX}
                        y2={endY}
                        stroke="#A8B5A0" // sage-green color
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={isInView ? { 
                          pathLength: 1, 
                          opacity: 0.7 + (Math.sin((activeStage + i) * 0.5) * 0.3)
                        } : {}}
                        transition={{ 
                          delay: i * 0.1, 
                          duration: 1.5,
                          ease: "easeOut"
                        }}
                      />
                    );
                  })}
                  
                  {/* Center circle representing follicle health */}
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="40"
                    fill="none"
                    stroke="#A8B5A0" // sage-green color
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                  
                  {/* Wellness indicator in center */}
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="25"
                    fill="url(#wellness-gradient)"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 1, delay: 1 }}
                  />
                  
                  <defs>
                    <radialGradient id="wellness-gradient">
                      <stop offset="0%" stopColor="#A8B5A0" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#F8E8E8" stopOpacity="0.2" />{/* soft-rose like color */}
                    </radialGradient>
                  </defs>
                </svg>
              </div>
              
              {/* Floating wellness indicators */}
              <motion.div
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full border border-sage-green/20"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-sm font-medium text-sage-green">93% satisfaction</span>
              </motion.div>
              
              <motion.div
                className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full border border-sage-green/20"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <span className="text-sm font-medium text-sage-green">natural care</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Wellness stages */}
          <div className="space-y-8">
            <h3 className="text-2xl font-light text-charcoal mb-6">
              wellness stages
            </h3>
            
            {wellnessStages.map((stage, index) => {
              const IconComponent = stage.icon;
              const isActive = activeStage === index;
              
              return (
                <motion.div
                  key={index}
                  className={`relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${
                    isActive 
                      ? 'bg-white border-sage-green/30 shadow-lg' 
                      : 'bg-sage-green/5 border-sage-green/10 hover:border-sage-green/20'
                  }`}
                  onClick={() => setActiveStage(index)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-sage-green/20 to-soft-rose/20 flex items-center justify-center ${
                      isActive ? 'scale-110' : ''
                    } transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-sage-green" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-charcoal mb-1">
                        {stage.title}
                      </h4>
                      <p className="text-neutral-600 text-sm">
                        {stage.description}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-light text-sage-green">
                        {stage.percentage}%
                      </div>
                      <div className="text-xs text-neutral-500">optimal care</div>
                    </div>
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="mt-4">
                    <div className="h-1 bg-neutral-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-sage-green to-sage-green/80 rounded-full"
                        initial={{ width: 0 }}
                        animate={isActive ? { width: `${stage.percentage}%` } : { width: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 border-2 border-sage-green rounded-2xl"
                      layoutId="activeStage"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Positive reinforcement message */}
        <motion.div
          className="mt-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5 }}
        >
          <div className="bg-gradient-to-r from-sage-green/10 via-white to-soft-rose/10 rounded-2xl p-8 border border-sage-green/20">
            <h4 className="text-xl font-medium text-charcoal mb-4">
              your hair wellness journey starts here
            </h4>
            <p className="text-neutral-600 leading-relaxed mb-6">
              Every day you choose care•atin is a day you&apos;re investing in your hair&apos;s future. 
              Our gentle, science-backed approach works with your hair&apos;s natural rhythm for lasting results.
            </p>
            
            <motion.button
              className="inline-flex items-center px-6 py-3 bg-sage-green text-white rounded-full font-medium hover:bg-sage-green/90 transition-colors group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { // Add onClick handler for navigation
                if (typeof window !== 'undefined') {
                  window.location.href = '/pages/hair-quiz';
                }
              }}
            >
              Begin Your Wellness Journey
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 