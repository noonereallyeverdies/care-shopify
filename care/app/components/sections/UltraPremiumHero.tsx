import { Link } from '@remix-run/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function UltraPremiumHero({ data }: any) {
  const [countdown, setCountdown] = useState({ hours: 23, minutes: 59, seconds: 45 });
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -300]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) { minutes--; seconds = 59; }
        else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
        else { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Ultra-Premium Background */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        {/* Animated mesh gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-black" />
        
        {/* Floating orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Neural network pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1000 1000">
            <defs>
              <pattern id="neural" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="2" fill="currentColor" />
                <line x1="50" y1="50" x2="100" y2="0" stroke="currentColor" strokeWidth="0.5" />
                <line x1="50" y1="50" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" />
                <line x1="50" y1="50" x2="0" y2="100" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#neural)" />
          </svg>
        </div>
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          
          {/* Scarcity Alert */}
          <motion.div 
            className="inline-flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-white font-medium text-sm">
              {data.urgencyText}
            </span>
            <div className="flex gap-1 ml-2">
              <div className="bg-white/20 px-2 py-1 rounded text-white text-xs font-mono">
                {countdown.hours.toString().padStart(2, '0')}
              </div>
              <span className="text-white">:</span>
              <div className="bg-white/20 px-2 py-1 rounded text-white text-xs font-mono">
                {countdown.minutes.toString().padStart(2, '0')}
              </div>
              <span className="text-white">:</span>
              <div className="bg-white/20 px-2 py-1 rounded text-white text-xs font-mono">
                {countdown.seconds.toString().padStart(2, '0')}
              </div>
            </div>
          </motion.div>

          {/* Emotional Hook Headlines */}
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-light text-white mb-8 leading-none tracking-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="block">Your hair</span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent italic">
              transformation
            </span>
            <span className="block text-white/90">
              starts in 23 seconds.
            </span>
          </motion.h1>

          {/* Neuromarketing Subheadline */}
          <motion.div 
            className="space-y-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-2xl md:text-3xl text-white/90 font-light max-w-4xl">
              {data.subheadline}
            </p>
            <p className="text-lg text-blue-300 font-medium">
              The same technology trusted by celebrities, athletes, and executives worldwide
            </p>
          </motion.div>

          {/* Social Proof Metrics */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="text-4xl font-bold text-white mb-2">97.3%</div>
              <div className="text-white/70 font-medium">See results</div>
              <div className="text-white/50 text-sm">in 14 days</div>
            </div>
            
            <div className="text-center bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="text-4xl font-bold text-white mb-2">47K+</div>
              <div className="text-white/70 font-medium">Transformed</div>
              <div className="text-white/50 text-sm">this year</div>
            </div>
            
            <div className="text-center bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="text-4xl font-bold text-white mb-2">4.9★</div>
              <div className="text-white/70 font-medium">Average rating</div>
              <div className="text-white/50 text-sm">12,847 reviews</div>
            </div>
          </motion.div>

          {/* Dual CTA with Status */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/products/photonique-touch"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 hover:scale-105 shadow-2xl"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {data.ctaText}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              
              <Link 
                to="/results"
                className="group flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-5 rounded-full font-medium hover:bg-white/10 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                {data.ctaSecondary}
              </Link>
            </div>
            
            {/* Status Updates */}
            <div className="flex items-center justify-center gap-6 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span>2,341 people viewing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-400 rounded-full" />
                <span>87 purchased in last hour</span>
              </div>
            </div>
          </motion.div>

          {/* Guarantee Badge */}
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-full px-6 py-3">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-medium">90-Day Money Back Guarantee</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
}
