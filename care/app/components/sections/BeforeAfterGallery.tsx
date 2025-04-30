import { useState } from 'react';
import { motion } from 'framer-motion';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

export function BeforeAfterGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      name: "Sarah",
      age: 34,
      issue: "Under-eye bags and uneven skin",
      duration: "2 months",
      beforeImage: "/images/before-after/before-after-1-before.png",
      afterImage: "/images/before-after/before-after-1-after.png",
      quote: "The treatment has significantly reduced my under-eye bags and improved my skin's appearance."
    },
    {
      name: "Jennifer",
      age: 41,
      issue: "Fine lines and wrinkles",
      duration: "3 months",
      beforeImage: "/images/before-after/before-after-2-before.png",
      afterImage: "/images/before-after/before-after-2-after.png",
      quote: "I've noticed a dramatic reduction in my fine lines and wrinkles, especially around my eyes and forehead."
    },
    {
      name: "Lisa",
      age: 45,
      issue: "Sagging skin and volume loss",
      duration: "3 months",
      beforeImage: "/images/before-after/before-after-3-before.png",
      afterImage: "/images/before-after/before-after-3-after.png",
      quote: "The treatment has helped restore volume to my face and improved my skin's firmness and elasticity."
    }
  ];

  const active = testimonials[activeIndex];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, delay: 0.2 }
    }
  };
  
  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, delay: 0.4 }
    }
  };
  
  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, delay: 0.4 }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-neutral-50 to-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-tight">
            experience the transformation
          </h2>
          <p className="text-neutral-600 max-w-xl mx-auto">
            Consistent treatment reveals visibly smoother, younger-looking skin. Drag the slider to see the difference.
          </p>
        </motion.div>
        
        <motion.div 
          className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg border border-neutral-100"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ReactCompareSlider
            itemOne={(
              <ReactCompareSliderImage 
                src={active.beforeImage} 
                alt={`${active.name} before treatment`}
                style={{objectFit: 'cover'}} 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/placeholder-image.png"; // Generic placeholder
                  target.onerror = null; 
                }}
              />
            )}
            itemTwo={(
              <ReactCompareSliderImage 
                src={active.afterImage} 
                alt={`${active.name} after treatment`}
                style={{objectFit: 'cover'}} 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/placeholder-image.png"; // Generic placeholder
                  target.onerror = null; 
                }}
              />
            )}
            style={{
              width: '100%',
              aspectRatio: '16 / 10', // Adjust aspect ratio as needed
              cursor: 'ew-resize',
            }}
            handle={(
              <div style={{ width: '4px', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(4px)' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40px', height: '40px', border: '2px solid rgba(255, 255, 255, 0.7)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Double arrow icon */}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'white' }}>
                    <path d="M6 4L2 8L6 12M10 4L14 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            )}
          />
        </motion.div>
        
        {/* Testimonial selection */}
        <div className="mt-8 flex justify-center space-x-4">
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-rose-500 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`View ${testimonial.name}'s before and after`}
            />
          ))}
        </div>
        
        {/* Testimonial quote */}
        <motion.div
          className="mt-6 max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-neutral-100"
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-gray-700 italic mb-3">"{active.quote}"</p>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{active.name}, {active.age} - {active.issue}</span>
            <span>After {active.duration} of treatment</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 