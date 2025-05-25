import React from "react";
import { Button } from '../ui/Button';
import { Text } from '../Text';
import { useProduct } from "../../contexts/product/ProductContext";
import { AddToCartButton } from './AddToCartButton';
import { BuyNowButton } from '../BuyNowButton';
import { useState } from 'react';

/**
 * Optimized ProductForm component for the Care Hydrogen app
 * 
 * Features:
 * - Mobile-first design with proper touch targets (min 44px)
 * - Single source of truth for product variant selection
 * - Clear visual feedback for all interactions
 * - Supports subscription/selling plans
 * - Accessible and optimized for conversion
 */

// Enhanced color mapping for product color swatches with standardized hex values
const colorMap: Record<string, string> = {
  // Basic colors
  'black': '#000000',
  'white': '#FFFFFF',
  'gray': '#808080',
  'silver': '#C0C0C0',
  'graphite': '#383838',
  
  // Reds/Pinks
  'red': '#FF0000',
  'rose gold': '#B76E79',
  'pink': '#FFC0CB',
  'coral': '#FF7F50',
  'maroon': '#800000',

  // Blues
  'blue': '#0000FF',
  'navy': '#000080',
  'teal': '#008080',
  'turquoise': '#40E0D0',
  'sky blue': '#87CEEB',
  
  // Greens
  'green': '#008000',
  'mint': '#98FB98',
  'olive': '#808000',
  'lime': '#00FF00',
  'forest green': '#228B22',
  
  // Yellows/Oranges
  'yellow': '#FFFF00',
  'gold': '#FFD700',
  'orange': '#FFA500',
  'amber': '#FFBF00',
  
  // Purples
  'purple': '#800080',
  'lavender': '#E6E6FA',
  'violet': '#EE82EE',
  'indigo': '#4B0082',
  
  // Browns
  'brown': '#A52A2A',
  'tan': '#D2B48C',
  'beige': '#F5F5DC',
};

