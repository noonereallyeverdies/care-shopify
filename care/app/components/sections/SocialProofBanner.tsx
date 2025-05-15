import React, { useEffect, useRef, useState, Suspense, lazy, ReactNode } from 'react';
// Dynamic imports for better code splitting
const motion = {
  div: lazy(() => import('framer-motion').then(mod => ({ default: mod.motion.div }))),
  button: lazy(() => import('framer-motion').then(mod => ({ default: mod.motion.button }))),
};
import { useInView } from 'react-intersection-observer';
import { Star, Award, TrendingUp, Quote, Users, UserCheck } from 'lucide-react';

// Create a properly typed fallback component for lazy loaded motion components
interface MotionFallbackProps {
  children?: ReactNode;
  className?: string;
}

const MotionFallback: React.FC<MotionFallbackProps> = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);

export function SocialProofBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });
  
  const [count, setCount] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // Only load framer-motion if the component is in view or about to be in view
  const [loadMotion, setLoadMotion] = useState(false);
  
  useEffect(() => {
    // Load motion components as the user scrolls closer
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting || entries[0].boundingClientRect.top < window.innerHeight * 1.5) {
          setLoadMotion(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50% 0px' }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Counter animation
  useEffect(() => {
    if (inView) {
      // Start at the final value to avoid showing 0%
      const endValue = 93;
      setCount(endValue);
    }
  }, [inView]);
  
  // Rotate featured testimonials
  useEffect(() => {
    if (inView) {
      const timer = setInterval(() => {
        setActiveTestimonial(prev => (prev + 1) % enhancedTestimonials.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [inView]);
  
  // Social proof statistics - NEW DATA
  const statistics = [
    { value: "10,000+", label: "Happy Customers", icon: Users },
    { value: "87%", label: "See Results by Week 8", icon: TrendingUp },
    { value: "4.9/5", label: "Average Rating", icon: Star },
    { value: "3", label: "Clinical Studies", icon: Award }
  ];
  
  // Enhanced testimonials with emotional journey and timestamps
  const enhancedTestimonials = [
    {
      quote: "The difference in my part line and overall thickness was undeniable. I finally felt confident enough to wear my hair down again after years of hiding it.",
      author: "Elise M.",
      age: null,
      location: null,
      timeUsing: "4 months",
      background: "Verified Buyer",
      beforeImg: "/images/placeholders/placeholder.svg",
      afterImg: "/images/placeholders/placeholder.svg",
      ratingStars: 5
    },
    {
      quote: "I tried everything from supplements to expensive salon treatments. Nothing worked until I found care•atin. My shedding reduced by 60% in just 6 weeks.",
      author: "Jennifer K.",
      age: 38,
      location: "Boston, MA",
      timeUsing: "3 months",
      background: "Stress-induced thinning",
      beforeImg: "/images/testimonials/jennifer-k-before.png",
      afterImg: "/images/testimonials/jennifer-k-after.png",
      ratingStars: 5
    },
    {
      quote: "After 3 months, my hairdresser asked what I was doing differently. That's when I knew it wasn't just in my head - my hair really was getting thicker!",
      author: "Sarah T.",
      age: null,
      location: null,
      timeUsing: "5 months",
      background: "Verified Buyer",
      beforeImg: "/images/placeholders/placeholder.svg",
      afterImg: "/images/placeholders/placeholder.svg",
      ratingStars: 5
    },
    {
      quote: "I was so self-conscious about my thinning crown that I stopped going out. Six weeks with care•atin gave me back my social life and confidence.",
      author: "Michael R.",
      age: 52,
      location: "Seattle, WA",
      timeUsing: "6 months",
      background: "Male pattern thinning",
      beforeImg: "/images/placeholders/placeholder.svg",
      afterImg: "/images/placeholders/placeholder.svg",
      ratingStars: 4
    },
    {
      quote: "As a stylist, I've seen all the gimmicks. This is the first product I actually recommend to my clients because I've seen the results firsthand.",
      author: "Lisa J.",
      age: 36,
      location: "Miami, FL",
      timeUsing: "7 months",
      background: "Professional hairstylist",
      beforeImg: "/images/placeholders/placeholder.svg",
      afterImg: "/images/placeholders/placeholder.svg",
      ratingStars: 5
    }
  ];

  const featuredTestimonial = enhancedTestimonials[activeTestimonial];
  
  // Conditionally render motion components based on loadMotion state
  const MotionDiv = loadMotion ? motion.div : MotionFallback;
  const MotionButton = loadMotion ? motion.button : MotionFallback;

  return (
    <div 
      ref={containerRef}
      className="relative py-20 overflow-hidden bg-gradient-to-r from-pink-50 via-white to-rose-50"
    >
      {/* Floating background elements */}
      <Suspense fallback={<MotionFallback className="absolute inset-0 z-0" />}>
        <MotionDiv 
          className="absolute inset-0 z-0"
          style={loadMotion ? { y: 0, opacity: 0.8 } : {}}
        >
          <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
        </MotionDiv>
      </Suspense>
      
      {/* Floating accent circles */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-rose-100/40 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-pink-100/30 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={ref}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Heading with accent */}
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center space-x-2 text-rose-600">
              <UserCheck size={20} />
              <span className="text-sm font-medium uppercase tracking-wide">Real Customers, Real Results</span>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
            Transforming Hair Stories <span className="text-rose-600">Every Day</span>
          </h2>
          
          {/* Statistics row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {statistics.map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <motion.div 
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="flex items-center justify-center">
                    <div className="bg-rose-100 p-2 rounded-full mr-3">
                      <StatIcon size={16} className="text-rose-600" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Main success metric */}
          <div className="mb-12">
            <div className="text-7xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600 mb-2">
              {count}%
            </div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              of users reported visible improvements in hair thickness and reduced shedding after 90 days of consistent use
            </p>
          </div>
          
          {/* Featured testimonial with before/after - NEW COMPONENT */}
          <motion.div 
            key={activeTestimonial}
            className="bg-white rounded-2xl shadow-md overflow-hidden mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image side - Before/After */}
              <div className="relative h-full min-h-[300px] bg-neutral-100">
                <div className="absolute inset-0 flex">
                  <div className="w-1/2 h-full relative overflow-hidden">
                    <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded z-10">BEFORE</div>
                    <img 
                      src={featuredTestimonial.beforeImg} 
                      alt={`${featuredTestimonial.author} before using care•atin`}
                      className="object-cover h-full w-full"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-1/2 h-full relative overflow-hidden">
                    <div className="absolute top-2 right-2 bg-rose-600 text-white text-xs px-2 py-1 rounded z-10">AFTER</div>
                    <img 
                      src={featuredTestimonial.afterImg} 
                      alt={`${featuredTestimonial.author} after using care•atin`}
                      className="object-cover h-full w-full"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white transform -translate-x-1/2 z-10"></div>
                </div>
              </div>
              
              {/* Quote side */}
              <div className="p-8 flex flex-col justify-center">
                <div className="text-rose-500 mb-3">
                  <Quote size={32} />
                </div>
                <p className="italic text-gray-700 text-lg mb-6">"{featuredTestimonial.quote}"</p>
                
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < featuredTestimonial.ratingStars ? "text-amber-400 fill-amber-400" : "text-gray-300"} 
                      />
                    ))}
                  </div>
                  <span className="text-gray-800 font-medium">{featuredTestimonial.ratingStars}.0</span>
                </div>
                
                <div>
                  <p className="font-medium text-gray-900 text-lg">— {featuredTestimonial.author}</p>
                  <p className="text-gray-600 text-sm">
                    {featuredTestimonial.age}, {featuredTestimonial.location} • Using for {featuredTestimonial.timeUsing}
                  </p>
                  <p className="text-rose-600 text-sm mt-1">
                    {featuredTestimonial.background}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Testimonial indicators */}
          <div className="flex justify-center space-x-2 mb-8">
            {enhancedTestimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === activeTestimonial 
                    ? 'bg-rose-600 w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Grid of additional testimonials */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {enhancedTestimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.ratingStars)].map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="italic text-gray-700 mb-4 line-clamp-3">"{testimonial.quote}"</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-medium text-gray-900">— {testimonial.author}</p>
                    <p className="text-xs text-gray-600">Using for {testimonial.timeUsing}</p>
                  </div>
                  <div className="text-xs bg-rose-100 text-rose-600 px-2 py-1 rounded">
                    Verified Buyer
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* CTA Button */}
          <Suspense fallback={<button className="mt-12 px-8 py-4 bg-rose-600 text-white rounded-full font-medium hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200">See More Transformation Stories</button>}>
            <MotionButton 
              className="mt-12 px-8 py-4 bg-rose-600 text-white rounded-full font-medium hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200"
              whileHover={loadMotion ? { scale: 1.05 } : {}}
              whileTap={loadMotion ? { scale: 0.98 } : {}}
              initial={loadMotion ? { opacity: 0 } : {}}
              animate={loadMotion && inView ? { opacity: 1 } : {}}
              transition={loadMotion ? { delay: 0.5 } : {}}
              onClick={() => {
                // Scroll to detailed results section
                document.querySelector('#results-section')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              See More Transformation Stories
            </MotionButton>
          </Suspense>
        </div>
      </div>
    </div>
  );
} 