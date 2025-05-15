import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';

export default function PremiumHero({ data }: any) {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10"></div>
        <motion.div 
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Funding Badge */}
          <motion.div 
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white/90 font-medium">{data.valuation} • Series A Funded</span>
            <div className="flex -space-x-2">
              {data.backers.slice(0, 2).map((backer: string, index: number) => (
                <div key={backer} className="w-6 h-6 bg-white/20 rounded-full border border-white/30" />
              ))}
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            className="text-6xl md:text-8xl font-extralight mb-8 text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The Hair
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-light italic">
              Renaissance
            </span>
            <br />
            Begins Here
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {data.subheadline}
          </motion.p>

          {/* Key Metrics */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
              <div className="text-3xl font-bold text-white">93%</div>
              <div className="text-gray-400 text-sm">Clinical Efficacy</div>
            </div>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
              <div className="text-3xl font-bold text-white">30</div>
              <div className="text-gray-400 text-sm">Days to Results</div>
            </div>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
              <div className="text-3xl font-bold text-white">47M</div>
              <div className="text-gray-400 text-sm">Series A Funding</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link 
              to="/products/photonique-touch"
              className="group relative overflow-hidden bg-white text-black px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">{data.ctaText}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <Link 
              to="/clinical-data"
              className="group flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all duration-300"
            >
              <span>{data.ctaSecondary}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </motion.div>

          {/* Investor Logos */}
          <motion.div 
            className="mt-16 pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p className="text-gray-400 text-sm mb-6">Backed by world-class investors</p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              {data.backers.map((backer: string) => (
                <div key={backer} className="text-white/60 font-medium text-sm">
                  {backer}
                </div>
              ))}
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
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
}
