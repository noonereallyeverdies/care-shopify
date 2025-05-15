import React from 'react';
import { Zap, ShieldCheck, RefreshCw, Users } from 'lucide-react'; // Example icons

// TODO: Replace with actual key benefits, descriptions, and potentially different icons
const benefits = [
  {
    icon: Zap,
    title: "Rapid Follicle Activation",
    description: "Experience noticeable improvements quickly with our advanced light therapy."
  },
  {
    icon: ShieldCheck,
    title: "Clinically Proven Results",
    description: "62% less shedding in 30 days. 28% more density in 90 days. Backed by clinical research and FDA-recognized technology."
  },
  {
    icon: RefreshCw,
    title: "Effortless, Lasting Transformation",
    description: "Non-invasive, drug-free, and easy to use at home. Results amplify with consistent use."
  },
  {
    icon: Users, // Example for a fourth benefit if needed
    title: "Easy At-Home Convenience",
    description: "Integrate our simple treatment into your daily routine effortlessly."
  }
];

export function KeyBenefitsSection() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 tracking-tight">
            The Care•atin Difference
          </h2>
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
            Experience luxury hair science: real results, elegant technology, and effortless confidence.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.slice(0, 3).map((benefit, index) => { // Displaying 3 benefits, adjust as needed
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-neutral-50 rounded-lg shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
                <div className="p-3 bg-rose-100 rounded-full mb-4">
                  <IconComponent className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-700 mb-2">{benefit.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 