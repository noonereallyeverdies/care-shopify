import {useRef, Suspense, useState, useEffect} from 'react';
import {Disclosure, Listbox} from '@headlessui/react';
import {
  defer,
  type MetaArgs,
  type LoaderFunctionArgs,
  json,
  redirect,
  type ActionFunctionArgs,
} from '@shopify/remix-oxygen';
import {
  useLoaderData, 
  Await, 
  useNavigate,
  Form,
  useActionData,
  useNavigation,
  useParams,
  useRouteError,
} from '@remix-run/react';
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
  Image,
  CartForm,
} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';
import clsx from 'clsx';
import type {
  Maybe,
  ProductOptionValueSwatch,
} from '@shopify/hydrogen/storefront-api-types';

import type {ProductFragment} from 'storefrontapi.generated';
import {Heading, Section, Text} from '~/components/Text';
import {Link} from '~/components/Link';
import {Button} from '~/components/Button';
import {AddToCartButton} from '~/components/AddToCartButton';
import {ProductSwimlane} from '~/components/ProductSwimlane';
import {ProductGallery} from '~/components/ProductGallery';
import {IconCaret, IconCheck, IconClose} from '~/components/Icon';
import {getExcerpt} from '~/lib/utils';
import {seoPayload} from '~/lib/seo.server';
import type {Storefront} from '~/lib/type';
import {routeHeaders} from '~/data/cache';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {StarRating} from '~/components/StarRating';
import {ProductAssessment} from '~/components/ProductAssessment';

// Simple mapping for color names to CSS colors (moved here)
const colorMap: Record<string, string> = {
  'black': '#000000',
  'white': '#FFFFFF',
  'silver': '#C0C0C0',
  'graphite': '#383838',
  'rose gold': '#B76E79', // Example, adjust as needed
  'pink': '#FFC0CB',
  'red': '#FF0000',
  'blue': '#0000FF',
  'green': '#008000',
  // Add more colors as needed
};

// Define color options with their styling properties
const PRODUCT_COLORS = {
  'Rose Gold': {
    bg: 'bg-rose-100',
    text: 'text-rose-900',
    border: 'border-rose-200',
    hex: '#FFB4B4'
  },
  'Midnight Black': {
    bg: 'bg-gray-900',
    text: 'text-white',
    border: 'border-gray-700',
    hex: '#1F2937'
  },
  'Ocean Blue': {
    bg: 'bg-blue-100',
    text: 'text-blue-900',
    border: 'border-blue-200',
    hex: '#93C5FD'
  },
  'Lavender': {
    bg: 'bg-purple-100',
    text: 'text-purple-900',
    border: 'border-purple-200',
    hex: '#E9D5FF'
  },
  'Pink': '#FFB6C1',
};

export const headers = routeHeaders;

export async function loader(args: LoaderFunctionArgs) {
  const {params, request, context} = args;
  const {productHandle} = params;
  invariant(productHandle, 'Missing productHandle param, check route filename');

  const selectedOptions = getSelectedProductOptions(request);

  // Fetch product data from Shopify
  const {product, shop} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: productHandle,
      selectedOptions,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  if (!product?.id) {
    throw new Response('Product not found', {status: 404});
  }

  // Fetch recommended products
  const recommended = getRecommendedProducts(context.storefront, product.id);
  
  // Set up variants
  const selectedVariant = product.selectedVariant ?? product.variants.nodes[0];
  
  const seo = seoPayload.product({
    product,
    selectedVariant,
    url: request.url,
  });

  return defer({
    product,
    selectedVariant,
    shop,
    storeDomain: shop.primaryDomain.url,
    recommended,
    seo,
  });
}

export const meta = ({data}: MetaArgs<typeof loader>) => {
  return getSeoMeta(data?.seo);
};

