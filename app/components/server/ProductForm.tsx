import type { 
  Product, 
  ProductVariant 
} from '@shopify/hydrogen/storefront-api-types';
import { ProductFormContainer } from '~/components/containers/product/ProductFormContainer';
import { ProductProvider } from '~/contexts/product/ProductContext';

type ProductFormProps = {
  product: Product;
  selectedVariant: ProductVariant;
  variants: ProductVariant[];
};

export function ProductForm({
  product,
  selectedVariant,
}: ProductFormProps) {
  return (
    <ProductProvider
      product={product}
      initialVariantId={selectedVariant?.id}
    >
      <ProductFormContainer 
        product={product}
        initialVariant={selectedVariant}
      />
    </ProductProvider>
  );
}
