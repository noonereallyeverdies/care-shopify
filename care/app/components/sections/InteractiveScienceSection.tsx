import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { Zap, Waves, Droplet, ChevronDown, CheckCircle, UserCheck, BarChart2, Star } from 'lucide-react';
import { Link } from '@remix-run/react';
import { AnimatedCounter } from '~/components/Shared/AnimatedCounter';

// --- Data --- 
const scienceData = {
  heading: 'how care•atin awakens your follicles',
  studies: [
    {
      icon: Zap,
      label: 'Reactivate',
      description: 'gentle red light boosts energy (atp!) in sleepy follicles, waking them up',
      color: 'rose-500'
    },
    {
      icon: Waves,
      label: 'Oxygenate',
      description: 'precise micro-massage increases nutrient-rich blood flow by 54%* to feed your scalp',
      color: 'blue-500'
    },
    {
      icon: Droplet,
      label: 'Nourish',
      description: 'our smart serum delivers actives directly to the root, not just the hair strand',
      color: 'green-500'
    }
  ],
  results: [
    {
      icon: UserCheck,
      value: 87,
      suffix: '%',
      description: 'saw visible improvement by week 8'
    },
    {
      icon: BarChart2, // Icon for density
      value: 32,
      suffix: '% denser hair',
      description: 'measured in 90 days'
    },
    {
      icon: Droplet, // Icon for shedding (reusing)
      value: 62,
      suffix: '% reduction',
      description: 'in daily shedding'
    },
    {
      icon: Star,
      value: 4.9,
      suffix: '/5 rating',
      description: 'from 10,000+ verified buyers'
    }
  ],
  clinicalDataPlaceholder: 'Dive deep into our 112-person 2023 clinical study: methodology, full results, and the science behind your future hair growth...',
  trichologistQuotePlaceholder: "“Care•atin's multi-modal approach addresses the key factors contributing to common hair thinning.”",
  labImageUrlPlaceholder: '/images/placeholders/lab-background-transparent.png' // Placeholder path
};

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

// --- Components --- 

// Upgraded Follicle Animation Placeholder
const FollicleAnimationPlaceholder = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // Define animation sequences
  const animationSequence = {
    initial: { opacity: 0 },
    animate: isInView ? { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } } : {},
  };

  const bulbVariants = {
    initial: { fill: '#E5E7EB' }, // Initial dull color
    animate: { fill: '#FBCFE8', transition: { duration: 1, delay: 0.5 } }, // Energized color (light pink)
  };

  const lightPulseVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: [1, 1.2, 1], 
      opacity: [0.7, 0, 0.7], 
      transition: { duration: 1.5, repeat: Infinity, repeatDelay: 0.5, ease: 'easeInOut', delay: 0.3 } 
    },
  };

  const shaftVariants = {
    initial: { y: 10, opacity: 0.5 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.7 } },
  };

  return (
    // Keep the motion.div as the single parent
    <motion.div 
      ref={ref} 
      className="relative mx-auto mb-12 h-56 w-56" // Increased size slightly
      variants={animationSequence}
      initial="initial"
      animate="animate"
    >
      <svg 
        viewBox="0 0 100 100" 
        className="h-full w-full"
      >
        {/* Follicle Bulb */}
        <motion.path 
          d="M 40 90 C 30 90, 25 80, 25 70 C 25 55, 40 40, 50 40 C 60 40, 75 55, 75 70 C 75 80, 70 90, 60 90 Z" 
          stroke="#D1D5DB" 
          strokeWidth="1"
          variants={bulbVariants}
        />

        {/* Red Light Pulse Effect */}
        <motion.circle 
          cx="50" 
          cy="70" 
          r="25" 
          fill="rgba(236, 72, 153, 0.4)"
          variants={lightPulseVariants}
        />

        {/* Hair Shaft */}
        <motion.line 
          x1="50" 
          y1="10" 
          x2="50" 
          y2="40" 
          stroke="#6B7280" 
          strokeWidth="2.5" 
          strokeLinecap="round"
          variants={shaftVariants}
        />
      </svg>

      {/* Label */}
      <motion.p 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-neutral-500"
        variants={{ initial: { opacity: 0 }, animate: { opacity: 1, transition: { delay: 1 } } }}
      >
        Follicle Reactivation
      </motion.p>
    </motion.div>
  );
}

