import React from 'react';
import {motion, useInView} from 'framer-motion';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

// Removed ClientOnly and SliderContent as they are no longer needed for a static image.
// Removed react-before-after-slider-component logic.

export function BeforeAfterSliderSection() {
  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Placeholder image paths - replace with your actual image URLs
  const beforeImageUrl = '/images/hair-before-sample.jpg';
  const afterImageUrl = '/images/hair-after-sample.jpg';

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-32 bg-cream-50 overflow-hidden"
    >
      <motion.div 
        className="container mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <p className="text-sm uppercase tracking-wider text-rose-500 mb-3 font-medium">
          Visible Changes
        </p>
        <h2 className="text-4xl md:text-5xl font-light text-charcoal mb-12 md:mb-16 leading-tight">
          Witness the Transformation
        </h2>
        
        <div 
          className="max-w-2xl lg:max-w-3xl mx-auto relative rounded-xl overflow-hidden shadow-xl border border-neutral-200/70"
          style={{aspectRatio: '16/10'}} // Or your images' aspect ratio
        >
          <ReactCompareSlider
            itemOne={<ReactCompareSliderImage src={beforeImageUrl} alt="Hair before Care•atin treatment" />}
            itemTwo={<ReactCompareSliderImage src={afterImageUrl} alt="Hair after Care•atin treatment" />}
            style={{
              width: '100%',
              height: '100%',
            }}
            handle={(
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
                <div style={{ width: '8px', height: '20px', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '2px' }} />
              </div>
            )}
          />
        </div>

        <motion.div 
          className="mt-8 text-sm text-neutral-600 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }} // Delay to appear after slider
        >
          <p>
            Drag the slider to see the difference. <br className="sm:hidden" /> 
            Results shown after consistent use as directed.
          </p>
        </motion.div>

      </motion.div>
    </section>
  );
}
