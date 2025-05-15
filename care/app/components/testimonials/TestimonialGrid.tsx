import React from 'react';
import { EnhancedTestimonialCard } from './EnhancedTestimonialCard';

// Real customer testimonials with complete content
const testimonials = [
  {
    id: 1,
    name: 'Jennifer K.',
    rating: 5,
    usageDuration: 'Using for 3 months',
    issue: 'Postpartum thinning',
    results: 'Shedding reduced by 60%',
    quote: 'I tried everything from supplements to expensive salon treatments. Nothing worked until I found care•atin. My shedding reduced by 60% in just 6 weeks. I was skeptical at first because I\'d tried so many products, but the results speak for themselves. My hair feels stronger and looks noticeably fuller.'
  },
  {
    id: 2,
    name: 'Michael R.',
    rating: 5,
    usageDuration: 'Using for 4 months',
    issue: 'Thinning at crown',
    results: '32% increased density',
    quote: 'As a 45-year-old man dealing with genetic hair thinning, I\'ve tried countless products. Care•atin is the first one that delivered actual results. Within 3 months, I could see a visible difference in my crown area. What I appreciate most is the science-backed approach and that it doesn\'t require chemicals or drugs.'
  },
  {
    id: 3,
    name: 'Sarah T.',
    rating: 5,
    usageDuration: 'Using for 5 months',
    issue: 'Stress-related thinning',
    results: 'Visible regrowth',
    quote: 'After 3 months, my hairdresser asked what I was doing differently. That\'s when I knew it wasn\'t just in my head - my hair really was getting thicker! I love that I can use care•atin while reading or watching TV, it\'s become part of my evening routine. The improvement in my hair density has given me back so much confidence.'
  },
  {
    id: 4,
    name: 'Elise M.',
    rating: 5,
    usageDuration: 'Using for 4 months',
    issue: 'Widening part',
    results: 'Dramatically improved part line',
    quote: 'The difference in my part line and overall thickness was undeniable. I finally felt confident enough to wear my hair down again after years of hiding it. I\'ve been using care•atin consistently for just over 4 months, and the transformation continues to improve. My friends have all noticed the difference and asked what my secret is!'
  },
  {
    id: 5,
    name: 'David L.',
    rating: 4,
    usageDuration: 'Using for 6 months',
    issue: 'Receding hairline',
    results: 'Noticeable improvement',
    quote: 'I started using care•atin when I noticed my hairline beginning to recede. After 6 months of consistent use, I\'ve seen my hairline strengthen and even regain some ground. It hasn\'t completely reversed, but the improvement is significant enough that I\'m no longer self-conscious about it. Consistency is key - I use it while checking emails in the morning.'
  },
  {
    id: 6,
    name: 'Mia J.',
    rating: 5,
    usageDuration: 'Using for 6 months',
    issue: 'Diffuse thinning',
    results: 'Transformed texture & volume',
    quote: 'I\'ve made it part of my evening wind-down routine. Five minutes of care•atin therapy while I read or meditate has become my favorite part of the day. My hair feels like it did in my twenties - full of body and shine. The best part is how simple it is to use, and there are zero side effects unlike some other treatments I\'ve tried.'
  }
];

interface TestimonialGridProps {
  limit?: number;
  filter?: string;
}

export function TestimonialGrid({ limit = 4, filter }: TestimonialGridProps) {
  // Filter testimonials if needed
  const filteredTestimonials = filter 
    ? testimonials.filter(t => t.issue?.toLowerCase().includes(filter.toLowerCase()))
    : testimonials;
  
  // Limit the number displayed
  const displayedTestimonials = filteredTestimonials.slice(0, limit);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayedTestimonials.map(testimonial => (
        <EnhancedTestimonialCard
          key={testimonial.id}
          name={testimonial.name}
          rating={testimonial.rating}
          usageDuration={testimonial.usageDuration}
          quote={testimonial.quote}
          issue={testimonial.issue}
          results={testimonial.results}
          isVerified={true}
        />
      ))}
      
      {/* Show placeholder if no matching testimonials */}
      {displayedTestimonials.length === 0 && (
        <div className="col-span-full text-center py-12 bg-neutral-50 rounded-lg">
          <p className="text-neutral-600">No testimonials found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
