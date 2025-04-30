import { motion } from 'framer-motion';

// Remove unused animation components
// const FillAnimation = () => { ... };
// const MassageAnimation = () => { ... };

export function SelfCareRitualSection() {
  const steps = [
    {
      number: '01',
      title: 'fill & prepare',
      description:
        'Fill the canister with your chosen hair serum or oil. Prepare for your moment of care.',
      image: '/images/self-care-ritual/step-1.JPG',
    },
    {
      number: '02',
      title: 'massage & activate',
      description:
        'Gently massage your scalp as the device delivers the treatment and red light therapy begins.',
      image: '/images/self-care-ritual/step-2.png',
    },
    {
      number: '03',
      title: 'relax & transform',
      description:
        'Enjoy 5 minutes of restorative therapy, 3 times per week, as care•atin works at the root.',
      image: '/images/self-care-ritual/step-3.JPG',
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
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            your self-care ritual
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Embrace this simple ritual to transform your hair from the root
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
                {/* Always use image now */}
                {step.image ? (
                  <img
                    src={step.image}
                    alt={`Step ${step.number}: ${step.title}`}
                    className="w-full h-full object-cover"
                    loading="lazy" // Added lazy loading
                    onError={(e) => {
                      // Fallback if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholders/placeholder.svg';
                      target.onerror = null;
                    }}
                  />
                ) : (
                  // Optional: Placeholder if image path is null/missing
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                    Missing Image
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-rose-500 text-white text-xl font-medium w-10 h-10 rounded-full flex items-center justify-center z-10">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-medium mb-2 lowercase">
                {step.title}
              </h3>
              <p className="text-neutral-600 text-center text-sm">
                {step.description}
              </p>
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
            "I've made it part of my evening wind-down routine. Five minutes of
            care•atin therapy while I read or meditate has become my favorite
            part of the day."
          </p>
          <p className="text-neutral-500 text-sm mt-2">
            — Mia, using care•atin for 6 months
          </p>
        </motion.div>
      </div>
    </section>
  );
}
