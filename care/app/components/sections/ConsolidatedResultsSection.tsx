import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Quote } from 'lucide-react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

// This component consolidates:
// - Real results display with before/after comparisons
// - SocialProofBanner
// - ComprehensiveTestimonials
// - ResultsTimeline
// into a single, unified results section

interface ConsolidatedResultsSectionProps {
  id?: string;
}

export function ConsolidatedResultsSection({ id }: ConsolidatedResultsSectionProps) {
  const [activeCategory, setActiveCategory] = useState('results');
  const [activeSlide, setActiveSlide] = useState(0);

  // Updated to use the actual before/after images in the public directory
  const beforeAfterData = [
    {
      id: 1,
      beforeImage: "/images/before-after/before-after-1-before.png",
      afterImage: "/images/before-after/before-after-1-after.png",
      name: "Sarah, 34",
      duration: "After 60 days",
      testimonial: "I was losing confidence along with my hair. The difference after 2 months is remarkable."
    },
    {
      id: 2,
      beforeImage: "/images/before-after/before-after-2-before.png",
      afterImage: "/images/before-after/before-after-2-after.png",
      name: "Michael, 42",
      duration: "After 90 days",
      testimonial: "After 3 months of consistent use, I'm seeing significant improvement in thickness and volume."
    },
    {
      id: 3,
      beforeImage: "/images/before-after/before-after-3-before.png",
      afterImage: "/images/before-after/before-after-3-after.png",
      name: "Emma, 38",
      duration: "After 45 days",
      testimonial: "The visible results in just 45 days have been incredible. My hairline is noticeably fuller."
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Jennifer L.",
      age: 38,
      location: "New York",
      quote: "I've tried everything for my thinning hair. Care•atin is the only product that actually delivered results I can see and feel.",
      image: "/images/testimonials/jennifer.jpg"
    },
    {
      id: 2,
      name: "Robert K.",
      age: 45,
      location: "Chicago",
      quote: "After 3 months of consistent use, I'm seeing significant regrowth in areas that had completely thinned out. My confidence is back!",
      image: "/images/testimonials/robert.jpg"
    }
  ];

  // Timeline data from your ResultsTimeline component
  const timelineData = [
    {
      week: "Week 2-4",
      title: "Reduced Shedding",
      description: "Noticeable decrease in hair loss during washing and brushing",
      percentage: "30%"
    },
    {
      week: "Week 6-8",
      title: "Visible Regrowth",
      description: "New baby hairs begin to appear in previously thinning areas",
      percentage: "50%"
    },
    {
      week: "Week 12-16",
      title: "Thicker, Fuller Hair",
      description: "Significant improvement in density and overall hair health",
      percentage: "90%"
    }
  ];

  return (
    <section className="py-20 bg-white" id={id}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">Real Results</h2>
          <p className="text-lg text-neutral-600">
            See the transformation in our users' hair and lives
          </p>
        </div>

        {/* Apple-style category selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-full bg-neutral-100 p-1">
            {[
              { id: 'results', label: 'Before & After' },
              { id: 'timeline', label: 'Timeline' },
              { id: 'testimonials', label: 'Testimonials' }
            ].map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeCategory === category.id
                    ? 'bg-white text-neutral-800 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-800'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content area */}
        <div className="max-w-5xl mx-auto">
          {/* Before & After Results */}
          {activeCategory === 'results' && (
            <div className="space-y-12">
              {/* Featured result with larger display - Using React Compare Slider */}
              <div className="bg-neutral-50 rounded-xl overflow-hidden shadow-sm">
                <div className="max-w-3xl mx-auto">
                  <ReactCompareSlider
                    itemOne={
                      <ReactCompareSliderImage 
                        src={beforeAfterData[activeSlide].beforeImage} 
                        alt={`Before - ${beforeAfterData[activeSlide].name}`}
                        className="object-cover w-full"
                      />
                    }
                    itemTwo={
                      <ReactCompareSliderImage 
                        src={beforeAfterData[activeSlide].afterImage} 
                        alt={`After - ${beforeAfterData[activeSlide].name}`}
                        className="object-cover w-full" 
                      />
                    }
                    style={{ 
                      height: '500px',
                      width: '100%',
                    }}
                    className="border border-neutral-200"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-medium text-lg text-neutral-800">{beforeAfterData[activeSlide].name}'s Transformation</h3>
                  <p className="text-neutral-600 mt-1">
                    "{beforeAfterData[activeSlide].testimonial}"
                  </p>
                  <div className="mt-4 text-sm font-medium text-rose-600">
                    {beforeAfterData[activeSlide].duration}
                  </div>
                </div>
              </div>
              
              <p className="text-center text-neutral-600">
                Slide to compare before & after results
              </p>
              
              {/* Thumbnail selectors for different before/after pairs */}
              <div className="flex justify-center gap-4 mt-6">
                {beforeAfterData.map((item, index) => (
                  <button 
                    key={item.id} 
                    className={`rounded-lg overflow-hidden shadow-sm border-2 ${
                      activeSlide === index ? 'border-rose-500' : 'border-transparent'
                    }`}
                    onClick={() => setActiveSlide(index)}
                  >
                    <div className="relative w-20 h-20">
                      <img 
                        src={item.afterImage} 
                        alt={`${item.name} result thumbnail`}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="text-center">
                <p className="text-neutral-600 mb-2">
                  Drag the slider left and right to see the transformation
                </p>
                <button className="inline-flex items-center text-rose-600 font-medium hover:text-rose-700">
                  <span>View all results</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          )}

          {/* Timeline View */}
          {activeCategory === 'timeline' && (
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute top-0 bottom-0 left-1/2 -ml-0.5 w-0.5 bg-neutral-200"></div>
              
              <div className="space-y-12">
                {timelineData.map((item, index) => (
                  <div key={index} className="relative">
                    <div className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                      {/* Timeline node */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rose-100 border-4 border-white shadow-sm z-10 flex items-center justify-center mx-auto relative left-0 right-0">
                        <span className="text-rose-600 font-bold">{item.percentage}</span>
                      </div>
                      
                      {/* Content card */}
                      <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <span className="text-sm font-medium text-rose-600">{item.week}</span>
                          <h3 className="font-medium text-lg text-neutral-800 mt-1">{item.title}</h3>
                          <p className="text-neutral-600 mt-2">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Final node */}
                <div className="relative">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-rose-500 border-4 border-white shadow z-10 flex items-center justify-center text-white font-bold">
                      100%
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="font-medium text-xl text-neutral-800">Full Transformation</h3>
                    <p className="text-neutral-600 mt-1">Complete results visible after 4-6 months of consistent use</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Testimonials View */}
          {activeCategory === 'testimonials' && (
            <div className="space-y-8">
              {/* Featured testimonial */}
              <div className="bg-neutral-50 rounded-xl p-6 relative">
                <Quote className="absolute top-6 left-6 h-12 w-12 text-rose-100" />
                <div className="ml-16">
                  <p className="text-xl text-neutral-700 italic mb-6">
                    "After struggling with postpartum hair loss for over a year, I was ready to try anything. 
                    The Care•atin system not only stopped my shedding but gave me back the volume I thought was gone forever."
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-neutral-200 mr-4">
                      {/* User image would go here */}
                    </div>
                    <div>
                      <h4 className="font-medium text-neutral-800">Amanda S.</h4>
                      <div className="flex items-center mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                        <span className="ml-2 text-sm text-neutral-600">Verified Customer</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* More testimonials */}
              <div className="grid md:grid-cols-2 gap-6">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 rounded-full bg-neutral-200">
                          {/* User image would go here */}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-800">{testimonial.name}, {testimonial.age}</h4>
                        <p className="text-sm text-neutral-500 mb-3">{testimonial.location}</p>
                        <p className="text-neutral-700">{testimonial.quote}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Expert testimonial teaser */}
              <div className="mt-8 bg-gradient-to-r from-rose-50 to-neutral-50 rounded-lg p-6">
                <h3 className="text-xl font-medium text-neutral-800 mb-2">What Experts Say</h3>
                <p className="text-neutral-700 mb-4">
                  Leading dermatologists and hair specialists recommend Care•atin for their patients
                </p>
                <button className="text-rose-600 font-medium flex items-center hover:text-rose-700">
                  <span>Read expert reviews</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}