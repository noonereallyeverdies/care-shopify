import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function HairLossVisualization() {
  const [count, setCount] = useState(0);
  const [displayedCount, setDisplayedCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start with 0, animate to 3,577 (average monthly hair loss)
    const targetCount = 3577;
    const duration = 3000; // 3 seconds
    const increment = Math.ceil(targetCount / (duration / 16));
    let startTimestamp: number | null = null;
    
    const animateCount = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      
      if (elapsed < duration) {
        const progress = elapsed / duration;
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
        const newCount = Math.min(Math.ceil(targetCount * easeProgress), targetCount);
        setCount(newCount);
        requestAnimationFrame(animateCount);
      } else {
        setCount(targetCount);
      }
    };
    
    // Start the animation when the component becomes visible
    if (isVisible) {
      requestAnimationFrame(animateCount);
    }
  }, [isVisible]);
  
  // Format the count with commas
  useEffect(() => {
    setDisplayedCount(count);
  }, [count]);
  
  // Handle intersection observer to trigger animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    const element = document.getElementById('hair-loss-counter');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section className="problem-section section-padding">
      <div className="container mx-auto px-6">
        <h2 className="brand-heading text-center text-3xl md:text-4xl mb-3">
          the <span className="text-rose-600">true cost</span> of waiting
        </h2>
        
        <p className="brand-body text-center max-w-2xl mx-auto mb-16">
          The average woman loses <span className="font-medium text-rose-600">55%</span> of her hair's volume 
          before taking action. Don't wait until it's visible to everyone else.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left column: Counter and stats */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-neutral-100">
            <div id="hair-loss-counter" className="p-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-50 to-white opacity-50"></div>
              
              <div className="relative">
                <div className="flex flex-col items-center mb-8">
                  <motion.div 
                    className="stat-primary mb-2 tabular-nums"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {displayedCount.toLocaleString()}
                  </motion.div>
                  <div className="text-neutral-700 text-lg">
                    Hair strands lost
                  </div>
                  <div className="text-neutral-500 text-sm">
                    Average per month without intervention
                  </div>
                </div>
                
                <div className="w-full h-2 bg-neutral-100 rounded-full mb-12">
                  <div 
                    className="h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-full"
                    style={{ width: '80%' }}
                  ></div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-neutral-50 rounded-lg">
                    <div className="text-2xl font-bold text-rose-600">150</div>
                    <div className="text-xs text-neutral-600 mt-1">Average strands lost daily</div>
                  </div>
                  
                  <div className="text-center p-4 bg-neutral-50 rounded-lg">
                    <div className="text-2xl font-bold text-rose-600">68%</div>
                    <div className="text-xs text-neutral-600 mt-1">Women who wait until loss is visible</div>
                  </div>
                  
                  <div className="text-center p-4 bg-neutral-50 rounded-lg">
                    <div className="text-2xl font-bold text-rose-600">55%</div>
                    <div className="text-xs text-neutral-600 mt-1">Reduction in hair volume before action</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-rose-50 border-t border-rose-100">
              <div className="flex justify-center">
                <a href="/pages/hair-quiz" className="btn-primary">
                  Find Out Your Risk Level
                </a>
              </div>
            </div>
          </div>
          
          {/* Right column: Visualization */}
          <div className="relative">
            <div className="aspect-square bg-neutral-50 rounded-full overflow-hidden max-w-md mx-auto">
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full"
              >
                {/* This would be a visualization of hair loss - using placeholder for now */}
                <g className="hair-loss-viz">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <motion.line 
                      key={i}
                      x1="50"
                      y1="50"
                      x2={50 + 40 * Math.cos(i * 0.2 * Math.PI)}
                      y2={50 + 40 * Math.sin(i * 0.2 * Math.PI)}
                      stroke={i % 3 === 0 ? "#d1d5db" : "#6b7280"}
                      strokeWidth={i % 5 === 0 ? "1.5" : "1"}
                      initial={{ opacity: 0, pathLength: 0 }}
                      animate={{ 
                        opacity: isVisible ? 1 : 0, 
                        pathLength: isVisible ? 1 : 0 
                      }}
                      transition={{ 
                        delay: i * 0.03, 
                        duration: 1.5,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </g>
              </svg>
            </div>
            
            <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-md border border-neutral-100 max-w-xs">
              <div className="text-sm text-neutral-700">
                <span className="font-medium">Every day you wait</span> is another day of 
                hair loss that could have been prevented with care<span className="brand-dot">•</span>atin's proven technology.
              </div>
            </div>
          </div>
        </div>
        
        <motion.div 
          className="mt-12 max-w-3xl mx-auto bg-amber-50 p-6 rounded-xl border border-amber-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-medium text-amber-800 mb-2">Don't wait until it's too late</h3>
          <p className="text-amber-700">
            Hair loss is progressive, and early intervention gives the best results. By the time 
            hair loss becomes visible to others, you've already lost significant volume. 
            care<span className="brand-dot">•</span>atin helps you act before it's too late.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 