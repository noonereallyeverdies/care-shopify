import { motion, MotionValue, Variants } from 'framer-motion';
import React, { RefObject } from 'react';
import type { StepConfig } from '../../sections-active-landingpage/InteractiveScienceSection/ScienceStep';

// Simple CountUp component
const CountUp = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const countUp = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      setCount(Math.floor(percentage * end));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(countUp);
      }
    };

    animationFrame = requestAnimationFrame(countUp);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <>{count}</>;
};

// Placeholder for animation illustration
const HairVisualization = ({ state }: { state: string }) => (
  <div className="relative h-96 bg-gray-100/50 rounded-lg overflow-hidden flex items-center justify-center">
    <div className="text-center">
      <div className="animate-pulse mb-4">
        <svg className="w-24 h-24 text-rose-500/30 mx-auto" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
        </svg>
      </div>
      <p className="text-lg font-medium">Hair Visualization: <span className="text-rose-500">{state}</span></p>
      <p className="text-sm text-gray-500 mt-2 px-8">This is a placeholder for the interactive hair visualization that shows the effects of treatment.</p>
    </div>
  </div>
);

interface InteractiveScienceSectionUIProps {
  targetRef: RefObject<HTMLDivElement>;
  fadeInUp: Variants;
  animationState: string;
  stepOpacities: MotionValue<number>[];
  currentStep: number;
  showDeepDive: boolean;
  toggleDeepDive: () => void;
  STEPS: StepConfig[];
  stats: Array<{
    targetValue: number;
    label: string;
    unit: string;
    note: string;
  }>;
  isMobile: boolean;
  isReducedMotion: boolean;
}

export function InteractiveScienceSectionUI({
  targetRef,
  fadeInUp,
  animationState,
  stepOpacities,
  currentStep,
  showDeepDive,
  toggleDeepDive,
  STEPS,
  stats,
  isMobile,
  isReducedMotion,
}: InteractiveScienceSectionUIProps) {
  return (
    <div ref={targetRef} className="relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Left column - Step indicators & visualization */}
          <div className="relative">
            {/* Steps */}
            <div className="mb-8 relative">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    style={{ opacity: stepOpacities[index] }}
                    className={`mb-6 border-l-4 pl-6 ${
                      currentStep === index
                        ? `border-${step.color}`
                        : 'border-gray-200'
                    } transition-colors duration-300`}
                  >
                    <div className="flex items-center mb-2">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 bg-${step.color}/10 text-${step.color}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-medium">{step.title}</h3>
                    </div>
                    <p className="text-gray-600">
                      {isMobile ? step.mobileText : step.desktopText}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Scientific Fact Callout - Conditionally shown based on step */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r my-6"
              viewport={{ once: true }}
            >
              <h4 className="font-medium text-blue-700 mb-1">Scientific Fact</h4>
              <p className="text-sm text-blue-800">
                {currentStep === 0 && "Red light at 650-670nm wavelengths has been shown to increase ATP production in cells by up to 54%."}
                {currentStep === 1 && "Gentle scalp massage increases blood flow to follicles by 53%, improving oxygen and nutrient delivery."}
                {currentStep === 2 && "Our proprietary oil blend uses microencapsulation to deliver active ingredients 47% more effectively."}
              </p>
            </motion.div>

            {/* Evidence highlights - Conditionally shown based on step */}
            {currentStep === 0 && (
              <motion.div 
                initial="hidden" 
                whileInView="visible" 
                variants={fadeInUp} 
                viewport={{ once: true }}
                className="mt-8"
              >
                <h4 className="font-medium text-lg mb-3">Clinical Evidence</h4>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-medium">2023 Study:</span> 89% of participants showed increased hair density after 16 weeks
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-rose-500 h-2.5 rounded-full" style={{ width: '89%' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right column - Visualization */}
          <div className="flex flex-col">
            <HairVisualization state={animationState} />

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeInUp}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-white border border-gray-100 rounded-lg shadow-sm"
                  custom={index}
                >
                  <div className="text-2xl md:text-3xl font-light text-rose-500">
                    <CountUp end={stat.targetValue} /> 
                    <span>{stat.unit}</span>
                  </div>
                  <div className="text-sm font-medium mt-1">{stat.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.note}</div>
                </motion.div>
              ))}
            </div>

            {/* Deep dive toggle */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={toggleDeepDive}
              className="mt-6 text-sm text-rose-600 hover:text-rose-700 flex items-center justify-center"
            >
              {showDeepDive ? "Hide" : "Show"} Scientific Details
              <svg
                className={`w-4 h-4 ml-1 transition-transform ${
                  showDeepDive ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </motion.button>

            {/* Deep dive content */}
            {showDeepDive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 bg-gray-50 p-4 rounded-lg text-sm"
              >
                <h4 className="font-medium mb-2">The Science Behind care•atin</h4>
                <p className="text-gray-700 mb-3">
                  Our proprietary technology combines red light therapy (630-660nm) 
                  with biomimetic micro-vibrations and a precision delivery system 
                  for nutrient-rich serums.
                </p>
                <p className="text-gray-700">
                  This triple-action approach works synergistically to recharge follicle 
                  cells, increase blood circulation to the scalp, and deliver targeted 
                  nutrients where they're needed most.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
