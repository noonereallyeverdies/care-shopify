import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '~/components/ui/buttons/Button'; // Ensure button path is correct

// Remove unused animation components
// const FillAnimation = () => { ... };
// const MassageAnimation = () => { ... };

export function SelfCareRitualSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });

  const steps = [
    {
      number: '01',
      title: 'fill', // Updated title
      description: '**fill** the device with your favorite hair oil or serum',
      image: '/images/self-care-ritual/step-1.JPG',
    },
    {
      number: '02',
      title: 'massage', // Updated title
      description: '**massage** gently in circular motions across scalp',
      image: '/images/self-care-ritual/step-2.png',
    },
    {
      number: '03',
      title: 'relax', // Updated title
      description: '**relax** while red light and massage activate recovery',
      image: '/images/self-care-ritual/step-3.JPG',
    },
  ];

  // Helper to render description with bold tags
  const renderDescription = (desc: string) => {
    const parts = desc.split(/(\*\*.*\*\*)/g); // Split by bold markdown
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-medium text-inherit">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  // Define animation variants for number and text overlay
  const numberVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: 0.3, ease: "easeOut" } // Delay after card appears
    }
  };

  const textOverlayVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: 0.4, ease: "easeOut" } // Slightly more delay
    }
  };

  return (
    <section className="py-16 md:py-24 bg-neutral-50 text-foreground overflow-hidden">
      <div className="container mx-auto px-0 md:px-6">
        <motion.div
          className="text-center mb-12 md:mb-16 px-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-4 lowercase">
             🧴 your 3-step self-care ritual
          </h2>
          {/* Optional: Add a subtitle if needed */}
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollRef} 
          className="relative flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-6 md:gap-8 px-6 md:px-0 pb-8 no-scrollbar"
          style={{ scrollPaddingLeft: '1.5rem' }} // Ensures padding on snap
        >
          {steps.map((step, index) => {
            // Simple parallax effect based on scroll position
            const imageY = useTransform(scrollXProgress, [0, 1], ['0%', '-10%']); 

            return (
              <motion.div
                key={index}
                className="flex-shrink-0 w-[85vw] md:w-[40vw] lg:w-[30vw] snap-start first:ml-0 last:mr-0 md:first:ml-0 md:last:mr-0"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ root: scrollRef, amount: 0.4, once: false }} // Adjusted amount slightly
                transition={{ duration: 0.5, delay: 0.1 }}
                 whileHover={{ 
                   scale: 1.02, // Slight scale for glow/lift
                   boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)' // Enhance shadow for glow
                 }}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-lg bg-neutral-200">
                   {/* Image with Parallax */}
                   <motion.img
                      src={step.image}
                      alt={`${step.title}`}
                      className="absolute inset-0 w-full h-[110%] object-cover" // Slightly larger height for parallax
                      style={{ y: imageY }} 
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholders/placeholder.svg';
                        target.onerror = null;
                      }}
                    />
                    {/* Step Number Overlay - Animate Reveal */}
                    <motion.div 
                      className="absolute bottom-4 right-4 text-[8rem] leading-none font-bold text-white/20 select-none z-10"
                      variants={numberVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ root: scrollRef, amount: 0.4, once: false }} // Use same viewport as card
                    >
                      {step.number}
                    </motion.div>
                    {/* Text Overlay - Animate Reveal */}
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 p-6 pt-12 bg-gradient-to-t from-black/60 via-black/40 to-transparent z-20"
                      variants={textOverlayVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ root: scrollRef, amount: 0.4, once: false }} // Use same viewport as card
                    >
                       <p className="text-lg md:text-xl text-white/90 lowercase">
                        {renderDescription(step.description)}
                       </p>
                    </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonial & CTA */}
        <motion.div
          className="mt-12 md:mt-16 text-center px-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-neutral-700 max-w-xl mx-auto italic mb-4 normal-case">
            "it's become my evening ritual. just 5 minutes and both my hair and mindset feel stronger."
          </p>
          <p className="text-neutral-500 text-sm mb-8 lowercase">
             — mia
          </p>
          <Button variant="primary" size="lg" className="w-full sm:w-auto">
             start your ritual for $89 → limited time
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
