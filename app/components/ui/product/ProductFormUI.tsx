import type { ProductOption, ProductVariant } from '@shopify/hydrogen/storefront-api-types';
import { ShopPayButton } from '@shopify/hydrogen-react';

type ProductFormUIProps = {
  options: ProductOption[];
  optionSelections: Array<{ name: string; value: string }>;
  handleOptionChange: (optionName: string, value: string) => void;
  quantity: number;
  setQuantity: (value: number) => void;
  handleAddToCart: () => void;
  isOutOfStock: boolean;
  isLoading: boolean;
  showError: boolean;
  currentVariant: ProductVariant | null;
  errorMessage: string;
  colorMap: Record<string, string>;
};

export function ProductFormUI({
  options,
  optionSelections,
  handleOptionChange,
  quantity,
  setQuantity,
  handleAddToCart,
  isOutOfStock,
  isLoading,
  showError,
  currentVariant,
  errorMessage,
  colorMap,
}: ProductFormUIProps) {
  return (
    <div className="grid gap-6">
      {/* Options selector */}
      {options.map(option => (
        <div key={option.name} className="grid gap-2">
          <h3 className="text-sm font-medium text-neutral-900">{option.name}</h3>
          <div className="flex flex-wrap gap-2">
            {option.values.map(value => {
              const isSelected = optionSelections.some(
                selection => selection.name === option.name && selection.value === value
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
      <div className="grid gap-2">
        <label htmlFor="quantity" className="text-sm font-medium text-neutral-900">
          Quantity
        </label>
        <div className="flex items-center border border-neutral-200 rounded-md w-32">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
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
            onClick={() => setQuantity(quantity + 1)}
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
          {errorMessage}
        </div>
      )}
    </div>
  );
}
