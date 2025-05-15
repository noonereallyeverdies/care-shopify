import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, Leaf, Sparkles, Heart, ArrowUpRight, TrendingUp, BarChart3, CheckCheck, Check, ArrowRight } from 'lucide-react';
import { Link } from '@remix-run/react';
import './ResultsTimelineLuxury.css';

// Simple debounce function
function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise(resolve => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        timeoutId = null;
        resolve(func(...args));
      }, waitFor);
    });
}

// Refined timeline data with consistent branding and emotional journey
const timelineTabs = [
  {
    tab: 'week 1-2',
    title: 'weeks 1-2: cellular renewal',
    icon: Clock,
    color: 'rose-400',
    image: {
      src: '/images/timeline/week1.png',
      alt: 'Close up of blonde woman\'s hairline showing scalp health',
    },
    points: [
      {
        title: 'Scalp Revitalization', 
        description: 'Increased cellular renewal and enhanced circulation'
      },
      {
        title: 'Follicle Awakening',
        description: 'Red light therapy begins energizing dormant follicles'
      }
    ],
    benefit: 'The first signs of renewal begin as your scalp responds to care•atin\'s gentle technology.',
    emotion: 'Hope blossoms as you take the first step in your transformation',
    metrics: [
      { label: 'Circulation', value: '+53%' },
      { label: 'Scalp Health', value: '+37%' }
    ]
  },
  {
    tab: 'week 3-4',
    title: 'weeks 3-4: visible results',
    icon: Leaf,
    color: 'rose-500',
    image: {
      src: '/images/timeline/week2.png',
      alt: 'Woman brushing hair, showing less shedding',
    },
    points: [
      {
        title: 'Shedding Reduction', 
        description: 'Up to 62% less hair loss during washing and brushing'
      },
      {
        title: 'Enhanced Luminosity',
        description: 'Existing hair appears more vibrant with visible shine'
      }
    ],
    benefit: 'Fewer hairs in your brush and shower drain signals the beginning of your transformation.',
    emotion: 'Relief and excitement as visible changes begin to appear',
    metrics: [
      { label: 'Shedding', value: '-62%' },
      { label: 'Shine', value: '+41%' }
    ]
  },
  {
    tab: 'week 5-8',
    title: 'weeks 5-8: transformation',
    icon: Sparkles,
    color: 'rose-600',
    image: {
      src: '/images/timeline/week3.png',
      alt: 'Woman touching thicker, healthier looking hair',
    },
    points: [
      {
        title: 'New Growth Emergence', 
        description: 'Fine baby hairs appear along the hairline and part'
      },
      {
        title: 'Volume Restoration',
        description: 'Hair feels noticeably fuller and more luxurious'
      }
    ],
    benefit: 'As new growth emerges, your confidence grows with it.',
    emotion: 'Pride as others begin to notice your transformation',
    metrics: [
      { label: 'Density', value: '+28%' },
      { label: 'Volume', value: '+32%' }
    ]
  },
  {
    tab: 'week 9-12',
    title: 'weeks 9-12: complete renewal',
    icon: Heart,
    color: 'rose-700',
    image: {
      src: '/images/timeline/week4.png',
      alt: 'Smiling woman with full, healthy hair',
    },
    points: [
      {
        title: 'Full Transformation', 
        description: 'Significant improvement in thickness and overall hair health'
      },
      {
        title: 'Confidence Reborn',
        description: 'Reclaim the hair you once had and your confidence with it'
      }
    ],
    benefit: 'Experience the joy of recognizing yourself in the mirror again.',
    emotion: 'Radiance as your inner and outer beauty align',
    metrics: [
      { label: 'Thickness', value: '+43%' },
      { label: 'Satisfaction', value: '93%' }
    ]
  },
];

