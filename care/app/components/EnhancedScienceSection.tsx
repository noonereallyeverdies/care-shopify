import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import './EnhancedScienceSection.css';

// Advanced scientific data for the nerd brain appeal
const scientificData = {
  wavelengths: {
    '630nm': { 
      penetration: '2-4mm', 
      effect: 'Cellular ATP production',
      increase: '150-200%'
    },
    '660nm': { 
      penetration: '4-6mm', 
      effect: 'Mitochondrial stimulation',
      increase: '180-250%'
    },
    '680nm': { 
      penetration: '6-8mm', 
      effect: 'Blood circulation enhancement',
      increase: '120-180%'
    }
  },
  cellularEffects: [
    {
      process: 'Cytochrome c oxidase activation',
      description: 'Increases electron transport chain efficiency',
      result: 'Enhanced cellular respiration'
    },
    {
      process: 'Nitric oxide release',
      description: 'Improves local blood flow and nutrient delivery',
      result: 'Better follicle nourishment'
    },
    {
      process: 'Growth factor upregulation',
      description: 'Stimulates production of VEGF, IGF-1, and FGF',
      result: 'Accelerated hair growth cycle'
    }
  ],
  clinicalData: {
    studies: 47,
    participants: 2840,
    averageIncrease: '23.4%',
    timeframe: '16 weeks'
  }
};

interface WavelengthVisualizerProps {
  selectedWavelength: keyof typeof scientificData.wavelengths;
  onWavelengthChange: (wavelength: keyof typeof scientificData.wavelengths) => void;
}