// Main Section Component
export function InteractiveScienceSection() {
  const [isClinicalDataOpen, setIsClinicalDataOpen] = useState(false);
  const sectionRef = useRef(null);
  const studiesRef = useRef(null);
  const resultsRef = useRef(null);
  const quoteRef = useRef(null);

  const { scrollYProgress } = useScroll({ 
      target: sectionRef,
      offset: ["start end", "end start"] 
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const studiesInView = useInView(studiesRef, { once: true, amount: 0.2 });
  const resultsInView = useInView(resultsRef, { once: true, amount: 0.2 });
  const quoteInView = useInView(quoteRef, { once: true, amount: 0.5 });

  return (
    <section ref={sectionRef} className="section-spacing bg-gradient-to-b from-white via-neutral-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Main Heading - apply parallax style */}
        <motion.h2 
          className="brand-heading text-3xl md:text-4xl lg:text-5xl text-center mb-4 md:mb-8"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          style={{ y: headingY }} // Apply parallax transform
        >
          {scienceData.heading}
        </motion.h2>
            {/* Disruptive Surprise Copy */}
             <motion.p 
              className="text-lg md:text-xl text-center text-neutral-600 mb-16 md:mb-20 max-w-2xl mx-auto font-light"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.1 }}
            >
              your scalp's not lazy. <span className="font-medium text-primary">it's just misunderstood.</span> here's how we speak its language:
            </motion.p>

        {/* Section 1: What Studies Show (Vertical Infographic) */}
        <motion.div 
          ref={studiesRef}
          className="mb-20 md:mb-24 max-w-3xl mx-auto"
          variants={staggerContainer}
              initial="hidden"
          animate={studiesInView ? "visible" : "hidden"}
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-neutral-800">
            The 3 Pillars of Hair Activation 
          </h3>
          {/* Simplified Follicle Animation */}
          <FollicleAnimationPlaceholder />

          <div className="space-y-8">
            {scienceData.studies.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={index} 
                  className="flex items-start gap-4 md:gap-6 p-4 bg-white rounded-lg shadow-sm border border-neutral-100"
                  variants={fadeInUp} // Use fadeInUp for each item
                >
                  <div className={`mt-1 flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-${item.color}/10 text-${item.color}`}>
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className={`text-lg font-semibold mb-1 text-${item.color}`}> {/* Use color here */} 
                      {item.label}
                    </h4>
                    <p className="text-sm md:text-base text-neutral-600">
                      {item.description}
                </p>
              </div>
                </motion.div>
              );
            })}
            <p className="text-xs text-center text-neutral-500 pt-2">*Based on 112-person 2023 clinical study results.</p>
          </div>
        </motion.div>
        
        {/* Section 2: Results You Can Measure */}
        <motion.div 
          ref={resultsRef}
          className="mb-20 md:mb-24"
          variants={staggerContainer}
          initial="hidden"
          animate={resultsInView ? "visible" : "hidden"}
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-neutral-800">
            Real Growth, Real Numbers
            </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {scienceData.results.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index} 
                  className="text-center p-4 bg-white rounded-lg shadow-sm border border-neutral-100"
                  variants={fadeInUp}
                >
                  <Icon size={28} className={`mx-auto mb-3 text-rose-500`} strokeWidth={1.5} />
                  <div className="text-2xl md:text-3xl font-bold text-rose-600 tabular-nums mb-1">
                    <AnimatedCounter 
                      targetValue={item.value} 
                      suffix={item.suffix}
                      duration={1.5}
                    />
                  </div>
                  <p className="text-xs md:text-sm text-neutral-600">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
      </motion.div>
      
        {/* Section 3: Trichologist Quote (Placeholder) */}
        <motion.div 
          ref={quoteRef}
          className="relative mb-20 md:mb-24 p-8 md:p-12 rounded-lg overflow-hidden text-center bg-neutral-800 text-white max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={quoteInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="relative z-10">
            <p className="text-xl md:text-2xl italic mb-4 font-light">
              {scienceData.trichologistQuotePlaceholder}
            </p>
            <p className="text-sm uppercase tracking-wider opacity-80">
              – Dr. Emily Carter, Consulting Trichologist for Care•tin
            </p>
          </div>
        </motion.div>

        {/* Section 4: Clinical Data Dropdown */}
        <div className="text-center max-w-3xl mx-auto">
          <button 
            className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-300"
            onClick={() => setIsClinicalDataOpen(!isClinicalDataOpen)}
            aria-expanded={isClinicalDataOpen}
            aria-controls="clinical-data-content"
          >
            Explore the Clinical Data
            <ChevronDown 
              size={16} 
              className={`transition-transform duration-300 ${isClinicalDataOpen ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
          
          <AnimatePresence>
            {isClinicalDataOpen && (
              <motion.div
                id="clinical-data-content"
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: '1.5rem' }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden text-left border-t border-neutral-200 pt-6"
              >
                <div className="prose prose-sm md:prose-base max-w-none text-neutral-600">
                  {/* Using prose for basic formatting of potential detailed text */}
                  <p>{scienceData.clinicalDataPlaceholder}</p>
                  {/* Add more detailed content here */}
                   <p className="mt-4">We believe in transparency. You deserve to see the proof behind the promises.</p> 
                  <Link to="/pages/science" className="text-rose-600 hover:underline font-medium">
                    Read the full study paper here
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
} 