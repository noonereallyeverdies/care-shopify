import React from 'react';

const testimonialsData = [
  {
    name: 'Emily R.',
    location: 'New York, NY',
    quote:
      'I was skeptical, but the difference is undeniable. My hair feels thicker and looks so much healthier after just a few months.',
    image: '/images/testimonial1.jpg', // Add trailing comma
  },
  {
    name: 'Marcus T.',
    location: 'Los Angeles, CA',
    quote:
      "Finally, something that actually works for my thinning hair. Easy to use and I'm seeing real results.",
    image: '/images/testimonial2.jpg', // Add trailing comma
  },
  {
    name: 'Sarah L.',
    location: 'Chicago, IL',
    quote:
      'My hairdresser noticed the improvement! Less shedding and my hair just feels stronger.',
    image: '/images/testimonial3.jpg', // Add trailing comma
  },
];

export const Testimonials = () => {
  return (
    // Consistent spacing, background, container
    <section className="py-24 bg-neutral-50">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Consistent heading */}
        <h2 className="text-center font-sans text-4xl md:text-5xl font-medium text-neutral-800 mb-16">
          real people, real results
        </h2>
        {/* Consistent grid layout and card styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-3xl border border-neutral-200/60 p-8 shadow-lg"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                loading="lazy"
              />
              <p className="font-sans text-lg leading-relaxed text-neutral-600 mb-4 flex-grow">
                &quot;{testimonial.quote}&quot;
              </p>
              <p className="font-sans text-base font-medium text-neutral-800">
                - {testimonial.name}
              </p>
              <p className="font-sans text-sm text-neutral-500">
                {testimonial.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 