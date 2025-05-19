import { type ActionFunctionArgs, json } from '@shopify/remix-oxygen';
import invariant from 'tiny-invariant';

export async function action({ request, context }: ActionFunctionArgs) {
  const { session, storefront } = context;
  
  // Get the form data
  const formData = await request.formData();
  const action = formData.get('cartAction');
  
  try {
    switch (action) {
      case 'add': {
        return await handleAddToCart(formData, context);
      }
      case 'remove': {
        return await handleRemoveFromCart(formData, context);
      }
      case 'update': {
        return await handleUpdateCart(formData, context);
      }
      default: {
        return json(
          { error: 'Invalid cart action' },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    console.error('Cart action error:', error);
    
    if (error instanceof Response) {
      return error;
    }
    
    return json(
      { 
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        success: false 
      }, 
      { status: 500 }
    );
  }
}

async function handleAddToCart(formData: FormData, { cart, storefront }: ActionFunctionArgs['context']) {
  // Get form data fields
  const merchandiseId = formData.get('merchandiseId') as string;
  const quantity = parseInt(formData.get('quantity') as string, 10);
  
  // Validate the input
  invariant(merchandiseId, 'Missing merchandiseId');
  invariant(quantity > 0, 'Quantity must be greater than 0');

  // Add the item to the cart
  const { linesAdd } = await cart.addLines([
    {
      merchandiseId,
      quantity,
    },
  ]);

  return json({ 
    success: true, 
    cartId: cart.id, 
    lines: linesAdd,
    message: 'Item added to cart'
  });
}

async function handleRemoveFromCart(formData: FormData, { cart, storefront }: ActionFunctionArgs['context']) {
  // Get the line ID to remove
  const lineId = formData.get('lineId') as string;
  
  // Validate the input
  invariant(lineId, 'Missing lineId');

  // Remove the line from the cart
  const { linesRemove } = await cart.removeLines([lineId]);

  return json({ 
    success: true, 
    cartId: cart.id, 
    lines: linesRemove,
    message: 'Item removed from cart'
  });
}

async function handleUpdateCart(formData: FormData, { cart, storefront }: ActionFunctionArgs['context']) {
  // Get the line ID and new quantity
  const lineId = formData.get('lineId') as string;
  const quantity = parseInt(formData.get('quantity') as string, 10);
  
  // Validate the input
  invariant(lineId, 'Missing lineId');
  invariant(quantity >= 0, 'Quantity must be 0 or greater');

  // If quantity is 0, remove the line
  if (quantity === 0) {
    return handleRemoveFromCart(formData, { cart, storefront } as any);
  }

  // Update the line in the cart
  const { linesUpdate } = await cart.updateLines([
    {
      id: lineId,
      quantity,
    },
  ]);

  return json({ 
    success: true, 
    cartId: cart.id, 
    lines: linesUpdate,
    message: 'Cart updated'
  });
}
