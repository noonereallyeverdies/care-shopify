import React, { useRef } from 'react';
import {
  defer,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {Await, useLoaderData} from '@remix-run/react';
import {getSeoMeta, type SeoConfig} from '@shopify/hydrogen';
import {
  Zap,
  Droplet,
  HandHeart,
  Sparkles,
  Clock3,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion'; 
import {Testimonials} from '~/components/sections/Testimonials';
import {seoPayload} from '~/lib/seo.server';
import {Suspense} from 'react';
import {Hero} from '~/components/sections/Hero';
import {GlowingBenefits} from '~/components/sections/Benefits';
import {HOMEPAGE_PRODUCT_QUERY} from '~/queries/homepage';
import type {Shop, MoneyV2} from '@shopify/hydrogen/storefront-api-types';

export const headers = {
  'Cache-Control': 'public, max-age=60',
};

export type HomepageProduct = {
  id: string;
  title: string;
  description: string;
  handle: string;
  featuredImage?: {
    url: string;
    altText: string;
    width: number;
    height: number;
  } | null;
  priceRange: {
    minVariantPrice: MoneyV2;
  };
  variants: {
    nodes: Array<{
      id: string;
      availableForSale: boolean;
      price: MoneyV2;
      compareAtPrice?: MoneyV2 | null;
      selectedOptions: Array<{
        name: string;
        value: string;
      }>;
    }>;
  };
};

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront, request, env} = context;
  
  try {
    console.log('Fetching product data...');
    const response = await storefront.query<{
      product: HomepageProduct | null;
      products: {
        nodes: Array<{ handle: string }>;
      };
      shop: Shop | null;
    }>(HOMEPAGE_PRODUCT_QUERY, {
      variables: {
        handle: 'photonique-touch',
      },
    });

    console.log('Response received:', JSON.stringify(response, null, 2));

    // If the specified product is not found, try to use the first available product
    let product = response.product;
    if (!product && response.products?.nodes?.length > 0) {
      console.log('Trying first available product...');
      const firstProductHandle = response.products.nodes[0].handle;
      const fallbackResponse = await storefront.query<{
        product: HomepageProduct | null;
      }>(HOMEPAGE_PRODUCT_QUERY, {
        variables: {
          handle: firstProductHandle,
        },
      });
      product = fallbackResponse.product;
    }

    if (!product) {
      console.error('No products found in response:', response);
      throw new Response('No products found', {
        status: 404,
        statusText: 'No products found in store',
      });
    }

    // Get the store domain from env or shop data
    const storeDomain = env.PUBLIC_STORE_DOMAIN || response.shop?.primaryDomain?.url || 'luminancecare.myshopify.com';
    const cleanStoreDomain = storeDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');

    // Safely construct the URL
    let url: string;
    try {
      if (request?.url) {
        url = new URL(request.url).toString();
      } else if (env.PUBLIC_STORE_DOMAIN) {
        // Make sure the domain has a protocol
        const domain = env.PUBLIC_STORE_DOMAIN.startsWith('http') 
          ? env.PUBLIC_STORE_DOMAIN 
          : `https://${env.PUBLIC_STORE_DOMAIN}`;
        url = domain;
      } else {
        url = 'https://luminancecare.com'; // Fallback URL
      }
    } catch (urlError) {
      console.error('Error constructing URL:', urlError);
      url = 'https://luminancecare.com'; // Fallback URL
    }

    const seo: SeoConfig = {
      title: 'Red Light Therapy Device | Luminance Care',
      description: 'Experience the power of red light therapy with our advanced device. Enhance your hair growth and skin health naturally.',
      handle: 'home',
      url,
      titleTemplate: '%s | Luminance Care',
      robots: {
        noIndex: false,
        noFollow: false,
      },
    };

    return defer({ 
      product,
      shop: response.shop,
      seo,
      storeDomain: cleanStoreDomain,
    });
  } catch (error) {
    console.error('Error in homepage loader:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
      });
    }
    throw new Response('Error loading homepage data', {
      status: 500,
      statusText: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

export const meta = ({data}: MetaArgs<typeof loader>) => {
  if (!data) {
    return [
      {title: 'Red Light Therapy Device | Luminance Care'},
      {description: 'Experience the power of red light therapy with our advanced device. Enhance your hair growth and skin health naturally.'},
    ];
  }
  return getSeoMeta(data.seo as SeoConfig);
};

// --- Parallax Background Component (Conceptual Example) ---
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
      {/* Using dynamic overlay color */}
      <div className={`absolute inset-0 ${overlayColor} z-10`}></div> 
    </div>
  );
};
// ---------------------------------------------------------

