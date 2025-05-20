import React from 'react';
import { motion } from 'framer-motion';

const timelineData = [
  {
    weekRange: "Week 1-2",
    stageTitle: "cellular repair begins",
    description: "your scalp feels calmer as light therapy initiates cellular repair—this is your first step toward hair that looks and feels as good as it should.",
    imageAlt: "Before image: The starting point—clean, minimal styling",
    imageUrlPlaceholder: "/images/timeline-week1-2.jpg" // Example placeholder path
  },
  {
    weekRange: "Week 3-4",
    stageTitle: "shedding stops",
    description: "thicker, stronger follicles help reduce shedding, giving you the confidence to show up—every day.",
    imageAlt: "Progress image: Subtle but noticeable change, sleek and glowing",
    imageUrlPlaceholder: "/images/timeline-week3-4.jpg"
  },
  {
    weekRange: "Week 5-6",
    stageTitle: "new growth emerges",
    description: "soft, fine hairs begin filling in, adding noticeable density and volume where thinning once was.",
    imageAlt: "Progress image: Refined, natural-looking improvement",
    imageUrlPlaceholder: "/images/timeline-week5-6.jpg"
  },
  {
    weekRange: "Week 7-8",
    stageTitle: "visible transformation",
    description: "shine and texture are transformed. hair moves freely, naturally glowing, and effortlessly styled.",
    imageAlt: "Progress image: A polished, radiant look that speaks for itself",
    imageUrlPlaceholder: "/images/timeline-week7-8.jpg"
  },
  {
    weekRange: "Week 9-12",
    stageTitle: "complete renewal",
    description: "with consistent use, expect thick, youthful, vibrant hair—exactly how you imagined it. effortless, luxurious, and radiant.",
    imageAlt: "After image: Picture-perfect results with the ultimate shine",
    imageUrlPlaceholder: "/images/timeline-week9-12.jpg"
  }
];

export function ResultsTimelineSection() {
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
            your journey to perfect hair
          </h2>
        </div>

        <div className="space-y-12 md:space-y-16">
          {timelineData.map((item, index) => (
            <motion.div 
              key={item.weekRange}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Image Placeholder: Alternating sides for visual interest */}
              <div 
                className={`md:col-span-5 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'} bg-neutral-200 rounded-xl aspect-[4/3] flex items-center justify-center text-neutral-500`}
              >
                {/* TODO: Replace with actual image component */}
                <p className="text-center p-4">Image: {item.imageAlt}</p>
              </div>

              {/* Text Content */}
              <div className={`md:col-span-7 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                <h3 className="text-rose-600 text-sm font-semibold uppercase tracking-wider mb-2">
                  {item.weekRange}
                </h3>
                <h4 className="text-2xl md:text-3xl font-medium text-neutral-800 mb-3">
                  {item.stageTitle}
                </h4>
                <p className="text-neutral-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default ResultsTimelineSection; 