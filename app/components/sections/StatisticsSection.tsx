import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatItemProps {
  percentage: number;
  label: string;
  description: string;
  index: number;
}

const statData = [
  {
    percentage: 93,
    label: "reduced shedding",
    description: "experienced a significant reduction in daily hair shedding, keeping more hair on their head.",
  },
  {
    percentage: 87,
    label: "improved thickness & volume",
    description: "noticed visibly thicker hair and an increase in overall volume and fullness.",
  },
  {
    percentage: 79,
    label: "enhanced radiance & shine",
    description: "reported their hair looked healthier, with enhanced natural radiance and shine.",
  },
];

const AnimatedCounter = ({ value, duration = 1.5 }: { value: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      if (start === end) return;

      const incrementTime = (duration * 1000) / end;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
};

const StatCard: React.FC<StatItemProps> = ({ percentage, label, description, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="bg-white p-6 md:p-8 rounded-xl shadow-lg text-center border border-stone-100 flex flex-col items-center h-full"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
    >
      <div className="relative w-32 h-32 md:w-36 md:h-36 mb-4">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            className="text-stone-200/70"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          {/* Progress circle */}
          <motion.circle
            className="text-photonique-coral"
            strokeWidth="8"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            style={{ strokeDasharray: 2 * Math.PI * 45, strokeDashoffset: 2 * Math.PI * 45 }}
            animate={isInView ? { strokeDashoffset: 2 * Math.PI * 45 * (1 - percentage / 100) } : {}}
            transition={{ duration: 1.5, delay: index * 0.15 + 0.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl md:text-4xl font-semibold text-photonique-coral">
            <AnimatedCounter value={percentage} />%
          </span>
        </div>
      </div>
      <h3 className="text-xl font-medium text-neutral-800 mb-3">{label}</h3>
      <p className="text-base text-neutral-600 font-light leading-relaxed flex-grow">{description}</p>
    </motion.div>
  );
};

export function StatisticsSection() {
  return (
    <motion.section
      className="py-20 md:py-28 bg-stone-50" // Light stone background
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-serif font-light lowercase tracking-wide text-neutral-800 mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            the numbers speak
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-neutral-700 font-light leading-relaxed max-w-xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            clinically validated results show the transformative power of photonique. discover what it can do for you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mb-16">
          {statData.map((stat, index) => (
            <StatCard
              key={stat.label}
              percentage={stat.percentage}
              label={stat.label}
              description={stat.description}
              index={index}
            />
          ))}
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1}}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-xs md:text-sm text-neutral-500 italic">
            *based on an 8-week study with 120 participants.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default StatisticsSection; 