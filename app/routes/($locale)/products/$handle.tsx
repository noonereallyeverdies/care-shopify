import { validateLocaleParameter } from "~/lib/locale-utils";
import {useRef, Suspense, useState, useEffect} from 'react';
import {Disclosure, Listbox} from '~/lib/headlessui-shim';
import {
  defer,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {useLoaderData, Await, useNavigate} from '@remix-run/react';
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
import {Skeleton} from '~/components/Skeleton';
import {ProductSwimlane} from '~/components/ProductSwimlane';
import {ProductGallery} from '~/components/ProductGallery';
import {IconCaret, IconCheck, IconClose} from '~/components/Icon';
import {getExcerpt} from '~/lib/utils';
import {seoPayload} from '~/lib/seo.server';
import type {Storefront} from '~/lib/type';
import {routeHeaders} from '~/data/cache';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {PRODUCT_VARIANT_FRAGMENT} from '~/queries/fragments';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import {
  Form,
  useActionData,
  useNavigation,
  useParams,
  useRouteError,
} from '@remix-run/react';
import {
  json,
  redirect,
  type ActionFunctionArgs,
} from '@shopify/remix-oxygen';
import {
  Image,
  CartForm,
} from '@shopify/hydrogen';
import { getVariantUrl } from '~/lib/variants';
import { StarRating } from '~/components/StarRating';

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
  validateLocaleParameter(args);
  const {params, request, context} = args;
  const {productHandle} = params;
  invariant(productHandle, 'Missing productHandle param, check route filename');

  const selectedOptions = getSelectedProductOptions(request);

  // Fetch product data from Shopify with proper caching
  const {product, shop} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: productHandle,
      selectedOptions,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
    // Use optimal cache strategy for products
    cache: context.storefront.CacheCustom({
      // Store for 10 minutes, but can serve stale for up to 1 day while revalidating
      maxAge: 60 * 10,
      staleWhileRevalidate: 60 * 60 * 24,
    }),
  });

  if (!product?.id) {
    throw new Response('Product not found', {status: 404});
  }

  // Fetch recommended products in parallel with product data
  const recommended = await getRecommendedProducts(context.storefront, product.id);
  
  // Set up variants and SEO
  const selectedVariant = product.selectedOrFirstAvailableVariant ?? {};
  const variants = getAdjacentAndFirstAvailableVariants(product);
  
  const seo = seoPayload.product({
    product: {...product, variants},
    selectedVariant,
    url: request.url,
  });

  // Return with proper cache headers
  return defer(
    {
      product,
      variants,
      shop,
      storeDomain: shop.primaryDomain.url,
      recommended,
      seo,
    },
    {
      headers: {
        // Pass caching headers to the browser
        'Cache-Control': 'public, max-age=600, stale-while-revalidate=86400',
      },
    }
  );
}

export const meta = ({data}: MetaArgs<typeof loader>) => {
  return getSeoMeta(data?.seo);
};

