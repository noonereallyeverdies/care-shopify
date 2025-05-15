import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '~/components/Shared/AnimatedCounter';

interface ScienceStatItemProps {
  value: number;
  label: string;
  disclaimer?: string;
  className?: string;
  suffix?: string;
}

/**
 * A consistent component for displaying statistical information in science sections
 * Replaces the problematic 0% with the correct stats
 */
export function ScienceStatItem({ 
  value, 
  label, 
  disclaimer, 
  className = '', 
  suffix = '%'
}: ScienceStatItemProps) {
  return (
    <div className={`text-center py-6 px-4 ${className}`}>
      <div className="mb-2 text-5xl font-bold text-rose-600 tabular-nums md:text-7xl">
        <AnimatedCounter 
          targetValue={value} 
          suffix={suffix}
          duration={2}
        /> 
      </div>
      <p className="text-neutral-600">{label}</p>
      {disclaimer && (
        <p className="mt-1 text-xs text-neutral-500">{disclaimer}</p>
      )}
    </div>
  );
}
