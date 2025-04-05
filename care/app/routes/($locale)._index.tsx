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
  type Shop,
  type MoneyV2,
} from '@shopify/hydrogen';
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
    console.log('Fetching product data...');
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
    console.log('Response received:', JSON.stringify({shop, product: fetchedProduct}, null, 2));

    if (!fetchedProduct) {
      console.error('Product not found:', fetchedProduct);
      throw new Response('Product not found', {status: 404});
    }

    const seo = seoPayload.home({url: request.url});

    const storeDomain = env.PUBLIC_STORE_DOMAIN || shop?.primaryDomain?.url || 'luminancecare.myshopify.com';
    const cleanStoreDomain = storeDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');

    return defer({
      shop,
      product: fetchedProduct,
      analytics: {
        pageType: 'home',
      },
      seo,
      storeDomain: cleanStoreDomain,
    });
  } catch (error) {
    console.error('Error in homepage loader:', error);
    if (error instanceof Error) {
      console.error('Error details:', { message: error.message, stack: error.stack });
    }
    throw new Response('Error loading homepage data', {
      status: 500,
      statusText: error instanceof Error ? error.message : 'Unknown error',
    });
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

const SwissPattern: React.FC<{ className?: string }> = ({ className = '' }) => {
  const patternCells = [
    [0, 1, 0, 1, 0], [1, 0, 1, 0, 1], [0, 1, 0, 1, 0], [1, 0, 1, 0, 1], [0, 1, 0, 1, 0],
  ];
  const colors = ['bg-red-50', 'bg-rose-100', 'bg-neutral-100', 'bg-rose-50'];
  return (
    <div className={`grid grid-cols-5 gap-1 ${className}`}>
      {patternCells.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          cell ? (
            <motion.div
              key={`${rowIndex}-${colIndex}`}
              className={`${colors[Math.floor(Math.random() * colors.length)]} aspect-square rounded-sm`}
              initial={{ opacity: 0 }} whileInView={{ opacity: 0.8 }} viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (rowIndex * 0.1) + (colIndex * 0.05), ease: [0.165, 0.84, 0.44, 1] }}
            />
          ) : (<div key={`${rowIndex}-${colIndex}`} />)
        )
      )}
    </div>
  );
};

const VariableReward: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hovered, setHovered] = useState(false);
  const [rewardVariant, setRewardVariant] = useState(0);
  useEffect(() => { if (hovered) { setRewardVariant(Math.floor(Math.random() * 4)); } }, [hovered]);
  const getAnimationVariant = () => {
    switch(rewardVariant) {
      case 0: return { scale: 1.03, y: -5, transition: { duration: 0.3 } };
      case 1: return { rotate: 0.5, scale: 1.02, transition: { duration: 0.4 } };
      case 2: return { boxShadow: "0 15px 30px rgba(0,0,0,0.1)", y: -3, transition: { duration: 0.5 } };
      case 3: return { x: 3, scale: 1.01, transition: { duration: 0.2 } };
      default: return { scale: 1.02, transition: { duration: 0.3 } };
    }
  };
  return (
    <motion.div onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)} whileHover={{ ...getAnimationVariant(), transition: spring }} >
      {children}
    </motion.div>
  );
};

