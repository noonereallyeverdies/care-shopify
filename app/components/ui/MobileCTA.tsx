import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield } from 'lucide-react';
import { Link } from '@remix-run/react';

export function MobileCTA() {
  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-4 z-50 md:hidden shadow-lg"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-medium text-neutral-900 text-lg">photonique touch</p>
          <p className="text-sm text-neutral-600 flex items-center">
            <Shield className="w-3 h-3 mr-1" />
            60-day guarantee
          </p>
        </div>
        <div className="text-right">
          <p className="text-xl font-medium text-photonique-coral">$89</p>
          <p className="text-xs text-neutral-500 line-through">$129</p>
        </div>
      </div>
      
      <Link
        to="/products/photonique-touch"
        className="w-full bg-photonique-coral text-white py-4 px-6 text-center font-medium tracking-wide transition-colors duration-300 hover:bg-photonique-coral/90 flex items-center justify-center rounded-lg shadow-md"
      >
        <span className="lowercase tracking-widest">get photonique</span>
        <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
      </Link>
      
      {/* Stock indicator for urgency */}
      <div className="mt-2 text-center">
        <span className="text-xs text-neutral-500">
          <span className="w-1.5 h-1.5 bg-photonique-coral rounded-full inline-block mr-1 animate-pulse"></span>
          347 of 500 remaining
        </span>
      </div>
    </motion.div>
  );
}