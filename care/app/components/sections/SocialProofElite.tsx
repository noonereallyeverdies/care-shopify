import { motion } from 'framer-motion';

export default function SocialProofElite() {
  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      title: "Beverly Hills Dermatologist",
      quote: "I've seen firsthand how care•atin transforms not just hair, but lives. The photonique touch™ technology is genuinely revolutionary.",
      image: "doctor",
      verified: "Medical Professional"
    },
    {
      name: "Amanda K.",
      title: "Beauty Editor, Vogue",
      quote: "After years of covering beauty innovations, care•atin stands apart. It's the marriage of cutting-edge science and luxury experience.",
      image: "editor",
      verified: "Beauty Expert"
    },
    {
      name: "Michael R.",
      title: "Tech Executive",
      quote: "The confidence I've regained is immeasurable. care•atin didn't just restore my hair—it restored my presence.",
      image: "executive",
      verified: "Verified Customer"
    }
  ];

  const beforeAfterData = [
    { metric: "Hair Density", before: "32%", after: "89%", improvement: "+178%" },
    { metric: "Coverage", before: "Patchy", after: "Full", improvement: "Complete" },
    { metric: "Confidence", before: "Low", after: "High", improvement: "Restored" }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-25 to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
              Trusted by
              <span className="block text-hair-gradient font-light italic">
                the Discerning
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              When precision matters, professionals choose care•atin
            </p>
          </motion.div>

          {/* Before/After Comparison Grid */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Before */}
            <div className="relative group">
              <div className="card-premium p-8 h-full bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="absolute top-6 left-6">
                  <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
                    Before
                  </span>
                </div>
                <div className="mt-16 space-y-6">
                  {beforeAfterData.map((item, index) => (
                    <div key={item.metric} className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">{item.metric}</span>
                      <span className="text-gray-500">{item.before}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 font-light">Thinning Coverage</span>
                </div>
              </div>
            </div>

            {/* After */}
            <div className="relative group">
              <div className="card-premium p-8 h-full bg-gradient-to-br from-amber-50 to-orange-50">
                <div className="absolute top-6 left-6">
                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                    After 90 Days
                  </span>
                </div>
                <div className="mt-16 space-y-6">
                  {beforeAfterData.map((item, index) => (
                    <div key={item.metric} className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">{item.metric}</span>
                      <div className="text-right">
                        <span className="text-gray-900 font-semibold">{item.after}</span>
                        <span className="text-green-600 text-sm ml-2">({item.improvement})</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 h-32 bg-gradient-to-t from-amber-200 to-amber-100 rounded-lg flex items-center justify-center">
                  <span className="text-amber-800 font-light">Full Renaissance</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="card-premium p-8 hover:shadow-xl transition-all group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-amber-400 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-white text-lg">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600 text-sm">{testimonial.title}</div>
                    </div>
                  </div>
                  
                  <div className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    ✓ {testimonial.verified}
                  </div>
                </div>
                
                <blockquote className="text-gray-700 italic text-lg leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
              </motion.div>
            ))}
          </div>

          {/* Key Metrics */}
          <motion.div 
            className="bg-gradient-to-r from-rose-50 via-amber-50 to-orange-50 rounded-3xl p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-light text-rose-600 mb-2">97%</div>
                <div className="text-gray-700 font-medium">Clinical Success</div>
                <div className="text-gray-500 text-sm">Visible improvement</div>
              </div>
              
              <div className="text-center">
                <div className="text-5xl font-light text-amber-600 mb-2">47K+</div>
                <div className="text-gray-700 font-medium">Transformations</div>
                <div className="text-gray-500 text-sm">Worldwide</div>
              </div>
              
              <div className="text-center">
                <div className="text-5xl font-light text-orange-600 mb-2">30</div>
                <div className="text-gray-700 font-medium">Days Average</div>
                <div className="text-gray-500 text-sm">First results</div>
              </div>
              
              <div className="text-center">
                <div className="text-5xl font-light text-purple-600 mb-2">4.9★</div>
                <div className="text-gray-700 font-medium">User Rating</div>
                <div className="text-gray-500 text-sm">12,847 reviews</div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <h3 className="text-2xl font-light text-gray-900 mb-4">
                Join the renaissance
              </h3>
              <p className="text-gray-600 mb-8 font-light">
                Experience the transformation that's changing lives worldwide
              </p>
              <button className="btn-apple hover:scale-105 transition-transform">
                Start Your Journey
              </button>
            </div>
          </motion.div>

          {/* Trust Signals */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-gray-500 mb-6 font-light">Featured in</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
              <span className="text-gray-600 font-medium">Vogue</span>
              <span className="text-gray-600 font-medium">GQ</span>
              <span className="text-gray-600 font-medium">Forbes</span>
              <span className="text-gray-600 font-medium">Harper's Bazaar</span>
              <span className="text-gray-600 font-medium">Allure</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
