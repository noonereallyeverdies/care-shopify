import React, { useState, useRef, useEffect } from 'react';
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
    if (isDragging && e.touches[0]) {
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

  // Event listeners for mousemove and mouseup
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <div className="space-y-6">
      {/* Image comparison slider */}
      <div 
        ref={containerRef}
        className="relative aspect-[3/4] overflow-hidden rounded-lg select-none cursor-ew-resize"
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
