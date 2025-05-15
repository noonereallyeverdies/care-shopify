import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link } from '@remix-run/react';

import './HairAssessment.css';

interface Question {
  id: string;
  question: string;
  options: Array<{
    value: string;
    label: string;
    image?: string;
  }>;
}

const questions: Question[] = [
  {
    id: 'hairType',
    question: 'What best describes your hair?',
    options: [
      { value: 'fine', label: 'Fine & Thin', image: '/images/hair-fine.jpg' },
      { value: 'medium', label: 'Medium Thickness', image: '/images/hair-medium.jpg' },
      { value: 'thick', label: 'Thick & Dense', image: '/images/hair-thick.jpg' },
      { value: 'curly', label: 'Curly or Textured', image: '/images/hair-curly.jpg' }
    ]
  },
  {
    id: 'primaryConcern',
    question: 'What\'s your primary hair concern?',
    options: [
      { value: 'thinning', label: 'Overall Thinning' },
      { value: 'receding', label: 'Receding Hairline' },
      { value: 'crown', label: 'Crown/Part Widening' },
      { value: 'fullness', label: 'Lack of Volume' }
    ]
  },
  {
    id: 'duration',
    question: 'How long have you noticed changes?',
    options: [
      { value: 'recent', label: 'Less than 6 months' },
      { value: 'moderate', label: '6 months - 2 years' },
      { value: 'extended', label: '2+ years' },
      { value: 'unsure', label: 'Not sure' }
    ]
  },
  {
    id: 'lifestyle',
    question: 'Which best describes your lifestyle?',
    options: [
      { value: 'highstress', label: 'High-stress professional' },
      { value: 'balanced', label: 'Balanced work-life' },
      { value: 'active', label: 'Very active/athletic' },
      { value: 'relaxed', label: 'Relaxed pace' }
    ]
  }
];

interface AssessmentResult {
  hairType: string;
  primaryConcern: string;
  duration: string;
  lifestyle: string;
}

const getPersonalizedRecommendation = (answers: AssessmentResult) => {
  const recommendations = {
    protocol: '',
    timeline: '',
    specificTips: [] as string[],
    productUrl: '/products/care-atin-device'
  };

  // Determine protocol based on hair type and concern
  if (answers.primaryConcern === 'thinning' || answers.primaryConcern === 'crown') {
    recommendations.protocol = 'Intensive Restoration Protocol';
    recommendations.timeline = '12-16 weeks';
  } else if (answers.primaryConcern === 'receding') {
    recommendations.protocol = 'Targeted Growth Protocol';
    recommendations.timeline = '16-20 weeks';
  } else {
    recommendations.protocol = 'Volume Enhancement Protocol';
    recommendations.timeline = '8-12 weeks';
  }

  // Add specific tips based on lifestyle
  if (answers.lifestyle === 'highstress') {
    recommendations.specificTips.push('Include morning sessions to combat stress-related hair loss');
    recommendations.specificTips.push('Consider pairing with scalp massage for stress relief');
  } else if (answers.lifestyle === 'active') {
    recommendations.specificTips.push('Use post-workout sessions when circulation is enhanced');
    recommendations.specificTips.push('Focus on crown area after intense training');
  }

  // Add tips based on duration
  if (answers.duration === 'extended') {
    recommendations.specificTips.push('Consistency is crucial - don\'t expect immediate results');
    recommendations.specificTips.push('Consider combination with biotin supplements');
  } else if (answers.duration === 'recent') {
    recommendations.specificTips.push('Early intervention gives best results');
    recommendations.specificTips.push('You\'re catching this at the optimal time');
  }

  return recommendations;
};

export function HairAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<AssessmentResult>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [recommendation, setRecommendation] = useState<ReturnType<typeof getPersonalizedRecommendation> | null>(null);

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Generate personalized recommendation
      const rec = getPersonalizedRecommendation(newAnswers as AssessmentResult);
      setRecommendation(rec);
      setIsComplete(true);
    }
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsComplete(false);
    setRecommendation(null);
  };

  if (isComplete && recommendation) {
    return (
      <motion.div 
        className="assessment-results"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="results-container">
          <motion.h2 
            className="results-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Your Personalized Hair Plan
          </motion.h2>

          <motion.div 
            className="recommendation-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="protocol-name">{recommendation.protocol}</h3>
            <p className="protocol-timeline">Expected Results: {recommendation.timeline}</p>
            
            <div className="tips-section">
              <h4>Your Specific Recommendations:</h4>
              <ul className="tips-list">
                {recommendation.specificTips.map((tip, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    {tip}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div 
            className="cta-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link 
              to={recommendation.productUrl} 
              className="button button--primary results-cta"
            >
              Get Your Care-atin Device
            </Link>
            <button 
              onClick={resetAssessment}
              className="button button--secondary retake-button"
            >
              Retake Assessment
            </button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="hair-assessment"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="assessment-container">
        <motion.div 
          className="progress-bar"
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
        
        <motion.div 
          className="question-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="question-number">
            {currentQuestion + 1} of {questions.length}
          </span>
          <h2 className="question-title">{questions[currentQuestion].question}</h2>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentQuestion}
            className="options-container"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={option.value}
                className="option-button"
                onClick={() => handleAnswer(questions[currentQuestion].id, option.value)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option.image && (
                  <div className="option-image">
                    <img src={option.image} alt={option.label} loading="lazy" />
                  </div>
                )}
                <span className="option-label">{option.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>

        {currentQuestion > 0 && (
          <motion.button 
            className="back-button"
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            ← Back
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
