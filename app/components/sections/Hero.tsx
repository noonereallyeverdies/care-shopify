import { Link } from "@remix-run/react"
import { useState, useEffect, useRef, lazy, Suspense, memo } from "react"
import type { HomepageProduct } from '~/routes/($locale)._index';
import { Image as HydrogenImage } from '@shopify/hydrogen';

// Split the motion import to reduce initial bundle size
const LazyMotionComponents = lazy(() => import('./HeroMotion'));

// Simple ArrowRight component to avoid Lucide dependency in initial load
function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props} className={`ml-2 h-5 w-5 ${props.className || ''}`}>
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface HeroProps {
  product: HomepageProduct | null;
}

// Initial static version for server-side rendering and hydration
function StaticHero({ product }: HeroProps & { isClient: boolean }) { // Removed videoRef and its useEffect
  if (!product) {
    return (
      <section className="relative w-full min-h-screen bg-contrast flex items-center justify-center">
        <div className="text-primary">Loading Hero...</div>
      </section>
    );
  }

  const featuredImage = product?.featuredImage;
  // Use a more generic fallback or ensure poster is always available
  const heroImageUrl = featuredImage?.url || "/images/hero-bg.jpg"; 
  const heroImageAlt = featuredImage?.altText || 'Care-atin product background';

  return (
    <section className="relative min-h-[90vh] flex items-end justify-start text-left overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Video tag and its logic removed from StaticHero */}
        <HydrogenImage 
          data={{ url: heroImageUrl, altText: heroImageAlt, width: 1920, height: 1080 }}
          className="absolute inset-0 w-full h-full object-cover" 
          sizes="100vw"
          loading="eager" 
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-transparent z-10"></div>
      </div>

      {/* Content remains the same */}
      <div className="relative z-20 container mx-auto pb-20 px-4 sm:pb-28 sm:px-6 md:pb-36 md:px-12 text-white">
        <div className="max-w-2xl">
          <div className="mb-6 md:mb-8">
            <h5 className="text-base md:text-lg font-light uppercase tracking-widest mb-3 md:mb-4 text-white/80 brand-body">
              Unlock Your Hair's Radiance
            </h5>
            <h1 className="mb-4 md:mb-6 font-light text-4xl sm:text-5xl md:text-6xl tracking-wide text-white brand-heading">
              The Science of Radiant Hair
            </h1>
            
            <p className="text-white/80 italic mt-2 max-w-2xl mx-auto text-lg md:text-xl mb-4">
              "Unlike topical fixes that merely mask thinning, care•atin reactivates follicles at their source."
            </p>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl leading-relaxed mb-5 md:mb-8 font-light brand-body">
              Experience care•atin: advanced red light therapy for visibly thicker, fuller, healthier hair. Clinically proven, naturally.
            </p>
            
            <div className="relative">
              <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
                <div className="transition-transform duration-200 hover:scale-105">
                  <Link
                    to={`/products/${product.handle}`}
                    prefetch="intent"
                    className="inline-flex items-center justify-center bg-var(--brand-primary, #d4627c) px-8 py-4 text-lg font-medium text-white rounded-full w-full sm:w-auto"
                  >
                    Shop care•atin
                    <ArrowRight />
                  </Link>
                </div>
                <div className="transition-transform duration-200 hover:scale-105">
                  <Link
                    to="/hair-quiz"
                    prefetch="intent"
                    className="inline-flex items-center justify-center border-2 border-pink-500 text-pink-500 px-8 py-4 text-lg font-medium rounded-full hover:bg-pink-500 hover:text-white w-full sm:w-auto"
                  >
                    Take Hair Quiz
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main component with progressive enhancement
export function Hero(props: HeroProps) {
  const [isClient, setIsClient] = useState(false);
  
  // Mark when we're on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {/* Always render the static version for fast initial load */}
      {!isClient && <StaticHero {...props} isClient={false} />}
      
      {/* Load enhanced version with animations once we're on the client */}
      {isClient && (
        <Suspense fallback={<StaticHero {...props} isClient={true} />}>
          <LazyMotionComponents {...props} />
        </Suspense>
      )}
    </>
  );
}

export default memo(Hero);
