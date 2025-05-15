import clsx from 'clsx';
import {useRef, Suspense, ErrorBoundary} from 'react';
import useScroll from 'react-use/esm/useScroll';
import {
  flattenConnection,
  CartForm,
  Image,
  Money,
  useOptimisticData,
  OptimisticInput,
  type CartReturn,
} from '@shopify/hydrogen';
import type {
  Cart as CartType,
  CartCost,
  CartLine,
  CartLineUpdateInput,
} from '@shopify/hydrogen/storefront-api-types';

import {Button} from '~/components/Button';
import {Text, Heading} from '~/components/Text';
import {Link} from '~/components/Link';
import {IconRemove, IconClose} from '~/components/Icon';
import {FeaturedProducts} from '~/components/FeaturedProducts';
import {getInputStyleClasses} from '~/lib/utils';
import {CartLoading} from '~/components/CartLoading';
import {Drawer} from '~/components/Drawer';
import {useCart} from '~/lib/useCart';

type Layouts = 'page' | 'drawer';

export function Cart({
  layout,
  onClose,
  cart,
}: {
  layout: Layouts;
  onClose?: () => void;
  cart: CartReturn | null;
}) {
  const linesCount = Boolean(cart?.lines?.edges?.length || 0);

  if (!cart) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <CartLoading />
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<div className="p-4 text-red-500">Error loading cart items</div>}>
      <Suspense fallback={
        <div className="flex items-center justify-center w-full h-64">
          <CartLoading />
        </div>
      }>
        <div className="flex flex-col h-full">
          <CartEmpty hidden={linesCount} onClose={onClose} layout={layout} />
          <CartDetails cart={cart} layout={layout} onClose={onClose} />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export function CartDetails({
  layout,
  cart,
  onClose,
}: {
  layout: Layouts;
  cart: CartType | null;
  onClose?: () => void;
}) {
  // @todo: get optimistic cart cost
  const cartHasItems = !!cart && cart.totalQuantity > 0;
  const container = {
    drawer: 'grid grid-cols-1 h-full grid-rows-[1fr_auto]',
    page: 'w-full pb-12 grid md:grid-cols-2 md:items-start gap-8 md:gap-8 lg:gap-12',
  };

  return (
    <div className={container[layout]}>
      {layout === 'drawer' && (
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-medium">Your Cart ({cart?.totalQuantity || 0})</h2>
          {onClose && (
            <button 
              onClick={onClose}
              className="p-2 -mr-2 transition rounded-md hover:bg-gray-100"
              aria-label="Close cart"
            >
              <IconClose />
            </button>
          )}
        </div>
      )}
      <CartLines lines={cart?.lines} layout={layout} />
      {cartHasItems && (
        <CartSummary cost={cart.cost} layout={layout}>
          <CartDiscounts discountCodes={cart.discountCodes} />
          <CartCheckoutActions checkoutUrl={cart.checkoutUrl} />
        </CartSummary>
      )}
    </div>
  );
}

/**
 * Temporary discount UI
 * @param discountCodes the current discount codes applied to the cart
 * @todo rework when a design is ready
 */
function CartDiscounts({
  discountCodes,
}: {
  discountCodes: CartType['discountCodes'];
}) {
  const codes: string[] =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({code}) => code) || [];

  return (
    <>
      {/* Have existing discount, display it with a remove option */}
      <dl className={codes && codes.length !== 0 ? 'grid mb-4' : 'hidden'}>
        <div className="flex items-center justify-between font-medium">
          <Text as="dt">Discount(s)</Text>
          <div className="flex items-center justify-between">
            <UpdateDiscountForm>
              <button className="flex items-center">
                <IconRemove
                  aria-hidden="true"
                  style={{height: 18, marginRight: 4}}
                />
              </button>
            </UpdateDiscountForm>
            <Text as="dd">{codes?.join(', ')}</Text>
          </div>
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <UpdateDiscountForm discountCodes={codes}>
        <div
          className={clsx(
            'flex',
            'items-center gap-4 justify-between text-copy',
          )}
        >
          <input
            className={getInputStyleClasses()}
            type="text"
            name="discountCode"
            placeholder="Discount code"
          />
          <button className="flex justify-end font-medium whitespace-nowrap">
            Apply Discount
          </button>
        </div>
      </UpdateDiscountForm>
    </>
  );
}

