import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Clock, Pill, CheckCircle, ShieldCheck, Zap, ExternalLink, Info, DollarSign, BarChart3, AlertTriangle } from 'lucide-react';
import { Link } from '@remix-run/react';

// --- Data ---
const comparisonData = {
  heading: "why it works where others don't",
  treatments: [
    {
      name: 'Prescription Drugs',
      icon: Pill,
      cost: '$200+/mo',
      efficacy: 'Single mechanism',
      sideEffects: 'Hormonal risks',
      convenience: 'Requires doctor visit',
      details: 'Commonly minoxidil or finasteride. Can be effective but require ongoing use and may have systemic side effects.',
      isCareatin: false,
    },
    {
      name: 'Hair Transplant',
      icon: Clock, // Representing time/recovery
      cost: '$5k–$15k',
      efficacy: 'Varies significantly',
      sideEffects: 'Scarring, downtime',
      convenience: 'Surgical recovery',
      details: 'Moves existing hair follicles. Effectiveness depends on donor hair availability and surgeon skill. Invasive and costly.',
      isCareatin: false,
    },
    {
      name: 'photonique touch™',
      icon: Cloud, // Representing comfort/gentle
      cost: '$89 one-time',
      efficacy: 'Triple-pathway support',
      sideEffects: 'None reported',
      convenience: '5 mins at home',
      details: 'Combines red light therapy, biomimetic massage, and targeted oil delivery to reactivate follicles gently and effectively.',
      isCareatin: true,
      badges: ['FDA-Cleared', 'Clinically Tested', 'Drug-Free']
    },
  ],
  subText: [
    { icon: ShieldCheck, text: '**FDA-Cleared Device #K2023765** — Safe for all hair types & genders' },
    { icon: CheckCircle, text: '**90-Day Money-Back Guarantee** — Try it risk-free or return it, no questions asked' }
  ],
  primaryCta: 'Claim Your $40 Discount Today →',
  secondaryCta: 'See Complete Clinical Results →',
  secondaryCtaLink: '/pages/science' // Link for clinical results
};

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 10 }, // Slightly smaller y offset
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' } // Faster duration
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08, // Faster stagger for badges
    }
  }
};

