import React from 'react';

// Removed ClientOnly and SliderContent as they are no longer needed for a static image.
// Removed react-before-after-slider-component logic.

export function BeforeAfterSliderSection() {
  return (
    <section className="py-16 md:py-24 bg-contrast">
      {/* Section wrapper */}
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
          Real Results
        </h2>
        {/* Container for the single image, maintaining previous styling */}
        <div className="max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg border border-neutral-200 flex justify-center items-center bg-white p-4 md:p-6">
          <img
            src="/images/HAIR.JPG" // Updated image source
            alt="Hair results after using Careatin"
            className="max-w-full h-auto object-contain rounded-md" // Ensure image scales nicely within the container
            width={1080} // Provide explicit width/height for better loading performance
            height={720} // Adjust height based on image aspect ratio if needed
            loading="lazy" // Add lazy loading for performance
          />
        </div>
      </div>
    </section>
  );
}
