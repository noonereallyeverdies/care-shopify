import { useEffect, useRef, useState } from "react"
import { animate, stagger } from "@motionone/dom"
import { motion } from "framer-motion"
import Floating, { FloatingElement } from "~/components/ui/parallax-floating"
import { Link } from "@remix-run/react"
import { Button } from "~/components/Button"
import { Money } from "@shopify/hydrogen"
import type {HomepageProduct} from '~/routes/($locale)._index';
import { ShimmerButton } from "~/components/ui/ShimmerButton"

// Original hardcoded images - We'll keep the structure but replace URLs later
const heroImagesData = [
  { depth: 0.5, position: "top-[15%] left-[8%]", size: "w-24 h-24 md:w-32 md:h-32" },
  { depth: 1,   position: "top-[12%] right-[12%]", size: "w-32 h-32 md:w-40 md:h-40" },
  { depth: 2,   position: "top-[45%] left-[15%]", size: "w-28 h-28 md:w-36 md:h-36" },
  { depth: 1,   position: "top-[35%] right-[8%]", size: "w-24 h-24 md:w-32 md:h-32" },
  { depth: 0.5, position: "bottom-[20%] left-[12%]", size: "w-32 h-32 md:w-40 md:h-40" }, // Adjusted depth
  { depth: 1.5, position: "bottom-[25%] right-[15%]", size: "w-28 h-28 md:w-36 md:h-36" }, // Adjusted depth
];

// Your specified image URLs
const IMAGE_URL_1 = '/images/prettyhair.jpg';
const IMAGE_URL_2 = '/images/Subject 4.png';
// Add constants for the other unique images
const IMAGE_URL_3 = '/images/PRODUCTPHOTOT.png';
const IMAGE_URL_4 = '/images/hair.jpg';
const IMAGE_URL_5 = '/images/model-shot.jpeg';

// Create an array of the unique image URLs
const uniqueHeroImageUrls = [
  IMAGE_URL_1,
  IMAGE_URL_2,
  IMAGE_URL_3,
  IMAGE_URL_4,
  IMAGE_URL_5,
];

interface HeroProps {
  product: HomepageProduct | null; // Allow null
}

