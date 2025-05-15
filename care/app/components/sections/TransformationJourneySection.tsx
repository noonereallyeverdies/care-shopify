import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@remix-run/react';

// Import CSS for consistent styling
import './TransformationJourneySection.css';

// Define the journey stages
const stages = [
  {
    id: 'weeks1-2',
    title: 'weeks 1-2: cellular renewal',
    description: [
      'Scalp Revitalization: Increased cellular renewal and enhanced circulation',
      'Follicle Awakening: Red light therapy begins energizing dormant follicles'
    ],
    quote: 'The first signs of renewal begin as your scalp responds to care•atin\'s gentle technology.',
    emotion: 'Hope blossoms as you take the first step in your transformation',
    stats: [
      { label: 'Circulation', value: '+53%' },
      { label: 'Scalp Health', value: '+37%' }
    ],
    image: '/images/before-after/before-after-3-after.png'
  },
  {
    id: 'weeks3-4',
    title: 'weeks 3-4: reduced shedding',
    description: [
      'Shedding Reduction: Notice fewer hairs in your brush and shower drain',
      'Scalp Comfort: Reduced inflammation and improved overall comfort'
    ],
    quote: 'As shedding decreases, you\'ll notice the first visible sign that the treatment is working.',
    emotion: 'Relief grows as you see the first tangible evidence of improvement',
    stats: [
      { label: 'Shedding Reduction', value: '-38%' },
      { label: 'Follicle Energy', value: '+42%' }
    ],
    image: '/images/before-after/before-after-3-after.png'
  },
  {
    id: 'weeks5-8',
    title: 'weeks 5-8: visible regrowth',
    description: [
      'New Growth: Fine baby hairs begin appearing in previously thinning areas',
      'Texture Improvement: Existing hair feels stronger and more resilient'
    ],
    quote: 'New growth becomes visible, especially along the hairline and part, confirming your progress.',
    emotion: 'Excitement builds as others begin to notice the positive changes',
    stats: [
      { label: 'New Growth', value: '+26%' },
      { label: 'Hair Strength', value: '+31%' }
    ],
    image: '/images/before-after/before-after-3-after.png'
  },
  {
    id: 'weeks9-12',
    title: 'weeks 9-12: transformation',
    description: [
      'Full Transformation: Significant improvement in density and coverage',
      'Confidence Restored: Enjoy styling your thicker, healthier hair'
    ],
    quote: 'By week 12, the full transformation becomes evident with dramatically improved density and appearance.',
    emotion: 'Confidence fully restored as your hair transformation is complete',
    stats: [
      { label: 'Density Increase', value: '+76%' },
      { label: 'Thickness', value: '+65%' }
    ],
    image: '/images/before-after/before-after-3-after.png'
  },
];

export function TransformationJourneySection() {
  const [activeStage, setActiveStage] = useState(0);
  
  return (
    <section className="transformation-journey-section">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            your transformation <span className="text-gradient-primary">journey</span>
          </motion.h2>
          <p className="section-subtitle">
            Follow the timeline of visible results as care•atin's revolutionary photonique touch™ technology transforms your hair from within
          </p>
        </div>
        
        {/* Timeline Navigation */}
        <div className="timeline-navigation">
          {stages.map((stage, index) => (
            <button
              key={stage.id}
              className={`timeline-stage-button ${
                activeStage === index ? 'active' : ''
              }`}
              onClick={() => setActiveStage(index)}
            >
              {stage.title.split(':')[0]}
            </button>
          ))}
        </div>
        
        {/* Active Stage Content */}
        <motion.div 
          key={activeStage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="stage-content-grid"
        >
          {/* Left Column: Content */}
          <div className="stage-content">
            <h3 className="stage-title">
              {stages[activeStage].title}
            </h3>
            
            <ul className="stage-description-list">
              {stages[activeStage].description.map((item, i) => (
                <li key={i} className="stage-description-item">
                  <span className="stage-number">{i + 1}</span>
                  <span className="stage-description-text">{item}</span>
                </li>
              ))}
            </ul>
            
            <blockquote className="stage-quote">
              <p className="quote-text">{stages[activeStage].quote}</p>
              <p className="emotion-text">{stages[activeStage].emotion}</p>
            </blockquote>
            
            <div className="stage-stats">
              {stages[activeStage].stats.map((stat, i) => (
                <div key={i} className="stat-card">
                  <p className="stat-value">{stat.value}</p>
                  <p className="stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column: Image */}
          <div className="stage-image-container">
            <div className="stage-image-wrapper">
              <img 
                src={stages[activeStage].image} 
                alt={`Transformation at ${stages[activeStage].title}`} 
                className="stage-image"
                onError={(e) => {
                  e.currentTarget.src = '/images/prettyhair.jpg';
                }}
                loading="lazy"
              />
              <div className="image-overlay"></div>
              <div className="image-label">
                VISIBLE RESULTS
              </div>
            </div>
            
            {/* Floating indicator */}
            <div className="stage-indicator">
              {stages[activeStage].title.split(':')[0].replace('weeks', 'w')}
            </div>
          </div>
        </motion.div>
        
        {/* CTA */}
        <div className="transformation-cta">
          <h3 className="cta-title">Start Your Transformation Today</h3>
          <p className="cta-subtitle">93% of users reported visible results within 12 weeks</p>
          <Link
            to="/products/photonique-touch"
            className="cta-button"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
