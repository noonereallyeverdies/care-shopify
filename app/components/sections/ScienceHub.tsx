import React from 'react';
import { FlaskConical, ArrowUpRight, Dna, Brain, Sparkles, Microscope, ChevronDown, Sprout, Award, BookOpen, FileText } from 'lucide-react';
import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

// Hair growth cycle phases with detailed explanations
const hairCyclePhases = [
  {
    name: "Anagen",
    duration: "2-7 years",
    description: "The active growth phase where your hair follicle is hard at work producing a new hair shaft. About 85-90% of your hair is in this phase right now!"
  },
  {
    name: "Catagen",
    duration: "2-3 weeks",
    description: "The transition phase where growth stops and the follicle shrinks. Think of it like your hair taking a short break to reset."
  },
  {
    name: "Telogen",
    duration: "3-4 months",
    description: "The resting phase where old hair remains in place while a new hair prepares to grow. About 10-15% of your hairs are in this phase."
  },
  {
    name: "Exogen",
    duration: "2-5 months",
    description: "The shedding phase where old hairs fall out, making room for new growth. This is why losing 50-100 hairs daily is completely normal!"
  }
];

// Research credentials - added for credibility
const researchCredentials = [
  {
    icon: Award,
    title: "Nobel Prize Foundation",
    description: (
      <>
        Our technology is based on the science that won the{" "}
        <strong>2019 Nobel Prize in Physiology or Medicine</strong> for
        understanding{" "}
        <strong>how cells sense and adapt to oxygen availability</strong>.
      </>
    ),
  },
  {
    icon: BookOpen,
    title: "30+ Published Studies",
    description: (
      <>
        Red light therapy for hair growth is supported by{" "}
        <strong>over 30 peer-reviewed clinical studies</strong> in{" "}
        <strong>respected medical journals worldwide</strong>.
      </>
    ),
  },
  {
    icon: FileText,
    title: "FDA Recognition",
    description: (
      <>
        Low-level light therapy devices like ours are{" "}
        <strong>recognized by the FDA</strong> as{" "}
        <strong>safe and effective for stimulating hair follicles</strong> and
        promoting growth.
      </>
    ),
  },
];

