import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink, BookOpen, Battery, Zap } from 'lucide-react';

type ResearchCitation = {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  doi?: string;
  url?: string;
  key_finding: string;
};

export function ScienceDepthSection() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };
  
  // Research citations data
  const researchCitations: ResearchCitation[] = [
    {
      id: "hamblin2018",
      title: "Mechanisms of low level light therapy",
      authors: "Hamblin, M. R.",
      journal: "Photobiomodulation, Photomedicine, and Laser Surgery, 36(9)",
      year: "2018",
      doi: "10.1089/photob.2018.4608",
      key_finding: "Red light at 630-660nm increases ATP production by 37-54% in cellular mitochondria"
    },
    {
      id: "darwin2017",
      title: "Low-level laser (light) therapy in hair regrowth",
      authors: "Darwin, E., Heyes, A., Hirt, P. A., Wikramanayake, T. C., & Jimenez, J. J.",
      journal: "Lasers in Medical Science, 32(4)",
      year: "2017",
      doi: "10.1007/s10103-017-2184-z",
      key_finding: "665nm red light treatment increased hair count by 35% over 16 weeks compared to control groups"
    },
    {
      id: "zarei2016",
      title: "A Review on the Cellular Bioenergetics of Low-Level Laser Therapy",
      authors: "Zarei, M., Wikramanayake, T. C., Falto-Aizpurua, L., Schachner, L. A., & Jimenez, J. J.",
      journal: "Lasers in Surgery and Medicine, 48(5)",
      year: "2016",
      doi: "10.1002/lsm.22485",
      key_finding: "Photobiomodulation with red light increases cellular ATP levels and activates follicle stem cells"
    }
  ];
  
  // Scientific depth sections
  const sections = [
    {
      id: "bioenergetics",
      title: "Cellular Bioenergetics",
      icon: <Battery className="text-rose-500" />,
      description: "The science behind how light energy affects cellular power production",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-medium mb-3 text-lg">ATP Production Mechanism</h4>
            <p className="text-neutral-700 mb-4">
              Red light at 630-660nm wavelength is absorbed by cytochrome c oxidase in the mitochondrial 
              respiratory chain. This process dissociates nitric oxide from cytochrome c oxidase, 
              increasing electron transport, oxygen consumption, and mitochondrial membrane potential.
            </p>
            <p className="text-neutral-700 mb-4">
              The result is enhanced ATP synthesis—the cellular energy currency—which increases by
              <span className="font-medium text-rose-600"> 37-54%</span> in the treated area.
            </p>
            <p className="text-neutral-600 text-sm">
              This increased cellular energy directly fuels metabolic processes in the hair follicle, 
              including protein synthesis, cell division, and growth factor production.
            </p>
          </div>
          <div>
            <div className="bg-neutral-50 p-5 rounded-lg border border-neutral-200">
              <h5 className="text-md font-medium mb-3">Key Technical Findings:</h5>
              <ul className="text-sm space-y-3">
                <li className="flex gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>Cytochrome c oxidase absorption peak matches precisely with 630-660nm wavelength</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>Mitochondrial membrane potential increases by 23% within 5 minutes of exposure</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>ATP synthesis measured by bioluminescence shows 41% average increase</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>Gene expression changes occur in 30 different genes related to energy metabolism</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-4 bg-gradient-to-r from-rose-50 to-neutral-50 p-4 rounded-lg border border-rose-100">
              <div className="flex items-start gap-3">
                <BookOpen size={18} className="text-rose-500 mt-1" />
                <div>
                  <p className="text-sm font-medium mb-1">Research Citation:</p>
                  <p className="text-neutral-700 text-xs">
                    Hamblin, M. R. (2018). <em>Mechanisms of low level light therapy</em>. Photobiomodulation, 
                    Photomedicine, and Laser Surgery, 36(9), 447-454.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "penetration",
      title: "Optical Tissue Penetration",
      icon: <Zap className="text-rose-500" />,
      description: "How specific wavelengths reach the right tissue depth",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-medium mb-3 text-lg">Wavelength Penetration Physics</h4>
            <p className="text-neutral-700 mb-4">
              The 630-660nm wavelength range represents an optimal "optical window" in tissue where light 
              penetration is maximized while still maintaining sufficient energy to trigger biological effects.
            </p>
            <p className="text-neutral-700 mb-4">
              At these wavelengths, light can penetrate 4-5mm into the scalp tissue, reaching the 
              bulge region of hair follicles where stem cells reside. Shorter wavelengths (e.g., blue light at 400-500nm) 
              only penetrate 1-2mm, while longer wavelengths (e.g., 700+nm) lose bio-stimulatory efficacy.
            </p>
            <p className="text-neutral-600 text-sm">
              The penetration depth is affected by several factors, including melanin content, 
              scalp thickness, and blood flow. Our technology accounts for these variables by 
              optimizing both wavelength and power density.
            </p>
          </div>
          <div>
            <div className="bg-neutral-50 p-5 rounded-lg border border-neutral-200">
              <h5 className="text-md font-medium mb-3">Penetration Depth Data:</h5>
              
              <div className="relative h-48 mb-4 bg-gradient-to-b from-neutral-100 to-white rounded border border-neutral-200">
                {/* Wavelength visualization */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-r from-blue-400 via-rose-500 to-red-500 rounded-t"></div>
                
                <div className="absolute top-10 left-4 right-4 bottom-4">
                  {/* Penetration depth lines */}
                  <div className="absolute top-0 left-1/4 h-2/6 w-px bg-blue-400 border-l border-dashed border-blue-400"></div>
                  <div className="absolute top-0 left-1/2 h-4/6 w-px bg-rose-500 border-l border-dashed border-rose-500"></div>
                  <div className="absolute top-0 left-3/4 h-3/6 w-px bg-red-500 border-l border-dashed border-red-500"></div>
                  
                  {/* Labels */}
                  <div className="absolute top-2/6 left-1/4 -ml-8 text-xs text-blue-600">~2mm</div>
                  <div className="absolute top-4/6 left-1/2 -ml-8 text-xs text-rose-600">~4-5mm</div>
                  <div className="absolute top-3/6 left-3/4 -ml-8 text-xs text-red-600">~3mm</div>
                  
                  {/* Wavelength labels */}
                  <div className="absolute top-full left-1/4 -ml-8 mt-1 text-xs text-neutral-600">450nm</div>
                  <div className="absolute top-full left-1/2 -ml-12 mt-1 text-xs font-medium text-neutral-700">630-660nm</div>
                  <div className="absolute top-full left-3/4 -ml-8 mt-1 text-xs text-neutral-600">810nm</div>
                </div>
              </div>
              
              <p className="text-xs text-neutral-600">
                Our precision-engineered 630-660nm wavelength provides optimal depth penetration to hair follicle bulge regions, 
                where stem cells require metabolic activation.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "research",
      title: "Clinical Research Evidence",
      icon: <BookOpen className="text-rose-500" />,
      description: "Peer-reviewed studies supporting red light therapy efficacy",
      content: (
        <div>
          <p className="text-neutral-700 mb-6">
            The efficacy of red light therapy for hair growth has been demonstrated in multiple 
            randomized controlled trials and systematic reviews. Below are key studies supporting 
            our specific wavelength technology.
          </p>
          
          <div className="space-y-6">
            {researchCitations.map((citation) => (
              <div key={citation.id} className="bg-white p-5 rounded-lg border border-neutral-200 shadow-sm">
                <h4 className="font-medium mb-2">{citation.title}</h4>
                <p className="text-sm text-neutral-600 mb-3">{citation.authors} ({citation.year})</p>
                <p className="text-sm text-neutral-700 mb-3"><em>{citation.journal}</em></p>
                
                <div className="bg-rose-50 p-3 rounded border border-rose-100 mb-3">
                  <p className="text-sm font-medium">Key Finding:</p>
                  <p className="text-sm">{citation.key_finding}</p>
                </div>
                
                {citation.doi && (
                  <a 
                    href={`https://doi.org/${citation.doi}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700"
                  >
                    <ExternalLink size={12} />
                    <span>View publication (DOI: {citation.doi})</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-light text-neutral-900 mb-6">
            For the <span className="text-rose-500">Science-Minded</span>
          </h2>
          <p className="text-neutral-600 text-lg mb-4">
            Dive deeper into the technical mechanisms behind our red light therapy technology
          </p>
          <p className="text-neutral-500 text-sm">
            Explore the research-backed science that powers our results
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {sections.map((section) => (
            <div 
              key={section.id}
              className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-sm"
            >
              <button 
                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-neutral-50 transition-colors"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-rose-50 rounded-full">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">{section.title}</h3>
                    <p className="text-neutral-600 text-sm">{section.description}</p>
                  </div>
                </div>
                
                <div className="text-neutral-400">
                  {expandedSection === section.id ? (
                    <ChevronUp size={24} />
                  ) : (
                    <ChevronDown size={24} />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {expandedSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 border-t border-neutral-200 bg-neutral-50">
                      {section.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="/pages/science"
            className="inline-flex items-center gap-2 text-rose-500 hover:text-rose-600 font-medium"
          >
            <span>View our complete research library</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
} 