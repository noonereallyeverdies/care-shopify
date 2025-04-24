import { motion } from "framer-motion";
import { ButtonLink } from "~/components/ui/buttons/Button";
import { ArrowRight } from "lucide-react";
import type { HomepageProduct } from '~/routes/($locale)._index'; // Import the type
import { AddToCartButton } from '~/components/AddToCartButton'; // Import AddToCartButton

interface ProductHighlightProps {
  product: HomepageProduct | null; // Define the prop type
}

export function ProductHighlight({ product }: ProductHighlightProps) { // Destructure product from props
  // Use product image if available, otherwise use placeholder
  const productImageUrl = product?.featuredImage?.url || "/images/photonique-touch-product.png"; 
  const firstVariant = product?.variants?.nodes[0];
  const firstVariantId = firstVariant?.id;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, delay: 0.2 }
    }
  };
  
  const scaleUp = {
    initial: { scale: 0.95, opacity: 0 },
    whileInView: { scale: 1, opacity: 1, transition: { duration: 0.6, delay: 0.4 }},
    viewport: { once: true }
  };

  // Handle case where product is not loaded
  if (!product || !firstVariantId) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <p>Loading product details...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="bg-gradient-to-br from-neutral-50 via-white to-rose-50 p-8 md:p-12 rounded-2xl shadow-sm border border-neutral-100 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          {/* Text Content */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-tight">
              meet {product.title} {/* Use product title */}
            </h2>
            <p className="text-neutral-600 text-lg mb-6 md:mb-8 max-w-md mx-auto md:mx-0">
              Our revolutionary device combines red light therapy, scalp massage, and precise serum application for your healthiest hair.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              {/* Add To Cart Button */}
              <AddToCartButton
                lines={[
                  {
                    merchandiseId: firstVariantId,
                    quantity: 1,
                  },
                ]}
                variant="primary"
                className="w-full sm:w-auto text-lg group"
              >
                Add to Cart
                <ArrowRight size={18} className="ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"/>
              </AddToCartButton>
              <ButtonLink 
                to={`/products/${product.handle}`} // Use product handle for link
                variant="outline"
                size="md"
                className="border-neutral-300 text-neutral-700 hover:border-rose-300 hover:text-rose-500 w-full sm:w-auto"
              >
                view details
              </ButtonLink>
              {/* Removed science link for brevity, can be added back */}
            </div>
          </div>

          {/* Image */}
          <motion.div 
            className="flex justify-center items-center"
             initial="initial"
             whileInView="whileInView"
             viewport={scaleUp.viewport}
             variants={scaleUp}
          >
            <img 
              src={productImageUrl} // Use product image URL
              alt={product.featuredImage?.altText || product.title} // Use alt text or title
              className="max-w-xs md:max-w-sm object-contain drop-shadow-lg"
              loading="lazy"
              onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  // Fallback placeholder
                  target.src = "https://cdn.shopify.com/s/files/1/0XXX/XXXX/files/placeholder-image.png?v=YYYYYY"; 
                  target.onerror = null; 
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 