// --- Animated Gradient Background Component (Example) ---
// Creates a subtle shifting gradient effect
const AnimatedGradientBackground: React.FC<{ colors: string[], className?: string }> = ({ colors, className }) => {
  return (
    <motion.div
      className={`absolute inset-0 z-0 ${className}`}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] // Move gradient position
      }}
      transition={{
        duration: 15, // Slow transition
        ease: "linear",
        repeat: Infinity
      }}
      style={{
        backgroundSize: '200% 200%', // Background size must be larger for movement
        backgroundImage: `linear-gradient(45deg, ${colors.join(', ')})` // Use passed colors
      }}
    />
  );
};
// ---------------------------------------------------------

export default function Homepage() {
  const data = useLoaderData<typeof loader>();

  // --- Animation Variants --- 
  const fadeUp = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.2 }, 
    transition: { duration: 0.7, ease: [0.6, 0.01, 0.05, 0.95] } 
  };
  const imageFade = {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, amount: 0.4 }, 
    transition: { duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }
  };
  // --- End Animation Variants ---

  // Helper component for consistent section styling - Increased Padding
  const SectionWrapper: React.FC<{
    children: React.ReactNode;
    className?: string;
    fullWidth?: boolean;
  }> = ({children, className = '', fullWidth = false}) => (
    <section
      className={`relative w-full ${fullWidth ? '' : 'max-w-5xl mx-auto px-6 md:px-8'} py-20 md:py-28 lg:py-32 ${className}`}
    >
      {children}
    </section>
  );

  // Helper for section icons - Added pulsing glow effect
  const SectionIcon: React.FC<{icon: React.ElementType}> = ({icon: Icon}) => (
    <motion.div 
      className="flex justify-center mb-8"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Added motion.div for pulse animation */}
      <motion.div 
        className="bg-red-100/60 rounded-full p-3 relative"
        animate={{
          boxShadow: [
            "0 0 0 0px rgba(220, 38, 38, 0.3)", // Start (red-600 at 30% opacity)
            "0 0 0 10px rgba(220, 38, 38, 0)", // Expand to 10px transparent
            "0 0 0 0px rgba(220, 38, 38, 0)"  // End transparent
          ]
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          repeatDelay: 0.5,
          ease: "easeInOut"
        }}
      >
        <Icon className="h-8 w-8 md:h-10 md:w-10 text-red-600/90 relative z-10" />
      </motion.div>
    </motion.div>
  );

  // Helper for pulsing dot in headlines
  const PulseDot = () => (
    <motion.span 
      className="text-red-500 mx-px"
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" }}
    >
      •
    </motion.span>
  );

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={data.product}>
          {(product) => (
            <>
              {/* === Hero Section === */}
              <Hero product={product} />

              {/* === Optional Intro Text === */}
              <SectionWrapper className="text-center">
                <motion.h2 
                  className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-5 lowercase tracking-tight"
                  variants={fadeUp} initial="initial" whileInView="whileInView" viewport={fadeUp.viewport} transition={{...fadeUp.transition, delay: 0.1}}
                >
                  feel the glow of healthy hair, multi<PulseDot />tasked 
                </motion.h2>
                <motion.p 
                  className="text-lg md:text-xl text-primary/80 leading-relaxed md:leading-loose max-w-3xl mx-auto"
                  variants={fadeUp} initial="initial" whileInView="whileInView" viewport={fadeUp.viewport} transition={{...fadeUp.transition, delay: 0.2}}
                >
                  Rediscover the confidence that comes with hair that looks and feels full, vibrant, and resilient. Our <strong>Photonique Touch</strong> delivers a 3-in-1 approach – red light therapy, precise nourishment application, and soothing scalp massage – working <em>with</em> your body to nurture stronger, healthier hair from the source.
                </motion.p>
              </SectionWrapper>
            </>
          )}
        </Await>
      </Suspense>

      {/* === How 3-in-1 Care Works Section (Sticky Scroll Implementation) === */}
      <SectionWrapper>
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary text-center mb-16 md:mb-20 lowercase tracking-tight"
          variants={fadeUp} initial="initial" whileInView="whileInView" viewport={fadeUp.viewport}
        >
          how 3<PulseDot />in<PulseDot />1 care unlocks visibly fuller hair 
        </motion.h2>
        <motion.p 
          className="text-lg md:text-xl text-center text-primary/80 mb-20 md:mb-24 max-w-2xl mx-auto leading-relaxed md:leading-loose"
          variants={fadeUp} initial="initial" whileInView="whileInView" viewport={fadeUp.viewport} transition={{...fadeUp.transition, delay: 0.1}}
        >
          Experience how the <strong>Photonique Touch</strong> combines three essential actions in one seamless gesture:
        </motion.p>
        
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-16 lg:gap-20 relative">
          <div className="sticky top-32 md:top-40 h-[calc(100vh-10rem)] hidden md:block"> 
            <motion.div 
              className="relative aspect-[3/4] rounded-lg flex items-center justify-center h-full shadow-sm overflow-hidden bg-gradient-to-br from-red-50/40 via-red-50/10 to-transparent" // Enhanced red gradient
              variants={imageFade} initial="initial" whileInView="whileInView" viewport={imageFade.viewport}
            >
              {/* Add subtle animated glow/border effect here potentially linked to scroll */}
              {/* Example: Add inner border that pulses */}
              <motion.div 
                 className="absolute inset-0 border-2 border-red-300/0 rounded-lg"
                 animate={{ borderColor: ["rgba(252, 165, 165, 0)", "rgba(252, 165, 165, 0.4)", "rgba(252, 165, 165, 0)"] }} // red-300 at 40% opacity
                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-red-900/40 italic p-4 text-center font-medium relative z-10">Sticky Product Image Placeholder</span>
            </motion.div>
          </div>

          <motion.div 
            className="space-y-24 md:space-y-32 lg:space-y-40"
            variants={{ whileInView: { transition: { staggerChildren: 0.35 } } }}
            initial="initial" whileInView="whileInView" viewport={fadeUp.viewport} 
          > 
            {/* Items use pulsing icon backgrounds */}
            <motion.div variants={fadeUp} whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 300 } }}>
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                {/* Pulsing icon background */} 
                <motion.div 
                  className="bg-red-100/60 rounded-full p-4 mb-6 w-fit relative"
                  animate={{ boxShadow: ["0 0 0 0px rgba(220, 38, 38, 0.2)", "0 0 0 8px rgba(220, 38, 38, 0)", "0 0 0 0px rgba(220, 38, 38, 0)"] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Zap className="h-9 w-9 text-red-600 relative z-10" />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-semibold text-primary mb-4 lowercase tracking-tight">1. awaken with targeted light</h3>
                <p className="text-base md:text-lg text-primary/80 leading-relaxed">
                  Precise red light wavelengths work to optimize cellular energy (think ATP boost) and awaken tired follicles, creating the foundation for healthier growth cycles.
                </p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 300 } }}>
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                 {/* Pulsing icon background */} 
                <motion.div 
                   className="bg-red-100/60 rounded-full p-4 mb-6 w-fit relative"
                   animate={{ boxShadow: ["0 0 0 0px rgba(220, 38, 38, 0.2)", "0 0 0 8px rgba(220, 38, 38, 0)", "0 0 0 0px rgba(220, 38, 38, 0)"] }}
                   transition={{ duration: 1.8, repeat: Infinity, delay: 0.3, ease: "easeInOut" }}
                 >
                  <Droplet className="h-9 w-9 text-red-600 relative z-10" />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-semibold text-primary mb-4 lowercase tracking-tight">2. nourish directly at the root</h3>
                <p className="text-base md:text-lg text-primary/80 leading-relaxed">
                  The integrated precision applicator delivers your favorite hair oil or serum <em>exactly</em> where it&apos;s needed most. No waste, just targeted nourishment to enhance the light therapy&apos;s effects.
                </p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 300 } }}>
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                 {/* Pulsing icon background */} 
                 <motion.div 
                   className="bg-red-100/60 rounded-full p-4 mb-6 w-fit relative"
                   animate={{ boxShadow: ["0 0 0 0px rgba(220, 38, 38, 0.2)", "0 0 0 8px rgba(220, 38, 38, 0)", "0 0 0 0px rgba(220, 38, 38, 0)"] }}
                   transition={{ duration: 1.8, repeat: Infinity, delay: 0.6, ease: "easeInOut" }}
                 >
                   <HandHeart className="h-9 w-9 text-red-600 relative z-10" />
                 </motion.div>
                <h3 className="text-xl md:text-2xl font-semibold text-primary mb-4 lowercase tracking-tight">3. stimulate with gentle massage</h3>
                <p className="text-base md:text-lg text-primary/80 leading-relaxed">
                  Enjoy a soothing scalp massage that boosts circulation, delivering vital oxygen and nutrients, creating the optimal environment for healthy hair.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* === Why a 3-in-1 Approach Section (with Animated Gradient & Parallax Placeholder) === */}
      <SectionWrapper className="relative overflow-hidden">
        {/* Using Animated Gradient Instead of Static Color */} 
        <AnimatedGradientBackground colors={['var(--color-contrast)', '#fef2f2', 'var(--color-contrast)']} /> {/* contrast -> red-50 -> contrast */}
        {/* <ParallaxBackground imageUrl="/images/abstract-red-light-waves.jpg" overlayColor="bg-black/10" /> */} 
        
        <div className="relative z-10 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div 
            className="bg-primary/5 aspect-square rounded-lg flex items-center justify-center overflow-hidden shadow-md"
            variants={imageFade} initial="initial" whileInView="whileInView" viewport={imageFade.viewport}
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 300 } }}
          >
             <span className="text-primary/50 italic">Product Image Area</span>
          </motion.div>
          
          <motion.div 
            className="text-left"
            variants={fadeUp} initial="initial" whileInView="whileInView" viewport={fadeUp.viewport} transition={{...fadeUp.transition, delay: 0.2}}
          >
            <SectionIcon icon={Sparkles} /> 
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-6 lowercase tracking-tight"> 
              why a 3<PulseDot />in<PulseDot />1 approach?
            </h2>
            <p className="text-lg md:text-xl text-primary/80 leading-relaxed md:leading-loose"> 
              Healthy hair thrives on a holistic approach. The <strong>Photonique Touch</strong> combines targeted red light (the cellular spark), precise nourishment (vital ingredients right to the root), and gentle massage (enhanced circulation). It&apos;s comprehensive care, simplified into one elegant device.
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* === Benefits Grid Section === */}
      <GlowingBenefits />

      {/* === Your Moment of Comprehensive Care Section === */}
      <SectionWrapper>
         <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
           <motion.div 
            className="text-left"
            variants={fadeUp} initial="initial" whileInView="whileInView" viewport={fadeUp.viewport} transition={{...fadeUp.transition, delay: 0.1}}
           >
              <SectionIcon icon={Clock3} />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-6 lowercase tracking-tight"> 
                your moment of comprehensive care
              </h2>
              <p className="text-lg md:text-xl text-primary/80 leading-relaxed md:leading-loose"> 
                Using the <strong>Photonique Touch</strong> is beautifully simple. Glide the device over your scalp; feel the gentle massage as the red light works its magic, while your chosen serum is delivered precisely. Just a few dedicated minutes, a few times a week. It&apos;s an effortless pause delivering multiple benefits. This is self-care, optimized.
              </p>
           </motion.div>
           <motion.div 
            className="bg-primary/5 aspect-square rounded-lg flex items-center justify-center order-first md:order-last overflow-hidden shadow-md"
            variants={imageFade} initial="initial" whileInView="whileInView" viewport={imageFade.viewport}
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 300 } }}
           >
             <span className="text-primary/50 italic">Lifestyle Image Area</span>
          </motion.div>
         </div>
      </SectionWrapper>

      {/* === It's More Than Hair Section (with Animated Gradient & Parallax Placeholder) === */}
      <SectionWrapper className="text-center relative overflow-hidden">
         {/* Using Animated Gradient Instead of Static Color */} 
         <AnimatedGradientBackground colors={['var(--color-contrast)', '#fee2e2', 'var(--color-contrast)']} /> {/* contrast -> red-100 -> contrast */}
        {/* <ParallaxBackground imageUrl="/images/soft-focus-warm-texture.jpg" overlayColor="bg-black/0"/> */}

        <div className="relative z-10"> 
          <SectionIcon icon={Heart} />
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-6 lowercase tracking-tight"
            variants={fadeUp} initial="initial" whileInView="whileInView" viewport={fadeUp.viewport} transition={{...fadeUp.transition, delay: 0.1}}
          >
            it&apos;s more than hair, it&apos;s <em>your</em> feeling
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-primary/80 leading-relaxed md:leading-loose max-w-3xl mx-auto"
            variants={fadeUp} initial="initial" whileInView="whileInView" viewport={fadeUp.viewport} transition={{...fadeUp.transition, delay: 0.2}}
          >
            When your hair feels healthy and resilient, *you* feel it too. It&apos;s the freedom from worry about thinning patches. The ease of styling hair that cooperates. It&apos;s looking in the mirror and feeling completely, confidently *you*. The <strong>Photonique Touch</strong> helps restore not just your hair, but that essential feeling.
          </motion.p>
        </div>
      </SectionWrapper>

      {/* === Testimonials Section === */}
      <Testimonials />

      {/* === Optional Closing Section === */}
      <SectionWrapper className="text-center">
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-5 lowercase tracking-tight"
          variants={fadeUp} initial="initial" whileInView="whileInView" viewport={fadeUp.viewport} transition={{...fadeUp.transition, delay: 0.1}}
        >
          start your journey to radiant, resilient hair
        </motion.h2>
        <motion.p 
          className="text-lg md:text-xl text-primary/80 mb-10 leading-relaxed"
          variants={fadeUp} initial="initial" whileInView="whileInView" viewport={fadeUp.viewport} transition={{...fadeUp.transition, delay: 0.2}}
        >
          Ready to experience the power of 3<PulseDot />in<PulseDot />1 care? Discover <strong>Photonique Touch</strong>.
        </motion.p>
        <motion.div 
          variants={fadeUp} 
          initial="initial" 
          whileInView="whileInView" 
          viewport={fadeUp.viewport} 
          transition={{...fadeUp.transition, delay: 0.3}}
        >
          <motion.button 
            className="inline-flex items-center bg-primary text-contrast rounded-full px-8 py-4 text-lg font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background shadow-lg hover:shadow-primary/20"
            whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300 } }} 
            whileTap={{ scale: 0.95 }} 
          >
             Shop Photonique Touch 
             <ChevronRight className="ml-2 h-5 w-5" /> 
          </motion.button>
        </motion.div>
      </SectionWrapper>
    </>
  );
}
