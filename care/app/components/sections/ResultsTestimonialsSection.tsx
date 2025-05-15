import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@remix-run/react';
import { ArrowRight } from 'lucide-react';
import { handleImageError } from '~/utils/imageErrorHandler';

// Import CSS for consistent styling
import './ResultsTestimonialsSection.css';

// Transformation-focused testimonial data with emotional resonance
const testimonials = [
  {
    id: "elena",
    name: "Elena M.",
    age: 37,
    duration: "3 months",
    quote: "care•atin gave me back my morning ritual of truly caring for myself. It's not just about hair—it's about honoring my wellness every day.",
    concern: "Thinning at part line",
    rating: 5,
    beforeImage: "/images/testimonials/elena-before.jpg",
    afterImage: "/images/testimonials/elena-after.jpg",
    journey: "From hiding my scalp to celebrating my natural beauty",
    transformation: "Rediscovered confidence through mindful self-care"
  },
  {
    id: "michael",
    name: "Michael R.",
    age: 42,
    duration: "4 months",
    quote: "The combination of ancient wisdom and modern science in one ritual transformed not just my hair, but my entire approach to wellness.",
    concern: "Receding hairline",
    rating: 5,
    beforeImage: "/images/testimonials/michael-before.jpg",
    afterImage: "/images/testimonials/michael-after.jpg",
    journey: "From anxiety about aging to embracing transformation",
    transformation: "Found peace in the ritual of renewal"
  },
  {
    id: "sophia",
    name: "Sophia T.",
    age: 34,
    duration: "5 months",
    quote: "care•atin taught me that healing is a journey, not a destination. Each session became a meditation on self-love and renewal.",
    concern: "Postpartum thinning",
    rating: 5,
    beforeImage: "/images/testimonials/sophia-before.jpg",
    afterImage: "/images/testimonials/sophia-after.jpg",
    journey: "From postpartum overwhelm to mindful motherhood",
    transformation: "Embraced the beauty of gradual change"
  }
];

