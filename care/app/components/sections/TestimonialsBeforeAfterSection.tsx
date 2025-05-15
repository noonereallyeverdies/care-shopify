import React, { useState, useRef } from 'react';
import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Calendar, MapPin, Shield, ArrowRight } from 'lucide-react';
import './TestimonialsLuxury.css';

// Consolidated testimonial data with the most impactful stories
const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    age: 42,
    hairType: "Fine, Thinning",
    location: "Chicago, IL",
    issue: "Postpartum Hair Loss",
    rating: 5,
    duration: "4 months",
    date: "March 15, 2023",
    verified: true,
    thirdPartyVerified: true,
    content: "After having my second child, I experienced significant hair loss that wasn't improving. I tried Care•atin as a last resort before considering extensions. Within 2 months, I noticed new growth along my hairline, and by month 4, my hairdresser commented on how much thicker my hair felt.",
    image: "/images/testimonials/sarah-profile.jpg",
    metrics: {
      density: "+76%",
      shedding: "-62%",
      satisfaction: "5/5"
    }
  },
  {
    id: 2,
    name: "David L.",
    age: 35,
    hairType: "Male Pattern Thinning",
    location: "Boston, MA",
    issue: "Crown & Temple Recession",
    rating: 5,
    duration: "6 months",
    date: "January 8, 2023",
    verified: true,
    thirdPartyVerified: false,
    content: "I've tried two prescription treatments before with mixed results and side effects I wasn't happy with. Care•atin has been different - no side effects and I'm seeing real regrowth, especially at my crown where it was noticeably thinning.",
    image: "/images/testimonials/david-profile.jpg",
    metrics: {
      density: "+32%",
      shedding: "-48%",
      satisfaction: "5/5"
    }
  },
  {
    id: 3,
    name: "Elise M.",
    age: 38,
    hairType: "Wavy, Medium",
    location: "Denver, CO",
    issue: "Part Line Thinning",
    rating: 5,
    duration: "4 months",
    date: "February 15, 2023",
    verified: true,
    thirdPartyVerified: true,
    content: "The difference in my part line and overall thickness was undeniable. I finally felt confident enough to wear my hair down again after years of hiding it.",
    image: "/images/testimonials/elise-profile.jpg",
    metrics: {
      density: "+41%",
      strength: "+52%",
      satisfaction: "5/5"
    }
  }
];

// Consolidated transformations with the best before/after results
const transformations = [
  {
    id: 1,
    name: "Michael R.",
    age: 34,
    hairType: "Male Pattern Loss, Stage 3",
    issue: "Frontal & Crown Thinning",
    duration: "7 months",
    beforeImage: "/images/before-after/michael-before.jpg",
    afterImage: "/images/before-after/michael-after.jpg",
    story: "First noticed thinning at 28, tried several topical solutions with minimal results. Started Care•atin as a non-prescription alternative.",
    protocol: "Care•atin device 3x weekly + daily hair nutrition supplements"
  },
  {
    id: 2,
    name: "Jennifer K.",
    age: 42,
    hairType: "Postpartum Thinning",
    issue: "Overall Density Loss",
    duration: "12 weeks",
    beforeImage: "/images/before-after/jennifer-before.jpg",
    afterImage: "/images/before-after/jennifer-after.jpg",
    story: "I tried everything from supplements to expensive salon treatments. Nothing worked until I found Care•atin. My shedding reduced by 60% in just 6 weeks.",
    protocol: "Care•atin device 4x weekly"
  }
];

