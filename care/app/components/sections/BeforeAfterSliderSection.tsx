import React from 'react';
import BeforeAfterSlider from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css'; // Import CSS

// Placeholder images (replace with your actual separated images)
const BEFORE_IMAGE = {
  imageUrl: '/images/prettyhair.jpg' // Example placeholder
};
const AFTER_IMAGE = {
  imageUrl: '/images/nature_shot.jpg' // Example placeholder
};

export function BeforeAfterSliderSection() {
  const delimiterIconStyles = {
    width: '40px',
    height: '40px',
    backgroundSize: 'contain',
    borderRadius: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2213%22%20height%3D%2239%22%20viewBox%3D%220%200%2013%2039%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%3Cline%20x1%3D%226.5%22%20y1%3D%220.5%22%20x2%3D%226.5%22%20y2%3D%2238.5%22%20stroke%3D%22white%22%20stroke-opacity%3D%220.8%22/%3E%0A%3Cpath%20d%3D%22M0.5%2019.5L6.5%2016.5V22.5L0.5%2019.5Z%22%20fill%3D%22white%22%20fill-opacity%3D%220.8%22/%3E%0A%3Cpath%20d%3D%22M12.5%2019.5L6.5%2022.5V16.5L12.5%2019.5Z%22%20fill%3D%22white%22%20fill-opacity%3D%220.8%22/%3E%0A%3C/svg%3E%0A")' // Simple SVG handle
  };

  return (
    <section className="py-16 md:py-24 bg-contrast"> {/* Section wrapper */}
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">Before & After</h2>
        <div className="max-w-2xl mx-auto rounded-lg overflow-hidden shadow-lg border border-neutral-200">
          <BeforeAfterSlider
            firstImage={BEFORE_IMAGE}
            secondImage={AFTER_IMAGE}
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