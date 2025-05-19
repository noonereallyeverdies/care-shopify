// import { Link } from '@remix-run/react'; // Removed duplicate
import {
  Image,
  Money,
  type ShopifyAnalyticsProduct,
} from '@shopify/hydrogen';
import { motion } from 'framer-motion';
// Import the specific query type for the product data
import type { HomepageProductQuery } from '../../storefrontapi.generated'; 
import { Link } from '@remix-run/react'; // Keep this one

// Import the CSS file
import './DeviceSpotlight.css';

// Placeholder component to display the main RLT device

interface DeviceSpotlightProps {
  // Use the specific type from the query result
  product: HomepageProductQuery['product']; 
}

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, delay: 0.1 } }
};

const contentVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

export function DeviceSpotlight({ product }: DeviceSpotlightProps) {
  const placeholderImageUrl = '/images/PRODUCTPHOTOT.png'; // Placeholder device image

  if (!product) {
    return (
      // Add loading placeholder class
      <section className="device-spotlight loading-placeholder">
        <h2>Our Signature Device</h2>
        <p>Loading product details...</p>
      </section>
    );
  }

  // Now property access should be type-safe
  const image = product.featuredImage;
  const firstVariant = product.variants?.nodes?.[0];
  const handle = product.handle;
  // Destructure description separately to potentially override it
  const { title, descriptionHtml, variants, description: originalDescription } = product;
  const price = firstVariant?.price;

  // --- Enhanced Science-Focused Description ---
  const scienceDescription = `
    <p><strong>Experience the synergy of advanced RLT science with Care-atin.</strong> Our device utilizes precisely calibrated wavelengths, penetrating the scalp to:</p>
    <ul>
      <li><strong>Activate Follicular Receptors:</strong> Initiating growth signals directly at the cellular core for profound revitalization.</li>
      <li><strong>Optimize Scalp Microcirculation:</strong> Flooding follicles with oxygen and vital nutrients essential for robust hair development.</li>
      <li><strong>Fortify Hair Structure:</strong> Promoting demonstrably thicker, more resilient hair growth from the root.</li>
    </ul>
    <p>Integrate this non-invasive, clinically inspired technology into your routine for transformative results.</p>
  `; // Made more grandiose and detailed
  
  const finalDescriptionHtml = descriptionHtml ? scienceDescription : null;
  const finalDescriptionText = !finalDescriptionHtml ? (originalDescription || "Harness advanced Red Light Therapy to reactivate follicles, boost circulation, and achieve visibly fuller, stronger hair.") : null; // Updated fallback text

  // Basic product structure for analytics (can be refined)
  const analyticsProduct: ShopifyAnalyticsProduct = {
    productGid: product.id,
    variantGid: firstVariant?.id || '',
    name: product.title,
    variantName: firstVariant?.title || '', // Assuming variant has title
    brand: product.vendor || '', // Assuming vendor is brand
    price: price?.amount || '0',
  };

  return (
    <motion.section
      className="device-spotlight-section section-padding"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div 
        className="two-column-layout device-spotlight-layout"
      >
        {/* Image Column */}
        <motion.div className="image-column" variants={contentVariants} style={{ willChange: 'transform, opacity' }}>
          {image && (
            <Image
              data={image}
              aspectRatio="1/1" // Adjust aspect ratio as needed
              sizes="(min-width: 45em) 50vw, 100vw"
              className="device-image" // Add class for potential specific styling
            />
          )}
        </motion.div>

        {/* Content Column */}
        <motion.div className="content-column" variants={contentVariants} style={{ willChange: 'transform, opacity' }}>
          <h2 className="device-title">
            {title}
          </h2>
          {/* Use updated description logic */}
          {finalDescriptionHtml ? (
            <div 
              dangerouslySetInnerHTML={{ __html: finalDescriptionHtml }} 
              className="device-description"
            />
          ) : finalDescriptionText ? (
            <p className="device-description">
              {finalDescriptionText}
            </p>
          ) : null}

          {price && (
            <div className="device-price-wrapper">
              <Money 
                data={price} 
                as="span" 
                className="device-price"
              />
              {/* Add CompareAtPrice logic here if needed */}
            </div>
          )}

          {/* For now, link to the product page. Add-to-cart needs more setup. */}
          {handle && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                display: 'inline-block', // To make the div wrap the link
                boxShadow: '0px 0px 0px rgba(0,0,0,0)', // Initial shadow
              }}
              className="cta-motion-wrapper" // Add a class if needed for further styling
            >
              <Link
                to={`/products/${handle}`}
                className="button button--primary button--large"
                style={{
                  display: 'inline-block', // Ensure link itself behaves like a block for padding etc.
                  // Apply base styles here if not covered by existing classes,
                  // or override if Framer Motion needs direct style manipulation.
                  // For boxShadow on hover, it's better handled by Framer Motion's `whileHover`
                }}
                onHoverStart={e => {
                  (e.currentTarget.parentNode as HTMLElement).style.boxShadow = '0px 8px 15px rgba(0, 0, 0, 0.1)';
                }}
                onHoverEnd={e => {
                  (e.currentTarget.parentNode as HTMLElement).style.boxShadow = '0px 0px 0px rgba(0,0,0,0)';
                }}
              >
                View Product Details
              </Link>
            </motion.div>
          )}

        </motion.div>
      </div>
    </motion.section>
  );
} 