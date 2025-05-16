import { motion, useScroll, useTransform } from "framer-motion"
import { Link } from "@remix-run/react"
import { useState, useEffect, useRef } from "react"
import type { HomepageProduct } from '~/routes/($locale)._index';
import { ArrowRight } from "lucide-react";
import { AnimatePresence } from "framer-motion"
import { Image as HydrogenImage } from '@shopify/hydrogen';

interface HeroProps {
  product: HomepageProduct | null;
}

export function Hero({ product }: HeroProps) {
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);
  
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const headingY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  
  useEffect(() => {
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
    
    const currentVideoRef = videoRef.current;
    if (currentVideoRef) {
      observer.observe(currentVideoRef);
    }
    
    return () => {
      if (currentVideoRef) {
        observer.unobserve(currentVideoRef);
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

  const featuredImage = product?.featuredImage
  const heroImageUrl = featuredImage?.url || '/images/prettyhair.jpg';
  const heroImageAlt = featuredImage?.altText || 'Care-atin product background';

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[90vh] flex items-end justify-start text-left overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <motion.video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          loop 
          muted 
          playsInline
          poster="/images/hero-bg.jpg"
          style={{ y: videoY }}
        >
          <source src="/hair-homepage.mp4" type="video/mp4" />
          <source src="/hair-homepage.webm" type="video/webm" />
          Your browser does not support the video tag.
        </motion.video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10"></div>
      </div>

      {/* Fallback image if no video or product image: */}
      {!videoRef.current && !featuredImage && heroImageUrl && (
        <HydrogenImage 
          data={{ url: heroImageUrl, altText: heroImageAlt, width: 1920, height: 1080 }}
          className="absolute inset-0 w-full h-full object-cover z-0" 
          sizes="100vw"
        />
      )}

      {/* Product featured image (if available and no video) */}
      {featuredImage && !videoRef.current && (
        <HydrogenImage 
          data={featuredImage}
          className="absolute inset-0 w-full h-full object-cover z-5 opacity-80"
          sizes="100vw"
        />
      )}
      
      <div className="relative z-20 container mx-auto pb-20 px-4 sm:pb-28 sm:px-6 md:pb-36 md:px-12 text-white">
        <motion.div 
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ y: headingY, opacity: textOpacity }}
        >
          <div className="mb-6 md:mb-8">
            <motion.h5 
              className="text-base md:text-lg font-light uppercase tracking-widest mb-3 md:mb-4 text-white/80 brand-body"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Unlock Your Hair's Radiance
            </motion.h5>
            <motion.h1 
              className="mb-4 md:mb-6 font-light text-4xl sm:text-5xl md:text-6xl tracking-wide text-white brand-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              The Science of Radiant Hair
            </motion.h1>
            
            <motion.p
              className="text-white/80 italic mt-2 max-w-2xl mx-auto text-lg md:text-xl mb-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              "Unlike topical fixes that merely mask thinning, care•atin reactivates follicles at their source."
            </motion.p>
            
            <motion.p
              className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl leading-relaxed mb-5 md:mb-8 font-light brand-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Experience care•atin: advanced red light therapy for visibly thicker, fuller, healthier hair. Clinically proven, naturally.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="relative"
            >
              <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(212, 98, 124, 0.3)" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Link
                    to={`/products/${product.handle}`}
                    prefetch="intent"
                    className="inline-flex items-center justify-center bg-var(--brand-primary, #d4627c) px-8 py-4 text-lg font-medium text-white rounded-full w-full sm:w-auto"
                  >
                    Shop care•atin
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(212, 98, 124, 0.3)" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}