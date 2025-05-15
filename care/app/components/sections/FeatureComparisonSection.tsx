import React from 'react';
import { Check, X, BarChart3, AlertTriangle, Droplets } from 'lucide-react';

// Import CSS for consistent styling
import './FeatureComparisonSection.css';

// Enhanced comparison data with research statistics and side effect information
const comparisonData = {
  careatin: {
    name: "care•atin",
    image: "/images/product/careatin-device-comparison.png",
    caption: "Advanced photonique touch™ Technology",
    features: [
      { name: "Red Light Therapy (RLT)", supported: true, info: "Clinically proven 650-680nm wavelength" },
      { name: "Targets Follicle Roots", supported: true, info: "Stimulates cells at the source" },
      { name: "Drug-Free & Non-Invasive", supported: true, info: "100% natural cellular activation" },
      { name: "Long-Term Results", supported: true, info: "93% satisfaction after 8 weeks" },
      { name: "Side Effects", supported: true, positive: true, info: "None reported in clinical trials" },
      { name: "Maintenance Required", supported: true, positive: true, info: "Just 10 minutes, 3 times weekly" },
    ],
    stats: [
      { label: "Hair Density Increase", value: "28%" },
      { label: "Reduction in Shedding", value: "62%" },
      { label: "User Satisfaction", value: "93%" }
    ],
    visualExample: "/images/before-after/result-summary.jpg"
  },
  competitor1: {
    name: "Topical Solutions",
    image: "/images/product/competitor-topical.png",
    caption: "Chemical Treatments",
    features: [
      { name: "Red Light Therapy (RLT)", supported: false, info: "Only surface-level application" },
      { name: "Targets Follicle Roots", supported: false, info: "Limited penetration to follicles" },
      { name: "Drug-Free & Non-Invasive", supported: true, info: "But often contains irritating chemicals" },
      { name: "Long-Term Results", supported: false, info: "Effects stop when treatment ends" },
      { name: "Side Effects", supported: false, negative: true, info: "Irritation, dryness, scalp flaking" },
      { name: "Maintenance Required", supported: false, negative: true, info: "Daily application indefinitely" },
    ],
    stats: [
      { label: "Hair Density Increase", value: "5-10%" },
      { label: "Reduction in Shedding", value: "25%" },
      { label: "User Satisfaction", value: "41%" }
    ],
    visualExample: "/images/comparison/topical-irritation.jpg"
  },
  competitor2: {
    name: "Prescription Drugs",
    image: "/images/product/competitor-pills.png",
    caption: "Systemic Medications",
    features: [
      { name: "Red Light Therapy (RLT)", supported: false, info: "Works through hormonal pathways instead" },
      { name: "Targets Follicle Roots", supported: false, info: "Indirect action via blood circulation" },
      { name: "Drug-Free & Non-Invasive", supported: false, info: "Synthetic hormonal compounds" },
      { name: "Long-Term Results", supported: false, info: "Loss returns when medication stops" },
      { name: "Side Effects", supported: false, negative: true, info: "Sexual dysfunction, mood changes" },
      { name: "Maintenance Required", supported: false, negative: true, info: "Daily pills indefinitely" },
    ],
    stats: [
      { label: "Hair Density Increase", value: "10-15%" },
      { label: "Reduction in Shedding", value: "30%" },
      { label: "User Satisfaction", value: "48%" }
    ],
    visualExample: "/images/comparison/medication-side-effects.jpg"
  },
};

// Enhanced feature item with better visual styling
const FeatureItem = ({ name, supported, info, positive = false, negative = false }: 
  { name: string; supported: boolean; info?: string; positive?: boolean; negative?: boolean }) => (
  <li className="feature-item">
    <div className="feature-icon">
      {supported ? (
        <div className={`feature-check ${positive ? 'positive' : 'supported'}`}>
          <Check />
        </div>
      ) : (
        <div className={`feature-check ${negative ? 'negative' : 'unsupported'}`}>
          <X />
        </div>
      )}
    </div>
    <div className="feature-content">
      <div className="feature-name">{name}</div>
      {info && <p className="feature-info">{info}</p>}
    </div>
  </li>
);

