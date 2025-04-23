import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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

// Component to observe intersection for each content section
// Add types for props
interface TimelineSectionObserverProps {
  index: number;
  setActiveIndex: (index: number) => void;
}

function TimelineSectionObserver({ index, setActiveIndex }: TimelineSectionObserverProps) {
  const { ref, inView, entry } = useInView({
    threshold: 0.5, // Trigger when 50% visible
    // Optional: Adjust rootMargin if needed, e.g., to trigger earlier/later
    // rootMargin: "-40% 0px -60% 0px", 
  });

  useEffect(() => {
    // When this section becomes the most visible (passes the threshold)
    // We also check entry?.isIntersecting to be sure, although `inView` should suffice
    if (inView && entry?.isIntersecting) {
      setActiveIndex(index);
    }
  }, [inView, index, setActiveIndex, entry]);

  // Render an invisible div to act as the trigger
  return <div ref={ref} style={{ position: 'absolute', height: '100%', top: 0, left: 0, width: '100%', pointerEvents: 'none' }} data-index={index} />;
}

export function ResultsTimeline() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const progressControls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null); // Ref for the main section

  // Callback to update state and animation, memoized
  const updateActiveTab = useCallback((index: number) => {
    setActiveTabIndex(index);
    const totalItems = timelineTabs.length;
    const percentage = totalItems > 1 ? (index / (totalItems - 1)) * 100 : 0;
    progressControls.start({ height: `${percentage}%` });
  }, [progressControls]); // Dependency

  return (
    <section
      ref={sectionRef}
      // Keep sticky positioning for the scroll effect, but the height might not need to be excessive anymore.
      // Let's reduce it initially, can be adjusted. Maybe just enough height for content + viewport.
      className="py-24 bg-contrast relative min-h-screen" // Removed overflow-hidden, added min-h-screen
      // Style adjustments: remove fixed height, let content dictate height
      // style={{ height: '300vh', position: 'sticky', top: '0' }} // <-- Remove or adjust
    >
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-neutral-900 text-center mb-6 tracking-tight">
           Visible Results: Your 90-Day Transformation
        </h2>
        <p className="text-lg md:text-xl text-center text-neutral-700 mb-12 max-w-2xl mx-auto leading-relaxed tracking-normal">
          Follow the science-backed journey as Photonique Touch progressively revitalizes your hair.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start relative">
          {/* Left Column: Sticky Navigation */}
          {/* Make this sticky within the parent section */}
          <div className="md:col-span-3 md:sticky md:top-24 h-fit"> {/* Added h-fit */}
            <nav className="relative flex flex-col space-y-1 py-2 pl-8 pr-4" aria-label="Timeline Stages">
              {/* Static Background Line (using ::before/::after or a simple div) */}
              <div className="absolute left-[22px] top-0 bottom-0 w-[3px] bg-neutral-200 rounded-full"></div>

              {/* Animated Progress Line */}
              <motion.div
                className="absolute left-[22px] top-0 w-[3px] bg-rose-500 rounded-full z-10"
                style={{ height: '0%' }}
                animate={progressControls}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />

              {/* Timeline Tabs */}
              {timelineTabs.map((tab, index) => (
                <div
                  key={tab.title}
                  // Removed unused role/aria attributes for simplicity here, can add back if needed
                  className={`relative w-full text-left px-4 py-3 rounded-md font-serif text-xl md:text-2xl transition-colors duration-200 ease-in-out z-20
                    ${activeTabIndex === index
                      ? 'text-neutral-900'
                      : 'text-neutral-400'
                    }
                  `}
                  // Add ::before pseudo-element styling in CSS for the dot
                >
                  {/* Dot Indicator REMOVED */}
                  {/* <span className={`absolute left-[15.5px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-contrast z-10 transition-colors duration-200 ease-in-out ${activeTabIndex >= index ? 'bg-rose-500' : 'bg-neutral-300'}`}></span> */}

                  <span className="ml-4">{tab.title}</span>{/* Adjust margin if needed */}
                </div>
              ))}
            </nav>
          </div>

          {/* Right Column: Content Sections */}
          {/* Needs enough height to contain the largest content block */}
           {/* Removed fixed height, let content determine height, add relative */}
          <div className="md:col-span-9 mt-6 md:mt-0 relative">
            {/* Render all sections, visibility controlled by Framer Motion & Observer */}
            {timelineTabs.map((tab, index) => (
              // Wrap each section content for observation
              // Use min-height to ensure observers have space even if content is short
              <div key={tab.title} className="relative" style={{ minHeight: '80vh' }}>
                {/* Observer Trigger */}
                <TimelineSectionObserver index={index} setActiveIndex={updateActiveTab} />

                {/* Content Section (using Framer Motion for transitions) */}
                <motion.div
                  id={`timeline-section-${index}`}
                  className="absolute inset-0 p-8 md:p-12" // Keep absolute positioning for fade effect
                  aria-hidden={index !== activeTabIndex} // Better for accessibility
                  initial={{ opacity: 0, y: 20 }} // Start hidden and slightly down
                  animate={{
                    opacity: index === activeTabIndex ? 1 : 0,
                    y: index === activeTabIndex ? 0 : 20, // Slight vertical slide
                    // Keep element in layout but invisible for observer; use visibility
                    visibility: index === activeTabIndex ? 'visible' : 'hidden',
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                   // Use visibility instead of display none for observer
                  style={{ pointerEvents: index === activeTabIndex ? 'auto' : 'none' }}
                >
                  {/* Content Layout (keep as is) */}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Add required dependencies: react-intersection-observer
// npm install react-intersection-observer
// or
// yarn add react-intersection-observer 