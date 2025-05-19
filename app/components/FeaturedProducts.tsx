import {Await, Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import {Suspense} from 'react';

/**
 * Display a grid of featured products
 */
export function FeaturedProducts({
  products,
  title = 'Featured Products',
  count = 4,
  ...props
}: {
  products: any;
  title?: string;
  count?: number;
  [key: string]: any;
}) {
  const haveProducts = products && products.nodes && products.nodes.length > 0;

  if (!haveProducts) return null;

  const featuredProducts = products.nodes.slice(0, count);

  return (
    <div className="py-10">
      <h2 className="text-2xl font-medium mb-6 text-center">{title}</h2>
      <Suspense 
        fallback={
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {Array(count).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg w-full aspect-square mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        }
      >
        <Await resolve={products}>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Await>
      </Suspense>
    </div>
  );
}

function ProductCard({product}: {product: any}) {
  return (
    <Link 
      to={`/products/${product.handle}`}
      className="group"
    >
      <div className="rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition duration-300">
        <div className="relative w-full aspect-square overflow-hidden">
          {product.featuredImage && (
            <Image
              data={product.featuredImage}
              alt={product.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
              aspectRatio="1/1"
            />
          )}
          {product.variants?.nodes?.[0]?.compareAtPrice && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs py-1 px-2 rounded">
              Sale
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium mb-1 text-gray-800 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <div className="text-sm text-gray-900">
            {product.variants?.nodes?.[0]?.compareAtPrice && (
              <span className="line-through text-gray-500 mr-2.5">
                <Money data={product.variants.nodes[0].compareAtPrice} />
              </span>
            )}
            <span className={product.variants?.nodes?.[0]?.compareAtPrice ? "text-red-600 font-medium" : ""}>
              <Money data={product.variants?.nodes?.[0]?.price} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
