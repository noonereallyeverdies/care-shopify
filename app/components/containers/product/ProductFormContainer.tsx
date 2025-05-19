import { useEffect, useState } from 'react';
import { useCart } from '@shopify/hydrogen-react';
import { useNavigation } from '@remix-run/react';
import type { 
  ProductVariant, 
  SellingPlan, 
  Product
} from '@shopify/hydrogen/storefront-api-types';
import { ProductFormUI } from '~/components/ui/product/ProductFormUI';
import { useProduct } from '~/contexts/product/ProductContext';

// Color mapping business logic moved to a separate file
import { colorMap } from '~/utils/colorMap';

type ProductFormContainerProps = {
  product: Product;
  initialVariant?: ProductVariant;
};

export function ProductFormContainer({
  product,
  initialVariant,
}: ProductFormContainerProps) {
  const {lines, status: cartStatus, linesAdd} = useCart();
  const {state} = useNavigation();
  const { quantity, setQuantity, selectedVariant, selectVariant } = useProduct();
  const [currentVariant, setCurrentVariant] = useState<ProductVariant | null>(initialVariant || null);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [optionSelections, setOptionSelections] = useState(
    initialVariant?.selectedOptions || []
  );

  // Find current variant from context selectedVariant ID
  useEffect(() => {
    if (selectedVariant && product.variants.nodes) {
      const variant = product.variants.nodes.find(v => v.id === selectedVariant);
      if (variant) {
        setCurrentVariant(variant);
        setOptionSelections(variant.selectedOptions);
      }
    }
  }, [selectedVariant, product.variants.nodes]);

  // Handle option change business logic
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
    const matchedVariant = product.variants.nodes.find(variant => {
      return variant.selectedOptions.every(option => {
        const selection = newSelections.find(sel => sel.name === option.name);
        return selection?.value === option.value;
      });
    });

    if (matchedVariant) {
      setCurrentVariant(matchedVariant);
      selectVariant(matchedVariant.id); // Update the context
    }
  };

  // Add to cart business logic
  const handleAddToCart = async () => {
    if (!currentVariant || !currentVariant.availableForSale) {
      setShowError(true);
      setErrorMessage('Out of stock');
      return;
    }

    // Reset error state
    setShowError(false);
    setErrorMessage('');

    // Check if product is in stock
    if (currentVariant.quantityAvailable != null && quantity > currentVariant.quantityAvailable) {
      setShowError(true);
      setErrorMessage(`Only ${currentVariant.quantityAvailable} in stock`);
      return;
    }

    // Add to cart using linesAdd from hydrogen-react
    try {
      await linesAdd([
        {
          merchandiseId: currentVariant.id,
          quantity,
        },
      ]);
    } catch (error) {
      setShowError(true);
      setErrorMessage('Unable to add to cart');
    }
  };

  const isOutOfStock = !currentVariant?.availableForSale;
  const isLoading = state !== 'idle' || cartStatus === 'fetching';
  
  if (!currentVariant) return null;
  
  return (
    <ProductFormUI
      options={product.options}
      optionSelections={optionSelections}
      handleOptionChange={handleOptionChange}
      quantity={quantity}
      setQuantity={setQuantity}
      handleAddToCart={handleAddToCart}
      isOutOfStock={isOutOfStock}
      isLoading={isLoading}
      showError={showError}
      currentVariant={currentVariant}
      errorMessage={errorMessage}
      colorMap={colorMap}
    />
  );
}