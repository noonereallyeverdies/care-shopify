import { useState } from 'react';
import { motion } from 'framer-motion';

export function BeforeAfterGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      name: "Sarah",
      age: 42,
      issue: "Thinning at crown",
      duration: "3 months",
      beforeImage: "/images/before-after/sarah-before.jpg",
      afterImage: "/images/before-after/sarah-after.jpg",
      quote: "I was skeptical at first, but after consistent use, I've seen dramatic improvement in thickness around my crown area."
    },
    {
      name: "Michael",
      age: 38,
      issue: "Receding hairline",
      duration: "4 months",
      beforeImage: "/images/before-after/michael-before.jpg",
      afterImage: "/images/before-after/michael-after.jpg",
      quote: "The most noticeable change has been the regrowth along my temples. My hairline looks much fuller now."
    },
    {
      name: "Emma",
      age: 35,
      issue: "Post-pregnancy shedding",
      duration: "2 months",
      beforeImage: "/images/before-after/emma-before.jpg",
      afterImage: "/images/before-after/emma-after.jpg",
      quote: "After having my baby, I lost so much hair. care•atin helped reduce the shedding and I'm seeing new growth already."
    },
    {
      name: "David",
      age: 45,
      issue: "Overall thinning",
      duration: "5 months",
      beforeImage: "/images/before-after/david-before.jpg",
      afterImage: "/images/before-after/david-after.jpg",
      quote: "My scalp used to be visible under bright lights. Now my hair feels and looks much denser."
    }
  ];

  const active = testimonials[activeIndex];

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-4">real results</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            See the transformation for yourself with these before & after photos from real care•atin users
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          <motion.div 
            className="w-full lg:w-2/3 flex flex-col md:flex-row gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full md:w-1/2 aspect-square">
              <div className="absolute top-4 left-4 bg-white py-1 px-3 rounded-full text-sm font-medium">Before</div>
              <img 
                src={active.beforeImage} 
                alt={`${active.name} before using care•atin`} 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="relative w-full md:w-1/2 aspect-square">
              <div className="absolute top-4 left-4 bg-rose-500 text-white py-1 px-3 rounded-full text-sm font-medium">After</div>
              <img 
                src={active.afterImage} 
                alt={`${active.name} after using care•atin`} 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </motion.div>

          <motion.div 
            className="w-full lg:w-1/3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl font-medium mb-1">{active.name}, {active.age}</h3>
                <div className="text-sm text-neutral-500">
                  <span className="inline-block mr-3">{active.issue}</span>
                  <span className="inline-block before:content-['•'] before:mr-2">Using for {active.duration}</span>
                </div>
              </div>
              
              <p className="text-neutral-700 mb-8 italic">"{active.quote}"</p>
              
              <div className="flex gap-3">
                {testimonials.map((testimonial, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === activeIndex ? 'bg-rose-500 scale-125' : 'bg-neutral-300'
                    }`}
                    aria-label={`View ${testimonial.name}'s testimonial`}
                  />
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex justify-between items-center">
              <button 
                onClick={() => setActiveIndex((activeIndex - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                aria-label="Previous testimonial"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <div className="text-sm text-neutral-500">
                {activeIndex + 1} of {testimonials.length}
              </div>
              
              <button 
                onClick={() => setActiveIndex((activeIndex + 1) % testimonials.length)}
                className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                aria-label="Next testimonial"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button className="bg-rose-500 hover:bg-rose-600 text-white rounded-full py-3 px-8 transition-colors">
            Start your transformation
          </button>
          <p className="mt-4 text-sm text-neutral-500">
            Results vary from person to person. Most users see visible improvement within 8-12 weeks.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 