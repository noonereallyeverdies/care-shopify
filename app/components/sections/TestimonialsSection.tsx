import React from 'react';
import { motion } from 'framer-motion';
import { Star, StarHalf } from 'lucide-react'; // Removed CheckBadgeIcon

// Helper function to render stars
const renderStars = (rating: number): JSX.Element[] => { // Explicitly typed return and array
  const stars: JSX.Element[] = []; // Explicitly typed array
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} className="h-5 w-5 text-yellow-400 fill-yellow-400" />);
  }
  if (hasHalfStar) {
    stars.push(<StarHalf key="half" className="h-5 w-5 text-yellow-400 fill-yellow-400" />);
  }
  for (let i = stars.length; i < 5; i++) {
    stars.push(<Star key={`empty-${i}`} className="h-5 w-5 text-yellow-400" />); // Empty star (outline only)
  }
  return stars;
};

const testimonialsData = [
  {
    quote: "after having my second child, my hair was thinning dramatically. three months with the photonique touch restored not just my hair, but my confidence. the before and after difference is remarkable.",
    name: "sophie l.",
    age: 34,
    concern: "postpartum hair loss",
    rating: 5,
    verified: true,
    imagePlaceholder: "Before/after photos of user with medium-length hair showing improved density"
  },
  {
    quote: "as someone with a family history of hair loss, i was skeptical but desperate. the results speak for themselves—my hairline has actually improved, and the overall thickness is something i never thought possible with a home device.",
    name: "michael t.",
    age: 42,
    concern: "male pattern thinning",
    rating: 5,
    verified: true,
    imagePlaceholder: "Before/after photos of user showing improved hairline and density"
  },
  {
    quote: "i've tried everything for my fine, lifeless hair. the photonique touch has given me actual, visible volume that lasts. worth every penny for the results i'm seeing.",
    name: "aisha j.",
    age: 29,
    concern: "fine hair",
    rating: 4.5,
    verified: true,
    imagePlaceholder: "Before/after photos of user with fine hair showing improved volume"
  },
  {
    quote: "at 58, i expected my hair to continue thinning, but after using the photonique touch consistently for 4 months, i'm seeing regrowth in areas i thought were permanent bald spots. the device is simple to use and fits easily into my routine.",
    name: "robert m.",
    age: 58,
    concern: "advanced thinning",
    rating: 5,
    verified: true,
    imagePlaceholder: "Before/after photos showing improvement in crown area"
  }
];

export function TestimonialsSection() {
  // Check if CheckBadgeIcon is available, otherwise use a simple text/alternative.
  // For now, assuming a simple text for "Verified Purchaser". Lucide might not have CheckBadgeIcon.
  // A common alternative is ShieldCheck or similar, or just text.

  return (
    <motion.section 
      className="py-16 md:py-24 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900 mb-4 lowercase">
            real results. real people.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {testimonialsData.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-neutral-50 rounded-xl p-6 md:p-8 shadow-lg border border-neutral-100 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Image Placeholder */}
              <div className="w-full aspect-video bg-neutral-200 rounded-lg mb-6 flex items-center justify-center text-neutral-500">
                <p className="text-sm text-center p-2">{testimonial.imagePlaceholder}</p>
              </div>
              
              <blockquote className="text-neutral-700 italic mb-4 flex-grow">
                <p>"{testimonial.quote}"</p>
              </blockquote>
              
              <div className="mt-auto">
                <p className="font-semibold text-neutral-800">
                  — {testimonial.name}, {testimonial.age}
                </p>
                <p className="text-sm text-neutral-600 mb-2">{testimonial.concern}</p>
                
                <div className="flex items-center mb-2">
                  {renderStars(testimonial.rating)}
                  <span className="ml-2 text-sm text-yellow-500">({testimonial.rating.toFixed(1)})</span>
                </div>
                
                {testimonial.verified && (
                  <div className="inline-flex items-center text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                    {/* Replace with CheckBadgeIcon if available and desired, or ShieldCheck etc. */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                        <path fillRule="evenodd" d="M16.403 12.652a3 3 0 00-2.823-2.25H13V9.12a3 3 0 00-2.823-2.25H9.823a3 3 0 00-2.25 2.823V10H6.303a3 3 0 00-2.25 2.823V13h1.277A3.75 3.75 0 019 11.755h2c.495 0 .961.097 1.391.277H13V13h.879a3 3 0 002.524-.348zM4.5 14V7.879a1.5 1.5 0 012.25-1.3l4.5 2.25a1.5 1.5 0 010 2.6l-4.5 2.25A1.5 1.5 0 014.5 14z" clipRule="evenodd" />
                    </svg>
                    Verified Purchaser
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default TestimonialsSection; 