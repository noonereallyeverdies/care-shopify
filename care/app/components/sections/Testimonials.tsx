import React from 'react';

// 1. Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

// 2. Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Add custom CSS import if needed later for arrow/pagination styling
// import './TestimonialsCarousel.css';

// --- USE "Your journey..." DATA --- 
const testimonialsData = [
  {
    name: 'Jessica',
    age: 34,
    timeline: 'After 6 weeks',
    quote: "I've tried countless products. This is the first one that's actually delivered visible results for my thinning hair.",
    image: '/images/testimonial1.jpg',
  },
  {
    name: 'Michael',
    age: 42,
    timeline: 'After 8 weeks',
    quote: "My hairline was my biggest insecurity. Now I feel confident wearing my hair pulled back again.",
    image: '/images/testimonial2.jpg',
  },
  {
    name: 'Aisha',
    age: 37,
    timeline: 'After 4 weeks',
    quote: "The difference in volume and shine is remarkable. My hair finally feels healthy and resilient again.",
    image: '/images/testimonial3.jpg',
  },
];
// --- END "Your journey..." DATA --- 

export const Testimonials = () => {
  return (
    <section className="py-24 bg-neutral-50 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        {/* --- USE "Your journey..." HEADING/SUBHEADING --- */}
        <h2 className="text-center font-serif text-4xl md:text-5xl font-medium text-neutral-800 mb-4"> 
          Your journey to transformative results
        </h2>
        <p className="text-center text-lg text-neutral-600 mb-16 max-w-2xl mx-auto">
          Real stories from our community show the difference consistent care can make.
        </p>
        {/* --- END HEADING/SUBHEADING --- */}

        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
          className="testimonial-swiper"
        >
          {testimonialsData.map((testimonial, index) => (
            <SwiperSlide key={index} className="pb-12">
              {/* --- USE "Your journey..." CARD STRUCTURE --- */}
              <div
                className="content-card h-full flex flex-col"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                  loading="lazy"
                />
                {/* Quote */}
                <p className="font-serif italic text-xl md:text-2xl leading-relaxed text-neutral-700 mb-6 flex-grow">
                  &quot;{testimonial.quote}&quot;
                </p>
                {/* Name, Age, Timeline */}
                <p className="font-sans text-base font-medium text-neutral-800">
                  {testimonial.name}, {testimonial.age}
                </p>
                <p className="font-sans text-sm text-neutral-500 uppercase tracking-wider">
                  {testimonial.timeline}
                </p>
                {/* --- END CARD STRUCTURE --- */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}; 