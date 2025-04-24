import React from 'react';
import BeforeAfterSlider from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css'; // Import CSS

// Placeholder images (replace with your actual separated images)
const BEFORE_IMAGE = {
  imageUrl: '/images/before.png' // Updated path
};
const AFTER_IMAGE = {
  imageUrl: '/images/after.png' // Updated path
};

export function BeforeAfterSliderSection() {
  const delimiterIconStyles = {
    width: '40px',
    height: '40px',
    backgroundSize: 'contain',
    borderRadius: 'none',
    border: '2px solid white',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  };

  return (
    <section className="py-16 md:py-24 bg-contrast"> {/* Section wrapper */}
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">Before & After</h2>
        <div className="max-w-2xl mx-auto rounded-lg overflow-hidden shadow-lg border border-neutral-200">
          <BeforeAfterSlider
            firstImage={AFTER_IMAGE}
            secondImage={BEFORE_IMAGE}
            delimiterIconStyles={delimiterIconStyles}
            // Optional props:
            // currentPercentPosition={50}
            // onSliderPositionChange={(position) => console.log(position)}
          />
        </div>
      </div>
    </section>
  );
} 