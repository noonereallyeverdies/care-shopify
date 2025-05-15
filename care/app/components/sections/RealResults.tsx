import { motion } from 'framer-motion';

export default function RealResults() {
  const testimonials = [
    {
      name: "sarah k.",
      age: "23",
      result: "i finally feel confident with my natural hair texture",
      image: "/images/testimonial-1.jpg"
    },
    {
      name: "maria l.",
      age: "26",
      result: "5 minutes in the morning changed everything",
      image: "/images/testimonial-2.jpg"
    },
    {
      name: "jessica r.",
      age: "22",
      result: "my hair feels so much healthier and fuller",
      image: "/images/testimonial-3.jpg"
    }
  ];

  return (
    <section className="section-clean bg-white">
      <div className="container-clean">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-extralight text-stone-800 mb-6">
            real people,<br />
            <span className="text-transparent bg-gradient-to-r from-rose-200 via-amber-200 to-stone-300 bg-clip-text">
              real transformations
            </span>
          </h2>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            join thousands who made healthy hair their daily ritual
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="card-clean text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-rose-100 to-amber-100 rounded-full"></div>
              <h3 className="font-light text-stone-800 mb-2">{testimonial.name}</h3>
              <p className="text-xs text-stone-400 mb-4">age {testimonial.age}</p>
              <p className="text-stone-600 italic leading-relaxed">
                "{testimonial.result}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Before/After Indicator */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="max-w-lg mx-auto">
            <div className="relative bg-stone-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-sm text-stone-500 mb-2">week 1</div>
                  <div className="h-4 bg-gradient-to-r from-stone-300 to-stone-200 rounded-full"></div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-stone-500 mb-2">week 12</div>
                  <div className="h-4 bg-gradient-to-r from-rose-200 to-amber-200 rounded-full"></div>
                </div>
              </div>
              <p className="text-sm text-stone-600 mt-6 text-center">
                average hair density improvement: 34%
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}