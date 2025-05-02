import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '~/components/ui/buttons/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Placeholder testimonial data
const testimonials = [
  {
    id: 1,
    image: '/images/hair.jpg', // Use existing image as one example
    alt: 'Hair results after 90 days',
    quote: '“I was skeptical, but the difference after 3 months is undeniable. My part looks fuller!”',
    name: 'Sarah K.',
    details: 'Used daily for 90 days'
  },
  {
    id: 2,
    image: '/images/testimonial2.jpg', // Use existing testimonial2.jpg image
    alt: 'Hair results after 60 days',
    quote: '“My shedding decreased noticeably within the first month. Really happy with the progress.”',
    name: 'Michael P.',
    details: 'Noticeable change at 60 days'
  },
  {
    id: 3,
    image: '/images/testimonial3.jpg', // Use existing testimonial3.jpg image
    alt: 'Close up of hairline results',
    quote: '“The application is easy and feels like a little self-care moment each night.”',
    name: 'Jessica L.',
    details: 'Focusing on hairline regrowth'
  },
];

// Define standard fade-in-up variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export function BeforeAfterSliderSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <motion.section 
      className="py-16 md:py-24 bg-contrast"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
          See the Difference Care•tin Makes
        </h2>

        {/* Embla Carousel Structure */}
        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden rounded-lg shadow-lg border border-neutral-200" ref={emblaRef}>
            <div className="flex"> {/* Embla container */}
              {testimonials.map((testimonial) => (
                <div className="flex-[0_0_100%] min-w-0" key={testimonial.id}> {/* Embla slide */}
                  <div className="bg-white p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-8">
                    <img
                      src={testimonial.image}
                      alt={testimonial.alt}
                      className="w-full md:w-1/2 h-auto object-cover rounded-md aspect-square max-h-[400px]" // Maintain aspect ratio
                      width={600} 
                      height={600}
                      loading="lazy" 
                    />
                    <div className="text-center md:text-left">
                      <p className="text-lg italic text-neutral-700 mb-4">
                        {testimonial.quote}
                      </p>
                      <p className="font-semibold text-neutral-800">{testimonial.name}</p>
                      <p className="text-sm text-neutral-500">{testimonial.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="sm"
            className="absolute top-1/2 left-[-15px] md:left-[-25px] transform -translate-y-1/2 rounded-full bg-white/80 hover:bg-white shadow-md z-10"
            onClick={scrollPrev}
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
             className="absolute top-1/2 right-[-15px] md:right-[-25px] transform -translate-y-1/2 rounded-full bg-white/80 hover:bg-white shadow-md z-10"
            onClick={scrollNext}
            aria-label="Next testimonial"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Optional: Link to a full gallery or more testimonials */}
        {/* <div className="text-center mt-8">
          <Button variant="link">See More Results</Button>
        </div> */}
      </div>
    </motion.section>
  );
}
