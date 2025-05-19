import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, Leaf, Sparkles, Heart, ArrowUpRight, TrendingUp, BarChart3, CheckCheck, Check, ArrowRight } from 'lucide-react';
import { Link } from '@remix-run/react';

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

// Enhanced timeline data with more specific metrics and emotional journey
const timelineTabs = [
  {
    tab: 'week 1-2',
    title: 'weeks 1-2: cellular awakening',
    icon: Clock,
    color: 'rose-400',
    image: {
      src: '/images/timeline/week1.png',
      alt: 'Close up of blonde woman\'s hairline showing scalp health',
    },
    points: [
      {
        title: 'Scalp Stimulation', 
        description: 'Increased cellular activity and 53% boost in circulation'
      },
      {
        title: 'Reduced Inflammation',
        description: 'Inflammatory markers decrease by 29%'
      },
      {
        title: 'First Sensations',
        description: 'A healthy scalp tingle as follicles begin to wake up'
      }
    ],
    benefit: "Your journey begins: cellular awakening starts, actively preserving your hair's natural potential.",
    emotion: 'Hope begins as you take control of your hair journey',
    statistic: '87% felt a stimulating sensation during their first week',
    metrics: [
      { label: 'Blood Flow', value: '+53%' },
      { label: 'ATP Production', value: '+37%' }
    ]
  },
  {
    tab: 'week 3-4',
    title: 'weeks 3-4: visible renewal',
    icon: Leaf,
    color: 'emerald-500',
    image: {
      src: '/images/timeline/week2.png',
      alt: 'Blonde woman brushing hair, showing less shedding',
    },
    points: [
      {
        title: 'Less Shedding', 
        description: 'Hair loss reduces by up to 62%'
      },
      {
        title: 'Healthier Scalp',
        description: 'Visible decrease in flaking and irritation'
      },
      {
        title: 'Improved Hair Quality',
        description: 'Existing hair appears healthier with more shine'
      }
    ],
    benefit: 'Less shedding means confidence stops washing down the drain.',
    emotion: 'Relief as you notice fewer hairs falling out daily',
    statistic: 'Up to 74% reduction in daily shedding by week 4',
    metrics: [
      { label: 'Daily Shedding', value: '-62%' },
      { label: 'Hair Shine', value: '+41%' }
    ]
  },
  {
    tab: 'week 5-8',
    title: 'weeks 5-8: visible transformation',
    icon: Sparkles,
    color: 'amber-500',
    image: {
      src: '/images/timeline/week3.png',
      alt: 'Blonde woman touching thicker, healthier looking hair',
    },
    points: [
      {
        title: 'New Growth Appears', 
        description: 'Baby hairs become visible along hairline and part'
      },
      {
        title: 'Increased Density',
        description: 'Hair feels noticeably thicker to the touch'
      },
      {
        title: 'Social Recognition',
        description: 'Friends begin to notice your transformation'
      }
    ],
    benefit: "Your transformation becomes visible: authentic results you can see and feel.",
    emotion: 'Pride swells as others notice the change',
    statistic: '82% received compliments on their hair by week 8',
    metrics: [
      { label: 'Hair Density', value: '+28%' },
      { label: 'New Growth', value: 'Visible' }
    ]
  },
  {
    tab: 'week 9-12',
    title: 'weeks 9-12: complete flourishing',
    icon: Heart,
    color: 'violet-500',
    image: {
      src: '/images/timeline/week4.png',
      alt: 'Smiling blonde woman with full, healthy hair blowing',
    },
    points: [
      {
        title: 'Volume Increase', 
        description: 'Significant improvement creates fuller appearance'
      },
      {
        title: 'Stronger, Healthier Growth',
        description: 'New hair grows thicker and more resilient'
      },
      {
        title: 'Confidence Transformation',
        description: 'Feel like "yourself again" with renewed confidence'
      }
    ],
    benefit: "Complete flourishing: reclaim your confidence and embrace your hair's full potential.",
    emotion: 'Joy as you recognize yourself in the mirror again',
    statistic: '93% reported feeling more confident by week 12',
    metrics: [
      { label: 'Overall Volume', value: '+43%' },
      { label: 'Hair Strength', value: '+76%' }
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
    threshold: 0.6, // Section is considered "in view" when 60% visible
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      setActiveIndex(index);
    }
  }, [inView, index, setActiveIndex]);

  return <div ref={ref} className="timeline-observer h-screen" />;
}

