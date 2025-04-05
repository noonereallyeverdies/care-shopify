import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Mail } from 'lucide-react';

// Spring physics config
const spring = {
  type: "spring",
  stiffness: 250,
  damping: 30,
  mass: 0.8
};

export function JournalSignup() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1000);
    
    // TODO: Replace with actual form submission
  };

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-br from-neutral-50 to-red-50/30">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
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
              <Mail className="h-8 w-8 text-rose-600 relative z-10" />
            </motion.div>
          </div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-semibold text-neutral-900 text-center mb-6 lowercase tracking-[0.02em]"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0, transition: spring } }}
          >
            join our exclusive journal
          </motion.h2>
          
          <motion.p 
            className="text-lg text-center text-neutral-700 mb-10 max-w-2xl mx-auto leading-[1.618]"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0, transition: { ...spring, delay: 0.1 } } }}
          >
            Get early access to new research, product launches, and expert hair wellness advice. Our bi-weekly journal features content not available anywhere else.
          </motion.p>
          
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0, transition: { ...spring, delay: 0.2 } } }}
          >
            <div className="flex-grow">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-5 py-4 rounded-full border border-neutral-200 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none text-neutral-900 placeholder:text-neutral-400"
                required
              />
            </div>
            <motion.button
              type="submit"
              className="px-8 py-4 rounded-full bg-rose-500 text-white font-medium whitespace-nowrap"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(225, 29, 72, 0.4)", transition: spring }}
              whileTap={{ scale: 0.98, transition: spring }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </motion.button>
          </motion.form>
          
          {isSubmitted && (
            <motion.div
              className="mt-6 text-center text-rose-600 font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={spring}
            >
              Thank you for subscribing to our journal!
            </motion.div>
          )}
          
          <motion.p
            className="mt-8 text-center text-sm text-neutral-500"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{ visible: { opacity: 1, transition: { ...spring, delay: 0.3 } } }}
          >
            By subscribing, you agree to our privacy policy. We send only valuable content, never spam.
          </motion.p>
        </div>
      </div>
    </section>
  );
} 