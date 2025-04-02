import React from 'react';

interface TestimonialItemProps {
  quote: string;
  author: string;
  location?: string; // Optional location/title
  // Add avatar/image prop later if needed
}

const TestimonialItem = ({ quote, author, location }: TestimonialItemProps) => (
  <div className="animated-blob-card relative flex flex-col text-center border border-primary/10 flex-1 min-w-[280px] max-w-[380px] rounded-lg shadow-sm overflow-hidden group">
    
    <div className="blob-layer bg-red-light-accent blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
    
    <div className="bg-layer bg-contrast/80 backdrop-blur-sm rounded-lg h-full flex flex-col p-8 border border-white/20">
      
      <blockquote className="text-primary/90 italic mb-6 grow text-lg leading-relaxed z-10">
        " {quote} "
      </blockquote>
      <footer className="mt-auto z-10">
        <p className="font-semibold text-primary">- {author}</p>
        {location && (
          <p className="text-sm text-primary/70 mt-1">{location}</p>
        )}
      </footer>

    </div>
  </div>
);

export function Testimonials() {
  // Sample testimonials data - using only double quotes
  const testimonials: TestimonialItemProps[] = [
    {
      quote:
        "I was skeptical, but the difference in my hair's thickness is undeniable after just a few months!",
      author: "Sarah J.",
      location: "New York, NY",
    },
    {
      quote:
        "My hair feels so much stronger and healthier. It finally has the shine I've been missing.",
      author: "Michael P.",
      location: "Los Angeles, CA",
    },
    {
      quote:
        "Easy to use and fits right into my routine. Seeing less shedding and more volume.",
      author: "Chloe T.",
      location: "Chicago, IL",
    },
  ];

  return (
    <section className="w-full max-w-7xl py-16 md:py-24 px-6 bg-contrast">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-primary">
        Real Results, Real People
      </h2>
      <div className="flex flex-wrap justify-center gap-8 md:gap-10">
        {testimonials.map((testimonial) => (
          <TestimonialItem
            key={testimonial.author} // Use author as key for sample data
            quote={testimonial.quote}
            author={testimonial.author}
            location={testimonial.location}
          />
        ))}
      </div>
    </section>
  );
} 