import {CartForm, Image, Money} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import {useVariantUrl} from '~/lib/utils';
import {IconRemove} from '~/components/Icon';
import type {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';

export function Cart({layout, cart, onClose}: CartProps) {
  // Safely check if cart has lines with edges array with proper length
  const linesCount = !!(cart?.lines?.edges && Array.isArray(cart.lines.edges) && cart.lines.edges.length > 0);

  return (
    <div className="flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {!linesCount && (
          <div className="flex flex-col space-y-7 justify-center items-center md:py-8 md:px-12 px-4 py-6 h-screen">
            <h2 className="whitespace-pre-wrap max-w-prose font-bold text-4xl">
              Your cart is empty
            </h2>
            <Link
              to="/collections"
              onClick={onClose}
              className="w-full max-w-xl bg-primary text-contrast py-3 px-4 rounded-sm font-medium text-center"
            >
              Continue shopping
            </Link>
          </div>
        )}
        <div className="px-4 py-6 md:gap-20 md:px-12 md:py-8">
          {linesCount ? (
            <div>
              <div className="mb-4">
                <CartEmpty hidden={linesCount} onClose={onClose} layout={layout} />
              </div>
              <CartDetails cart={cart} layout={layout} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// Stub components to be completed as necessary
function CartDetails({cart, layout}: CartProps) {
  // Safely handle array access
  const linesCount = cart?.lines?.edges?.length || 0;
  
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="font-bold text-xl">Your Cart</h2>
      <p className="text-sm text-gray-500">
        {linesCount} {linesCount === 1 ? 'item' : 'items'}
      </p>
      <div className="border-t border-gray-200 pt-4">
        {(cart?.lines?.edges || []).map((line) => (
          <div key={line?.node?.id || Math.random().toString()} className="flex items-center space-x-4 py-4 border-b border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-md"></div>
            <div className="flex-1">
              <p className="font-medium">{line?.node?.merchandise?.product?.title || 'Product'}</p>
              <p className="text-sm text-gray-500">{line?.node?.merchandise?.title || 'Variant'}</p>
              <p className="text-sm font-medium">${line?.node?.cost?.totalAmount?.amount || '0.00'}</p>
            </div>
            <div>
              <button aria-label="Remove item" className="text-gray-500 hover:text-gray-700">
                <IconRemove />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-4">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p className="font-medium">${cart?.cost?.subtotalAmount?.amount || '0.00'}</p>
        </div>
        <div className="flex justify-between mt-2">
          <p>Shipping & taxes</p>
          <p className="text-gray-500">Calculated at checkout</p>
        </div>
        <div className="mt-6">
          <button className="w-full bg-black text-white py-3 rounded-md font-medium">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

function CartEmpty({hidden = false, layout, onClose}: CartProps) {
  return (
    <div hidden={hidden} className="flex flex-col space-y-7 justify-center items-center">
      <h2 className="whitespace-pre-wrap max-w-prose font-bold text-4xl">
        Your cart is empty
      </h2>
      <Link
        to="/collections"
        onClick={onClose}
        className="w-full bg-primary text-contrast py-3 px-4 rounded-sm font-medium text-center"
      >
        Continue shopping
      </Link>
    </div>
  );
}

interface CartProps {
  layout?: 'page' | 'drawer';
  cart?: any; // Simplified for example
  onClose?: () => void;
  [key: string]: any;
}