export default function Product() {
  const {product, shop, recommended, selectedVariant, storeDomain} =
    useLoaderData<typeof loader>();

  if (!product) {
    return <div className="p-8 text-center">Product not found</div>;
  }

  const {title, vendor, media, descriptionHtml} = product;
  
  return (
    <>
      {/* Premium Header Banner */}
      <div className="bg-gradient-to-r from-rose-600 to-rose-500 text-white py-3 px-4 text-center">
        <p className="text-sm font-medium tracking-wider">
          FREE SHIPPING ON ORDERS OVER $75 | 60-DAY SATISFACTION GUARANTEE
        </p>
      </div>
      
      <Section className="px-4 md:px-8 lg:px-12 py-8 md:py-12 bg-contrast">
        <div className="text-center mb-8">
          <Heading as="h1" className="text-2xl font-bold">{title}</Heading>
          {vendor && <Text>{vendor}</Text>}
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* Product Image */}
          <div>
            {media?.nodes[0]?.image && (
              <Image
                data={media.nodes[0].image}
                sizes="(min-width: 64em) 60vw, 90vw"
                aspectRatio="4/5"
                alt={`Product image of ${title}`}
                className="object-cover w-full h-full"
              />
            )}
          </div>
          
          {/* Product Details */}
          <div>
            <div className="prose">
              <div dangerouslySetInnerHTML={{__html: descriptionHtml || ''}} />
            </div>
            
            {selectedVariant?.price && (
              <div className="mt-4">
                <Money data={selectedVariant.price} />
              </div>
            )}
            
            <div className="mt-4">
              <AddToCartButton
                lines={[{
                  merchandiseId: selectedVariant?.id,
                  quantity: 1
                }]}
                variant="primary"
              >
                Add to Cart
              </AddToCartButton>
            </div>
          </div>
        </div>
      </Section>
      
      <Suspense fallback={<div>Loading recommended products...</div>}>
        <Await
          errorElement="There was a problem loading related products"
          resolve={recommended}
        >
          {(products) => (
            <ProductSwimlane title="You might also like" products={products} />
          )}
        </Await>
      </Suspense>
    </>
  );
}

