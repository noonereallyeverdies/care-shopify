// Example: Before and After migration for a typical component

/*
BEFORE - Traditional Import
=========================
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function TestimonialsSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-16"
    >
      <motion.h2
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold"
      >
        Customer Testimonials
      </motion.h2>
      
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination
        onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
        className="mt-8"
      >
        <SwiperSlide>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="testimonial-card"
          >
            <p>"Amazing results!"</p>
            <cite>- Sarah K.</cite>
          </motion.div>
        </SwiperSlide>
        // More slides...
      </Swiper>
    </motion.section>
  );
}
*/

/*
AFTER - Dynamic Import Migration
===============================
*/
import { useState } from 'react';
import { motion, AnimatePresence } from '~/components/dynamic';
import { DynamicSwiper, DynamicSwiperSlide, useSwiperStyles } from '~/components/dynamic';

export function TestimonialsSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Load Swiper styles dynamically
  useSwiperStyles(['navigation', 'pagination']);
  
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-16"
    >
      <motion.h2
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold"
      >
        Customer Testimonials
      </motion.h2>
      
      <DynamicSwiper
        modules={['Navigation', 'Pagination']}
        navigation
        pagination
        onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
        className="mt-8"
        fallbackClassName="flex overflow-x-auto snap-x snap-mandatory"
      >
        <DynamicSwiperSlide>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="testimonial-card snap-center"
          >
            <p>"Amazing results!"</p>
            <cite>- Sarah K.</cite>
          </motion.div>
        </DynamicSwiperSlide>
        {/* More slides... */}
      </DynamicSwiper>
    </motion.section>
  );
}

/*
ADVANCED - Viewport-Based Loading
================================
*/
import { createDynamicComponent } from '~/components/dynamic';

// Create a dynamic version of a heavy component
const DynamicTestimonialsSection = createDynamicComponent(
  () => import('./TestimonialsSection'),
  () => (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-8" />
          <div className="flex space-x-4 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 h-64 bg-gray-300 rounded" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
);

// Usage in parent component
export function HomePage() {
  return (
    <main>
      {/* Critical above-the-fold content loads normally */}
      <HeroSection />
      <ProblemSolutionSection />
      
      {/* Non-critical below-the-fold content loads when needed */}
      <DynamicTestimonialsSection enableViewportLoading />
      <DynamicFaqSection enableViewportLoading />
    </main>
  );
}
