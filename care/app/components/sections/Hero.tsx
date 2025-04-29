import { motion } from "framer-motion"
import { Link } from "@remix-run/react"
import { useState, useEffect } from "react"
import type { HomepageProduct } from '~/routes/($locale)._index';
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "~/components/ui/buttons/Button";

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

export function Hero({ product }: HeroProps) {
  // State for animated statistics
  const [isVisible, setIsVisible] = useState(false);
  
  // Timeframe visibility states
  const [showTimeframe, setShowTimeframe] = useState(0);
  // Hover state for CTA button
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);
  
  // Update timeframe every 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    
    const timeframeInterval = setInterval(() => {
      setShowTimeframe(prev => (prev + 1) % 3);
    }, 3000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(timeframeInterval);
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
      className="relative min-h-[90vh] flex items-end justify-start text-left overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          className="object-cover w-full h-full"
          autoPlay 
          loop 
          muted 
          playsInline
          src="/hair-homepage.mp4"
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
        >
          {/* Content block */}
          <div className="mb-6 md:mb-8">
            <h5 className="text-base md:text-lg font-light uppercase tracking-widest mb-3 md:mb-4 text-white/80 brand-body">
              transform your hair journey today
            </h5>
            <h1 className="mb-4 md:mb-6 font-light text-4xl sm:text-5xl md:text-6xl tracking-wide text-white brand-heading">
              revive <span className="italic">your</span> roots, reclaim <span className="italic">your</span> confidence
            </h1>
            <p
              className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl leading-relaxed mb-5 md:mb-8 font-light brand-body"
            >
              Are you tired of seeing your hair thin before your eyes? Your journey to thicker, fuller hair starts now. Our clinically-proven red light technology awakens your dormant follicles at the cellular level, delivering visible results you can see and feel.
            </p>
            
            {/* Animated timeframes */}
            <div className="mt-4 mb-6 md:mb-8">
              <motion.div 
                className="flex items-center space-x-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {timelineData.map((item, index) => (
                  <motion.div 
                    key={index}
                    className={`transition-all duration-500 ${showTimeframe === index ? 'opacity-100 scale-105' : 'opacity-50 scale-95'}`}
                  >
                    <div className="flex items-baseline">
                      <span className="text-rose-300 text-3xl sm:text-4xl md:text-5xl font-light mr-1 sm:mr-2">{item.days}</span>
                      <span className="text-white/80 text-xs sm:text-sm uppercase tracking-wide">days</span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/70 tracking-wide">{item.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            <div className="space-y-2">
              <p className="text-lg text-white/90 font-light">
                <span className="font-medium">Ready to transform your hair story?</span> Every day matters.
              </p>
              <ul className="text-sm space-y-1 text-white/80">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-rose-300 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Patented technology with 3 clinical studies</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-rose-300 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Used by 10,000+ customers who've transformed their hair</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Button - Keep the existing motion animations but update the text */}
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <Link 
              to={product ? `/products/${product.handle}` : '/products/care-atin-device'} 
              className={`
                flex items-center justify-center bg-rose-500 text-white px-6 py-3.5 rounded-full
                transition-all duration-200 text-base md:text-lg font-medium
                hover:bg-rose-600 hover:shadow-lg
                ${isHoveringCTA ? 'shadow-lg shadow-rose-500/20' : 'shadow-md shadow-rose-500/10'}
              `}
              onMouseEnter={() => setIsHoveringCTA(true)}
              onMouseLeave={() => setIsHoveringCTA(false)}
            >
              Start Your Transformation Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <ButtonLink 
              to="/pages/science" 
              variant="outline"
              className="flex items-center border-white/60 text-white bg-black/30 backdrop-blur-sm hover:border-white"
            >
              See The Science Behind Your Results
            </ButtonLink>
          </motion.div>

          <motion.div 
            className="mt-8 md:mt-10 bg-black/30 backdrop-blur-sm py-2.5 px-4 sm:py-3 sm:px-5 rounded-full inline-flex items-center border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <p className="text-xs sm:text-sm font-light">
              <span className="text-rose-300 font-normal">93% of users</span> reported renewed confidence after just 12 weeks
            </p>
          </motion.div>
          
          {/* Limited time offer capsule - Loss aversion trigger */}
          <motion.div 
            className="mt-3 sm:mt-4 bg-rose-500/20 backdrop-blur-sm py-2 px-3 sm:py-2 sm:px-4 rounded-full inline-flex items-center border border-rose-500/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <p className="text-xs sm:text-sm font-medium text-rose-200">
              Risk-free: Try for 60 days with our money-back guarantee
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}