export default function Homepage() {
  const data = useLoaderData<typeof loader>();

  const fadeUp = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.2 },
    transition: { ...spring, duration: 0.7 }
  };
  const imageFade = {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, amount: 0.4 },
    transition: { ...spring, duration: 0.8 }
  };

  const AsymmetricalSection: React.FC<{
    children: React.ReactNode; className?: string; reverse?: boolean;
  }> = ({children, className = '', reverse = false}) => (
    <section className={`relative w-full py-20 md:py-28 lg:py-32 ${className}`}>
      <div className={`grid grid-cols-12 gap-4 lg:gap-8 ${reverse ? 'direction-rtl' : ''}`}>
        {children}
      </div>
    </section>
  );

  const SectionWrapper: React.FC<{
    children: React.ReactNode; className?: string; fullWidth?: boolean;
  }> = ({children, className = '', fullWidth = false}) => (
    <section className={`relative w-full ${fullWidth ? '' : 'max-w-5xl mx-auto px-6 md:px-8'} py-20 md:py-28 lg:py-32 ${className}`}>
      {children}
    </section>
  );

  const SectionIcon: React.FC<{icon: React.ElementType, className?: string}> = ({icon: Icon, className = ''}) => (
    <motion.div className={`flex justify-center mb-8 ${className}`} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ ...spring, duration: 0.5 }}>
      <motion.div className="bg-red-100/60 rounded-full p-3 relative" animate={{ boxShadow: ["0 0 0 0px rgba(220, 38, 38, 0.3)", "0 0 0 10px rgba(220, 38, 38, 0)", "0 0 0 0px rgba(220, 38, 38, 0)"] }} transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" }}>
        <Icon className="h-8 w-8 md:h-10 md:w-10 text-red-600/90 relative z-10" />
      </motion.div>
    </motion.div>
  );

  const PulseDot = () => (
    <motion.span className="text-rose-500 mx-px" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" }}>
      •
    </motion.span>
  );

  const AspirationalMoment: React.FC<{ image: string; quote: string; source: string; }> = ({ image, quote, source }) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    useEffect(() => { if (isInView) { controls.start('visible'); } }, [controls, isInView]);
    return (
      <motion.div ref={ref} className="relative overflow-hidden rounded-2xl bg-neutral-50" initial="hidden" animate={controls} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.165, 0.84, 0.44, 1] } } }} >
        <div className="aspect-w-16 aspect-h-9 overflow-hidden"> <img src={image} alt="Aspirational moment" className="w-full h-full object-cover" /> </div>
        <div className="p-6 md:p-8">
          <motion.blockquote className="text-lg md:text-xl italic text-neutral-700 mb-4 leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}> "{quote}" </motion.blockquote>
          <motion.p className="text-rose-500 font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}> {source} </motion.p>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={data.product} errorElement={<div>Error loading product!</div>}>
          {(resolvedProduct) => (
            <>
              <Hero product={resolvedProduct as HomepageProduct} />

              <SectionWrapper className="text-center">
                <SwissPattern className="w-24 h-24 mx-auto mb-8" />
                <motion.h2
                  className="text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-900 mb-5 lowercase tracking-[0.02em]"
                  variants={fadeUp} initial="initial" whileInView="whileInView" viewport={fadeUp.viewport} transition={{...fadeUp.transition, delay: 0.1}}
                >
                  feel the glow of healthy hair, multi<PulseDot />tasked
                </motion.h2>
                <motion.p
                  className="text-lg md:text-xl text-neutral-700 leading-[1.618] md:leading-[1.618] max-w-3xl mx-auto tracking-wide"
                  variants={fadeUp} initial="initial" whileInView="whileInView" viewport={fadeUp.viewport} transition={{...fadeUp.transition, delay: 0.2}}
                >
                  Rediscover the confidence that comes with hair that looks and feels full, vibrant, and resilient. Our <motion.span className="font-medium text-rose-500" whileHover={{ scale: 1.05 }}>Photonique Touch</motion.span> delivers a 3-in-1 approach – red light therapy, precise nourishment application, and soothing scalp massage – working <em>with</em> your body to nurture stronger, healthier hair from the source.
                </motion.p>
                <motion.p
                  className="text-sm text-neutral-500 mt-6 tracking-wide"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ ...spring, duration: 0.5, delay: 0.5 }}
                >
                  We believe in your hair's natural potential. Let's unleash it together.
                </motion.p>
              </SectionWrapper>
            </>
          )}
        </Await>
      </Suspense>

      <div className="bg-gradient-to-b from-white to-neutral-50 py-12">
        <SectionWrapper>
          <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-900 text-center mb-6 lowercase tracking-[0.02em]" variants={fadeUp} initial="initial" whileInView="whileInView" viewport={fadeUp.viewport}>
            how 3<PulseDot />in<PulseDot />1 care unlocks visibly fuller hair
          </motion.h2>
          <motion.p className="text-lg md:text-xl text-center text-neutral-700 mb-16 md:mb-20 max-w-2xl mx-auto leading-[1.618]" variants={fadeUp} initial="initial" whileInView="whileInView" viewport={fadeUp.viewport} transition={{...fadeUp.transition, delay: 0.1}}>
            Experience how the <motion.span className="font-medium text-rose-500" whileHover={{ scale: 1.05 }}>Photonique Touch</motion.span> combines three essential actions in one seamless gesture:
          </motion.p>
          <div className="grid md:grid-cols-12 gap-8 relative">
            <motion.div className="md:col-span-5 bg-white rounded-2xl overflow-hidden shadow-lg" variants={imageFade} initial="initial" whileInView="whileInView" viewport={imageFade.viewport} whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)" }} transition={{ duration: 0.5 }}>
              <img src="/images/PRODUCTPHOTOT.png" alt="Photonique Touch Device" className="w-full h-auto object-contain p-8" />
              <div className="bg-rose-500 text-white py-4 px-6"> <p className="text-sm uppercase tracking-wider font-medium">The future of hair care</p> </div>
            </motion.div>
            <motion.div className="md:col-span-7 space-y-16 md:space-y-24" variants={{ whileInView: { transition: { staggerChildren: 0.35 } } }} initial="initial" whileInView="whileInView" viewport={fadeUp.viewport} >
              <VariableReward>
                 <motion.div variants={fadeUp} className="p-8 rounded-2xl bg-gradient-to-br from-white to-neutral-50 shadow-sm border border-neutral-100">
                   <div className="flex flex-col">
                     <motion.div className="bg-red-100 rounded-full p-5 w-fit relative mb-6" animate={{ boxShadow: ["0 0 0 0px rgba(220, 38, 38, 0.2)", "0 0 0 8px rgba(220, 38, 38, 0)", "0 0 0 0px rgba(220, 38, 38, 0)"] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}> <Zap className="h-8 w-8 text-rose-600 relative z-10" /> </motion.div>
                     <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 mb-4 lowercase tracking-[0.02em]">1. awaken with targeted light</h3>
                     <p className="text-base md:text-lg text-neutral-700 leading-[1.618]"> Precise red light wavelengths work to optimize cellular energy (think ATP boost) and awaken tired follicles, creating the foundation for healthier growth cycles. </p>
                     <p className="text-sm text-rose-500 mt-4"> Clinically tested. Scientifically proven. </p>
                   </div>
                 </motion.div>
               </VariableReward>
               <VariableReward>
                 <motion.div variants={fadeUp} className="p-8 rounded-2xl bg-gradient-to-br from-white to-neutral-50 shadow-sm border border-neutral-100">
                   <div className="flex flex-col">
                     <motion.div className="bg-red-100 rounded-full p-5 w-fit relative mb-6" animate={{ boxShadow: ["0 0 0 0px rgba(220, 38, 38, 0.2)", "0 0 0 8px rgba(220, 38, 38, 0)", "0 0 0 0px rgba(220, 38, 38, 0)"] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.3, ease: "easeInOut" }}> <Droplet className="h-8 w-8 text-rose-600 relative z-10" /> </motion.div>
                     <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 mb-4 lowercase tracking-[0.02em]">2. nourish directly at the root</h3>
                     <p className="text-base md:text-lg text-neutral-700 leading-[1.618]"> The integrated precision applicator delivers your favorite hair oil or serum <em>exactly</em> where it&apos;s needed most. No waste, just targeted nourishment to enhance the light therapy&apos;s effects. </p>
                     <p className="text-sm text-rose-500 mt-4"> 83% reported improved absorption of products. </p>
                   </div>
                 </motion.div>
               </VariableReward>
               <VariableReward>
                 <motion.div variants={fadeUp} className="p-8 rounded-2xl bg-gradient-to-br from-white to-neutral-50 shadow-sm border border-neutral-100">
                   <div className="flex flex-col">
                     <motion.div className="bg-red-100 rounded-full p-5 w-fit relative mb-6" animate={{ boxShadow: ["0 0 0 0px rgba(220, 38, 38, 0.2)", "0 0 0 8px rgba(220, 38, 38, 0)", "0 0 0 0px rgba(220, 38, 38, 0)"] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.6, ease: "easeInOut" }}> <HandHeart className="h-8 w-8 text-rose-600 relative z-10" /> </motion.div>
                     <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 mb-4 lowercase tracking-[0.02em]">3. stimulate with gentle massage</h3>
                     <p className="text-base md:text-lg text-neutral-700 leading-[1.618]"> Enjoy a soothing scalp massage that boosts circulation, delivering vital oxygen and nutrients, creating the optimal environment for healthy hair. </p>
                     <p className="text-sm text-rose-500 mt-4"> The perfect self-care ritual. Just 5 minutes daily. </p>
                   </div>
                 </motion.div>
               </VariableReward>
            </motion.div>
          </div>
        </SectionWrapper>
      </div>

      <AsymmetricalSection className="overflow-hidden py-20 bg-white">
        <div className="col-span-12 md:col-span-5 lg:col-span-4 mb-12 md:mb-0 px-6 md:px-8">
          <SwissPattern className="w-16 h-16 mb-6" />
          <motion.h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-6 lowercase tracking-[0.02em]" variants={fadeUp} initial="initial" whileInView="whileInView" viewport={fadeUp.viewport}> why a multi<PulseDot />functional approach matters </motion.h2>
          <motion.p className="text-lg text-neutral-700 mb-8 leading-[1.618]" variants={fadeUp} initial="initial" whileInView="whileInView" viewport={fadeUp.viewport} transition={{...fadeUp.transition, delay: 0.1}}> Traditional hair care treats symptoms. Our approach addresses the <em>complete ecosystem</em> of hair health by combining three essential treatments in one seamless device. </motion.p>
          <motion.div className="space-y-4 mb-8" variants={fadeUp} initial="initial" whileInView="whileInView" viewport={fadeUp.viewport} transition={{...fadeUp.transition, delay: 0.2}}>
             <div className="flex items-start gap-3"> <div className="bg-rose-100 rounded-full p-2 mt-1"> <Shield className="h-4 w-4 text-rose-600" /> </div> <p className="text-neutral-700">Clinically tested and dermatologist approved</p> </div>
             <div className="flex items-start gap-3"> <div className="bg-rose-100 rounded-full p-2 mt-1"> <Sparkles className="h-4 w-4 text-rose-600" /> </div> <p className="text-neutral-700">94% reported increased shine and vitality</p> </div>
             <div className="flex items-start gap-3"> <div className="bg-rose-100 rounded-full p-2 mt-1"> <Layers className="h-4 w-4 text-rose-600" /> </div> <p className="text-neutral-700">Visible results in as little as 14 days</p> </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
            <Link to="/products/photonique-touch" className="group">
              <motion.button className="flex items-center gap-2 px-8 py-4 rounded-full bg-rose-500 text-white font-medium" whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(225, 29, 72, 0.4)", transition: spring }} whileTap={{ scale: 0.98, transition: spring }} >
                Discover the device
                <motion.span className="group-hover:translate-x-1 transition-transform duration-300" transition={spring}> <ArrowUpRight className="h-5 w-5" /> </motion.span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
        <motion.div className="col-span-12 md:col-span-7 lg:col-span-8 overflow-hidden relative h-[60vh] md:h-auto" variants={imageFade} initial="initial" whileInView="whileInView" viewport={imageFade.viewport}>
          <img src="/images/nature_shot.jpg" alt="Natural hair care ingredients" className="w-full h-full object-cover object-center rounded-l-3xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8 md:p-12">
            <motion.blockquote className="text-white max-w-xl" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}>
              <p className="text-xl md:text-2xl font-light italic mb-4 leading-relaxed"> "Nature doesn't create in isolation. Neither should your hair care." </p>
              <p className="text-sm uppercase tracking-wider font-medium"> Dr. Elena Rostova — Lead Formulator </p>
            </motion.blockquote>
          </div>
        </motion.div>
      </AsymmetricalSection>

      <ScienceHub />

      <SectionWrapper className="bg-neutral-50 py-24">
         <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-900 text-center mb-6 lowercase tracking-[0.02em]" variants={fadeUp} initial="initial" whileInView="whileInView" viewport={fadeUp.viewport}> your journey to transformative results </motion.h2>
         <motion.p className="text-lg md:text-xl text-center text-neutral-700 mb-16 max-w-2xl mx-auto leading-[1.618]" variants={fadeUp} initial="initial" whileInView="whileInView" viewport={fadeUp.viewport} transition={{...fadeUp.transition, delay: 0.1}}> Real stories from our community show the before and after effects of the care•atin system. </motion.p>
         <div className="grid md:grid-cols-3 gap-8">
           <AspirationalMoment image="/images/testimonial1.jpg" quote="I've tried countless products for my thinning hair. The Photonique Touch is the first one that's actually delivered visible results." source="Jessica, 34 - After 6 weeks" />
           <AspirationalMoment image="/images/testimonial2.jpg" quote="My hairline was my biggest insecurity. Now I feel confident wearing my hair pulled back again." source="Michael, 42 - After 8 weeks" />
           <AspirationalMoment image="/images/testimonial3.jpg" quote="The difference in volume and shine is remarkable. My hair finally feels like it did in my twenties." source="Aisha, 37 - After 4 weeks" />
         </div>
         <motion.div className="mt-20 relative rounded-2xl bg-white p-8 md:p-12 shadow-sm" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
           <div className="grid md:grid-cols-12 gap-8 items-center">
             <div className="md:col-span-4 lg:col-span-3"> <motion.img src="/images/Subject 4.png" alt="Photonique Touch Device" className="w-full max-w-xs mx-auto" whileHover={{ rotate: -5, scale: 1.05, transition: { duration: 0.4 } }} /> </div>
             <div className="md:col-span-8 lg:col-span-9">
               <h3 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-4 lowercase tracking-[0.02em]">join over 10,000 satisfied customers</h3>
               <p className="text-lg text-neutral-700 mb-6 leading-[1.618]"> Experience the care•atin difference with our 60-day satisfaction guarantee. Try the Photonique Touch risk-free and see why it's becoming the new standard in hair wellness. </p>
               <div className="flex items-center gap-1 mb-8">
                 {[1, 2, 3, 4, 5].map((star) => ( <motion.div key={star} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 + (star * 0.1) }} whileHover={{ scale: 1.2, rotate: 5, transition: spring }} > <Heart className="h-6 w-6 text-rose-500 fill-rose-500" /> </motion.div> ))}
                 <span className="ml-2 text-neutral-700 font-medium">4.9/5 from 876 reviews</span>
               </div>
               <Link to="/products/photonique-touch" className="group">
                 <motion.button className="flex items-center gap-2 px-8 py-4 rounded-full bg-rose-500 text-white font-medium" whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(225, 29, 72, 0.4)", transition: spring }} whileTap={{ scale: 0.98, transition: spring }} >
                   Shop now
                   <motion.span className="group-hover:translate-x-1 transition-transform duration-300" transition={spring}> <ChevronRight className="h-5 w-5" /> </motion.span>
                 </motion.button>
               </Link>
             </div>
           </div>
           <motion.div className="absolute -bottom-6 -right-6 z-10 w-24 h-24 md:w-32 md:h-32" initial={{ opacity: 0, rotate: 10 }} whileInView={{ opacity: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}> <SwissPattern /> </motion.div>
         </motion.div>
       </SectionWrapper>

      <FoundersVision />

      <SectionWrapper className="text-center">
        <SectionIcon icon={Sparkles} />
        <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-5 lowercase tracking-tight text-center" variants={fadeUp} initial="initial" whileInView="whileInView" viewport={fadeUp.viewport} transition={{...fadeUp.transition, delay: 0.1}}>
           experience the benefits
         </motion.h2>
         <motion.p className="text-lg text-center md:text-xl text-neutral-700 mb-16 max-w-2xl mx-auto leading-[1.618]" variants={fadeUp} initial="initial" whileInView="whileInView" viewport={fadeUp.viewport} transition={{...fadeUp.transition, delay: 0.2}}>
           See why our 3-in-1 technology is revolutionizing hair care
         </motion.p>
         <GlowingBenefits />
      </SectionWrapper>

      <Testimonials />

      <JournalSignup />

    </>
  );
}
