import { ProductProvider } from '~/contexts/product/ProductContext';
import { AddToCartButton } from '~/components/containers/AddToCartButton';
import { ProductGallery } from '~/components/containers/ProductGallery';
import { ProductVariantSelector } from '~/components/containers/ProductVariantSelector';
import { ProductQuantitySelector } from '~/components/containers/ProductQuantitySelector';

// Example of a product page that uses context to avoid prop drilling
export function ProductDetails({ product }) {
  const firstVariant = product.variants.nodes[0];
  const isAvailable = firstVariant?.availableForSale || false;

  return (
    <ProductProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
        <div>
          <ProductGallery 
            images={product.images} 
            title={product.title}
          />
        </div>
        
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-medium tracking-wide">{product.title}</h1>
          
          <div className="prose">
            <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
          </div>
          
          <ProductVariantSelector variants={product.variants.nodes} />
          <ProductQuantitySelector />
          
          <AddToCartButton available={isAvailable} />
        </div>
      </div>
    </ProductProvider>
  );
}