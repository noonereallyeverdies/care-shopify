import {useEffect, useState} from 'react';
import {Money, ShopPayButton, useCart} from '@shopify/hydrogen-react';
import {Link, useNavigation} from '@remix-run/react';
import type { 
  ProductVariant, 
  SellingPlan, 
  Product
} from '@shopify/hydrogen/storefront-api-types';
import { StarRating } from '~/components/StarRating';

type ProductFormProps = {
  product: Product;
  selectedVariant: ProductVariant;
  variants: ProductVariant[];
};

export function ProductForm({
  product,
  selectedVariant,
  variants,
}: ProductFormProps) {
  const {lines, status: cartStatus, linesAdd} = useCart();
  const {state} = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [currentVariant, setCurrentVariant] = useState(selectedVariant);
  const [showError, setShowError] = useState(false);
  const [optionSelections, setOptionSelections] = useState(
    selectedVariant?.selectedOptions || []
  );

  const sellingPlanGroups = product.sellingPlanGroups?.nodes || [];
  const hasSellingPlans = sellingPlanGroups.length > 0;
  
  // Reset quantity when variant changes
  useEffect(() => {
    if (selectedVariant) {
      setCurrentVariant(selectedVariant);
      setOptionSelections(selectedVariant.selectedOptions);
    }
  }, [selectedVariant]);

  // Fix for variant selection
  const handleOptionChange = (optionName, value) => {
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
    const matchedVariant = variants.find(variant => {
      return variant.selectedOptions.every(option => {
        const selection = newSelections.find(sel => sel.name === option.name);
        return selection?.value === option.value;
      });
    });

    if (matchedVariant) {
      setCurrentVariant(matchedVariant);
    }
  };

  const handleAddToCart = async () => {
    if (!currentVariant?.availableForSale) {
      setShowError(true);
      return;
    }

    // Reset error state
    setShowError(false);

    // Check if product is in stock
    if (currentVariant.quantityAvailable != null && quantity > currentVariant.quantityAvailable) {
      setShowError(true);
      return;
    }

    // Add to cart using linesAdd from hydrogen-react
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
      {/* Options selector */}
      {product.options.map(option => (
        <div key={option.name} className="grid gap-2">
          <h3 className="text-sm font-medium text-neutral-900">{option.name}</h3>
          <div className="flex flex-wrap gap-2">
            {option.values.map(value => (
              <button
                key={value}
                onClick={() => handleOptionChange(option.name, value)}
                className={`px-3 py-2 text-sm rounded-md border transition
                  ${
                    optionSelections.some(
                      selection => selection.name === option.name && selection.value === value
                    )
                      ? 'border-black bg-black text-white'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }
                `}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Quantity selector */}
      <div className="grid gap-2">
        <label htmlFor="quantity" className="text-sm font-medium text-neutral-900">
          Quantity
        </label>
        <div className="flex items-center border border-neutral-200 rounded-md w-32">
          <button
            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
            className="w-10 h-10 flex items-center justify-center text-neutral-600 hover:text-black transition"
            disabled={isLoading}
          >
            <span className="sr-only">Decrease quantity</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={quantity}
            onChange={e => setQuantity(parseInt(e.target.value))}
            className="w-full border-none text-center text-neutral-900 focus:ring-0"
          />
          <button
            onClick={() => setQuantity(prev => prev + 1)}
            className="w-10 h-10 flex items-center justify-center text-neutral-600 hover:text-black transition"
            disabled={isLoading}
          >
            <span className="sr-only">Increase quantity</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8H13M8 3V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Add to Cart button */}
      <div className="grid gap-4">
        <form action="/cart" method="post">
          <input type="hidden" name="cartAction" value="ADD_TO_CART" />
          <input type="hidden" name="lines[0][merchandiseId]" value={currentVariant?.id} />
          <input type="hidden" name="lines[0][quantity]" value={quantity} />
          
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
            disabled={isOutOfStock || isLoading}
            className={`w-full py-3 px-4 rounded-md text-base font-medium text-white 
              ${isOutOfStock 
                ? 'bg-neutral-400 cursor-not-allowed' 
                : isLoading 
                  ? 'bg-neutral-700' 
                  : 'bg-black hover:bg-neutral-800'
              } transition`}
          >
            {isOutOfStock 
              ? 'Out of stock' 
              : isLoading 
                ? 'Adding...' 
                : 'Add to cart'}
          </button>
        </form>

        {/* Shop Pay button */}
        {currentVariant && (
          <div className="mt-2">
            <ShopPayButton
              variantIds={[currentVariant.id]}
              storeDomain={window.location.host}
              className="w-full"
            />
          </div>
        )}
      </div>

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