import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  daysBetween?: number;
  showMetrics?: boolean;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  daysBetween = 90,
  showMetrics = false
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Metrics for the comparison (to display if showMetrics is true)
  const metrics = {
    densityIncrease: 76,
    thicknessIncrease: 65,
    lessBreakage: 52
  };

  // Optimized event handlers using useCallback
  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = (x / rect.width) * 100;
    
    // Clamp position between 0 and 100
    const clampedPosition = Math.max(0, Math.min(100, position));
    setSliderPosition(clampedPosition);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  }, [updateSliderPosition]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    if (e.touches[0]) {
      updateSliderPosition(e.touches[0].clientX);
    }
  }, [updateSliderPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      updateSliderPosition(e.clientX);
    }
  }, [isDragging, updateSliderPosition]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging && e.touches[0]) {
      e.preventDefault();
      updateSliderPosition(e.touches[0].clientX);
    }
  }, [isDragging, updateSliderPosition]);

  // FIXED: Improved event listener management with proper cleanup
  useEffect(() => {
    if (isDragging) {
      // Add event listeners to window to catch mouse movements outside the component
      window.addEventListener('mousemove', handleMouseMove, { passive: false });
      window.addEventListener('mouseup', handleMouseUp, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd, { passive: true });
      
      // Prevent text selection during drag
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
    }
    
    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      
      // Restore text selection
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      // Ensure text selection is restored on unmount
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Image comparison slider */}
      <div 
        ref={containerRef}
        className="relative aspect-[3/4] overflow-hidden rounded-lg select-none cursor-ew-resize"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={sliderPosition}
        aria-label={`Before and after comparison slider at ${Math.round(sliderPosition)}%`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            setSliderPosition(Math.max(0, sliderPosition - 5));
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            setSliderPosition(Math.min(100, sliderPosition + 5));
          }
        }}
      >
        {/* After image (full width) */}
        <div className="absolute inset-0">
          <img 
            src={afterImage} 
            alt={afterLabel} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Editorial film grain overlay */}
          <div className="absolute inset-0 bg-[url('/textures/film-grain.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        </div>

        {/* Before image (clipped by slider position) */}
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
            loading="lazy"
          />
          {/* Editorial film grain overlay */}
          <div className="absolute inset-0 bg-[url('/textures/film-grain.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        </div>

        {/* Slider handle */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="w-0.5 h-4 bg-neutral-400 rounded-full"></div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 text-sm rounded-full">
          {beforeLabel}
        </div>
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 text-sm rounded-full">
          {afterLabel}
        </div>

        {/* Days between indicator */}
        {daysBetween && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 text-neutral-800 px-3 py-1 text-sm rounded-full">
            {daysBetween} days
          </div>
        )}
      </div>

      {/* Optional metrics display */}
      {showMetrics && (
        <div className="grid grid-cols-3 gap-4">
          <motion.div 
            className="bg-white p-4 rounded-lg shadow-sm text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-3xl font-light text-rose-500">+{metrics.densityIncrease}%</p>
            <p className="text-sm text-neutral-600">Hair Density</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-4 rounded-lg shadow-sm text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-3xl font-light text-rose-500">+{metrics.thicknessIncrease}%</p>
            <p className="text-sm text-neutral-600">Hair Thickness</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-4 rounded-lg shadow-sm text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-3xl font-light text-rose-500">-{metrics.lessBreakage}%</p>
            <p className="text-sm text-neutral-600">Hair Breakage</p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
