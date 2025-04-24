import { motion } from "framer-motion";

// Define SVG Animation Components (or inline SVGs)
const FillAnimation = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Canister Outline */}
    <path d="M30 90 V20 H70 V90 A10 10 0 0 1 60 100 H40 A10 10 0 0 1 30 90 M30 20 Q50 5 70 20" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
    {/* Lid */}
    <rect x="25" y="10" width="50" height="10" rx="3" fill="#e5e7eb" />
    {/* Animated Drops */}
    {[0, 0.3, 0.6].map((delay, i) => (
      <motion.circle
        key={i}
        cx={50 + (i - 1) * 10} // Position drops slightly apart
        cy={30}
        r="3"
        fill="#fecdd3" // Light rose color
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 50, opacity: 0 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: delay,
          ease: "easeIn"
        }}
      />
    ))}
  </svg>
);

const MassageAnimation = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Scalp Outline (simple arc) */}
    <path d="M20 80 Q50 30 80 80" fill="none" stroke="#e5e7eb" strokeWidth="2"/>
    {/* Pulsing Circles */}
    {[0, 0.5, 1].map((delay, i) => (
      <motion.circle
        key={i}
        cx="50"
        cy="55" // Center of pulse
        r="5"
        stroke="#fecdd3" // Light rose color
        strokeWidth="1.5"
        fill="none"
        initial={{ scale: 0, opacity: 0.8 }}
        animate={{ scale: 3.5, opacity: 0 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: delay,
          ease: "easeOut"
        }}
      />
    ))}
    {/* Center static dot */}
     <circle cx="50" cy="55" r="3" fill="#fecdd3" />
  </svg>
);

export function SelfCareRitualSection() {
  const steps = [
    {
      number: "01",
      title: "fill & prepare",
      description: "fill the canister with your chosen hair serum or oil. prepare for your moment of care.",
      image: "/images/ritual-step1.jpg"
    },
    {
      number: "02",
      title: "massage & activate",
      description: "gently massage your scalp as the device delivers the treatment and red light therapy begins.",
      image: "/images/ritual-step2.jpg"
    },
    {
      number: "03",
      title: "relax & transform",
      description: "enjoy 5 minutes of restorative therapy, 3 times per week, as care•atin works at the root.",
      image: "/images/ritual-step3.jpg"
    },
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-4">your self-care ritual</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            embrace this simple ritual to transform your hair from the root
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative mb-6 w-full aspect-square overflow-hidden rounded-xl bg-neutral-50 flex items-center justify-center border border-neutral-100">
                {index === 0 ? (
                  <FillAnimation />
                ) : index === 1 ? (
                  <MassageAnimation />
                ) : (
                  <img
                    src={step.image}
                    alt={`Step ${step.number}: ${step.title}`}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-4 left-4 bg-rose-500 text-white text-xl font-medium w-10 h-10 rounded-full flex items-center justify-center z-10">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-medium mb-2 lowercase">{step.title}</h3>
              <p className="text-neutral-600 text-center text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
            <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
            <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
          </div>
          <p className="text-neutral-700 max-w-xl mx-auto italic">
            "I've made it part of my evening wind-down routine. Five minutes of care•atin therapy while I read or meditate has become my favorite part of the day."
          </p>
          <p className="text-neutral-500 text-sm mt-2">— Mia, using care•atin for 6 months</p>
        </motion.div>

        <motion.div 
          className="mt-16 bg-neutral-50 p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
         
         
        </motion.div>
      </div>
    </section>
  );
} 