// Placeholder for displaying "As Seen In" or partner logos

// Assume logos are provided as simple images
const logos = [
  { name: 'Example Publication 1', src: '/images/c-logo.png', alt: 'As seen in Example Publication 1' }, // Placeholder logo
  { name: 'Example Tech Blog', src: '/images/c-logo.png', alt: 'Featured on Example Tech Blog' }, // Placeholder logo
  { name: 'Example Wellness Site', src: '/images/c-logo.png', alt: 'Recommended by Example Wellness Site' }, // Placeholder logo
  { name: 'Another Example', src: '/images/c-logo.png', alt: 'Another Example Logo' }, // Placeholder logo
  // Add more logos as needed
];

export function SocialProofLogos() {
  if (!logos || logos.length === 0) {
    return null; // Don't render section if no logos provided
  }

  return (
    <section className="social-proof-logos" style={{ padding: 'var(--space-xxl) var(--container-padding-x)', backgroundColor: 'var(--c-primary-bg)' }}>
      <h3 style={{ textAlign: 'center', marginBottom: 'var(--space-lg)', color: 'var(--c-primary-text-medium)', fontSize: 'var(--font-size-h4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        As Featured In (Placeholder)
      </h3>
      <div className="logo-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 'var(--space-xl)' }}>
        {logos.map((logo) => (
          <img
            key={logo.name}
            src={logo.src}
            alt={logo.alt}
            style={{ height: '40px', maxWidth: '150px', objectFit: 'contain', opacity: 0.7 }} // Adjust height/width/opacity as needed
          />
        ))}
      </div>
    </section>
  );
} 