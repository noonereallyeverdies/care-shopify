import {Image, Money, OptimisticInput, useOptimisticData, CartForm} from '@shopify/hydrogen';
import type {CartLine} from '@shopify/hydrogen/storefront-api-types';
import type {HTMLAttributes} from 'react';
import {Link} from '~/components/Link';
import {IconRemove} from '~/components/Icon';
import {LazyHydrate} from '~/components/LazyHydrate';
import {useHydrationAnalysis} from '~/lib/HydrationUsage';

/**
 * Shared component for rendering a cart line item
 * Used in multiple places throughout the app
 */
export function CartLineItem({line}: {line: CartLine}) {
  const {trackInteraction} = useHydrationAnalysis(
    `cart-line-item-${line.id}`,
    'CartLineItem',
    'cart',
    'whenVisible'
  );
  
  if (!line?.id) return null;
  
  const {id, quantity, merchandise} = line;
  
  if (typeof quantity === 'undefined' || !merchandise?.product) return null;

  return (
    <li key={id} className="flex flex-col gap-2" onClick={trackInteraction}>
      <div className="flex gap-4">
        <div className="w-24 h-24 overflow-hidden rounded-md border">
          {merchandise.image && (
            <Image
              width={96}
              height={96}
              data={merchandise.image}
              className="object-cover object-center w-full h-full"
              alt={merchandise.title}
            />
          )}
        </div>
        
        <div className="grow flex flex-col">
          <Link
            to={`/products/${merchandise.product.handle}`}
            className="text-sm hover:underline"
          >
            {merchandise?.product?.title || ''}
          </Link>
          
          <div className="text-xs text-gray-500 mt-1">
            {merchandise?.selectedOptions?.map((option) => (
              <span key={option.name}>{option.name}: {option.value}</span>
            ))}
          </div>
          
          <div className="mt-auto pt-2 flex items-center justify-between">
            <LazyHydrate
              id={`cart-quantity-${id}`}
              whenToHydrate="onInteraction"
              priority={3}
            >
              <QuantityAdjuster line={line} />
            </LazyHydrate>
            
            <div className="text-sm font-medium">
              <CartLinePrice line={line} as="span" />
            </div>
          </div>
        </div>
        
        <div>
          <LazyHydrate
            id={`cart-remove-${id}`}
            whenToHydrate="onInteraction"
            priority={1}
          >
            <ItemRemoveButton lineId={id} />
          </LazyHydrate>
        </div>
      </div>
    </li>
  );
}

export function ItemRemoveButton({lineId}: {lineId: CartLine['id']}) {
  const {trackInteraction} = useHydrationAnalysis(
    `cart-remove-${lineId}`,
    'ItemRemoveButton',
    'cart',
    'onInteraction'
  );
  
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{
        lineIds: [lineId],
      }}
    >
      <button
        className="flex items-center justify-center w-8 h-8 border rounded-md hover:bg-gray-100"
        type="submit"
        aria-label="Remove from cart"
        onClick={trackInteraction}
      >
        <IconRemove aria-hidden="true" style={{height: 16}} />
      </button>
    </CartForm>
  );
}

export function QuantityAdjuster({line}: {line: CartLine}) {
  const {id: lineId, quantity} = line;
  const {trackInteraction} = useHydrationAnalysis(
    `cart-quantity-${lineId}`,
    'QuantityAdjuster',
    'cart',
    'onInteraction'
  );
  
  const [optimisticId, setOptimisticId] = useOptimisticData(`cart-line-${lineId}`);
  
  const optimisticData = optimisticId
    ? (JSON.parse(String(optimisticId)) as {quantity?: number})
    : {};
    
  const optimisticQuantity = optimisticData.quantity || quantity;

  return (
    <div 
      className="flex items-center border rounded-md overflow-hidden h-8"
      onClick={trackInteraction}
    >
      <UpdateCartButton
        lines={[
          {
            id: lineId,
            quantity: Math.max(0, optimisticQuantity - 1),
          },
        ]}
      >
        <OptimisticInput id={`cart-line-${lineId}`} data={{quantity: optimisticQuantity - 1}}>
          <button
            name="decrease-quantity"
            aria-label="Decrease quantity"
            className="w-8 h-8 flex items-center justify-center transition hover:bg-gray-100 disabled:cursor-wait"
            value={optimisticQuantity}
            disabled={optimisticQuantity <= 1}
          >
            −
          </button>
        </OptimisticInput>
      </UpdateCartButton>

      <div className="px-3 text-center">
        {optimisticQuantity}
      </div>

      <UpdateCartButton
        lines={[
          {
            id: lineId,
            quantity: Math.min(999, optimisticQuantity + 1),
          },
        ]}
      >
        <OptimisticInput id={`cart-line-${lineId}`} data={{quantity: optimisticQuantity + 1}}>
          <button
            name="increase-quantity"
            aria-label="Increase quantity"
            className="w-8 h-8 flex items-center justify-center transition hover:bg-gray-100"
            value={optimisticQuantity}
          >
            +
          </button>
        </OptimisticInput>
      </UpdateCartButton>
    </div>
  );
}

export function UpdateCartButton({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: {id: string; quantity: number}[];
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{
        lines,
      }}
    >
      {children}
    </CartForm>
  );
}

export function CartLinePrice({
  line,
  priceType = 'regular',
  ...passthroughProps
}: {
  line: CartLine;
  priceType?: 'regular' | 'compareAt';
} & HTMLAttributes<HTMLElement>) {
  if (!line?.cost?.amountPerQuantity || !line?.cost?.totalAmount) return null;

  const moneyV2 =
    priceType === 'regular'
      ? line.cost.totalAmount
      : line.cost.compareAtAmountPerQuantity;

  if (moneyV2 == null) {
    return null;
  }

  return <Money withoutTrailingZeros {...passthroughProps} data={moneyV2} />;
}
