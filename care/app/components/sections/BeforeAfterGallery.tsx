import { useState } from 'react';
import { motion } from 'framer-motion';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

export function BeforeAfterGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      name: "Sarah",
      age: 42,
      issue: "Thinning at crown",
      duration: "3 months",
      beforeImage: "/images/before-after/sarah-before.jpg",
      afterImage: "/images/before-after/sarah-after.jpg",
      quote: "I was skeptical at first, but after consistent use, I've seen dramatic improvement in thickness around my crown area."
    },
    {
      name: "Michael",
      age: 38,
      issue: "Receding hairline",
      duration: "4 months",
      beforeImage: "/images/before-after/michael-before.jpg",
      afterImage: "/images/before-after/michael-after.jpg",
      quote: "The most noticeable change has been the regrowth along my temples. My hairline looks much fuller now."
    },
    {
      name: "Emma",
      age: 35,
      issue: "Post-pregnancy shedding",
      duration: "2 months",
      beforeImage: "/images/before-after/emma-before.jpg",
      afterImage: "/images/before-after/emma-after.jpg",
      quote: "After having my baby, I lost so much hair. care•atin helped reduce the shedding and I'm seeing new growth already."
    },
    {
      name: "David",
      age: 45,
      issue: "Overall thinning",
      duration: "5 months",
      beforeImage: "/images/before-after/david-before.jpg",
      afterImage: "/images/before-after/david-after.jpg",
      quote: "My scalp used to be visible under bright lights. Now my hair feels and looks much denser."
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
            Consistent use reveals visibly thicker, healthier hair. Drag the slider to see the difference care•atin makes.
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
                alt={`${active.name} before using care•atin`}
                style={{objectFit: 'cover'}} 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://cdn.shopify.com/s/files/1/0XXX/XXXX/files/placeholder-image.png?v=YYYYYY"; // Replace with your actual placeholder
                  target.onerror = null; 
                }}
              />
            )}
            itemTwo={(
              <ReactCompareSliderImage 
                src={active.afterImage} 
                alt={`${active.name} after using care•atin`}
                style={{objectFit: 'cover'}} 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://cdn.shopify.com/s/files/1/0XXX/XXXX/files/placeholder-image.png?v=YYYYYY"; // Replace with your actual placeholder
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
      </div>
    </section>
  );
} 