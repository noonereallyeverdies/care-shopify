import { useEffect, useRef, useState } from "react"
import { animate, stagger } from "@motionone/dom"
import { motion } from "framer-motion"
import Floating, { FloatingElement } from "~/components/ui/Floating"
import { Link } from "@remix-run/react"
import { Button } from "~/components/Button"
import { ShimmerButton } from "~/components/ui/ShimmerButton"
import { Money } from "@shopify/hydrogen"
import type {HomepageProduct} from '~/routes/($locale)._index';

const heroImages = [
  {
    url: "https://plus.unsplash.com/premium_photo-1661774645265-a1c2f74f02e3?w=400&h=400&fit=crop&q=80",
    title: "Professional Hair Care",
  },
  {
    url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop&q=80",
    title: "Luxurious Hair Treatment",
  },
  {
    url: "https://images.unsplash.com/photo-1584670747417-594a9412fba5?w=400&h=400&fit=crop&q=80",
    title: "Scientific Research",
  },
  {
    url: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=400&fit=crop&q=80",
    title: "Professional Salon",
  },
  {
    url: "https://images.unsplash.com/photo-1580130775562-0ef92da028de?w=400&h=400&fit=crop&q=80",
    title: "Advanced Technology",
  },
  {
    url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=400&fit=crop&q=80",
    title: "Hair Analysis",
  }
]

interface HeroProps {
  product: HomepageProduct;
}

export function Hero({ product }: HeroProps) {
  const scope = useRef<HTMLDivElement>(null)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const firstVariant = product?.variants?.nodes[0]
  const featuredImage = product?.featuredImage

  useEffect(() => {
    if (!scope.current) return
    const images = scope.current.querySelectorAll('img')
    animate(images, { opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.15) })
  }, [])

  return (
    <section className="relative w-full min-h-screen bg-contrast overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      
      <div
        className="relative container mx-auto px-4 pt-32 pb-16 flex flex-col items-center justify-between min-h-screen"
        ref={scope}
      >
        {/* Hero Header */}
        <motion.div
          className="relative z-10 text-center space-y-6 items-center flex flex-col w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.88, delay: 0.5 }}
        >
          <h1 className="text-[8rem] md:text-[12rem] lg:text-[16rem] text-primary font-light tracking-tight lowercase w-full leading-none">
            care<span className="text-red-400">•</span>atin
          </h1>
          <p className="text-lg md:text-xl text-primary/80 font-light max-w-xl text-center px-4">
            Discover the science of red light therapy for transformative hair care
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
                {firstVariant?.availableForSale && (
                  <ShimmerButton
                    as={Link}
                    to={`/cart?lines=${firstVariant.id}:1`}
                    className="w-full sm:w-auto"
                  >
                    Add to Cart
                  </ShimmerButton>
                )}
                <Button
                  as={Link}
                  to={`/products/${product?.handle}`}
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Learn More
                </Button>
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
                  onLoad={() => setIsImageLoaded(true)}
                />
              )}
            </div>
          </div>
        </motion.div>

        {/* Floating Background Images */}
        <div className="absolute inset-0 pointer-events-none">
          <Floating sensitivity={0.5} className="overflow-hidden">
            {heroImages.map((image, index) => (
              <FloatingElement
                key={index}
                depth={[0.5, 1, 2, 1, 1, 2][index]}
                className={[
                  "top-[15%] left-[8%]",
                  "top-[12%] right-[12%]",
                  "top-[45%] left-[15%]",
                  "top-[35%] right-[8%]",
                  "bottom-[20%] left-[12%]",
                  "bottom-[25%] right-[15%]"
                ][index]}
              >
                <motion.div
                  className="relative rounded-lg overflow-hidden shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <motion.img
                    src={image.url}
                    alt={image.title}
                    className={`
                      ${[
                        "w-24 h-24 md:w-32 md:h-32",
                        "w-32 h-32 md:w-40 md:h-40",
                        "w-28 h-28 md:w-36 md:h-36",
                        "w-24 h-24 md:w-32 md:h-32",
                        "w-32 h-32 md:w-40 md:h-40",
                        "w-28 h-28 md:w-36 md:h-36"
                      ][index]}
                      object-cover transition-transform duration-300 hover:scale-110
                    `}
                    loading="eager"
                  />
                </motion.div>
              </FloatingElement>
            ))}
          </Floating>
        </div>
      </div>
    </section>
  )
}