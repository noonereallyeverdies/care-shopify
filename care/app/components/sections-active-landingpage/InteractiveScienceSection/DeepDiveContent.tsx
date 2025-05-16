import React from 'react';
import { motion } from 'framer-motion';
import { Battery, Zap, FlaskConical, Brain, CheckCircle, ExternalLink } from 'lucide-react'; // Added FlaskConical, Brain for variety
import { Link } from '@remix-run/react';

interface DeepDiveContentProps {
  isMobile: boolean;
}

const fadeInItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const DetailCard: React.FC<{icon: React.ElementType, title: string, children: React.ReactNode, iconColor?: string}> = 
  ({icon: Icon, title, children, iconColor = '#D1A0A0'}) => (
  <motion.div 
    className="rounded-lg border border-rose-100 bg-white p-4 shadow-soft- subtle-glow-on-hover"
    variants={fadeInItem}
  >
    <h5 className="mb-3 flex items-center text-md font-semibold text-charcoal-primary md:text-lg">
      <Icon size={18} style={{ color: iconColor }} className="mr-2.5 flex-shrink-0" aria-hidden="true" />
      <span>{title}</span>
    </h5>
    <div className="text-xs text-charcoal-secondary md:text-sm leading-relaxed">
      {children}
    </div>
  </motion.div>
);

export const DeepDiveContent: React.FC<DeepDiveContentProps> = ({ isMobile }) => (
  <motion.div 
    className="rounded-xl border border-rose-200/50 bg-cream-light/80 p-6 shadow-soft-lg md:p-8 mt-8 backdrop-blur-sm"
    initial="hidden"
    animate="visible"
    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
  >
    <motion.h4 
      className="mb-6 text-xl font-semibold text-charcoal-primary md:text-2xl text-center md:text-left"
      id="science-details"
      variants={fadeInItem}
    >
      {isMobile ? 'Science Snapshot' : 'Discover the Science Within'}
    </motion.h4>
    
    <div className="space-y-6">
      {isMobile ? (
        <DetailCard icon={CheckCircle} title="Key Findings" iconColor="#E57373"> {/* Softer Rose */}
          <ul className="space-y-2.5">
            {[{
                text: "ATP production boost: <strong class=\"font-medium text-rose-700\">37-54%</strong>",
              }, {
                text: "Hair count increase: <strong class=\"font-medium text-rose-700\">28%</strong> (16 weeks)",
              }, {
                text: "Hair thickness improvement: <strong class=\"font-medium text-rose-700\">32%</strong>",
              },
            ].map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-2 mt-1 text-rose-500 text-xs" aria-hidden="true">✧</span>
                <span dangerouslySetInnerHTML={{ __html: item.text }} />
              </li>
            ))}
          </ul>
        </DetailCard>
      ) : (
        <>
          <DetailCard icon={Battery} title="Cellular Bioenergetics" iconColor="#F48FB1"> {/* Light Pink */}
            <p>Our specific red light spectrum (630-660nm) is precisely calibrated to be absorbed by cytochrome c oxidase within your cells' mitochondria. This absorption supercharges ATP synthesis by <strong className="font-medium text-pink-600">37-54%</strong>, providing the essential energy for revitalized follicle activity and promoting an extended anagen (growth) phase.</p>
          </DetailCard>

          <DetailCard icon={Zap} title="Optimal Scalp Penetration" iconColor="#CE93D8"> {/* Light Purple */}
            <p>Engineered for efficacy, the 630-660nm wavelengths achieve an optimal penetration depth of 3-5mm. This precision targeting ensures the light directly stimulates hair follicle bulbs, where growth originates, without causing stress or damage to surrounding tissues.</p>
          </DetailCard>

          <DetailCard icon={FlaskConical} title="Synergistic Serum Activation" iconColor="#80CBC4"> {/* Tealish Green */}
            <p>The gentle warmth and increased cellular activity from the red light therapy also enhance the scalp's receptivity to our specially formulated care•atin serum. This creates a synergistic effect, allowing key nutrients and growth factors to be absorbed more effectively for maximized results.</p>
          </DetailCard>

          <DetailCard icon={Brain} title="Neuro-Calming Effect" iconColor="#90CAF9"> {/* Soft Blue */}
            <p>Beyond follicle stimulation, the biomimetic massage feature provides a soothing, neuro-calming effect on the scalp. This helps to reduce stress-related inflammation, a known contributor to hair thinning, creating a healthier overall environment for hair growth.</p>
          </DetailCard>
        </>
      )}
    </div>

    {!isMobile && (
       <motion.div className="mt-8 text-center" variants={fadeInItem}>
          <Link 
            to="/pages/science" 
            className="inline-flex items-center rounded-lg bg-rose-500 px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:bg-rose-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 hover:scale-105 active:scale-95"
            prefetch="intent"
          >
            Explore Full Research <ExternalLink size={16} className="ml-2" />
          </Link>
        </motion.div>
    )}
  </motion.div>
); 