export function Hero({ product }: HeroProps) {
  // Log the product data received
  console.log('Hero Component received product:', JSON.stringify(product, null, 2)); 

  const scope = useRef<HTMLDivElement>(null)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const firstVariant = product?.variants?.nodes[0]
  const featuredImage = product?.featuredImage

  useEffect(() => {
    if (!scope.current) return
    const images = scope.current.querySelectorAll('img')
    animate(images, { opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.15) })
  }, [isImageLoaded])

  // Added check for null product
  if (!product) {
    return (
      <section className="relative w-full min-h-screen bg-contrast flex items-center justify-center">
        <div className="loader"></div>
      </section>
    );
  }

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50/40 via-contrast to-contrast"></div>
      
      <div className="absolute inset-0 opacity-3 bg-[url('/images/texture.png')] bg-repeat"></div>
      
      <div
        className="relative container mx-auto px-4 pt-40 md:pt-48 pb-16 flex flex-col items-center justify-between min-h-screen"
        ref={scope}
      >
        <motion.div
          className="relative z-20 text-center space-y-8 items-center flex flex-col w-full max-w-6xl mx-auto px-4 md:px-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.88, delay: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
        >
          <div className="absolute inset-0 -m-8 backdrop-blur-[2px] bg-white/10 rounded-3xl -z-10"></div>
          
          <motion.h1 
            className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-light tracking-tight lowercase w-full leading-[0.9] mb-8"
            style={{ 
              background: 'linear-gradient(135deg, #343331 0%, #504f4c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            the <span className="text-rose-500">•</span> science <span className="text-rose-500">•</span> of <span className="text-rose-500">•</span> shine
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-primary/70 font-light max-w-xl text-center mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            cellular renewal, powered by precision light.
          </motion.p>
        </motion.div>

        <motion.div 
          className="relative z-20 w-full max-w-5xl mx-auto mt-24 lg:mt-32 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.165, 0.84, 0.44, 1] }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center glass rounded-3xl p-8 shadow-glossier">
            <div className="space-y-6">
              <div className="space-y-2">
                <motion.h2 
                  className="text-3xl font-light text-primary"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  {product?.title}
                </motion.h2>
                <motion.p 
                  className="text-xl text-primary/60"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                >
                  Advanced Red Light Therapy Device
                </motion.p>
              </div>
              <motion.p 
                className="text-primary/80"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                Transform your hair care routine with cutting-edge red light therapy technology.
              </motion.p>
              <motion.div 
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                {firstVariant?.price && (
                  <span className="text-2xl font-medium text-primary">
                    <Money data={firstVariant.price} />
                  </span>
                )}
                {firstVariant?.compareAtPrice && (
                  <span className="text-lg text-primary/60 line-through">
                    <Money data={firstVariant.compareAtPrice} />
                  </span>
                )}
              </motion.div>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                {firstVariant?.availableForSale && (
                  <Button
                    as={Link}
                    to={`/cart?lines=${firstVariant.id}:1`}
                    variant="glossier"
                    width="full"
                    size="large"
                  >
                    Add to Cart
                  </Button>
                )}
                <Button
                  as={Link}
                  to={`/products/${product?.handle}`}
                  variant="ghost"
                  width="full"
                  size="large"
                >
                  Learn More
                </Button>
              </motion.div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-apple-md">
              {featuredImage && (
                <motion.div
                  initial={{ scale: 1.05, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 1.2 }}
                  className="w-full h-full"
                >
                  <img 
                    src={featuredImage.url}
                    alt={featuredImage.altText || product?.title || "Product Image"}
                    className="w-full h-full object-cover"
                    width={featuredImage.width || 800}
                    height={featuredImage.height || 800}
                    onLoad={() => setIsImageLoaded(true)}
                  />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1/3 z-0">
            <Floating sensitivity={0.4} className="h-full">
              <FloatingElement depth={0.8} className="absolute top-[15%] left-[12%]">
                <FloatingImage 
                  imageUrl={uniqueHeroImageUrls[0]} 
                  size="w-28 h-28 md:w-36 md:h-36"
                  delay={0.1}
                />
              </FloatingElement>
              <FloatingElement depth={1.2} className="absolute top-[45%] left-[18%]">
                <FloatingImage 
                  imageUrl={uniqueHeroImageUrls[1]} 
                  size="w-32 h-32 md:w-40 md:h-40"
                  delay={0.25}
                />
              </FloatingElement>
              <FloatingElement depth={0.6} className="absolute bottom-[20%] left-[10%]">
                <FloatingImage 
                  imageUrl={uniqueHeroImageUrls[2]} 
                  size="w-24 h-24 md:w-32 md:h-32"
                  delay={0.4}
                />
              </FloatingElement>
            </Floating>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/3 z-0">
            <Floating sensitivity={0.4} className="h-full">
              <FloatingElement depth={1.0} className="absolute top-[12%] right-[15%]">
                <FloatingImage 
                  imageUrl={uniqueHeroImageUrls[3]} 
                  size="w-32 h-32 md:w-40 md:h-40"
                  delay={0.15}
                />
              </FloatingElement>
              <FloatingElement depth={0.7} className="absolute top-[48%] right-[10%]">
                <FloatingImage 
                  imageUrl={uniqueHeroImageUrls[4]} 
                  size="w-28 h-28 md:w-36 md:h-36"
                  delay={0.3}
                />
              </FloatingElement>
              <FloatingElement depth={1.1} className="absolute bottom-[15%] right-[18%]">
                <FloatingImage 
                  imageUrl={uniqueHeroImageUrls[0]} 
                  size="w-24 h-24 md:w-32 md:h-32"
                  delay={0.45}
                />
              </FloatingElement>
            </Floating>
          </div>
        </div>
      </div>
    </section>
  )
}

interface FloatingImageProps {
  imageUrl: string;
  size: string;
  delay?: number;
}

const FloatingImage: React.FC<FloatingImageProps> = ({ imageUrl, size, delay = 0 }) => {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden shadow-glossier bg-white/20 backdrop-blur-sm p-[2px]"
      initial={{opacity: 0, scale: 0.8}}
      animate={{opacity: 1, scale: 1}}
      transition={{duration: 0.5, delay: delay + 0.5, ease: [0.165, 0.84, 0.44, 1]}}
      whileHover={{
        boxShadow: "0 0 25px rgba(225, 29, 72, 0.4)",
        borderColor: "rgba(225, 29, 72, 0.3)"
      }}
    >
      <motion.div className="relative overflow-hidden rounded-2xl">
        <motion.img
          src={imageUrl}
          alt="Hero visual"
          className={`
            ${size}
            object-cover transition-transform duration-700 hover:scale-110 w-full h-full
          `}
          loading="eager"
          whileHover={{ 
            scale: 1.1,
            filter: "brightness(1.1) saturate(1.2)" 
          }}
          transition={{ duration: 0.7, ease: [0.165, 0.84, 0.44, 1] }}
        />
      </motion.div>
    </motion.div>
  );
};