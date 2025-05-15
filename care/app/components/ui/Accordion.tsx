import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react'; // Or your preferred icon library

interface AccordionProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

export function Accordion({ title, children, isOpen, onClick }: AccordionProps) {
  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
      >
        <span className="text-md font-medium text-neutral-700 hover:text-rose-600 transition-colors">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className={`w-5 h-5 text-neutral-500 transition-transform ${isOpen ? 'text-rose-600' : ''}`} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-neutral-600 text-sm leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 