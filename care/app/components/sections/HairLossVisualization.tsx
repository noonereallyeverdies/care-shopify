import React, { useEffect, useState, useRef } from 'react';
import { motion, useViewportScroll, useTransform, useScroll } from 'framer-motion';
import { ArrowRight, AlertTriangle, TrendingDown, Clock, Zap, Waves, Droplet, Info, CheckCircle, User, ExternalLink, ChevronDown, ChevronUp, BarChart } from 'lucide-react';
import { ClientOnly } from '~/components/utility/ClientOnly';
import { Link } from '@remix-run/react';
import { AnimatedCounter } from '~/components/Shared/AnimatedCounter';

// Define a type for timeline items
interface TimelineStageItem {
  stage: string;
  time: string;
  points: string[];
  opportunity: string;
  success: string;
  testimonial: {
    quote: string;
    author: string;
  };
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
  ctaText: string;
  stageMessage: string;
  hairLossImg: string;
}

// Enhanced timeline data with social proof and more emotional triggers
const timeline: TimelineStageItem[] = [
  {
    stage: 'Early Signs',
    time: 'First ~30 Days',
    points: ['Slight increase in shedding', 'Hair feels less dense/vibrant'],
    opportunity: 'Early action = best results.',
    success: '91%',
    testimonial: {
      quote: 'I noticed early changes and took action immediately. My hair never thinned further.',
      author: 'Michael, 34',
    },
    icon: Clock,
    color: 'text-rose-500',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    ctaText: 'Get Care•atin',
    stageMessage: 'Best time to start - protect what you have',
    hairLossImg: '/images/hairloss/early-stage.png',
  },
  {
    stage: 'Visible Changes',
    time: 'Around ~90 Days',
    points: [
      'Noticeable thinning (part line, temples)',
      'Hair appears duller/brittle',
    ],
    opportunity: 'Dormant follicles still highly responsive.',
    success: '76%',
    testimonial: {
      quote: 'Within months of treatment, my confidence and hair volume were returning.',
      author: 'Sarah, 41',
    },
    icon: TrendingDown,
    color: 'text-rose-500',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    ctaText: 'Get Care•atin',
    stageMessage: 'Critical window - rapid response needed',
    hairLossImg: '/images/hairloss/visible-stage.png',
  },
  {
    stage: 'Later Stages',
    time: 'Beyond ~180 Days',
    points: [
      'Recession more pronounced',
      'Follicle health declines',
    ],
    opportunity: 'Consistent care maximizes potential.',
    success: '60%',
    testimonial: {
      quote: 'Care•atin helped restore hair I thought was permanently lost.',
      author: 'David, 47',
    },
    icon: AlertTriangle,
    color: 'text-rose-500',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    ctaText: 'Get Care•atin',
    stageMessage: 'Recovery still possible - start immediately',
    hairLossImg: '/images/hairloss/advanced-stage.png',
  },
];

// Updated data with stronger emotional language
const timeframes = [
  {
    time: 'Within 30 Days',
    effects: [
      {
        title: 'Accelerated loss & visible thinning',
        description:
          'Without intervention, follicle miniaturization accelerates, causing noticeable hair loss in key areas.',
      },
      {
        title: 'Diminished shine',
        description:
          'Hair becomes increasingly brittle and lacks vitality, appearing dull and lifeless.',
      },
      {
        title: 'Reduced self-perception',
        description:
          "You'll notice more hair in your brush, drain, and the mirror becomes a source of anxiety.",
      },
    ],
    color: 'from-orange-400 to-red-400',
  },
  {
    time: 'Within 90 Days',
    effects: [
      {
        title: 'Significant recession',
        description:
          'Temple and crown areas show pronounced thinning that styling can no longer conceal.',
      },
      {
        title: 'Damaged follicle health',
        description:
          'Unchecked DHT buildup leads to permanent damage to viable follicles.',
      },
      {
        title: 'Social impact',
        description:
          'Many begin avoiding social situations and photos, directly impacting confidence and relationships.',
      },
    ],
    color: 'from-red-400 to-rose-500',
  },
  {
    time: 'Within 180 Days',
    effects: [
      {
        title: 'Irreversible loss patterns',
        description:
          'The window for reviving dormant follicles begins closing, leading to permanent baldness in affected areas.',
      },
      {
        title: 'Psychological effects',
        description:
          'Studies show untreated hair loss leads to significantly reduced self-esteem and quality of life.',
      },
      {
        title: 'Limited treatment options',
        description:
          'Advanced loss may require more invasive, expensive solutions with less satisfying results.',
      },
    ],
    color: 'from-rose-500 to-purple-500',
  },
];

