import React from 'react';
import { motion } from 'framer-motion';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper core and required modules
// For Swiper 7+, modules are typically imported directly like this:
import { Parallax, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles (ensure these are imported in your project, e.g., root.tsx or here)
// You would uncomment these lines in your actual project:
// import 'swiper/css';
// import 'swiper/css/parallax';
// import 'swiper/css/navigation';
// import 'swiper/css/autoplay';

const storyContent = {
  title: "Rediscover Your Sparkle",
  paragraphs: [
    "Imagine stepping out each morning, not just ready for the day, but truly feeling like your best self. It starts with a simple ritual, a quiet moment of care that blossoms into confidence.",
    "Photonique isn't just about healthier hair; it's about reclaiming your time, your energy, and that inner glow. It's your story, and every strand plays a part.",
  ],
  images: [
    { src: "https://images.pexels.com/photos/4467687/pexels-photo-4467687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", alt: "Woman smiling confidently in natural light" },
    { src: "https://images.pexels.com/photos/3760693/pexels-photo-3760693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", alt: "Close up of healthy, vibrant hair" },
    { src: "https://images.pexels.com/photos/7619950/pexels-photo-7619950.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", alt: "Person enjoying a moment of self-care at home" },
    { src: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", alt: "Woman enjoying a peaceful moment outdoors" }
  ],
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const imageMotionVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export function EmotionalStorytellingStripSection() {
  return (
    <motion.section 
      className="py-16 md:py-24 bg-neutral-50 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-0 md:px-6"> 
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-10 md:mb-12 px-6 md:px-0"
          variants={itemVariants} // This applies to the text block container
        >
          {/* Apply data-swiper-parallax to individual elements for parallax within the Swiper context */}
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-neutral-900 mb-6 lowercase" data-swiper-parallax="-500" data-swiper-parallax-duration="700">
            {storyContent.title}
          </h2>
          {storyContent.paragraphs.map((p, idx) => (
            <p key={idx} className="text-lg text-neutral-700 leading-relaxed mb-4 font-serif" data-swiper-parallax="-300" data-swiper-parallax-duration="800">
              {p}
            </p>
          ))}
        </motion.div>

        <Swiper
          modules={[Parallax, Navigation, Autoplay]}
          parallax={true}
          speed={800} // Speed of transitions
          navigation={true} // Enable navigation arrows
          loop={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          slidesPerView={1.1} // Start by showing a peek of the next slide
          spaceBetween={15}
          centeredSlides={true}
          grabCursor={true}
          breakpoints={{
            640: { // sm
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            768: { // md
              slidesPerView: 2.2,
              spaceBetween: 30,
            },
            1024: { // lg
              slidesPerView: 2.8, // Show more of the slides on larger screens
              spaceBetween: 40,
            },
          }}
          className="w-full h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px]" // Responsive height
        >
           {/* Optional: Parallax background for the entire Swiper. 
               Requires a div with `swiper-parallax-bg` class as a direct child of swiper-wrapper. 
               Swiper React components manage swiper-wrapper internally, so this is tricky. 
               Usually, parallax is applied to elements *within* slides. 
           */}
           {/* <div slot="container-start" className="swiper-parallax-bg" style={{ backgroundImage: "url('your-parallax-bg-image.jpg')"}} data-swiper-parallax="-23%" ></div> */}

          {storyContent.images.map((image, index) => (
            <SwiperSlide key={index} className="overflow-hidden rounded-lg shadow-xl bg-neutral-200"> 
              {/* motion.div for hover effects and potential individual Framer animations if needed */}
              <motion.div
                className="h-full w-full group relative"
                // variants={imageMotionVariants} // Keep if you want specific Framer Motion animation on slide content load
                // initial="hidden"
                // whileInView="visible" // Swiper handles slide visibility, this might conflict or be redundant
                // viewport={{ once: true, amount: 0.1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }} // Hover on the slide itself
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  data-swiper-parallax="-20%" // Image moves slower than slide transition
                  data-swiper-parallax-duration="1000" // Duration for parallax effect of this element
                />
                {/* Example: Text overlay on image with its own parallax */}
                {/* <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/60 rounded-md" data-swiper-parallax="-100" data-swiper-parallax-duration="1200">
                  <p className="text-white text-sm font-sans">{image.alt}</p>
                </div> */}
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  );
}

export default EmotionalStorytellingStripSection; 