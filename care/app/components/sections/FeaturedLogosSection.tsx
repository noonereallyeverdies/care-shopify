import React from 'react';

// TODO: Replace with actual logo image paths and alt text
const logos = [
  { src: "/images/logos/press-logo-placeholder-1.svg", alt: "As Seen In Placeholder 1" },
  { src: "/images/logos/press-logo-placeholder-2.svg", alt: "As Seen In Placeholder 2" },
  { src: "/images/logos/customer-logo-placeholder-1.svg", alt: "Trusted By Placeholder 1" },
  { src: "/images/logos/customer-logo-placeholder-2.svg", alt: "Trusted By Placeholder 2" },
  { src: "/images/logos/press-logo-placeholder-3.svg", alt: "As Seen In Placeholder 3" },
];

export function FeaturedLogosSection() {
  return (
    <section className="py-12 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold text-neutral-600 mb-8">
          Trusted by leading brands & featured in top publications
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-12 lg:gap-x-16">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="h-8 md:h-10 object-contain filter grayscale hover:filter-none transition-all duration-300 opacity-60 hover:opacity-100"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
} 