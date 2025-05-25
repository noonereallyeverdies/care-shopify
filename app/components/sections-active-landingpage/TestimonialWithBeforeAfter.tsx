import { motion } from 'framer-motion';
import { useState } from 'react';

// Combined data structure with testimonials and before/after images
const testimonialTransformationData = [
  {
    id: 1,
    quote: "I was skeptical, but the difference is undeniable. My hair feels thicker and I'm seeing less shedding after just 2 months!",
    author: "Jessica M., Age 42",
    rating: 5,
    beforeImage: "/images/transformations/jessica-before.jpg",
    afterImage: "/images/transformations/jessica-after.jpg",
    beforeLabel: "Before",
    afterLabel: "After 8 Weeks",
    caption: "Fuller crown area after 8 weeks of consistent use.",
    beforeAlt: "Jessica's hair before treatment showing noticeable thinning in the crown area",
    afterAlt: "Jessica's hair after 8 weeks showing visibly fuller and thicker crown area"
  },
  {
    id: 2,
    quote: "Finally, something that actually works for my thinning hair. It's easy to use and I love the confidence boost.",
    author: "David R., Age 55",
    rating: 5,
    beforeImage: "/images/transformations/david-before.jpg",
    afterImage: "/images/transformations/david-after.jpg",
    beforeLabel: "Before",
    afterLabel: "After 12 Weeks",
    caption: "Visible improvement in hairline density after 12 weeks.",
    beforeAlt: "David's receding hairline before treatment showing sparse coverage",
    afterAlt: "David's hairline after 12 weeks showing improved density and coverage"
  },
  {
    id: 3,
    quote: "My hairdresser noticed the difference first! My hair is definitely growing back stronger and looks much healthier.",
    author: "Sarah K., Age 38",
    rating: 4,
    beforeImage: "/images/transformations/sarah-before.jpg",
    afterImage: "/images/transformations/sarah-after.jpg",
    beforeLabel: "Before",
    afterLabel: "After 10 Weeks",
    caption: "Reduced part width and improved thickness after 10 weeks.",
    beforeAlt: "Sarah's wide part line showing scalp visibility before treatment",
    afterAlt: "Sarah's narrower part line after 10 weeks showing less scalp visibility"
  },
  {
    id: 4,
    quote: "Consistent use is key, but the results are worth it. My part line looks fuller than it has in years.",
    author: "Michael P., Age 61",
    rating: 5,
    beforeImage: "/images/transformations/michael-before.jpg",
    afterImage: "/images/transformations/michael-after.jpg",
    beforeLabel: "Before",
    afterLabel: "After 16 Weeks",
    caption: "Significantly improved coverage in thin areas after 16 weeks.",
    beforeAlt: "Michael's thin crown area with visible scalp before treatment",
    afterAlt: "Michael's crown area after 16 weeks showing significantly improved coverage"
  }
];

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, delay: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Simple Star Rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex text-amber-400 mb-3">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-xl">
          {i < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

export function TestimonialWithBeforeAfter() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonialTransformationData.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonialTransformationData.length - 1 : prevIndex - 1
    );
  };

  // Ensure we always have a valid activeItem, using the first item as a fallback
  const activeItem = testimonialTransformationData[activeIndex] || testimonialTransformationData[0];

  return (
    <motion.section
      className="testimonial-transformation-section py-20 md:py-28 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      id="testimonials"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div 
          className="text-center mb-12" 
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-light lowercase tracking-wide text-neutral-900 mb-4">
            real people, real results
          </h2>
          <p className="text-lg text-neutral-600 font-light max-w-2xl mx-auto">
            see how photonique touch transforms hair and confidence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Testimonial Column */}
          <motion.div 
            className="bg-white rounded-xl shadow-md p-8 relative"
            variants={itemVariants}
            key={`testimonial-${activeItem.id}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-rose-500 text-white flex items-center justify-center rounded-full text-3xl font-serif">
              "
            </div>
            <StarRating rating={activeItem.rating} />
            <blockquote className="text-xl md:text-2xl font-light italic mb-8 text-neutral-800 leading-relaxed relative pl-2">
              <span className="absolute top-0 left-0 text-4xl text-rose-200 opacity-30 -z-10 font-serif">"</span>
              {activeItem.quote}
              <span className="text-4xl text-rose-200 opacity-30 font-serif inline-block ml-1">"</span>
            </blockquote>
            <div className="testimonial-author">
              <cite className="font-medium text-lg text-neutral-900 block mb-1">
                - {activeItem.author}
              </cite>
              <span className="text-sm text-neutral-500 block">
                Verified Customer
              </span>
            </div>
          </motion.div>

          {/* Before/After Column */}
          <motion.div 
            className="before-after-container"
            variants={itemVariants}
            key={`transformation-${activeItem.id}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Before Image */}
              <div className="before-column">
                <div className="mb-2 text-center text-neutral-700 font-medium">
                  {activeItem.beforeLabel}
                </div>
                <div className="aspect-square relative rounded-lg overflow-hidden border border-neutral-200">
                  <img 
                    src={activeItem.beforeImage} 
                    alt={activeItem.beforeAlt}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      // Fallback image if the real one fails to load
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x300?text=Before";
                    }}
                  />
                </div>
              </div>
              
              {/* After Image */}
              <div className="after-column">
                <div className="mb-2 text-center text-neutral-700 font-medium">
                  {activeItem.afterLabel}
                </div>
                <div className="aspect-square relative rounded-lg overflow-hidden border border-neutral-200">
                  <img 
                    src={activeItem.afterImage} 
                    alt={activeItem.afterAlt}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      // Fallback image if the real one fails to load
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x300?text=After";
                    }}
                  />
                </div>
              </div>
            </div>
            
            <p className="text-center mt-4 text-sm text-neutral-600 italic">
              {activeItem.caption}
            </p>
          </motion.div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center mt-12 gap-4">
          <button
            onClick={prevTestimonial}
            className="p-3 bg-white border border-neutral-200 rounded-full hover:bg-neutral-100 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label="Previous testimonial"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-700">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          
          <div className="flex gap-2">
            {testimonialTransformationData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-4 h-4 rounded-full min-w-[16px] min-h-[16px] ${
                  index === activeIndex ? 'bg-rose-500' : 'bg-neutral-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={nextTestimonial}
            className="p-3 bg-white border border-neutral-200 rounded-full hover:bg-neutral-100 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label="Next testimonial"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-700">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </motion.section>
  );
}

export default TestimonialWithBeforeAfter; 