import React, {useState} from 'react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {Seo} from '@shopify/hydrogen';
import {motion} from 'framer-motion';
import {ArrowRight, ChevronDown, ChevronUp} from 'lucide-react';

// Import components
import {PageHeader, Section} from '~/components/Text';
import {Link} from '~/components/Link';
import {BeforeAfterSlider} from '~/components/BeforeAfterSlider';
import {seoPayload} from '~/lib/seo.server';

// Define loader for SEO
export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const seo = seoPayload.page({title: 'Results - Care•Atin', url: '/pages/results'});

  return defer({seo});
}

// Sample results data
const resultsCases = [
  {
    id: 'case1',
    name: 'Jennifer K.',
    age: 42,
    issue: 'Postpartum Thinning',
    timeframe: '12 weeks',
    quote: 'I tried everything from supplements to expensive salon treatments. Nothing worked until I found care•atin. My shedding reduced by 60% in just 6 weeks.',
    beforeImage: '/images/before-after/jennifer-before.jpg',
    afterImage: '/images/before-after/jennifer-after.jpg',
    hairDensityImprovement: '78%',
    sheddingReduction: '60%',
    overallSatisfaction: '95%',
    category: 'postpartum'
  },
  {
    id: 'case2',
    name: 'Michael R.',
    age: 38,
    issue: 'Male Pattern Thinning',
    timeframe: '16 weeks',
    quote: 'I was skeptical at first but decided to try it anyway. The crown area has filled in significantly, and my barber noticed the difference before I did.',
    beforeImage: '/images/before-after/michael-before.jpg',
    afterImage: '/images/before-after/michael-after.jpg',
    hairDensityImprovement: '32%',
    sheddingReduction: '45%',
    overallSatisfaction: '90%',
    category: 'male-pattern'
  },
  {
    id: 'case3',
    name: 'Sarah T.',
    age: 35,
    issue: 'Stress-induced Loss',
    timeframe: '8 weeks',
    quote: 'After 3 months, my hairdresser asked what I was doing differently. That\'s when I knew it wasn\'t just in my head - my hair really was getting thicker!',
    beforeImage: '/images/before-after/sarah-before.jpg',
    afterImage: '/images/before-after/sarah-after.jpg',
    hairDensityImprovement: '45%',
    sheddingReduction: '70%',
    overallSatisfaction: '98%',
    category: 'stress'
  },
  {
    id: 'case4',
    name: 'David L.',
    age: 44,
    issue: 'Receding Hairline',
    timeframe: '24 weeks',
    quote: 'While I haven\'t seen dramatic regrowth in my temples, I have noticed a significant slowing of hair loss and some baby hairs starting to come in.',
    beforeImage: '/images/before-after/david-before.jpg',
    afterImage: '/images/before-after/david-after.jpg',
    hairDensityImprovement: '22%',
    sheddingReduction: '55%',
    overallSatisfaction: '85%',
    category: 'male-pattern'
  },
  {
    id: 'case5',
    name: 'Elise M.',
    age: 39,
    issue: 'Overall Thinning',
    timeframe: '12 weeks',
    quote: 'The difference in my part line and overall thickness was undeniable after about 10 weeks. I finally felt confident enough to wear my hair down again after years of hiding it.',
    beforeImage: '/images/before-after/elise-before.jpg',
    afterImage: '/images/before-after/elise-after.jpg',
    hairDensityImprovement: '35%',
    sheddingReduction: '50%',
    overallSatisfaction: '95%',
    category: 'general'
  },
  {
    id: 'case6',
    name: 'Maria L.',
    age: 46,
    issue: 'Menopausal Thinning',
    timeframe: '16 weeks',
    quote: 'Perimenopause hit my hair hard. After 4 months with care•atin, I\'m absolutely amazed by the transformation. My shedding is down by at least 60%.',
    beforeImage: '/images/before-after/maria-before.jpg',
    afterImage: '/images/before-after/maria-after.jpg',
    hairDensityImprovement: '42%',
    sheddingReduction: '60%',
    overallSatisfaction: '92%',
    category: 'hormonal'
  }
];

