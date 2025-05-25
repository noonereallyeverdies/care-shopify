import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, CheckCircle, Shield } from 'lucide-react';

const summaryItems = [
  {
    icon: Clock,
    title: "10 minutes",
    subtitle: "3x weekly",
    description: "fits your morning routine"
  },
  {
    icon: TrendingUp, 
    title: "87% saw results",
    subtitle: "in 8 weeks",
    description: "clinically proven outcomes"
  },
  {
    icon: CheckCircle,
    title: "$89 one-time",
    subtitle: "vs $200/month salon",
    description: "roi: 2,700% year one"
  },
  {
    icon: Shield,
    title: "60-day guarantee",
    subtitle: "risk-free trial",
    description: "love it or full refund"
  }
];

export function ExecutiveSummarySection() {
  return (
    <motion.section 
      className="py-16 bg-neutral-50 border-y border-neutral-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-2xl md:text-3xl font-serif font-light text-neutral-900 mb-4 lowercase tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            for busy professionals
          </motion.h2>
          <motion.p 
            className="text-neutral-600 font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            everything you need to know in 30 seconds
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {summaryItems.map((item, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-sm border border-neutral-200 group-hover:border-photonique-coral/30 transition-colors duration-300">
                <item.icon className="w-8 h-8 text-photonique-coral" strokeWidth={1.5} />
              </div>
              
              <h3 className="font-medium text-neutral-900 mb-1 text-lg">
                {item.title}
              </h3>
              <p className="text-sm text-photonique-coral font-medium mb-2">
                {item.subtitle}
              </p>
              <p className="text-sm text-neutral-600 font-light leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        {/* Quick decision CTA for executives */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-white border border-neutral-200 rounded-full text-sm text-neutral-600">
            <span className="w-2 h-2 bg-photonique-coral rounded-full mr-3 animate-pulse"></span>
            347 of 500 devices remaining • limited launch pricing
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}