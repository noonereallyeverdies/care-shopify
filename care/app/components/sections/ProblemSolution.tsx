import { motion } from "framer-motion";
import { Frown, Droplet, Clock, Heart, Check, ArrowRight } from 'lucide-react';
import { Link } from "@remix-run/react";

interface CauseCardProps {
  icon: typeof Frown;
  title: string;
  description: string;
  emotionalImpact: string;
  delay: number;
}

function CauseCard({ icon: Icon, title, description, emotionalImpact, delay }: CauseCardProps) {
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-sm relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      viewport={{ once: true }}
    >
      <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-rose-400" />
      </div>
      <h3 className="text-xl font-medium text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-600 mb-4">{description}</p>
      
      {/* Emotional impact statement - creates tension */}
      <div className="mt-4 pt-4 border-t border-neutral-100">
        <p className="text-sm italic text-rose-600">{emotionalImpact}</p>
      </div>
      
      {/* Decorative element */}
      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-rose-50 opacity-20 rounded-full" />
    </motion.div>
  );
}

export function ProblemSolution() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-6">
        {/* Section Intro - Enhanced tension building */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h5 
            className="text-sm uppercase tracking-wide text-rose-600 mb-2 font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Understanding the struggle
          </motion.h5>
        
          <motion.h2 
            className="text-3xl md:text-4xl font-medium text-neutral-900 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            the emotional toll of hair loss
          </motion.h2>
          
          <motion.p 
            className="text-lg text-neutral-700 feminine-voice mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            It starts silently: a few extra strands in your brush, a slightly wider part, or the sudden realization that your ponytail feels thinner. Soon, it becomes the first thing you notice in every mirror, affecting how you feel about yourself each day.
          </motion.p>
          
          <motion.div 
            className="flex justify-center items-center gap-3 text-sm text-neutral-500 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="inline-block w-12 h-px bg-neutral-300"></span>
            <span>A problem that deserves a real solution</span>
            <span className="inline-block w-12 h-px bg-neutral-300"></span>
          </motion.div>
        </div>

        {/* Causes Grid - Enhanced with emotional impact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <CauseCard 
            icon={Clock} 
            title="aging" 
            description="As we age, cellular energy naturally decreases, causing follicles to produce thinner hair strands or stop altogether."
            emotionalImpact="Watching your once-thick hair gradually disappear can feel like losing a part of your identity."
            delay={0}
          />
          <CauseCard 
            icon={Droplet} 
            title="hormonal changes" 
            description="Shifts in hormones can reduce blood flow to follicles, limiting nutrient delivery and weakening your hair at its source."
            emotionalImpact="Postpartum shedding or menopausal changes can make you feel betrayed by your own body at pivotal moments."
            delay={0.1}
          />
          <CauseCard 
            icon={Frown} 
            title="stress & nutrition" 
            description="Chronic stress and poor diet deplete the resources your body needs to maintain healthy hair growth cycles."
            emotionalImpact="The vicious cycle: stress causes hair loss, which creates more stress about your appearance."
            delay={0.2}
          />
        </div>

        {/* User Quote Panel - Creating relatable identity */}
        <motion.div 
          className="max-w-3xl mx-auto mb-16 p-8 bg-white rounded-xl shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 overflow-hidden rounded-full flex-shrink-0">
              <img src="/images/testimonial-2.jpg" alt="Jessica" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="italic text-neutral-700 text-lg mb-4 leading-relaxed">
                "I tried to ignore it, but every photo taken from behind was a reminder. I stopped wearing my hair up, avoided bright lighting, and even skipped social events. My hair loss was consuming my confidence."
              </p>
              <p className="font-medium text-neutral-900">— jessica, 37</p>
            </div>
          </div>
        </motion.div>

        {/* Solution Quote - Enhanced with benefits and features */}
        <motion.div 
          className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-sm border border-neutral-100 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-rose-500" />
          </div>
          <h3 className="text-xl md:text-2xl font-medium text-neutral-900 mb-3">
            our gentle solution: renewed from within
          </h3>
          <p className="text-lg text-neutral-700 mb-5 feminine-voice">
            <span className="brand-name">care<span className="interpunct">•</span>atin</span> uses red light to naturally 
            recharge your hair follicles at the cellular level — addressing the problem at its source, not just masking the symptoms.
          </p>
          
          {/* Core benefits - Clear value statements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <div className="bg-rose-50 p-4 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Check className="w-5 h-5 text-rose-600" />
                <span className="font-medium text-neutral-900">Non-invasive</span>
              </div>
              <p className="text-sm text-neutral-700">No chemicals, needles, or medical procedures</p>
            </div>
            <div className="bg-rose-50 p-4 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Check className="w-5 h-5 text-rose-600" />
                <span className="font-medium text-neutral-900">No side effects</span>
              </div>
              <p className="text-sm text-neutral-700">Gentle treatment without hormonal disruption</p>
            </div>
            <div className="bg-rose-50 p-4 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Check className="w-5 h-5 text-rose-600" />
                <span className="font-medium text-neutral-900">Just 5 minutes</span>
              </div>
              <p className="text-sm text-neutral-700">Quick, convenient sessions 3x weekly</p>
            </div>
          </div>
          
          <p className="text-rose-500 text-lg font-medium mb-8">
            No chemicals. No side effects. Just natural stimulation.
          </p>
          
          {/* After Quote - Resolution of tension */}
          <div className="mt-8 pt-8 border-t border-neutral-100">
            <p className="italic text-neutral-600 mb-4">
              "I'd tried everything for my thinning hair. This is the first product that actually 
              made a difference without making me worry about what I was putting on my scalp. After 8 weeks, I wore my hair up for the first time in years."
            </p>
            <p className="font-medium text-neutral-900">— ashley, 42</p>
          </div>
          
          {/* Call-to-action - Resolution pathway */}
          <div className="mt-8">
            <Link 
              to="/products/photonique-touch" 
              className="inline-flex items-center gap-2 bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition-colors mt-4 font-medium"
            >
              Discover your solution
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 