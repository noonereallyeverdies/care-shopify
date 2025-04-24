import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, X, Sparkles, Award, Star, Clock, Zap } from 'lucide-react';

// Quiz data structure
type QuizOption = {
  id: string;
  text: string;
  icon?: React.ReactNode;
  value: string;
};

type QuizQuestion = {
  id: string;
  question: string;
  description?: string;
  options: QuizOption[];
  multiSelect?: boolean;
  required?: boolean;
};

type HairProfile = {
  [key: string]: string | string[];
};

const hairQuizQuestions: QuizQuestion[] = [
  {
    id: 'hairType',
    question: 'What is your hair type?',
    description: "Red light therapy's effectiveness can vary based on hair characteristics.",
    options: [
      { id: 'fine', text: 'Fine', value: 'fine' },
      { id: 'medium', text: 'Medium', value: 'medium' },
      { id: 'thick', text: 'Thick', value: 'thick' },
      { id: 'curly', text: 'Curly/Textured', value: 'curly' },
    ],
    required: true
  },
  {
    id: 'concerns',
    question: 'What hair concerns are you experiencing?',
    description: 'Select all that apply to you.',
    options: [
      { id: 'thinning', text: 'Overall thinning', value: 'thinning' },
      { id: 'hairline', text: 'Receding hairline', value: 'hairline' },
      { id: 'partLine', text: 'Widening part line', value: 'partLine' },
      { id: 'breakage', text: 'Breakage & damage', value: 'breakage' },
      { id: 'shedding', text: 'Excessive shedding', value: 'shedding' },
      { id: 'dullness', text: 'Dullness & lack of volume', value: 'dullness' },
      { id: 'slowGrowth', text: 'Slow growth', value: 'slowGrowth' },
    ],
    multiSelect: true,
    required: true
  },
  {
    id: 'duration',
    question: 'How long have you noticed these concerns?',
    description: 'The duration can help determine the optimal treatment approach.',
    options: [
      { id: 'recent', text: 'Recent (< 6 months)', value: 'recent' },
      { id: 'moderate', text: 'Moderate (6-12 months)', value: 'moderate' },
      { id: 'extended', text: 'Extended (1-3 years)', value: 'extended' },
      { id: 'long', text: 'Long-term (3+ years)', value: 'long' },
    ],
    required: true
  },
  {
    id: 'factors',
    question: 'Have you experienced any of these factors recently?',
    description: 'These can influence hair health and how your follicles respond to treatment.',
    options: [
      { id: 'hormonal', text: 'Hormonal changes (pregnancy, menopause)', value: 'hormonal' },
      { id: 'stress', text: 'High stress levels', value: 'stress' },
      { id: 'nutrition', text: 'Nutritional changes or deficiencies', value: 'nutrition' },
      { id: 'medical', text: 'Medical condition or medication', value: 'medical' },
      { id: 'none', text: 'None of the above', value: 'none' },
    ],
    multiSelect: true,
    required: true
  },
  {
    id: 'haircare',
    question: 'What is your current haircare routine?',
    description: 'Understanding your routine helps us customize complementary protocols.',
    options: [
      { id: 'minimal', text: 'Minimal (washing & basic styling)', value: 'minimal' },
      { id: 'moderate', text: 'Moderate (+ occasional treatments)', value: 'moderate' },
      { id: 'extensive', text: 'Extensive (multiple products & treatments)', value: 'extensive' },
      { id: 'professional', text: 'Professional treatments regularly', value: 'professional' },
    ],
    required: true
  },
  {
    id: 'treatments',
    question: 'Have you tried any of these hair treatments before?',
    description: 'Previous treatment history helps tailor your red light therapy regimen.',
    options: [
      { id: 'minoxidil', text: 'Topical treatments (Minoxidil)', value: 'minoxidil' },
      { id: 'supplements', text: 'Hair supplements or vitamins', value: 'supplements' },
      { id: 'prp', text: 'PRP or other in-office treatments', value: 'prp' },
      { id: 'lightTherapy', text: 'Light therapy of any kind', value: 'lightTherapy' },
      { id: 'none', text: 'None of the above', value: 'none' },
    ],
    multiSelect: true,
    required: true
  },
  {
    id: 'goals',
    question: 'What are your primary hair goals?',
    description: 'This helps us focus your regimen on specific outcomes.',
    options: [
      { id: 'density', text: 'Increased density & fullness', value: 'density' },
      { id: 'growth', text: 'Faster growth', value: 'growth' },
      { id: 'strength', text: 'Stronger, less breakage-prone hair', value: 'strength' },
      { id: 'scalp', text: 'Healthier scalp environment', value: 'scalp' },
      { id: 'overall', text: 'Overall hair revitalization', value: 'overall' },
    ],
    multiSelect: true,
    required: true
  },
  {
    id: 'commitment',
    question: 'How much time can you commit to your hair treatment?',
    description: 'Red light therapy requires consistency for optimal results.',
    options: [
      { id: 'minimal', text: '5 minutes, a few times per week', value: 'minimal' },
      { id: 'moderate', text: '10-15 minutes, 3-4 times per week', value: 'moderate' },
      { id: 'dedicated', text: '15-20 minutes, 5+ times per week', value: 'dedicated' },
      { id: 'intensive', text: '20+ minutes daily', value: 'intensive' },
    ],
    required: true
  },
];

