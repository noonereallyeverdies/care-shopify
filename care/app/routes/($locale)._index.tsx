import React, {useRef, useState, useEffect, Suspense} from 'react';
import {
  defer,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {
  Await,
  useLoaderData,
  Link,
  useLocation,
} from '@remix-run/react';
import {
  getSeoMeta,
  type SeoConfig,
} from '@shopify/hydrogen';
import type { Shop, MoneyV2 } from '@shopify/hydrogen/storefront-api-types';
import {
  Zap,
  Droplet,
  HandHeart,
  Sparkles,
  Clock3,
  Heart,
  ChevronRight,
  ArrowUpRight,
  Layers,
  Shield,
  FlaskConical,
  BookOpen,
  Mail,
} from 'lucide-react';
import {
  motion,
  useScroll,
  useTransform,
  useAnimation,
  useInView,
} from 'framer-motion';

import {Testimonials} from '~/components/sections/Testimonials';
import {Hero} from '~/components/sections/Hero';
import {GlowingBenefits} from '~/components/sections/Benefits';
import {ScienceHub} from '~/components/sections/ScienceHub';
import {FoundersVision} from '~/components/sections/FoundersVision';
import {JournalSignup} from '~/components/sections/JournalSignup';
import {seoPayload} from '~/lib/seo.server';
import {HOMEPAGE_PRODUCT_QUERY} from '~/queries/homepage';

export const headers = {
  'Cache-Control': 'public, max-age=60',
};

interface VariantOption {
  name: string;
  value: string;
}

interface Variant {
  id: string;
  availableForSale: boolean;
  quantityAvailable?: number;
  selectedOptions: VariantOption[];
  price: MoneyV2;
  compareAtPrice?: MoneyV2;
  sku?: string;
  title: string;
  unitPrice?: MoneyV2;
  product: {title: string; handle: string};
}

interface HomepageProduct {
  id: string;
  title: string;
  handle: string;
  descriptionHtml?: string;
  featuredImage?: {
    url: string;
    altText?: string;
    width?: number;
    height?: number;
  };
  variants: {
    nodes: Variant[];
  };
  seo?: {
    title?: string;
    description?: string;
  };
}

export async function loader({request, context, params}: LoaderFunctionArgs) {
  const {language, country} = context.storefront.i18n;
  const {storefront, env} = context;

  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    throw new Response(null, {status: 404});
  }
  
  try {
    console.log('[Homepage Loader] Fetching product data...');
    const {shop, product: fetchedProduct} = await storefront.query<{
      shop: Shop;
      product: HomepageProduct | null;
    }>(
      HOMEPAGE_PRODUCT_QUERY,
      {
        variables: {
          handle: 'photonique-touch',
          country: country,
          language: language,
        },
      },
    );
    console.log('[Homepage Loader] Response received.');

    if (!fetchedProduct) {
      console.error('[Homepage Loader] Product not found handle: photonique-touch');
    }

    console.log('[Homepage Loader] Product data:', fetchedProduct ? `ID: ${fetchedProduct.id}` : 'null');

    const seo = seoPayload.home({url: request.url});

    const storeDomain = env.PUBLIC_STORE_DOMAIN || shop?.primaryDomain?.url || 'luminancecare.myshopify.com';
    const cleanStoreDomain = storeDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');

    const deferredData = {
      shop,
      product: fetchedProduct,
      analytics: {
        pageType: 'home',
      },
      seo,
      storeDomain: cleanStoreDomain,
    };

    console.log('[Homepage Loader] Returning deferred data...');
    return defer(deferredData);
  } catch (error) {
    console.error('[Homepage Loader] Error fetching data:', error);
    throw error;
  }
}

export const meta = ({data}: MetaArgs<typeof loader>) => {
  if (!data?.seo) {
    return [
        {title: 'care•atin | The Science of Shine'},
        {description: 'Default description if SEO data is missing.'}
    ];
  }
  return getSeoMeta(data.seo as SeoConfig);
};

const spring = {
  type: "spring",
  stiffness: 250,
  damping: 30,
  mass: 0.8
};

const ParallaxBackground: React.FC<{ imageUrl: string; speed?: number; overlayColor?: string }> = 
  ({ imageUrl, speed = 0.3, overlayColor = 'bg-black/5' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div ref={ref} className="absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute inset-[-25%] w-[150%] h-[150%] bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          y 
        }}
      />
      <div className={`absolute inset-0 ${overlayColor} z-10`}></div> 
    </div>
  );
};

