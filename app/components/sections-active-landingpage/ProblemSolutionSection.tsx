import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';

export function ProblemSolutionSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-stone-800">The Hair Growth Solution</h2>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto">
            Our revolutionary red light technology addresses hair loss at its source.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Problem */}
          <div className="bg-stone-50 rounded-2xl p-8 relative overflow-hidden">
            <h3 className="text-2xl font-light mb-4 text-stone-800">The Problem</h3>
            <p className="text-stone-600 mb-6">
              Traditional hair treatments only mask symptoms without addressing the root cause:
              decreased blood flow and weakened follicles.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-rose-500 font-bold mr-2">✗</span>
                <span className="text-stone-700">Topical solutions with limited absorption</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 font-bold mr-2">✗</span>
                <span className="text-stone-700">Expensive clinical procedures</span>
              </li>
              <li className="flex items-start">
                <span className="text-rose-500 font-bold mr-2">✗</span>
                <span className="text-stone-700">Harsh chemicals with side effects</span>
              </li>
            </ul>
          </div>
          
          {/* Solution */}
          <div className="bg-gradient-to-br from-rose-50 to-white rounded-2xl p-8 relative overflow-hidden">
            <h3 className="text-2xl font-light mb-4 text-stone-800">Our Solution</h3>
            <p className="text-stone-600 mb-6">
              care•atin uses clinically proven red light therapy to restore hair health from within:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-2">✓</span>
                <span className="text-stone-700">Increases cellular energy production</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-2">✓</span>
                <span className="text-stone-700">Stimulates blood flow to nourish follicles</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-2">✓</span>
                <span className="text-stone-700">Non-invasive, painless, and chemical-free</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/pages/science" 
            className="inline-flex items-center text-rose-500 font-medium hover:text-rose-600 transition-colors"
          >
            Learn more about the science
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="ml-2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProblemSolutionSection;