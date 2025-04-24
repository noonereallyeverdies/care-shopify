import {useRef, Suspense, useState, useEffect} from 'react';
import {Disclosure, Listbox} from '@headlessui/react';
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
  
  // Set up variants and SEO
  const selectedVariant = product.selectedOrFirstAvailableVariant ?? {};
  const variants = getAdjacentAndFirstAvailableVariants(product);
  
  const seo = seoPayload.product({
    product: {...product, variants},
    selectedVariant,
    url: request.url,
  });

  return defer({
    product,
    variants,
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
  const {product, shop, recommended, variants, storeDomain} =
    useLoaderData<typeof loader>();
  const {media, title, vendor, descriptionHtml} = product;
  const {shippingPolicy, refundPolicy} = shop;

  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    variants,
  );

  // Track selected option in URL for better UX
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  return (
    <>
      {/* Premium Header Banner */}
      <div className="bg-gradient-to-r from-rose-600 to-rose-500 text-white py-3 px-4 text-center">
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
          <div className="sticky md:top-nav md:h-screen md:pt-nav hiddenScroll md:overflow-y-scroll">
            <section className="flex flex-col w-full gap-8 p-6 md:p-8 bg-white rounded-xl shadow-sm border border-neutral-100 md:max-w-md md:mx-auto lg:gap-10">
              <div className="grid gap-3">
                <ProductPrice 
                  selectedVariant={selectedVariant} 
                  className="text-3xl md:text-4xl"
                />
                
                {/* Customer reviews */}
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
                
                {/* Premium badges */}
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
              
              {/* Satisfaction guarantee */}
              <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100 flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <Text className="font-medium text-sm">30-Day Money Back Guarantee</Text>
                  <Text className="text-xs text-primary/60">We stand behind our products with complete confidence.</Text>
                </div>
              </div>
              
              {/* Product details accordion section */}
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
            </section>
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
  const closeRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  // Find color option if it exists
  const colorOption = productOptions.find(option => 
    option.name.toLowerCase() === 'color'
  );

  // Handle option selection
  const handleOptionChange = (optionName: string, value: string) => {
    // Find the matching variant with this option value
    const newSelectedOptions = selectedVariant.selectedOptions.map(opt => {
      if (opt.name === optionName) {
        return { name: optionName, value };
      }
      return opt;
    });
    
    // Create the query string
    const searchParams = new URLSearchParams();
    newSelectedOptions.forEach(({name, value}) => {
      searchParams.set(name, value);
    });
    
    // Navigate to the same product with different options
    navigate(`${window.location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  // State for quantity
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="grid gap-8">
      <div className="grid gap-4">
        {productOptions.map((option) => (
          <div
            key={option.name}
            className="flex flex-col flex-wrap mb-2 gap-y-3"
          >
            <Heading as="legend" size="lead" className="min-w-[4rem] text-primary font-medium mb-2">
              {option.name}
            </Heading>
            <div className="flex flex-wrap items-center gap-3">
              {option.optionValues.map(
                ({
                  name,
                  selected,
                  available,
                }) => {
                  const isColor = option.name.toLowerCase() === 'color';
                  const colorData = isColor ? PRODUCT_COLORS[name as keyof typeof PRODUCT_COLORS] : null;
                  
                  // For color options, render color swatches
                  if (isColor && colorData) {
                    return (
                      <button
                        key={name}
                        onClick={() => handleOptionChange(option.name, name)}
                        className={clsx(
                          'w-10 h-10 rounded-full transition-all duration-200 relative',
                          available ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed',
                          selected ? 'ring-2 ring-offset-1 ring-accent' : 'border border-neutral-300',
                        )}
                        style={{ backgroundColor: colorData.hex }}
                        disabled={!available}
                        aria-label={`Color: ${name}`}
                      >
                        {selected && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <IconCheck className="w-5 h-5 text-white drop-shadow-md" />
                          </span>
                        )}
                      </button>
                    );
                  }
                  
                  // For non-color options, render standard buttons
                  return (
                    <button
                      key={name}
                      onClick={() => handleOptionChange(option.name, name)}
                      className={clsx(
                        'py-2 px-4 rounded-full text-sm transition-all duration-200',
                        available ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed',
                        selected 
                          ? 'bg-primary/10 text-primary border border-primary/30' 
                          : 'bg-neutral-100 text-neutral-800 border border-neutral-200 hover:border-neutral-300'
                      )}
                      disabled={!available}
                    >
                      {name}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        ))}
        
        {/* Quantity Selector */}
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
      </div>
      
      {/* Buttons Section */}
      <div className="grid gap-4">
        <PurchaseControls 
          selectedVariant={selectedVariant} 
          storeDomain={storeDomain}
          quantity={quantity}
        />
        
        {/* Shop Pay Button */}
        {selectedVariant && selectedVariant.availableForSale && (
          <ShopPayButton
            storeDomain={storeDomain}
            variantIds={[selectedVariant.id]}
            width="full"
          />
        )}
      </div>
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
    unitPrice {
      amount
      currencyCode
    }
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
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
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
` as const;

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
` as const;

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
` as const;

export async function action({ request, context }: ActionFunctionArgs) {
  const { session, storefront } = context;
  const formData = await request.formData();

  const productId = formData.get('productId');
  const variantId = formData.get('variantId');
  const quantity = Number(formData.get('quantity'));

  // Input validation
  invariant(productId, 'Missing productId');
  invariant(variantId, 'Missing variantId');
  invariant(quantity > 0, 'Quantity must be greater than 0');

  try {
    const { cart } = await cartCreate({
      input: {
        lines: [
          {
            quantity,
            merchandiseId: variantId,
          },
        ],
      },
      storefront,
    });

    // Set cart id in session
    session.set('cartId', cart.id);
    return json({ cart }, { status: 200 });
  } catch (error) {
    console.error(error);
    return json({ error: 'Failed to add to cart' }, { status: 400 });
  }
}

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

// Helper function for cart
async function cartCreate({ input, storefront }) {
  return await storefront.mutate(CREATE_CART_MUTATION, {
    variables: { input },
  });
}

const CREATE_CART_MUTATION = `#graphql
  mutation CartCreate($input: CartInput!) {
    cart: cartCreate(input: $input) {
      cart {
        id
      }
    }
  }
`; 