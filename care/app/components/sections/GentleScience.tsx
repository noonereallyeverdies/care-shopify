import { motion } from 'framer-motion';

export default function GentleScience() {
  return (
    <section className="section-clean bg-stone-50">
      <div className="container-clean">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-extralight text-stone-800 mb-8">
              gentle science,<br />
              <span className="text-transparent bg-gradient-to-r from-rose-200 via-amber-200 to-stone-300 bg-clip-text">
                powerful results
              </span>
            </h2>
            
            <p className="text-xl text-stone-600 mb-8 leading-relaxed">
              our technology uses specific wavelengths of light that naturally 
              stimulate hair follicles, just like the morning sun.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-light text-stone-800 mb-2">clinically proven</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    backed by multiple peer-reviewed studies showing 
                    significant hair density improvement
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-stone-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-light text-stone-800 mb-2">fda cleared</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    cleared for safety and effectiveness by the 
                    food and drug administration
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-stone-100 to-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-stone-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-light text-stone-800 mb-2">zero side effects</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    unlike harsh treatments, our gentle light therapy 
                    works with your body's natural processes
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right side - Visualization */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="aspect-square bg-white rounded-3xl border border-stone-100 p-8 relative overflow-hidden">
              {/* Simple visual representation */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-amber-50/50"></div>
              
              {/* Follicle visualization */}
              <div className="relative h-full flex items-center justify-center">
                <div className="w-48 h-48 relative">
                  {/* Light rays */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
                    <motion.div
                      key={angle}
                      className="absolute w-1 h-16 bg-gradient-to-b from-amber-200 to-transparent rounded-full"
                      style={{
                        transformOrigin: '50% 100%',
                        transform: `rotate(${angle}deg) translateY(-50px)`,
                        top: '50%',
                        left: '50%'
                      }}
                      animate={{
                        opacity: [0.3, 0.8, 0.3],
                        scaleY: [0.8, 1.2, 0.8]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    />
                  ))}
                  
                  {/* Central follicle */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 bg-gradient-to-br from-rose-200 to-amber-200 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Wavelength indicator */}
              <div className="absolute bottom-4 left-4 text-xs text-stone-400">
                630-660nm wavelength
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}