// --- Component ---
export function ComparisonSection() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <section className="section-spacing bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="brand-heading text-3xl md:text-4xl lg:text-5xl text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {comparisonData.heading}
        </motion.h2>

        {/* Comparison Table - Using Flexbox/Grid for responsiveness */}
        <div className="space-y-4 md:space-y-0 md:border md:border-neutral-200 md:rounded-lg overflow-hidden">
          {/* Header Row (Visible on larger screens) - ADD ICONS */}
          <div className="hidden md:grid md:grid-cols-5 gap-4 px-6 py-3 bg-neutral-50 text-xs font-medium uppercase tracking-wider text-neutral-500 items-center">
            <div>Treatment</div>
            <div className="flex items-center justify-center gap-1">
              <DollarSign size={12} /> Cost
            </div>
            <div className="flex items-center justify-center gap-1">
              <BarChart3 size={12} /> Efficacy
            </div>
            <div className="flex items-center justify-center gap-1">
              <AlertTriangle size={12} /> Side Effects
            </div>
            <div className="flex items-center justify-center gap-1">
              <Clock size={12} /> Convenience
            </div>
          </div>

          {/* Treatment Rows */}
          {comparisonData.treatments.map((treatment, index) => {
            const Icon = treatment.icon;
            const isExpanded = expandedRow === index;
            return (
              <motion.div 
                key={treatment.name}
                className={`border border-neutral-200 rounded-lg overflow-hidden transition-all duration-300 md:border-0 md:rounded-none md:border-b md:border-neutral-200 last:md:border-b-0 ${treatment.isCareatin ? 'bg-emerald-50/50 md:bg-emerald-50/30' : 'bg-white'} group md:hover:shadow-md md:hover:bg-${treatment.isCareatin ? 'emerald-50/60' : 'neutral-50/50'}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 20 }} // Apply spring to hover/tap
                whileHover={{ scale: 1.01 }} // Subtle scale on hover
              >
                {/* Main row content */}
                <div 
                  className="grid grid-cols-3 md:grid-cols-5 gap-4 px-4 py-4 md:px-6 items-center cursor-pointer md:cursor-default"
                  onClick={() => toggleExpand(index)} // Toggle on click for the whole row on mobile
                >
                  {/* Name + Icon + Badges (Mobile stacked, Desktop first col) */}
                  <div className="col-span-3 md:col-span-1 flex flex-col md:flex-row items-start md:items-center gap-2">
                    <Icon size={20} className={`flex-shrink-0 ${treatment.isCareatin ? 'text-emerald-600' : 'text-neutral-500'}`} />
                    <div className="flex flex-col">
                      <span className={`font-semibold ${treatment.isCareatin ? 'text-emerald-700' : 'text-neutral-800'}`}>
                        {treatment.name}
                      </span>
                      {/* Badges for Careatin - Apply Stagger Animation */}
                      {treatment.isCareatin && treatment.badges && (
                        <motion.div 
                          className="flex flex-wrap gap-1 mt-1"
                          variants={staggerContainer}
                          initial="hidden" // Initial state for stagger
                          animate="visible" // Animate when parent row is in view
                        >
                          {treatment.badges.map(badge => (
                            <motion.span 
                              key={badge} 
                              className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium"
                              variants={fadeInUp} // Apply fade in to each badge
                            >
                              {badge}
                            </motion.span>
                          ))}
                        </motion.div>
                      )}
                    </div>
                    {/* Mobile Expand Icon */}
                    <button 
                      className="ml-auto md:hidden text-neutral-400 group-hover:text-neutral-600"
                      aria-label={isExpanded ? "Collapse details" : "Expand details"}
                      aria-expanded={isExpanded}
                    >
                       <Info size={16} />
                    </button>
                  </div>
                  
                  {/* Data Cells (Hidden labels on mobile) */}
                  <div className="text-center text-sm text-neutral-600">
                    <span className="md:hidden text-xs font-medium uppercase text-neutral-400">Cost: </span>
                    {treatment.cost}
                  </div>
                  <div className="text-center text-sm text-neutral-600">
                    <span className="md:hidden text-xs font-medium uppercase text-neutral-400">Efficacy: </span>
                    {treatment.efficacy}
                  </div>
                  <div className="text-center text-sm text-neutral-600">
                    <span className="md:hidden text-xs font-medium uppercase text-neutral-400">Side Effects: </span>
                    {treatment.sideEffects}
                  </div>
                  <div className="text-center text-sm text-neutral-600">
                    <span className="md:hidden text-xs font-medium uppercase text-neutral-400">Convenience: </span>
                    {treatment.convenience}
                  </div>
                </div>

                {/* Expandable Details (Mobile) */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="md:hidden px-4 pb-4 pt-2 border-t border-neutral-200 overflow-hidden"
                    >
                      <p className="text-sm text-neutral-600">
                        {treatment.details}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Sub-text below table */}
        <div className="mt-8 space-y-3 text-center max-w-2xl mx-auto">
          {comparisonData.subText.map((item, index) => {
            const SubIcon = item.icon;
            // Basic markdown bold parser
            const parts = item.text.split(/\*\*(.*?)\*\*/g);
            return (
              <div key={index} className="flex items-center justify-center gap-2 text-sm text-neutral-600">
                <SubIcon size={16} className="text-emerald-600 flex-shrink-0" />
                <span>
                  {parts.map((part, i) => 
                    i % 2 === 1 ? <strong key={i} className="font-semibold text-neutral-700">{part}</strong> : part
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {/* CTAs */} 
        <div className="mt-10 text-center space-y-4 md:space-y-0 md:space-x-4">
          <motion.button 
            className="btn-primary-refined" // Use existing primary button style
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {comparisonData.primaryCta}
          </motion.button>
          <Link 
            to={comparisonData.secondaryCtaLink} 
            className="inline-flex items-center text-sm font-medium text-rose-600 hover:text-rose-700 group"
          >
            {comparisonData.secondaryCta}
            <ExternalLink size={14} className="ml-1 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

      </div>
    </section>
  );
} 