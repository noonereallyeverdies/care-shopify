import { useRef, Suspense, useState, useEffect } from 'react';
import { Disclosure, Listbox } from '@headlessui/react';
import {
  defer,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import { useLoaderData, Await, useNavigate, Link } from '@remix-run/react';
import {
  getSeoMeta,
  Money,
  ShopPayButton,
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
  getProductOptions,
  type MappedProductOptions,
  VariantSelector,
  useCart,
  Image,
  CartForm,
} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';
import clsx from 'clsx';
import type {
  Maybe,
  ProductOptionValueSwatch,
} from '@shopify/hydrogen/storefront-api-types';

import type { ProductFragment } from 'storefrontapi.generated';
import { Heading, Section, Text } from '~/components/Text';
import { Button } from '~/components/Button';
import { AddToCartButton } from '~/components/AddToCartButton';
import { Skeleton } from '~/components/Skeleton';
import { ProductSwimlane } from '~/components/ProductSwimlane';
import { ProductGallery } from '~/components/ProductGallery';
import { IconCaret, IconCheck, IconClose } from '~/components/Icon';
import { getExcerpt } from '~/lib/utils';
import { seoPayload } from '~/lib/seo.server';
import type { Storefront } from '~/lib/type';
import { routeHeaders } from '~/data/cache';
import { MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT } from '~/data/fragments';

// Define color map as a fallback
const colorMap: Record<string, string> = {
  'lavender': '#E6E6FA',
  'black': '#000000',
  'white': '#FFFFFF',
  'silver': '#C0C0C0',
  'graphite': '#383838',
  'rose gold': '#B76E79',
  'pink': '#FFC0CB',
  'red': '#FF0000',
  'blue': '#0000FF',
  'green': '#008000',
  // Add other colors from your product options, lowercase
};

export const headers = routeHeaders;

export function ProductForm({
  productOptions,
  selectedVariant,
  storeDomain,
  product,
}: {
  product: ProductFragment;
  productOptions: MappedProductOptions[];
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
  storeDomain: string;
}) {
  const { lines, status: cartStatus, linesAdd } = useCart();
  const { state } = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [currentVariant, setCurrentVariant] = useState(selectedVariant);
  const [showError, setShowError] = useState(false);
  const [optionSelections, setOptionSelections] = useState(
    selectedVariant?.selectedOptions || []
  );
  const navigate = useNavigate();

  return (
    <div className="grid gap-8">
      <div className="grid gap-4">
        {productOptions.map((option, optionIndex) => (
          <div
            key={option.name}
            className="flex flex-col flex-wrap mb-2 gap-y-3"
          >
            <Heading as="legend" size="lead" className="min-w-[4rem] text-primary font-medium lowercase mb-1">
              {option.name}
            </Heading>
            <div className="flex flex-wrap items-center gap-3">
              {option.optionValues.map(
                ({
                  isDifferentProduct,
                  name,
                  variantUriQuery,
                  handle,
                  selected,
                  available,
                  swatch,
                }) => {
                  const isColor = option.name.toLowerCase() === 'color';

                  // Determine background color: Swatch > Map > Transparent
                  const cssColorFromMap = isColor ? (colorMap[name.toLowerCase()] || 'transparent') : 'transparent'; 
                  const backgroundColor = isColor ? (swatch?.color || cssColorFromMap) : 'transparent';
                  const backgroundImage = swatch?.image?.previewImage?.url;

                  return (
                    // Wrapper div for swatch + name
                    <div key={`${option.name}-${name}`} className="flex flex-col items-center gap-1 text-center">
                      <Link
                        {...(!isDifferentProduct ? {rel: 'nofollow'} : {})}
                        to={`/products/${product.handle}?${variantUriQuery}`}
                        preventScrollReset
                        prefetch="intent"
                        replace
                        className={clsx(
                          'border border-primary/10 transition-all duration-200 relative overflow-hidden flex items-center justify-center', 
                          isColor ? 'rounded-full w-8 h-8' : 'rounded px-3 py-1 text-sm',
                          selected ? 'ring-2 ring-offset-1 ring-accent' : '',
                          available ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed',
                          !isColor && (selected ? 'bg-primary/10 text-primary' : 'bg-contrast text-primary/80 hover:bg-primary/5'),
                          isColor && backgroundColor === '#FFFFFF' && !backgroundImage && 'shadow-sm'
                        )}
                        style={isColor ? {
                          backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
                        } : {}}
                        aria-label={name}
                        title={name}
                      >
                        {isColor && backgroundImage && (
                           <img src={backgroundImage} alt={name} className="absolute inset-0 w-full h-full object-cover rounded-full" /> 
                        )}
                        {isColor && selected && !backgroundImage && (
                           <IconCheck className={`w-4 h-4 ${backgroundColor === '#FFFFFF' ? 'text-black' : 'text-white'}`}/> 
                        )}
                        {!isColor && name}
                      </Link>
                      {isColor && (
                        <span className="text-xs text-neutral-600 mt-1 whitespace-nowrap">{name}</span>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        ))}
      </div>
      <AddToCartButton
        lines={[{
          merchandiseId: selectedVariant?.id || '',
          quantity: quantity,
        }]}
        variant="primary"
        data-test="add-to-cart"
        disabled={!selectedVariant?.availableForSale}
      >
        {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
      </AddToCartButton>
    </div>
  );
}

// ... existing code ... 