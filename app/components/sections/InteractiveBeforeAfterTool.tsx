import React, { useState, useMemo } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { ZoomIn, Zap, Eye, Clock } from 'lucide-react'; // Placeholder icons

interface TimePoint {
  id: string;
  label: string; // e.g., "Week 0", "Week 4"
  beforeImageSrc: string;
  afterImageSrc: string;
  microscopicImageSrc: string;
}

// Placeholder data - replace with actual image paths
const timePointsData: TimePoint[] = [
  {
    id: 'w0',
    label: 'Initial State',
    beforeImageSrc: '/placeholders/before-after/before_initial.jpg',
    afterImageSrc: '/placeholders/before-after/after_w0_placeholder.jpg', // Or same as before for week 0
    microscopicImageSrc: '/placeholders/before-after/micro_w0.jpg',
  },
  {
    id: 'w4',
    label: 'Week 4',
    beforeImageSrc: '/placeholders/before-after/before_initial.jpg', // Usually same before image
    afterImageSrc: '/placeholders/before-after/after_w4.jpg',
    microscopicImageSrc: '/placeholders/before-after/micro_w4.jpg',
  },
  {
    id: 'w8',
    label: 'Week 8',
    beforeImageSrc: '/placeholders/before-after/before_initial.jpg',
    afterImageSrc: '/placeholders/before-after/after_w8.jpg',
    microscopicImageSrc: '/placeholders/before-after/micro_w8.jpg',
  },
  {
    id: 'w12',
    label: 'Week 12',
    beforeImageSrc: '/placeholders/before-after/before_initial.jpg',
    afterImageSrc: '/placeholders/before-after/after_w12.jpg',
    microscopicImageSrc: '/placeholders/before-after/micro_w12.jpg',
  },
];

const InteractiveBeforeAfterTool: React.FC = () => {
  const [currentTimePointIndex, setCurrentTimePointIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // Percentage 0-100
  const [showMicroscopicView, setShowMicroscopicView] = useState(false);
  const [showLightingEffects, setShowLightingEffects] = useState(false);

  // Guard for empty or undefined data
  if (!timePointsData || timePointsData.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-stone-100 text-neutral-800 font-serif">
        <div className="container mx-auto px-6 text-center">
          <p>Before/After comparison data is currently unavailable.</p>
        </div>
      </section>
    );
  }

  // Using non-null assertion as TypeScript struggles to infer non-nullability despite guards.
  const activeTimePoint: TimePoint = useMemo(() => {
    const point = timePointsData[currentTimePointIndex];
    if (point) {
      return point;
    }
    return timePointsData[0]; 
  }, [currentTimePointIndex])!;

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const newPosition = Math.max(0, Math.min(100, sliderPosition + info.delta.x / 5)); // Adjust sensitivity
    setSliderPosition(newPosition);
  };

  const BeforeImage = activeTimePoint.beforeImageSrc;
  const AfterImage = activeTimePoint.afterImageSrc;
  const MicroscopicImage = activeTimePoint.microscopicImageSrc;

  return (
    <section className="py-16 md:py-24 bg-stone-100 text-neutral-800 font-serif overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-neutral-900 mb-3 lowercase">
            Witness the Transformation
          </h2>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
            Explore real results over time. Our science, your stunning hair.
          </p>
        </div>

        {/* Time Point Selection */} 
        <div className="flex justify-center space-x-2 md:space-x-4 mb-8 md:mb-12">
          {timePointsData.map((tp, index) => (
            <button
              key={tp.id}
              onClick={() => setCurrentTimePointIndex(index)}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ease-out 
                          ${currentTimePointIndex === index 
                            ? 'bg-rose-600 text-white shadow-lg scale-105' 
                            : 'bg-stone-200 text-neutral-700 hover:bg-stone-300'}`}
            >
              {tp.label}
            </button>
          ))}
        </div>

        {/* Image Comparison Area */} 
        <div className="relative w-full max-w-3xl mx-auto aspect-[4/3] shadow-2xl rounded-lg overflow-hidden bg-stone-300 select-none">
          {/* Before Image (Bottom Layer) */}
          <img src={BeforeImage} alt={`Before - ${activeTimePoint.label}`} className="absolute inset-0 w-full h-full object-cover" />

          {/* After Image (Top Layer, Clipped) */}
          <motion.div 
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img src={AfterImage} alt={`After - ${activeTimePoint.label}`} className="absolute inset-0 w-full h-full object-cover select-none" style={{minWidth: '100%', minHeight: '100%', objectFit: 'cover'}}/>
          </motion.div>

          {/* Slider Handle */} 
          <motion.div
            className="absolute top-0 bottom-0 w-1.5 bg-rose-500/70 cursor-ew-resize group shadow-md"
            style={{ left: `${sliderPosition}%`, x: '-50%' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }} // Constraints relative to its own position
            dragElastic={0.1}
            onDrag={handleDrag} // More robust dragging may require useDragControls and a wider drag area
          >
            <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 flex items-center justify-center w-8 h-8 bg-rose-600 rounded-full shadow-xl group-hover:scale-110 transition-transform">
              <Clock className="w-4 h-4 text-white transform rotate-90" /> {/* Placeholder icon */}
            </div>
          </motion.div>

          {/* Lighting Effects Overlay (Conceptual) */} 
          {showLightingEffects && (
            <motion.div 
              className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} exit={{ opacity: 0 }}
            >
              {/* Example: conceptual light beams from top */}
              <div className="absolute top-0 left-1/4 w-1/2 h-full bg-gradient-to-b from-rose-300/50 via-transparent to-transparent animate-pulse_slow"></div>
            </motion.div>
          )}

          {/* Microscopic View Toggle & Display */} 
          {showMicroscopicView && (
            <motion.div 
              className="absolute bottom-4 right-4 w-48 h-36 md:w-64 md:h-48 bg-stone-800/90 border-2 border-rose-500 rounded-lg shadow-2xl p-3 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            >
              <img src={MicroscopicImage} alt={`Microscopic view - ${activeTimePoint.label}`} className="w-full h-full object-cover rounded-sm" />
              <p className="text-xs text-stone-200 mt-1 text-center">Follicle Detail ({activeTimePoint.label})</p>
            </motion.div>
          )}
        </div>

        {/* Control Toggles */} 
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8 md:mt-12">
          <button 
            onClick={() => setShowMicroscopicView(!showMicroscopicView)}
            className={`flex items-center px-6 py-3 rounded-full text-sm font-medium transition-colors shadow hover:shadow-md 
                        ${showMicroscopicView ? 'bg-rose-600 text-white' : 'bg-white text-neutral-700 hover:bg-stone-50'}`}
          >
            <ZoomIn className="w-5 h-5 mr-2" />
            {showMicroscopicView ? 'Hide' : 'Show'} Follicle Detail
          </button>
          <button 
            onClick={() => setShowLightingEffects(!showLightingEffects)}
            className={`flex items-center px-6 py-3 rounded-full text-sm font-medium transition-colors shadow hover:shadow-md 
                        ${showLightingEffects ? 'bg-rose-600 text-white' : 'bg-white text-neutral-700 hover:bg-stone-50'}`}
          >
            <Zap className="w-5 h-5 mr-2" />
            {showLightingEffects ? 'Hide' : 'Show'} Light Effect
          </button>
        </div>

      </div>
    </section>
  );
};

export default InteractiveBeforeAfterTool; 