export function ProductForm({
  productOptions,
  selectedVariant,
  storeDomain,
}: {
  productOptions: MappedProductOptions[];
  selectedVariant: any; // Allow more flexible type
  storeDomain: string;
}) {
  const {state} = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [currentVariant, setCurrentVariant] = useState(selectedVariant);
  const [showError, setShowError] = useState(false);
  const [optionSelections, setOptionSelections] = useState(
    selectedVariant?.selectedOptions || []
  );
  const navigate = useNavigate();
  
  // ---> Add state to track client-side mount
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  // <--- End client-side tracking

  // Update local state when selectedVariant prop changes (e.g., via URL)
  useEffect(() => {
    if (selectedVariant) {
      setCurrentVariant(selectedVariant);
      setOptionSelections(selectedVariant.selectedOptions);
    }
  }, [selectedVariant]);

  const handleOptionChange = (optionName: string, value: string) => {
    const newSelections = [...optionSelections];
    const existingOptionIndex = newSelections.findIndex(
      option => option.name === optionName
    );

    if (existingOptionIndex !== -1) {
      newSelections[existingOptionIndex].value = value;
    } else {
      newSelections.push({name: optionName, value});
    }

    setOptionSelections(newSelections);

    // Find the variant that matches all current selections
    const matchedVariant = productOptions.find(variantOption => {
      return variantOption.selectedOptions.every(option => {
        const selection = newSelections.find(sel => sel.name === option.name);
        return selection?.value === option.value;
      });
    });

    if (matchedVariant) {
      // Update the URL without full page reload
      navigate(matchedVariant.to, { replace: true, preventScrollReset: true });
      // setCurrentVariant is now handled by the useEffect hook watching selectedVariant
    }
  };

  const isOutOfStock = !currentVariant?.availableForSale;
  const isLoading = state !== 'idle';

  return (
    <div className="grid gap-6">
      {/* Options selector - MODIFIED */}
      {productOptions.map(option => (
        <div key={option.name} className="grid gap-2">
          <h3 className="text-sm font-medium text-neutral-900">{option.name}</h3>
          <div className="flex flex-wrap gap-2">
            {option.values.map(value => {
              const isSelected = optionSelections.some(
                selection => selection.name === option.name && selection.value === value
              );

              // Check if this is the Color option
              if (option.name.toLowerCase() === 'color') {
                const backgroundColor = colorMap[value.toLowerCase()] || value; // Use mapped color or value itself as fallback
                
                return (
                  <button
                    key={`${option.name}-${value}`}
                    onClick={() => handleOptionChange(option.name, value)}
                    aria-label={`Select ${option.name} ${value}`}
                    className={`w-8 h-8 rounded-full border-2 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-black/50
                      ${isSelected 
                        ? 'ring-2 ring-offset-1 ring-black border-black' 
                        : 'border-neutral-300 hover:border-neutral-500'
                      }
                      ${backgroundColor === '#FFFFFF' ? 'shadow-sm' : ''} // Add shadow for white swatch
                    `}
                    style={{ backgroundColor: backgroundColor }}
                    title={value} // Show color name on hover
                  >
                    {/* Optional: Add a checkmark for selected white swatch */}
                    {isSelected && backgroundColor === '#FFFFFF' && (
                      <svg className="w-4 h-4 text-black mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                );
              } else {
                // Render default text button for other options
                return (
                  <button
                    key={`${option.name}-${value}`}
                    onClick={() => handleOptionChange(option.name, value)}
                    className={`px-3 py-2 text-sm rounded-md border transition
                      ${
                        isSelected
                          ? 'border-black bg-black text-white'
                          : 'border-neutral-200 hover:border-neutral-400'
                      }
                    `}
                  >
                    {value}
                  </button>
                );
              }
            })}
          </div>
        </div>
      ))}

      {/* Quantity selector - Assuming this part is correct */}
      <div className="flex flex-col gap-2 mt-2">
        <Heading as="legend" size="lead" className="text-primary font-medium mb-2">
          Quantity
        </Heading>
        <div className="flex items-center border border-neutral-300 rounded-lg w-32">
          <button 
            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
            className="w-8 h-10 flex items-center justify-center text-primary hover:bg-neutral-100"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <input 
            type="number" 
            min="1"
            value={quantity} 
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 h-10 text-center border-none focus:outline-none text-primary"
          />
          <button 
            onClick={() => setQuantity(prev => prev + 1)}
            className="w-8 h-10 flex items-center justify-center text-primary hover:bg-neutral-100"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Purchase Controls */}
      <PurchaseControls 
         selectedVariant={currentVariant} 
         storeDomain={storeDomain} 
         quantity={quantity} 
       />

      {/* Shop Pay button - Conditionally render based on isClient */}
      {isClient && currentVariant && (
        <div className="mt-2">
          <ShopPayButton
            variantIds={[currentVariant.id]}
            storeDomain={storeDomain} // Use prop here, not window.location.host
            className="w-full"
          />
        </div>
      )}

      {/* Error message */}
      {showError && (
        <div className="text-red-500 text-sm">
          {currentVariant?.quantityAvailable != null && quantity > currentVariant.quantityAvailable
            ? `Only ${currentVariant.quantityAvailable} in stock`
            : 'Unable to add to cart'}
        </div>
      )}
    </div>
  );
}

function ProductPrice({
  selectedVariant, 
  className
}: {
  selectedVariant: any; // Allow more flexible type
  className?: string;
}) {
  if (!selectedVariant) return null;

  const isOnSale =
    selectedVariant?.price?.amount &&
    selectedVariant?.compareAtPrice?.amount &&
    selectedVariant?.price?.amount < selectedVariant?.compareAtPrice?.amount;

  return (
    <div className={`flex items-baseline gap-3 ${className}`}>
      <Money
        withoutTrailingZeros
        data={selectedVariant.price!}
        as="span"
        className="text-2xl font-semibold text-primary"
      />
      {isOnSale && (
        <Money
          withoutTrailingZeros
          data={selectedVariant.compareAtPrice!}
          as="span"
          className="opacity-60 line-through text-lg"
        />
      )}
      {isOnSale && (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
          Save {Math.round((1 - Number(selectedVariant.price.amount) / Number(selectedVariant.compareAtPrice.amount)) * 100)}%
        </span>
      )}
    </div>
  );
}

function PurchaseControls({
  selectedVariant, 
  storeDomain,
  quantity
}: {
  selectedVariant: any; // Allow more flexible type
  storeDomain: string;
  quantity: number;
}) {
  if (!selectedVariant) return null;

  const isOutOfStock = !selectedVariant.availableForSale;

  return (
    <div className="grid items-stretch gap-4">
      {isOutOfStock ? (
        <Button variant="secondary" disabled className="opacity-70 cursor-not-allowed">
          <Text className="text-primary/80">Sold Out</Text>
        </Button>
      ) : (
        <AddToCartButton
          lines={[
            {
              merchandiseId: selectedVariant.id!,
              quantity,
            },
          ]}
          className="w-full bg-accent text-contrast uppercase text-sm font-medium tracking-wider rounded-full hover:opacity-90 transition-opacity py-4 px-6 flex items-center justify-center gap-2"
          data-test="add-to-cart"
        >
          <span>Add to Cart</span>
        </AddToCartButton>
      )}
      
      <Button variant="secondary" className="rounded-full py-4 px-6 uppercase">
        <Text>Buy Now</Text>
      </Button>
    </div>
  );
}

function ProductDetail({
  title,
  content,
  learnMore,
}: {
  title: string;
  content: string;
  learnMore?: string;
}) {
  return (
    <Disclosure key={title} as="div" className="grid w-full gap-2">
      {({open}) => (
        <>
          <Disclosure.Button className="text-left py-3 border-b border-primary/10 hover:bg-stone-100 px-1 transition-colors">
            <div className="flex justify-between items-center">
              <Text size="lead" as="h4" className="font-medium text-primary">
                {title}
              </Text>
              <span className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
                <IconCaret />
              </span>
            </div>
          </Disclosure.Button>

          <Disclosure.Panel className={'pb-4 pt-2 grid gap-3 px-1'}>
            <div
              className="prose prose-sm max-w-none text-primary/80 leading-relaxed"
              dangerouslySetInnerHTML={{__html: content}}
            />
            {learnMore && (
              <div className="">
                <Link
                  className="pb-px border-b border-primary/20 text-primary/60 hover:text-primary hover:border-primary/40 text-xs transition-colors"
                  to={learnMore}
                >
                  Learn More
                </Link>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

async function getRecommendedProducts(
  storefront: Storefront,
  productId: string,
) {
  const products = await storefront.query(RECOMMENDED_PRODUCTS_QUERY, {
    variables: {
      productId,
      count: 4,
    },
  });

  invariant(products, 'No data returned from Shopify API');

  const mergedProducts = products.recommended
    .concat(products.additional.nodes)
    .filter(
      (value, index, array) =>
        array.findIndex((value2) => value2.id === value.id) === index,
    );

  const originalProduct = mergedProducts.findIndex(
    (item) => item.id === productId,
  );

  if (originalProduct !== -1) {
    mergedProducts.splice(originalProduct, 1);
  }

  return mergedProducts;
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    id
    availableForSale
    selectedOptions {
      name
      value
    }
    image {
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
    sku
    title
    product {
      title
      handle
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    options {
      name
      values
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    variants(first: 100) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
    media(first: 7) {
      nodes {
        ...Media
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
    shop {
      name
      primaryDomain {
        url
      }
      shippingPolicy {
        body
        handle
      }
      refundPolicy {
        body
        handle
      }
    }
  }
  ${MEDIA_FRAGMENT}
  ${PRODUCT_FRAGMENT}
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query productRecommendations(
    $productId: ID!
    $count: Int
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    recommended: productRecommendations(productId: $productId) {
      ...ProductCard
    }
    additional: products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-light mb-4">Product Not Found</h1>
      <p className="mb-6">We couldn't find the product you're looking for.</p>
      <Button asChild>
        <Link to="/collections/all">Continue Shopping</Link>
      </Button>
    </div>
  );
} 