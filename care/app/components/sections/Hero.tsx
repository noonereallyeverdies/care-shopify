import { motion, useScroll, useTransform } from "framer-motion"
import { Link } from "@remix-run/react"
import { useState, useEffect, useRef } from "react"
import type { HomepageProduct } from '~/routes/($locale)._index';
import { ArrowRight } from "lucide-react";
import { AnimatePresence } from "framer-motion"
import { ProductNameFormatter, ProductNameVariant } from "~/components/Shared/ProductNameFormatter";
import './HeroLuxury.css';

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
const IMAGE_URL_3 = '/images/PRODUCTPHOTOT.webp';
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
  
  // Reference for scroll animations
  const heroRef = useRef<HTMLElement>(null);
  
  // Reference for video element to control playback
  const videoRef = useRef<HTMLVideoElement>(null);
  
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
  
  // Simple effect for visibility and video control
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    
    // Set up IntersectionObserver for video playback - restore auto-play logic
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (videoRef.current) { 
          if (entry.isIntersecting) {
            videoRef.current.play().catch(e => console.error("Error playing video on intersection:", e));
          } else {
            videoRef.current.pause();
          }
        }
      });
    }, options);
    
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    
    return () => {
      clearTimeout(timer);
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []); // Revert to empty dependency array if isVideoPlaying state is removed

  // Null check
  if (!product) {
    console.error('Hero component received null product');
    return (
      <section className="relative w-full min-h-[50vh] bg-contrast flex items-center justify-center">
        <div className="text-primary p-8 bg-white/80 rounded-lg shadow-lg">
          <h2 className="text-xl font-medium mb-2">Product Not Available</h2>
          <p>We're unable to load the product information at this time.</p>
          <Link to="/collections/all" className="mt-4 inline-block text-rose-500 font-medium">
            View All Products
          </Link>
        </div>
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
      className="relative min-h-[90vh] flex items-center justify-start text-left overflow-hidden"
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
          preload="auto"
          poster="/images/hero-bg.jpg" // Fallback image while video loads
          onError={(e) => {
            console.error('Video error:', e);
            // Show fallback image on error
            const videoElement = e.currentTarget;
            videoElement.style.display = 'none';
            const fallbackImage = videoElement.parentElement?.querySelector('img');
            if (fallbackImage) {
              fallbackImage.style.display = 'block';
            }
          }}
        >
          <source src="/videos/hair-homepage.mp4" type="video/mp4" />
          <source src="/videos/hair-homepage.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        {/* Dedicated fallback image outside video tag - hide it if video is intended to autoplay and poster works */}
        <img 
          src="/images/hero-bg.jpg" 
          alt="Beautiful hair illuminated by red light" 
          className={`absolute inset-0 w-full h-full object-cover hidden`} // Keep hidden if relying on video poster & autoplay
        />
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30 z-10"></div>
        
        {/* Editorial film grain overlay */}
        <div className="editorial-image-grain"></div>
      </div>

      {/* Hero Content with Split Layout */}
      <div className="container relative z-20 py-20 md:py-32">
        {/* Text Content */}
        <div className="max-w-xl mx-auto text-center">
          <motion.h1 
            className="brand-heading heading-xl mb-6 text-white"
            style={{ y: headingY }}
          >
            Restore Your Hair & Confidence with Proven Technology
          </motion.h1>
          
          <motion.p 
            className="brand-body text-feature text-white/80 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ opacity: textOpacity }}
          >
            Our clinically validated red light technology transforms thinning 
            hair into thicker, fuller hair you'll love showing off—with visible 
            results in just 90 days.
          </motion.p>
          
          {/* Adding product visualization to replace the removed image */}
          <motion.div 
            className="relative mx-auto mt-8 mb-10 w-64 h-64"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {/* Abstract light therapy visualization */}
            <div className="absolute inset-0 rounded-full bg-rose-500/20 animate-pulse"></div>
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-rose-500/30 animate-pulse" 
              style={{ animationDelay: '0.5s' }}
            ></div>
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-rose-500/40 animate-pulse" 
              style={{ animationDelay: '1s' }}
            ></div>
            
            {/* Simplified product silhouette */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-24 bg-white rounded-lg shadow-lg"></div>
          </motion.div>
          
          {/* Statistics - Enhanced with better visual hierarchy */}
          <div className="mb-8 bg-black/30 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="heading-md text-white mb-4">clinical results</h3>
            
            <div className="flex justify-between mb-3">
              <span className="brand-body text-sm text-white/70">hair density</span>
              <span className="brand-heading text-sm font-medium text-rose-300">+76%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-rose-500 rounded-full" style={{width: '76%'}}></div>
            </div>
            
            <div className="flex justify-between mb-3">
              <span className="brand-body text-sm text-white/70">hair diameter</span>
              <span className="brand-heading text-sm font-medium text-rose-300">+65%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-rose-500 rounded-full" style={{width: '65%'}}></div>
            </div>
            
            <div className="flex justify-between mb-3">
              <span className="brand-body text-sm text-white/70">follicle activation</span>
              <span className="brand-heading text-sm font-medium text-rose-300">+82%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-rose-500 rounded-full" style={{width: '82%'}}></div>
            </div>
          </div>
          
          {/* Single Strong CTA Button */}
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="text-center mb-3">
              <span className="text-sm text-rose-300 font-medium inline-flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-rose-400 mr-2 animate-pulse"></span>
                Limited spots available this month
              </span>
            </div>
            
            <Link
              to={`/products/${product?.handle || 'photonique-touch'}`}
              className="bg-rose-500 hover:bg-rose-600 text-white px-10 py-4 rounded-full font-medium shadow-lg transition-all hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 text-center text-lg"
            >
              Start Your Transformation Today
              <ArrowRight size={18} className="ml-1" />
            </Link>
            
            <div className="flex flex-wrap gap-4 justify-center mt-4">
              <div className="flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg text-white/90">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-300 mr-2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span className="text-sm">60-Day Guarantee</span>
              </div>
              <div className="flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg text-white/90">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-300 mr-2">
                  <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                  <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                  <line x1="12" y1="20" x2="12" y2="20"></line>
                </svg>
                <span className="text-sm">Free Shipping</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle wavelength visualization */}
      <div className="hidden lg:block absolute -bottom-24 left-0 right-0 h-48 opacity-30">
        <div className="h-full bg-gradient-to-r from-rose-500/20 via-transparent to-rose-500/20"></div>
      </div>

      {/* Expert Quote */}
      <div className="absolute bottom-8 left-0 right-0 z-20 pointer-events-none">
        <div className="container mx-auto px-4">
          <div className="max-w-md ml-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 text-neutral-800 pointer-events-auto">
            <p className="italic text-neutral-600 mb-2">
              "The earlier you act, the more follicles you save from permanent miniaturization."
            </p>
            <p className="text-sm font-medium">Dr. Karen Hansen, Trichologist</p>
          </div>
        </div>
      </div>

      {/* Removed urgency indicators and social proof notifications */}
    </section>
  );
}