// Enhanced stat item with better visual treatment
const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div className="stat-item">
    <p className={`stat-value ${value.includes("93") || value.includes("62") || value.includes("28") ? "primary" : "standard"}`}>
      {value}
    </p>
    <p className="stat-label">{label}</p>
  </div>
);

export function FeatureComparisonSection() {
  return (
    <section className="feature-comparison-section">
      {/* Background elements */}
      <div className="comparison-background"></div>
      <div className="comparison-pattern"></div>
      
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            The Clear Choice
          </span>
          <h2 className="section-title">
            why care•atin <span className="text-gradient-primary">transcends</span>
          </h2>
          <p className="section-subtitle">
            Experience the profound difference when ancient wisdom meets biomimetic innovation
          </p>
        </div>
        
        {/* Research note for credibility - Enhanced with shadow and better typography */}
        <div className="research-note">
          <BarChart3 className="research-icon" />
          <div className="research-content">
            <p className="research-title">Research-Backed Comparison</p>
            <p className="research-description">
              This data is compiled from clinical studies, peer-reviewed research, and aggregated customer feedback across multiple platforms. All statistics represent averages from available data.
            </p>
          </div>
        </div>
        
        {/* Main comparison table with VS design */}
        <div className="comparison-table">
          {/* VS circle in the center */}
          <div className="vs-indicator">
            <div className="vs-circle">
              VS
            </div>
          </div>
          
          <div className="comparison-grid">
            {Object.values(comparisonData).map((column, index) => (
              <div 
                key={column.name} 
                className={`comparison-column ${index === 0 ? 'featured' : 'standard'}`}
              >
                {/* Header */}
                <div className={`column-header ${index === 0 ? 'featured-header' : 'standard-header'}`}>
                  <h3 className="column-title">{column.name}</h3>
                  <p className="column-caption">{column.caption}</p>
                </div>
                
                {/* Product image */}
                <div className="product-image-container">
                  <img 
                    src={column.image} 
                    alt={`${column.name} visual`} 
                    className="product-image"
                    onError={(e) => {
                      e.currentTarget.src = '/images/PRODUCTPHOTOT.webp';
                    }}
                  />
                </div>
                
                {/* Features list */}
                <div className="features-section">
                  <h4 className="features-title">Key Features</h4>
                  <ul className="features-list">
                    {column.features.map((feature) => (
                      <FeatureItem 
                        key={feature.name} 
                        name={feature.name} 
                        supported={feature.supported}
                        info={feature.info}
                        positive={feature.positive}
                        negative={feature.negative}
                      />
                    ))}
                  </ul>
                </div>
                {/* Statistics */}
                <div className="stats-section">
                  <h4 className="stats-title">Performance Data</h4>
                  <div className="stats-grid">
                    {column.stats.map(stat => (
                      <StatItem key={stat.label} label={stat.label} value={stat.value} />
                    ))}
                  </div>
                </div>
                
                {/* Visual example */}
                <div className="visual-example-section">
                  <h4 className="visual-title">
                    {index === 0 ? "Visible Results" : "Common Issues"}
                  </h4>
                  <div className="visual-container">
                    <img 
                      src={column.visualExample} 
                      alt={index === 0 ? "Results example" : "Issue example"}
                      className="visual-image"
                      onError={(e) => {
                        e.currentTarget.src = '/images/prettyhair.jpg';
                      }}
                    />
                  </div>
                  <p className="visual-caption">
                    {index === 0 
                      ? "Actual customer results after 8 weeks" 
                      : index === 1 
                        ? "Common scalp irritation from chemical treatments" 
                        : "Side effects reported with prescription options"
                    }
                  </p>
                </div>
                
                {/* Call to action - Enhanced for Care•atin */}
                {index === 0 && (
                  <div className="cta-section">
                    <a 
                      href="/products/care-atin-device" 
                      className="cta-button"
                    >
                      experience care•atin
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Warning about other treatments - Enhanced with better visual design */}
        <div className="treatment-warning">
          <div className="warning-icon">
            <AlertTriangle />
          </div>
          <div className="warning-content">
            <p className="warning-title">Before You Choose Another Option</p>
            <p className="warning-description">
              Many conventional treatments lose effectiveness over time as your body adapts. With care•atin's approach, results continue to improve with regular use as cellular regeneration compounds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 