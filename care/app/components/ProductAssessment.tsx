import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@remix-run/react';

// Stage data with descriptions and images
const hairLossStages = [
  {
    id: 'stage1',
    name: 'Stage 1: Early Signs',
    description: 'Slight thinning, primarily at the hairline or crown. This is the optimal time to begin treatment.',
    signs: ['Increased shedding', 'Slightly wider part', 'Receding hairline beginning'],
    recommendation: 'Prevention & Strengthening',
    image: '/images/assessment/stage1.jpg',
    altText: 'Early stage hair thinning with slight recession at temples'
  },
  {
    id: 'stage2',
    name: 'Stage 2: Moderate Thinning',
    description: 'Noticeable thinning with areas of increased scalp visibility, especially on top.',
    signs: ['Visible scalp through hair', 'Significant recession at temples', 'Crown thinning'],
    recommendation: 'Active Restoration',
    image: '/images/assessment/stage2.jpg',
    altText: 'Moderate hair thinning with visible scalp at crown and temples'
  },
  {
    id: 'stage3',
    name: 'Stage 3: Advanced Loss',
    description: 'Significant thinning with large areas of scalp visibility.',
    signs: ['Substantial hair loss', 'Thin coverage on top', 'Connecting bald areas'],
    recommendation: 'Intensive Treatment',
    image: '/images/assessment/stage3.jpg',
    altText: 'Advanced hair loss with significant balding at crown and frontal regions'
  }
];

export function ProductAssessment() {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);
  
  const handleStageSelect = (stageId: string) => {
    setSelectedStage(stageId);
    // In a real implementation, you might log this selection or use it to customize product recommendations
  };
  
  const getSelectedStage = () => {
    return hairLossStages.find(stage => stage.id === selectedStage);
  };
  
  return (
    <div className="w-full bg-neutral-50 rounded-lg p-5 border border-neutral-100 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium text-neutral-900">What Stage Are You In?</h3>
        <button 
          onClick={() => setShowAssessment(!showAssessment)}
          className="text-sm text-rose-600 hover:text-rose-700"
        >
          {showAssessment ? 'Hide' : 'Take Assessment'}
        </button>
      </div>
      
      <AnimatePresence>
        {showAssessment && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid md:grid-cols-3 gap-4 mb-5">
              {hairLossStages.map((stage) => (
                <div 
                  key={stage.id}
                  className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                    selectedStage === stage.id 
                      ? 'border-rose-500 shadow-md' 
                      : 'border-neutral-200 hover:border-rose-300'
                  }`}
                  onClick={() => handleStageSelect(stage.id)}
                >
                  <div className="aspect-w-16 aspect-h-9 bg-neutral-100">
                    <img 
                      src={stage.image} 
                      alt={stage.altText}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Hair+Stage';
                      }}
                    />
                  </div>
                  <div className="p-3">
                    <h4 className={`text-sm font-medium mb-1 ${
                      selectedStage === stage.id ? 'text-rose-600' : 'text-neutral-800'
                    }`}>
                      {stage.name}
                    </h4>
                    <p className="text-xs text-neutral-600 line-clamp-2">
                      {stage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Selected stage details */}
            {selectedStage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-4 rounded-lg border border-neutral-200 mb-4"
              >
                <h4 className="font-medium text-neutral-900 mb-2">{getSelectedStage()?.name}</h4>
                <p className="text-sm text-neutral-700 mb-3">{getSelectedStage()?.description}</p>
                
                <h5 className="text-sm font-medium text-neutral-800 mb-1">Common signs:</h5>
                <ul className="text-sm text-neutral-600 mb-4 pl-5 list-disc">
                  {getSelectedStage()?.signs.map((sign, index) => (
                    <li key={index}>{sign}</li>
                  ))}
                </ul>
                
                <div className="bg-rose-50 p-3 rounded border border-rose-100">
                  <h5 className="text-sm font-medium text-rose-700 mb-1">Recommended Approach:</h5>
                  <p className="text-sm text-rose-600">{getSelectedStage()?.recommendation}</p>
                  
                  <Link 
                    to={`/pages/hair-quiz`}
                    className="text-xs font-medium text-rose-600 hover:text-rose-700 mt-2 inline-block"
                  >
                    Take our full hair assessment quiz →
                  </Link>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {!showAssessment && (
        <p className="text-sm text-neutral-600">
          Identifying your stage is the first step toward creating an effective treatment plan.
        </p>
      )}
    </div>
  );
} 