export function TestimonialsBeforeAfterSection() {
  const [activeTransformation, setActiveTransformation] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activePage, setActivePage] = useState(0);
  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);
  
  const sliderRef = useRef<HTMLDivElement>(null);

  // Handle slider interaction
  const handleSliderMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!sliderRef.current) return;
    
    const sliderRect = sliderRef.current.getBoundingClientRect();
    const position = 
      'touches' in e 
        ? ((e.touches[0].clientX - sliderRect.left) / sliderRect.width) * 100
        : ((e.clientX - sliderRect.left) / sliderRect.width) * 100;
    
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const handleMouseDown = () => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!sliderRef.current) return;
    
    const sliderRect = sliderRef.current.getBoundingClientRect();
    const position = ((e.clientX - sliderRect.left) / sliderRect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = () => {
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!sliderRef.current) return;
    
    const sliderRect = sliderRef.current.getBoundingClientRect();
    const position = ((e.touches[0].clientX - sliderRect.left) / sliderRect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  // Navigate testimonial pages
  const nextPage = () => {
    setActivePage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const prevPage = () => {
    setActivePage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  // Change transformation
  const nextTransformation = () => {
    setActiveTransformation(prev => (prev + 1) % transformations.length);
  };

  const prevTransformation = () => {
    setActiveTransformation(prev => prev === 0 ? transformations.length - 1 : prev - 1);
  };

  // Current testimonials to display
  const currentTestimonials = testimonials.slice(
    activePage * testimonialsPerPage,
    (activePage + 1) * testimonialsPerPage
  );

  // Current transformation
  const currentTransformation = transformations[activeTransformation];

  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 via-pink-100 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="luxury-serif text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-rose-400 via-pink-300 to-yellow-200 bg-clip-text text-transparent drop-shadow-lg">Real Results, Real People</h2>
          <p className="text-lg text-neutral-700 max-w-xl mx-auto">
            See how Care•atin has helped transform hair journeys for people like you
          </p>
        </div>

        {/* Before & After Results */}
        <div className="mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-pink-200 mb-6">
              <div className="p-4 bg-gradient-to-r from-pink-50 to-white border-b border-pink-100">
                <p className="text-center font-medium text-rose-600">Pro Tip: Drag the slider to compare before and after results</p>
              </div>
              
              <div 
                ref={sliderRef}
                className="relative h-[400px] md:h-[500px] select-none cursor-grab active:cursor-grabbing touch-none"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onTouchMove={handleSliderMove}
              >
                {/* Before Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <img 
                    src={currentTransformation.beforeImage} 
                    alt={`Before - ${currentTransformation.name}`}
                    className="object-cover w-full h-full" 
                  />
                  <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                    BEFORE
                  </div>
                </div>
                
                {/* After Image (with clip based on slider) */}
                <div 
                  className="absolute inset-0 overflow-hidden" 
                  style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                >
                  <img 
                    src={currentTransformation.afterImage} 
                    alt={`After - ${currentTransformation.name}`}
                    className="object-cover w-full h-full" 
                  />
                  <div className="absolute top-4 left-4 bg-rose-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                    AFTER
                  </div>
                </div>
                
                {/* Slider handle */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
                  style={{ left: `${sliderPosition}%`, marginLeft: '-2px' }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-lg border-2 border-rose-300 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-rose-400 to-pink-300"></div>
                  </div>
                </div>
              </div>
              
              {/* Transformation details */}
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between">
                  <div>
                    <h3 className="luxury-serif text-xl font-bold text-rose-700">
                      {currentTransformation.name}, {currentTransformation.age}
                    </h3>
                    <p className="text-neutral-600">
                      {currentTransformation.issue} • Results after {currentTransformation.duration}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <button 
                      onClick={prevTransformation}
                      className="w-10 h-10 rounded-full bg-white border border-pink-200 flex items-center justify-center text-rose-500 hover:bg-pink-50 transition-colors"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button 
                      onClick={nextTransformation}
                      className="w-10 h-10 rounded-full bg-white border border-pink-200 flex items-center justify-center text-rose-500 hover:bg-pink-50 transition-colors"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-pink-50/50 rounded-lg border border-pink-100">
                  <p className="italic text-neutral-700">"{currentTransformation.story}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="mb-16">
          <h3 className="luxury-serif text-2xl md:text-3xl font-bold text-center mb-8 text-rose-700">What Our Customers Say</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentTestimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-white/80 backdrop-blur-sm rounded-xl border border-pink-200 shadow-lg overflow-hidden transition-transform hover:scale-[1.02]"
              >
                <div className="p-5 border-b border-pink-100">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-lg text-neutral-800">{testimonial.name}</h4>
                      <p className="text-sm text-neutral-600">{testimonial.issue}</p>
                    </div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-neutral-500 mb-2">
                    <Calendar size={12} className="mr-1" />
                    <span>Using for {testimonial.duration}</span>
                    <div className="mx-2 h-1 w-1 rounded-full bg-neutral-300"></div>
                    <MapPin size={12} className="mr-1" />
                    <span>{testimonial.location}</span>
                  </div>
                  {testimonial.verified && (
                    <div className="flex items-center text-xs text-emerald-600 mb-3">
                      <Shield size={12} className="mr-1" />
                      <span>Verified Buyer</span>
                    </div>
                  )}
                  <p className="text-neutral-700 italic">"{testimonial.content}"</p>
                </div>
                
                <div className="px-5 py-3 bg-gradient-to-r from-pink-50 to-white">
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(testimonial.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold bg-gradient-to-r from-rose-400 via-pink-300 to-yellow-200 bg-clip-text text-transparent">
                          {value}
                        </div>
                        <div className="text-xs text-neutral-600 capitalize">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Stats Banner */}
        <div className="rounded-2xl p-8 bg-gradient-to-r from-rose-50 via-pink-100 to-rose-50 shadow-lg border border-pink-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold luxury-serif bg-gradient-to-r from-rose-400 via-pink-300 to-yellow-200 bg-clip-text text-transparent">10,000+</p>
              <p className="text-neutral-700">Happy Customers</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold luxury-serif bg-gradient-to-r from-rose-400 via-pink-300 to-yellow-200 bg-clip-text text-transparent">87%</p>
              <p className="text-neutral-700">See Results by Week 8</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold luxury-serif bg-gradient-to-r from-rose-400 via-pink-300 to-yellow-200 bg-clip-text text-transparent">4.9/5</p>
              <p className="text-neutral-700">Average Rating</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold luxury-serif bg-gradient-to-r from-rose-400 via-pink-300 to-yellow-200 bg-clip-text text-transparent">93%</p>
              <p className="text-neutral-700">Visible Improvement</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 