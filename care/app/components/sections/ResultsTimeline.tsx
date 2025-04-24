import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, Leaf, Sparkles, Heart } from 'lucide-react';

// Simple debounce function
function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise(resolve => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        timeoutId = null; // Clear the timeout ID after execution
        resolve(func(...args));
      }, waitFor);
    });
}

// Define the timeline data based on our brainstorm
const timelineTabs = [
  {
    tab: 'week 1',
    title: 'week 1: awakening',
    icon: Clock,
    image: {
      src: '/images/week-1.png',
      alt: 'woman with short hair using red light therapy',
    },
    points: [
      'your scalp begins to respond to red light therapy',
      'skin cells absorb light energy and increase activity',
      'improved blood circulation delivers more nutrients',
      'you might notice a healthy scalp tingle - that\'s cellular awakening',
    ],
    benefit: 'Cellular awakening begins immediately, halting the cycle of loss before it continues.',
    statistic: '87% of users felt a stimulating sensation during their first week'
  },
  {
    tab: 'week 4',
    title: 'week 4: renewal',
    icon: Leaf,
    image: {
      src: '/images/week-4.png',
      alt: 'woman with slightly longer hair showing improved thickness',
    },
    points: [
      'reduced hair shedding becomes noticeable',
      'scalp health improves with less irritation and flaking',
      'hair follicles shift toward the anagen (growth) phase',
      'existing hair appears healthier with more shine',
    ],
    benefit: 'Less shedding means your confidence stops washing down the drain.',
    statistic: 'In surveys, users reported up to 74% reduction in daily shedding by week 4'
  },
  {
    tab: 'week 8',
    title: 'week 8: transformation',
    icon: Sparkles,
    image: {
      src: '/images/week-8.png',
      alt: 'woman with visibly thicker hair showing growth progress',
    },
    points: [
      'new baby hairs become visible along hairline and part',
      'hair density increases for a fuller appearance',
      'hair texture becomes smoother and more manageable',
      'friends and family may begin to notice your hair transformation',
    ],
    benefit: 'Others begin to notice what you\'ve already been experiencing: your transformation.',
    statistic: '82% of users received compliments on their hair by week 8'
  },
  {
    tab: 'week 12',
    title: 'week 12: flourishing',
    icon: Heart,
    image: {
      src: '/images/week-12.png',
      alt: 'woman with full, healthy hair showing complete transformation',
    },
    points: [
      'significant improvement in hair volume and coverage',
      'continued growth of new, stronger hair strands',
      'noticeably reduced thinning areas with more fullness',
      'increased confidence from your visible hair transformation',
    ],
    benefit: 'Reclaim the hair you once had, and discover a confidence you may have forgotten.',
    statistic: 'In user surveys, 93% reported feeling more confident in social situations'
  },
];

// Component to observe intersection for each content section
// Add types for props
interface TimelineSectionObserverProps {
  index: number;
  setActiveIndex: (index: number) => void;
}

function TimelineSectionObserver({ index, setActiveIndex }: TimelineSectionObserverProps) {
  const { ref, inView } = useInView({
    threshold: 0.6, // Increased threshold for more reliable triggering
    rootMargin: '-10% 0px -10% 0px', // Add margins to improve detection
    triggerOnce: false, // Ensure it triggers every time it comes into view
  });

  useEffect(() => {
    // Only update when this section comes into view
    if (inView) {
      setActiveIndex(index);
    }
  }, [inView, index, setActiveIndex]);

  // Render an invisible div to act as the trigger
  return <div ref={ref} style={{ position: 'absolute', height: '100%', top: 0, left: 0, width: '100%', pointerEvents: 'none' }} data-index={index} />;
}

