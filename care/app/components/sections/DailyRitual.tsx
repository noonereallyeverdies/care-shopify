import { motion } from 'framer-motion';

export default function DailyRitual() {
  const ritualSteps = [
    {
      time: "mornings",
      activity: "gentle wake-up light therapy",
      duration: "5 minutes"
    },
    {
      time: "anywhere",
      activity: "cordless design fits your lifestyle", 
      duration: "portable"
    },
    {
      time: "evenings",
      activity: "optional second session",
      duration: "5 minutes"
    }
  ];

  return (
    <section className="section-clean bg-gradient-to-b from-stone-50 to-white">
      <div className="container-clean">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-extralight text-stone-800 mb-6">
            make it<br />
            <span className="text-transparent bg-gradient-to-r from-rose-200 via-amber-200 to-stone-300 bg-clip-text">
              your ritual
            </span>
          </h2>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            designed to seamlessly integrate into the life you already love
          </p>
        </motion.div>

        {/* Ritual Steps */}
        <div className="max-w-4xl mx-auto mb-20">
          {ritualSteps.map((step, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-8 mb-16 last:mb-0"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-rose-100 to-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-stone-600 font-light text-lg">{String(index + 1).padStart(2, '0')}</span>
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-light text-stone-800 mb-2">{step.activity}</h3>
                <div className="flex items-center gap-4 text-stone-600">
                  <span className="text-sm">{step.time}</span>
                  <div className="w-2 h-2 bg-stone-300 rounded-full"></div>
                  <span className="text-sm">{step.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Device Showcase */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="max-w-md mx-auto bg-white border border-stone-100 rounded-3xl p-8 shadow-lg">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-stone-100 to-rose-100 rounded-2xl mb-6"></div>
            <h3 className="text-lg font-light text-stone-800 mb-3">care•atin device</h3>
            <p className="text-stone-600 text-sm leading-relaxed mb-6">
              sleek, lightweight design that feels as good as it looks
            </p>
            <div className="flex justify-center gap-6 text-xs text-stone-500">
              <span>cordless</span>
              <span>•</span>
              <span>rechargeable</span>
              <span>•</span>
              <span>travel-ready</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}