// Wellness-focused results data
const wellnessResults = [
  { 
    label: 'Ritual Satisfaction', 
    value: '96%',
    description: 'find their daily practice deeply fulfilling'
  },
  { 
    label: 'Mindful Connection', 
    value: '89%',
    description: 'report improved relationship with self-care'
  },
  { 
    label: 'Transformation Noticed', 
    value: '91%',
    description: 'see visible changes within 12 weeks'
  },
  { 
    label: 'Holistic Wellness', 
    value: '87%',
    description: 'experience improved overall wellbeing'
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function ResultsTestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showBeforeAfter, setShowBeforeAfter] = useState(true);
  
  // Currently viewed testimonial
  const testimonial = testimonials[activeTestimonial];
  
  const handleNext = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  // Function to toggle the view (optional, if you add a button for it)
  const toggleView = () => {
    setShowBeforeAfter(prevState => !prevState);
  };

  return (
    <motion.section 
      className="results-testimonials-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Abstract background elements */}
      <div className="testimonials-background">
        <div className="bg-particle bg-particle-1"></div>
        <div className="bg-particle bg-particle-2"></div>
        <div className="bg-particle bg-particle-3"></div>
      </div>

      <div className="container">
        <motion.div variants={itemVariants} className="section-header">
          <span className="section-tag">Transformation Stories</span>
          <h2 className="section-title">
            journeys of <span className="text-gradient-primary">renewal</span>
          </h2>
          <p className="section-subtitle">
            Every care•atin experience is unique. Here are stories of transformation that go beyond hair—embracing wellness, ritual, and the beauty of gradual change.
          </p>
        </motion.div>
        
        {/* Wellness Results Overview */}
        <motion.div variants={itemVariants} className="wellness-results-card">
          <h3 className="results-title">holistic wellness results</h3>
          <p className="results-highlight">
            <span className="highlight-number">96%</span> of practitioners report their care•atin ritual brings deep satisfaction beyond hair improvement
          </p>
          
          <div className="results-grid">
            {wellnessResults.map((result, index) => (
              <motion.div 
                key={index}
                className="result-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <p className="result-value">{result.value}</p>
                <p className="result-label">{result.label}</p>
                <p className="result-description">{result.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="science-highlight">
            <div className="science-check">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div className="science-content">
              <p className="science-title">Beyond Clinical Results</p>
              <p className="science-text">
                Our photonique touch™ technology (630-680nm) not only delivers measurable hair improvements but creates a transformative daily ritual. Users report enhanced mindfulness, improved self-care habits, and a deeper connection to their wellness journey.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Testimonial Navigation */}
        <motion.div variants={itemVariants} className="testimonial-navigation">
          {testimonials.map((item, index) => (
            <button
              key={item.id}
              className={`testimonial-tab ${activeTestimonial === index ? 'active' : ''}`}
              onClick={() => setActiveTestimonial(index)}
            >
              {item.name}
            </button>
          ))}
        </motion.div>
        
        {/* View Toggle */}
        <motion.div variants={itemVariants} className="view-toggle">
          <div className="toggle-container">
            <button
              className={`toggle-option ${showBeforeAfter ? 'active' : ''}`}
              onClick={toggleView}
            >
              Before & After
            </button>
            <button
              className={`toggle-option ${!showBeforeAfter ? 'active' : ''}`}
              onClick={toggleView}
            >
              Testimonial
            </button>
          </div>
        </motion.div>
        
        {/* Testimonial Content */}
        <div className="testimonial-content-grid">
          {/* Left Column: Before/After or Quote */}
          <AnimatePresence mode="wait">
            {showBeforeAfter ? (
              /* Before/After Comparison */
              <motion.div
                key="before-after"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="before-after-container"
              >
                <div className="image-comparison">
                  <div className="before-image">
                    <img 
                      src={testimonial.beforeImage} 
                      alt={`${testimonial.name} before using care•atin`}
                      onError={(e) => {
                        e.currentTarget.src = '/images/prettyhair.jpg';
                      }}
                    />
                    <div className="image-label before-label">BEFORE</div>
                    <div className="image-grain"></div>
                  </div>
                  
                  <div className="after-image">
                    <img 
                      src={testimonial.afterImage} 
                      alt={`${testimonial.name} after using care•atin`}
                      onError={(e) => {
                        e.currentTarget.src = '/images/prettyhair.jpg';
                      }}
                    />
                    <div className="image-label after-label">AFTER {testimonial.duration}</div>
                    <div className="image-grain"></div>
                  </div>
                </div>
                
                {/* Technical Detail Card */}
                <div className="duration-card">
                  <p className="duration-label">Treatment Duration</p>
                  <p className="duration-value">{testimonial.duration} of consistent use</p>
                </div>
              </motion.div>
            ) : (
              /* Testimonial Quote */
              <motion.div
                key="testimonial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="testimonial-quote-container"
              >
                <div className="quote-card">
                  <div className="rating-stars">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                    <span className="rating-value">5.0</span>
                  </div>
                  
                  <blockquote className="quote-text">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <footer className="quote-footer">
                    <p className="author-name">{testimonial.name}, {testimonial.age}</p>
                    <div className="quote-meta">
                      <span className="concern-tag">
                        {testimonial.concern}
                      </span>
                      <span className="verification">
                        Using for {testimonial.duration} • Verified Buyer
                      </span>
                    </div>
                  </footer>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Right Column: Results Cards */}
          <div className="results-cards">
            <h3 className="results-title">
              {testimonial.name}'s transformation
            </h3>
            
            <div className="results-card-stack">
              <div className="result-card before-care">
                <h4 className="card-title">Before Care•atin</h4>
                <p className="card-content">
                  {testimonial.id === "elena" 
                    ? "Every morning, I'd spend 20 minutes trying to style my hair to hide the thinning spots. I avoided bright overhead lighting and dreaded windy days that would expose my scalp."
                    : testimonial.id === "michael"
                    ? "I'd catch my reflection and barely recognize myself. My receding hairline aged me by a decade, and I found myself wearing hats constantly to hide it."
                    : "After my pregnancy, I was shocked by how much hair I was losing. I'd find it everywhere—on my pillow, in the shower, on my clothes. It felt like I was watching my identity wash away."}
                </p>
                <div className="card-highlight">
                  <p className="highlight-quote">
                    "Before care•atin, I tried {testimonial.id === "elena" 
                      ? "expensive supplements and salon treatments with minimal results."
                      : testimonial.id === "michael"
                      ? "topical solutions that irritated my scalp without improving my hair."
                      : "multiple post-pregnancy hair products that promised but didn't deliver."}
                  </p>
                </div>
              </div>
              
              <div className="result-card after-care">
                <h4 className="card-title">After Care•atin</h4>
                <p className="card-content">
                  {testimonial.id === "elena" 
                    ? "Now I can wear my hair however I want. When I catch my reflection, I see myself again—not my thinning hair. That confidence affects everything from dating to job interviews."
                    : testimonial.id === "michael"
                    ? "I don't even think about my hair anymore—that's the biggest change. I've gone from checking my hairline every morning to just enjoying life without hair anxiety."
                    : "My hairdresser was the first to notice the new growth. Now my hair feels like it did before pregnancy, and I can enjoy my baby without worrying about what's happening to my appearance."}
                </p>
              </div>
              
              <div className="result-card transformation-results">
                <h4 className="card-title">Life-Changing Results</h4>
                <ul className="results-list">
                  <li className="result-item">
                    <span className="result-bullet">•</span>
                    <span>
                      {testimonial.id === "elena" 
                        ? "Visible part line filling in by week 8" 
                        : testimonial.id === "michael"
                        ? "Temple recession stopped and began to reverse"
                        : "Daily shedding reduced by 70% within first month"}
                    </span>
                  </li>
                  <li className="result-item">
                    <span className="result-bullet">•</span>
                    <span>
                      {testimonial.id === "elena" 
                        ? "Overall density improved by 65%" 
                        : testimonial.id === "michael"
                        ? "Hair appeared noticeably thicker by month 3"
                        : "New growth visible along hairline by week 10"}
                    </span>
                  </li>
                  <li className="result-item">
                    <span className="result-bullet">•</span>
                    <span>
                      {testimonial.id === "elena" 
                        ? "Confidence to wear hair down again" 
                        : testimonial.id === "michael"
                        ? "No longer concerned about future hair loss"
                        : "Returned to pre-pregnancy hair volume by month 4"}
                    </span>
                  </li>
                </ul>
                
                <div className="emotional-impact">
                  <p className="impact-label">Emotional Impact:</p>
                  <p className="impact-quote">
                    "{testimonial.id === "elena" 
                      ? "I no longer build my outfits around hiding my hair. I feel like myself again—confident and free."
                      : testimonial.id === "michael" 
                      ? "I used to avoid photos and social events. Now I don't think twice about how my hair looks."
                      : "Instead of obsessing over my hair loss, I can focus on enjoying motherhood. That's priceless."}"
                  </p>
                </div>
              </div>
              
              <div className="result-card usage-pattern">
                <h4 className="card-title">Usage Pattern</h4>
                <p className="usage-description">
                  {testimonial.id === "elena" 
                    ? "15-minute sessions, 3 times weekly, typically evenings while watching TV"
                    : testimonial.id === "michael"
                    ? "10-minute sessions, 4 times weekly, after morning shower while checking emails"
                    : "12-minute sessions, 3 times weekly, during baby's nap time or bedtime routine"}
                </p>
                <p className="simplicity-rating">
                  <span className="rating-label">Simplicity Rating:</span> {" "}
                  {testimonial.id === "elena" 
                    ? "9/10 - \"Easier than my skincare routine\""
                    : testimonial.id === "michael"
                    ? "10/10 - \"Effortless part of my daily habits\""
                    : "8/10 - \"Very manageable even with a newborn\""}
                </p>
                <div className="consistency-bar">
                  <div className="consistency-progress"></div>
                  <span className="consistency-percentage">100%</span>
                </div>
                <p className="consistency-label">Consistency Rating</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Brief Testimonials */}
        <div className="brief-testimonials">
          {testimonials.map((item, index) => (
            index !== activeTestimonial && (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="brief-testimonial-card"
                onClick={() => setActiveTestimonial(index)}
              >
                <p className="brief-quote">"{item.quote}"</p>
                <footer className="brief-footer">
                  <div className="brief-author">
                    <p className="brief-name">{item.name}</p>
                    <p className="brief-duration">{item.duration}</p>
                  </div>
                  <div className="brief-rating">
                    {[...Array(item.rating)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                </footer>
              </motion.div>
            )
          ))}
        </div>
        
        {/* CTA Section */}
        <motion.div variants={itemVariants} className="testimonials-cta">
          <div className="cta-content">
            <p className="cta-message">Ready to start your transformation?</p>
            <p className="cta-description">
              Join thousands who've reclaimed their hair confidence with care•atin's 
              clinically proven technology. 60-day satisfaction guarantee.
            </p>
          </div>
          
          <div className="cta-buttons">
            <Link 
              to="/pages/reviews"
              className="cta-link secondary"
            >
              Read More Stories
            </Link>
            <Link 
              to="/products/photonique-touch"
              className="cta-link primary"
            >
              Start Your Transformation Today
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}