import React from 'react';
import { motion } from 'framer-motion';
import { LucideProps } from 'lucide-react'; // For icon type

interface StatisticItemProps {
  icon: React.ElementType<LucideProps>; // Icon component
  value: string;
  label: string;
  index: number;
  inView: boolean;
}

export function StatisticItem({
  icon: StatIcon,
  value,
  label,
  index,
  inView,
}: StatisticItemProps) {
  return (
    <motion.div
      className="bg-white p-4 rounded-xl shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <div className="flex items-center justify-center sm:justify-start">
        <div className="bg-rose-100 p-2 rounded-full mr-3">
          <StatIcon size={16} className="text-rose-600" />
        </div>
        <div className="text-left">
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          <div className="text-xs text-gray-600">{label}</div>
        </div>
      </div>
    </motion.div>
  );
} 