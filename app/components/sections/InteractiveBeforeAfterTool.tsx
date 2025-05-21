import React, { useState, useMemo } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { ZoomIn, Zap, Eye, Clock } from 'lucide-react'; // Placeholder icons

interface TimePoint {
  id: string;
  label: string; // e.g., "Week 0", "Week 4"
  description: string; // Added description field
  beforeImageSrc: string;
  afterImageSrc: string;
  microscopicImageSrc: string;
}

// Placeholder data - replace with actual image paths
const timePointsData: TimePoint[] = [
  {
    id: 'w0',
    label: 'initial',
    description: "your starting point. follicles in dormant phase with diminished circulation and reduced activity.",
    beforeImageSrc: '/placeholders/before-after/before_initial.jpg',
    afterImageSrc: '/placeholders/before-after/after_w0_placeholder.jpg',
    microscopicImageSrc: '/placeholders/before-after/micro_w0.jpg',
  },
  {
    id: 'w4',
    label: 'week 4',
    description: "cellular awakening begins. reduced shedding as follicles respond to light energy and circulation improves.",
    beforeImageSrc: '/placeholders/before-after/before_initial.jpg',
    afterImageSrc: '/placeholders/before-after/after_w4.jpg',
    microscopicImageSrc: '/placeholders/before-after/micro_w4.jpg',
  },
  {
    id: 'w8',
    label: 'week 8',
    description: "emergence phase. new growth appears as dormant follicles reactivate. improved density and texture becomes noticeable.",
    beforeImageSrc: '/placeholders/before-after/before_initial.jpg',
    afterImageSrc: '/placeholders/before-after/after_w8.jpg',
    microscopicImageSrc: '/placeholders/before-after/micro_w8.jpg',
  },
  {
    id: 'w12',
    label: 'week 12',
    description: "complete transformation. significantly improved density, texture, and luster as follicles reach optimal functioning.",
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
    <section className="py-20 md:py-32 bg-stone-50 text-neutral-800 font-serif overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-neutral-900 mb-6 lowercase tracking-wide">
            see the visual results
          </h2>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto leading-relaxed font-light">
            follow the subtle evolution of hair wellness through precise light technology. 
            clinically documented progression over twelve weeks.
          </p>
        </div>

        {/* Time Point Selection */} 
        <div className="flex justify-center space-x-6 md:space-x-10 mb-16">
          {timePointsData.map((tp, index) => (
            <button
              key={tp.id}
              onClick={() => setCurrentTimePointIndex(index)}
              className={`px-4 py-1 md:px-5 md:py-2 border-b-2 text-sm md:text-base font-light transition-all duration-500 tracking-wider lowercase
                          ${currentTimePointIndex === index 
                            ? 'border-rose-500 text-neutral-900' 
                            : 'border-transparent text-neutral-500 hover:text-neutral-800'}`}
            >
              {tp.label}
            </button>
          ))}
        </div>

        {/* Image Comparison Area */} 
        <div className="relative w-full max-w-4xl mx-auto aspect-[5/3] shadow-lg overflow-hidden bg-white border border-stone-200 select-none mb-12">
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
            className="absolute top-0 bottom-0 w-px bg-white/90 cursor-ew-resize group backdrop-blur-sm"
            style={{ left: `${sliderPosition}%`, x: '-50%' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDrag={handleDrag}
          >
            <div className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border border-white/80 backdrop-blur-sm flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 rounded-full border-t border-l border-white/60"
                ></motion.div>
              </div>
            </div>
          </motion.div>

          {/* Lighting Effects Overlay (Refined) */} 
          {showLightingEffects && (
            <motion.div 
              className="absolute inset-0 pointer-events-none mix-blend-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            >
              {/* Sophisticated light beam effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-1/2 h-full">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-rose-100/30 via-rose-300/20 to-transparent"></div>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <motion.div 
                      key={index}
                      className="absolute top-0 left-1/2 w-px h-full bg-white/40"
                      animate={{ 
                        scaleY: [0.7, 1, 0.7],
                        x: [-(10 * index), 0, 10 * index],
                        opacity: [0.2, 0.8, 0.2]
                      }}
                      transition={{ 
                        duration: 3 + (index % 3),
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                        delay: index * 0.3
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Microscopic View Toggle & Display */} 
          {showMicroscopicView && (
            <motion.div 
              className="absolute bottom-6 right-6 w-52 h-40 md:w-72 md:h-56 bg-white border border-neutral-200 rounded-none shadow-lg p-2 backdrop-blur-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            >
              <img src={MicroscopicImage} alt={`Microscopic view - ${activeTimePoint.label}`} className="w-full h-full object-cover" />
              
              <div className="absolute inset-0 pointer-events-none">
                {/* Scientific measurement grid */}
                <div className="w-full h-full grid grid-cols-8 grid-rows-6">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="border border-rose-200/10"></div>
                  ))}
                </div>
                
                {/* Measurement label */}
                <div className="absolute bottom-2 left-2 bg-white/80 px-2 py-0.5 text-xs font-light text-neutral-600 tracking-wider lowercase">
                  follicle depth: {`${activeTimePoint.id === 'w0' ? '0.8' : activeTimePoint.id === 'w4' ? '1.2' : activeTimePoint.id === 'w8' ? '1.6' : '2.0'}`}mm
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Active TimePoint Description */} 
        {activeTimePoint.description && (
          <motion.div 
            key={activeTimePoint.id}
            className="text-center mt-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <p className="text-neutral-700 text-base leading-relaxed font-light tracking-wide">{activeTimePoint.description}</p>
          </motion.div>
        )}

        {/* Control Toggles - Refined */} 
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-16 mt-16">
          <button 
            onClick={() => setShowMicroscopicView(!showMicroscopicView)}
            className={`flex items-center px-4 py-2 text-sm font-light tracking-wider lowercase transition-all duration-300 border-b ${showMicroscopicView ? 'border-rose-500 text-neutral-800' : 'border-transparent text-neutral-500 hover:text-neutral-800'}`}
          >
            <ZoomIn className="w-4 h-4 mr-3 opacity-70" />
            follicle detail
          </button>
          <button 
            onClick={() => setShowLightingEffects(!showLightingEffects)}
            className={`flex items-center px-4 py-2 text-sm font-light tracking-wider lowercase transition-all duration-300 border-b ${showLightingEffects ? 'border-rose-500 text-neutral-800' : 'border-transparent text-neutral-500 hover:text-neutral-800'}`}
          >
            <Zap className="w-4 h-4 mr-3 opacity-70" />
            light simulation
          </button>
        </div>

      </div>
    </section>
  );
};

export default InteractiveBeforeAfterTool; 