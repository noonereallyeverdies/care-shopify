import React, { useRef, useState, useEffect } from 'react';
import { FollicleAwakening } from '../FollicleAwakening';
import { motion } from 'framer-motion';

// Import CSS for consistent styling
import './FollicleAwakeningSection.css';

const FollicleAwakeningSection = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [follicle, setFollicle] = useState(null);
  const [currentStage, setCurrentStage] = useState(0);

  // Simplified stage data - focus on key points only
  const stageData = [
    {
      title: 'Light Penetrates',
      subtitle: 'Red Light Technology',
      description: 'Reaches hair follicles at the cellular level'
    },
    {
      title: 'Cells Energize',
      subtitle: 'ATP Production',
      description: 'Activates mitochondria for cellular energy'
    },
    {
      title: 'Hair Grows',
      subtitle: 'Follicle Reactivation',
      description: 'Dormant follicles begin producing new hair'
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
    <motion.div 
      ref={containerRef}
      className="follicle-awakening-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="section-tag">Cellular Activation</span>
          <h2 className="section-title">
            follicle <span className="text-gradient-tech">reactivation process</span>
          </h2>
          
          <p className="section-subtitle">
            Our photonique touch™ technology reactivates dormant follicles through a three-step biological process, stimulating natural hair growth at the cellular level.
          </p>
        </motion.div>
      
        {/* Stage information with proper spacing */}
        <motion.div 
          className="stage-information"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="stage-content">
            <h3 className="stage-title">
              {stageData[currentStage].title}
            </h3>
          </div>
          
          <div className="stage-subtitle">
            <span className="stage-tag">
              {stageData[currentStage].subtitle}
            </span>
          </div>
          
          <p className="stage-description">
            {stageData[currentStage].description}
          </p>
        </motion.div>
      
        {/* Canvas for the follicle animation */}
        <motion.div 
          className="animation-container"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <canvas 
            ref={canvasRef}
            className="follicle-canvas"
          />
          
          {/* Instructional text overlay */}
          <div className="scroll-instruction">
            Scroll to see the full process
          </div>
        </motion.div>
      
        {/* Additional information */}
        <motion.div 
          className="scientific-explanation"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="explanation-section">
            <h4 className="explanation-title">
              Why Photonique Touch™ Works
            </h4>
            
            <p className="explanation-text">
              Photonique touch™ uses specific wavelengths (630-660nm) that penetrate to the base of hair follicles.
              This stimulates mitochondrial function, increasing ATP production - the energy currency of cells.
            </p>
            
            <p className="explanation-text">
              With increased cellular energy, dormant follicles reactivate and begin producing thicker, 
              healthier hair. Regular treatment leads to progressive improvement in hair density and quality.
            </p>
          </div>
          
          <div className="explanation-section">
            <h4 className="explanation-title">
              Biomimetic Technology
            </h4>
            
            <p className="explanation-text">
              Our revolutionary device features advanced biomimetic technology that mimics the molecular structure 
              of natural keratin. This innovative approach creates harmonic resonance with hair's natural frequency.
            </p>
            
            <p className="explanation-text">
              The biomimetic structure offers three key benefits: reduced static electricity that causes frizz and damage, 
              improved distribution of natural scalp oils along hair shafts, and gentle exfoliation of the scalp to 
              remove buildup that can clog follicles. This scientifically-engineered approach enhances the 
              effectiveness of photonique touch™ therapy by optimizing the scalp environment for healthy hair growth.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FollicleAwakeningSection; 