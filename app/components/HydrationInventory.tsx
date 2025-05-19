import React, { useState, useEffect } from 'react';
import type { ComponentCategory } from '~/lib/HydrationUsage';

/**
 * Component Hydration Priority Matrix
 * Helps determine the optimal hydration strategy for different components based on usage patterns
 */

// Define priority levels for component hydration
export enum HydrationPriority {
  CRITICAL = 'critical',      // Must be hydrated immediately (header, nav, cart triggers)
  HIGH = 'high',              // Should be hydrated early (product details, CTAs)
  MEDIUM = 'medium',          // Standard priority (product listings, footer)
  LOW = 'low',                // Can be deferred (marketing content, non-interactive elements)
  LAZY = 'lazy',              // Only hydrate when visible or on interaction
  SERVER_ONLY = 'server-only' // Keep as static HTML, no client hydration
}

// Interface for component hydration metadata
export interface ComponentHydrationData {
  id: string;
  name: string;
  category: ComponentCategory;
  priority: HydrationPriority;
  hydrationStrategy: 'whenVisible' | 'whenIdle' | 'onInteraction' | 'never' | 'onMount';
  estimatedUsageFrequency: number; // 1-100 scale
  dependencies?: string[];
  notes?: string;
}

// Cart and checkout components inventory
export const CART_COMPONENTS: ComponentHydrationData[] = [
  {
    id: 'cart-drawer',
    name: 'CartDrawer',
    category: 'cart',
    priority: HydrationPriority.HIGH,
    hydrationStrategy: 'onInteraction',
    estimatedUsageFrequency: 80,
    notes: 'Cart drawer should be prepared but only hydrated on interaction'
  },
  {
    id: 'cart-lines',
    name: 'CartLines',
    category: 'cart',
    priority: HydrationPriority.MEDIUM,
    hydrationStrategy: 'whenVisible',
    estimatedUsageFrequency: 70,
    notes: 'Cart line items can be progressively hydrated when visible'
  },
  {
    id: 'cart-line-item',
    name: 'CartLineItem',
    category: 'cart',
    priority: HydrationPriority.MEDIUM,
    hydrationStrategy: 'whenVisible',
    estimatedUsageFrequency: 70,
    dependencies: ['cart-lines'],
    notes: 'Individual line items can be lazy hydrated'
  },
  {
    id: 'cart-summary',
    name: 'CartSummary',
    category: 'cart',
    priority: HydrationPriority.HIGH,
    hydrationStrategy: 'whenVisible',
    estimatedUsageFrequency: 90,
    notes: 'Cart summary needs to be accurate but can wait until visible'
  },
  {
    id: 'cart-checkout-actions',
    name: 'CartCheckoutActions',
    category: 'cart',
    priority: HydrationPriority.HIGH,
    hydrationStrategy: 'whenVisible',
    estimatedUsageFrequency: 95,
    notes: 'Checkout button is critical for conversion'
  },
  {
    id: 'cart-discounts',
    name: 'CartDiscounts',
    category: 'cart',
    priority: HydrationPriority.MEDIUM,
    hydrationStrategy: 'whenIdle',
    estimatedUsageFrequency: 40,
    notes: 'Discount form can be hydrated during idle time'
  },
  {
    id: 'cart-empty',
    name: 'CartEmpty',
    category: 'cart',
    priority: HydrationPriority.LOW,
    hydrationStrategy: 'whenVisible',
    estimatedUsageFrequency: 20,
    notes: 'Empty cart state is less frequently encountered'
  },
  {
    id: 'cart-context-provider',
    name: 'CartProvider',
    category: 'cart',
    priority: HydrationPriority.CRITICAL,
    hydrationStrategy: 'onMount',
    estimatedUsageFrequency: 100,
    notes: 'Context provider must be available for all cart interactions'
  },
];

// Checkout-related components
export const CHECKOUT_COMPONENTS: ComponentHydrationData[] = [
  {
    id: 'checkout-button',
    name: 'CheckoutButton',
    category: 'checkout',
    priority: HydrationPriority.CRITICAL,
    hydrationStrategy: 'whenVisible',
    estimatedUsageFrequency: 95,
    notes: 'Primary conversion element'
  },
  {
    id: 'shipping-form',
    name: 'ShippingForm',
    category: 'checkout',
    priority: HydrationPriority.HIGH,
    hydrationStrategy: 'whenVisible',
    estimatedUsageFrequency: 90,
    notes: 'Critical checkout step'
  },
  {
    id: 'payment-form',
    name: 'PaymentForm',
    category: 'checkout',
    priority: HydrationPriority.HIGH,
    hydrationStrategy: 'whenVisible',
    estimatedUsageFrequency: 85,
    notes: 'Critical checkout step'
  },
  {
    id: 'order-summary',
    name: 'OrderSummary',
    category: 'checkout',
    priority: HydrationPriority.MEDIUM,
    hydrationStrategy: 'whenVisible',
    estimatedUsageFrequency: 90,
    notes: 'Read-only summary can be hydrated when visible'
  },
  {
    id: 'checkout-discounts',
    name: 'CheckoutDiscounts',
    category: 'checkout',
    priority: HydrationPriority.MEDIUM,
    hydrationStrategy: 'whenIdle',
    estimatedUsageFrequency: 45,
    notes: 'Discount form used by some customers'
  },
];

/**
 * Component to help visualize and manage hydration strategies
 * This is a development tool, not meant for production use
 */
export function HydrationInventory({
  showDevTools = false
}: {
  showDevTools?: boolean
}) {
  if (!showDevTools || process.env.NODE_ENV !== 'development') {
    return null;
  }

  const allComponents = [...CART_COMPONENTS, ...CHECKOUT_COMPONENTS];
  
  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 bg-white border border-gray-200 shadow-lg rounded-tl-lg max-w-lg max-h-[80vh] overflow-auto">
      <h2 className="text-lg font-bold mb-2">Hydration Inventory</h2>
      <div className="mb-4">
        <h3 className="font-medium">Cart Components</h3>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left">Component</th>
              <th className="text-left">Priority</th>
              <th className="text-left">Strategy</th>
            </tr>
          </thead>
          <tbody>
            {CART_COMPONENTS.map(comp => (
              <tr key={comp.id}>
                <td>{comp.name}</td>
                <td>{comp.priority}</td>
                <td>{comp.hydrationStrategy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div>
        <h3 className="font-medium">Checkout Components</h3>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left">Component</th>
              <th className="text-left">Priority</th>
              <th className="text-left">Strategy</th>
            </tr>
          </thead>
          <tbody>
            {CHECKOUT_COMPONENTS.map(comp => (
              <tr key={comp.id}>
                <td>{comp.name}</td>
                <td>{comp.priority}</td>
                <td>{comp.hydrationStrategy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Utility function to get the recommended hydration strategy for a component
 */
export function getHydrationStrategy(componentId: string): 'whenVisible' | 'whenIdle' | 'onInteraction' | 'never' | 'onMount' {
  const allComponents = [...CART_COMPONENTS, ...CHECKOUT_COMPONENTS];
  const component = allComponents.find(c => c.id === componentId);
  
  if (!component) {
    return 'whenVisible'; // Default fallback
  }
  
  return component.hydrationStrategy;
} 