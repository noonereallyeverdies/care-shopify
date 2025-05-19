import {CartForm} from '@shopify/hydrogen';
import type {CartType} from '@shopify/hydrogen/storefront-api-types';
import {Text} from '~/components/Text';
import {IconRemove} from '~/components/Icon';
import {getInputStyleClasses} from '~/lib/utils';
import {LazyHydrate} from '~/components/LazyHydrate';
import {useHydrationAnalysis} from '~/lib/HydrationUsage';
import clsx from 'clsx';

/**
 * Shared component for handling discount codes
 * Reusable across cart and checkout contexts
 */
export function CartDiscounts({
  discountCodes,
}: {
  discountCodes: CartType['discountCodes'];
}) {
  const {trackInteraction} = useHydrationAnalysis(
    'cart-discounts',
    'CartDiscounts',
    'cart',
    'whenIdle'
  );
  
  const codes: string[] =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({code}) => code) || [];

  return (
    <div onClick={trackInteraction}>
      {/* Have existing discount, display it with a remove option */}
      <dl className={codes && codes.length !== 0 ? 'grid mb-4' : 'hidden'}>
        <div className="flex items-center justify-between font-medium">
          <Text as="dt">Discount(s)</Text>
          <div className="flex items-center justify-between">
            <LazyHydrate
              id="cart-discount-remove"
              whenToHydrate="onInteraction"
              priority={1}
            >
              <UpdateDiscountForm>
                <button className="flex items-center">
                  <IconRemove
                    aria-hidden="true"
                    style={{height: 18, marginRight: 4}}
                  />
                </button>
              </UpdateDiscountForm>
            </LazyHydrate>
            <Text as="dd">{codes?.join(', ')}</Text>
          </div>
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <LazyHydrate
        id="cart-discount-form"
        whenToHydrate="whenIdle"
        priority={1}
      >
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
      </LazyHydrate>
    </div>
  );
}

export function UpdateDiscountForm({
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
