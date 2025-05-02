import React, { useState, useEffect } from 'react';
// Removed Link import as it's not used directly here

// Placeholder for the animated FDA badge - replace with actual SVG/Component
const AnimatedFdaBadge = () => (
  <div className="flex-shrink-0 w-10 h-10 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
    fda
  </div>
);

export function StickyCtaBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Keep scroll threshold for now, ideally trigger after hero
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Using translate-y and opacity for transition (managed by Tailwind classes)
  const visibilityClasses = isVisible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-full';

  // Return null if not visible to prevent layout shift/interaction
  // Note: Could keep it rendered and use pointer-events-none if preferred
  if (!isVisible && !visibilityClasses.includes('opacity-100')) { // Check opacity to allow fade-out
      // We could potentially delay returning null slightly to allow fade-out animation
      // For simplicity now, return null immediately when state is false.
      // Revisit if abrupt disappearance is jarring.
      // return null;
      // Keep rendering during fade-out:
  }

  // Placeholder function for CTA click
  const handleCtaClick = () => {
    console.log('Sticky CTA clicked! Add to cart / purchase logic needed.');
    // Example: Add product to cart, redirect to checkout, etc.
  };

  return (
    <div
      className={`fixed bottom-0 left-0 z-50 w-full bg-contrast/90 backdrop-blur-md shadow-apple-lg transition-all duration-300 ease-in-out ${visibilityClasses}`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 sm:gap-4 text-center sm:text-left">
          {/* Left side: Badge + Urgency Text */} 
          <div className="flex items-center gap-3">
            <AnimatedFdaBadge />
            <p className="text-xs text-secondary-content m-0">
              only a few units left at this price. ships in 24 hours.
            </p>
          </div>

          {/* Right side: CTA Button */} 
          <div className="flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={handleCtaClick}
              // Using refined button style from app.css or a default Tailwind style
              className="btn-primary-refined w-full sm:w-auto text-xs sm:text-sm whitespace-nowrap"
            >
              start your 90-day hair renewal → just $89 <span className="line-through opacity-70 ml-1">$129</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 