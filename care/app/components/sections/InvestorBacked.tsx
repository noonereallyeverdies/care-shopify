import { motion } from 'framer-motion';

export default function InvestorBacked() {
  const investors = [
    { name: "Sequoia Capital", tier: "Lead", focus: "Healthcare Innovation" },
    { name: "Andreessen Horowitz", tier: "Co-lead", focus: "Deep Tech" },
    { name: "First Round Capital", tier: "Early", focus: "Consumer Health" },
    { name: "GV (Google Ventures)", tier: "Strategic", focus: "AI/ML Applications" }
  ];

  const milestones = [
    { year: "2022", event: "Founded by MIT/Harvard team", detail: "Breakthrough research in photobiomodulation" },
    { year: "2023", event: "Pre-seed $3.2M", detail: "Developed proprietary technology" },
    { year: "2024", event: "Clinical trials completed", detail: "93% efficacy demonstrated" },
    { year: "2025", event: "Series A $47M", detail: "Scale manufacturing & distribution" }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-extralight mb-6 text-gray-900">
              Backed by
              <span className="block text-blue-600 italic">Visionaries</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leading investors recognize the transformative potential of photonique touch™ technology
            </p>
          </motion.div>

          {/* Investor Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {investors.map((investor, index) => (
              <motion.div 
                key={investor.name}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all group"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-3 group-hover:scale-110 transition-transform"></div>
                  <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">{investor.tier}</div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{investor.name}</h3>
                <p className="text-sm text-gray-600">{investor.focus}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Funding Timeline */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-3xl font-semibold text-gray-900 text-center mb-12">
              Growth Trajectory
            </h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {milestones.map((milestone, index) => (
                  <motion.div 
                    key={milestone.year}
                    className="relative bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-sm"></div>
                    </div>
                    
                    <div className="text-center pt-4">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h4 className="font-semibold text-gray-900 mb-2">{milestone.event}</h4>
                      <p className="text-sm text-gray-600">{milestone.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Key Metrics */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
              <div className="text-4xl font-bold text-blue-600 mb-2">$47M</div>
              <div className="text-lg font-medium text-gray-900 mb-1">Series A Funding</div>
              <div className="text-sm text-gray-600">Led by Sequoia Capital</div>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <div className="text-4xl font-bold text-purple-600 mb-2">25+</div>
              <div className="text-lg font-medium text-gray-900 mb-1">Patents Filed</div>
              <div className="text-sm text-gray-600">Core technology protected</div>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-pink-50 to-blue-50 rounded-xl">
              <div className="text-4xl font-bold text-pink-600 mb-2">85+</div>
              <div className="text-lg font-medium text-gray-900 mb-1">Team Members</div>
              <div className="text-sm text-gray-600">PhD-level researchers</div>
            </div>
          </motion.div>

          {/* Quote from investor */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <blockquote className="text-2xl md:text-3xl font-light text-gray-700 mb-6 italic max-w-4xl mx-auto">
              "care•atin represents the convergence of breakthrough science and exceptional execution. 
              This team is building the future of personalized medicine."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full text-white flex items-center justify-center font-semibold">
                R
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Roelof Botha</div>
                <div className="text-gray-600 text-sm">Partner, Sequoia Capital</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
