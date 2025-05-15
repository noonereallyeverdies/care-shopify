import { motion } from 'framer-motion';

export default function WellnessJourney() {
  const journeySteps = [
    {
      step: "01",
      title: "morning ritual",
      description: "5 minutes of gentle light therapy while you get ready",
      icon: "☀️"
    },
    {
      step: "02", 
      title: "healthy habits",
      description: "watch your hair become stronger and shinier",
      icon: "✨"
    },
    {
      step: "03",
      title: "confidence boost",
      description: "feel amazing in your own skin every day",
      icon: "💫"
    }
  ];

  return (
    <section className="section-clean bg-gradient-to-b from-white to-stone-50">
      <div className="container-clean">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-extralight text-stone-800 mb-6">
            your wellness journey
          </h2>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            healthy hair shouldn't be complicated. 
            here's how we fit into your daily routine
          </p>
        </motion.div>

        <div className="grid-clean-3 max-w-4xl mx-auto">
          {journeySteps.map((step, index) => (
            <motion.div
              key={step.step}
              className="card-clean text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="text-6xl mb-6">{step.icon}</div>
              <div className="text-sm text-stone-400 mb-2 tracking-wide">
                step {step.step}
              </div>
              <h3 className="text-xl font-light text-stone-800 mb-4">
                {step.title}
              </h3>
              <p className="text-stone-600 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Visual timeline */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent"></div>
            <div className="flex justify-between items-center relative">
              {["week 1", "week 4", "week 8", "week 12"].map((week, index) => (
                <div key={week} className="bg-white border border-stone-200 rounded-full w-20 h-20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs text-stone-500">{week}</div>
                    <div className="w-2 h-2 bg-gradient-to-r from-rose-200 to-amber-200 rounded-full mx-auto mt-1"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-stone-500 mt-8">
            most people see noticeable results within 4-8 weeks
          </p>
        </motion.div>
      </div>
    </section>
  );
}