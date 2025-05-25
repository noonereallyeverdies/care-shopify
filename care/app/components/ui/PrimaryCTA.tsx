import React from 'react';
import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';

interface PrimaryCTAProps {
  text: string;
  to?: string;
  type?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

/**
 * Primary CTA Button component
 * Follows the "Off-Duty Model with Nerd Brains" aesthetic,
 * using our refined red, white, black, and pastel pink color scheme
 */
export const PrimaryCTA: React.FC<PrimaryCTAProps> = ({
  text,
  to = '#',
  type = 'primary',
  className = '',
  onClick,
  icon,
}) => {
  // Base styles
  let buttonStyles = 'inline-flex items-center justify-center px-6 py-3 font-medium tracking-tight text-center transition-all duration-200 focus:outline-none rounded-lg';
  
  // Style variations based on type
  switch (type) {
    case 'primary':
      buttonStyles += ' bg-red-500 text-white hover:bg-red-700 active:bg-red-800';
      break;
    case 'secondary':
      buttonStyles += ' bg-pink-100 text-black hover:bg-pink-200 active:bg-pink-300';
      break;
    case 'outline':
      buttonStyles += ' bg-transparent border border-black text-black hover:bg-black hover:text-white active:bg-gray-900';
      break;
    default:
      buttonStyles += ' bg-red-500 text-white hover:bg-red-700 active:bg-red-800';
  }

  // Add custom class names
  buttonStyles += ` ${className}`;

  // Safely check if it's an external link
  const isExternalLink = typeof to === 'string' && to.startsWith('http');

  // Animation variant
  const buttonVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  };

  const content = (
    <>
      {text}
      {icon && <span className="ml-2">{icon}</span>}
    </>
  );

  // If onClick is provided without a 'to' property, render as a button
  if (onClick && to === '#') {
    return (
      <motion.button
        type="button"
        className={buttonStyles}
        onClick={onClick}
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
      >
        {content}
      </motion.button>
    );
  }

  if (isExternalLink) {
    return (
      <motion.a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonStyles}
        onClick={onClick}
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
    >
      <Link to={to} className={buttonStyles} onClick={onClick}>
        {content}
      </Link>
    </motion.div>
  );
};

interface CTAContainerProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

/**
 * Container for CTA buttons that provides proper spacing and layout
 */
export const CTAContainer: React.FC<CTAContainerProps> = ({
  children,
  className = '',
  align = 'left',
}) => {
  let alignmentClasses = '';
  
  switch (align) {
    case 'center':
      alignmentClasses = 'justify-center';
      break;
    case 'right':
      alignmentClasses = 'justify-end';
      break;
    case 'left':
    default:
      alignmentClasses = 'justify-start';
      break;
  }
  
  return (
    <div className={`flex flex-wrap gap-4 items-center mt-6 ${alignmentClasses} ${className}`}>
      {children}
    </div>
  );
}; 