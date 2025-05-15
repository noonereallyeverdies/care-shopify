import { Link } from '@remix-run/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

type HeroData = {
  headline: string;
  subheadline: string;
  stat: string;
  ctaText: string;
  ctaLink: string;
  guarantee: string;
};

export function OptimizedHero({ data }: { data: HeroData }) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.8]);

  return (
    <motion.section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Premium Video Background */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y, opacity }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src="/hair-homepage.mp4" type="video/mp4" />
        </video>
        
        {/* Modern gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        {/* Main Headline - Emotional & Bold */}
        <motion.h1 
          className="text-5xl md:text-7xl font-light mb-6 leading-tight"
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="block">Stop hiding.</span>
          <span className="block italic bg-gradient-to-r from-[#C49B7C] to-[#E8B598] bg-clip-text text-transparent">
            Start thriving.
          </span>
        </motion.h1>

        {/* Subheadline - Concise benefit */}
        <motion.p 
          className="text-xl md:text-2xl mb-8 text-gray-200 font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {data.subheadline}
        </motion.p>

        {/* Single credibility stat */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <span className="text-lg font-medium text-[#C49B7C]">✓</span>
            <span className="ml-2 text-white font-medium">{data.stat}</span>
          </div>
        </motion.div>

        {/* Single CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Link 
            to={data.ctaLink}
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#C49B7C] to-[#E8B598] text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <span>{data.ctaText}</span>
            <svg 
              className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>

        {/* Guarantee badge */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, rotate: -5 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="inline-flex items-center text-sm text-gray-300 font-medium">
            <span className="mr-2 text-green-400">🛡️</span>
            {data.guarantee}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </motion.section>
  );
}
