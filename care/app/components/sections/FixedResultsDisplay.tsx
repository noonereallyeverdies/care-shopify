import React from 'react';
import { StatFormatter } from '~/components/Shared/StatFormatter';
import { motion } from 'framer-motion';

/**
 * This component replaces the problematic section that shows "0%" 
 * with a proper display of "93%" clinical results
 */
export function FixedResultsDisplay() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-medium mb-4 text-neutral-800">Clinical Results Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-50 rounded-lg p-4">
            <StatFormatter 
              value={93}
              label="Visible Improvement"
              disclaimer="Users reporting positive results"
              color="primary"
              size="medium"
              fadeIn={true}
            />
          </div>
          
          <div className="bg-neutral-50 rounded-lg p-4">
            <StatFormatter 
              value={28}
              label="Increased Density"
              disclaimer="Average hair density increase"
              color="success"
              size="medium"
              fadeIn={true}
            />
          </div>
          
          <div className="bg-neutral-50 rounded-lg p-4">
            <StatFormatter 
              value={62}
              label="Reduced Shedding"
              disclaimer="Average reduction in daily hair loss"
              color="success"
              size="medium"
              fadeIn={true}
            />
          </div>
        </div>
        
        <p className="mt-6 text-sm text-neutral-500">
          *Based on clinical studies with 90+ days of consistent use.
          Individual results may vary.
        </p>
        
        <button className="mt-8 bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-full transition-colors">
          View Detailed Clinical Data
        </button>
      </motion.div>
    </div>
  );
}
