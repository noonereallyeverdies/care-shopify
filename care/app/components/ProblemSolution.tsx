// Placeholder for Problem/Solution section
// Needs icons and final copy

// Placeholder Icon component (replace with actual Icon component later)
const Icon = ({ name }: { name: string }) => (
  <div style={{ width: '40px', height: '40px', background: 'var(--c-accent-rlt)', borderRadius: '50%', margin: '0 auto var(--space-md)', color: 'white', display:'flex', alignItems:'center', justifyContent:'center' }}>{name.substring(0,1)}</div>
);

export function ProblemSolution() {
  return (
    <section className="problem-solution-section" style={{ padding: 'var(--section-padding-y) var(--container-padding-x)', textAlign: 'center' }}>
      <h2>Tired of Thinning Hair & Scalp Issues?</h2>
      <p style={{ maxWidth: '60ch', margin: 'var(--space-md) auto var(--space-xl) auto', color: 'var(--c-primary-text-medium)' }}>
        You're not alone. Millions experience hair concerns affecting their confidence. Care-atin offers a targeted, science-backed approach.
      </p>
      <div className="solutions-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-xl)' }}>
        {/* Placeholder items */}
        <div className="solution-item">
          <Icon name="Thinning" />
          <h3>Addresses Thinning</h3>
          <p style={{ color: 'var(--c-primary-text-medium)', fontSize: 'var(--font-size-small)' }}>Targets follicles to support fuller-looking hair.</p>
        </div>
        <div className="solution-item">
          <Icon name="Scalp" />
          <h3>Promotes Scalp Health</h3>
          <p style={{ color: 'var(--c-primary-text-medium)', fontSize: 'var(--font-size-small)' }}>RLT helps create an optimal environment for hair growth.</p>
        </div>
        <div className="solution-item">
          <Icon name="Science" />
          <h3>Science-Backed</h3>
          <p style={{ color: 'var(--c-primary-text-medium)', fontSize: 'var(--font-size-small)' }}>Leverages proven low-level light therapy principles.</p>
        </div>
      </div>
    </section>
  );
} 