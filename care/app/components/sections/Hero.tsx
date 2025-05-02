import { motion, useScroll, useTransform } from "framer-motion"
import { Link } from "@remix-run/react"
import { useState, useEffect, useRef } from "react"
import type { HomepageProduct } from '~/routes/($locale)._index';
import { ArrowRight, Clock, Users } from "lucide-react";
import { ButtonLink } from "~/components/ui/buttons/Button";
import { AnimatePresence } from "framer-motion"

// Original hardcoded images - We'll keep the structure but replace URLs later
const heroImagesData = [
  { depth: 0.5, position: "top-[15%] left-[8%]", size: "w-24 h-24 md:w-32 md:h-32" },
  { depth: 1,   position: "top-[12%] right-[12%]", size: "w-32 h-32 md:w-40 md:h-40" },
  { depth: 2,   position: "top-[45%] left-[15%]", size: "w-28 h-28 md:w-36 md:h-36" },
  { depth: 1,   position: "top-[35%] right-[8%]", size: "w-24 h-24 md:w-32 md:h-32" },
  { depth: 0.5, position: "bottom-[20%] left-[12%]", size: "w-32 h-32 md:w-40 md:h-40" }, // Adjusted depth
  { depth: 1.5, position: "bottom-[25%] right-[15%]", size: "w-28 h-28 md:w-36 md:h-36" }, // Adjusted depth
];

// Your specified image URLs
const IMAGE_URL_1 = '/images/prettyhair.jpg';
const IMAGE_URL_2 = '/images/Subject 4.png';
// Add constants for the other unique images
const IMAGE_URL_3 = '/images/PRODUCTPHOTOT.png';
const IMAGE_URL_4 = '/images/hair.jpg';
const IMAGE_URL_5 = '/images/model-shot.jpeg';

// Create an array of the unique image URLs
const uniqueHeroImageUrls = [
  IMAGE_URL_1,
  IMAGE_URL_2,
  IMAGE_URL_3,
  IMAGE_URL_4,
  IMAGE_URL_5,
];

// Use heroImagesData structure from incorrect version for floating images
const heroFloatingImagesData = [
  { x: '5%', y: '15%', size: '20vw', delay: 0, rotation: -3 },
  { x: '75%', y: '25%', size: '28vw', delay: 0.2, rotation: 2 },
  { x: '20%', y: '70%', size: '22vw', delay: 0.5, rotation: 1 },
  { x: '65%', y: '65%', size: '24vw', delay: 0.3, rotation: -2 },
  { x: '40%', y: '40%', size: '18vw', delay: 0.7, rotation: 3 },
];

// Use gridItems from incorrect version for background pattern
const gridItems = [
  { width: 'col-span-5', height: 'h-64', bgColor: 'bg-red-50/30' },
  { width: 'col-span-7', height: 'h-48', bgColor: 'bg-neutral-50/20' },
  { width: 'col-span-4', height: 'h-56', bgColor: 'bg-neutral-50/30' },
  { width: 'col-span-8', height: 'h-40', bgColor: 'bg-red-50/20' },
];

interface HeroProps {
  product: HomepageProduct | null;
}

// Define standard fade-in-up variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

// Define stagger container variants
const staggerContainer = {
  hidden: {}, // Can be empty
  visible: {
    transition: {
      staggerChildren: 0.2, // Adjust stagger timing as needed
      delayChildren: 0.5, // Delay after main content animation
    }
  }
};

