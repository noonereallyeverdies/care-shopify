import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Star,
  Award,
  TrendingUp,
  Quote,
  Users,
  UserCheck,
  LucideProps,
} from 'lucide-react';

// Import sub-components
import { StatisticItem } from './StatisticItem';
import { AnimatedCounter } from './AnimatedCounter';
import { FeaturedTestimonialCard } from './FeaturedTestimonialCard';

// Define a more specific type for the testimonial data, matching FeaturedTestimonialCard
interface TestimonialData {
  quote: string;
  author: string;
  age?: number | null;
  location?: string | null;
  timeUsing: string;
  background: string;
  beforeImg: string;
  afterImg: string;
  ratingStars: number;
}

interface StatisticInfo {
  value: string;
  label: string;
  icon: React.ElementType<LucideProps>;
}

export function SocialProofBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentRef, inView] = useInView({
    triggerOnce: false, // Allow animations to re-trigger if scrolled out and back in
    threshold: 0.2, // Lower threshold for earlier trigger
  });
  
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const MAIN_SUCCESS_PERCENTAGE = 93; // Define as a constant
  
  // Parallax effect for background accents
  const { scrollYProgress } = useScroll({
    target: containerRef, // Use the main container for overall parallax calculation
    offset: ['start end', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.1, 1, 1, 0.1]); // Adjusted opacity for subtle effect
  
  // Rotate featured testimonials
  useEffect(() => {
    // No need to check inView here, as FeaturedTestimonialCard has its own animation trigger.
    // The timer should run as long as the banner itself is potentially visible.
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % enhancedTestimonials.length);
    }, 6000); // Increased interval for better readability
    return () => clearInterval(timer);
  }, []); // Empty dependency array, runs once on mount
  
  const statistics: StatisticInfo[] = [
    { value: "10,000+", label: "Happy Customers", icon: Users },
    { value: "87%", label: "See Results by Week 8", icon: TrendingUp },
    { value: "4.9/5", label: "Average Rating", icon: Star },
    { value: "Clinically Proven", label: "Effective Formula", icon: Award } // Updated text
  ];
  
  const enhancedTestimonials: TestimonialData[] = [
    {
      quote: "The difference in my part line and overall thickness was undeniable. I finally felt confident enough to wear my hair down again after years of hiding it.",
      author: "Elise M.",
      timeUsing: "4 months",
      background: "Verified Buyer",
      beforeImg: "/images/testimonials/elise-m-before.jpg", // Placeholder updated
      afterImg: "/images/testimonials/elise-m-after.jpg",   // Placeholder updated
      ratingStars: 5
    },
    {
      quote: "I tried everything. Nothing worked until care•atin. My shedding reduced significantly in just 6 weeks. Truly life-changing!",
      author: "Jennifer K.",
      age: 38,
      location: "Boston, MA",
      timeUsing: "3 months",
      background: "Stress-induced thinning",
      beforeImg: "/images/testimonials/jennifer-k-before.jpg", // Actual image path
      afterImg: "/images/testimonials/jennifer-k-after.jpg",   // Actual image path
      ratingStars: 5
    },
    {
      quote: "After 3 months, my hairdresser asked what I was doing differently. My hair really was getting thicker and healthier! So grateful for this product.",
      author: "Sarah T.",
      timeUsing: "5 months",
      background: "Verified Buyer",
      beforeImg: "/images/testimonials/sarah-t-before.jpg",   // Placeholder updated
      afterImg: "/images/testimonials/sarah-t-after.jpg",    // Placeholder updated
      ratingStars: 5
    },
    // Add more diverse testimonials if available
  ];

  const currentFeaturedTestimonial = enhancedTestimonials[activeTestimonial];

  return (
    <motion.section // Changed to section for semantic HTML
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50"
      initial={{ opacity: 0 }} // Simplified initial animation for the section itself
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Floating background elements - subtle and more abstract */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity: opacity }} // Use transformed opacity for accents
      >
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-rose-200/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-pink-200/30 rounded-full blur-3xl animate-pulse-slower"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-pink-100/40 rounded-full blur-2xl animate-pulse-slowest transform -translate-x-1/2 -translate-y-1/2"></div>
      </motion.div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={contentRef} // This ref triggers inView for content animations
          className="text-center max-w-5xl mx-auto"
        >
          <div className="inline-block mb-4 sm:mb-6">
            <div className="flex items-center justify-center space-x-2 text-rose-600">
              <UserCheck size={20} strokeWidth={2} />
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">Real Customers, Real Results</span>
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-light mb-10 sm:mb-16 text-charcoal-800 leading-tight">
            Join Thousands Experiencing <span className="font-medium text-rose-600">Visibly Fuller Hair</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20">
            {statistics.map((stat, index) => (
              <StatisticItem 
                key={index} 
                icon={stat.icon} 
                value={stat.value} 
                label={stat.label} 
                index={index} 
                inView={inView} 
              />
            ))}
          </div>
          
          <div className="mb-16 sm:mb-20">
            <AnimatedCounter 
              endValue={MAIN_SUCCESS_PERCENTAGE} 
              inView={inView} 
              className="text-7xl sm:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-400 mb-2 sm:mb-3 block"
              duration={2500}
            />
            <p className="text-lg sm:text-xl text-neutral-700 max-w-2xl mx-auto leading-relaxed">
              of users reported visible improvements in hair thickness and reduced shedding after just 90 days of consistent use.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-medium text-charcoal-700 mb-4 sm:mb-6">
              Hear Their Stories
            </h3>
            <div className="relative h-[550px] sm:h-[600px] md:h-[500px]"> 
              <AnimatePresence initial={false} mode='wait'>
                <FeaturedTestimonialCard 
                  key={activeTestimonial} 
                  testimonial={currentFeaturedTestimonial} 
                />
              </AnimatePresence>
            </div>
            
            {/* Navigation Dots for Testimonials */}
            <div className="flex justify-center space-x-2 mt-6 sm:mt-8">
              {enhancedTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ease-in-out 
                              ${activeTestimonial === index ? 'bg-rose-500 scale-125' : 'bg-rose-200 hover:bg-rose-300'}`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}

// Add some keyframes for subtle background animations if not already globally defined
// For example, in your global CSS or a style tag in this component (less ideal for global styles):
/*
@keyframes pulse-slow {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.03); }
}
@keyframes pulse-slower {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.02); }
}
@keyframes pulse-slowest {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.2; transform: scale(1.01); }
}
.animate-pulse-slow {
  animation: pulse-slow 8s infinite ease-in-out;
}
.animate-pulse-slower {
  animation: pulse-slower 10s infinite ease-in-out;
}
.animate-pulse-slowest {
  animation: pulse-slowest 12s infinite ease-in-out;
}
*/ 