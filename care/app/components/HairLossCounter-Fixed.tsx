import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Info } from 'lucide-react';

export function HairLossCounter() {
  // Immediately set to dismissed by default now - user can enable if they want
  const [dismissedCounter, setDismissedCounter] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);
  const visibilityObserverRef = useRef<IntersectionObserver | null>(null);
  
  // FIXED: Use IntersectionObserver to detect when counter is visible
  useEffect(() => {
    if (!counterRef.current) return;

    // Clean up any existing observer
    if (visibilityObserverRef.current) {
      visibilityObserverRef.current.disconnect();
    }

    visibilityObserverRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    visibilityObserverRef.current.observe(counterRef.current);
    
    // Cleanup function
    return () => {
      if (visibilityObserverRef.current) {
        visibilityObserverRef.current.disconnect();
        visibilityObserverRef.current = null;
      }
    };
  }, []);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (visibilityObserverRef.current) {
        visibilityObserverRef.current.disconnect();
      }
    };
  }, []);
  
  if (dismissedCounter) return null;
  
  return (
    <motion.div 
      ref={counterRef}
      className="fixed bottom-4 right-4 z-40 transition-all duration-500 rounded-lg overflow-hidden shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 0.8 : 0, // More subtle opacity
        y: isVisible ? 0 : 20,
      }}
    >
      <div className="bg-white/80 backdrop-blur-sm border border-neutral-200">
        {/* Minimized version - more subtle indicator */}
        <motion.div 
          className={`flex items-center justify-between p-2 cursor-pointer ${isExpanded ? 'border-b border-neutral-200' : ''}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center">
            <Info size={14} className="text-neutral-500 mr-2" />
            <span className="text-xs font-medium text-neutral-700">Hair Care Facts</span>
          </div>
          <div className="flex items-center ml-4">
            {isExpanded ? (
              <ChevronDown size={14} className="text-neutral-500" />
            ) : (
              <ChevronUp size={14} className="text-neutral-500" />
            )}
          </div>
        </motion.div>
        
        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="p-3"
            >
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-neutral-500">Average hair shed per day:</span>
                  <span className="text-sm font-medium text-neutral-800">~100 hairs</span>
                </div>
                
                <div className="text-xs text-neutral-600 pt-2 mt-1">
                  <p>Most people don't notice thinning until 50% of hair density is lost.</p>
                  <a href="/pages/science" className="text-rose-500 font-medium mt-1 inline-block">
                    Learn about preventative care →
                  </a>
                </div>
              </div>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setDismissedCounter(true);
                }}
                className="absolute top-2 right-2 text-neutral-400 hover:text-neutral-600 text-xs"
                aria-label="Dismiss hair loss counter"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default HairLossCounter;