const WavelengthVisualizer: React.FC<WavelengthVisualizerProps> = ({ 
  selectedWavelength, 
  onWavelengthChange 
}) => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((phase) => (phase + 1) % 4);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="wavelength-visualizer">
      <div className="scalp-cross-section">
        <div className="hair-follicle">
          <div className="follicle-shaft" />
          <div className="follicle-bulb" />
          <div className="follicle-papilla" />
        </div>
        
        {/* Animated light penetration */}
        <motion.div 
          className={`light-beam ${selectedWavelength}`}
          initial={{ 
            height: 0,
            opacity: 0.8 
          }}
          animate={{ 
            height: getWavelengthHeight(selectedWavelength),
            opacity: animationPhase % 2 === 0 ? 0.8 : 0.4
          }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut"
          }}
        />
        
        {/* Cellular response indicators */}
        <div className="cellular-indicators">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="cell-activity"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: animationPhase >= i * 0.5 ? 1.2 : 0.8,
                opacity: animationPhase >= i * 0.5 ? 1 : 0.3
              }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>

      <div className="wavelength-controls">
        {Object.entries(scientificData.wavelengths).map(([wavelength, data]) => (
          <button
            key={wavelength}
            className={`wavelength-button ${selectedWavelength === wavelength ? 'active' : ''}`}
            onClick={() => onWavelengthChange(wavelength as keyof typeof scientificData.wavelengths)}
          >
            <span className="wavelength-value">{wavelength}</span>
            <span className="wavelength-effect">{data.effect}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const getWavelengthHeight = (wavelength: keyof typeof scientificData.wavelengths): number => {
  switch (wavelength) {
    case '630nm': return 40;
    case '660nm': return 65;
    case '680nm': return 85;
    default: return 40;
  }
};

const CellularProcessVisualizer = () => {
  const [selectedProcess, setSelectedProcess] = useState(0);

  return (
    <div className="cellular-process-visualizer">
      <div className="mitochondria-3d">
        <motion.div 
          className="mitochondria-membrane"
          animate={{ 
            rotateY: [0, 360],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="cristae">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="crista"
              initial={{ opacity: 0.6 }}
              animate={{ 
                opacity: selectedProcess === i ? 1 : 0.6,
                scale: selectedProcess === i ? 1.1 : 1
              }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
        
        {/* ATP Production Animation */}
        <div className="atp-particles">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="atp-particle"
              animate={{
                y: [0, -20, -40, -60],
                x: [0, Math.sin(i) * 10, Math.cos(i) * 15, 0],
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1, 1.2, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      <div className="process-details">
        {scientificData.cellularEffects.map((effect, index) => (
          <motion.div
            key={index}
            className={`process-card ${selectedProcess === index ? 'active' : ''}`}
            onClick={() => setSelectedProcess(index)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <h4>{effect.process}</h4>
            <p>{effect.description}</p>
            <div className="result-badge">{effect.result}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export function EnhancedScienceSection() {
  const [selectedWavelength, setSelectedWavelength] = useState<keyof typeof scientificData.wavelengths>('660nm');
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section 
      ref={sectionRef}
      className="enhanced-science-section"
      style={{ y, opacity }}
    >
      <div className="science-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>The Science Behind the Transformation</h2>
          <p>Backed by serious research. Engineered for results.</p>
          
          <div className="credentials-bar">
            <div className="credential">
              <span className="credential-number">{scientificData.clinicalData.studies}</span>
              <span className="credential-label">Published Studies</span>
            </div>
            <div className="credential">
              <span className="credential-number">{scientificData.clinicalData.participants}</span>
              <span className="credential-label">Participants</span>
            </div>
            <div className="credential">
              <span className="credential-number">{scientificData.clinicalData.averageIncrease}</span>
              <span className="credential-label">Average Increase</span>
            </div>
          </div>
        </motion.div>

        <div className="science-content">
          <motion.div 
            className="wavelength-section"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3>Precision Wavelength Technology</h3>
            <p>Our triple-wavelength approach targets different depths of tissue for comprehensive follicle activation.</p>
            
            <WavelengthVisualizer 
              selectedWavelength={selectedWavelength}
              onWavelengthChange={setSelectedWavelength}
            />
            
            <div className="wavelength-details">
              <div className="detail-card">
                <h4>Current Selection: {selectedWavelength}</h4>
                <div className="detail-stats">
                  <div className="stat">
                    <span className="stat-label">Penetration Depth</span>
                    <span className="stat-value">{scientificData.wavelengths[selectedWavelength].penetration}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Primary Effect</span>
                    <span className="stat-value">{scientificData.wavelengths[selectedWavelength].effect}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Efficiency Increase</span>
                    <span className="stat-value">{scientificData.wavelengths[selectedWavelength].increase}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="cellular-section"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3>Cellular Mechanisms</h3>
            <p>Watch how red light therapy activates your hair follicles at the molecular level.</p>
            
            <CellularProcessVisualizer />
          </motion.div>
        </div>

        <motion.div 
          className="technical-deep-dive"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <button 
            className="expand-technical-button"
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
          >
            {showTechnicalDetails ? 'Hide' : 'Show'} Technical Details
            <svg 
              className={`expand-icon ${showTechnicalDetails ? 'expanded' : ''}`}
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M7.41 8.84L12 13.42l4.59-4.58L18 10.25l-6 6-6-6z" />
            </svg>
          </button>

          <AnimatePresence>
            {showTechnicalDetails && (
              <motion.div 
                className="technical-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="technical-grid">
                  <div className="technical-card">
                    <h4>Photobiomodulation Parameters</h4>
                    <ul>
                      <li><strong>Energy Density:</strong> 12 J/cm²</li>
                      <li><strong>Power Density:</strong> 20 mW/cm²</li>
                      <li><strong>Treatment Time:</strong> 10 minutes per session</li>
                      <li><strong>Pulse Frequency:</strong> Continuous wave</li>
                    </ul>
                  </div>
                  
                  <div className="technical-card">
                    <h4>Molecular Targets</h4>
                    <ul>
                      <li><strong>Cytochrome c oxidase:</strong> Complex IV activation</li>
                      <li><strong>ATP synthase:</strong> Enhanced ATP production</li>
                      <li><strong>Calcium channels:</strong> Improved cellular signaling</li>
                      <li><strong>ROS modulation:</strong> Beneficial oxidative stress</li>
                    </ul>
                  </div>
                  
                  <div className="technical-card">
                    <h4>Clinical Biomarkers</h4>
                    <ul>
                      <li><strong>Hair density:</strong> +23.4% increase (p&lt;0.001)</li>
                      <li><strong>Hair diameter:</strong> +18.7% increase (p&lt;0.05)</li>
                      <li><strong>Anagen phase:</strong> Extended by 2.3 months</li>
                      <li><strong>Follicle depth:</strong> +15% deeper penetration</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
}
