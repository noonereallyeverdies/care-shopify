import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Building, BadgeCheck } from 'lucide-react'; // UserCircle, Star removed as not directly used

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Reminder: Import Swiper styles in your main app entry or here (uncomment if not global)
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/autoplay';

const logosData = [
  { name: "As Featured In", brand: "Vogue", src: "/logos/vogue_logo_dark.svg", alt: "Vogue Logo" },
  { name: "As Seen On", brand: "TechCrunch", src: "/logos/techcrunch_logo_color.svg", alt: "TechCrunch Logo" },
  { name: "Partnered With", brand: "Derm Experts Inc.", src: "/logos/derm_experts_logo.svg", alt: "Dermatologist Association Logo" },
  { name: "Loved By", brand: "Wellness Today", src: "/logos/wellness_today_logo.svg", alt: "Wellness Today Publication Logo" },
  { name: "Award Winner", brand: "Beauty Innov. Awards", src: "/logos/beauty_innovation_logo.svg", alt: "Beauty Innovation Awards Logo" },
];

const testimonials = [
  {
    quote: "My hair has never felt this healthy and vibrant. Photonique is a game-changer!",
    name: "Sarah L.",
    location: "New York, NY",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    quote: "Finally, a routine that fits my busy schedule and delivers real results. I'm obsessed!",
    name: "Michael B.",
    location: "Austin, TX",
    image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    quote: "I was skeptical, but the difference is undeniable. My confidence is through the roof!",
    name: "Jessica P.",
    location: "Los Angeles, CA",
    image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    quote: "The best investment I've made for my self-care. Absolutely recommend Photonique!",
    name: "Chloe T.",
    location: "Chicago, IL",
    image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const logoItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "backOut" } },
};

export function SocialProofSection() {
  return (
    <motion.section 
      className="py-16 md:py-24 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-light lowercase tracking-wide text-neutral-900 mb-6">
            Loved by Many, Trusted by Experts
          </h2>
          <p className="text-lg md:text-xl text-neutral-700 max-w-2xl mx-auto leading-relaxed font-serif">
            Join our community of radiant individuals and see why Photonique is making waves.
          </p>
        </motion.div>

        {/* Logos/Badges - Remain as a grid */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-x-10 sm:gap-x-12 md:gap-x-16 gap-y-8 mb-16 md:mb-20"
          variants={itemVariants} // Animate this block as a whole
        >
          {logosData.map((logo, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center text-center group w-36 sm:w-44 md:w-48"
              variants={logoItemVariants} // Individual animation for each logo
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="h-24 bg-white/50 rounded-md flex items-center justify-center mb-3 transition-all duration-300 p-4 border border-stone-100 shadow-sm group-hover:shadow-md group-hover:border-stone-200">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                  loading="lazy"
                  // For dark mode, consider a variant or CSS filter for light logos
                />
              </div>
              <p className="text-xs text-neutral-500 font-sans uppercase tracking-wider group-hover:text-rose-600 transition-colors">
                <span className="block text-[11px] leading-tight mb-1">{logo.name}</span>
                <span className="font-semibold text-neutral-600 group-hover:text-rose-700">{logo.brand}</span>
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div variants={itemVariants} className="pb-8"> {/* Container for Swiper with bottom padding for pagination */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            grabCursor={true}
            className="testimonial-swiper" // Custom class for potential specific styling
            breakpoints={{
              // when window width is >= 768px (md)
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              // when window width is >= 1024px (lg)
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="pb-10"> {/* Added pb for pagination space within slide */}
                <motion.div
                  // variants={itemVariants} // Individual animation can be kept or simplified
                  // initial="hidden" 
                  // animate="visible" // Swiper handles visibility, Framer can do entry within slide
                  whileHover={{ y: -6, transition: {duration: 0.2} }} // Enhanced hover
                  className="h-full bg-neutral-50 p-6 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden group flex flex-col"
                >
                  <BadgeCheck className="absolute top-4 right-4 h-7 w-7 text-green-500 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  <Quote className="h-8 w-8 text-rose-300 mb-4 transform scale-x-[-1] self-start" /> 
                  <p className="text-neutral-700 font-serif italic leading-relaxed mb-6 text-md flex-grow">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center mt-auto">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="h-12 w-12 rounded-full object-cover mr-4 border-2 border-rose-100 group-hover:border-rose-300 transition-colors"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-sans font-semibold text-neutral-800">{testimonial.name}</h4>
                      <p className="text-sm text-neutral-500 font-sans">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default SocialProofSection; 