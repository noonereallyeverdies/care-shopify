import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

/**
 * BeforeAfterSliderComponent
 * 
 * An interactive slider for comparing before/after images with editorial styling
 * 
 * @param {string} beforeImage - URL of the "before" image
 * @param {string} afterImage - URL of the "after" image
 * @param {string} beforeLabel - Label for the "before" image
 * @param {string} afterLabel - Label for the "after" image
 * @param {string} aspectRatio - Aspect ratio of the container ('square', '3/4', 'video', etc.)
 * @param {boolean} filmGrain - Whether to add film grain overlay
 * @param {string} className - Additional CSS classes to apply
 */
const BeforeAfterSliderComponent = ({
  beforeImage,
  afterImage,
  beforeLabel = 'before',
  afterLabel = 'after',
  aspectRatio = 'square',
  filmGrain = true,
  className
}: {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: 'square' | '3/4' | '16/9' | 'video' | 'auto';
  filmGrain?: boolean;
  className?: string;
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Map aspect ratio to className
  const aspectRatioClass = {
    'square': 'aspect-square',
    '3/4': 'aspect-[3/4]',
    '16/9': 'aspect-[16/9]',
    'video': 'aspect-video',
    'auto': 'aspect-auto',
  }[aspectRatio] || 'aspect-square';

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.touches[0].clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateSliderPosition(e.clientX);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging) {
      updateSliderPosition(e.touches[0].clientX);
    }
  };

  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = (x / rect.width) * 100;
    
    // Clamp position between 0 and 100
    const clampedPosition = Math.max(0, Math.min(100, position));
    setSliderPosition(clampedPosition);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className={clsx(
        'relative overflow-hidden select-none',
        aspectRatioClass,
        className
      )}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* After image (full width) */}
      <div className="absolute inset-0">
        <img 
          src={afterImage} 
          alt={afterLabel} 
          className="w-full h-full object-cover"
        />
        {filmGrain && (
          <div className="absolute inset-0 bg-[url('/textures/film-grain.png')] opacity-20 mix-blend-overlay pointer-events-none" />
        )}
      </div>

      {/* Before image (clipped) */}
      <div 
        className="absolute inset-0"
        style={{ 
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` 
        }}
      >
        <img 
          src={beforeImage} 
          alt={beforeLabel} 
          className="w-full h-full object-cover"
        />
        {filmGrain && (
          <div className="absolute inset-0 bg-[url('/textures/film-grain.png')] opacity-20 mix-blend-overlay pointer-events-none" />
        )}
      </div>

      {/* Slider */}
      <div 
        className="absolute inset-y-0 w-1 bg-white shadow-lg cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Slider handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="w-4 h-0.5 bg-neutral-400 mb-1"></div>
            <div className="w-4 h-0.5 bg-neutral-400"></div>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 text-sm rounded-full">
        {beforeLabel}
      </div>
      <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 text-sm rounded-full">
        {afterLabel}
      </div>
    </div>
  );
};

export default BeforeAfterSliderComponent;
