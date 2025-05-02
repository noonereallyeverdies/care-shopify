import React, { useState, useEffect } from 'react';
import { Link } from '@remix-run/react';

interface QuizLauncherProps {
  // Add any necessary props, e.g., for different styling variants
  className?: string; // Allow passing additional classes
}

// Basic launcher - could be a button or styled link
export function QuizLauncher({ className = '' }: QuizLauncherProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show after scrolling down 150px (adjust as needed)
      if (window.scrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    // Initial check
    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Visibility classes for transition
  const visibilityClasses = isVisible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-10 pointer-events-none'; // Move down slightly when hidden

  return (
    <div className="fixed bottom-4 left-4 z-40" style={{ position: 'fixed' }}> {/* Ensure non-static position for framer-motion */}
      <Link
        to="/pages/hair-quiz" // Link destination as per US1.5
        aria-hidden={!isVisible}
        // Apply transition, visibility, and base styling
        className={`relative transition-all duration-300 ease-in-out ${visibilityClasses} 
                  inline-block rounded-full bg-rose-100 px-5 py-2 text-sm font-medium text-rose-800 hover:bg-rose-200 hover:text-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 ${className}`}
      >
        what stage is your scalp in?
      </Link>
    </div>
  );
} 