const AnimatedGradientBackground: React.FC<{ colors: string[], className?: string }> = ({ colors, className }) => {
  return (
    <motion.div
      className={`absolute inset-0 z-0 ${className}`}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
      }}
      transition={{
        duration: 15,
        ease: "linear",
        repeat: Infinity
      }}
      style={{
        backgroundSize: '200% 200%',
        backgroundImage: `linear-gradient(45deg, ${colors.join(', ')})`
      }}
    />
  );
};

export default function Homepage() {
  const data = useLoaderData<typeof loader>();

  const fadeUp = {
    variants: {
      initial: {},
      animate: {
        transition: {
          staggerChildren: 0.1,
        }
      }
    },
    initial: "initial",
    whileInView: "animate",
    viewport: { once: true, amount: 0.2 }
  };

  const fadeUpChild = {
    variants: {
      initial: { opacity: 0, y: 20 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: { ...spring, duration: 0.6 } 
      }
    }
  };

  const imageFade = {
    variants: {
      initial: { opacity: 0, scale: 0.9 },
      animate: {
        opacity: 1,
        scale: 1,
        transition: { ...spring, duration: 0.8 }
      }
    },
    initial: "initial",
    whileInView: "animate",
    viewport: { once: true, amount: 0.4 }
  };
  const cardHover = {
    scale: 1.02,
    y: -4,
    boxShadow: "0 15px 30px rgba(0,0,0,0.08)",
    transition: spring
  };
  const textHover = {
    scale: 1.03,
    color: "#e11d48",
    transition: spring
  }

  const AsymmetricalSection: React.FC<{
    children: React.ReactNode; className?: string; reverse?: boolean;
  }> = ({children, className = '', reverse = false}) => (
    <section className={`relative w-full py-16 md:py-20 lg:py-24 ${className}`}>
      <div className={`grid grid-cols-12 gap-6 lg:gap-12 ${reverse ? 'direction-rtl' : ''}`}>
        {children}
      </div>
    </section>
  );

  const SectionWrapper: React.FC<{
    children: React.ReactNode; className?: string; fullWidth?: boolean; as?: any;
    initial?: string | any;
    whileInView?: string | any;
    viewport?: any;
    variants?: any;
  }> = ({children, className = '', fullWidth = false, as: As = 'section', ...motionProps}) => (
    <As 
      className={`relative w-full ${fullWidth ? '' : 'max-w-5xl mx-auto px-6 md:px-8'} py-20 md:py-24 lg:py-28 ${className}`}
      {...motionProps}
    >
      {children}
    </As>
  );

  const SectionIcon: React.FC<{icon: React.ElementType, className?: string}> = ({icon: Icon, className = ''}) => (
    <motion.div className={`flex justify-center mb-8 ${className}`} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ ...spring, duration: 0.5 }}>
      <motion.div
        className="bg-rose-100 rounded-full p-3 relative"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" }}
      >
        <Icon className="h-8 w-8 md:h-10 md:w-10 text-rose-600 relative z-10" strokeWidth={1.5} />
      </motion.div>
    </motion.div>
  );

  const PulseDot = () => (
    <motion.span className="text-rose-500 mx-px" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}>
      •
    </motion.span>
  );

  const AspirationalMoment: React.FC<{ image: string; quote: string; source: string; }> = ({ image, quote, source }) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    useEffect(() => { if (isInView) { controls.start('visible'); } }, [controls, isInView]);
    return (
      <motion.div
        ref={ref}
        className="relative flex flex-col overflow-hidden rounded-2xl bg-white transition-shadow duration-300 ease-out hover:shadow-xl border border-neutral-100"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.165, 0.84, 0.44, 1] } }
        }}
        whileHover={cardHover}
      >
        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
          <img src={image} alt="Aspirational moment" className="w-full h-full object-cover" />
        </div>
        <div className="p-6 flex-grow flex flex-col justify-between border-t border-neutral-100">
          <motion.blockquote
            className="text-base md:text-lg italic text-neutral-600 mb-4 leading-relaxed flex-grow"
          >
            "{quote}"
          </motion.blockquote>
          <motion.p
            className="text-sm text-rose-500 font-medium mt-2"
          >
            {source}
          </motion.p>
        </div>
      </motion.div>
    );
  };

  const FeatureListItem: React.FC<{ icon: React.ElementType; text: string; }> = ({ icon: Icon, text }) => (
    <div className="flex items-center gap-3">
      <div className="bg-rose-50 rounded-full p-2 flex-shrink-0 w-8 h-8 flex items-center justify-center border border-rose-100">
        <Icon className="h-4 w-4 text-rose-600" strokeWidth={1.5} />
      </div>
      <p className="text-neutral-700 text-sm md:text-base leading-snug">{text}</p>
    </div>
  );

  const PrimaryButton: React.FC<{ to: string; text: string; icon?: React.ElementType; className?: string; }> = ({ to, text, icon: Icon, className = '' }) => (
    <Link to={to} className={`group inline-flex ${className}`}>
      <motion.button
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium transition-colors duration-200"
        whileHover={{ scale: 1.02, boxShadow: "0 8px 20px -5px rgba(225, 29, 72, 0.4)", transition: spring }}
        whileTap={{ scale: 0.98, transition: spring }}
      >
        {text}
        {Icon && (
          <motion.span className="group-hover:translate-x-1 transition-transform duration-300" transition={spring}>
            <Icon className="h-4 w-4" strokeWidth={2} />
          </motion.span>
        )}
      </motion.button>
    </Link>
  );

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={data.product} errorElement={<div>Error loading product!</div>}>
          {(resolvedProduct) => (
            <>
              <Hero product={resolvedProduct as HomepageProduct} />

              <SectionWrapper 
                className="text-center"
                as={motion.section}
                initial={fadeUp.initial}
                whileInView={fadeUp.whileInView}
                viewport={fadeUp.viewport}
                variants={fadeUp.variants}
              >
                <SectionIcon icon={Layers} />
                <motion.h2
                  className="text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-900 mb-4 tracking-tight"
                  variants={fadeUpChild.variants}
                >
                  Feel the glow of healthy hair, multi<PulseDot />tasked
                </motion.h2>
                <motion.p
                  className="text-lg md:text-xl text-neutral-700 leading-relaxed max-w-3xl mx-auto tracking-normal"
                  variants={fadeUpChild.variants}
                >
                  Rediscover confidence with hair that looks and feels full, vibrant, and resilient. Our <motion.span className="font-medium text-rose-500" whileHover={textHover}>Photonique Touch</motion.span> combines red light therapy, precise nourishment, and soothing scalp massage – working <em className="not-italic font-medium text-neutral-800">with</em> your body for healthier hair from the source.
                </motion.p>
                <motion.p
                  className="text-sm text-neutral-600 mt-6 tracking-normal"
                  variants={fadeUpChild.variants}
                >
                  We believe in your hair's natural potential.
                </motion.p>
              </SectionWrapper>
            </>
          )}
        </Await>
      </Suspense>

      <div className="bg-gradient-to-b from-white via-neutral-50/50 to-neutral-50 py-12">
        <SectionWrapper 
          className="py-16 md:py-20 lg:py-24"
          as={motion.section} 
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={fadeUp.viewport}
          variants={fadeUp.variants}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-900 text-center mb-6 tracking-tight"
            variants={fadeUpChild.variants}
          >
            How 3<PulseDot />in<PulseDot />1 care unlocks visibly fuller hair
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-center text-neutral-700 mb-16 max-w-2xl mx-auto leading-relaxed tracking-normal"
            variants={fadeUpChild.variants}
          >
            Experience how the <motion.span className="font-medium text-rose-500" whileHover={textHover}>Photonique Touch</motion.span> combines three essential actions in one seamless gesture.
          </motion.p>
          <div className="grid md:grid-cols-12 gap-8 items-start">
            <motion.div
              className="md:col-span-5 bg-white rounded-2xl overflow-hidden shadow-lg border border-neutral-100"
              initial={imageFade.initial}
              whileInView={imageFade.whileInView}
              viewport={imageFade.viewport}
              variants={imageFade.variants}
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)", transition: spring }}
            >
              <img src="/images/PRODUCTPHOTOT.png" alt="Photonique Touch Device" className="w-full h-auto object-contain p-8 md:p-10" />
              <div className="bg-rose-500 text-white py-3 px-6"> <p className="text-xs uppercase tracking-wider font-medium text-center">The future of hair care</p> </div>
            </motion.div>
            <motion.div 
              className="md:col-span-7 space-y-6"
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              viewport={fadeUp.viewport}
              variants={fadeUp.variants}
            >
               <motion.div
                 variants={fadeUpChild.variants}
                 className="p-6 rounded-2xl bg-gradient-to-br from-white to-neutral-50 shadow-sm border border-neutral-100 transition-shadow duration-300 ease-out hover:shadow-lg"
                 whileHover={cardHover}
                >
                 <div className="flex flex-col">
                   <div className="flex items-center gap-4 mb-4">
                     <motion.div className="bg-rose-100 rounded-full p-3 flex-shrink-0" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
                       <Zap className="h-6 w-6 text-rose-600" strokeWidth={1.5}/>
                     </motion.div>
                     <h3 className="text-lg md:text-xl font-semibold text-neutral-900 tracking-tight flex-grow">1. Awaken with targeted light</h3>
                   </div>
                   <p className="text-sm md:text-base text-neutral-700 leading-relaxed pl-12">
                      Precise red light wavelengths optimize cellular energy (ATP boost) and awaken tired follicles for healthier growth cycles.
                   </p>
                 </div>
               </motion.div>
               <motion.div
                 variants={fadeUpChild.variants}
                 className="p-6 rounded-2xl bg-gradient-to-br from-white to-neutral-50 shadow-sm border border-neutral-100 transition-shadow duration-300 ease-out hover:shadow-lg"
                 whileHover={cardHover}
                >
                 <div className="flex flex-col">
                   <div className="flex items-center gap-4 mb-4">
                     <motion.div className="bg-rose-100 rounded-full p-3 flex-shrink-0" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.3, ease: "easeInOut" }}>
                       <Droplet className="h-6 w-6 text-rose-600" strokeWidth={1.5}/>
                     </motion.div>
                     <h3 className="text-lg md:text-xl font-semibold text-neutral-900 tracking-tight flex-grow">2. Nourish directly at the root</h3>
                   </div>
                   <p className="text-sm md:text-base text-neutral-700 leading-relaxed pl-12">
                     The integrated applicator delivers serums <em className="not-italic font-medium text-neutral-800">exactly</em> where needed. No waste, just targeted nourishment.
                   </p>
                 </div>
               </motion.div>
               <motion.div
                 variants={fadeUpChild.variants}
                 className="p-6 rounded-2xl bg-gradient-to-br from-white to-neutral-50 shadow-sm border border-neutral-100 transition-shadow duration-300 ease-out hover:shadow-lg"
                 whileHover={cardHover}
                >
                 <div className="flex flex-col">
                   <div className="flex items-center gap-4 mb-4">
                     <motion.div className="bg-rose-100 rounded-full p-3 flex-shrink-0" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.6, ease: "easeInOut" }}>
                       <HandHeart className="h-6 w-6 text-rose-600" strokeWidth={1.5}/>
                     </motion.div>
                     <h3 className="text-lg md:text-xl font-semibold text-neutral-900 tracking-tight flex-grow">3. Stimulate with gentle massage</h3>
                   </div>
                   <p className="text-sm md:text-base text-neutral-700 leading-relaxed pl-12">
                      Enjoy a soothing scalp massage that boosts circulation, creating the optimal environment for healthy hair growth.
                   </p>
                 </div>
               </motion.div>
            </motion.div>
          </div>
        </SectionWrapper>
      </div>

      <AsymmetricalSection className="overflow-hidden bg-white">
        <motion.div 
          className="col-span-12 md:col-span-5 lg:col-span-4 mb-12 md:mb-0 px-6 md:px-8 flex flex-col justify-center"
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={fadeUp.viewport}
          variants={fadeUp.variants}
        >
          <SectionIcon icon={Shield} />
          <motion.h2
            className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-5 tracking-tight"
            variants={fadeUpChild.variants}
          >
            Why a multi<PulseDot />functional approach matters
          </motion.h2>
          <motion.p 
            className="text-base md:text-lg text-neutral-700 mb-8 leading-relaxed"
            variants={fadeUpChild.variants}
          >
            Traditional methods treat symptoms. Our approach addresses the <em className="not-italic font-medium text-neutral-800">complete ecosystem</em> of hair health, combining three essential actions.
          </motion.p>
          <motion.div 
            className="space-y-4 mb-8"
            variants={fadeUpChild.variants}
          >
             <FeatureListItem icon={Shield} text="Clinically tested and dermatologist approved" />
             <FeatureListItem icon={Sparkles} text="94% reported increased shine and vitality" />
             <FeatureListItem icon={Layers} text="Visible results in as little as 14 days" />
          </motion.div>
          <motion.div 
            variants={fadeUpChild.variants}
          >
            <PrimaryButton to="/products/photonique-touch" text="Discover the device" icon={ArrowUpRight} />
          </motion.div>
        </motion.div>
        <motion.div 
          className="col-span-12 md:col-span-7 lg:col-span-8 overflow-hidden relative min-h-[400px] md:min-h-0 h-[60vh] md:h-auto" 
          initial={imageFade.initial}
          whileInView={imageFade.whileInView}
          viewport={imageFade.viewport}
          variants={imageFade.variants}
        >
          <img src="/images/nature_shot.jpg" alt="Natural hair care ingredients" className="absolute inset-0 w-full h-full object-cover object-center rounded-l-3xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-end p-8 md:p-12">
            <motion.blockquote className="text-white max-w-lg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}>
              <p className="text-lg md:text-xl font-light italic mb-3 leading-snug"> "Nature doesn't create in isolation. Neither should your hair care." </p>
              <p className="text-xs uppercase tracking-wider font-medium opacity-80"> Dr. Elena Rostova — Lead Formulator </p>
            </motion.blockquote>
          </div>
        </motion.div>
      </AsymmetricalSection>

      <ScienceHub />

      <SectionWrapper 
        className="bg-neutral-50 py-24"
        as={motion.section} 
        initial={fadeUp.initial}
        whileInView={fadeUp.whileInView}
        viewport={fadeUp.viewport}
        variants={fadeUp.variants}
      >
         <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-900 text-center mb-6 tracking-tight"
          variants={fadeUpChild.variants}
         >
           Your journey to transformative results
         </motion.h2>
         <motion.p 
           className="text-lg md:text-xl text-center text-neutral-700 mb-16 max-w-2xl mx-auto leading-relaxed tracking-normal"
           variants={fadeUpChild.variants}
         >
           Real stories from our community show the difference consistent care can make.
         </motion.p>
         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
           <AspirationalMoment image="/images/testimonial1.jpg" quote="I've tried countless products. This is the first one that's actually delivered visible results for my thinning hair." source="Jessica, 34 - After 6 weeks" />
           <AspirationalMoment image="/images/testimonial2.jpg" quote="My hairline was my biggest insecurity. Now I feel confident wearing my hair pulled back again." source="Michael, 42 - After 8 weeks" />
           <AspirationalMoment image="/images/testimonial3.jpg" quote="The difference in volume and shine is remarkable. My hair finally feels healthy and resilient again." source="Aisha, 37 - After 4 weeks" />
         </div>
         <motion.div
           className="mt-20 relative rounded-2xl bg-white p-8 md:p-12 shadow-sm border border-neutral-100 overflow-hidden"
           initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
         >
           <div className="grid md:grid-cols-12 gap-8 items-center">
             <div className="md:col-span-4 lg:col-span-3 flex justify-center">
               <motion.img 
                 src="/images/Subject 4.png" 
                 alt="Photonique Touch Device" 
                 className="w-full max-w-[200px] md:max-w-xs transition-filter duration-300 hover:brightness-105"
                 whileHover={{ rotate: -3, scale: 1.05, transition: { duration: 0.4 } }}
               />
             </div>
             <div className="md:col-span-8 lg:col-span-9 text-center md:text-left">
               <h3 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-3 tracking-tight">Join over 10,000 satisfied customers</h3>
               <p className="text-base md:text-lg text-neutral-700 mb-6 leading-relaxed"> Experience the care•atin difference risk-free with our 60-day satisfaction guarantee. See why Photonique Touch is the new standard in hair wellness. </p>
               <div className="flex items-center justify-center md:justify-start gap-1 mb-8">
                 {[1, 2, 3, 4, 5].map((star) => (
                   <motion.div 
                     key={star} 
                     initial={{ opacity: 0, scale: 0 }} 
                     whileInView={{ opacity: 1, scale: 1 }} 
                     viewport={{ once: true }} 
                     transition={{ duration: 0.4, delay: 0.2 + (star * 0.1) }} 
                     whileHover={{ scale: 1.3, rotate: 5, y: -2, transition: spring }}
                   >
                     <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
                   </motion.div>
                 ))}
                 <span className="ml-2 text-sm text-neutral-700 font-medium">4.9 / 5.0 from 876 reviews</span>
               </div>
               <PrimaryButton to="/products/photonique-touch" text="Shop Now & Save" icon={ChevronRight} />
             </div>
           </div>
         </motion.div>
       </SectionWrapper>

      <FoundersVision />

      <SectionWrapper 
        className="text-center"
        as={motion.section} 
        initial={fadeUp.initial}
        whileInView={fadeUp.whileInView}
        viewport={fadeUp.viewport}
        variants={fadeUp.variants}
      >
        <SectionIcon icon={Sparkles} />
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-900 mb-5 tracking-tight text-center"
          variants={fadeUpChild.variants}
        >
           Experience the benefits
         </motion.h2>
         <motion.p 
           className="text-lg text-center md:text-xl text-neutral-700 mb-16 max-w-2xl mx-auto leading-relaxed tracking-normal"
           variants={fadeUpChild.variants}
         >
           See why our 3-in-1 technology is revolutionizing proactive hair care.
         </motion.p>
         <GlowingBenefits />
      </SectionWrapper>

      <Testimonials />

      <JournalSignup />

    </>
  );
}