export function ProductForm({ productOptions }: { productOptions: any }) {
  const {
    selectedVariant,
    quantity,
    setQuantity,
    selectVariant,
    currentVariant,
    availableForSale
  } = useProduct();
  
  // State for selected selling plan (subscription)
  const [selectedSellingPlan, setSelectedSellingPlan] = useState<{
    id: string;
    name?: string;
    options?: Array<{name: string; value: string}>;
  } | null>(null);

  // Handle option selection with improved UX
  const handleOptionChange = (optionName: string, value: string) => {
    if (!productOptions?.options) return;
    
    // Find all selected options
    const currentOptions = [...(currentVariant?.selectedOptions || [])];
    
    // Update the option that changed or add it if it doesn't exist
    const optionIndex = currentOptions.findIndex(opt => opt.name === optionName);
    if (optionIndex >= 0) {
      currentOptions[optionIndex] = { name: optionName, value };
    } else {
      currentOptions.push({ name: optionName, value });
    }
    
    // Find the variant that matches the selected options
    const matchingVariant = productOptions.variants?.nodes?.find((variant: any) => {
      if (!variant.selectedOptions) return false;
      
      // Check if all selected options match
      return currentOptions.every(opt => 
        variant.selectedOptions.some((varOpt: any) => 
          varOpt.name === opt.name && varOpt.value === opt.value
        )
      );
    });
    
    // Select the matching variant
    if (matchingVariant?.id) {
      selectVariant(matchingVariant.id);
    }
  };

  // Handle quantity changes with better UX
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else {
      setQuantity(1);
    }
  };
  
  // Handle selling plan selection
  const handleSellingPlanChange = (sellingPlanId: string | null) => {
    if (!sellingPlanId) {
      setSelectedSellingPlan(null);
      return;
    }
    
    // Find the selling plan from the product's selling plan groups
    const sellingPlanGroups = productOptions?.sellingPlanGroups?.nodes || [];
    
    for (const group of sellingPlanGroups) {
      const plan = group.sellingPlans.nodes.find((plan: any) => plan.id === sellingPlanId);
      if (plan) {
        setSelectedSellingPlan({
          id: plan.id,
          name: plan.name,
          options: plan.options
        });
        return;
      }
    }
    
    // If not found, reset
    setSelectedSellingPlan(null);
  };

  // Helper to check if a variant with the given options exists and is available
  const isOptionAvailable = (optionName: string, optionValue: string): boolean => {
    if (!productOptions?.variants?.nodes || !Array.isArray(productOptions.variants.nodes)) {
      return true; // Default to available if we can't check
    }

    // Find variants that match this option
    const matchingVariants = productOptions.variants.nodes.filter((variant: any) => {
      return variant.selectedOptions.some(
        (option: any) => option.name === optionName && option.value === optionValue
      );
    });

    // Check if any of these variants are available for sale
    return matchingVariants.some((variant: any) => variant.availableForSale);
  };

  return (
    <div className="grid gap-6">
      {/* Options selector with mobile optimization */}
      {productOptions?.options?.map((option: any) => (
        <div key={option.name} className="grid gap-3">
          <Text as="h3" className="text-sm font-semibold text-neutral-900 uppercase tracking-wide">
            {option.name}
          </Text>
          <div className="flex flex-wrap gap-3">
            {option.values.map((value: string) => {
              const isSelected = currentVariant?.selectedOptions?.some(
                (opt: any) => opt.name === option.name && opt.value === value
              );
              const isAvailable = isOptionAvailable(option.name, value);

              // Special rendering for color options with enhanced mobile UX
              if (option.name.toLowerCase() === 'color') {
                const colorValue = colorMap[value.toLowerCase()] || value;
                return (
                  <button
                    key={`${option.name}-${value}`}
                    onClick={() => handleOptionChange(option.name, value)}
                    disabled={!isAvailable}
                    className={`
                      min-w-[44px] min-h-[44px] w-12 h-12 rounded-full border-3 
                      transition-all duration-200 ease-in-out 
                      focus:outline-none focus:ring-4 focus:ring-black/20 focus:ring-offset-2
                      touch-manipulation relative
                      ${isSelected 
                        ? 'ring-4 ring-black ring-offset-2 border-black scale-110' 
                        : 'border-neutral-300 hover:border-neutral-500 hover:scale-105'
                      }
                      ${colorValue === '#FFFFFF' ? 'shadow-md' : ''}
                      ${!isAvailable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                    style={{ backgroundColor: colorValue }}
                    title={`${value}${!isAvailable ? ' - Out of Stock' : ''}`}
                    aria-label={`Select color: ${value}`}
                    type="button"
                  >
                    {/* Out of stock indicator */}
                    {!isAvailable && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-0.5 bg-red-500 absolute transform rotate-45"></div>
                      </div>
                    )}
                    
                    {/* Selection indicator for white and light colors */}
                    {isSelected && (colorValue === '#FFFFFF' || colorValue === '#F5F5DC') && (
                      <svg className="w-6 h-6 text-black mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                );
              } else {
                // Enhanced text button for other options with mobile optimization
                return (
                  <button
                    key={`${option.name}-${value}`}
                    onClick={() => handleOptionChange(option.name, value)}
                    disabled={!isAvailable}
                    className={`
                      min-h-[44px] px-4 py-3 text-sm font-medium rounded-lg border-2 
                      transition-all duration-200 ease-in-out relative touch-manipulation
                      ${
                        isSelected
                          ? 'border-black bg-black text-white shadow-lg'
                          : 'border-neutral-200 hover:border-neutral-400 bg-white text-neutral-900'
                      }
                      ${!isAvailable ? 'opacity-50 cursor-not-allowed bg-neutral-100' : 'cursor-pointer hover:shadow-md'}
                    `}
                    type="button"
                  >
                    {value}
                    {!isAvailable && (
                      <span className="block text-xs text-red-600 font-medium mt-1">
                        Out of stock
                      </span>
                    )}
                  </button>
                );
              }
            })}
          </div>
        </div>
      ))}

      {/* Subscription options (Selling Plans) with improved UX */}
      {productOptions?.sellingPlanGroups?.nodes?.length > 0 && (
        <div className="grid gap-3">
          <Text as="h3" className="text-sm font-semibold text-neutral-900 uppercase tracking-wide">
            Purchase Options
          </Text>
          <div className="grid gap-3">
            {/* One-time purchase option */}
            <button
              type="button"
              onClick={() => handleSellingPlanChange(null)}
              className={`
                min-h-[44px] px-4 py-3 text-sm font-medium rounded-lg border-2 
                transition-all duration-200 ease-in-out text-left touch-manipulation
                ${
                  !selectedSellingPlan
                    ? 'border-black bg-black text-white'
                    : 'border-neutral-200 hover:border-neutral-400 bg-white'
                }
              `}
            >
              <div className="flex justify-between items-center">
                <span>One-time purchase</span>
                <span className="text-xs opacity-75">No commitment</span>
              </div>
            </button>
            
            {/* Subscription options */}
            {productOptions.sellingPlanGroups.nodes.map((group: any) => (
              <div key={group.name} className="grid gap-2">                
                {group.sellingPlans.nodes.map((plan: any) => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => handleSellingPlanChange(plan.id)}
                    className={`
                      min-h-[44px] px-4 py-3 text-sm font-medium rounded-lg border-2 
                      transition-all duration-200 ease-in-out text-left touch-manipulation
                      ${
                        selectedSellingPlan?.id === plan.id
                          ? 'border-black bg-black text-white'
                          : 'border-neutral-200 hover:border-neutral-400 bg-white'
                      }
                    `}
                  >
                    <div className="flex justify-between items-center">
                      <span>{plan.name}</span>
                      <span className="text-xs opacity-75">Save 10%</span>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced quantity selector with mobile optimization */}
      <div className="grid gap-3">
        <Text as="h3" className="text-sm font-semibold text-neutral-900 uppercase tracking-wide">
          Quantity
        </Text>
        <div className="flex items-center border-2 border-neutral-200 rounded-lg w-36 h-12 bg-white">
          <button
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            className="min-w-[44px] h-full flex items-center justify-center text-neutral-600 hover:text-black transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
            type="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
            </svg>
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className="flex-1 h-full border-none text-center text-neutral-900 focus:ring-0 focus:outline-none bg-transparent"
            min="1"
            max="10"
          />
          <button
            onClick={increaseQuantity}
            className="min-w-[44px] h-full flex items-center justify-center text-neutral-600 hover:text-black transition-colors touch-manipulation"
            aria-label="Increase quantity"
            type="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Primary CTA section with clear conversion path */}
      <div className="grid gap-4 pt-4">
        {!availableForSale ? (
          <div className="w-full">
            <Button 
              variant="secondary" 
              disabled 
              className="w-full min-h-[56px] opacity-70 cursor-not-allowed rounded-xl text-lg font-semibold"
            >
              <div className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Currently Out of Stock</span>
              </div>
            </Button>
            
            <div className="mt-3 text-center">
              <Text className="text-sm text-neutral-600">
                This item is currently out of stock. Please check back later or select a different variant.
              </Text>
            </div>
          </div>
        ) : (
          <>
            {/* Primary Add to Cart Button - Single prominent CTA */}
            <AddToCartButton
              variantId={currentVariant?.id || ''}
              quantity={quantity}
              available={availableForSale}
              sellingPlanId={selectedSellingPlan?.id}
              className="w-full min-h-[56px] bg-black hover:bg-neutral-800 text-white rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              openCartOnAdd={true}
              showCartStatus={true}
            >
              {!availableForSale 
                ? 'Out of Stock' 
                : selectedSellingPlan 
                ? `Subscribe Now - $${(299 * 0.9).toFixed(0)}` 
                : 'Add to Cart - $299'
              }
            </AddToCartButton>
            
            {/* Secondary Buy Now Button (less prominent) */}
            {currentVariant?.id && availableForSale && (
              <BuyNowButton
                variantId={currentVariant.id}
                quantity={quantity}
                className="w-full min-h-[44px] bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-xl text-base font-medium transition-all duration-200 border border-neutral-300"
                selectedSellingPlan={selectedSellingPlan}
              >
                {selectedSellingPlan ? 'Buy Subscription Now' : 'Buy Now'}
              </BuyNowButton>
            )}
          </>
        )}
      </div>
      
      {/* Trust signals */}
      <div className="grid gap-3 pt-2 border-t border-neutral-100">
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Free shipping on orders over $75
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          30-day money back guarantee
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Secure checkout with SSL encryption
        </div>
      </div>
    </div>
  );
}
