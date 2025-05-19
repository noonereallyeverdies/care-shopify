import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import type { HomepageProduct } from '~/routes/($locale)/index';
import { Image as HydrogenImage } from '@shopify/hydrogen';
import { useRef, useEffect } from "react";

// Animated ArrowRight component
function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props} className={`ml-2 h-5 w-5 ${props.className || ''}`}>
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Enhanced Hero with animations
function HeroMotion({ product }: { product: HomepageProduct | null }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (!videoRef.current) return;
    
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(error => console.error("Video play failed:", error));
        } else if (videoRef.current) {
          videoRef.current.pause();
        }
      });
    }, options);
    
    observer.observe(videoRef.current);
    
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);
  
  if (!product) {
    return (
      <section className="relative w-full min-h-screen bg-contrast flex items-center justify-center">
        <div className="text-primary">Loading Hero...</div>
      </section>
    );
  }

  const featuredImage = product?.featuredImage;
  const heroImageUrl = featuredImage?.url || '/images/prettyhair.jpg';
  const heroImageAlt = featuredImage?.altText || 'Care-atin product background';

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7,
        delay: custom * 0.15,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="relative min-h-[90vh] flex items-end justify-start text-left overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-bg.jpg"
          width={1920}
          height={1080}
          preload="metadata"
        >
          <source src="/hair-homepage.mp4" type="video/mp4" />
          <source src="/hair-homepage.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <motion.div 
          // variants={fadeIn} removed - parent section handles fade-in
          className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-transparent z-10"
        />
      </div>

      {/* Fallback image removed from HeroMotion as video is primary here */}

      <div className="relative z-20 container mx-auto pb-20 px-4 sm:pb-28 sm:px-6 md:pb-36 md:px-12 text-white">
        <div className="max-w-2xl">
          <motion.div className="mb-6 md:mb-8">
            <motion.h5 
              custom={0} 
              variants={slideUp} 
              className="text-base md:text-lg font-light uppercase tracking-widest mb-3 md:mb-4 text-white/80 brand-body"
            >
              Unlock Your Hair's Radiance
            </motion.h5>
            <motion.h1 
              custom={1} 
              variants={slideUp} 
              className="mb-4 md:mb-6 font-light text-4xl sm:text-5xl md:text-6xl tracking-wide text-white brand-heading"
            >
              The Science of Radiant Hair
            </motion.h1>
            
            <motion.p 
              custom={2} 
              variants={slideUp} 
              className="text-white/80 italic mt-2 max-w-2xl mx-auto text-lg md:text-xl mb-4"
            >
              "Unlike topical fixes that merely mask thinning, care•atin reactivates follicles at their source."
            </motion.p>
            
            <motion.p 
              custom={3} 
              variants={slideUp} 
              className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl leading-relaxed mb-5 md:mb-8 font-light brand-body"
            >
              Experience care•atin: advanced red light therapy for visibly thicker, fuller, healthier hair. Clinically proven, naturally.
            </motion.p>
            
            <motion.div custom={4} variants={slideUp} className="relative">
              <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link
                    to={`/products/${product.handle}`}
                    prefetch="intent"
                    className="inline-flex items-center justify-center bg-rose-500 px-8 py-4 text-lg font-medium text-white rounded-full w-full sm:w-auto"
                  >
                    Shop care•atin
                    <ArrowRight />
                  </Link>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link
                    to="/hair-quiz"
                    prefetch="intent"
                    className="inline-flex items-center justify-center border-2 border-pink-500 text-pink-500 px-8 py-4 text-lg font-medium rounded-full hover:bg-pink-500 hover:text-white w-full sm:w-auto"
                  >
                    Take Hair Quiz
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default HeroMotion;