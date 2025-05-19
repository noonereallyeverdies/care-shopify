/**
 * Cart Service
 * Handles cart functionality and calculations
 */

/**
 * Calculate cart totals including discounts and taxes
 */
export function calculateCartTotals(cartItems, discountCode = null, taxRate = 0.0825) {
  // Validate inputs
  if (!Array.isArray(cartItems)) {
    throw new Error('Cart items must be an array');
  }
  
  // Initialize totals
  const totals = {
    subtotal: 0,
    discount: 0,
    tax: 0,
    shipping: 0,
    total: 0,
  };
  
  // Calculate subtotal
  totals.subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price);
    const quantity = parseInt(item.quantity, 10);
    
    if (isNaN(price) || isNaN(quantity)) {
      throw new Error('Invalid price or quantity for item');
    }
    
    return sum + (price * quantity);
  }, 0);
  
  // Apply discount if code provided
  if (discountCode) {
    const discountAmount = applyDiscountCode(discountCode, totals.subtotal);
    totals.discount = discountAmount;
  }
  
  // Calculate tax
  const taxableAmount = totals.subtotal - totals.discount;
  totals.tax = taxableAmount * taxRate;
  
  // Calculate shipping
  totals.shipping = calculateShipping(cartItems, taxableAmount);
  
  // Calculate final total
  totals.total = taxableAmount + totals.tax + totals.shipping;
  
  // Round all values to 2 decimal places
  Object.keys(totals).forEach(key => {
    totals[key] = Math.round(totals[key] * 100) / 100;
  });
  
  return totals;
}

/**
 * Apply discount code to subtotal
 */
function applyDiscountCode(code, subtotal) {
  // Example discount codes
  const discounts = {
    'WELCOME10': { type: 'percentage', value: 0.1 },
    'SAVE20': { type: 'percentage', value: 0.2 },
    '50OFF': { type: 'fixed', value: 50 },
  };
  
  const discount = discounts[code.toUpperCase()];
  
  if (!discount) {
    return 0; // Invalid code, no discount
  }
  
  if (discount.type === 'percentage') {
    return subtotal * discount.value;
  } else if (discount.type === 'fixed') {
    return Math.min(discount.value, subtotal); // Can't discount more than the subtotal
  }
  
  return 0;
}

/**
 * Calculate shipping cost based on cart items and total
 */
function calculateShipping(cartItems, subtotal) {
  // Example logic: Free shipping over $100, otherwise $5.99
  if (subtotal >= 100) {
    return 0;
  }
  
  return 5.99;
}

/**
 * Validate product inventory before adding to cart
 */
export async function validateInventory(productId, variantId, quantity) {
  // In a real app, this would call an API
  // Mock implementation for testing
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock database of inventory
      const inventory = {
        'prod_123': {
          'var_1': { available: 10 },
          'var_2': { available: 0 },
        },
        'prod_456': {
          'var_1': { available: 5 },
        }
      };
      
      const product = inventory[productId];
      if (!product) {
        resolve({ success: false, message: 'Product not found' });
        return;
      }
      
      const variant = product[variantId];
      if (!variant) {
        resolve({ success: false, message: 'Variant not found' });
        return;
      }
      
      if (variant.available < quantity) {
        resolve({ 
          success: false, 
          message: `Only ${variant.available} items available`,
          available: variant.available
        });
        return;
      }
      
      resolve({ success: true });
    }, 100);
  });
}