export function ResultsTimeline() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const progressControls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null); // Ref for the main section
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Hover states for tab highlights
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);

  // Set up refs for all content sections
  useEffect(() => {
    contentRefs.current = contentRefs.current.slice(0, timelineTabs.length);
  }, []);

  // Update progress bar animation whenever activeTabIndex changes
  useEffect(() => {
    const totalItems = timelineTabs.length;
    if (totalItems > 1) {
      const percentage = (activeTabIndex / (totalItems - 1)) * 100;
      progressControls.start({ height: `${percentage}%` }, { duration: 0.3 });
    }
  }, [activeTabIndex, progressControls]);

  // Handler for direct tab clicks with improved scrolling behavior
  const handleTabClick = useCallback((index: number) => {
    setActiveTabIndex(index);
    
    // Scroll to the selected content section when clicking on tab
    if (contentRefs.current[index]) {
      contentRefs.current[index]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-20 lg:py-24 bg-contrast relative section-spacing"
    >
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 text-center mb-4 tracking-tight brand-heading">
            your 90-day transformation
          </h2>
          <p className="text-base md:text-lg text-center text-neutral-700 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed brand-body">
            follow your journey as care<span className="brand-dot">•</span>atin progressively revitalizes your hair with clinically-proven red light therapy
          </p>
          
          {/* Loss aversion callout */}
          <div className="inline-block mt-4 bg-rose-50 border border-rose-200 rounded-lg px-4 py-2 sm:px-6 sm:py-3">
            <p className="text-sm sm:text-base text-rose-600 font-medium">
              Every day without starting is another day delayed on your journey to fuller hair
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start relative">
          {/* Left Column: Sticky Navigation */}
          <div className="md:col-span-3 md:sticky md:top-24 h-fit mb-6 md:mb-0">
            <nav className="relative flex md:flex-col flex-row overflow-x-auto whitespace-nowrap pb-2 md:pb-0 -mx-4 px-4 space-x-2 md:space-x-0 md:space-y-1 py-2 md:pl-8 md:pr-4 scrollbar-hide" aria-label="Timeline Stages">
              {/* Static Background Line */}
              <div className="absolute left-[22px] top-0 bottom-0 w-[3px] bg-neutral-200 rounded-full hidden md:block"></div>

              {/* Animated Progress Line */}
              <motion.div
                className="absolute left-[22px] top-0 w-[3px] bg-rose-500 rounded-full z-10 hidden md:block"
                style={{ height: '0%' }}
                animate={progressControls}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />

              {/* Timeline Tabs */}
              {timelineTabs.map((tab, index) => {
                const Icon = tab.icon;
                return (
                  <motion.button 
                    key={tab.title}
                    onClick={() => handleTabClick(index)}
                    onMouseEnter={() => setHoveredTab(index)}
                    onMouseLeave={() => setHoveredTab(null)}
                    className={`relative md:w-full text-left px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-md text-sm md:text-base transition-colors duration-200 ease-in-out z-20 flex-shrink-0 flex items-center gap-2
                      ${activeTabIndex === index
                        ? 'text-white md:text-neutral-900 bg-rose-500 md:bg-transparent'
                        : 'text-neutral-600 md:text-neutral-400 bg-neutral-100 md:bg-transparent hover:bg-neutral-200 md:hover:bg-transparent'
                      }
                    `}
                    aria-selected={activeTabIndex === index}
                    tabIndex={activeTabIndex === index ? 0 : -1}
                    role="tab"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`hidden md:flex h-6 w-6 items-center justify-center rounded-full transition-colors ${activeTabIndex === index || hoveredTab === index ? 'bg-rose-100 text-rose-600' : 'bg-neutral-200 text-neutral-500'}`}>
                      <Icon size={14} />
                    </div>
                    <span className={`md:ml-2 transition-all ${activeTabIndex === index || hoveredTab === index ? 'text-rose-500 font-medium' : ''}`}>{tab.tab}</span>
                    {(activeTabIndex === index || hoveredTab === index) && (
                      <motion.div 
                        className="absolute -right-2 -top-2 h-4 w-4 bg-rose-500 rounded-full hidden md:block"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>
          </div>

          {/* Right Column: Content Sections */}
          <div className="md:col-span-9 mt-6 md:mt-0 relative">
            {timelineTabs.map((tab, index) => (
              <div 
                key={tab.title} 
                className="relative group"
                style={{ 
                  minHeight: '60vh',
                  height: 'auto',
                  scrollMarginTop: '100px'
                }}
                ref={el => contentRefs.current[index] = el}
              >
                <TimelineSectionObserver index={index} setActiveIndex={setActiveTabIndex} />
                <motion.div 
                  className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  {/* Image Column */}
                  <motion.div 
                    className="w-full md:w-5/12 flex-shrink-0 overflow-hidden rounded-lg shadow-sm order-1 md:order-2"
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <img 
                      src={tab.image.src} 
                      alt={tab.image.alt}
                      className="w-full h-auto object-cover aspect-square"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://cdn.shopify.com/s/files/1/0XXX/XXXX/files/placeholder-image.png?v=YYYYYY" || '/images/placeholder-fallback.png'; 
                        target.onerror = null;
                      }}
                      loading="lazy"
                    />
                  </motion.div>

                  {/* Text Content Column */}
                  <div className="w-full md:w-7/12 order-2 md:order-1">
                    <motion.h3 
                      className="text-2xl md:text-3xl font-light text-neutral-800 mb-3 md:mb-4 tracking-tight brand-heading"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      {tab.title}
                    </motion.h3>
                    
                    <ul className="list-none space-y-2 mb-4 md:mb-5">
                      {tab.points.map((point, pointIndex) => (
                        <motion.li 
                          key={pointIndex} 
                          className="flex items-start text-sm md:text-base text-neutral-600 brand-body"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.4 + pointIndex * 0.1 }}
                          viewport={{ once: true, amount: 0.2 }}
                        >
                          <span className="text-rose-500 mr-2 mt-1">✓</span>
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <motion.p 
                      className="text-base md:text-lg text-neutral-800 italic mt-4 md:mt-6 mb-3 md:mb-4 font-light brand-body"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      {tab.benefit}
                    </motion.p>
                    
                    <motion.p 
                      className="text-sm md:text-base text-rose-600 font-medium bg-rose-50/80 px-3 py-1.5 rounded inline-block brand-body"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      {tab.statistic}
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call-to-action to start journey */}
        <motion.div 
          className="mt-16 pt-8 border-t border-neutral-200 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-light text-neutral-900 mb-4">start your transformation today</h3>
          <p className="text-neutral-700 mb-6 max-w-2xl mx-auto">Don't wait until you've lost more. Every day you delay is another day without progress toward the hair you deserve.</p>
          <a 
            href="/products/photonique-touch" 
            className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-medium py-3 px-8 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
          >
            begin your journey now
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// Add required dependencies: react-intersection-observer
// npm install react-intersection-observer
// or
// yarn add react-intersection-observer 