export function Hero({ product }: HeroProps) {
  // State for animated statistics
  const [isVisible, setIsVisible] = useState(false);
  
  // Timeframe visibility states
  const [showTimeframe, setShowTimeframe] = useState(0);
  // Hover state for CTA button
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);
  
  // Reference for scroll animations
  const heroRef = useRef<HTMLElement>(null);
  
  // Reference for video element to control playback
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Calculate days until the season ends (for urgency)
  const [daysUntilEnd, setDaysUntilEnd] = useState<number>(30);
  const [recentPurchase, setRecentPurchase] = useState<{name: string, location: string, time: number} | null>(null);
  
  // Show loss aversion trigger after delay
  const [showLossAversion, setShowLossAversion] = useState(false);
  
  // Get current season
  const getCurrentSeason = () => {
    const now = new Date();
    const month = now.getMonth();
    
    if (month >= 2 && month <= 4) return "Spring";
    if (month >= 5 && month <= 7) return "Summer";
    if (month >= 8 && month <= 10) return "Fall";
    return "Winter";
  };
  
  const currentSeason = getCurrentSeason();
  
  // Setup scroll-based animations
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Transform scroll progress for parallax effects
  const headingY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6]);
  
  // Update timeframe every 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    
    const timeframeInterval = setInterval(() => {
      setShowTimeframe(prev => (prev + 1) % 3);
    }, 3000);
    
    // Calculate days until end of season
    const now = new Date();
    const currentMonth = now.getMonth();
    let endOfSeasonMonth = 0;
    
    if (currentMonth >= 2 && currentMonth <= 4) {
      // Spring ends May 31
      endOfSeasonMonth = 5;
    } else if (currentMonth >= 5 && currentMonth <= 7) {
      // Summer ends August 31
      endOfSeasonMonth = 8;
    } else if (currentMonth >= 8 && currentMonth <= 10) {
      // Fall ends November 30
      endOfSeasonMonth = 11;
    } else {
      // Winter ends February 28/29
      endOfSeasonMonth = 2;
    }
    
    const endOfSeason = new Date(now.getFullYear(), endOfSeasonMonth, 0);
    const diffTime = endOfSeason.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    setDaysUntilEnd(diffDays);
    
    // Simulate recent purchases (for social proof)
    const purchaseNames = ["Sarah", "Michael", "Emma", "David", "Olivia", "James"];
    const locations = ["Boston", "Miami", "Seattle", "Austin", "Chicago", "Denver"];
    
    const showRecentPurchase = () => {
      const randomName = purchaseNames[Math.floor(Math.random() * purchaseNames.length)];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      const randomTime = Math.floor(Math.random() * 10) + 1;
      
      setRecentPurchase({
        name: randomName,
        location: randomLocation,
        time: randomTime
      });
      
      setTimeout(() => {
        setRecentPurchase(null);
      }, 4000);
    };
    
    const purchaseInterval = setInterval(showRecentPurchase, 8000);
    
    // First purchase notification appears after 5 seconds
    setTimeout(showRecentPurchase, 5000);
    
    // Show loss aversion trigger after 3 seconds
    const lossAversionTimer = setTimeout(() => {
      setShowLossAversion(true);
    }, 3000);
    
    // Set up IntersectionObserver for video playback
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play();
        } else if (videoRef.current) {
          videoRef.current.pause();
        }
      });
    }, options);
    
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    
    return () => {
      clearTimeout(timer);
      clearInterval(timeframeInterval);
      clearInterval(purchaseInterval);
      clearTimeout(lossAversionTimer);
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);
  
  // Null check
  if (!product) {
    return (
      <section className="relative w-full min-h-screen bg-contrast flex items-center justify-center">
        <div className="text-primary">Loading Hero...</div>
      </section>
    );
  }

  const featuredImage = product?.featuredImage
  const heroImageUrl = featuredImage?.url || '/images/prettyhair.jpg'; // Fallback image

  // Timeline data with more specific metrics
  const timelineData = [
    { days: 14, text: "to stronger, revitalized follicles" },
    { days: 30, text: "to 62% less daily shedding" },
    { days: 90, text: "to 28% increased hair density" }
  ];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[90vh] flex items-end justify-start text-left overflow-hidden"
    >
      {/* Video Background with optimized loading */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src="/hair-homepage.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10"></div>
      </div>

      {/* Main content container - positioned in lower left */}
      <div className="relative z-20 container mx-auto pb-20 px-4 sm:pb-28 sm:px-6 md:pb-36 md:px-12 text-white">
        <motion.div 
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ y: headingY, opacity: textOpacity }}
        >
          {/* Content block */}
          <div className="mb-6 md:mb-8">
            {/* Loss Aversion Trigger */}
            {showLossAversion && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700"
              >
                <Clock size={12} /> Limited spots for the {currentSeason} cohort!
              </motion.div>
            )}
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight lowercase leading-tight sm:leading-none md:leading-tight">
              Don't just stop hair loss. <br className="hidden sm:block" />
              <span className="text-primary">reverse it.</span>
            </h1>
            
            {/* New skepticism-addressing subheading */}
            <motion.p 
              className="text-white/80 italic mt-2 max-w-2xl mx-auto text-lg md:text-xl mb-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              "Unlike topical fixes that mask thinning, care•atin reactivates follicles at their root."
            </motion.p>
            
            <motion.p
              className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl leading-relaxed mb-5 md:mb-8 font-light brand-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Are you tired of seeing your hair thin before your eyes? Your journey to thicker, fuller hair starts now. Our clinically-proven red light technology awakens your dormant follicles at the cellular level, delivering visible results you can see and feel.
            </motion.p>
            
            {/* Animated Timeline Blocks */}
            <motion.div 
              className="mt-8 space-y-4"
              variants={staggerContainer} // Apply stagger container variants
              initial="hidden"
              animate="visible" // Animate when the component mounts (after delay)
            >
              {timelineData.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-3"
                  variants={fadeInUp} // Apply fade in up to each item
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <span className="text-xs font-bold">{item.days}</span>
                  </div>
                  <span className="text-sm text-white/90">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Enhanced CTA Button with improved hover effects */}
            <div className="mt-10">
              <motion.div 
                whileHover={{ scale: 1.03 }} 
                whileTap={{ scale: 0.98 }} 
                className="inline-block"
                onHoverStart={() => setIsHoveringCTA(true)}
                onHoverEnd={() => setIsHoveringCTA(false)}
              >
                <ButtonLink
                  to={`/products/${product.handle}`}
                  variant="primary"
                  size="lg"
                  className="shadow-lg"
                >
                  Shop Care•tin Device <ArrowRight size={18} className="ml-2" />
                </ButtonLink>
              </motion.div>
              
              {/* Hover state text */}
              <AnimatePresence>
                {isHoveringCTA && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 text-xs text-white/70"
                  >
                    90-day risk-free trial included
                  </motion.p>
                )}
              </AnimatePresence>
              {/* Secondary Inline Prompt */}
              <p className="mt-4 text-sm text-white/60">
                Or learn the science behind the results ↓
              </p>
            </div>
          </div>
          
          {/* Social proof stat */}
          <motion.div 
            className="flex items-center space-x-4 mt-8 md:mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-white/70" />
              <span className="text-white/70 text-sm">
                <span className="font-semibold">10,000+</span> satisfied customers
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-white/70" />
              <span className="text-white/70 text-sm">
                <span className="font-semibold">{daysUntilEnd} days</span> left in {currentSeason}
              </span>
            </div>
          </motion.div>
          
          {/* Recent purchase notification (social proof micro-interaction) */}
          <AnimatePresence>
            {recentPurchase && (
              <motion.div
                className="absolute bottom-6 right-6 z-30 flex items-center gap-3 rounded-lg bg-white/90 p-3 text-xs text-neutral-700 shadow-md backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Users size={16} className="text-primary flex-shrink-0" />
                <div>
                  <strong>{recentPurchase.name}</strong> in {recentPurchase.location} just purchased!
                  <span className="ml-1 text-neutral-500">({recentPurchase.time} min ago)</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}