import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Wind, HelpCircle, Sparkles } from 'lucide-react';
import { Link } from '@remix-run/react';

interface OldWayCardProps {
  icon: React.ElementType;
  title: string;
  text: string;
  delay: number;
}

const OldWayCard: React.FC<OldWayCardProps> = ({ icon, title, text, delay }) => {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, amount: 0.3 });
  const IconComponent = icon;

  return (
    <motion.div
      ref={cardRef}
      className="bg-white p-6 md:p-8 rounded-xl shadow-soft hover:shadow-soft-lg transition-shadow duration-300 h-full flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <div className="flex-shrink-0 mb-4">
        <IconComponent className="w-10 h-10 text-sage-green opacity-80" />
      </div>
      <h3 className="text-xl font-medium text-charcoal mb-2">{title}</h3>
      <p className="text-neutral-600 text-sm leading-relaxed flex-grow">{text}</p>
    </motion.div>
  );
};

export function ProblemSolutionSection() {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const problemPoints = [
    {
      icon: Wind,
      title: 'Surface-Level Fixes',
      text: 'Many products offer a temporary illusion of health, masking underlying issues without fostering true, lasting vitality from within.',
      delay: 0.2,
    },
    {
      icon: HelpCircle,
      title: 'Complex & Confusing Routines',
      text: 'The world of hair care can be overwhelming, filled with complicated steps and ingredient lists that leave you guessing what truly benefits your hair.',
      delay: 0.4,
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-32 bg-cream-50 overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm uppercase tracking-wider text-rose-500 mb-3 font-medium">
            Tired of Endless Promises?
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-charcoal mb-6 leading-tight">
            Beautiful Hair Shouldn&apos;t Be Complicated.
          </h2>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto leading-relaxed">
            Traditional approaches often mean temporary fixes and harsh routines. We believe in a gentler, smarter path to the vibrant, healthy hair you deserve.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 mb-16 md:mb-20 max-w-4xl mx-auto">
          {problemPoints.map((point, index) => (
            <OldWayCard
              key={index}
              icon={point.icon}
              title={point.title}
              text={point.text}
              delay={point.delay}
            />
          ))}
        </div>

        <motion.div
          className="text-center py-12 md:py-16 bg-white rounded-xl shadow-soft-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="flex justify-center mb-4">
            <Sparkles className="w-12 h-12 text-rose-500 opacity-80" />
          </div>
          <h3 className="text-3xl md:text-4xl font-light text-charcoal mb-4">
            Introducing the Care•atin Difference
          </h3>
          <p className="text-neutral-700 max-w-xl mx-auto mb-8 leading-relaxed">
            A simpler, science-backed approach that nurtures from within for visibly healthier, more radiant hair. Pure, effective, and designed for you.
          </p>
          <Link 
            to="/pages/science" 
            className="inline-flex items-center px-8 py-3 bg-rose-500 text-white text-base font-medium rounded-full hover:bg-rose-600 transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 focus:ring-offset-white"
          >
            Discover Our Gentle Science
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}