// Separate component to handle hook consistency
function HairLossContent() {
  // Using global framer-motion since it should be available
  const framerMotion = window["framer-motion"];
  const { useScroll, useTransform } = framerMotion || { useScroll: () => ({}), useTransform: () => ({}) };
  
  const [count, setCount] = useState(0);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetCount = 3857; // The number from the UI (3,857)
  
  // Setup scroll-based animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"]
  });
  
  // Transform scroll progress to counter value
  const counterValue = useTransform
    ? useTransform(
        scrollYProgress,
        [0, 0.8],
        [0, targetCount]
      )
    : { onChange: null };
  
  // Update the counter based on scroll
  useEffect(() => {
    if (!counterValue?.onChange) return;
    
    const unsubscribe = counterValue.onChange((latest: number) => {
      setCount(Math.round(latest));
    });
    
    // Pulse animation for the counter when it reaches certain thresholds
    const highlightInterval = setInterval(() => {
      if (count > targetCount * 0.5) {
        setIsHighlighted(true);
        setTimeout(() => setIsHighlighted(false), 500);
      }
    }, 3000);
    
    return () => {
      unsubscribe();
      clearInterval(highlightInterval);
    };
  }, [counterValue, count]);
  
  // Enhanced stats data with more emotional impact
  interface StatItem {
    label: string;
    value: string;
    impact: string;
  }

  const stats: StatItem[] = [
    { 
      label: "Average strands lost daily", 
      value: "150",
      impact: "Each strand represents diminishing confidence" 
    },
    { 
      label: "Women who wait until loss is visible", 
      value: "68%",
      impact: "By then, recovery takes 3x longer" 
    },
    { 
      label: "Reduction in hair volume before action", 
      value: "55%",
      impact: "Imagine losing half your hair before treating it" 
    }
  ];
  
  // Daily consequences of waiting
  interface DailyLossItem {
    day: number;
    consequence: string;
  }

  const dailyLoss: DailyLossItem[] = [
    { day: 7, consequence: "Increased shedding becomes noticeable to you" },
    { day: 30, consequence: "Friends start to notice thinning at crown" },
    { day: 90, consequence: "Visible scalp areas expand by up to 23%" },
    { day: 180, consequence: "Recovery time doubles from this point" }
  ];
  
  try {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center relative" ref={containerRef}>
        {/* Left column - Stats */}
        <div className="bg-white text-primary rounded-lg shadow-md p-5 border-t-4 border-rose-500">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-primary mb-2">The True Cost of Waiting</h2>
            <p className="text-neutral-700 mb-4 text-sm">Every day without treatment means <span className="font-semibold text-rose-600">permanent loss</span> of your hair's potential.</p>
            
            <div className={`text-5xl font-bold text-center mb-2 tabular-nums transition-all duration-300 ${isHighlighted ? 'text-rose-600 scale-105' : 'text-accent'}`}>
              {count.toLocaleString()}
            </div>
            <div className="text-center">
              <div className="font-medium text-sm text-neutral-800">Hair strands lost</div>
              <div className="text-xs text-rose-600 font-medium">This damage cannot be undone</div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full h-2 bg-neutral-200 rounded-full mb-4">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-rose-600 rounded-full transition-all duration-1000 relative"
              style={{ width: `${(count / targetCount) * 100}%` }}
            >
              {/* Pulsing indicator at the end of the bar */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-rose-600 rounded-full animate-ping opacity-75"></div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-rose-600 rounded-full"></div>
            </div>
          </div>
          
          {/* Stats grid with improved contrast and emotional impact */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-2 bg-neutral-50 rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-base font-semibold text-rose-600">{stat.value}</div>
                <div className="text-2xs text-neutral-700 font-medium mb-1">{stat.label}</div>
                <div className="text-2xs text-neutral-500 italic">{stat.impact}</div>
              </div>
            ))}
          </div>
          
          {/* Timeline of consequences - NEW COMPONENT */}
          <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 mb-4">
            <div className="flex items-center mb-2 text-rose-600">
              <Clock size={14} className="mr-2" />
              <h3 className="font-medium text-xs">Consequences of Waiting</h3>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {dailyLoss.map((item, index) => (
                <div key={index} className="flex items-baseline">
                  <div className="w-12 font-medium text-neutral-800 text-2xs">Day {item.day}:</div>
                  <div className="text-2xs text-neutral-700">{item.consequence}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Call to action with emotional trigger */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link 
              to="/products/photonique-touch" 
              className="flex items-center justify-center w-full bg-rose-600 hover:bg-rose-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200 text-sm"
            >
              Stop the loss today
              <ArrowRight size={14} className="ml-2" />
            </Link>
            <p className="text-2xs text-center text-neutral-500 mt-1">
              Over 10,000 customers wish they had started sooner
            </p>
          </motion.div>
        </div>
        
        {/* Right column - Visualization */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-full aspect-square max-w-md mx-auto">
            {/* Hair loss emotional context - NEW COMPONENT */}
            <motion.div 
              className="absolute -top-8 right-0 bg-neutral-800 text-white px-3 py-1 rounded-lg shadow-lg text-xs flex items-center z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <AlertTriangle size={12} className="mr-1 text-amber-400" />
              <span>Without intervention, this will be <span className="font-bold">your reality</span></span>
            </motion.div>
            
            {/* Scalp circle base */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-neutral-200 to-neutral-100 overflow-hidden shadow-inner border border-neutral-300">
              {/* Light gray subtle pattern for scalp texture */}
              <div className="absolute inset-0 opacity-30">
                <div className="w-full h-full bg-neutral-200 opacity-40"></div>
              </div>
              
              {/* Simple hair visualization using lines */}
              <HairVisualization 
                scrollProgress={scrollYProgress} 
                totalCount={240} // Representative sample for good performance
                useTransform={useTransform}
              />
              
              {/* Overlay emotional impact text - NEW COMPONENT */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center opacity-0"
                animate={{ 
                  opacity: scrollYProgress.get() > 0.6 ? 0.9 : 0 
                }}
              >
                <div className="bg-black/70 backdrop-blur-sm p-3 rounded-lg text-white text-center max-w-[80%]">
                  <h4 className="font-medium mb-1 text-sm">This is happening right now</h4>
                  <p className="text-2xs text-white/80">Your hair doesn't wait for you to decide</p>
                </div>
              </motion.div>
            </div>
            
            {/* Trend indicator */}
            <motion.div 
              className="absolute -bottom-4 -right-4 bg-rose-600 text-white p-2 rounded-full shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <TrendingDown size={20} />
            </motion.div>
            
            {/* Black button at the bottom with stronger emotional trigger */}
            <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
              <motion.button
                className="bg-black text-white px-4 py-2 rounded-md text-xs font-medium shadow-lg hover:bg-neutral-800 transition-colors duration-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Don't wait until it's too late
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering HairLossContent:", error);
    return (
      <div className="p-8 bg-white rounded-lg text-primary text-center">
        <div className="text-4xl font-bold mb-4">3,857</div>
        <div className="mb-2">Hair strands lost on average per month</div>
        <div className="text-sm text-neutral-500">Start treatment before it's too late</div>
      </div>
    );
  }
}

// Hair visualization component that doesn't use hooks directly
function HairVisualization({ 
  scrollProgress, 
  totalCount,
  useTransform
}: { 
  scrollProgress: any, 
  totalCount: number,
  useTransform: any
}) {
  // Create hair strands data
  const hairStrands = React.useMemo(() => {
    const strands = [];
    
    // Different strand lengths for visual variety
    const lengths = [18, 20, 22, 24, 26, 28];
    
    // Create strands evenly distributed around the circle
    for (let i = 0; i < totalCount; i++) {
      // Calculate position in a spiral pattern from center
      const angle = i * 2.5; // Angle increments for spiral effect
      const radius = Math.sqrt(i) * 0.5; // Increasing radius for spiral
      const normalizedRadius = Math.min(radius, 0.8); // Limit to circle area
      
      // Convert polar coordinates to cartesian
      const x = 50 + Math.cos(angle) * normalizedRadius * 50;
      const y = 50 + Math.sin(angle) * normalizedRadius * 50;
      
      // Randomize when this strand disappears during scroll
      // Arrange in batches so it looks more natural
      const disappearGroup = Math.floor(i / (totalCount / 20)); // 20 disappear groups
      const disappearThreshold = disappearGroup / 20;
      
      // Randomize appearance slightly
      const length = lengths[Math.floor(Math.random() * lengths.length)];
      
      strands.push({
        id: i,
        x,
        y,
        length,
        thickness: 0.8 + Math.random() * 0.3,
        angle: angle,
        disappearThreshold
      });
    }
    
    return strands;
  }, [totalCount]);
  
  try {
    return (
      <div className="absolute inset-0">
        <svg 
          viewBox="0 0 100 100"
          className="w-full h-full"
        >
          {hairStrands.map((strand) => {
            // When this strand should disappear (0.0 - 1.0)
            const disappearAt = strand.disappearThreshold * 0.9;
            
            // Calculate end point of hair strand
            const radialDirection = {
              x: Math.cos(strand.angle),
              y: Math.sin(strand.angle)
            };
            
            const start = {
              x: strand.x,
              y: strand.y
            };
            
            const end = {
              x: strand.x - radialDirection.x * strand.length,
              y: strand.y - radialDirection.y * strand.length
            };
            
            // Calculate opacity based on scroll position
            const opacity = useTransform 
              ? useTransform(
                  scrollProgress,
                  [disappearAt, disappearAt + 0.1],
                  [0.7, 0] // Start semi-transparent and fade out
                )
              : 0.7;
            
            // Calculate falling animation
            const fallDistance = useTransform
              ? useTransform(
                  scrollProgress,
                  [disappearAt, disappearAt + 0.2],
                  [0, 20]
                )
              : 0;
            
            const fallRotation = useTransform
              ? useTransform(
                  scrollProgress,
                  [disappearAt, disappearAt + 0.2],
                  [0, Math.random() * 30 - 15]
                )
              : 0;
            
            return (
              <motion.line
                key={strand.id}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="#333"
                strokeWidth={strand.thickness}
                strokeLinecap="round"
                style={{
                  opacity,
                  translateY: fallDistance,
                  rotate: fallRotation,
                  transformOrigin: `${start.x}px ${start.y}px`,
                }}
              />
            );
          })}
        </svg>
      </div>
    );
  } catch (error) {
    console.error("Error rendering HairVisualization:", error);
    return null;
  }
}

// Expert quote component
function ExpertQuote() {
  return (
    <motion.div
      className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 shadow-sm"
      initial={{opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      transition={{duration: 0.6}}
    >
      <div className="flex items-start">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 mr-2 overflow-hidden">
          <img
            src="/images/experts/dr-hansen.jpg"
            alt="Dr. Hansen"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-neutral-700 italic mb-1 text-xs">
            &quot;Hair loss follows a predictable pattern. The earlier you act, the more follicles you save from permanent miniaturization.&quot;
          </p>
          <p className="text-neutral-500 text-2xs flex items-center">
            <User size={12} className="mr-1" />
            Dr. Karen Hansen, Trichologist
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Timeline stage component with expanded functionality
function TimelineStage({item, index, setExpandedIndex, expandedIndex}: {
  item: TimelineStageItem,
  index: number,
  setExpandedIndex: (index: number | null) => void,
  expandedIndex: number | null
}) {
  const isExpanded = expandedIndex === index;
  const Icon = item.icon as React.ElementType;
  
  return (
    <motion.div 
      layout
      className={`mb-6 rounded-2xl backdrop-blur-sm bg-white/80 border ${item.borderColor} shadow-lg overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
    >
      <div 
        className={`p-6 cursor-pointer ${isExpanded ? 'border-b border-neutral-100' : ''}`}
        onClick={() => setExpandedIndex(isExpanded ? null : index)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className={`mr-4 w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center`}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-300 via-pink-200 to-yellow-100 flex items-center justify-center">
                <span className="text-white font-bold text-lg">{index + 1}</span>
              </div>
            </div>
            <div>
              <h3 className="luxury-serif text-xl font-semibold text-rose-700">{item.stage}</h3>
              <p className="text-sm text-neutral-500 mt-1">{item.time}</p>
            </div>
          </div>
          <span className="text-neutral-400">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </span>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-6 bg-gradient-to-br from-pink-50 to-white">
          <div className="mb-4">
            <p className="text-neutral-700 font-medium mb-1">{item.stageMessage}</p>
            <ul className="space-y-2">
              {item.points.map((point, i) => (
                <li key={i} className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-rose-300 mt-1.5 mr-2"></span>
                  <span className="text-neutral-600">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-4 p-4 bg-white/50 rounded-lg border border-pink-100">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-3 border border-pink-200">
                <div className="w-full h-full bg-gradient-to-br from-rose-300 to-pink-100"></div>
              </div>
              <div>
                <p className="text-sm font-semibold">Success Rate</p>
                <p className="luxury-serif text-2xl font-bold bg-gradient-to-r from-rose-400 via-pink-300 to-yellow-200 bg-clip-text text-transparent">{item.success}</p>
              </div>
            </div>
            <div className="pt-2 border-t border-pink-100 mt-2">
              <p className="text-sm italic text-neutral-600">"{item.testimonial.quote}"</p>
              <p className="text-xs text-neutral-500 mt-1">— {item.testimonial.author}</p>
            </div>
          </div>
          
          <button className="w-full bg-gradient-to-r from-rose-400 via-pink-300 to-yellow-200 text-white py-3 px-6 rounded-full font-semibold hover:shadow-lg hover:scale-[1.02] transition-all">
            {item.ctaText}
          </button>
        </div>
      )}
    </motion.div>
  );
}

// Main exported component
export function HairLossVisualization() {
  return (
    <section className="hair-journey-section py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-white via-[#fadadd]/40 to-white">
      {/* Soft pink/gold radial gradients and sparkles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-1/4 top-0 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute right-1/4 bottom-0 w-80 h-80 bg-yellow-100/40 rounded-full blur-2xl animate-pulse" />
        {/* Sparkles (SVG or CSS) */}
        <div className="absolute left-1/2 top-1/3 w-8 h-8 bg-pink-100 rounded-full blur-xl opacity-60 animate-ping" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Expert Quote elegantly integrated */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-pink-100">
            <img src="/images/experts/dr-hansen.jpg" alt="Dr. Hansen" className="w-10 h-10 rounded-full object-cover border-2 border-pink-200" />
            <div className="text-left">
              <p className="text-lg md:text-xl font-serif italic text-neutral-700 mb-1">“The earlier you act, the more follicles you save from permanent miniaturization.”</p>
              <p className="text-xs text-rose-400 font-medium">Dr. Karen Hansen, Trichologist</p>
            </div>
          </div>
        </div>
        {/* Three-Column Journey Stages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {timeline.map((item: TimelineStageItem, idx: number) => (
            <div key={item.stage} className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-pink-100 flex flex-col items-center px-8 py-10 transition-transform duration-300 hover:scale-105 hover:shadow-pink-200/60">
              {/* Animated Counter for percentage */}
              <div className="mb-2">
                <AnimatedCounter targetValue={parseInt(item.success)} suffix="%" duration={1.2} />
              </div>
              <div className="text-lg md:text-xl font-serif font-semibold text-neutral-800 mb-1 tracking-wide">{item.stage}</div>
              <div className="text-xs text-neutral-500 mb-4">{item.time}</div>
              <div className="mb-4 text-sm text-neutral-700 text-center min-h-[48px]">{item.points[0]}<br/>{item.points[1]}</div>
              <div className="mb-4 text-xs text-rose-400 font-medium text-center">{item.stageMessage}</div>
              <div className="italic text-neutral-600 text-sm mb-4">“{item.testimonial.quote}”<br/><span className="text-xs text-neutral-400 not-italic">— {item.testimonial.author}</span></div>
              <a href="/products/photonique-touch" className="inline-block bg-[#fadadd] text-rose-700 font-semibold rounded-full px-6 py-2 mt-auto shadow-md hover:bg-pink-200 transition-all duration-200 focus:ring-2 focus:ring-pink-200">Get Care•atin</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 