// Enhanced timeline steps with more specific metrics
const timelineSteps = [
  { 
    day: 14, 
    title: "Follicle Awakening", 
    description: "37% increase in ATP production reactivates dormant growth cycles.",
    metrics: [
      { label: "Reduced Shedding", value: "19%" },
      { label: "Follicle Activity", value: "↑ 37%" }
    ],
    image: "/images/results-14-days.jpg"
  },
  { 
    day: 30, 
    title: "Visible Improvement", 
    description: "New growth becomes visible as miniaturized follicles strengthen.",
    metrics: [
      { label: "Shedding Reduction", value: "62%" },
      { label: "Thickness Increase", value: "↑ 9%" }
    ],
    image: "/images/results-30-days.jpg"
  },
  { 
    day: 60, 
    title: "Noticeable Transformation", 
    description: "Hair density increases with more follicles in active growth phase.",
    metrics: [
      { label: "Hair Count", value: "↑ 18%" },
      { label: "Active Follicles", value: "↑ 43%" }
    ],
    image: "/images/results-60-days.jpg"
  },
  { 
    day: 90, 
    title: "Full Confidence Restoration", 
    description: "Experience the complete transformation in appearance and confidence.",
    metrics: [
      { label: "Volume", value: "↑ 43%" },
      { label: "Satisfaction", value: "93%" }
    ],
    image: "/images/results-90-days.jpg"
  }
];

// This component observes a specific section and sets it as active when in view
interface TimelineSectionObserverProps {
  index: number;
  setActiveIndex: (index: number) => void;
}

function TimelineSectionObserver({ index, setActiveIndex }: TimelineSectionObserverProps) {
  const { ref, inView } = useInView({
    threshold: 0.5
  });
  
  useEffect(() => {
    if (inView) {
      setActiveIndex(index);
    }
  }, [inView, index, setActiveIndex]);
  
  return <div ref={ref} className="h-4 w-full" />;
}

