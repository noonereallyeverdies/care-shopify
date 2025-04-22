import { Button } from './Shared/Button';
import { Link } from '@remix-run/react';

export function HeroSection() {
  // Placeholder content and structure
  // Styling and final content to be added later
  // Placeholder image usage:
  const placeholderImageUrl = '/images/prettyhair.jpg'; // Example placeholder

  return (
    <section className="hero-section" style={{ /* Basic inline style for background placeholder */ backgroundImage: `url(${placeholderImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '70vh' }}>
      <div className="hero-content" style={{ /* Basic overlay/centering */ backgroundColor: 'rgba(0,0,0,0.3)', color: 'white', padding: 'var(--space-xxl)', textAlign: 'center' }}>
        <h1>Red Light Therapy for Healthier, Fuller Hair</h1>
        <p style={{ margin: 'var(--space-lg) 0' }}>
          Experience the science of radiant growth. Our clinically inspired RLT device revitalizes follicles for visibly thicker, stronger hair.
        </p>
        <Button to="/products/care-atin-rlt-device" variant="primary" size="large" as={Link}>
          Shop The Device
        </Button>
        {/* Optional secondary button */}
        {/* <Button to="/science" variant="secondary" size="large" as={Link}>Learn The Science</Button> */}
      </div>
    </section>
  );
} 