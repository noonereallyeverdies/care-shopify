import { motion } from "framer-motion";

export function SelfCareRitualSection() {
  const steps = [
    {
      number: "01",
      title: "Prepare",
      description: "Detangle your hair with a wide-tooth comb for even light distribution",
      image: "/images/ritual-step1.jpg"
    },
    {
      number: "02",
      title: "Position",
      description: "Place the device comfortably on your head and secure the strap",
      image: "/images/ritual-step2.jpg"
    },
    {
      number: "03",
      title: "Relax",
      description: "Enjoy 5 minutes of quiet self-care time while the therapy works",
      image: "/images/ritual-step3.jpg"
    },
    {
      number: "04",
      title: "Repeat",
      description: "Use 3x weekly for optimal results and track your progress",
      image: "/images/ritual-step4.jpg"
    }
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
            A few minutes, three times a week is all it takes to transform your hair
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative mb-6 w-full aspect-square overflow-hidden rounded-xl">
                <img 
                  src={step.image} 
                  alt={`Step ${step.number}: ${step.title}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-rose-500 text-white text-xl font-medium w-10 h-10 rounded-full flex items-center justify-center">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-medium mb-2">{step.title}</h3>
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
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-medium mb-2">Ready to start your journey?</h3>
            <p className="text-neutral-600">Our companion app guides you through each step</p>
          </div>
          <div className="flex gap-4">
            <img src="/images/app-store-badge.png" alt="Download on the App Store" className="h-10" />
            <img src="/images/google-play-badge.png" alt="Get it on Google Play" className="h-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
} 