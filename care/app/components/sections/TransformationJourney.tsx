import { motion } from 'framer-motion';

export default function TransformationJourney() {
  const transformationSteps = [
    {
      week: "Week 1",
      title: "The Awakening",
      description: "Follicles respond to photonique stimulation",
      visual: "awakening",
      icon: "🌱"
    },
    {
      week: "Week 4", 
      title: "Early Growth",
      description: "Fine vellus hairs begin to emerge",
      visual: "early",
      icon: "🌿"
    },
    {
      week: "Week 8",
      title: "Visible Change", 
      description: "Noticeable density and coverage increase",
      visual: "visible",
      icon: "🌾"
    },
    {
      week: "Week 12",
      title: "Full Renaissance",
      description: "Restored confidence, renewed you",
      visual: "complete",
      icon: "✨"
    }
  ];

  const HairVisualization = ({ type }: { type: string }) => {
    const getDensity = () => {
      switch(type) {
        case 'awakening': return 20;
        case 'early': return 40;
        case 'visible': return 65;
        case 'complete': return 90;
        default: return 20;
      }
    };
    
    const getColor = () => {
      switch(type) {
        case 'awakening': return 'from-gray-400 to-gray-300';
        case 'early': return 'from-amber-300 to-amber-200';
        case 'visible': return 'from-amber-200 to-yellow-200';
        case 'complete': return 'from-yellow-200 to-amber-100';
        default: return 'from-gray-400 to-gray-300';
      }
    };
    
    const density = getDensity();
    const colorClass = getColor();
    const strands = Math.floor((density / 100) * 120);
    
    return (
      <div className="relative w-full h-32 bg-gradient-to-t from-amber-50/20 to-transparent rounded-xl overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-px">
          {[...Array(strands)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-px bg-gradient-to-t ${colorClass} rounded-t-full`}
              style={{ 
                height: `${Math.random() * 60 + 40}%`,
                opacity: Math.random() * 0.5 + 0.5
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ 
                duration: 1,
                delay: i * 0.01,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
              Your Hair's
              <span className="block text-transparent bg-gradient-to-r from-rose-600 via-amber-500 to-orange-500 bg-clip-text font-light italic">
                Renaissance Journey
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Watch as photonique touch™ technology guides your follicles 
              through a carefully orchestrated awakening
            </p>
          </motion.div>

          {/* Journey Timeline */}
          <div className="relative">
            {/* Central progression line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-rose-200 via-amber-200 to-orange-200 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {transformationSteps.map((step, index) => (
                <motion.div
                  key={step.week}
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-rose-400 to-amber-400 rounded-full items-center justify-center shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  
                  {/* Card */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
                    {/* Hair visualization */}
                    <div className="h-40 bg-gradient-to-br from-gray-50 to-amber-50/30 p-4">
                      <HairVisualization type={step.visual} />
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                          {step.week}
                        </span>
                        <span className="text-2xl">{step.icon}</span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm font-light">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div 
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-orange-50 border border-rose-100 rounded-3xl p-12 max-w-3xl mx-auto">
              <h3 className="text-3xl font-light text-gray-900 mb-4">
                Your renaissance begins today
              </h3>
              <p className="text-gray-600 mb-8 font-light">
                Don't wait for tomorrow. Your hair's transformation starts with a single session.
              </p>
              <button className="bg-gradient-to-r from-rose-500 to-amber-500 text-white px-10 py-4 rounded-full font-medium hover:scale-105 transition-transform shadow-lg">
                Start Your Journey
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
