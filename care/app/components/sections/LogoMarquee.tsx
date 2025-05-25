import React from 'react';

// Placeholder logos - replace with actual image paths or components
const placeholderLogos = [
  'BRAND A', 'BRAND B', 'BRAND C', 'BRAND D', 'BRAND E', 'BRAND F'
];

// Basic CSS for marquee effect - Consider moving to a CSS file for more complex styling
const marqueeStyles = `
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

.marquee-inner {
  display: flex;
  width: fit-content; /* Fit content width based on logos */
  animation: scroll 30s linear infinite; /* Adjust duration as needed */
  will-change: transform; /* Optimize animation performance */
}

.marquee-inner > * {
  flex-shrink: 0;
  padding: 0 2rem; /* Adjust spacing between logos */
  /* Add styling for logos - grayscale, height, etc. */
  filter: grayscale(100%);
  opacity: 0.6;
  height: 40px; /* Example height */
  width: auto;
  display: flex; /* Center text vertically if using text */
  align-items: center;
  font-family: sans-serif;
  color: #888; /* Placeholder text color */
}
`;

export function LogoMarquee() {
  // Duplicate logos for seamless loop
  const extendedLogos = [...placeholderLogos, ...placeholderLogos];

  return (
    <section className="py-12 bg-neutral-50 overflow-hidden"> {/* Section wrapper */}
      <style dangerouslySetInnerHTML={{ __html: marqueeStyles }} /> {/* Inject basic CSS */}
      <div className="container mx-auto max-w-7xl px-4">
        <p className="text-center text-sm uppercase tracking-widest text-neutral-500 mb-8">
          As featured in
        </p>
        <div className="marquee-container w-full relative">
          <div className="marquee-inner">
            {extendedLogos.map((logo, index) => (
              // Replace div with img tag when using actual logos
              <div key={index} className="logo-item">
                {logo} 
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 