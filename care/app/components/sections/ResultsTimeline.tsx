import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';

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
    title: "Week 1: Activation",
    image: "/images/timeline-week1-placeholder.jpg", // Placeholder image path
    points: [
      "**Scalp Micro-Environment Optimized:** Photobiomodulation (650-670nm) initiates cellular energization (ATP boost) while targeted massage enhances microcirculation, creating an optimal receptive environment.",
      "**Foundation for Anchoring:** Increased cellular activity stimulates key components of the dermal papilla and perifollicular matrix, beginning the process of reinforcing hair bulb connection."
    ]
  },
  {
    title: "Week 4: Stabilization",
    image: "/images/timeline-week4-placeholder.jpg", // Placeholder image path
    points: [
      "**Reduced Shedding Observed:** Fortified follicular anchoring leads to a noticeable decrease in hair fall during washing and brushing.",
      "**Growth Cycle Support:** Red light exposure encourages follicles to sustain the anagen (growth) phase, contributing to improved hair retention.",
      "**Emerging Luminosity:** Users often report initial improvements in hair's natural reflectivity and reduced dullness [~25-30% of users]."
    ]
  },
  {
    title: "Week 8: Strengthening",
    image: "/images/timeline-week8-placeholder.jpg", // Placeholder image path
    points: [
      "**Hair Fiber Resilience Enhanced:** Optimized cellular function contributes to a stronger keratin matrix, resulting in measurably improved hair elasticity and resistance to breakage.",
      "**Significant Hair Fall Mitigation:** Continued use shows a marked reduction in overall hair loss [~40% improvement].",
      "**Tangible Strength Increase:** A high percentage of users [~75-80%] experience hair that feels structurally stronger."
    ]
  },
  {
    title: "Week 12: Transformation", // ~90 days
    image: "/images/timeline-week12-placeholder.jpg", // Placeholder image path
    points: [
      "**Peak Radiance & Shine:** Cumulative effects on cuticle health result in significantly boosted hair brightness [reported by >90% of users].",
      "**Enhanced Growth Phase Dynamics:** Consistent therapy promotes more follicles in the active anagen phase, contributing to visibly improved density.",
      "**Consistent User Satisfaction:** Virtually all participants observe a meaningful reduction in hair loss and improved overall hair health."
    ]
  }
];

