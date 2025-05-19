import {Link} from '~/components/Link';
import {Text, Heading} from '~/components/Text';
import {Button} from '~/components/Button';
import {CartLoading} from '~/components/CartLoading';

/**
 * A simplified cart wrapper component to handle the cart display
 * This avoids import conflicts between different Hydrogen packages
 */
export function CartWrapper({cart}: {cart: any}) {
  if (!cart) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <CartLoading />
      </div>
    );
  }

  const linesCount = cart?.lines?.edges?.length || 0;
  const cartTotalQuantity = cart?.totalQuantity || 0;
  
  if (linesCount === 0) {
    return (
      <div className="flex flex-col space-y-7 justify-center items-center md:py-8 md:px-12 px-4 py-6 h-screen">
        <h2 className="text-4xl">Your cart is empty</h2>
        <Button
          as={Link}
          to="/collections/all"
          width="auto"
          className="w-80 bg-black text-white px-6 py-3 rounded-md"
        >
          Continue shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full pb-12 grid md:grid-cols-2 md:items-start gap-8 md:gap-8 lg:gap-12">
      <div className="grow">
        <CartLinesList cart={cart} />
      </div>
      
      <div className="sticky top-nav grid gap-6 p-4 md:px-6 md:translate-y-4 bg-primary/5 rounded w-full">
        <CartSummary cart={cart} />
        
        <div className="flex flex-col mt-2">
          <a href={cart.checkoutUrl} target="_self">
            <Button as="span" width="full">
              Continue to Checkout
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

function CartLinesList({cart}: {cart: any}) {
  const lines = cart?.lines?.edges?.map(edge => edge.node) || [];
  
  return (
    <ul className="grid gap-6 md:gap-10">
      {lines.map((line) => (
        <li key={line.id} className="flex gap-4">
          <div className="shrink">
            {line.merchandise?.image && (
              <img 
                src={line.merchandise.image.url}
                alt={line.merchandise.title || 'Product'}
                className="object-cover object-center w-24 h-24 border rounded md:w-28 md:h-28"
                width={112}
                height={112}
              />
            )}
          </div>
          
          <div className="flex justify-between grow">
            <div className="grid gap-2">
              <Heading as="h3" size="copy">
                {line.merchandise?.product?.handle ? (
                  <Link to={`/products/${line.merchandise.product.handle}`}>
                    {line.merchandise?.product?.title || ''}
                  </Link>
                ) : (
                  <Text>{line.merchandise?.product?.title || ''}</Text>
                )}
              </Heading>
              
              <div className="grid pb-2">
                {(line.merchandise?.selectedOptions || []).map((option) => (
                  <Text color="subtle" key={option.name}>
                    {option.name}: {option.value}
                  </Text>
                ))}
              </div>
              
              <Text>
                Quantity: {line.quantity}
              </Text>
            </div>
            
            <Text>
              ${parseFloat(line.cost?.totalAmount?.amount || '0').toFixed(2)}
            </Text>
          </div>
        </li>
      ))}
    </ul>
  );
}

function CartSummary({cart}: {cart: any}) {
  const subtotalAmount = parseFloat(cart?.cost?.subtotalAmount?.amount || '0').toFixed(2);
  
  return (
    <div>
      <dl className="grid">
        <div className="flex items-center justify-between font-medium">
          <Text as="dt">Subtotal</Text>
          <Text as="dd" data-test="subtotal">
            ${subtotalAmount}
          </Text>
        </div>
      </dl>
    </div>
  );
} 