function UpdateDiscountForm({
  discountCodes,
  children,
}: {
  discountCodes?: string[];
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

function CartLines({
  layout = 'drawer',
  lines: cartLines,
}: {
  layout: Layouts;
  lines: CartType['lines'] | undefined;
}) {
  const currentLines = cartLines ? flattenConnection(cartLines) : [];
  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);

  const className = clsx([
    layout === 'page'
      ? 'flex-grow md:translate-y-4'
      : 'flex-grow px-6 pb-6 overflow-auto transition md:px-6',
  ]);

  return (
    <section
      ref={scrollRef}
      aria-labelledby="cart-contents"
      className={className}
    >
      <ul className="grid gap-6 pt-4 md:gap-8">
        {currentLines.map((line) => (
          <CartLineItem key={line.id} line={line as CartLine} />
        ))}
      </ul>
    </section>
  );
}

function CartCheckoutActions({checkoutUrl}: {checkoutUrl: string}) {
  if (!checkoutUrl) return null;

  return (
    <div className="flex flex-col mt-4">
      <a href={checkoutUrl} target="_self">
        <Button as="span" width="full">
          Continue to Checkout
        </Button>
      </a>
      <div className="mt-4 text-center">
        <Link to="/collections/all" className="text-sm text-gray-500 hover:text-gray-900">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

function CartSummary({
  cost,
  layout,
  children = null,
}: {
  children?: React.ReactNode;
  cost: CartCost;
  layout: Layouts;
}) {
  const summary = {
    drawer: 'grid gap-4 p-6 border-t md:px-6 bg-gray-50',
    page: 'sticky top-nav grid gap-6 p-4 md:px-6 md:translate-y-4 bg-primary/5 rounded w-full',
  };

  return (
    <section aria-labelledby="summary-heading" className={summary[layout]}>
      <h2 id="summary-heading" className="sr-only">
        Order summary
      </h2>
      <dl className="grid gap-2">
        <div className="flex items-center justify-between font-medium">
          <Text as="dt">Subtotal</Text>
          <Text as="dd" data-test="subtotal">
            {cost?.subtotalAmount?.amount ? (
              <Money data={cost?.subtotalAmount} />
            ) : (
              '-'
            )}
          </Text>
        </div>
        <div className="flex items-center justify-between font-medium">
          <Text as="dt">Shipping</Text>
          <Text as="dd">Calculated at checkout</Text>
        </div>
        <div className="flex items-center justify-between font-medium pt-2 mt-2 border-t">
          <Text as="dt" className="text-lg">Total</Text>
          <Text as="dd" data-test="subtotal" className="text-lg">
            {cost?.totalAmount?.amount ? (
              <Money data={cost?.totalAmount} />
            ) : (
              '-'
            )}
          </Text>
        </div>
      </dl>
      
      {children}
    </section>
  );
}

type OptimisticData = {
  action?: string;
  quantity?: number;
};

function CartLineItem({line}: {line: CartLine}) {
  if (!line?.id) return null;
  
  const {id, quantity, merchandise} = line;
  
  if (typeof quantity === 'undefined' || !merchandise?.product) return null;

  return (
    <li key={id} className="flex flex-col gap-2">
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
        
        <div className="flex-grow flex flex-col">
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
            <QuantityAdjuster line={line} />
            <div className="text-sm font-medium">
              <CartLinePrice line={line} as="span" />
            </div>
          </div>
        </div>
        
        <div>
          <ItemRemoveButton lineId={id} />
        </div>
      </div>
    </li>
  );
}

function ItemRemoveButton({lineId}: {lineId: CartLine['id']}) {
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
      >
        <IconRemove aria-hidden="true" style={{height: 16}} />
      </button>
    </CartForm>
  );
}

function QuantityAdjuster({line}: {line: CartLine}) {
  const {id: lineId, quantity} = line;
  
  const [optimisticId, setOptimisticId] = useOptimisticData(`cart-line-${lineId}`);
  
  const optimisticData: OptimisticData = optimisticId
    ? (JSON.parse(String(optimisticId)) as OptimisticData)
    : {};
    
  const optimisticQuantity = optimisticData.quantity || quantity;

  return (
    <div className="flex items-center border rounded-md overflow-hidden h-8">
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

function UpdateCartButton({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
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

function CartLinePrice({
  line,
  priceType = 'regular',
  ...passthroughProps
}: {
  line: CartLine;
  priceType?: 'regular' | 'compareAt';
  [key: string]: any;
}) {
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

export function CartEmpty({
  hidden = false,
  layout = 'drawer',
  onClose,
}: {
  hidden: boolean;
  layout?: Layouts;
  onClose?: () => void;
}) {
  const container = {
    drawer: 'h-full flex flex-col justify-center items-center px-4',
    page: 'flex flex-col justify-center items-center w-full',
  };

  return (
    <div className={clsx(container[layout], {hidden})}>
      <div className="flex flex-col space-y-6 w-full text-center items-center justify-center">
        <h2 className="whitespace-pre-wrap max-w-prose font-bold text-2xl">
          Your cart is empty
        </h2>
        <div className="max-w-md text-center">
          <p>Looks like you haven't added any items to your cart yet.</p>
        </div>
        <div>
          <Button
            onClick={onClose}
            className="w-auto"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