export function ResultsTimeline() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  
  // Ref for the main section element
  const sectionRef = useRef<HTMLDivElement>(null);
  // Animation controls for the progress line
  const progressControls = useAnimation();

  // Debounced function to set active tab and animate progress
  const debouncedUpdate = useCallback(
    debounce((index: number) => {
      setActiveTabIndex(index);
      const totalItems = timelineTabs.length;
      const percentage = totalItems > 1 ? (index / (totalItems - 1)) * 100 : 0;
      progressControls.start({ height: `${percentage}%` });
    }, 50), // Reduce debounce time for responsiveness
    [progressControls] // Dependency for useCallback
  );

  // Effect to handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.offsetTop;
      const scrollY = window.scrollY;
      const scrollPosition = scrollY - sectionTop; // How far scrolled past the section top
      const stepHeight = 550; // Height of the content area, adjust if needed
      const sectionHeight = sectionRef.current.offsetHeight; // Actual height of the section
      const viewportHeight = window.innerHeight;

      // Calculate scroll progress within the sticky section (0 to 1)
      // This assumes the section becomes sticky at its top
      const scrollableDistance = sectionHeight - viewportHeight; // How much scroll range inside the section
      const scrollProgress = Math.max(0, scrollY - sectionTop) / scrollableDistance;

      // Map progress to index
      let newActiveIndex = Math.floor(scrollProgress * timelineTabs.length);

      // Clamp the index within bounds
      newActiveIndex = Math.max(0, Math.min(timelineTabs.length - 1, newActiveIndex));

      // Only update if the index has actually changed
      setActiveTabIndex(prevIndex => {
        if (newActiveIndex !== prevIndex) {
          debouncedUpdate(newActiveIndex); // Call the debounced update for state & animation
        }
        return newActiveIndex; // Return the new index for the state update
      });
    };

    const debouncedScrollHandler = debounce(handleScroll, 50); // Debounce the scroll handler

    window.addEventListener('scroll', debouncedScrollHandler);
    return () => {
      window.removeEventListener('scroll', debouncedScrollHandler);
    }
  }, [debouncedUpdate]); // Dependency includes the debounced function

  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-contrast overflow-hidden relative z-10" // Added relative and z-index
      style={{ height: '300vh', position: 'sticky', top: '0' }} // Make section sticky and tall
    >
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-neutral-900 text-center mb-6 tracking-tight">
           Visible Results: Your 90-Day Transformation
        </h2>
        <p className="text-lg md:text-xl text-center text-neutral-700 mb-12 max-w-2xl mx-auto leading-relaxed tracking-normal">
          Follow the science-backed journey as Photonique Touch progressively revitalizes your hair.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Left Column: Now acts as scroll indicator (make sticky later) */}
          <div className="md:col-span-3"> {/* REMOVED md:sticky md:top-24 */} 
            <nav className="relative flex flex-col space-y-1 py-2 pl-8 pr-4" aria-label="Timeline Stages">
              {/* Static Background Connecting Line (using ::before on nav) */}
              
              {/* Animated Progress Line */}
              <motion.div 
                className="absolute left-[22px] top-0 w-[3px] bg-rose-500 rounded-full z-10" // Positioned over static line
                style={{ height: '0%' }} // Initial height
                animate={progressControls} // Control height with animation
                transition={{ duration: 0.3, ease: "easeOut" }} // Animation transition
              />

              {timelineTabs.map((tab, index) => ( 
                <div
                  key={tab.title}
                  className={`relative w-full text-left px-4 py-3 rounded-md font-serif text-xl md:text-2xl transition-colors duration-200 ease-in-out z-20 
                    ${activeTabIndex === index
                      ? 'text-neutral-900' 
                      : 'text-neutral-400' 
                    }
                    timeline-tab-item // New class for targeting point styles
                  `}
                  role="tab" 
                  aria-selected={activeTabIndex === index}
                >
                  <span>{tab.title}</span> 
                  {/* Point indicator (using ::before on item) */}
                </div>
              ))}
            </nav>
          </div>

          {/* Right Column: Add relative positioning and fixed height */}
          {/* Height needs careful adjustment based on content/design */}
          <div className="md:col-span-9 mt-6 md:mt-0 relative h-[550px] overflow-hidden"> 
            {timelineTabs.map((tab, index) => ( 
              // Make each section absolute, control animation via activeTabIndex
              <motion.div 
                key={tab.title} 
                id={`timeline-section-${index}`} 
                // Add absolute positioning
                className="absolute inset-0 p-8 md:p-12" // Added padding back here
                role="tabpanel" 
                aria-labelledby={`timeline-tab-${index}`}
                // Animate opacity and scale based on activeTabIndex
                initial={{ opacity: 0, scale: 0.95 }} // Start hidden and slightly scaled down
                animate={{
                  opacity: index === activeTabIndex ? 1 : 0,
                  scale: index === activeTabIndex ? 1 : 0.95,
                  transitionEnd: {
                     // Keep inactive sections visible to refs but hidden from user
                     display: index === activeTabIndex ? 'block' : 'none',
                   }
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                // Disable pointer events for inactive sections
                style={{ pointerEvents: index === activeTabIndex ? 'auto' : 'none' }}
              >
                {/* Content Layout: Text LEFT, Image RIGHT */}
                {/* Wrap content in a div to handle potential overflow if needed */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center h-full">
                  {/* Text Points Column */}
                  <div className="md:col-span-7">
                    <h3 className="text-2xl font-semibold font-serif mb-4 text-neutral-800">{tab.title}</h3>
                    <ul className="space-y-4 list-none pl-0">
                      {tab.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="text-base text-neutral-700 leading-relaxed font-sans flex gap-3 items-start">
                          <span className="text-rose-500 mt-1 flex-shrink-0">✓</span> 
                          <span dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong class="font-medium text-neutral-800">$1</strong>').replace(/\[(.*?)\]/g, '<em class="text-sm text-neutral-500 not-italic">$1</em>') }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Image Column */}
                  <div className="md:col-span-5 w-full overflow-hidden rounded-lg border border-neutral-100 shadow-sm">
                    <img 
                      src={tab.image} 
                      alt={`${tab.title} results visual`} 
                      className="w-full h-auto object-cover aspect-[4/3] bg-neutral-100" 
                      onError={(e) => e.currentTarget.src = 'https://placehold.co/600x450/f0f0f0/cccccc?text=Image%5CnNot+Found'} 
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 