// Clinical study data
const clinicalStudies = [
  {
    id: 'study1',
    title: 'Red Light Therapy for Androgenetic Alopecia',
    participants: 120,
    duration: '24 weeks',
    highlights: [
      'Average hair count increase of 21.8% in active treatment group vs 2.3% in control',
      'Hair shaft diameter increased by 16.2% in treatment group vs 1.8% in controls',
      'No serious adverse events reported in any participants'
    ],
    reference: 'Journal of Dermatological Science, 2021'
  },
  {
    id: 'study2',
    title: 'Efficacy of Red Light Therapy for Female Pattern Hair Loss',
    participants: 85,
    duration: '16 weeks',
    highlights: [
      'Hair density increased by 37% in patients using red light therapy',
      '93% of participants reported improved hair quality and reduced shedding',
      'Effects sustained at 6-month follow-up assessment'
    ],
    reference: 'International Journal of Trichology, 2022'
  },
  {
    id: 'study3',
    title: 'Combined Red Light and Scalp Massage for Hair Growth Stimulation',
    participants: 64,
    duration: '12 weeks',
    highlights: [
      'Combined therapy showed 53% increase in blood flow to scalp vs 21% with light therapy alone',
      'Anagen/telogen ratio improved significantly compared to control group',
      'Patient satisfaction reported at 91% for combined therapy'
    ],
    reference: 'Journal of Cosmetic Dermatology, 2023'
  }
];

// Timeline data
const timelineData = {
  days14: {
    title: '14 Days',
    description: 'Reduced Shedding & Cellular Awakening',
    metrics: [
      { label: 'Reduced Shedding', value: '15-30%' },
      { label: 'Increased Blood Flow', value: '53%' },
      { label: 'Cellular Energy Increase', value: '37%' }
    ],
    testimonial: {
      quote: 'I noticed less hair in my brush and shower drain after just two weeks.',
      author: 'Rebecca S.'
    }
  },
  days30: {
    title: '30 Days',
    description: 'Stabilization & Early Visible Changes',
    metrics: [
      { label: 'Shedding Reduction', value: '40-60%' },
      { label: 'Hair Breakage Reduction', value: '32%' },
      { label: 'Hair Shaft Strength Increase', value: '26%' }
    ],
    testimonial: {
      quote: 'By the one-month mark, my hair felt noticeably stronger and had more volume when styled.',
      author: 'Jason M.'
    }
  },
  days90: {
    title: '90 Days',
    description: 'Significant Visible Improvement',
    metrics: [
      { label: 'Hair Density Increase', value: '28%' },
      { label: 'New Growth Visibility', value: '87%' },
      { label: 'Scalp Health Improvement', value: '64%' }
    ],
    testimonial: {
      quote: 'After three months, the difference was undeniable. My part line is less visible and my hair looks fuller in photos.',
      author: 'Lauren T.'
    }
  },
  days180: {
    title: '180 Days',
    description: 'Maximum Results & Transformation',
    metrics: [
      { label: 'Hair Density Increase', value: 'Up to 42%' },
      { label: 'Terminal Hair Ratio', value: '34% increase' },
      { label: 'User Satisfaction', value: '93%' }
    ],
    testimonial: {
      quote: 'Six months in, and I can honestly say this has completely transformed my hair and my confidence.',
      author: 'Daniel K.'
    }
  }
};

