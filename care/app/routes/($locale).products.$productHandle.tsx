import {useRef, Suspense} from 'react';
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

export const headers = routeHeaders;

export async function loader(args: LoaderFunctionArgs) {
  const {productHandle} = args.params;
  invariant(productHandle, 'Missing productHandle param, check route filename');

  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({
  params,
  request,
  context,
}: LoaderFunctionArgs) {
  const {productHandle} = params;
  invariant(productHandle, 'Missing productHandle param, check route filename');

  const selectedOptions = getSelectedProductOptions(request);

  const [{shop, product}] = await Promise.all([
    context.storefront.query(PRODUCT_QUERY, {
      variables: {
        handle: productHandle,
        selectedOptions,
        country: context.storefront.i18n.country,
        language: context.storefront.i18n.language,
      },
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response('product', {status: 404});
  }

  const recommended = getRecommendedProducts(context.storefront, product.id);
  const selectedVariant = product.selectedOrFirstAvailableVariant ?? {};
  const variants = getAdjacentAndFirstAvailableVariants(product);

  const seo = seoPayload.product({
    product: {...product, variants},
    selectedVariant,
    url: request.url,
  });

  return {
    product,
    variants,
    shop,
    storeDomain: shop.primaryDomain.url,
    recommended,
    seo,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData(args: LoaderFunctionArgs) {
  // Put any API calls that are not critical to be available on first page render
  // For example: product reviews, product recommendations, social feeds.

  return {};
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Product() {
  const {product, shop, recommended, variants, storeDomain} =
    useLoaderData<typeof loader>();
  const {media, title, vendor, descriptionHtml} = product;
  const {shippingPolicy, refundPolicy} = shop;
  
  const navigate = useNavigate();

  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    variants,
  );

  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  return (
    <>
      <Section className="px-4 md:px-8 lg:px-12 py-8 md:py-12 bg-contrast">
        <div className="grid items-start md:gap-10 lg:gap-20 md:grid-cols-2 lg:grid-cols-3">
          <ProductGallery
            media={media.nodes}
            className="w-full lg:col-span-2"
          />
          <div className="sticky md:top-nav md:h-screen md:pt-nav hiddenScroll md:overflow-y-scroll">
            <section className="flex flex-col w-full gap-8 p-0 md:max-w-md md:mx-auto lg:gap-10">
              <div className="grid gap-3">
                <Heading as="h1" className="text-3xl md:text-4xl font-bold text-primary whitespace-normal">
                  {title}
                </Heading>
                {vendor && (
                  <Text className={'text-primary/60 font-medium lowercase'}>{vendor}</Text>
                )}
                <ProductPrice selectedVariant={selectedVariant} />
              </div>
              <ProductForm 
                productOptions={productOptions} 
                selectedVariant={selectedVariant} 
                storeDomain={storeDomain} 
              />
              <div className="grid gap-4 py-4 border-t border-primary/10">
                {descriptionHtml && (
                  <ProductDetail
                    title="product details"
                    content={descriptionHtml}
                  />
                )}
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
      </Section>
      <Suspense fallback={<Skeleton className="h-32" />}>
        <Await
          errorElement="There was a problem loading related products"
          resolve={recommended}
        >
          {(products) => (
            <ProductSwimlane title="Related Products" products={products} />
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
                  const colorOption = productOptions.find(opt => opt.name.toLowerCase() === 'color');
                  const swatchData = colorOption?.optionValues.find(ov => ov.name === name)?.swatch;
                  const backgroundColor = swatchData?.color || 'transparent';
                  const backgroundImage = swatchData?.image?.previewImage?.url;
                  
                  const isColor = option.name.toLowerCase() === 'color';

                  return (
                    <Link
                      key={option.name + name}
                      {...(!isDifferentProduct ? {rel: 'nofollow'} : {})}
                      to={`/products/${handle}?${variantUriQuery}`}
                      preventScrollReset
                      prefetch="intent"
                      replace
                      className={clsx(
                        'border border-primary/10 transition-all duration-200 relative overflow-hidden',
                        isColor ? 'rounded-full w-8 h-8' : 'rounded px-3 py-1 text-sm',
                        selected ? 'ring-2 ring-offset-1 ring-accent' : '',
                        available ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed',
                        !isColor && (selected ? 'bg-primary/10 text-primary' : 'bg-contrast text-primary/80 hover:bg-primary/5')
                      )}
                      style={isColor ? {
                        backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
                      } : {}}
                      aria-label={name}
                    >
                      {isColor && backgroundImage && (
                         <img src={backgroundImage} alt={name} className="absolute inset-0 w-full h-full object-cover" />
                      )}
                      {isColor && selected && !backgroundImage && (
                         <span className="absolute inset-0 flex items-center justify-center w-full h-full rounded-full bg-white/50 text-black">
                           <IconCheck className="w-4 h-4"/> 
                         </span> 
                      )}
                      {!isColor && name}
                    </Link>
                  );
                }
              )}
            </div>
          </div>
        ))}
      </div>
      <PurchaseControls selectedVariant={selectedVariant} storeDomain={storeDomain} />
    </div>
  );
}

function ProductPrice({selectedVariant}: {selectedVariant: ProductFragment['selectedOrFirstAvailableVariant']}) {
  if (!selectedVariant) return null;

  const isOnSale =
    selectedVariant?.price?.amount &&
    selectedVariant?.compareAtPrice?.amount &&
    selectedVariant?.price?.amount < selectedVariant?.compareAtPrice?.amount;

  return (
    <div className="flex items-baseline gap-3">
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
    </div>
  );
}

function PurchaseControls({selectedVariant, storeDomain}: {
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
  storeDomain: string;
}) {
  if (!selectedVariant) return null;

  const isOutOfStock = !selectedVariant.availableForSale;

  return (
    <div className="grid items-stretch gap-4">
      {isOutOfStock ? (
        <Button variant="secondary" disabled className="opacity-70 cursor-not-allowed">
          <Text className="text-primary/80">sold out</Text>
        </Button>
      ) : (
        <AddToCartButton
          lines={[
            {
              merchandiseId: selectedVariant.id!,
              quantity: 1,
            },
          ]}
          className="w-full bg-accent text-contrast uppercase text-sm font-medium tracking-wider rounded hover:opacity-90 transition-opacity py-3 px-6 flex items-center justify-center gap-2"
          data-test="add-to-cart"
        >
          <span>add to cart</span>
        </AddToCartButton>
      )}
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
              <Text size="copy" as="h4" className="font-medium text-primary lowercase">
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
                  learn more
                </Link>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
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

async function getRecommendedProducts(
  storefront: Storefront,
  productId: string,
) {
  const products = await storefront.query(RECOMMENDED_PRODUCTS_QUERY, {
    variables: {productId, count: 12},
  });

  invariant(products, 'No data returned from Shopify API');

  const mergedProducts = (products.recommended ?? [])
    .concat(products.additional.nodes)
    .filter(
      (value, index, array) =>
        array.findIndex((value2) => value2.id === value.id) === index,
    );

  const originalProduct = mergedProducts.findIndex(
    (item) => item.id === productId,
  );

  mergedProducts.splice(originalProduct, 1);

  return {nodes: mergedProducts};
}
