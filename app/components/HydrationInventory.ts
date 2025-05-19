/**
 * HydrationInventory defines strategies for when components should be hydrated on the client.
 */

type HydrationStrategy = 'whenVisible' | 'whenIdle' | 'immediate' | 'onDemand';

// Map of component keys to their hydration strategies
const hydrationStrategies: Record<string, HydrationStrategy> = {
  // Cart components
  'cart-lines': 'whenVisible',
  'cart-line-item': 'whenVisible', 
  'cart-summary': 'whenVisible',
  'cart-discounts': 'whenVisible',
  'cart-checkout-actions': 'whenVisible',
  'cart-empty': 'whenVisible',
  
  // Product components
  'product-details': 'immediate',
  'product-images': 'immediate',
  'product-form': 'immediate',
  'product-recommendations': 'whenVisible',
  
  // Global components
  'header-menu': 'whenVisible',
  'footer-menu': 'whenVisible',
  'search-form': 'whenIdle',
  
  // Default strategy if not specified
  'default': 'whenVisible'
};

/**
 * Get the hydration strategy for a component by its key
 * @param key - The component key to get the strategy for
 * @returns The hydration strategy to use
 */
export function getHydrationStrategy(key: string): HydrationStrategy {
  return hydrationStrategies[key] || hydrationStrategies.default;
}

/**
 * Register or update a hydration strategy for a component
 * @param key - The component key to register
 * @param strategy - The hydration strategy to use
 */
export function registerHydrationStrategy(key: string, strategy: HydrationStrategy): void {
  hydrationStrategies[key] = strategy;
}
