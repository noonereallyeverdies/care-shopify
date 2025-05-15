import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function FinalCTAOptimized() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset timer
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#C49B7C] via-[#D4A378] to-[#E9C46A]"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl"
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        
        {/* Urgency Timer */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center bg-white/15 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
            <span className="text-white mr-4 font-medium">Limited Time Offer Expires In:</span>
            <div className="flex space-x-2">
              <div className="bg-white/20 px-3 py-2 rounded-lg">
                <span className="text-white font-bold text-lg">{timeLeft.hours.toString().padStart(2, '0')}</span>
              </div>
              <span className="text-white self-center">:</span>
              <div className="bg-white/20 px-3 py-2 rounded-lg">
                <span className="text-white font-bold text-lg">{timeLeft.minutes.toString().padStart(2, '0')}</span>
              </div>
              <span className="text-white self-center">:</span>
              <div className="bg-white/20 px-3 py-2 rounded-lg">
                <span className="text-white font-bold text-lg">{timeLeft.seconds.toString().padStart(2, '0')}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main CTA Headline */}
        <motion.h2 
          className="text-4xl md:text-6xl font-light text-white mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Transform Your Hair.
          <br />
          <span className="italic">Transform Your Life.</span>
        </motion.h2>

        {/* Benefit Statement */}
        <motion.p 
          className="text-xl text-white/90 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Join thousands who've reclaimed their confidence in just 30 days
        </motion.p>

        {/* CTA Button */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link 
            to="/products/photonique-touch"
            className="group inline-flex items-center px-12 py-5 bg-white text-[#C49B7C] font-bold text-xl rounded-full hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            <span>Start Your Transformation</span>
            <motion.svg 
              className="ml-4 w-6 h-6"
              fill="currentColor" 
              viewBox="0 0 20 20"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </motion.svg>
          </Link>
        </motion.div>

        {/* Guarantee */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-white">
              <div className="font-bold text-lg">90-Day Money-Back Guarantee</div>
              <div className="text-white/80">See results or get your money back. No questions asked.</div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
            <span>✓ Free shipping</span>
            <span>✓ Secure checkout</span>
            <span>✓ 24/7 support</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
