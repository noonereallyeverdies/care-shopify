import React from 'react';
import { Link } from '@remix-run/react';
import type { LucideProps } from 'lucide-react';

// Extracted PrimaryButton component
export const PrimaryButton: React.FC<{ 
  to: string; 
  text: string; 
  icon?: React.ComponentType<LucideProps>; // Optional icon
  className?: string; 
}> = ({ to, text, icon: Icon, className = '' }) => (
  <Link to={to} className={`group inline-flex ${className}`}> 
    {/* Ensure the button uses the correct global class */}
    <button className="btn-primary-refined">
      {text}
      {Icon && (
        // Removed motion.span, use regular span with Tailwind for transition
        <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
      )}
    </button>
  </Link>
); 