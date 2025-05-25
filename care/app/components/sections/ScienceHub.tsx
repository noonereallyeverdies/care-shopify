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
    description: "Our technology is based on the science that won the 2019 Nobel Prize in Physiology or Medicine for understanding how cells sense and adapt to oxygen availability."
  },
  {
    icon: BookOpen,
    title: "30+ Published Studies",
    description: "Red light therapy for hair growth is supported by over 30 peer-reviewed clinical studies in respected medical journals worldwide."
  },
  {
    icon: FileText,
    title: "FDA Recognition",
    description: "Low-level light therapy devices like ours are recognized by the FDA as safe and effective for stimulating hair follicles and promoting growth."
  }
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
              className="flex justify-center mb-8"
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
            <h3 className="text-2xl font-medium text-neutral-900 text-center mb-8">backed by serious science</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {researchCredentials.map((credential, index) => (
                <motion.div 
                  key={index}
                  className="flex flex-col items-center text-center p-4"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-rose-50 rounded-full p-4 mb-4">
                    <credential.icon className="h-8 w-8 text-rose-600" />
                  </div>
                  <h4 className="text-lg font-medium text-neutral-900 mb-2">{credential.title}</h4>
                  <p className="text-neutral-700 text-sm">{credential.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hair Growth Cycle Visualization */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-serif font-medium text-neutral-900 text-center mb-12 lowercase">
              understanding the hair growth cycle
            </h3>
            
            <div className="relative">
              {/* Cycle Circle Background */}
              <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border-2 border-dashed border-rose-200 opacity-60"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {hairCyclePhases.map((phase, index) => (
                  <motion.div
                    key={phase.name}
                    className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 relative z-10 h-full flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mb-4">
                      <span className="text-rose-600 font-bold">{index + 1}</span>
                    </div>
                    <h4 className="text-xl font-medium text-neutral-900 mb-2">{phase.name}</h4>
                    <div className="text-sm text-rose-600 mb-3">{phase.duration}</div>
                    <p className="text-neutral-700 leading-relaxed text-sm flex-grow">{phase.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Advanced Science Concepts in Expandable Accordions */}
          <div className="mb-20">
            <motion.h3 
              className="text-2xl md:text-3xl font-serif font-medium text-neutral-900 text-center mb-12 lowercase"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              the cellular science explained
            </motion.h3>
            
            <div className="space-y-6 max-w-4xl mx-auto">
              {scienceConcepts.map((concept, index) => (
                <motion.div 
                  key={concept.title}
                  className="border border-neutral-200 rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div 
                    className={`px-6 py-5 flex items-center justify-between cursor-pointer ${openAccordion === index ? 'bg-rose-50' : 'bg-white'}`}
                    onClick={() => toggleAccordion(index)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${openAccordion === index ? 'bg-rose-100 text-rose-600' : 'bg-neutral-100 text-neutral-600'}`}>
                        <concept.icon className="h-5 w-5" />
                      </div>
                      <h4 className="text-lg font-medium text-neutral-900">{concept.title}</h4>
                    </div>
                    <ChevronDown className={`h-5 w-5 text-neutral-500 transition-transform ${openAccordion === index ? 'transform rotate-180' : ''}`} />
                  </div>
                  
                  {openAccordion === index && (
                    <motion.div 
                      className="px-6 py-5 bg-white border-t border-neutral-100"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="prose prose-sm text-neutral-700 max-w-none">
                        {concept.content}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Key Benefits Visualization */}
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-serif font-medium text-neutral-900 text-center mb-12 lowercase">
              how red light transforms your hair
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Sprout,
                  title: "Extends Growth Phase",
                  description: "Red light therapy helps keep hair follicles in the anagen (growth) phase longer, resulting in thicker, longer hair before shedding occurs.",
                  benefit: "Your hair grows for months longer before entering the resting phase"
                },
                {
                  icon: Sparkles,
                  title: "Increases Hair Diameter",
                  description: "By energizing follicle cells to produce more keratin, red light therapy increases the diameter of individual hair shafts by up to 15%.",
                  benefit: "Each strand becomes visibly thicker, creating fuller-looking hair"
                },
                {
                  icon: Brain,
                  title: "Revitalizes Dormant Follicles",
                  description: "Our specific wavelengths can reactivate follicles that have become dormant but aren't permanently lost, restarting the growth cycle.",
                  benefit: "Hair grows in areas that had previously thinned or stopped growing"
                }
              ].map((benefit, index) => (
              <motion.div 
                key={index}
                  className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8 text-center h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="h-8 w-8 text-rose-600" />
                  </div>
                  <h4 className="text-xl font-medium text-neutral-900 mb-4">{benefit.title}</h4>
                  <p className="text-neutral-700 leading-relaxed mb-4 flex-grow">{benefit.description}</p>
                  <div className="mt-auto bg-rose-50 py-3 px-4 rounded-lg">
                    <p className="text-rose-600 font-medium text-sm">
                      What this means for you: {benefit.benefit}
                    </p>
                </div>
              </motion.div>
            ))}
          </div>
          </motion.div>
          
          {/* Treatment Specs - Clinical details for credibility */}
          <motion.div 
            className="mb-20 bg-neutral-50 rounded-2xl p-8 md:p-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-medium text-neutral-900 text-center mb-8">precise science, precise results</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="text-rose-600 font-bold text-3xl mb-2">650-680nm</div>
                <p className="text-neutral-700">Optimized red light wavelength for maximum cellular stimulation</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="text-rose-600 font-bold text-3xl mb-2">12 J/cm²</div>
                <p className="text-neutral-700">Clinical-grade energy dosage proven effective in research</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="text-rose-600 font-bold text-3xl mb-2">5 min</div>
                <p className="text-neutral-700">Quick treatment sessions, just 3 times per week</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-neutral-700 mb-6 max-w-3xl mx-auto">
                Our precise wavelength technology is based on the same science used in clinical studies showing 
                up to 35% increase in hair count in participants with androgenetic alopecia after 16 weeks.
              </p>
            </div>
          </motion.div>

          {/* Scientific Studies Link */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/pages/science" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-600 text-white hover:bg-rose-700 transition-colors text-lg font-medium shadow-md hover:shadow-lg"
            >
              Explore our clinical research
                <ArrowUpRight className="h-5 w-5" />
            </Link>
            
            <p className="text-neutral-500 text-sm mt-4">
              View our complete library of scientific research and clinical studies
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
} 