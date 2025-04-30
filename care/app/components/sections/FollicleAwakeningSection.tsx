import React, { useRef, useState, useEffect } from 'react';
import { FollicleAwakening } from '../FollicleAwakening';

const FollicleAwakeningSection = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [follicle, setFollicle] = useState(null);
  const [currentStage, setCurrentStage] = useState(0);

  // Stage data
  const stageData = [
    {
      title: 'Step 1: Penetration',
      subtitle: '630-660nm Red Light',
      description: 'The specific red light wavelength penetrates the scalp and reaches the hair follicles'
    },
    {
      title: 'Step 2: Mitochondrial Activation',
      subtitle: 'Cellular Energy Production',
      description: 'Red light activates mitochondria, increasing ATP production and cellular energy'
    },
    {
      title: 'Step 3: Hair Regeneration',
      subtitle: 'Follicle Reactivation',
      description: 'Energized follicles begin the process of producing new, healthy hair growth'
    }
  ];

  useEffect(() => {
    if (canvasRef.current && !follicle) {
      // Initialize the follicle instance with fewer follicles for clarity
      const instance = new FollicleAwakening(canvasRef.current, {
        follicleCount: 5,
        autoScroll: false
      });
      
      setFollicle(instance);
      
      // Add scroll event listener to update animation
      const handleScroll = () => {
        if (!containerRef.current || !instance) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate how far the container is through the viewport
        const distanceFromTop = rect.top;
        const containerHeight = rect.height;
        
        // Calculate progress as the container moves from bottom to top of viewport
        let progress = 0;
        
        if (distanceFromTop <= windowHeight && distanceFromTop >= -containerHeight) {
          // Map the position to a 0-1 range
          progress = 1 - (distanceFromTop + containerHeight) / (windowHeight + containerHeight);
          progress = Math.max(0, Math.min(1, progress));
          
          // Update current stage
          const newStage = Math.min(2, Math.floor(progress * 3));
          if (newStage !== currentStage) {
            setCurrentStage(newStage);
          }
        }
        
        instance.updateProgress(progress);
      };
      
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial position check
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        instance.destroy();
      };
    }
  }, [canvasRef, follicle, currentStage]);

  return (
    <div 
      ref={containerRef}
      className="relative bg-white min-h-screen flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-3xl w-full text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Follicle Reactivation Process
        </h2>
        
        <p className="text-lg text-gray-600 mb-12">
          Our advanced red light therapy technology reactivates dormant follicles
          through a three-step biological process, stimulating natural hair growth.
        </p>
      </div>
      
      {/* Stage information with proper spacing */}
      <div className="w-full max-w-2xl mb-8 relative z-10">
        <div className="text-center mb-2">
          <h3 className="text-2xl font-bold text-gray-900">
            {stageData[currentStage].title}
          </h3>
        </div>
        
        <div className="text-center mb-4">
          <span className="inline-block bg-red-100 text-red-800 rounded-full px-4 py-1 text-sm font-semibold">
            {stageData[currentStage].subtitle}
          </span>
        </div>
        
        <p className="text-center text-gray-700">
          {stageData[currentStage].description}
        </p>
      </div>
      
      {/* Canvas for the follicle animation */}
      <div className="w-full max-w-2xl h-80 relative">
        <canvas 
          ref={canvasRef}
          className="w-full h-full"
        />
        
        {/* Instructional text overlay */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 text-sm text-gray-500 bg-white/80 px-3 py-1 rounded-full">
          Scroll to see the full process
        </div>
      </div>
      
      {/* Additional information */}
      <div className="max-w-2xl w-full mt-16 bg-gray-50 p-6 rounded-xl">
        <h4 className="text-xl font-semibold text-gray-900 mb-4">
          Why Red Light Therapy Works
        </h4>
        
        <p className="text-gray-700 mb-4">
          Red light therapy uses specific wavelengths (630-660nm) that penetrate to the base of hair follicles.
          This stimulates mitochondrial function, increasing ATP production - the energy currency of cells.
        </p>
        
        <p className="text-gray-700 mb-4">
          With increased cellular energy, dormant follicles reactivate and begin producing thicker, 
          healthier hair. Regular treatment leads to progressive improvement in hair density and quality.
        </p>
        
        <h4 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
          Biomimetic Polymer Technology
        </h4>
        
        <p className="text-gray-700 mb-4">
          Our revolutionary comb is crafted from advanced biomimetic polymers that mimic the molecular structure 
          of natural keratin. This innovative material creates a harmonic resonance with hair's natural frequency.
        </p>
        
        <p className="text-gray-700">
          The biomimetic structure offers three key benefits: reduced static electricity that causes frizz and damage, 
          improved distribution of natural scalp oils along hair shafts, and gentle exfoliation of the scalp to 
          remove buildup that can clog follicles. This scientifically-engineered approach enhances the 
          effectiveness of red light therapy by optimizing the scalp environment for healthy hair growth.
        </p>
      </div>
    </div>
  );
};

export default FollicleAwakeningSection; 