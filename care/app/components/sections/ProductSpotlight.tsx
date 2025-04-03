import React from 'react';
import { Lightbulb, Feather, ShieldCheck, CheckCircle } from 'lucide-react'; // Example icons

// Placeholder data for features
const features = [
  {
    icon: Lightbulb,
    title: "Precision Wavelengths",
    description: "Clinically validated 660nm red light targets follicles effectively."
  },
  {
    icon: Feather,
    title: "Comfortable & Lightweight",
    description: "Ergonomically designed for easy and relaxing treatment sessions."
  },
  {
    icon: ShieldCheck,
    title: "Safety Certified",
    description: "Built with high-quality materials and adheres to strict safety standards."
  },
  {
    icon: CheckCircle,
    title: "Full Scalp Coverage",
    description: "Ensures consistent light delivery across the entire treatment area."
  }
];

export const ProductSpotlight = () => {
  return (
    // Consistent section styling: spacing, background
    <section className="py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Consistent heading style */}
        <h2 className="text-center font-sans text-4xl md:text-5xl font-medium text-neutral-800 mb-16">
          Engineered for Effortless Results
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Placeholder for Product Image/Render */}
          <div className="aspect-square bg-neutral-100 rounded-3xl flex items-center justify-center border border-neutral-200/60 shadow-lg">
            <p className="text-neutral-400">[Product Image Placeholder]</p>
          </div>

          {/* Feature Callouts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col">
                <feature.icon className="h-8 w-8 text-red-500 mb-3" />
                {/* Consistent text styles */}
                <h3 className="font-sans text-xl font-medium text-neutral-800 mb-1">{feature.title}</h3>
                <p className="font-sans text-base leading-relaxed text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 