import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

// Helper function to render minimal rating dots
const renderRatingDots = (rating: number): JSX.Element[] => {
  const dots: JSX.Element[] = [];
  const fullDots = Math.floor(rating);
  const hasHalfDot = rating % 1 !== 0;

  const dotVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1, // Sequential delay for each dot
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  for (let i = 0; i < fullDots; i++) {
    dots.push(
      <motion.div 
        key={`full-${i}`} 
        className="w-1.5 h-1.5 rounded-full bg-rose-500 mx-0.5"
        custom={i}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }} // Trigger when half the dot container is visible
        variants={dotVariants}
      />
    );
  }
  if (hasHalfDot) {
    dots.push(
      <motion.div 
        key="half" 
        className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-rose-500 to-stone-200 mx-0.5"
        custom={fullDots} // Continue sequence
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={dotVariants}
      />
    );
  }
  for (let i = dots.length; i < 5; i++) {
    dots.push(
      <motion.div 
        key={`empty-${i}`} 
        className="w-1.5 h-1.5 rounded-full bg-stone-200 mx-0.5"
        custom={i}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={dotVariants}
      />
    );
  }
  return dots;
};

interface Testimonial {
  quote: string;
  name: string;
  age?: number; // Made age optional
  contextLine: string; // Combines concern and location, e.g., "Postpartum hair loss, New York, NY"
  rating: number;
  verified: boolean;
  imageUrl?: string; // Changed from imagePlaceholder, made optional
  videoUrl?: string; // Optional video URL
}

const testimonialsData: Testimonial[] = [
  {
    quote: "after my second child, i experienced significant thinning. three months with photonique has restored not just my hair's density, but a quiet confidence i had almost forgotten. the transformation feels both physical and emotional.",
    name: "sophie l.",
    contextLine: "postpartum hair loss, austin",
    rating: 5,
    verified: true,
    imageUrl: "/images/testimonials/sophie_l.jpg" // Example path
  },
  {
    quote: "with my family history of hair loss, i approached photonique with skepticism and hope. the results are undeniable—my hairline has visibly improved, and the thickness surpasses what i believed possible with non-invasive technology.",
    name: "michael t.",
    contextLine: "hereditary thinning, chicago",
    rating: 5,
    verified: true,
    imageUrl: "/images/testimonials/michael_t.jpg",
    videoUrl: "/videos/testimonials/michael_t_loop.mp4" // Example video
  },
  {
    quote: "i've tried everything for my fine, lifeless hair. photonique has transformed my relationship with my hair completely. the density and movement i'm experiencing feels like something i haven't had in years.",
    name: "aisha j.",
    contextLine: "fine, lifeless hair, london",
    rating: 4.5,
    verified: true,
    imageUrl: "/images/testimonials/aisha_j.jpg"
  },
  {
    quote: "at 58, i expected my hair to continue thinning. after integrating photonique into my routine for four months, i'm witnessing regrowth in areas i believed were permanent. the device has become a meditative part of my self-care ritual.",
    name: "robert m.",
    contextLine: "age-related thinning, miami",
    rating: 5,
    verified: true,
    imageUrl: "/images/testimonials/robert_m.jpg"
  },
  {
    quote: "photonique has become an essential element in managing my stress-induced alopecia. the ritual of use is as therapeutic as the results themselves—a rare combination of science and sensory experience.",
    name: "chloe k.",
    contextLine: "stress-induced alopecia, vancouver",
    rating: 4.5,
    verified: true,
    imageUrl: "/images/testimonials/chloe_k.jpg"
  }
];

export function TestimonialsSection() {
  // Check if CheckBadgeIcon is available, otherwise use a simple text/alternative.
  // For now, assuming a simple text for "Verified Purchaser". Lucide might not have CheckBadgeIcon.
  // A common alternative is ShieldCheck or similar, or just text.

  return (
    <motion.section 
      className="py-20 md:py-32 bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-neutral-900 mb-6 lowercase tracking-wide">
            voices of transformation
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
            experiences from individuals who have integrated photonique into their wellness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {testimonialsData.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-stone-50/70 rounded-xl p-6 md:p-8 shadow-sm border border-stone-100/80 flex flex-col relative hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.19, 1, 0.22, 1] }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <Quote className="absolute top-6 left-6 w-8 h-8 text-rose-200/70 transform -translate-x-1 -translate-y-1" />
              {/* Minimalist Media Display */}
              {(testimonial.videoUrl || testimonial.imageUrl) && (
                <div className="w-full aspect-[3/2] mb-8 overflow-hidden">
                  {testimonial.videoUrl ? (
                    <video 
                      src={testimonial.videoUrl} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="w-full h-full object-cover"
                    />
                  ) : testimonial.imageUrl && (
                    <img 
                      src={testimonial.imageUrl} 
                      alt={`Testimonial from ${testimonial.name}`} 
                      className="w-full h-full object-cover" 
                      loading="lazy"
                    />
                  )}
                </div>
              )}
              
              <blockquote className="text-neutral-700 mb-6 flex-grow relative pt-8">
                <p className="text-lg md:text-xl font-light leading-relaxed tracking-wide italic line-height-loose">"{testimonial.quote}"</p>
              </blockquote>
              
              <div className="mt-auto">
                <div className="flex flex-col">
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {/* Rating dots will now animate in */}
                      {renderRatingDots(testimonial.rating)}
                    </div>
                  </div>
                  
                  <p className="font-normal text-neutral-800 mb-1">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-neutral-500 font-light mb-4">{testimonial.contextLine}</p>
                  
                  {testimonial.verified && (
                    <div className="inline-flex items-center text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full font-medium tracking-wider">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 mr-1.5">
                        <path fillRule="evenodd" d="M16.403 12.652a3 3 0 00-2.823-2.25H13V9.12a3 3 0 00-2.823-2.25H9.823a3 3 0 00-2.25 2.823V10H6.303a3 3 0 00-2.25 2.823V13h1.277A3.75 3.75 0 019 11.755h2c.495 0 .961.097 1.391.277H13V13h.879a3 3 0 002.524-.348zM4.5 14V7.879a1.5 1.5 0 012.25-1.3l4.5 2.25a1.5 1.5 0 010 2.6l-4.5 2.25A1.5 1.5 0 014.5 14z" clipRule="evenodd" />
                      </svg>
                      Verified User
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default TestimonialsSection; 