export default function Product() {
  const {product, shop, recommended, variants, storeDomain} =
    useLoaderData<typeof loader>();
  const {media, title, vendor, descriptionHtml} = product;
  const {shippingPolicy, refundPolicy} = shop;

  // Reverted to getting selectedVariant directly
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    variants,
  );
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  // Track selected option in URL for better UX
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  return (
    <>
      {/* Premium Header Banner */}
      <div className="bg-linear-to-r from-rose-600 to-rose-500 text-white py-3 px-4 text-center">
        <p className="text-sm font-medium tracking-wider">
          FREE SHIPPING ON ORDERS OVER $75 | 30-DAY SATISFACTION GUARANTEE
        </p>
      </div>
      
      <Section className="px-4 md:px-8 lg:px-12 py-8 md:py-12 bg-contrast">
        {/* Premium product title section */}
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <Text className="text-sm uppercase tracking-widest text-rose-500 font-medium mb-2">
            Revolutionary Hair Technology
          </Text>
          <Heading as="h1" className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3">
            {title}
          </Heading>
          {vendor && (
            <Text className="text-primary/60 italic">by {vendor}</Text>
          )}
        </div>
        
        <div className="grid items-start md:gap-10 lg:gap-20 md:grid-cols-2 lg:grid-cols-3">
          <ProductGallery
            media={media.nodes}
            className="w-full lg:col-span-2"
          />
          {/* Render the form section directly again */}
          <div className="sticky md:top-nav md:h-screen md:pt-nav hiddenScroll md:overflow-y-scroll">
             <section className="flex flex-col w-full gap-8 p-6 md:p-8 bg-white rounded-xl shadow-sm border border-neutral-100 md:max-w-md md:mx-auto lg:gap-10">
                <div className="grid gap-3">
                   <ProductPrice 
                     selectedVariant={selectedVariant} 
                     className="text-3xl md:text-4xl"
                   />
                   {/* Customer reviews - Keep outside lazy load if possible, or include */}
                   <div className="flex items-center gap-2 mt-2">
                     <div className="flex text-yellow-400">
                       {[...Array(5)].map((_, i) => (
                         <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                           <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                         </svg>
                       ))}
                     </div>
                     <Text className="text-sm text-primary/60">4.9 (94 reviews)</Text>
                   </div>
                   {/* Premium badges - Keep outside lazy load if possible, or include */}
                   <div className="flex flex-wrap gap-2 mt-2">
                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                       In Stock
                     </span>
                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                       Dermatologist Approved
                     </span>
                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                       Award Winning
                     </span>
                   </div>
                </div>
                {/* Product form with options */}
                <ProductForm 
                  productOptions={productOptions} 
                  selectedVariant={selectedVariant} 
                  storeDomain={storeDomain} 
                />
                {/* Satisfaction guarantee - Keep outside lazy load if possible, or include */}
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100 flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <Text className="font-medium text-sm">30-Day Money Back Guarantee</Text>
                    <Text className="text-xs text-primary/60">We stand behind our products with complete confidence.</Text>
                  </div>
                </div>
             </section>
          </div>
          
          {/* Product details accordion section - moved outside lazy load */}
          <div className="md:col-span-3 lg:col-span-1 lg:col-start-3 py-8 md:py-0">
             <div className="grid gap-4 py-4 border-t border-primary/10">
                {descriptionHtml && (
                  <ProductDetail
                    title="product details"
                    content={descriptionHtml}
                  />
                )}
                <ProductDetail
                  title="key benefits"
                  content="<ul><li><strong>Clinically Proven Results:</strong> 88% of users reported visibly fuller hair within 30 days</li><li><strong>Advanced Technology:</strong> Proprietary red light technology stimulates hair follicles at the cellular level</li><li><strong>Safe & Painless:</strong> Non-invasive treatment with zero side effects</li></ul>"
                />
                {shippingPolicy?.body && (
                  <ProductDetail
                    title="shipping"
                    content={getExcerpt(shippingPolicy.body)}
                    learnMore={`/policies/${shippingPolicy.handle}`}
                  />
                )}
                {refundPolicy?.body && (
                  <ProductDetail
                    title="returns & warranty"
                    content={getExcerpt(refundPolicy.body)}
                    learnMore={`/policies/${refundPolicy.handle}`}
                  />
                )}
             </div>
          </div>
        </div>
        
        {/* Expert endorsement section */}
        <div className="mt-16 bg-neutral-50 rounded-xl p-8 border border-neutral-100">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <img 
              src="/images/expert.jpg" 
              alt="Dr. Elena Rostova" 
              className="w-24 h-24 rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
              }}
            />
            <div>
              <Text className="text-lg italic text-primary/80 mb-3">"The Photonique Touch represents a significant breakthrough in non-invasive hair restoration technology. Its clinically-proven red light therapy is precisely calibrated to stimulate follicles at the optimal cellular level."</Text>
              <Text className="font-medium text-primary">Dr. Elena Rostova</Text>
              <Text className="text-sm text-primary/60">Lead Formulator & Clinical Director</Text>
            </div>
          </div>
        </div>
      </Section>
      
      <Suspense fallback={<Skeleton className="h-32" />}>
        <Await
          errorElement="There was a problem loading related products"
          resolve={recommended}
        >
          {(products) => (
            <ProductSwimlane title="Complete Your Hair Wellness Routine" products={products} />
          )}
        </Await>
      </Suspense>
      
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </>
  );
}

