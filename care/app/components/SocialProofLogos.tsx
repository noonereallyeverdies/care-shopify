import { 
  // motion // Removed motion import
 } from 'framer-motion';

// Placeholder data - replace with actual logo paths and alt text
const logosData = [
  { src: '/logo-placeholder-1.png', alt: 'Partner Logo 1', link: '#' }, // Optional link per logo
  { src: '/logo-placeholder-2.png', alt: 'Partner Logo 2', link: '#' },
  { src: '/logo-placeholder-3.png', alt: 'Media Logo 3', link: '#' },
  { src: '/logo-placeholder-4.png', alt: 'Publication Logo 4', link: '#' },
  { src: '/logo-placeholder-5.png', alt: 'Brand Logo 5', link: '#' },
];

// Remove animation variants
/*
const sectionVariants = { ... };
const logoVariants = { ... };
*/

export function SocialProofLogos() {
  return (
    <section
      className="social-proof-logos py-16 md:py-20 bg-contrast text-center"
      // Removed motion props and inline styles
    >
      {/* Optional Title - Apply heading styles */}
      <h3 className="mb-10 text-sm font-medium uppercase tracking-wider text-neutral-600">
        Trusted By Leading Experts & Publications
      </h3>
      
      <div 
        className="logos-container flex flex-wrap justify-center items-center gap-x-10 gap-y-6 px-6"
      >
        {logosData.map((logo, index) => (
          <a
            key={index}
            href={logo.link || '#'} // Add link if available
            target="_blank" // Open links in new tab
            rel="noopener noreferrer"
            className="inline-block grayscale opacity-70 transition duration-300 hover:grayscale-0 hover:opacity-100"
          >
            <img 
              src={logo.src}
              alt={logo.alt}
              className="h-8 md:h-10 w-auto max-w-[120px] md:max-w-[150px]" // Use Tailwind for sizing
              loading="lazy"
            />
          </a>
        ))}
      </div>
    </section>
  );
} 