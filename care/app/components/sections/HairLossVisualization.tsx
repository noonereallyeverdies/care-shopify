import React, { useEffect, useState, useRef } from 'react';
import { motion, useViewportScroll, useTransform, useScroll } from 'framer-motion';
import { ArrowRight, AlertTriangle, TrendingDown, Clock, Zap, Waves, Droplet, Info, CheckCircle, User, ExternalLink, ChevronDown, ChevronUp, BarChart } from 'lucide-react';
import { ClientOnly } from '~/components/utility/ClientOnly';
import { Link } from '@remix-run/react';

// Enhanced timeline data with social proof and more emotional triggers
const timeline = [
  {
    stage: 'Early Signs',
    time: 'First ~30 Days',
    points: ['Slight increase in shedding', 'Hair feels less dense/vibrant'],
    opportunity: 'Early action = best results.',
    success: '93% saw improvement',
    testimonial: {
      quote: 'I caught the signs early and my hair never thinned further.',
      author: 'Michael, 34',
    },
    icon: Clock,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    ctaText: 'Start Prevention',
    hairLossImg: '/images/hairloss/early-stage.png',
  },
  {
    stage: 'Visible Changes',
    time: 'Around ~90 Days',
    points: [
      'Noticeable thinning (part line, temples)',
      'Hair appears duller/brittle',
      'Confidence may waver',
    ],
    opportunity: 'Dormant follicles still highly responsive.',
    success: '78% experienced regrowth',
    testimonial: {
      quote: 'Within months, my confidence and hair were coming back.',
      author: 'Sarah, 41',
    },
    icon: TrendingDown,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    ctaText: 'Act Now',
    hairLossImg: '/images/hairloss/visible-stage.png',
  },
  {
    stage: 'Later Stages',
    time: 'Beyond ~180 Days',
    points: [
      'Recession more pronounced',
      'Follicle health declines',
      'Self-consciousness increases',
    ],
    opportunity: 'Consistent care maximizes potential.',
    success: '62% still saw improvement',
    testimonial: {
      quote: 'Careatin helped restore hair I thought was lost forever.',
      author: 'David, 47',
    },
    icon: AlertTriangle,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    ctaText: 'Maximize Recovery',
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
    
    const unsubscribe = counterValue.onChange(latest => {
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
  const stats = [
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
  const dailyLoss = [
    { day: 7, consequence: "Increased shedding becomes noticeable to you" },
    { day: 30, consequence: "Friends start to notice thinning at crown" },
    { day: 90, consequence: "Visible scalp areas expand by up to 23%" },
    { day: 180, consequence: "Recovery time doubles from this point" }
  ];
  
  try {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative" ref={containerRef}>
        {/* Left column - Stats */}
        <div className="bg-white text-primary rounded-lg shadow-xl p-8 border-t-4 border-rose-500">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-3">The True Cost of Waiting</h2>
            <p className="text-neutral-700 mb-6">Every day without treatment means <span className="font-semibold text-rose-600">permanent loss</span> of your hair's potential.</p>
            
            <div className={`text-6xl font-bold text-center mb-3 tabular-nums transition-all duration-300 ${isHighlighted ? 'text-rose-600 scale-105' : 'text-accent'}`}>
              {count.toLocaleString()}
            </div>
            <div className="text-center">
              <div className="font-medium text-neutral-800">Hair strands lost</div>
              <div className="text-sm text-rose-600 font-medium">This damage cannot be undone</div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full h-3 bg-neutral-200 rounded-full mb-6">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-rose-600 rounded-full transition-all duration-1000 relative"
              style={{ width: `${(count / targetCount) * 100}%` }}
            >
              {/* Pulsing indicator at the end of the bar */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-rose-600 rounded-full animate-ping opacity-75"></div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-rose-600 rounded-full"></div>
            </div>
          </div>
          
          {/* Stats grid with improved contrast and emotional impact */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-neutral-50 rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="text-lg font-semibold text-rose-600">{stat.value}</div>
                <div className="text-xs text-neutral-700 font-medium mb-2">{stat.label}</div>
                <div className="text-xs text-neutral-500 italic">{stat.impact}</div>
              </div>
            ))}
          </div>
          
          {/* Timeline of consequences - NEW COMPONENT */}
          <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 mb-6">
            <div className="flex items-center mb-3 text-rose-600">
              <Clock size={16} className="mr-2" />
              <h3 className="font-medium text-sm">Consequences of Waiting</h3>
            </div>
            <div className="space-y-2">
              {dailyLoss.map((item, index) => (
                <div key={index} className="flex items-baseline">
                  <div className="w-16 font-medium text-neutral-800 text-sm">Day {item.day}:</div>
                  <div className="text-xs text-neutral-700">{item.consequence}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Call to action with emotional trigger */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-4"
          >
            <Link 
              to="/products/photonique-touch" 
              className="flex items-center justify-center w-full bg-rose-600 hover:bg-rose-700 text-white py-3 px-4 rounded-md font-medium transition-colors duration-200"
            >
              Stop the loss today
              <ArrowRight size={16} className="ml-2" />
            </Link>
            <p className="text-xs text-center text-neutral-500 mt-2">
              Over 10,000 customers wish they had started sooner
            </p>
          </motion.div>
        </div>
        
        {/* Right column - Visualization */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-full aspect-square max-w-md mx-auto">
            {/* Hair loss emotional context - NEW COMPONENT */}
            <motion.div 
              className="absolute -top-12 right-0 bg-neutral-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm flex items-center z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <AlertTriangle size={14} className="mr-2 text-amber-400" />
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
                <div className="bg-black/70 backdrop-blur-sm p-4 rounded-lg text-white text-center max-w-[80%]">
                  <h4 className="font-medium mb-1">This is happening right now</h4>
                  <p className="text-xs text-white/80">Your hair doesn't wait for you to decide</p>
                </div>
              </motion.div>
            </div>
            
            {/* Trend indicator */}
            <motion.div 
              className="absolute -bottom-4 -right-4 bg-rose-600 text-white p-3 rounded-full shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <TrendingDown size={24} />
            </motion.div>
            
            {/* Black button at the bottom with stronger emotional trigger */}
            <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
              <motion.button
                className="bg-black text-white px-5 py-3 rounded-md text-sm font-medium shadow-lg hover:bg-neutral-800 transition-colors duration-200"
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
      className="max-w-2xl mx-auto my-8 bg-neutral-50 p-5 rounded-lg border border-neutral-200 shadow-sm"
      initial={{opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      transition={{duration: 0.6}}
    >
      <div className="flex items-start">
        <div className="w-14 h-14 rounded-full bg-gray-200 flex-shrink-0 mr-3 overflow-hidden">
          <img
            src="/images/experts/dr-hansen.jpg"
            alt="Dr. Hansen"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-neutral-700 italic mb-2 text-sm">
            &quot;Hair loss follows a predictable pattern. The earlier you act, the more follicles you save from permanent miniaturization.&quot;
          </p>
          <p className="text-neutral-500 text-xs flex items-center">
            <User size={14} className="mr-1" />
            Dr. Karen Hansen, Trichologist
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Timeline stage component with expanded functionality
function TimelineStage({item, index, setExpandedIndex, expandedIndex}) {
  const isExpanded = expandedIndex === index;
  
  return (
    <motion.div
      key={index}
      className={`p-5 rounded-xl shadow-sm border-l-4 ${item.borderColor} ${item.bgColor} relative overflow-hidden`}
      initial={{opacity: 0, y: 30}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      transition={{duration: 0.5, delay: index * 0.15}}
    >
      {/* Microscopic follicle background illustration */}
      <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
        <div className="w-40 h-40 rounded-full border-4 border-dashed border-current"></div>
      </div>
      
      <div className="flex items-center mb-3">
        <item.icon className={`w-5 h-5 mr-2 ${item.color}`} />
        <div>
          <h3 className={`text-lg font-medium ${item.color}`}>{item.stage}</h3>
          <p className="text-xs text-neutral-500 uppercase tracking-wide">
            {item.time}
          </p>
        </div>
      </div>
      
      {/* Visual hair representation */}
      <div className="mb-3 relative h-16 border border-neutral-200 rounded bg-white flex items-center justify-center">
        <div className="text-2xs text-neutral-400 absolute top-1 left-2">
          Hair density
        </div>
        {item.hairLossImg ? (
          <img 
            src={item.hairLossImg}
            alt={`Hair in ${item.stage}`}
            className="h-full object-contain"
          />
        ) : (
          <div className={`text-xs ${item.color}`}>
            Hair visualization
          </div>
        )}
      </div>
      
      <ul className="list-disc list-inside space-y-1 text-neutral-700 text-xs mb-3 pl-1">
        {item.points.map((point, pIndex) => (
          <li key={pIndex}>{point}</li>
        ))}
      </ul>
      
      <div
        className={`mt-3 pt-3 border-t ${item.borderColor} border-opacity-50 flex items-start`}
      >
        <Info size={14} className={`mr-2 mt-0.5 flex-shrink-0 ${item.color}`} />
        <p className={`text-xs font-medium ${item.color}`}>{item.opportunity}</p>
      </div>
      
      {/* Success statistics */}
      <div className={`flex items-center mt-2 mb-2`}>
        <BarChart size={12} className={`mr-1 ${item.color}`} />
        <p className="text-2xs font-medium text-neutral-700">{item.success}</p>
      </div>
      
      {/* Expandable section for testimonial */}
      <div className="mt-3 flex justify-between items-center">
        <div className="text-2xs italic text-neutral-500">
          {!isExpanded ? `"${item.testimonial.quote.substring(0, 30)}..."` : ''}
        </div>
        <button 
          onClick={() => setExpandedIndex(isExpanded ? null : index)}
          className="text-2xs ml-1 flex items-center text-neutral-500 hover:text-neutral-700 transition-colors"
        >
          {isExpanded ? 'Hide' : 'Read more'}
          {isExpanded ? <ChevronUp size={12} className="ml-1" /> : <ChevronDown size={12} className="ml-1" />}
        </button>
      </div>
        
      {isExpanded && (
        <motion.div
          initial={{opacity: 0, height: 0}}
          animate={{opacity: 1, height: 'auto'}}
          exit={{opacity: 0, height: 0}}
          transition={{duration: 0.3}}
          className="mt-2 bg-white p-2 rounded border border-neutral-200 text-2xs"
        >
          <p className="italic text-neutral-600">
            &quot;{item.testimonial.quote}&quot;
          </p>
          <p className="text-neutral-500 mt-1">
            — {item.testimonial.author}
          </p>
        </motion.div>
      )}
      
      {/* CTA button */}
      <motion.div
        className="mt-3"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 0.5 + index * 0.2}}
      >
        <Link
          to="/products/hair-renewal-system"
          className={`inline-flex items-center justify-center w-full py-1.5 px-3 rounded text-2xs bg-gradient-to-r ${
            item.stage === 'Early Signs'
              ? 'from-emerald-500 to-emerald-600'
              : item.stage === 'Visible Changes'
              ? 'from-amber-500 to-amber-600'
              : 'from-purple-500 to-purple-600'
          } text-white font-medium hover:shadow-md transition-shadow duration-300`}
        >
          {item.ctaText}
          <ArrowRight size={10} className="ml-1" />
        </Link>
      </motion.div>
    </motion.div>
  );
}

// Main exported component
export function HairLossVisualization() {
  const [activeTimeframe, setActiveTimeframe] = useState(0);
  const [showLossAversion, setShowLossAversion] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const sectionRef = useRef(null);
  
  // Updated scroll effect using useScroll
  const {scrollYProgress} = useScroll({target: sectionRef});
  // Adjust input range for scrollYProgress (0 to 1)
  const y = useTransform(scrollYProgress, [0, 0.1], [0, -50]);
  
  useEffect(() => {
    // Rotate through timeframes every 5 seconds
    const interval = setInterval(() => {
      setActiveTimeframe((prev) => (prev + 1) % timeframes.length);
    }, 5000);
    
    // Show loss aversion trigger after 3 seconds
    const timer = setTimeout(() => {
      setShowLossAversion(true);
    }, 3000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);
  
  return (
    <section
      ref={sectionRef}
      className="bg-white py-12 md:py-20 overflow-hidden relative"
      id="hair-journey-timeline"
    >
      {/* Subtle background pattern - Apply parallax effect here */}
      <motion.div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{y}} // Apply the transform here
      >
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-gray-900 to-transparent opacity-5"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-900 to-transparent opacity-5"></div>
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gray-900 rounded-full opacity-10"
            style={{
              width: Math.random() * 300 + 50 + 'px',
              height: Math.random() * 300 + 50 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              transform: 'translate(-50%, -50%)',
            }}
          ></div>
        ))}
      </motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="mb-12 max-w-3xl mx-auto text-center"
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-100px'}}
          transition={{duration: 0.6}}
        >
          <h2 className="text-3xl md:text-4xl text-gray-900 font-light mb-3">
            Your Hair&apos;s Journey: Act Now
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            See the stages and critical window to act before it&apos;s too late.
          </p>
          
          {/* Loss aversion micro-trigger */}
          {showLossAversion && (
            <motion.p
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              className="text-rose-500 text-sm font-medium mt-3 italic"
            >
              Every day you wait is more hair lost
            </motion.p>
          )}
        </motion.div>
        
        {/* Progress indicator */}
        <div className="max-w-3xl mx-auto mb-8 relative">
          <div className="h-1 bg-neutral-200 relative overflow-hidden rounded-full">
            <div className="absolute inset-0 flex">
              <div className="w-1/3 bg-orange-500"></div>
              <div className="w-1/3 bg-red-500"></div>
              <div className="w-1/3 bg-purple-500"></div>
            </div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-neutral-500">
            <div>Early Signs</div>
            <div>Visible Changes</div>
            <div>Later Stages</div>
          </div>
        </div>
        
        {/* Expert quote for authority */}
        <ExpertQuote />
        
        {/* Timeline cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {timeline.map((item, index) => (
            <TimelineStage
              key={index}
              item={item}
              index={index}
              expandedIndex={expandedIndex}
              setExpandedIndex={setExpandedIndex}
            />
          ))}
        </div>
        
        <motion.div
          className="text-center mt-12 max-w-xl mx-auto"
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{delay: 0.5, duration: 0.5}}
        >
          <p className="text-neutral-700 italic mb-5 text-sm">
            This progression isn&apos;t inevitable. Our clinically-proven formula targets all stages with scientifically-backed ingredients.
          </p>
          <Link
            to="/products/hair-renewal-system"
            className="inline-flex items-center justify-center py-2 px-6 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-medium hover:shadow-lg transition-shadow duration-300"
          >
            Find Your Solution
            <ArrowRight size={14} className="ml-1" />
          </Link>
        </motion.div>
        
        {/* Microscopic follicle imagery - combined into one section */}
        <div className="mt-12 bg-neutral-50 p-5 rounded-lg border border-neutral-200 max-w-3xl mx-auto">
          <h3 className="text-base font-medium text-neutral-800 mb-3 text-center">
            Clinical Results by Stage
          </h3>
          <div className="space-y-3 mb-5">
            <div className="flex justify-between items-center">
              <div className="w-1/4 text-xs font-medium text-orange-500">
                Early Signs
              </div>
              <div className="w-2/4 bg-neutral-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 rounded-full"
                  style={{width: '93%'}}
                ></div>
              </div>
              <div className="w-1/4 text-right text-xs font-medium text-neutral-700">93% success</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-1/4 text-xs font-medium text-red-500">
                Visible Changes
              </div>
              <div className="w-2/4 bg-neutral-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 rounded-full"
                  style={{width: '78%'}}
                ></div>
              </div>
              <div className="w-1/4 text-right text-xs font-medium text-neutral-700">78% success</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-1/4 text-xs font-medium text-purple-500">
                Later Stages
              </div>
              <div className="w-2/4 bg-neutral-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 rounded-full"
                  style={{width: '62%'}}
                ></div>
              </div>
              <div className="w-1/4 text-right text-xs font-medium text-neutral-700">62% success</div>
            </div>
          </div>
          <p className="text-2xs text-neutral-500 text-center">
            *Percentage of users reporting significant improvement after 90 days
          </p>
        </div>
      </div>
    </section>
  );
} 