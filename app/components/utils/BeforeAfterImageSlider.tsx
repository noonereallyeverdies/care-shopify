import React, { useState } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';

interface BeforeAfterImageSliderProps {
  beforeImageSrc: string;
  afterImageSrc: string;
  containerClassName?: string;
  sliderLineColor?: string;
  sliderHandleColor?: string;
}

const BeforeAfterImageSlider: React.FC<BeforeAfterImageSliderProps> = ({
  beforeImageSrc,
  afterImageSrc,
  containerClassName = 'w-full aspect-[4/3] overflow-hidden relative select-none shadow-md rounded-lg',
  sliderLineColor = 'bg-white/80',
  sliderHandleColor = 'border-white/80'
}) => {
  const [sliderPositionPercent, setSliderPositionPercent] = useState(50); // Percentage 0-100
  const x = useMotionValue(0); // Represents the raw x position of the handle
  const [containerWidth, setContainerWidth] = useState(0);

  const handleRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setContainerWidth(width);
      // Set initial position of the motion value based on sliderPositionPercent
      x.set((sliderPositionPercent / 100) * width - width / 2);
    }
  }, [sliderPositionPercent, x]); // Removed containerWidth from deps to avoid loop

  // Update sliderPositionPercent when x changes
  React.useEffect(() => {
    return x.onChange(currentX => {
      if (containerWidth > 0) {
        const newPercent = ((currentX + containerWidth / 2) / containerWidth) * 100;
        setSliderPositionPercent(Math.max(0, Math.min(100, newPercent)));
      }
    });
  }, [x, containerWidth]);

  const clipPathInset = useTransform(x, latestX => {
    if (containerWidth === 0) return 'inset(0 50% 0 0)'; // Default if no width
    const currentPercent = ((latestX + containerWidth / 2) / containerWidth) * 100;
    return `inset(0 ${100 - Math.max(0, Math.min(100, currentPercent))}% 0 0)`;
  });

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // No need to directly setSliderPositionPercent here, it's handled by x.onChange
  };

  return (
    <div ref={containerRef} className={`ba-slider-container ${containerClassName}`}>
      {/* Before Image (Bottom Layer) */}
      <img 
        src={beforeImageSrc} 
        alt="Before" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
        draggable="false"
      />

      {/* After Image (Top Layer, Clipped) */}
      <motion.div 
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ clipPath: clipPathInset }}
      >
        <img 
          src={afterImageSrc} 
          alt="After" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{minWidth: '100%', minHeight: '100%', objectFit: 'cover'}}
          draggable="false"
        />
      </motion.div>

      {/* Slider Handle */}
      <motion.div
        ref={handleRef}
        className={`ba-slider-handle absolute top-0 bottom-0 w-1.5 ${sliderLineColor} cursor-ew-resize group flex items-center justify-center`}
        style={{ 
          x, // Bind directly to motion value
          left: '50%', // Initial centered position (x will offset it)
          touchAction: 'none' // Important for mobile drag
        }}
        drag="x"
        dragConstraints={{
          left: -containerWidth / 2,
          right: containerWidth / 2,
        }}
        dragElastic={0.05}
        dragMomentum={false}
        onDrag={handleDrag}
      >
        <div className={`ba-slider-handle-icon w-10 h-10 rounded-full border ${sliderHandleColor} backdrop-blur-sm flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200`}>
          <svg className="w-5 h-5 text-white opacity-80" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
        </div> 
      </motion.div>
    </div>
  );
};

export default BeforeAfterImageSlider; 