import React from 'react';
import clsx from 'clsx';

/**
 * EditorialImage Component
 * 
 * Renders an image with editorial styling including film grain texture overlay
 * and optional floating information card.
 * 
 * @param {string} src - The image source URL
 * @param {string} alt - Alt text for the image
 * @param {string} aspectRatio - Aspect ratio of the image container ('square', '3/4', '16/9', 'video', 'auto')
 * @param {boolean} darkMode - Whether to use dark mode styling
 * @param {object} floatingCard - Optional object with floating card data
 * @param {string} floatingCard.position - Position of the card ('top-left', 'top-right', 'bottom-left', 'bottom-right')
 * @param {React.ReactNode} floatingCard.content - Content to display in the floating card
 * @param {string} className - Additional CSS classes to apply
 */
const EditorialImage = ({
  src,
  alt,
  aspectRatio = 'square',
  darkMode = false,
  floatingCard,
  className,
}: {
  src: string;
  alt: string;
  aspectRatio?: 'square' | '3/4' | '16/9' | 'video' | 'auto';
  darkMode?: boolean;
  floatingCard?: {
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    content: React.ReactNode;
  };
  className?: string;
}) => {
  // Map aspect ratio to className
  const aspectRatioClass = {
    'square': 'aspect-square',
    '3/4': 'aspect-[3/4]',
    '16/9': 'aspect-[16/9]',
    'video': 'aspect-video',
    'auto': 'aspect-auto',
  }[aspectRatio] || 'aspect-square';
  
  // Map floating card position to className
  const cardPositionClass = floatingCard && {
    'top-left': 'top-8 left-8 lg:-top-8 lg:-left-8',
    'top-right': 'top-8 right-8 lg:-top-8 lg:-right-8',
    'bottom-left': 'bottom-8 left-8 lg:-bottom-8 lg:-left-8',
    'bottom-right': 'bottom-8 right-8 lg:-bottom-8 lg:-right-8',
  }[floatingCard.position] || 'bottom-8 left-8 lg:-bottom-8 lg:-left-8';

  return (
    <div className={clsx('relative', className)}>
      {/* Main image container */}
      <div className={clsx('relative overflow-hidden', aspectRatioClass)}>
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
        
        {/* Film grain texture overlay */}
        <div 
          className={clsx(
            'absolute inset-0 bg-[url(\'/textures/film-grain.png\')] mix-blend-overlay pointer-events-none',
            darkMode ? 'opacity-30' : 'opacity-20'
          )}
        />
      </div>
      
      {/* Optional floating information card */}
      {floatingCard && (
        <div 
          className={clsx(
            'absolute z-10 bg-white p-6 shadow-lg w-64 max-w-[calc(100%-2rem)]',
            darkMode ? 'text-neutral-800' : 'text-neutral-900',
            cardPositionClass
          )}
        >
          {floatingCard.content}
        </div>
      )}
    </div>
  );
};

export default EditorialImage;