export function ProductForm({
  productOptions,
  selectedVariant,
  storeDomain,
}: {
  productOptions: MappedProductOptions[];
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
  storeDomain: string;
}) {
  const {lines, status: cartStatus, linesAdd} = useCart();
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

   const handleAddToCart = async () => {
    if (!currentVariant?.availableForSale) {
      setShowError(true);
      return;
    }
    setShowError(false);
    if (currentVariant.quantityAvailable != null && quantity > currentVariant.quantityAvailable) {
      setShowError(true);
      return;
    }
    await linesAdd([
      {
        merchandiseId: currentVariant.id,
        quantity,
      },
    ]);
  };

  const isOutOfStock = !currentVariant?.availableForSale;
  const isLoading = state !== 'idle' || cartStatus === 'fetching';

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
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
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
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
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
  const ChevronIcon = ({ open }: { open: boolean }) => (
    <svg className={`w-5 h-5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
  );

  return (
    <Disclosure key={title} as="div" className="grid w-full gap-2">
      {({open}) => (
        <>
          <Disclosure.Button className="text-left py-3 border-b border-primary/10 hover:bg-stone-100 px-1 transition-colors">
            <div className="flex justify-between items-center">
              <Text size="lead" as="h4" className="font-medium text-primary">
                {title}
              </Text>
              <ChevronIcon open={open} />
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

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      values
    }
    media(first: 7) {
      nodes {
        __typename
        mediaContentType
        alt
        previewImage {
          url
        }
        ... on MediaImage {
          id
          image {
            id
            url
            width
            height
          }
        }
        ... on Video {
          id
          sources {
            mimeType
            url
          }
        }
        ... on Model3d {
          id
          sources {
            mimeType
            url
          }
        }
        ... on ExternalVideo {
          id
          embedUrl
          host
        }
      }
    }
    variants(first: 250) {
      nodes {
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
        unitPrice {
          amount
          currencyCode
        }
        product {
          title
          handle
        }
      }
    }
    variantBySelectedOptions(selectedOptions: $selectedOptions) {
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
      unitPrice {
        amount
        currencyCode
      }
      product {
        title
        handle
      }
    }
    seo {
      title
      description
    }
  }
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
  ${PRODUCT_FRAGMENT}
`;

// Query for recommended products, using the PRODUCT_CARD_FRAGMENT
const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query RecommendedProducts (
    $productId: ID!
    $count: Int
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    recommended: productRecommendations(productId: $productId) {
      ...ProductCard
    }
    additional: products(first: $count, sortKey: RELEVANCE) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

export async function action({request, context}: ActionFunctionArgs) {
  const {session, storefront} = context;
  const cartId = session.get('cartId');
  const formData = await request.formData();

  const {action, inputs} = CartForm.getFormInput(formData);

  invariant(action, 'No cartAction defined');

  let status = 200;
  let result: Record<string, unknown>;

  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      result = await storefront.mutate(ADD_LINES_MUTATION, {
        variables: {
          cartId,
          lines: inputs.lines,
        },
        cache: storefront.CacheNone(),
      });
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await storefront.mutate(UPDATE_LINES_MUTATION, {
        variables: {
          cartId,
          lines: inputs.lines,
        },
        cache: storefront.CacheNone(),
      });
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await storefront.mutate(REMOVE_LINES_MUTATION, {
        variables: {
          cartId,
          lineIds: inputs.lineIds,
        },
        cache: storefront.CacheNone(),
      });
      break;
    default:
      invariant(false, `${action} cart action is not defined`);
  }

  /**
   * The Cart ID may change after each mutation. We need to update it perhaps?
   * For now, we're just returning the result.
   */
  const {cart, errors} = result?.cartLinesAdd || result?.cartLinesUpdate || result?.cartLinesRemove || {};
  
  const headers = cart && cart.id ? {'Set-Cookie': await session.commit()} : {};

  if (errors?.length) {
    status = 400;
  }
  
  return json(
    {cart, errors},
    {status, headers},
  );
}

// Helper function for cart creation (if needed separately from CartForm actions)
// This was in your instructions, but the action above handles typical cart operations.
// If you need a direct "create cart" outside of form actions, it would look like this:
async function cartCreate({input, storefront}: { input: any, storefront: Storefront }) { // Added types for clarity
  const {data, errors} = await storefront.mutate(CREATE_CART_MUTATION, { // Assuming CREATE_CART_MUTATION is defined
    variables: {input},
    cache: storefront.CacheNone(),
  });
  // Handle errors appropriately
  if (errors?.length || !data?.cartCreate?.cart) {
    console.error("Cart creation errors:", errors);
    throw new Error("Failed to create cart.");
  }
  return data.cartCreate.cart;
}

// Define CREATE_CART_MUTATION if it's not already defined elsewhere
// This was part of your instructions
const CREATE_CART_MUTATION = `#graphql
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 100) {
          nodes {
            id
            quantity
            merchandise {
              ...on ProductVariant {
                id
                title
                product {
                  title
                  handle
                }
                image {
                  url
                  altText
                  width
                  height
                }
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
          totalDutyAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Cart Mutations (used by the CartForm action)
const ADD_LINES_MUTATION = `#graphql
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        totalQuantity
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const UPDATE_LINES_MUTATION = `#graphql
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        totalQuantity
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const REMOVE_LINES_MUTATION = `#graphql
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        totalQuantity
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Error Boundary Function - As per your instruction
export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = "An unexpected error occurred.";
  let errorStatus = 500;

  if (error instanceof Error) {
    errorMessage = error.message;
  }
  
  // Check if it's a response error (e.g., 404 from loader)
  // This requires `isRouteErrorResponse` from '@remix-run/react'
  // For simplicity, I'm checking status directly if available.
  if (typeof error === 'object' && error !== null && 'status' in error) {
      if (error.status === 404) {
          errorMessage = "We couldn't find the product you're looking for.";
          errorStatus = 404;
      }
  }

  console.error("Route Error:", error); // Log the actual error for debugging

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <Heading as="h1" className="text-3xl font-light mb-4">
        {errorStatus === 404 ? 'Product Not Found' : 'Oops! Something went wrong.'}
      </Heading>
      <Text className="mb-6">{errorMessage}</Text>
      <Button asChild variant="secondary">
        <Link to="/collections/all">Continue Shopping</Link>
      </Button>
    </div>
  );
} 