import { Button } from './Shared/Button';
import { Link } from '@remix-run/react';

export function FinalCta() {
  return (
    <section className="final-cta-section" style={{ padding: 'var(--section-padding-y) var(--container-padding-x)', textAlign: 'center', backgroundColor: 'var(--c-primary-text-dark)', color: 'var(--c-primary-white)' }}>
      <h2 style={{ marginBottom: 'var(--space-md)' }}>Ready for Radiant Growth?</h2>
      <p style={{ maxWidth: '50ch', margin: '0 auto var(--space-xl) auto', opacity: 0.9 }}>
        Invest in your hair's future with Care-atin's proven Red Light Therapy technology.
      </p>
      <Button to="/products/care-atin-rlt-device" variant="primary" size="large" as={Link}>
        Shop The Device Now
      </Button>
    </section>
  );
} 