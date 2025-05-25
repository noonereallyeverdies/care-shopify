import {Money, ShopPayButton} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import React, { useState, useMemo, useEffect } from 'react';
import {Section} from '~/components/Text';
import type {HomepageProduct} from '~/routes/($locale)._index';
import {ShimmerButton} from '~/components/ui/ShimmerButton';

// Define props to accept the product data
interface FeaturedProductProps {
  product: HomepageProduct;
  storeDomain: string;
}

// Helper to get unique option values (assuming one option like Color for simplicity)
const getProductOptions = (product: HomepageProduct) => {
  if (!product || !product.variants?.nodes || product.variants.nodes.length === 0) {
    return { optionName: null, values: [] };
  }
  // Assuming the relevant option is the first one defined
  const firstOptionName = product.variants.nodes[0]?.selectedOptions?.[0]?.name;
  if (!firstOptionName) {
    return { optionName: null, values: [] };
  }

  const values = new Set<string>();
  product.variants.nodes.forEach(variant => {
    variant.selectedOptions.forEach(option => {
      if (option.name === firstOptionName) {
        values.add(option.value);
      }
    });
  });

  return { optionName: firstOptionName, values: Array.from(values) };
};

export function FeaturedProduct({product, storeDomain}: FeaturedProductProps) {
  if (!product) return null;

  // Get the first variant as default, handle no variants case
  const defaultVariant = product.variants?.nodes?.[0];
  if (!defaultVariant) return null;

  // State for the currently selected variant
  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);

  // Memoize options extraction
  const { optionName, values: optionValues } = useMemo(() => getProductOptions(product), [product]);

  // Update selected variant if the product changes (edge case)
  useEffect(() => {
     setSelectedVariant(product.variants?.nodes?.[0] || defaultVariant);
  }, [product, defaultVariant]);

  // Find the variant that matches the selected option value
  const handleOptionValueClick = (value: string) => {
    if (!optionName) return;
    const variant = product.variants.nodes.find(v => 
      v.selectedOptions.some(opt => opt.name === optionName && opt.value === value)
    );
    if (variant) {
      setSelectedVariant(variant);
    }
  };

  const cartUrl = `/cart?lines=${selectedVariant.id}:1`;

  return (
    <Section 
      as="section" 
      padding="all" 
      className="w-full max-w-4xl mx-auto bg-contrast rounded-lg shadow-sm"
    >
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Product Image - Consider updating based on selectedVariant if images differ */}
        {product.featuredImage && (
          <div className="aspect-square overflow-hidden rounded-md">
            <img
              src={product.featuredImage.url} // Keep featured image for now
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
          
          {/* Variant Options (Swatches) */}
          {optionName && optionValues.length > 1 && (
            <div className="mt-2">
              <h3 className="text-sm font-medium text-primary/80 mb-2">{optionName}:</h3>
              <div className="flex flex-wrap gap-2">
                {optionValues.map((value) => {
                  const isActive = selectedVariant.selectedOptions.some(
                    opt => opt.name === optionName && opt.value === value
                  );
                  // Basic swatch styling - enhance as needed (e.g., color backgrounds)
                  return (
                    <button
                      key={value}
                      onClick={() => handleOptionValueClick(value)}
                      className={`px-3 py-1 text-sm rounded-full border transition-colors ${isActive ? 'border-primary bg-primary/10 text-primary' : 'border-neutral-300 text-neutral-700 hover:border-neutral-500'}`}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price - Updated to use selectedVariant */}
          <div className="flex gap-4 items-baseline mt-4">
            <Money
              withoutTrailingZeros
              data={selectedVariant.price} // Use selected variant's price
              as="span"
              className="text-xl font-semibold text-primary"
            />
            {selectedVariant.compareAtPrice && (
              <Money
                withoutTrailingZeros
                data={selectedVariant.compareAtPrice} // Use selected variant's compare price
                as="span"
                className="line-through text-primary/60"
              />
            )}
          </div>

          {/* Add to Cart and Shop Pay - Updated to use selectedVariant */}
          <div className="flex flex-col gap-3 mt-4">
            <ShimmerButton
              as={Link}
              to={cartUrl} // Uses selectedVariant.id
              className="w-full"
              disabled={!selectedVariant.availableForSale} // Use selected variant's availability
            >
              {selectedVariant.availableForSale ? 'Add to Cart' : 'Sold Out'}
            </ShimmerButton>
            {selectedVariant.availableForSale && (
              <ShopPayButton
                storeDomain={storeDomain}
                variantIdsAndQuantities={[{ id: selectedVariant.id, quantity: 1 }]} // Use selected variant's id
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