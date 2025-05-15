import React, {useState} from 'react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {Seo} from '@shopify/hydrogen';
import {motion} from 'framer-motion';

// Import components
import {PageHeader, Section} from '~/components/Text';
import {FaqSection} from '~/components/sections/FaqSection';
import {seoPayload} from '~/lib/seo.server';

// Define loader for SEO
export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const seo = seoPayload.page({title: 'FAQ - Care•Atin', url: '/pages/faq'});

  return defer({seo});
}

// Define FAQ categories and items
const faqCategories = [
  {
    id: 'product',
    name: 'Product Information',
    faqs: [
      {
        question: 'What is care•atin and how does it work?',
        answer: 'care•atin is a cutting-edge red light therapy device designed to revitalize hair follicles at the cellular level. It uses specific wavelengths (650-680nm) of red light that penetrate the scalp and stimulate cellular energy production in hair follicles, enhancing blood flow and extending the growth phase of your hair cycle. The result is reduced shedding, increased hair density, and healthier, thicker hair over time.',
      },
      {
        question: 'What comes in the care•atin package?',
        answer: 'Your care•atin package includes the red light therapy device, charging dock, power adapter, user manual, quick start guide, and a complimentary 2oz bottle of our Follicle-Boost Serum to enhance your treatment results.',
      },
      {
        question: 'Is the device rechargeable?',
        answer: 'Yes, care•atin features a long-lasting rechargeable battery that provides up to 12 full treatments per charge. The elegant charging dock makes it easy to keep your device ready for use.',
      },
      {
        question: 'Can I use my own hair oils or serums with the device?',
        answer: 'Yes! While we recommend our specially formulated Follicle-Boost Serum for optimal results, care•atin works effectively with most natural hair oils. We recommend avoiding serums containing silicones as they can create a barrier that reduces light penetration.',
      },
      {
        question: 'Is care•atin water-resistant?',
        answer: 'care•atin is splash-resistant but not waterproof. While it can handle light moisture from oils or serums, it should not be submerged in water or used in the shower.',
      },
    ],
  },
  {
    id: 'usage',
    name: 'Usage & Treatment',
    faqs: [
      {
        question: 'How do I use care•atin?',
        answer: 'Using care•atin is simple: (1) Apply a few drops of serum to the treatment areas of your scalp; (2) Turn on the device and gently massage it across your scalp in circular motions; (3) Treat each area for about 30 seconds, covering your entire scalp in about 8 minutes. The device will automatically turn off when the treatment is complete.',
      },
      {
        question: 'How often should I use care•atin?',
        answer: 'For optimal results, we recommend using care•atin 3 times per week. Clinical studies show this frequency provides the best balance for cellular response and hair growth stimulation. More frequent use hasn\'t been shown to significantly improve results.',
      },
      {
        question: 'How long does each treatment take?',
        answer: 'A complete treatment takes about 8 minutes. The device is programmed to provide the optimal exposure time based on clinical studies.',
      },
      {
        question: 'When will I see results?',
        answer: 'Most users report reduced shedding within 2-4 weeks. Visible improvements in hair density typically begin around 8-12 weeks, with continued enhancement through week 24. Results continue to improve with consistent use over time.',
      },
      {
        question: 'Can I use care•atin on wet or damp hair?',
        answer: 'For best results, we recommend using care•atin on dry or towel-dried hair. Excessive moisture can reduce the penetration of the light therapy to the follicles.',
      },
    ],
  },
  {
    id: 'science',
    name: 'Science & Efficacy',
    faqs: [
      {
        question: 'Is red light therapy scientifically proven?',
        answer: 'Yes, red light therapy for hair growth is backed by numerous clinical studies and research. The specific wavelengths used in care•atin (650-680nm) have been shown to stimulate cellular energy production, increase blood flow to the scalp, extend the growth phase of hair follicles, and reduce inflammation – all key factors in promoting healthier, thicker hair.',
      },
      {
        question: 'How effective is care•atin compared to other treatments?',
        answer: 'In clinical testing, care•atin showed a 32% average increase in hair density after 24 weeks of use, with 93% of participants reporting satisfaction with their results. Unlike many topical treatments that only work while you use them, red light therapy creates lasting changes by revitalizing the follicles themselves, leading to sustainable improvements in hair health.',
      },
      {
        question: 'Is care•atin safe? Are there any side effects?',
        answer: 'care•atin is extremely safe with no known serious side effects. Red light therapy is non-invasive, drug-free, and chemical-free. It doesn\'t use UV light, so there\'s no risk of burns or skin damage. In clinical studies, less than 2% of users reported mild, temporary scalp tingling during initial treatments, which typically resolves as usage continues.',
      },
      {
        question: 'Does care•atin work for all hair types and colors?',
        answer: 'Yes, care•atin is effective for all hair types, textures, and colors. Unlike some laser treatments that only work for certain hair colors, red light therapy works at the cellular level of the follicle regardless of melanin content.',
      },
      {
        question: 'Can care•atin help with postpartum hair loss?',
        answer: 'Yes, many of our customers have successfully used care•atin for postpartum hair thinning. Red light therapy helps strengthen hair follicles and reduce shedding, which is particularly beneficial during the regrowth phase after pregnancy-related hair loss.',
      },
    ],
  },
  {
    id: 'ordering',
    name: 'Ordering & Warranty',
    faqs: [
      {
        question: 'Do you offer international shipping?',
        answer: 'Yes, we ship to most countries worldwide. International orders typically arrive within 7-14 business days. Shipping fees and potential customs duties vary by location and will be calculated at checkout.',
      },
      {
        question: 'What is your return policy?',
        answer: 'We offer a 60-day satisfaction guarantee. If you\'re not completely satisfied with your care•atin device, you can return it within 60 days of delivery for a full refund of the purchase price. We even cover return shipping costs.',
      },
      {
        question: 'Is there a warranty?',
        answer: 'Yes, care•atin comes with a comprehensive 1-year warranty that covers any manufacturing defects or malfunctions. We\'ll replace your device free of charge if any issues arise during the warranty period.',
      },
      {
        question: 'Do you offer payment plans?',
        answer: 'Yes, we offer interest-free payment plans through Shop Pay, allowing you to spread your purchase over 4 payments. Simply select Shop Pay at checkout to view available options.',
      },
      {
        question: 'How long does shipping take?',
        answer: 'Domestic orders (US) ship within 1-2 business days and typically arrive within 3-5 business days. We offer free expedited shipping on all orders over $100.',
      },
    ],
  },
];

