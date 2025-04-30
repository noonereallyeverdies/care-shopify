import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PrimaryCTAProps {
  text?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  withArrow?: boolean;
  onClick?: () => void;
  className?: string;
}

export function PrimaryCTA({
  text = 'Find Your Personalized Hair Solution',
  href = '/pages/hair-quiz',
  variant = 'primary',
  size = 'medium',
  withArrow = true,
  onClick,
  className = '',
}: PrimaryCTAProps) {
  const baseClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    tertiary: 'btn-tertiary',
  };

  const sizeClasses = {
    small: 'text-sm px-4 py-2',
    medium: 'px-6 py-3',
    large: 'text-lg px-8 py-4 font-medium',
  };

  const buttonClasses = `${baseClasses[variant]} ${sizeClasses[size]} ${className}`;

  // Set up tracking for conversions
  const handleClick = () => {
    // Track the event
    try {
      // Track event (e.g., Google Analytics, Facebook Pixel, etc.)
      console.log(`CTA Clicked: ${text} | Destination: ${href}`);
      
      // Call custom onClick handler if provided
      onClick?.();
    } catch (error) {
      console.error('Error tracking CTA click:', error);
    }
  };

  return (
    <a 
      href={href} 
      className={`inline-flex items-center gap-2 ${buttonClasses}`}
      onClick={handleClick}
    >
      {text}
      {withArrow && <ArrowRight size={size === 'small' ? 14 : size === 'large' ? 20 : 18} />}
    </a>
  );
}

interface CTAContainerProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export function CTAContainer({
  children,
  subtitle,
  className = '',
}: CTAContainerProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {children}
      
      {subtitle && (
        <p className="text-sm text-neutral-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default PrimaryCTA; 