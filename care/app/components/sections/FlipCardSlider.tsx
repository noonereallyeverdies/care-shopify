import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Lucide icons
import { Sparkles, Droplet, Shield } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { EffectFlip, Pagination, Navigation } from 'swiper/modules';

// Make sure to export the function
export function FlipCardSlider() {
  // Placeholder data for slides (benefit-focused content with icons)
  const slides = [
    {
      id: 1,
      icon: Sparkles,
      frontBg: 'bg-rose-600',
      frontText: 'Radiant, Healthy Shine',
      backTitle: 'Unlock Natural Luster',
      backText: 'Enhance your hair\'s natural vibrancy for a healthy, reflective glow.',
    },
    {
      id: 2,
      icon: Droplet,
      frontBg: 'bg-rose-600',
      frontText: 'Visibly Fuller Look',
      backTitle: 'Boost Density & Volume',
      backText: 'Feel the confidence of hair that looks denser and feels thicker from root to tip.',
    },
    {
      id: 3,
      icon: Shield, 
      frontBg: 'bg-rose-600',
      frontText: 'Soothed, Balanced Scalp',
      backTitle: 'Ideal Foundation for Growth',
      backText: 'Create a calm, comfortable, and revitalized scalp environment.',
    },
  ];

  return (
    // Remove specific background, rely on parent context or default
    <section className="py-16 md:py-24"> {/* Section wrapper */}
      <div className="container mx-auto px-6">
        {/* Update heading to be more benefit-focused */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-neutral-900">Unlock Your Hair's Potential</h2>
        
        <Swiper
          effect={'flip'}
          grabCursor={true}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[EffectFlip, Pagination, Navigation]}
          className="mySwiper max-w-md mx-auto" 
          loop={true}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="flip-card-inner aspect-square bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Front: Add Icon, use accent bg, white text, serif font */}
                <div className={`flip-card-front flex flex-col items-center justify-center p-6 ${slide.frontBg} text-white text-center`}>
                  <slide.icon className="h-10 w-10 mb-4" strokeWidth={1.5} />
                  <h3 className="text-2xl font-bold font-serif">{slide.frontText}</h3>
                </div>
                {/* Back: Use dark neutral bg, white text, serif title, sans text */}
                <div className="flip-card-back flex flex-col items-center justify-center p-6 bg-neutral-900 text-white text-center">
                  <h4 className="text-xl font-semibold mb-3 font-serif">{slide.backTitle}</h4>
                  <p className="text-sm font-sans px-4">{slide.backText}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
} 