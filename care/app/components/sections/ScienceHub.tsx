import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { FlaskConical, ArrowUpRight, BookOpen } from 'lucide-react';
import { Link } from '@remix-run/react';

// Spring physics config 
const spring = {
  type: "spring",
  stiffness: 250,
  damping: 30,
  mass: 0.8
};

export function ScienceHub() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-br from-white to-neutral-50">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <motion.div 
              className="bg-red-100 rounded-full p-4 relative"
              animate={{ 
                boxShadow: [
                  "0 0 0 0px rgba(220, 38, 38, 0.2)",
                  "0 0 0 10px rgba(220, 38, 38, 0)",
                  "0 0 0 0px rgba(220, 38, 38, 0)"
                ]
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <FlaskConical className="h-8 w-8 md:h-10 md:w-10 text-rose-600 relative z-10" />
            </motion.div>
          </div>
          
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-900 text-center mb-6 lowercase tracking-[0.02em]"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0, transition: spring } }}
          >
            the science of hair renewal
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-center text-neutral-700 mb-16 max-w-2xl mx-auto leading-[1.618]"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0, transition: { ...spring, delay: 0.1 } } }}
          >
            How red light wavelengths at 650-670nm penetrate the scalp to stimulate cellular activity and unlock your hair's natural potential.
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Targeted Wavelengths",
                description: "Our device emits precise red light wavelengths that penetrate the scalp to reach hair follicles without harmful UV radiation.",
                icon: FlaskConical
              },
              {
                title: "Cellular Energization",
                description: "Red light stimulates ATP production in mitochondria, providing energy for increased keratin production and healthier hair growth.",
                icon: FlaskConical
              },
              {
                title: "Circulation Enhancement",
                description: "Improved microcirculation delivers more nutrients and oxygen to follicles, creating an optimal environment for growth.",
                icon: FlaskConical
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                variants={{ visible: { opacity: 1, y: 0, transition: { ...spring, delay: 0.2 + (index * 0.1) } } }}
                whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.1)", transition: spring }}
              >
                <div className="bg-rose-50 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                  <item.icon className="h-6 w-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-medium text-neutral-900 mb-3 lowercase tracking-[0.02em]">{item.title}</h3>
                <p className="text-base text-neutral-700 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0, transition: { ...spring, delay: 0.5 } } }}
          >
            <Link to="/science" className="group inline-flex items-center gap-2">
              <motion.span 
                className="text-lg font-medium text-rose-500 border-b border-rose-200 pb-1"
                whileHover={{ borderColor: "rgba(244, 63, 94, 1)", transition: { duration: 0.3 } }}
              >
                Explore our research
              </motion.span>
              <motion.span 
                className="text-rose-500"
                whileHover={{ x: 3, transition: { duration: 0.2 } }}
              >
                <ArrowUpRight className="h-5 w-5" />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 