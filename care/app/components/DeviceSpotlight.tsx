import type { Product } from '@shopify/hydrogen/storefront-api-types';
import { Image } from '@shopify/hydrogen';
import { Button } from './Shared/Button';
import { Link } from '@remix-run/react';

// Placeholder component to display the main RLT device

interface DeviceSpotlightProps {
  product: Product | null | undefined;
}

export function DeviceSpotlight({ product }: DeviceSpotlightProps) {
  const placeholderImageUrl = '/images/PRODUCTPHOTOT.png'; // Placeholder device image

  if (!product) {
    return (
      <section className="device-spotlight" style={{ padding: 'var(--section-padding-y) var(--container-padding-x)', textAlign: 'center' }}>
        <h2>Our Signature Device</h2>
        <p>Loading product details...</p>
      </section>
    );
  }

  const { title, descriptionHtml, featuredImage, variants } = product;
  const price = variants?.nodes?.[0]?.price; // Get price from first variant

  return (
    <section className="device-spotlight" style={{ padding: 'var(--section-padding-y) var(--container-padding-x)', backgroundColor: 'var(--c-primary-bg)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-xxl)', alignItems: 'center', maxWidth: '1100px', margin: '0 auto' }}>
        {/* Image Column */}
        <div className="device-image">
          {featuredImage ? (
            <Image
              data={featuredImage}
              aspectRatio="1/1" // Adjust as needed
              sizes="(min-width: 45em) 50vw, 100vw"
              style={{ borderRadius: 'var(--border-radius-md)' }}
            />
          ) : (
            <img src={placeholderImageUrl} alt="Placeholder Device Image" style={{ width: '100%', aspectRatio: '1 / 1', borderRadius: 'var(--border-radius-md)', objectFit: 'cover' }}/>
          )}
        </div>

        {/* Content Column */}
        <div className="device-content" style={{ textAlign: 'left' }}>
          <h2>{title}</h2>
          {descriptionHtml && (
            <div
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              style={{ margin: 'var(--space-md) 0 var(--space-xl) 0', color: 'var(--c-primary-text-medium)' }}
            />
          )}
          {price && (
            <p style={{ fontSize: 'var(--font-size-h3)', fontWeight: 'bold', marginBottom: 'var(--space-lg)' }}>
              {`$${parseFloat(price.amount).toFixed(2)} ${price.currencyCode}`}
            </p>
          )}
          <Button to={`/products/${product.handle}`} variant="primary" as={Link}>
            View Device Details
          </Button>
        </div>
      </div>
    </section>
  );
} 