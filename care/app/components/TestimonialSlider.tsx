// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination'; // If pagination is desired
import 'swiper/css/navigation'; // If navigation arrows are desired

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

import { ReviewCard } from './ReviewCard';

// Static placeholder data
const testimonials = [
  {
    quote: "I was skeptical, but after 3 months of consistent use, my hair feels noticeably thicker, especially around my temples. The device is easy to use, and I'm seeing less shedding.",
    author: 'Sarah K.',
    rating: 5,
  },
  {
    quote: "Seeing definite improvement in overall hair health and shine after about 4 months. It takes patience, but it's becoming part of my routine. Wish the battery lasted a bit longer, but overall happy.",
    author: 'Michael B.',
    rating: 4,
  },
  {
    quote: "My hairdresser even commented on new growth! I use it 3-4 times a week as recommended. It's comfortable to wear while watching TV. Really impressed with the results so far (6 months in).",
    author: 'Jessica T.',
    rating: 5,
  },
  // Add more testimonials if needed
];

export function TestimonialSlider() {
  return (
    <section className="testimonial-slider-section" style={{ padding: 'var(--section-padding-y) 0', overflow: 'hidden' /* Prevent horizontal scroll */ }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 var(--container-padding-x)', textAlign: 'center' }}>
        <h2 style={{ marginBottom: 'var(--space-xl)' }}>Real People, Real Results</h2>
      </div>
      <Swiper
        // Install Swiper modules
        modules={[Pagination, Navigation]} // Add Navigation if arrows are needed
        spaceBetween={30} // Space between slides
        slidesPerView={1} // Default slides per view
        pagination={{ clickable: true }} // Enable clickable pagination dots
        // navigation={true} // Enable navigation arrows
        loop={true} // Enable continuous loop mode
        breakpoints={{
          // when window width is >= 640px
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        style={{ paddingBottom: 'var(--space-xxl)' /* Space for pagination */ }}
        className="mySwiper"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} style={{ height: 'auto' /* Allow slide height to adjust */ }}>
            <ReviewCard
              quote={testimonial.quote}
              author={testimonial.author}
              rating={testimonial.rating}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
} 