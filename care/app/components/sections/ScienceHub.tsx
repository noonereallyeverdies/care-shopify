import { FlaskConical, ArrowUpRight } from 'lucide-react';
import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';

// Define animation variants for container and items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Stagger the animation of children
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

export function ScienceHub() {
  // Original content for ScienceHub
  const originalPoints = [
    {
      title: "Targeted Wavelengths",
      description: "Our device emits precise red light wavelengths that penetrate the scalp to reach hair follicles without harmful UV radiation.",
      icon: FlaskConical
    },
    {
      title: "Cellular Energization",
      description: "Red light stimulates ATP production in mitochondria, providing energy for increased keratin production and healthier hair growth.",
      icon: FlaskConical // Kept original icon usage
    },
    {
      title: "Circulation Enhancement",
      description: "Improved microcirculation delivers more nutrients and oxygen to follicles, creating an optimal environment for growth.",
      icon: FlaskConical // Kept original icon usage
    }
  ];

  return (
    // Wrap the section with motion.section and add animation props
    <motion.section 
      className="py-16 md:py-24 bg-gradient-to-b from-neutral-50 via-white to-white relative z-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.2 }} // Trigger slightly earlier
    >
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Main Section Icon */}
          <div className="flex justify-center mb-8">
            <div className="bg-rose-100 rounded-full p-4 relative">
              <FlaskConical className="h-8 w-8 md:h-10 md:w-10 text-rose-600 relative z-10" />
            </div>
          </div>
          
          {/* Original Title - Using font-serif, lowercase */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-neutral-900 text-center mb-6 lowercase tracking-[0.02em]"> 
            the science of hair renewal
          </h2>
          
          {/* Original Intro Paragraph */}
          <p className="text-lg md:text-xl text-center text-neutral-700 mb-16 max-w-2xl mx-auto leading-relaxed">
            How red light wavelengths at 650-670nm penetrate the scalp to stimulate cellular activity and unlock your hair's natural potential.
          </p>
          
          {/* Apply container variants to the grid */}
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Trigger when grid starts entering view
          >
            {originalPoints.map((item, index) => (
              // Apply item variants to each card
              <motion.div 
                key={index}
                className="content-card p-6 bg-white border border-neutral-100 flex flex-col" 
                variants={itemVariants}
                // `initial` and `animate` props are inherited from the parent motion component
              >
                <div className="bg-rose-50 w-12 h-12 rounded-full flex items-center justify-center mb-6 flex-shrink-0">
                  <item.icon className="h-6 w-6 text-rose-600" />
                </div>
                {/* Original Title Style - Using font-serif, lowercase */}
                <h3 className="text-xl font-serif font-medium text-neutral-900 mb-3 lowercase">
                  {item.title}
                </h3>
                {/* Original Description Style */}
                <p className="text-base text-neutral-700 leading-relaxed flex-grow">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Original Bottom Link */}
          <div className="mt-16 text-center">
            <Link 
              to="/science" 
              className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-800 hover:underline transition-colors text-lg font-medium"
            >
              Explore our research
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
} 