// Animation variants for transitions
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

// HairQuiz component
export function HairQuiz() {
  // State for tracking current question
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<HairProfile>({});
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [discountCode, setDiscountCode] = useState('CARE20');
  
  // Set up the discount code when results are shown
  useEffect(() => {
    if (showResults) {
      // Use a fixed discount code instead of generating a random one
      setDiscountCode('CARE20');
    }
  }, [showResults]);

  const currentQuestion = hairQuizQuestions[currentQuestionIndex];
  
  // Handle single-select option selection
  const handleSingleSelect = (optionValue: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: optionValue });
  };
  
  // Handle multi-select option toggle
  const handleMultiSelect = (optionValue: string) => {
    const currentSelections = answers[currentQuestion.id] as string[] || [];
    
    // If "None of the above" is selected, clear other selections
    if (optionValue === 'none') {
      setAnswers({ ...answers, [currentQuestion.id]: ['none'] });
      return;
    }
    
    // If selecting another option while "None" is selected, remove "None"
    if (currentSelections.includes('none')) {
      setAnswers({ 
        ...answers, 
        [currentQuestion.id]: [optionValue] 
      });
      return;
    }
    
    // Toggle the selection
    const newSelections = currentSelections.includes(optionValue)
      ? currentSelections.filter(v => v !== optionValue)
      : [...currentSelections, optionValue];
      
    setAnswers({ ...answers, [currentQuestion.id]: newSelections });
  };
  
  // Check if current question has been answered
  const isCurrentQuestionAnswered = () => {
    const answer = answers[currentQuestion.id];
    if (!currentQuestion.required) return true;
    
    if (currentQuestion.multiSelect) {
      return Array.isArray(answer) && answer.length > 0;
    }
    
    return !!answer;
  };
  
  // Navigation handlers
  const goToNextQuestion = () => {
    if (!isCurrentQuestionAnswered()) return;
    
    if (currentQuestionIndex < hairQuizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Check if an option is selected
  const isOptionSelected = (optionValue: string) => {
    const answer = answers[currentQuestion.id];
    
    if (currentQuestion.multiSelect) {
      return Array.isArray(answer) && answer.includes(optionValue);
    }
    
    return answer === optionValue;
  };
  
  // Calculate progress percentage
  const progressPercentage = ((currentQuestionIndex + (showResults ? 1 : 0)) / hairQuizQuestions.length) * 100;
  
  // Handle email submission to get personalized regimen
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    
    setEmailError('');
    setSubmitting(true);
    
    // Simulate API call to save quiz results and email
    try {
      // In a real implementation, you would call your API here
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
    } catch (error) {
      setEmailError('There was an error sending your results. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  // Create recommendation based on answers
  const getRecommendation = () => {
    // This would be more sophisticated in a real implementation
    // based on the specific answers and combinations
    
    // For demo purposes, we'll create a basic recommendation
    const concerns = answers.concerns as string[] || [];
    const goals = answers.goals as string[] || [];
    const commitment = answers.commitment as string || 'moderate';
    
    let frequency, duration, complementaryProducts;
    
    // Determine frequency and duration based on commitment level
    switch (commitment) {
      case 'minimal':
        frequency = '3-4 times per week';
        duration = '5 minutes per session';
        break;
      case 'moderate':
        frequency = '4-5 times per week';
        duration = '10-15 minutes per session';
        break;
      case 'dedicated':
        frequency = '5-6 times per week';
        duration = '15-20 minutes per session';
        break;
      case 'intensive':
        frequency = 'Daily';
        duration = '20 minutes per session';
        break;
      default:
        frequency = '4-5 times per week';
        duration = '10-15 minutes per session';
    }
    
    // Determine complementary products based on concerns and goals
    if (concerns.includes('breakage') || goals.includes('strength')) {
      complementaryProducts = 'Strengthening serum to use before treatment';
    } else if (concerns.includes('thinning') || goals.includes('density')) {
      complementaryProducts = 'Density-enhancing scalp treatment';
    } else if (concerns.includes('slowGrowth') || goals.includes('growth')) {
      complementaryProducts = 'Growth-activating serum';
    } else {
      complementaryProducts = 'Balancing scalp treatment';
    }
    
    return {
      frequency,
      duration,
      complementaryProducts
    };
  };
  
  // Get appropriate recommendation for display
  const recommendation = showResults ? getRecommendation() : null;

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Progress bar */}
        <div className="mb-10">
          <div className="h-1 w-full bg-neutral-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-rose-500"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-neutral-500">
            <span>Start</span>
            <span>Your custom regimen</span>
          </div>
        </div>
        
        {/* Quiz content */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div 
                key="question"
                className="p-8 md:p-12"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {/* Question */}
                <h2 className="text-2xl md:text-3xl font-light text-neutral-900 mb-3">
                  {currentQuestion.question}
                </h2>
                {currentQuestion.description && (
                  <p className="text-neutral-600 mb-8 max-w-2xl">
                    {currentQuestion.description}
                  </p>
                )}
                
                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.id}
                      className={`p-4 border rounded-xl text-left transition-all ${
                        isOptionSelected(option.value)
                          ? 'border-rose-500 bg-rose-50'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                      onClick={() => currentQuestion.multiSelect 
                        ? handleMultiSelect(option.value) 
                        : handleSingleSelect(option.value)
                      }
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          isOptionSelected(option.value)
                            ? 'bg-rose-500 text-white'
                            : 'bg-neutral-100'
                        }`}>
                          {isOptionSelected(option.value) && <Check size={14} />}
                        </div>
                        <span className="font-medium">{option.text}</span>
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Navigation */}
                <div className="flex justify-between">
                  <button
                    onClick={goToPreviousQuestion}
                    className="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 transition-colors"
                    disabled={currentQuestionIndex === 0}
                  >
                    <ArrowLeft size={18} />
                    Back
                  </button>
                  <button
                    onClick={goToNextQuestion}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-white transition-colors ${
                      isCurrentQuestionAnswered()
                        ? 'bg-rose-500 hover:bg-rose-600'
                        : 'bg-neutral-300 cursor-not-allowed'
                    }`}
                    disabled={!isCurrentQuestionAnswered()}
                  >
                    {currentQuestionIndex < hairQuizQuestions.length - 1 ? 'Next' : 'Get Results'}
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                className="p-8 md:p-12"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {!submitted ? (
                  <>
                    <div className="text-center mb-10">
                      <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Sparkles className="w-8 h-8 text-rose-500" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-light text-neutral-900 mb-3">
                        Your Personalized Care Protocol is Ready!
                      </h2>
                      <p className="text-neutral-600 max-w-2xl mx-auto">
                        Based on your answers, we've created a customized red light therapy regimen 
                        tailored to your specific hair needs.
                      </p>
                    </div>
                    
                    {/* Preview of recommendations */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                      <div className="p-6 bg-neutral-50 rounded-xl text-center">
                        <Clock className="w-8 h-8 text-rose-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-neutral-900 mb-2">Recommended Frequency</h3>
                        <p className="text-neutral-700">{recommendation?.frequency}</p>
                      </div>
                      <div className="p-6 bg-neutral-50 rounded-xl text-center">
                        <Zap className="w-8 h-8 text-rose-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-neutral-900 mb-2">Session Duration</h3>
                        <p className="text-neutral-700">{recommendation?.duration}</p>
                      </div>
                      <div className="p-6 bg-neutral-50 rounded-xl text-center">
                        <Star className="w-8 h-8 text-rose-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-neutral-900 mb-2">Complementary Care</h3>
                        <p className="text-neutral-700">{recommendation?.complementaryProducts}</p>
                      </div>
                    </div>
                    
                    {/* Email capture for full recommendations & discount */}
                    <div className="max-w-xl mx-auto">
                      <div className="p-6 bg-rose-50 rounded-xl border border-rose-100 mb-8">
                        <div className="flex items-start gap-4">
                          <Award className="w-8 h-8 text-rose-500 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="text-lg font-medium text-neutral-900 mb-2">
                              Get your detailed regimen + 20% off your first order
                            </h3>
                            <p className="text-neutral-700 text-sm mb-0">
                              Enter your email to receive your complete personalized hair care regimen, 
                              backed by dermatologist expertise and our exclusive 20% discount code.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-3 rounded-lg border ${
                              emailError ? 'border-red-500' : 'border-neutral-300'
                            } focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent`}
                            placeholder="Your email address"
                            required
                          />
                          {emailError && (
                            <p className="mt-2 text-sm text-red-500">{emailError}</p>
                          )}
                        </div>
                        
                        <div className="flex justify-center">
                          <button
                            type="submit"
                            className="w-full px-6 py-3 rounded-full bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors flex items-center justify-center"
                            disabled={submitting}
                          >
                            {submitting ? 'Sending...' : 'Get My Custom Regimen & Discount'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </>
                ) : (
                  // Thank you screen after submission
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-rose-500" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-light text-neutral-900 mb-3">
                      Thank You!
                    </h2>
                    <p className="text-neutral-600 max-w-2xl mx-auto mb-8">
                      Your personalized hair regimen has been sent to your inbox. 
                      Be sure to check your email in the next few minutes.
                    </p>
                    
                    {/* Discount code display */}
                    <div className="max-w-md mx-auto p-6 bg-neutral-50 rounded-xl border border-neutral-200 mb-8">
                      <h3 className="text-lg font-medium text-neutral-900 mb-2">
                        Your 20% Discount Code
                      </h3>
                      <div className="flex items-center justify-center gap-4 bg-white p-4 rounded-lg border border-neutral-200">
                        <span className="text-xl font-mono font-medium text-rose-600">{discountCode}</span>
                        <button 
                          className="text-neutral-500 hover:text-neutral-700" 
                          onClick={() => {
                            navigator.clipboard.writeText(discountCode);
                          }}
                          title="Copy code"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-sm text-neutral-600 mt-3 mb-0">
                        Use this code at checkout for 20% off your first purchase
                      </p>
                    </div>
                    
                    <a 
                      href="/collections/all" 
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors"
                    >
                      Shop Products
                      <ArrowRight size={18} />
                    </a>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Authority indicators */}
        <div className="mt-12 text-center">
          <p className="text-sm text-neutral-500 mb-4">
            Our assessment is designed by hair specialists and clinical scientists
          </p>
          <div className="flex justify-center items-center gap-6 flex-wrap">
            <img src="/images/badge-dermatologist.svg" alt="Dermatologist Approved" className="h-12" />
            <img src="/images/badge-clinical.svg" alt="Clinically Tested" className="h-12" />
            <img src="/images/badge-science.svg" alt="Science-Backed" className="h-12" />
          </div>
        </div>
      </div>
    </section>
  );
} 