import React from "react";
import {ShopPayButton} from '@shopify/hydrogen-react';
import {Button} from './Button';
import {Text, Heading} from './Text';
import {useState, useEffect} from 'react';
import {useProduct} from "../app/contexts/product/ProductContext";
import {useNavigate} from '@remix-run/react';
import { SimpleAddToCartButton } from './SimpleAddToCartButton';
import { BuyNowButton } from './BuyNowButton';
import type { ProductOption, SelectedOption } from "@shopify/hydrogen/storefront-api-types";

// Simple mapping for color names to CSS colors
const colorMap: Record<string, string> = {
  'black': '#000000',
  'white': '#FFFFFF',
  'silver': '#C0C0C0',
  'graphite': '#383838',
  'rose gold': '#B76E79',
  'pink': '#FFC0CB',
  'red': '#FF0000',
  'blue': '#0000FF',
  'green': '#008000',
};

/**
 * Enhanced product form that uses the ProductContext
 * This version has better persistence between page navigations and browser history
 */
export function ProductFormV2({storeDomain}: {storeDomain: string}) {
  const {
    product,
    quantity,
    setQuantity,
    selectedVariant: selectedVariantId,
    selectVariant,
    currentVariant,
    availableForSale
  } = useProduct();
  
  const [isClient, setIsClient] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Track client-side mount for ShopPayButton
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Extract options from the product
  const options: ProductOption[] = product?.options || [];

  // Extract selected options from current variant
  const currentOptions: SelectedOption[] = currentVariant?.selectedOptions || [];
  
  // Handle option value selection
  const handleOptionChange = (optionName: string, value: string) => {
    // Find the variant that matches the selected options
    const newOptions = [...currentOptions];
    
    // Update the option that changed
    const optionIndex = newOptions.findIndex(
      (option: SelectedOption) => option.name === optionName
    );
    
    if (optionIndex !== -1) {
      newOptions[optionIndex].value = value;
    } else {
      newOptions.push({ name: optionName, value });
    }
    
    // Safely check if the nodes exists before trying to find in it
    if (product?.variants?.nodes && Array.isArray(product.variants.nodes)) {
      // Find the variant that matches the new options
      const newVariant = product.variants.nodes.find((variant: any) => {
        return variant.selectedOptions.every((option: SelectedOption) => {
          return newOptions.some(
            (selected: SelectedOption) => selected.name === option.name && selected.value === option.value
          );
        });
      });
      
      // Update the selected variant if found
      if (newVariant && newVariant.id) {
        selectVariant(newVariant.id);
      }
    }
  };

  const isOutOfStock = !availableForSale;

  return (
    <div className="grid gap-6">
      {/* Options selector */}
      {options.map((option: ProductOption) => (
        <div key={option.name} className="grid gap-2">
          <h3 className="text-sm font-medium text-neutral-900">{option.name}</h3>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value: string) => {
              const isSelected = currentOptions.some(
                (selection: SelectedOption) => selection.name === option.name && selection.value === value
              );

              // Check if this is the Color option
              if (option.name.toLowerCase() === 'color') {
                const backgroundColor = colorMap[value.toLowerCase()] || value;
                
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
                      ${backgroundColor === '#FFFFFF' ? 'shadow-sm' : ''}
                    `}
                    style={{ backgroundColor: backgroundColor }}
                    title={value}
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

      {/* Quantity selector */}
      <div className="flex flex-col gap-2 mt-2">
        <Heading as="legend" size="lead" className="text-primary font-medium mb-2">
          Quantity
        </Heading>
        <div className="flex items-center border border-neutral-300 rounded-lg w-32">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
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
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-10 flex items-center justify-center text-primary hover:bg-neutral-100"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Purchase Controls */}
      <div className="grid items-stretch gap-4">
        {isOutOfStock ? (
          <Button variant="secondary" disabled className="opacity-70 cursor-not-allowed">
            <Text className="text-primary/80">Sold Out</Text>
          </Button>
        ) : (
          <SimpleAddToCartButton
            variantId={currentVariant?.id || ''}
            quantity={quantity}
            className="w-full bg-accent text-contrast uppercase text-sm font-medium tracking-wider rounded-full hover:opacity-90 transition-opacity py-4 px-6 flex items-center justify-center gap-2"
            data-test="add-to-cart"
          >
            Add to Cart
          </SimpleAddToCartButton>
        )}
        
        {!isOutOfStock && currentVariant && currentVariant.id && (
          <BuyNowButton
            variantId={currentVariant.id}
            quantity={quantity}
            className="rounded-full py-4 px-6 uppercase"
          >
            Buy Now
          </BuyNowButton>
        )}
      </div>

      {/* Shop Pay button - Conditionally render based on isClient */}
      {isClient && currentVariant && currentVariant.id && (
        <div className="mt-2">
          <ShopPayButton
            variantIds={[currentVariant.id]}
            storeDomain={storeDomain}
            className="w-full"
          />
        </div>
      )}

      {/* Error message */}
      {showError && (
        <div className="text-red-500 text-sm">
          {errorMessage}
        </div>
      )}
    </div>
  );
} 