import {Section} from '~/components/Text';
import {motion} from 'framer-motion';

export function ScienceOfTransformation() {
  return (
    <Section className="relative overflow-hidden bg-contrast py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-light text-primary mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            the science of glow
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-primary/70 max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our revolutionary red light therapy technology harnesses the power of specific wavelengths to stimulate cellular regeneration and enhance natural hair growth processes.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Cellular Activation',
              description: 'Stimulates mitochondrial function and ATP production for enhanced cellular energy and growth.',
            },
            {
              title: 'Increased Blood Flow',
              description: 'Improves circulation to hair follicles, delivering essential nutrients for optimal hair health.',
            },
            {
              title: 'Collagen Production',
              description: 'Boosts natural collagen synthesis for stronger, more resilient hair structure.',
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="text-center p-6 rounded-2xl bg-primary/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
            >
              <h3 className="text-xl md:text-2xl font-light text-primary mb-4">{item.title}</h3>
              <p className="text-primary/70 font-light">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
} 