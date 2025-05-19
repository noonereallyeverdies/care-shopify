import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { StarRating } from './StarRating'; // Assuming StarRating.tsx is in the same directory

// Define a more specific type for the testimonial prop
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

interface FeaturedTestimonialCardProps {
  testimonial: TestimonialData;
  // isActive might not be needed if parent uses AnimatePresence correctly
}

export function FeaturedTestimonialCard({ testimonial }: FeaturedTestimonialCardProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden w-full" // Using shadow-lg for a defined but not overpowering effect
      // Animation props will be handled by AnimatePresence in the parent
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      layout // Added layout prop for smoother transitions if dimensions change
    >
      <div className="grid md:grid-cols-2 gap-0 items-stretch">
        {/* Image side - Before/After */}
        <div className="relative h-full min-h-[300px] sm:min-h-[350px] md:min-h-[400px] bg-neutral-100">
          <div className="absolute inset-0 flex">
            <div className="w-1/2 h-full relative overflow-hidden group">
              <div className="absolute top-2 left-2 bg-neutral-700/80 text-white text-xs px-2.5 py-1.5 rounded-md z-10 font-medium tracking-wide transition-opacity duration-300 group-hover:opacity-80">
                BEFORE
              </div>
              <img
                src={testimonial.beforeImg}
                alt={`${testimonial.author} before using care•atin`}
                className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="w-1/2 h-full relative overflow-hidden group">
              <div className="absolute top-2 right-2 bg-rose-600 text-white text-xs px-2.5 py-1.5 rounded-md z-10 font-medium tracking-wide transition-opacity duration-300 group-hover:opacity-80">
                AFTER
              </div>
              <img
                src={testimonial.afterImg}
                alt={`${testimonial.author} after using care•atin`}
                className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            {/* Subtle divider */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/50 transform -translate-x-1/2 z-10"></div>
          </div>
        </div>

        {/* Quote side */}
        <div className="p-6 sm:p-8 flex flex-col justify-center bg-white">
          <div className="text-rose-500 mb-3 sm:mb-4">
            <Quote size={32} strokeWidth={1.5} />
          </div>
          <p className="italic text-gray-700 text-base sm:text-lg mb-5 sm:mb-6 leading-relaxed">
            &ldquo;{testimonial.quote}&rdquo;
          </p>

          <div className="flex items-center mb-3 sm:mb-4">
            <StarRating rating={testimonial.ratingStars} starSize={18} />
            <span className="ml-2 text-sm text-gray-700 font-medium">
              {testimonial.ratingStars}.0 estrellas
            </span>
          </div>

          <div>
            <p className="font-semibold text-gray-800 text-sm sm:text-base">
              {testimonial.author}
              {testimonial.age && `, ${testimonial.age}`}
              {testimonial.location && <span className="text-gray-500 font-normal"> - {testimonial.location}</span>}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              {testimonial.background} &bull; Used for {testimonial.timeUsing}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 