export function ScienceHub() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  
  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  // Advanced science concepts explained simply
  const scienceConcepts = [
    {
      title: "Hair Follicle Structure",
      icon: Microscope,
      content: (
        <>
          <p className="mb-4">Your hair follicle is like a tiny factory beneath your skin. At the very bottom is the <strong>dermal papilla</strong> - imagine it as the control center that directs hair growth.</p>
          
          <p className="mb-4">The dermal papilla contains special cells that act like commanders, sending signals to the hair matrix (a group of rapidly dividing cells) to create your hair shaft. It's also packed with blood vessels that deliver nutrients and oxygen.</p>
          
          <p>When red light reaches the dermal papilla, it energizes these command cells, helping them send stronger growth signals and increasing blood flow to deliver more building materials for healthy hair.</p>
        </>
      )
    },
    {
      title: "Cellular Energy Production",
      icon: Sparkles,
      content: (
        <>
          <p className="mb-4">Inside every cell in your body are tiny power plants called <strong>mitochondria</strong>. These microscopic structures create ATP (adenosine triphosphate) - the energy currency your cells use for everything they do.</p>
          
          <p className="mb-4">Red light at our specific wavelengths (650-670nm) can penetrate your skin and be absorbed by an enzyme called cytochrome c oxidase within the mitochondria. This is like giving your cellular batteries a quick recharge!</p>
          
          <p>With this energy boost, hair follicle cells can work more efficiently - producing more keratin (the protein that makes up your hair), dividing faster, and staying in the growth phase longer.</p>
        </>
      )
    },
    {
      title: "Growth Factor Activation",
      icon: Dna,
      content: (
        <>
          <p className="mb-4">Your body naturally produces special proteins called <strong>growth factors</strong> that act like messengers, telling cells when to grow, divide, or create important substances.</p>
          
          <p className="mb-4">Red light therapy has been shown to increase production of growth factors like VEGF (Vascular Endothelial Growth Factor) which creates new blood vessels, and IGF-1 (Insulin-like Growth Factor 1) which stimulates cell growth.</p>
          
          <p>When these growth factors increase around your hair follicles, they create the perfect environment for thicker, stronger hair growth - like giving your hair the best possible growing conditions.</p>
        </>
      )
    },
    {
      title: "The Inflammation Connection",
      icon: Brain,
      content: (
        <>
          <p className="mb-4">Chronic inflammation around hair follicles is like having a constant small fire that damages hair growth. It's often invisible but can lead to hair thinning and loss over time.</p>
          
          <p className="mb-4">Red light therapy reduces inflammation by decreasing inflammatory signaling molecules (cytokines) and increasing anti-inflammatory molecules. It also helps regulate immune cell activity around the follicles.</p>
          
          <p>By calming this inflammatory response, red light creates a healthier scalp environment where hair can thrive - like removing weeds so your garden can grow better.</p>
        </>
      )
    }
  ];

  return (
    <motion.section 
      className="py-20 md:py-32 bg-gradient-to-b from-neutral-50 via-white to-white relative z-0 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-rose-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-rose-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.div 
              className="flex justify-center mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-rose-100 rounded-full p-6 relative">
                <FlaskConical className="h-10 w-10 md:h-12 md:w-12 text-rose-600 relative z-10" />
                <div className="absolute inset-0 bg-rose-200 rounded-full blur-lg opacity-70"></div>
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-5xl lg:text-6xl font-serif font-semibold text-neutral-900 text-center mb-6 lowercase tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            > 
              the deep science of hair renewal
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl text-center text-neutral-700 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Dive into the fascinating cellular world where red light interacts with your hair follicles to stimulate growth from within.
            </motion.p>
          </div>
          
          {/* Research Credentials - Added for credibility signaling */}
          <motion.div 
            className="bg-white border border-neutral-200 rounded-xl p-6 lg:p-8 mb-16 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-medium text-neutral-900 text-center mb-8">the science behind photonique</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {researchCredentials.map((credential, index) => (
                <motion.div 
                  key={index}
                  className="flex flex-col items-center text-center p-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <div className="bg-rose-100 rounded-full p-4 mb-4">
                    <credential.icon className="h-8 w-8 text-rose-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-neutral-800 mb-2">{credential.title}</h4>
                  <div className="text-sm text-neutral-600 leading-relaxed">{credential.description}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>


          {/* Advanced Science Accordion */}
          <div className="bg-white border border-neutral-200 rounded-xl p-6 lg:p-8 mb-16 shadow-sm">
            <h3 className="text-2xl font-medium text-neutral-900 text-center mb-8">understanding the mechanisms</h3>
            {scienceConcepts.map((concept, index) => (
              <motion.div 
                key={index} 
                className="border-b border-neutral-200 last:border-b-0"
                variants={itemVariants} // Using itemVariants for individual accordion items
              >
                <button 
                  onClick={() => toggleAccordion(index)}
                  className="flex justify-between items-center w-full py-5 text-left hover:bg-neutral-50 transition-colors duration-150 rounded-md px-4"
                >
                  <div className="flex items-center">
                    <div className="bg-rose-100 rounded-full p-3 mr-4">
                      <concept.icon className="h-6 w-6 text-rose-600" />
                    </div>
                    <span className="text-lg font-medium text-neutral-800">{concept.title}</span>
                  </div>
                  <ChevronDown 
                    className={`transform transition-transform duration-300 h-6 w-6 text-rose-500 ${openAccordion === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {openAccordion === index && (
                  <motion.div 
                    className="px-4 pb-5 pt-2 text-neutral-700 leading-relaxed text-left"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {concept.content}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Hair Cycle Section */}
          <motion.div 
            className="bg-white border border-neutral-200 rounded-xl p-6 lg:p-8 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-medium text-neutral-900 text-center mb-8">understanding your hair's natural rhythm</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {hairCyclePhases.map((phase, index) => (
                <motion.div 
                  key={index}
                  className="bg-rose-50 rounded-lg p-5 flex flex-col h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <h4 className="text-xl font-semibold text-rose-700 mb-2">{phase.name}</h4>
                  <p className="text-sm font-medium text-rose-600 mb-3">({phase.duration})</p>
                  <p className="text-neutral-700 text-sm leading-relaxed flex-grow">{phase.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Benefits Section (Commented out as it's now a separate component) */}
          {/* <KeyBenefitsSection /> */}

        </div>
      </div>
    </motion.section>
  );
}

export default ScienceHub; 