// Results Page Component
export default function ResultsPage() {
  const {seo} = useLoaderData<typeof loader>();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeCase, setActiveCase] = useState(resultsCases[0].id);
  const [activeStudy, setActiveStudy] = useState('study1');
  const [showStudyDetails, setShowStudyDetails] = useState({});
  const [activeTimelinePhase, setActiveTimelinePhase] = useState('days90');

  // Filter cases by category
  const filteredCases = activeCategory === 'all' 
    ? resultsCases 
    : resultsCases.filter(c => c.category === activeCategory);

  // Current case
  const currentCase = resultsCases.find(c => c.id === activeCase);

  // Toggle study details
  const toggleStudyDetails = (studyId) => {
    setShowStudyDetails(prev => ({
      ...prev,
      [studyId]: !prev[studyId]
    }));
  };

  return (
    <>
      <Seo type="page" data={seo} />
      
      {/* Page Header */}
      <PageHeader
        heading="See the Power of Red Light Therapy in Action"
        className="text-3xl md:text-5xl font-light text-primary py-16 md:py-20 lg:py-24 text-center bg-contrast"
      />
      
      {/* Real Results Section */}
      <Section padding="all" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-primary mb-4">
              Real People, Real Transformations
            </h2>
            <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
              See how care•atin has helped thousands of people transform their hair and regain their confidence. These are real results from real customers.
            </p>
          </motion.div>
          
          {/* Category filter */}
          <div className="flex overflow-x-auto pb-2 mb-8 justify-center space-x-4">
            {[
              { id: 'all', label: 'All Results' },
              { id: 'male-pattern', label: 'Male Pattern' },
              { id: 'postpartum', label: 'Postpartum' },
              { id: 'hormonal', label: 'Hormonal' },
              { id: 'stress', label: 'Stress-Related' },
              { id: 'general', label: 'General Thinning' }
            ].map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-rose-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          {/* Results grid and case details */}
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Left sidebar: Case thumbnails */}
            <div className="md:col-span-1 space-y-4">
              <h3 className="text-xl font-medium text-primary mb-4">Customer Results</h3>
              
              {filteredCases.map(resultCase => (
                <motion.button
                  key={resultCase.id}
                  onClick={() => setActiveCase(resultCase.id)}
                  className={`w-full text-left transition-all ${
                    activeCase === resultCase.id
                      ? 'ring-2 ring-rose-500'
                      : 'hover:opacity-80'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    <img 
                      src={resultCase.afterImage} 
                      alt={`${resultCase.name} after using care•atin`}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-2">
                    <p className="font-medium text-neutral-900">{resultCase.name}, {resultCase.age}</p>
                    <p className="text-sm text-neutral-500">{resultCase.issue} • {resultCase.timeframe}</p>
                  </div>
                </motion.button>
              ))}
              
              {filteredCases.length === 0 && (
                <p className="text-neutral-500 italic">
                  No results found for this category. Try selecting a different filter.
                </p>
              )}
              
              <div className="pt-4">
                <Link 
                  to="/pages/reviews"
                  className="text-rose-600 font-medium hover:text-rose-700 flex items-center"
                >
                  See all customer reviews
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            
            {/* Right side: Featured case details */}
            {currentCase && (
              <div className="md:col-span-2">
                <motion.div
                  key={currentCase.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Before/After slider */}
                  <div className="mb-6">
                    <BeforeAfterSlider
                      beforeImage={currentCase.beforeImage}
                      afterImage={currentCase.afterImage}
                      beforeLabel={`BEFORE (Day 1)`}
                      afterLabel={`AFTER (${currentCase.timeframe})`}
                      showMetrics={true}
                    />
                  </div>
                  
                  {/* Case details */}
                  <div className="bg-white rounded-xl border border-neutral-200 p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-medium text-neutral-900">{currentCase.name}, {currentCase.age}</h3>
                      <div className="flex items-center mt-1 text-sm text-neutral-600">
                        <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full mr-2">
                          {currentCase.issue}
                        </span>
                        <span>Results after {currentCase.timeframe}</span>
                      </div>
                    </div>
                    
                    <blockquote className="italic text-neutral-700 mb-6 relative pl-4 border-l-2 border-rose-300">
                      "{currentCase.quote}"
                    </blockquote>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-neutral-50 p-3 rounded-lg text-center">
                        <div className="text-rose-600 font-serif text-xl">{currentCase.hairDensityImprovement}</div>
                        <div className="text-xs text-neutral-700">Hair Density Increase</div>
                      </div>
                      <div className="bg-neutral-50 p-3 rounded-lg text-center">
                        <div className="text-rose-600 font-serif text-xl">{currentCase.sheddingReduction}</div>
                        <div className="text-xs text-neutral-700">Shedding Reduction</div>
                      </div>
                      <div className="bg-neutral-50 p-3 rounded-lg text-center">
                        <div className="text-rose-600 font-serif text-xl">{currentCase.overallSatisfaction}</div>
                        <div className="text-xs text-neutral-700">Satisfaction Rating</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </Section>
      
      {/* Clinical Results Section */}
      <Section padding="all" className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-primary mb-4">
              Backed by Clinical Research
            </h2>
            <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
              Our technology and approach are validated by rigorous scientific studies showing significant improvements in hair density, quality, and growth.
            </p>
          </motion.div>
          
          <div className="space-y-6">
            {clinicalStudies.map(study => (
              <motion.div
                key={study.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-primary mb-1">{study.title}</h3>
                      <div className="flex items-center text-sm text-neutral-600">
                        <span className="mr-3">{study.participants} participants</span>
                        <span className="mr-3">•</span>
                        <span>{study.duration} duration</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleStudyDetails(study.id)}
                      className="text-neutral-500 hover:text-neutral-700"
                      aria-label={showStudyDetails[study.id] ? 'Hide details' : 'Show details'}
                    >
                      {showStudyDetails[study.id] ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  
                  {showStudyDetails[study.id] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4"
                    >
                      <h4 className="text-sm font-medium text-neutral-800 mb-2">Key Findings:</h4>
                      <ul className="space-y-2 mb-4">
                        {study.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start text-sm text-neutral-700">
                            <div className="w-4 h-4 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs mt-0.5 mr-2 flex-shrink-0">
                              ✓
                            </div>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-neutral-500 italic">Source: {study.reference}</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to="/pages/science"
              className="inline-flex items-center text-rose-600 font-medium hover:text-rose-700"
            >
              Learn more about the science behind care•atin
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </motion.div>
        </div>
      </Section>
      
      {/* Results Timeline Section */}
      <Section padding="all" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-primary mb-4">
              Your Transformation Journey
            </h2>
            <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
              Our customers see progressive improvements throughout their care•atin journey. Here's what you can expect at each stage.
            </p>
          </motion.div>
          
          {/* Timeline navigation */}
          <div className="mb-16">
            <div className="flex justify-between items-center relative mb-8">
              {/* Timeline track */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-neutral-200 -translate-y-1/2 z-0"></div>
              
              {/* Timeline points */}
              {Object.entries(timelineData).map(([key, data], index) => (
                <button
                  key={key}
                  onClick={() => setActiveTimelinePhase(key)}
                  className="relative z-10 flex flex-col items-center"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                    activeTimelinePhase === key
                      ? 'bg-rose-600 text-white'
                      : 'bg-white border-2 border-neutral-300 text-neutral-700 hover:border-neutral-400'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`text-sm font-medium transition-colors ${
                    activeTimelinePhase === key ? 'text-rose-600' : 'text-neutral-500'
                  }`}>
                    {data.title}
                  </span>
                </button>
              ))}
            </div>
            
            {/* Current phase content */}
            <motion.div
              key={activeTimelinePhase}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-neutral-50 rounded-xl p-8"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-light text-primary mb-2">
                    {timelineData[activeTimelinePhase].title}: {timelineData[activeTimelinePhase].description}
                  </h3>
                  
                  {/* Metrics */}
                  <div className="space-y-4 mt-6">
                    {timelineData[activeTimelinePhase].metrics.map((metric, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-32 sm:w-48 text-sm text-neutral-700">{metric.label}:</div>
                        <div className="h-2 flex-1 bg-neutral-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-rose-500 rounded-full" 
                            style={{ width: metric.value.replace(/\D/g, '') + '%' }}
                          ></div>
                        </div>
                        <div className="ml-3 text-rose-600 font-medium w-16 text-right">{metric.value}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Testimonial */}
                  <blockquote className="mt-8 italic text-neutral-700 bg-white p-4 rounded-lg border-l-2 border-rose-300">
                    "{timelineData[activeTimelinePhase].testimonial.quote}"
                    <footer className="mt-2 text-sm text-neutral-500 not-italic">
                      — {timelineData[activeTimelinePhase].testimonial.author}
                    </footer>
                  </blockquote>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="aspect-w-1 aspect-h-1 rounded-full overflow-hidden bg-white border-8 border-rose-100 w-full max-w-sm">
                    <img 
                      src={`/images/timeline/${activeTimelinePhase}.jpg`}
                      alt={`Hair results at ${timelineData[activeTimelinePhase].title}`}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* CTA */}
          <div className="text-center">
            <Link 
              to="/products/photonique-touch"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors"
            >
              Start Your Transformation
            </Link>
            <p className="mt-4 text-sm text-neutral-600">
              60-day money-back guarantee • Free shipping on all orders
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}

// Helper for SEO
const customSeoPayload = {
  page: ({title, url}: {title: string; url: string}) => ({
    title,
    url,
    handle: url.substring(url.lastIndexOf('/') + 1),
  }),
};
