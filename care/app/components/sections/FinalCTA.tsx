import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function FinalCTA() {
  const [waitlistCount, setWaitlistCount] = useState(12847);
  
  useEffect(() => {
    // Simulate real-time waitlist updates
    const interval = setInterval(() => {
      setWaitlistCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5"></div>
        <motion.div 
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Live Counter */}
          <motion.div 
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white/90 font-medium">
              {waitlistCount.toLocaleString()} people waiting
            </span>
          </motion.div>

          {/* Main CTA Headline */}
          <motion.h2 
            className="text-5xl md:text-7xl font-extralight mb-8 text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ready to
            <span className="block text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text italic">
              Transform?
            </span>
          </motion.h2>

          {/* Value Proposition */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Join thousands experiencing the future of hair restoration. 
            Early access to those who join the waitlist today.
          </motion.p>

          {/* Exclusive Benefits */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-white font-medium mb-2">Priority Access</div>
              <div className="text-gray-400 text-sm">First to receive device</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                </svg>
              </div>
              <div className="text-white font-medium mb-2">Founder Pricing</div>
              <div className="text-gray-400 text-sm">40% off retail price</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-white font-medium mb-2">Direct Support</div>
              <div className="text-gray-400 text-sm">1:1 with founders</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link 
              to="/waitlist"
              className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <span className="relative z-10">Join Waitlist</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <Link 
              to="/clinical-data"
              className="group flex items-center gap-2 border border-white/30 text-white px-8 py-5 rounded-full font-medium hover:bg-white/10 transition-all duration-300"
            >
              <span>Review Clinical Data</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </motion.div>

          {/* Final Trust Signal */}
          <motion.div 
            className="text-center text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p>Estimated delivery: Q3 2025 • 90-day money-back guarantee</p>
            <p className="mt-2">Patent pending technology • FDA cleared</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