export function ResultsTimeline() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeScrollIndex, setActiveScrollIndex] = useState(0);
  const [currentView, setCurrentView] = useState<'tabs' | 'scroll'>('tabs');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Track whether we should intercept scroll events
  const shouldHandleScroll = useRef(true);

  // Scroll to a specific section based on the active index
  const scrollToSection = useCallback((index: number) => {
    if (!scrollContainerRef.current) return;
    
    // Temporarily disable our scroll handler to prevent infinite loop
    shouldHandleScroll.current = false;
    
    const sectionElements = scrollContainerRef.current.querySelectorAll('.timeline-section');
    if (sectionElements[index]) {
      sectionElements[index].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      
      // Re-enable scroll handling after animation completes
      setTimeout(() => {
        shouldHandleScroll.current = true;
      }, 1000);
    }
  }, []);

  // Calculate animation progress based on current view and active index
  const getProgressPercent = (tabIndex: number) => {
    if (currentView === 'tabs') {
      return tabIndex === activeTabIndex ? 100 : tabIndex < activeTabIndex ? 100 : 0;
    } else {
      return tabIndex === activeScrollIndex ? 
        70 : // Currently active section shows 70% progress 
        tabIndex < activeScrollIndex ? 100 : 0; // Past sections are complete, future are not started
    }
  };

  // Colors for timeline progress
  const getTabColor = (index: number) => {
    const tab = timelineTabs[index];
    return tab?.color || 'gray-400';
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 relative">
        <h2 className="text-3xl md:text-4xl text-center font-light mb-16">
          Your Transformation Journey
        </h2>
        
        {/* Interactive Timeline Navigation */}
        <div className="timeline-tabs flex justify-between items-center max-w-4xl mx-auto mb-12 relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 h-0.5 bg-gray-200 w-full -z-10"></div>
          
          {timelineTabs.map((tab, index) => (
            <div key={index} className="timeline-tab flex flex-col items-center">
              {/* Tab Button with Progress */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setActiveTabIndex(index);
                    setCurrentView('tabs');
                    
                    if (currentView === 'scroll') {
                      scrollToSection(index);
                    }
                  }}
                  className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center relative z-10 transition-all duration-300"
                  aria-label={`View ${tab.title}`}
                >
                  {/* Progress Circle */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle 
                      cx="18" 
                      cy="18" 
                      r="16" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      strokeDasharray="100"
                      strokeDashoffset={100 - getProgressPercent(index)}
                      className={`text-${getTabColor(index)} transition-all duration-700 ease-out`}
                    />
                  </svg>
                  
                  {/* Icon */}
                  <tab.icon 
                    size={16} 
                    className={`transition-colors duration-300 ${
                      index === activeTabIndex ? `text-${getTabColor(index)}` : 'text-gray-500'
                    }`} 
                  />
                </button>
                
                {/* Progress line to next point */}
                {index < timelineTabs.length - 1 && (
                  <div 
                    className={`absolute top-5 left-10 h-0.5 transition-all duration-1000 ease-out ${
                      getProgressPercent(index) >= 100 ? `bg-${getTabColor(index)}` : 'bg-gray-200'
                    }`} 
                    style={{ 
                      width: 'calc(100vw / 6)', 
                      transformOrigin: 'left',
                      transform: `scaleX(${getProgressPercent(index) / 100})`,
                      maxWidth: '20vw'
                    }}
                  />
                )}
              </div>
              
              {/* Tab Label */}
              <span className={`mt-3 text-xs uppercase tracking-wide font-medium ${
                index === activeTabIndex ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {tab.tab}
              </span>
            </div>
          ))}
        </div>
        
        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`tab-${activeTabIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="tab-content max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-5 gap-8 items-center">
              {/* Left Column (Image) */}
              <div className="md:col-span-2">
                <div className="rounded-lg overflow-hidden border border-gray-100 shadow-md aspect-[3/4] bg-white relative">
                  <img 
                    src={timelineTabs[activeTabIndex].image.src} 
                    alt={timelineTabs[activeTabIndex].image.alt}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
              
              {/* Right Column (Content) */}
              <div className="md:col-span-3">
                <h3 className={`text-2xl md:text-3xl font-light mb-4 text-${timelineTabs[activeTabIndex].color}`}>
                  {timelineTabs[activeTabIndex].title}
                </h3>
                
                <div className="space-y-4 mb-6">
                  {timelineTabs[activeTabIndex].points.map((point, i) => (
                    <div key={i} className="flex items-start">
                      <span className={`p-1 rounded-full text-white bg-${timelineTabs[activeTabIndex].color} mr-3 mt-1 flex-shrink-0`}>
                        <Check size={12} />
                      </span>
                      <div>
                        <h4 className="font-medium text-gray-900">{point.title}</h4>
                        <p className="text-sm text-gray-600">{point.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="stats grid grid-cols-2 gap-4 mb-6">
                  {timelineTabs[activeTabIndex].metrics.map((metric, i) => (
                    <div key={i} className="stat-card p-3 bg-gray-50 rounded-lg">
                      <div className={`text-lg font-bold text-${timelineTabs[activeTabIndex].color}`}>{metric.value}</div>
                      <div className="text-xs text-gray-500">{metric.label}</div>
                    </div>
                  ))}
                </div>
                
                <blockquote className={`p-4 border-l-2 border-${timelineTabs[activeTabIndex].color} bg-gray-50 italic text-gray-700`}>
                  "{timelineTabs[activeTabIndex].emotion}"
                </blockquote>
                
                <div className="mt-6 flex justify-end">
                  <Link to="/pages/science" className="inline-flex items-center text-gray-700 hover:text-rose-600 text-sm font-medium">
                    Clinical research details <ArrowUpRight size={14} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// Add required dependencies: react-intersection-observer
// npm install react-intersection-observer
// or
// yarn add react-intersection-observer 