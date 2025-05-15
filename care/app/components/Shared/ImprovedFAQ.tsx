import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ChevronDown, Info } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface ImprovedFAQProps {
  items: FAQItem[];
  initialOpenIndex?: number;
  allowMultipleOpen?: boolean;
  showInfoIcon?: boolean;
  compactMode?: boolean;
  className?: string;
}

/**
 * An improved FAQ component with better accessibility and animations
 */
export function ImprovedFAQ({
  items,
  initialOpenIndex = -1,
  allowMultipleOpen = false,
  showInfoIcon = true,
  compactMode = false,
  className = '',
}: ImprovedFAQProps) {
  // Allow multiple items to be open or just one at a time
  const [openIndices, setOpenIndices] = useState<number[]>(
    initialOpenIndex >= 0 ? [initialOpenIndex] : []
  );
  
  const toggleItem = (index: number) => {
    if (allowMultipleOpen) {
      // Toggle the clicked item, leave others unchanged
      setOpenIndices(prev => 
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      // Either open the clicked item or close all items
      setOpenIndices(prev => 
        prev.includes(index) ? [] : [index]
      );
    }
  };
  
  // Determine if an item is open
  const isOpen = (index: number) => openIndices.includes(index);
  
  return (
    <div className={`${className}`}>
      <div className={`${compactMode ? 'space-y-2' : 'space-y-4'}`}>
        {items.map((item, index) => (
          <div 
            key={index} 
            className={`${compactMode 
              ? 'border-b border-neutral-100 last:border-b-0 pb-2' 
              : 'border border-neutral-200 rounded-lg overflow-hidden'}`}
          >
            <button
              aria-expanded={isOpen(index)}
              aria-controls={`faq-answer-${index}`}
              className={`w-full text-left flex justify-between items-center transition-colors ${
                compactMode 
                  ? 'py-3 px-1 hover:bg-neutral-50' 
                  : 'p-4 bg-white hover:bg-neutral-50'
              } ${isOpen(index) ? 'bg-neutral-50' : ''}`}
              onClick={() => toggleItem(index)}
            >
              <span className={`flex items-center ${compactMode ? 'text-sm' : 'font-medium'} text-neutral-800`}>
                {showInfoIcon && (
                  <Info size={compactMode ? 14 : 18} className="text-rose-500 mr-2 flex-shrink-0" aria-hidden="true" />
                )}
                <span>{item.question}</span>
              </span>
              
              <span className="flex-shrink-0 ml-2">
                {isOpen(index) ? (
                  <Minus size={compactMode ? 14 : 18} className="text-neutral-500" aria-hidden="true" />
                ) : (
                  <Plus size={compactMode ? 14 : 18} className="text-neutral-500" aria-hidden="true" />
                )}
              </span>
            </button>
            
            <AnimatePresence>
              {isOpen(index) && (
                <motion.div
                  id={`faq-answer-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className={`${compactMode ? 'px-1 pb-3 text-sm' : 'px-4 pb-4'} text-neutral-600`}>
                    <p>{item.answer}</p>
                    
                    {/* Category tag if provided */}
                    {item.category && (
                      <div className="mt-3">
                        <span className="inline-block text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
