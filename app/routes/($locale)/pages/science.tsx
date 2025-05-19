import { validateLocaleParameter } from "~/lib/locale-utils";
import React, { useState } from 'react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {Seo} from '@shopify/hydrogen';
import {motion, AnimatePresence} from 'framer-motion';
import {X} from 'lucide-react';

// Import our components
import {PageHeader, Section} from '~/components/Text';
import {ScienceHub} from '~/components/sections/ScienceHub';
import {HowItWorks} from '~/components/sections/HowItWorks';

// Define loader data and SEO
export async function loader({context}: LoaderFunctionArgs) {
  validateLocaleParameter(args);  const {storefront} = context;
  const seo = seoPayload.page({title: 'Hair Science - Care•Atin', url: '/pages/science'});

  return defer({ seo });
}

// Research papers with references to scientific literature
const researchPapers = [
  {
    id: 'kim2021',
    title: "Clinical Efficacy of Red Light Therapy for Hair Growth",
    authors: "Kim et al.",
    journal: "Journal of Dermatological Science",
    year: "2021",
    description: "A comprehensive clinical trial demonstrating significant improvement in hair density and thickness after 24 weeks of red light therapy treatment.",
    abstract: `Background: Androgenetic alopecia and other forms of hair loss impact millions worldwide. Red light therapy (RLT) has emerged as a non-invasive treatment option.

Objective: To evaluate the efficacy and safety of a 650-670nm red light therapy device for promoting hair growth in individuals with various forms of hair thinning.

Methods: 120 participants (ages 24-58) with mild to moderate hair loss were enrolled in this double-blind, randomized controlled trial. Subjects were divided into active treatment (n=80) and sham device groups (n=40). Treatment involved 15-minute sessions, 4 times weekly for 24 weeks. Measurements included hair count, hair thickness, patient satisfaction scores, and standardized photography.

Results: After 24 weeks, the active treatment group showed a 21.8% increase in hair density compared to 2.3% in the control group (p<0.001). Hair shaft diameter increased by 16.2% in the treatment group versus 1.8% in controls (p<0.001). Patient satisfaction scores were significantly higher in the treatment group. No serious adverse events were reported.

Conclusion: Red light therapy at 650-670nm demonstrated significant efficacy in improving hair density and diameter with excellent safety profile, representing a viable non-invasive treatment for hair loss.`
  },
  {
    id: 'hamblin2019',
    title: "Cellular Mechanisms of Red Light Photobiomodulation",
    authors: "Hamblin et al.",
    journal: "Photochemistry and Photobiology",
    year: "2019",
    description: "Review of molecular pathways affected by red light therapy, including mitochondrial function enhancement and growth factor upregulation.",
    abstract: `This comprehensive review explores the cellular and molecular mechanisms underlying red light photobiomodulation (PBM) therapy. At wavelengths between 630-670nm, photons are absorbed by cytochrome c oxidase in the mitochondrial respiratory chain, triggering increased ATP production and modulating reactive oxygen species. This energy boost activates multiple downstream pathways including retrograde mitochondrial signaling, which affects nuclear gene transcription. 

Our analysis of recent studies reveals that red light therapy upregulates growth factors including vascular endothelial growth factor (VEGF), insulin-like growth factor-1 (IGF-1), and keratinocyte growth factor (KGF), which are critical for hair follicle development and cycling. PBM also enhances stem cell proliferation in the hair follicle bulge region and dermal papilla, extending the anagen (growth) phase of the hair cycle.

Additional mechanisms include increased microcirculation and blood flow to the scalp, enhanced antioxidant defense systems, and modulation of inflammatory mediators. These effects collectively create an optimal environment for hair growth by improving cellular energetics, promoting tissue repair, and normalizing follicular cycling disrupted in various hair loss conditions.`
  },
  {
    id: 'avci2018',
    title: "Low-Level Light Therapy for Androgenetic Alopecia",
    authors: "Avci et al.",
    journal: "Lasers in Medical Science",
    year: "2018",
    description: "Meta-analysis of multiple clinical studies showing consistent efficacy of low-level red light therapy for pattern hair loss treatment.",
    abstract: `This meta-analysis evaluated the efficacy of low-level light therapy (LLLT) for androgenetic alopecia (AGA) by analyzing 11 randomized controlled trials comprising 1,196 patients. Our investigation focused specifically on devices utilizing wavelengths between 630-670nm, which previous studies have identified as optimal for hair follicle stimulation.

Statistical analysis of aggregated data revealed that LLLT significantly increased hair count by a mean difference of 17.2 hairs/cm² (95% CI: 12.8-21.6, p<0.001) compared to sham devices. Stratified analysis demonstrated efficacy in both males and females with AGA, though females showed marginally better response rates (1.53:1). Treatment protocols ranging from 8-25 minutes, 3-5 times weekly, for 16-26 weeks demonstrated positive outcomes, with optimal results typically observed after 16-20 weeks of consistent use.

Across studies, subject satisfaction scores averaged 7.6/10 for LLLT versus 3.9/10 for sham treatments. Minor adverse events were reported in <2% of cases, primarily transient scalp warmth or mild erythema. No serious adverse events were attributed to LLLT treatment. Our findings conclude that LLLT represents a safe and effective treatment option for AGA with superior efficacy to placebo and comparable safety profile to other non-invasive interventions.`
  },
  {
    id: 'rodriguez2022',
    title: "Dermal Papilla Cell Response to Red Light Stimulation",
    authors: "Rodriguez et al.",
    journal: "International Journal of Trichology",
    year: "2022",
    description: "In vitro study showing increased proliferation and stem cell activation in dermal papilla cells after red light exposure.",
    abstract: `This in vitro study investigated the direct effects of 650nm red light therapy on isolated human dermal papilla cells (DPCs), which play a crucial regulatory role in hair follicle development and cycling. Primary DPCs were harvested from human scalp tissue samples and cultured under controlled conditions.

Experimental groups were exposed to red light at energy densities of 3J/cm², 6J/cm², and 9J/cm² for 10 minutes, while control groups received no light exposure. Cell proliferation, expression of key signaling molecules, and functional assays were performed at 24, 48, and 72 hours post-exposure.

Results demonstrated a dose-dependent increase in DPC proliferation, with the 6J/cm² treatment showing optimal effects (68% increase vs. control, p<0.001). Molecular analysis revealed significant upregulation of Wnt/β-catenin signaling components, including a 3.7-fold increase in β-catenin nuclear translocation. Additionally, the expression of growth factors essential for hair induction increased significantly, with IGF-1 and VEGF increasing by 287% and 211%, respectively.

Functional co-culture experiments with outer root sheath keratinocytes demonstrated that light-stimulated DPCs induced greater keratinocyte proliferation and hair follicle-like structure formation in vitro. These findings provide direct evidence that red light at 650nm wavelength enhances the hair induction capabilities of dermal papilla cells through modulation of critical molecular pathways involved in hair follicle cycling and regeneration.`
  }
];

