import { Button } from './Shared/Button';
import { Link } from '@remix-run/react';

// Placeholder Icon component (replace with actual Icon component later)
const Icon = ({ name }: { name: string }) => (
  <div style={{ width: '40px', height: '40px', background: 'var(--c-accent-rlt)', borderRadius: '50%', margin: '0 auto var(--space-md)', color: 'white', display:'flex', alignItems:'center', justifyContent:'center' }}>{name.substring(0,1)}</div>
);

export function HowItWorksSnippet() {
  return (
    <section className="how-it-works-snippet" style={{ padding: 'var(--section-padding-y) var(--container-padding-x)', backgroundColor: 'var(--c-secondary-nature-beige)' /* Example subtle bg */ }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h2>How Red Light Therapy Works for Hair</h2>
        <p style={{ margin: 'var(--space-md) auto var(--space-xl) auto', color: 'var(--c-primary-text-medium)' }}>
          Specific wavelengths of light energize cells within the hair follicle, promoting circulation and supporting the natural growth cycle.
        </p>
        <div className="benefits-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-xl)', marginBottom: 'var(--space-xl)' }}>
          {/* Placeholder items */}
          <div className="benefit-item">
            <Icon name="Energy" />
            <h4>Energizes Follicles</h4>
            <p style={{ fontSize: 'var(--font-size-small)', color: 'var(--c-primary-text-medium)' }}>Boosts cellular activity.</p>
          </div>
          <div className="benefit-item">
            <Icon name="Circulation" />
            <h4>Boosts Circulation</h4>
             <p style={{ fontSize: 'var(--font-size-small)', color: 'var(--c-primary-text-medium)' }}>Delivers more nutrients.</p>
         </div>
          <div className="benefit-item">
            <Icon name="Inflammation" />
            <h4>Reduces Inflammation</h4>
            <p style={{ fontSize: 'var(--font-size-small)', color: 'var(--c-primary-text-medium)' }}>Creates a healthier scalp.</p>
          </div>
        </div>
        <Button to="/science" variant="secondary" as={Link}>
          Learn More About The Science
        </Button>
      </div>
    </section>
  );
} 