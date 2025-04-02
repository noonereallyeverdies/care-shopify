import React from 'react';

// Placeholder for an Icon component or SVG
const PlaceholderIcon = () => (
  <div className="w-16 h-16 bg-brand/50 border border-brand rounded-full mb-6 mx-auto flex items-center justify-center text-brand">
    {/* Placeholder */}
  </div>
);

interface BenefitItemProps {
  title: string;
  description: string;
}

const BenefitItem = ({ title, description }: BenefitItemProps) => (
  <div className="flex flex-col items-center text-center p-6 flex-1 min-w-[220px]">
    <PlaceholderIcon />
    <h3 className="text-xl md:text-2xl font-semibold mb-3 text-primary">{title}</h3>
    <p className="text-primary/80 text-base">{description}</p>
  </div>
);

export function KeyBenefits() {
  // Sample benefits data - replace with actual content
  const benefits = [
    {
      title: 'Stronger Follicles',
      description: 'Nourishes roots and strengthens hair from within.',
    },
    {
      title: 'Increased Fullness',
      description: 'Promotes scalp health for visibly thicker-looking hair.',
    },
    {
      title: 'Enhanced Shine',
      description: 'Revitalizes hair strands for a healthy, natural shine.',
    },
    // Add more benefits if needed
  ];

  return (
    <section className="w-full max-w-7xl py-16 md:py-24 px-6 bg-contrast">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-primary">
        Why You'll Love care•atin
      </h2>
      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
        {benefits.map((benefit) => (
          <BenefitItem
            key={benefit.title}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
      </div>
    </section>
  );
} 