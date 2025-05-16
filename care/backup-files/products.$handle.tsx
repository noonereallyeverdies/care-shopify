import {useLoaderData} from '@remix-run/react';
import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Image, Money, ShopPayButton} from '@shopify/hydrogen-react';
import {ProductForm} from '~/components/ProductForm';
import {Suspense} from 'react';
import {StarRating} from '~/components/StarRating';
import invariant from 'tiny-invariant';
import type {MetaFunction} from '@remix-run/node';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [
    {title: `${data?.product.title} | care•atin`},
    {description: data?.product.description},
    {
      property: 'og:image',
      content: data?.product.selectedVariant?.image?.url || '',
    },
  ];
};

export async function loader({params, request, context}: LoaderFunctionArgs) {
  const {handle} = params;
  invariant(handle, 'Missing product handle');

  const searchParams = new URL(request.url).searchParams;
  const selectedOptions: {name: string; value: string}[] = [];
  
  // Get selected options from the query string for variants
  searchParams.forEach((value, name) => {
    selectedOptions.push({name, value});
  });
  
  const {product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
      selectedOptions,
    },
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  // Set selected variant, or first available variant
  const selectedVariant = product.selectedVariant ?? product.variants.nodes[0];
  
  return json({
    product,
    selectedVariant,
    variants: product.variants.nodes,
  });
}

export default function ProductHandle() {
  const {product, selectedVariant, variants} = useLoaderData<typeof loader>();
  const {title, vendor, descriptionHtml, media, policies} = product;
  
  return (
    <div className="px-4 py-8 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="mb-6 text-sm text-neutral-500">
          <a href="/" className="hover:text-black">Home</a>
          <span className="mx-2">/</span>
          <a href="/collections" className="hover:text-black">Collections</a>
          <span className="mx-2">/</span>
          <span className="text-black">{title}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="md:sticky md:top-24 h-fit">
            <div className="aspect-square bg-neutral-50 rounded-lg overflow-hidden relative">
              {selectedVariant?.image ? (
                <Image
                  data={selectedVariant.image}
                  aspectRatio="1/1"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover w-full h-full"
                  loading="eager"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-neutral-100 text-neutral-500">
                  No image available
                </div>
              )}
            </div>
            
            {/* Thumbnail Grid */}
            {media.nodes.length > 1 && (
              <div className="grid grid-cols-5 gap-2 mt-4">
                {media.nodes.map((mediaItem, index) => (
                  <button 
                    key={mediaItem.id} 
                    className={`aspect-square rounded-md overflow-hidden border-2 ${
                      selectedVariant?.image?.url === mediaItem.image?.url
                        ? 'border-black'
                        : 'border-transparent hover:border-neutral-300'
                    }`}
                  >
                    <Image
                      data={mediaItem.image}
                      aspectRatio="1/1"
                      sizes="10vw"
                      className="object-cover w-full h-full"
                      loading={index < 5 ? 'eager' : 'lazy'}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            {/* Vendor */}
            {vendor && (
              <div className="text-sm font-medium text-neutral-500">
                {vendor}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl font-medium tracking-tight">{title}</h1>

            {/* Reviews */}
            {product.rating && (
              <div className="flex items-center gap-2">
                <StarRating rating={product.rating} />
                <span className="text-sm text-neutral-500">
                  {product.reviewCount} reviews
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <div className="text-2xl font-medium">
                <Money
                  withoutTrailingZeros
                  data={selectedVariant?.price}
                  as="span"
                />
              </div>
              {selectedVariant?.compareAtPrice && (
                <div className="text-neutral-500 line-through text-lg">
                  <Money
                    withoutTrailingZeros
                    data={selectedVariant.compareAtPrice}
                    as="span"
                  />
                </div>
              )}
            </div>

            {/* Product Form */}
            <Suspense fallback={<div>Loading...</div>}>
              <ProductForm 
                product={product} 
                selectedVariant={selectedVariant} 
                variants={variants}
              />
            </Suspense>

            {/* Description */}
            <div className="pt-6 border-t border-neutral-200">
              <h2 className="text-lg font-medium mb-4">Product Details</h2>
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{__html: descriptionHtml}}
              />
            </div>

            {/* Shipping Policy */}
            {policies?.map((policy) => (
              <details
                key={policy.id}
                className="group border-t border-neutral-200 pt-4"
              >
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <h3 className="text-md font-medium">{policy.title}</h3>
                  <span className="transition group-open:rotate-180">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </summary>
                <div
                  className="prose prose-sm max-w-none mt-2"
                  dangerouslySetInnerHTML={{__html: policy.body}}
                />
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const PRODUCT_QUERY = `#graphql
  query Product(
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) {
    product(handle: $handle) {
      id
      title
      handle
      vendor
      description
      descriptionHtml
      media(first: 10) {
        nodes {
          id
          mediaContentType
          alt
          ... on MediaImage {
            id
            image {
              url
              width
              height
              altText
            }
          }
        }
      }
      options {
        name
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        id
        availableForSale
        selectedOptions {
          name
          value
        }
        image {
          url
          width
          height
          altText
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        quantityAvailable
        sku
      }
      variants(first: 100) {
        nodes {
          id
          availableForSale
          quantityAvailable
          selectedOptions {
            name
            value
          }
          image {
            url
            width
            height
            altText
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
      policies {
        id
        title
        body
      }
      rating: metafield(namespace: "reviews", key: "rating") {
        value
      }
      reviewCount: metafield(namespace: "reviews", key: "count") {
        value
      }
    }
  }
`; 