// FAQ Page Component
export default function FaqPage() {
  const {seo} = useLoaderData<typeof loader>();
  const [activeCategory, setActiveCategory] = useState('product');

  return (
    <>
      <Seo type="page" data={seo} />
      
      {/* Page Header */}
      <PageHeader
        heading="Frequently Asked Questions"
        className="text-3xl md:text-5xl font-light text-primary py-16 md:py-20 lg:py-24 text-center bg-contrast"
      />
      
      {/* FAQ Content */}
      <Section padding="all" className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          {/* Category Navigation */}
          <div className="flex overflow-x-auto scrollbar-hide mb-12 pb-2 space-x-4 justify-center">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`py-2 px-4 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category.id
                    ? 'bg-rose-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* FAQ Accordions */}
          <div className="space-y-8">
            {faqCategories
              .filter((category) => category.id === activeCategory)
              .map((category) => (
                <div key={category.id} className="space-y-6">
                  <h2 className="text-2xl font-light text-primary">{category.name}</h2>
                  
                  <FaqSection faqs={category.faqs} />
                </div>
              ))}
          </div>
          
          {/* Contact Info */}
          <motion.div
            className="mt-20 bg-neutral-50 p-8 rounded-xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-medium text-primary mb-4">
              Still have questions?
            </h3>
            <p className="text-neutral-700 mb-6">
              Our customer care team is ready to help with any questions you might have
              about care•atin.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="mailto:support@careatin.com"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors"
              >
                Email Support
              </a>
              <a
                href="tel:+18005551234"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-neutral-200 text-neutral-800 font-medium hover:bg-neutral-300 transition-colors"
              >
                Call: 1-800-555-1234
              </a>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
