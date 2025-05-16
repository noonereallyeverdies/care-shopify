import { motion } from 'framer-motion';
import { useState } from 'react'; // Needed for potential future dot navigation

// Placeholder testimonial data
const testimonialsData = [
  {
    quote: "I was skeptical, but the difference is undeniable. My hair feels thicker and I'm seeing less shedding after just 2 months!",
    author: "Jessica M., Age 42",
    rating: 5 // Optional star rating
  },
  {
    quote: "Finally, something that actually works for my thinning hair. It's easy to use and I love the confidence boost.",
    author: "David R., Age 55",
    rating: 5
  },
  {
    quote: "My hairdresser noticed the difference first! My hair is definitely growing back stronger and looks much healthier.",
    author: "Sarah K., Age 38",
    rating: 4
  },
  {
    quote: "Consistent use is key, but the results are worth it. My part line looks fuller than it has in years.",
    author: "Michael P., Age 61",
    rating: 5
  }
];

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, delay: 0.1 } }
};

// Simple Star Rating component (can be enhanced)
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div style={{ color: '#FFD700', /* Gold color */ marginBottom: 'var(--space-xs)' }}>
      {'★'.repeat(rating)}
      {'☆'.repeat(5 - rating)}
    </div>
  );
};

export function TestimonialSlider() {
  // State for potential future dot navigation (not implemented in this basic version)
  // const [activeIndex, setActiveIndex] = useState(0);

  return (
    <motion.section
      className="testimonial-slider section-padding"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      style={{ 
        padding: 'var(--space-xl) 0', // Padding top/bottom, no side padding for full-width scroll
        overflow: 'hidden', // Hide scrollbar for cleaner look
        backgroundColor: 'var(--c-bg-tertiary, #e8e8e8)' // Optional contrasting background
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-lg)', padding: '0 var(--space-md)', fontSize: 'var(--text-heading)' }}>
        Hear From Our Community
      </h2>

      {/* Basic Scroll Snap Container */}
      <div 
        className="testimonial-scroll-container"
        style={{
          display: 'flex',
          overflowX: 'auto', // Enable horizontal scrolling
          scrollSnapType: 'x mandatory', // Snap scrolling
          gap: 'var(--space-md)', // Gap between slides
          padding: '0 var(--space-md) var(--space-md) var(--space-md)', // Add padding around slides
          WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
        }}
      >
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className="testimonial-slide"
            style={{
              flex: '0 0 auto', // Prevent slides from shrinking
              width: '80%', // Adjust width as needed, e.g., 80% for peeking effect
              maxWidth: '450px', // Max width for larger screens
              scrollSnapAlign: 'center', // Center the snapped slide
              backgroundColor: 'var(--c-white, white)',
              padding: 'var(--space-lg)',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)', // Subtle shadow
              textAlign: 'center'
            }}
          >
            {testimonial.rating && <StarRating rating={testimonial.rating} />}
            <blockquote style={{ fontStyle: 'italic', fontSize: 'var(--text-body)', margin: '0 0 var(--space-md) 0' }}>
              " {testimonial.quote} "
            </blockquote>
            <cite style={{ fontWeight: 'bold', fontSize: 'var(--text-body-sm)', color: 'var(--c-text-secondary)' }}>
              - {testimonial.author}
            </cite>
          </div>
        ))}
      </div>
      
      {/* Placeholder for Dots/Arrows - requires more complex implementation */}
      {/* <div className="slider-controls" style={{ textAlign: 'center', marginTop: 'var(--space-md)' }}>...</div> */}

    </motion.section>
  );
} 