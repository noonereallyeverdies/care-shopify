import { useEffect, useRef, useState } from "react"
import { animate, stagger } from "@motionone/dom"
import { motion } from "framer-motion"
import Floating, { FloatingElement } from "~/components/ui/parallax-floating"
import { Link } from "@remix-run/react"
// import { Button } from "~/components/ui/button" // Temporarily commented out
// import { ShimmerButton } from "~/components/ui/ShimmerButton" // Temporarily commented out
import { Money } from "@shopify/hydrogen"
import type {HomepageProduct} from '~/routes/($locale)._index';

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
  // Removed isImageLoaded state if not used in original logic being restored
  // const [isImageLoaded, setIsImageLoaded] = useState(false)

  const firstVariant = product?.variants?.nodes[0]
  const featuredImage = product?.featuredImage

  useEffect(() => {
    if (!scope.current) return
    const images = scope.current.querySelectorAll('img')
    // Ensure animate and stagger are correctly imported and used if needed
    // animate(images, { opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.15) })
  }, [])

  // Added check for null product
  if (!product) {
    return (
      <section className="relative w-full min-h-screen bg-contrast flex items-center justify-center">
        <p className="text-primary/50">Loading product...</p>
      </section>
    );
  }

  return (
    // Restoring original section structure
    <section className="relative w-full min-h-screen bg-contrast overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      
      <div
        className="relative container mx-auto px-4 pt-32 pb-16 flex flex-col items-center justify-between min-h-screen"
        ref={scope} // Keep ref if used by original useEffect
      >
        {/* Hero Header */}
        <motion.div
          className="relative z-10 text-center space-y-6 items-center flex flex-col w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.88, delay: 0.5 }}
        >
          <h1 className="text-[8rem] md:text-[12rem] lg:text-[16rem] text-primary font-light tracking-tight lowercase w-full leading-none">
            glow <span className="text-red-400">•</span>up.
          </h1>
          <p className="text-lg md:text-xl text-primary/80 font-light max-w-xl text-center px-4">
            cellular renewal, powered by precision light.
          </p>
        </motion.div>

        {/* Featured Product */}
        <motion.div 
          className="relative z-20 w-full max-w-6xl mx-auto mt-12 mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-light text-primary">{product?.title}</h2>
                <p className="text-xl text-primary/60">Advanced Red Light Therapy Device</p>
              </div>
              <p className="text-primary/80">Transform your hair care routine with cutting-edge red light therapy technology.</p>
              <div className="flex items-center gap-3">
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
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Temporarily comment out button usage */}
                {/* {firstVariant?.availableForSale && (
                  <ShimmerButton
                    as={Link}
                    to={`/cart?lines=${firstVariant.id}:1`}
                    className="w-full sm:w-auto"
                  >
                    Add to Cart
                  </ShimmerButton>
                )} */}
                {/* <Button
                  as={Link}
                  to={`/products/${product?.handle}`}
                  variant="secondary"
                  className="w-full sm-w-auto"
                >
                  Learn More
                </Button> */}
              </div>
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden">
              {featuredImage && (
                <img 
                  src={featuredImage.url}
                  alt={featuredImage.altText || product?.title || "Product Image"}
                  className="w-full h-full object-cover"
                  width={featuredImage.width || 800}
                  height={featuredImage.height || 800}
                  // Removed onLoad if not needed
                  // onLoad={() => setIsImageLoaded(true)}
                />
              )}
            </div>
          </div>
        </motion.div>

        {/* Floating Background Images - Applying z-index and overflow fixes */}
        {/* Added z-5 to ensure it's above other default absolute background layers */}
        <div className="absolute inset-0 pointer-events-none z-5">
          <Floating sensitivity={0.5} className="overflow-hidden">
            {heroImagesData.map((imageData, index) => {
              // Use the array and modulo 5 to cycle through the 5 unique images
              const imageUrl = uniqueHeroImageUrls[index % 5]; // <-- Use the array
              // Update alt text for better description
              const imageAlt = `Hero background image ${index + 1}`; // <-- Use new alt text
              return (
                <FloatingElement
                  key={index}
                  depth={imageData.depth}
                  className={imageData.position}
                >
                  {/* Ensure overflow-hidden is applied to the direct image container */}
                  <motion.div
                    className="relative rounded-lg overflow-hidden shadow-lg"
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.5, delay: index * 0.15}}
                  >
                    <motion.img
                      src={imageUrl}
                      alt={imageAlt}
                      className={`
                        ${imageData.size}
                        object-cover transition-transform duration-300 hover:scale-110 w-full h-full // Added w-full h-full for certainty
                      `}
                      loading="eager"
                    />
                  </motion.div>
                </FloatingElement>
              );
            })}
          </Floating>
        </div>
        

      </div>
    </section>
  )
}