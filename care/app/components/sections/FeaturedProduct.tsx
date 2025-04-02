import {Money, ShopPayButton} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import {Section} from '~/components/Text';
import type {HomepageProduct} from '~/routes/($locale)._index';
import {ShimmerButton} from '~/components/ui/ShimmerButton';

// Define props to accept the product data
interface FeaturedProductProps {
  product: HomepageProduct;
  storeDomain: string;
}

export function FeaturedProduct({product, storeDomain}: FeaturedProductProps) {
  if (!product) return null;

  // Get the first variant for price and Add to Cart functionality
  const firstVariant = product.variants?.nodes?.[0];
  if (!firstVariant) return null; // Handle case where product has no variants

  const cartUrl = `/cart?lines=${firstVariant.id}:1`;

  return (
    <Section 
      as="section" 
      padding="all" 
      className="w-full max-w-4xl mx-auto bg-contrast rounded-lg shadow-sm"
    >
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Product Image */}
        {product.featuredImage && (
          <div className="aspect-square overflow-hidden rounded-md">
            <img
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              width={product.featuredImage.width || 800}
              height={product.featuredImage.height || 800}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        {/* Product Info & Actions */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            {product.title}
          </h2>
          
          {/* Price */}
          <div className="flex gap-4 items-baseline">
            <Money
              withoutTrailingZeros
              data={firstVariant.price}
              as="span"
              className="text-xl font-semibold text-primary"
            />
            {firstVariant.compareAtPrice && (
              <Money
                withoutTrailingZeros
                data={firstVariant.compareAtPrice}
                as="span"
                className="line-through text-primary/60"
              />
            )}
          </div>

          {/* Add to Cart and Shop Pay */}
          <div className="flex flex-col gap-3 mt-4">
            <ShimmerButton
              as={Link}
              to={cartUrl}
              className="w-full"
              disabled={!firstVariant.availableForSale}
            >
              {firstVariant.availableForSale ? 'Add to Cart' : 'Sold Out'}
            </ShimmerButton>
            {firstVariant.availableForSale && (
              <ShopPayButton
                storeDomain={storeDomain}
                variantIdsAndQuantities={[{ id: firstVariant.id, quantity: 1 }]}
                className="w-full rounded-md"
              />
            )}
          </div>

          {/* View Details Link */}
          <Link
            to={`/products/${product.handle}`}
            className="text-sm text-primary/80 hover:text-primary underline mt-4 self-start"
          >
            view full details
          </Link>
        </div>
      </div>
    </Section>
  );
} 