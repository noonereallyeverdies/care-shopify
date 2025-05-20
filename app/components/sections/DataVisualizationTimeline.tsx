import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, MessageSquare, CheckCircle } from 'lucide-react'; // Placeholder icons

interface DataPoint {
  week: number;
  value: number;
}

interface ClinicalResult {
  id: string;
  title: string;
  description: string;
  points: DataPoint[];
  finalValue: string; // e.g., "+53%"
  unit: string;
  testimonial: {
    quote: string;
    author: string;
    weekMentioned?: number; // To sync with graph animation if desired
  };
  Icon: React.ElementType;
}

// Placeholder data - replace with actual clinical data and testimonials
const resultsData: ClinicalResult[] = [
  {
    id: 'density',
    title: 'Enhanced Hair Density',
    description: 'Significant increase in active hair follicles per cm².',
    points: [
      { week: 0, value: 0 }, 
      { week: 4, value: 15 }, 
      { week: 8, value: 35 }, 
      { week: 12, value: 53 }
    ],
    finalValue: '+53%',
    unit: 'Increase in Density',
    testimonial: {
      quote: '“My ponytail feels thicker than it has in years. The thinning at my temples is noticeably less!”',
      author: 'Eleanor V., Week 12',
      weekMentioned: 12,
    },
    Icon: TrendingUp,
  },
  {
    id: 'strength',
    title: 'Improved Hair Strength',
    description: 'Reduction in hair breakage and improved tensile strength.',
    points: [
      { week: 0, value: 0 }, 
      { week: 4, value: 10 }, 
      { week: 8, value: 25 }, 
      { week: 12, value: 42 }
    ],
    finalValue: '-42%',
    unit: 'Reduction in Breakage',
    testimonial: {
      quote: '“Less hair in my brush, and it just feels more resilient. So thrilled with the progress.”',
      author: 'Marcus L., Week 10',
      weekMentioned: 10,
    },
    Icon: CheckCircle, 
  },
];

// A simple SVG line graph component
interface LineGraphProps {
  points: DataPoint[];
  width?: number;
  height?: number;
  color?: string;
}

const LineGraph: React.FC<LineGraphProps> = ({ points, width = 300, height = 150, color = '#F43F5E' /* rose-500 */ }) => {
  if (points.length < 2) return <div className="w-full h-full flex items-center justify-center text-xs">Not enough data for graph.</div>;

  const maxX = Math.max(...points.map(p => p.week));
  const maxY = Math.max(...points.map(p => p.value));
  
  const pathD = points
    .map((point, i) => {
      const x = (point.week / maxX) * width;
      const y = height - (point.value / maxY) * height;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      {/* Optional: Grid lines */}
      {[...Array(4)].map((_, i) => (
        <line key={`grid-y-${i}`} x1="0" y1={(i/3)*height} x2={width} y2={(i/3)*height} stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="2,2" />
      ))}
      <motion.path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
        viewport={{ once: true, amount: 0.5 }}
      />
      {/* Optional: Points on the graph */}
      {points.map((point, i) => {
        const x = (point.week / maxX) * width;
        const y = height - (point.value / maxY) * height;
        return (
          <motion.circle 
            key={`point-${i}`}
            cx={x}
            cy={y}
            r="4"
            fill={color}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 + (i * 0.2) + (pathD ? 1.5: 0) }} // Delay after path draws
            viewport={{ once: true, amount: 0.5 }}
          />
        );
      })}
    </svg>
  );
};

const DataVisualizationTimeline: React.FC = () => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.4, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <motion.section 
      className="py-16 md:py-24 bg-stone-50 text-neutral-800 font-serif"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-6">
        <motion.div className="text-center mb-12 md:mb-20" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-medium text-neutral-900 mb-3 lowercase">
            The Science of Visible Results
          </h2>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
            Clinically proven efficacy, illustrated. Experience the journey to revitalized hair.
          </p>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {resultsData.map((result, index) => (
            <motion.div 
              key={result.id} 
              className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center"
              variants={itemVariants}
            >
              {/* Text Content (Left or Right based on index) */}
              <div className={`md:col-span-2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <result.Icon className="w-10 h-10 text-rose-600 mb-4" />
                <h3 className="text-2xl font-semibold text-neutral-800 mb-2">{result.title}</h3>
                <p className="text-sm text-neutral-600 mb-4 leading-relaxed">{result.description}</p>
                <div className="bg-rose-500/10 p-4 rounded-lg shadow-sm">
                  <p className="text-3xl md:text-4xl font-bold text-rose-600">{result.finalValue}</p>
                  <p className="text-xs text-rose-700 uppercase tracking-wider font-medium">{result.unit}</p>
                </div>
              </div>

              {/* Graph & Testimonial (Right or Left) */}
              <div className={`md:col-span-3 flex flex-col items-center ${index % 2 === 0 ? 'md:order-2 md:items-end' : 'md:order-1 md:items-start'}`}>
                <div className="w-full max-w-sm p-4 bg-white rounded-xl shadow-xl border border-stone-200 mb-6">
                  <LineGraph points={result.points} />
                </div>
                <motion.blockquote 
                  className="relative p-4 bg-white rounded-lg shadow-lg border border-stone-200 max-w-sm text-left"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.5 }} // Delay after graph animation
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <MessageSquare className="absolute top-2 right-2 w-8 h-8 text-rose-100 -z-10 transform scale-x-[-1]" />
                  <p className="text-sm text-neutral-700 italic mb-2 leading-relaxed">{result.testimonial.quote}</p>
                  <footer className="text-xs text-neutral-500 font-medium">– {result.testimonial.author}</footer>
                </motion.blockquote>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default DataVisualizationTimeline; 