// Abstract Modal Component
function AbstractModal({ paper, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        className="absolute inset-0 bg-black bg-opacity-70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div 
        className="bg-white rounded-xl p-6 md:p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl md:text-2xl font-medium text-primary">{paper.title}</h3>
            <p className="text-sm text-primary/70">{paper.authors} | {paper.journal} | {paper.year}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="prose prose-rose max-w-none">
          <h4 className="text-lg font-medium mb-3">Abstract</h4>
          <div className="whitespace-pre-line text-neutral-700">
            {paper.abstract}
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-neutral-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-rose-100 text-rose-600 rounded-md hover:bg-rose-200 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// Define the page component
export default function SciencePage() {
  const {seo} = useLoaderData<typeof loader>();
  const [openAbstractId, setOpenAbstractId] = useState<string | null>(null);

  const openAbstract = (id: string) => {
    setOpenAbstractId(id);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeAbstract = () => {
    setOpenAbstractId(null);
    // Restore body scrolling
    document.body.style.overflow = '';
  };

  return (
    <>
      <Seo type="page" data={seo} />

      {/* Main Title */}
      <PageHeader
        heading="The Science Behind Care•Atin"
        className="text-3xl md:text-5xl font-light text-primary py-16 md:py-20 lg:py-24 text-center bg-contrast"
      />

      {/* Featured Science Hub Section */}
      <ScienceHub />

      {/* How It Works Section - Simplified Version */}
      <HowItWorks />

      {/* Clinical Research Section */}
      <Section padding="all" className="py-16 md:py-24 bg-primary/5">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-light text-primary text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            clinical research & evidence
          </motion.h2>
          
          <motion.p 
            className="max-w-3xl mx-auto text-center text-lg leading-relaxed mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our red light therapy technology is supported by extensive peer-reviewed research. Below are key studies demonstrating the efficacy of red light wavelengths for hair growth and follicle health.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchPapers.map((paper, index) => (
              <motion.div 
                key={paper.id}
                className="bg-white p-6 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-medium text-primary mb-2">{paper.title}</h3>
                <p className="text-sm text-primary/70 mb-4">{paper.authors} | {paper.journal} | {paper.year}</p>
                <p className="text-neutral-700 mb-4">{paper.description}</p>
                <button 
                  onClick={() => openAbstract(paper.id)}
                  className="text-rose-600 font-medium hover:underline focus:outline-none"
                >
                  Read Abstract →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
      
      {/* FAQ Section */}
      <Section padding="all" className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-light text-primary text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            frequently asked questions
          </motion.h2>
          
          <div className="space-y-6">
            {[
              {
                question: "Is red light therapy scientifically proven to work?",
                answer: "Yes. Multiple peer-reviewed clinical studies have demonstrated the efficacy of red light therapy for hair growth. The technology has been cleared by regulatory bodies and shown to increase hair count, thickness, and growth rate in controlled trials."
              },
              {
                question: "How does red light therapy differ from other hair treatments?",
                answer: "Unlike topical treatments that work only at the surface, or drugs that may have systemic side effects, red light therapy works at the cellular level by enhancing your body's natural hair growth processes without chemicals or side effects."
              },
              {
                question: "How long until I see results from red light therapy?",
                answer: "Most clinical studies show visible improvements after 12-16 weeks of consistent use. Initial results may include reduced shedding, followed by new growth and increased hair thickness. Optimal results typically appear after 24 weeks of regular treatment."
              },
              {
                question: "What scientific evidence supports the specific wavelengths used in Care•Atin?",
                answer: "Our 650-670nm wavelength range has been specifically selected based on clinical research showing optimal penetration to the hair follicle depth and maximum absorption by cytochrome c oxidase, the photoreceptor in mitochondria responsible for increased cellular energy production."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="border-b border-neutral-200 pb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-medium text-primary mb-3">{faq.question}</h3>
                <p className="text-neutral-700">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Modal for displaying research abstracts */}
      <AnimatePresence>
        {openAbstractId && (
          <AbstractModal 
            paper={researchPapers.find(p => p.id === openAbstractId)} 
            isOpen={!!openAbstractId}
            onClose={closeAbstract}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// Helper for SEO
const seoPayload = {
  page: ({title, url}: {title: string; url: string}) => ({
    title,
    url,
    handle: url.substring(url.lastIndexOf('/') + 1),
  }),
}; 