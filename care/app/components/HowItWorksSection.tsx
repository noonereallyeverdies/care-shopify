import React, { useRef } from 'react';
// Lucide icons removed as we'll use custom animated placeholders
import { motion } from 'framer-motion'; 

// --- Placeholder Animated Icons --- 

// Placeholder 1: Red Light Simulation (Pulsing circle)
const RedLightIconAnimation = () => (
  <motion.svg viewBox="0 0 50 50" className="h-10 w-10 text-rose-500" fill="currentColor">
    <motion.circle 
      cx="25" 
      cy="25" 
      r="15"
      initial={{ scale: 0.9, opacity: 0.7 }}
      animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    />
    {/* Optional static outer ring */}
    <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
  </motion.svg>
);

// Placeholder 2: Massage Simulation (Waving lines)
const MassageIconAnimation = () => (
  <motion.svg viewBox="0 0 50 50" className="h-10 w-10 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.5">
    {[0, 1, 2].map(i => (
      <motion.path 
        key={i}
        d="M 5 15 Q 15 5, 25 15 T 45 15"
        initial={{ y: i * 5 }}
        animate={{ x: [-2, 2, -2] }}
        transition={{ delay: i * 0.1, duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
    ))}
  </motion.svg>
);

// Placeholder 3: Oil Delivery Simulation (Dripping)
const OilDropIconAnimation = () => (
  <motion.svg viewBox="0 0 50 50" className="h-10 w-10 text-green-500" fill="currentColor">
    <motion.path 
      d="M 25 5 C 20 15, 20 25, 25 35 S 30 15, 25 5 Z"
      initial={{ y: -15, opacity: 0 }}
      animate={{ y: [0, 15], opacity: [1, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeIn", delay: 0.5 }}
    />
    {/* Static droplet at bottom */}
    <path d="M 25 40 C 22 40, 20 43, 25 48 S 28 40, 25 40 Z" opacity="0.5" />
  </motion.svg>
);

// Map icons to data
const iconComponents = [
  RedLightIconAnimation,
  MassageIconAnimation,
  OilDropIconAnimation
];

// --- Data --- 
const howItWorksData = {
  heading: 'how photonic touch™ revitalizes your hair',
  mechanisms: [
    { 
      icon: iconComponents[0], 
      title: 'red light therapy', 
      description: 'clinically proven wavelengths energize dormant follicles at a cellular level, boosting their natural growth cycle.', 
      subtitle: 'result: awakens sleeping follicles',
      color: 'rose-500' 
    },
    { 
      icon: iconComponents[1], 
      title: 'biomimetic massage', 
      description: 'gentle pulsations increase scalp circulation by 54%*, enhancing nutrient delivery to the roots.', 
      subtitle: 'result: feeds roots essential nutrients',
      color: 'blue-500' 
    },
    { 
      icon: iconComponents[2], 
      title: 'nano-oil delivery', 
      description: 'our patented system infuses active ingredients directly into the follicle, bypassing surface oils.', 
      subtitle: 'result: targeted treatment, zero waste',
      color: 'green-500' 
    }
  ],
};
// NOTE: Add full descriptions back if needed

// Animation variants for items entering view
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1, // Stagger animation slightly
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

// TODO: Implement soft vignette effect, potentially via CSS pseudo-element or radial gradient
// Example CSS for vignette:
// .vignette-effect::before {
//   content: '';
//   position: absolute;
//   top: 0; left: 0; right: 0; bottom: 0;
//   background: radial-gradient(circle at center, rgba(255,255,255,0) 50%, rgba(245,245,245, 0.8) 90%);
//   pointer-events: none; 
//   z-index: 1; // Ensure it's above bg but below content
// }

export function HowItWorksSection() {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    // Apply cool gradient background
    <section className="section-spacing bg-gradient-to-b from-blue-50 via-white to-white relative overflow-hidden">
      {/* Optional Vignette Element - uncomment and style if using pseudo-element approach */}
      {/* <div className="absolute inset-0 vignette-background-element z-0"></div> */} 
      
      <div className="container mx-auto relative z-10"> {/* Content needs higher z-index than vignette */}
        {/* Section Heading */}
        <h2 className="brand-heading text-3xl md:text-4xl text-center mb-12 md:mb-16">
          {howItWorksData.heading}
        </h2>

        {/* Outer container to define drag constraints */}
        <div ref={constraintsRef} className="overflow-hidden">
          {/* Draggable container for horizontal scroll/swipe */}
          {/* Add scroll-snap for desktop */}
          <motion.div 
            className="flex gap-6 md:gap-8 pb-4 cursor-grab active:cursor-grabbing md:justify-center scroll-snap-x mandatory overflow-x-auto"
            drag="x"
            dragConstraints={constraintsRef}
            // Optional: Add drag elastic effect
            // dragElastic={0.1} 
          >
            {howItWorksData.mechanisms.map((item, index) => {
              // Use the assigned animated icon component
              const AnimatedIconComponent = item.icon;
              return (
                // Each mechanism card
                // Set fixed width for horizontal layout, allow flex-shrink: 0
                <motion.div 
                  key={index} 
                  className="flex flex-col items-center text-center w-64 sm:w-72 md:w-1/3 flex-shrink-0 scroll-snap-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-neutral-100 shadow-sm"
                  variants={itemVariants}
                  initial="hidden"
                  // Animate when the section itself scrolls into view (adjust as needed)
                  // Or animate immediately: animate="visible"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% visible
                  custom={index} // Pass index for staggered delay
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.08)' // Subtle glow/lift effect
                  }} 
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }} // Springy hover effect
                >
                  {/* Animated Icon Placeholder */}
                  <div
                    className={`relative mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-${item.color}/30 bg-${item.color}/10 p-3`}
                  >
                    {/* Render the animated icon component */}
                    <AnimatedIconComponent />
                  </div>

                  {/* Mechanism Title */}
                  <h3 className={`brand-heading text-xl md:text-2xl mb-2 font-medium text-${item.color} normal-case`}>
                    {item.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="brand-body text-sm font-semibold text-neutral-700 mb-3">
                    {item.subtitle} 
                  </p>

                  {/* Mechanism Description */}
                  <p className="brand-body text-sm md:text-base text-secondary-content">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 