import React from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons'; // Assuming icons are react-icons or similar

// Re-defining StepConfig here or importing from a shared types file
export type StepConfig = {
  id: number;
  title: string;
  icon: React.ElementType; // Keep as React.ElementType if lucide-react icons are passed directly
  color: string; // e.g., 'rose-500' or a hex code for more control
  mobileText: string;
  desktopText: string;
};

interface ScienceStepProps {
  step: StepConfig;
  opacity: any; // Or number if opacity is always a numerical value
  isMobile: boolean;
}

export const ScienceStep: React.FC<ScienceStepProps> = ({ step, opacity, isMobile }) => {
  const Icon = step.icon;
  
  // Mapping tailwind colors to hex for direct style application (optional, for consistency)
  const colorHexMap: { [key: string]: string } = {
    'rose-500': '#F43F5E',
    'blue-500': '#3B82F6',
    'green-500': '#22C55E',
    // Add more mappings if needed
  };

  // Dynamic text color based on step for better visual association
  // Using a softer charcoal for general text and step-specific color for accents
  const iconColor = colorHexMap[step.color] || step.color; // Fallback to step.color if not in map

  return (
    <motion.div 
      className={`pointer-events-none fixed inset-0 top-0 flex items-center justify-center ${
        isMobile ? 'h-[60vh]' : 'h-screen'
      }`}
      style={{ opacity }}
      aria-hidden={opacity === 0}
    >
      <motion.div 
        className="pointer-events-auto flex max-w-xs flex-col items-center rounded-xl bg-cream-white/90 p-6 text-center shadow-soft-xl backdrop-blur-md md:p-8 md:max-w-md timeline-node-glossier"
        initial={{ scale: 0.9, y: 10 }}
        animate={{ scale: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      >
        <Icon size={isMobile ? 28 : 32} style={{ color: iconColor }} className="mb-3 drop-shadow-sm" aria-hidden="true" />
        <h3 className="mb-2 text-xl font-semibold text-charcoal-primary md:text-2xl">
          <span style={{ color: iconColor }} className="font-bold">{step.id}.</span> {step.title}
        </h3>
        <p className="text-sm text-charcoal-secondary md:text-base">
          {isMobile ? step.mobileText : step.desktopText}
        </p>
      </motion.div>
    </motion.div>
  );
}; 