export function ResultsTimeline() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [showMetrics, setShowMetrics] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  // Handle tab click
  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
    if (timelineRef.current) {
      const sections = timelineRef.current.querySelectorAll('.timeline-section');
      if (sections[index]) {
        sections[index].scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  };
  
  // Update the progress indicator
  const getProgressPercent = (tabIndex: number) => {
    return (tabIndex + 1) / timelineTabs.length * 100;
  };
  
  // Update the tab color based on the active tab
  const getTabColor = (index: number) => {
    const tab = timelineTabs[index];
    return tab ? tab.color : 'rose-500';
  };
  
  // Scroll active tab into view when it changes
  useEffect(() => {
    if (tabsRef.current) {
      const activeTab = tabsRef.current.querySelector(`[data-index="${activeTabIndex}"]`);
      if (activeTab) {
        // Use a simple scroll if needed
        const scrollLeft = activeTab.getBoundingClientRect().left + 
                          tabsRef.current.scrollLeft - 
                          tabsRef.current.getBoundingClientRect().left - 
                          40; // Some offset for aesthetics
        
        tabsRef.current.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeTabIndex]);
  
  // Start animation when component mounts
  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
    
    // Show metrics with delay
    setTimeout(() => {
      setShowMetrics(true);
    }, 1000);
  }, [controls]);
  
  // Get the active tab data
  const activeTab = timelineTabs[activeTabIndex];
  
  // Calculate tab positions for indicator
  const [tabPositions, setTabPositions] = useState<number[]>([]);
  
  // Update tab positions on window resize
  const updateTabPositions = useCallback(() => {
    if (tabsRef.current) {
      const tabElements = tabsRef.current.querySelectorAll('.timeline-tab');
      const positions = Array.from(tabElements).map(tab => 
        tab.getBoundingClientRect().left - tabsRef.current!.getBoundingClientRect().left
      );
      setTabPositions(positions);
    }
  }, []);
  
  const debouncedUpdateTabPositions = useCallback(
    debounce(updateTabPositions, 200),
    [updateTabPositions]
  );
  
  useEffect(() => {
    // Update positions initially
    updateTabPositions();
    
    // Add resize listener
    window.addEventListener('resize', debouncedUpdateTabPositions);
    
    return () => {
      window.removeEventListener('resize', debouncedUpdateTabPositions);
    };
  }, [debouncedUpdateTabPositions, updateTabPositions]);
  
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-pink-50 via-white to-pink-50 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-100 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-pink-200 opacity-20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="luxury-serif text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-rose-400 via-pink-300 to-yellow-200 bg-clip-text text-transparent drop-shadow-sm">Your Transformation Journey</h2>
          <p className="text-neutral-700 text-lg max-w-2xl mx-auto">
            Follow the timeline of visible results as Care•atin's revolutionary technology transforms your hair from within
          </p>
        </motion.div>
        
        {/* Timeline Tabs */}
        <div className="mb-8 relative">
          <div 
            ref={tabsRef}
            className="flex overflow-x-auto pb-4 scrollbar-hide snap-x"
          >
            {timelineTabs.map((tab, index) => (
              <motion.button
                key={index}
                data-index={index}
                className={`timeline-tab flex-shrink-0 px-5 py-3 rounded-full mx-2 first:ml-0 last:mr-0 snap-center ${
                  activeTabIndex === index
                    ? 'bg-white shadow-lg border border-pink-200'
                    : 'bg-white/60 hover:bg-white/80 border border-transparent'
                }`}
                onClick={() => handleTabClick(index)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={`text-sm font-medium ${
                  activeTabIndex === index ? 'text-rose-600' : 'text-neutral-500'
                }`}>
                  {tab.tab}
                </span>
              </motion.button>
            ))}
          </div>
          
          {/* Progress bar */}
          <div className="h-1 bg-pink-100 mt-2 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-rose-400 to-pink-300"
              initial={{ width: '0%' }}
              animate={{ width: `${getProgressPercent(activeTabIndex)}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Active Tab Content */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTabIndex}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-pink-200 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="md:flex">
                <div className="md:w-2/5 p-6 relative bg-gradient-to-br from-pink-50 to-white">
                  <h3 className="luxury-serif text-xl md:text-2xl font-semibold text-rose-700 mb-4 capitalize">
                    {activeTab.title}
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    {activeTab.points.map((point, idx) => (
                      <div key={idx} className="flex">
                        <div className="mt-1 mr-3">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-rose-300 to-pink-200 flex items-center justify-center text-white">
                            {idx + 1}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-neutral-800">{point.title}</h4>
                          <p className="text-neutral-600 text-sm">{point.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 bg-white/90 rounded-lg border border-pink-100">
                    <p className="text-neutral-700 italic">{activeTab.benefit}</p>
                    <p className="text-sm text-rose-600 mt-2 font-medium">
                      {activeTab.emotion}
                    </p>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {activeTab.metrics.map((metric, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3 border border-pink-100 text-center">
                        <div className="text-2xl font-bold text-rose-500">{metric.value}</div>
                        <div className="text-xs text-neutral-500">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="md:w-3/5 relative">
                  <img 
                    src={activeTab.image.src} 
                    alt={activeTab.image.alt}
                    className="w-full h-full object-cover object-center"
                    style={{ minHeight: "320px" }}
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
                    <div className="inline-block px-3 py-1 rounded-full bg-rose-500/90 text-white text-xs mb-2">
                      VISIBLE RESULTS
                    </div>
                    <h4 className="text-xl font-medium">
                      {`${activeTab.tab} transformation`}
                    </h4>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* CTA Section */}
        <div className="mt-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link 
              to="/products/care-atin-hair-system" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-rose-400 via-pink-300 to-yellow-200 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              Start Your Transformation Today
            </Link>
            <p className="mt-4 text-neutral-500">
              93% of users reported visible results within 12 weeks
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Add required dependencies: react-intersection-observer
// npm install react-intersection-observer
// or
// yarn add react-intersection-observer 