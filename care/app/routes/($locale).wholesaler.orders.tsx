import React, { useState } from 'react';
import { json, defer, type LoaderFunctionArgs, type ActionFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, Await, Form, useActionData, useNavigation } from '@remix-run/react';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Money } from '@shopify/hydrogen';
import { Plus, Minus, ShoppingCart, Package, ChevronRight, Search, Filter, X } from 'lucide-react';

import { WholesalerPortalLayout } from '~/components/WholesalerPortalLayout';
import { requireWholesaler } from '~/lib/wholesaler.server';

export const meta = () => {
  return [
    { title: 'Place Orders | Wholesaler Portal' },
    { description: 'Place and manage your wholesale orders' },
  ];
};

export async function loader({ request, context, params }: LoaderFunctionArgs) {
  const customer = await requireWholesaler({ request, context, params });
  
  // Get all products for ordering
  const { storefront } = context;
  const { products } = await storefront.query(PRODUCTS_QUERY);
  
  // Get past orders
  const { orders } = await storefront.query(ORDERS_QUERY, {
    variables: {
      customerAccessToken: await context.session.get('customerAccessToken'),
    },
  });
  
  return defer({
    customer,
    products,
    orders,
  });
}

export async function action({ request, context, params }: ActionFunctionArgs) {
  const customer = await requireWholesaler({ request, context, params });
  
  // In a real implementation, this would create a draft order via Shopify Admin API
  // and then redirect to checkout or send email confirmation
  
  // For now, simulate a success response
  return json({
    success: true,
    message: 'Your order has been placed successfully!'
  });
}

export default function WholesalerOrders() {
  const { customer, products, orders } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  
  const [activeTab, setActiveTab] = useState<'place' | 'history'>('place');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<Array<{id: string, quantity: number}>>([]);
  
  // Handle adding/removing products from cart
  const updateCart = (productId: string, quantity: number) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === productId);
      
      if (existingItemIndex >= 0) {
        const newCart = [...prevCart];
        if (quantity === 0) {
          // Remove item if quantity is 0
          newCart.splice(existingItemIndex, 1);
        } else {
          // Update quantity
          newCart[existingItemIndex] = { ...newCart[existingItemIndex], quantity };
        }
        return newCart;
      } else if (quantity > 0) {
        // Add new item
        return [...prevCart, { id: productId, quantity }];
      }
      
      return prevCart;
    });
  };
  
  // Get quantity for a product in cart
  const getQuantity = (productId: string) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };
  
  // Calculate cart totals
  const calculateTotal = () => {
    let total = 0;
    let items = 0;
    
    cart.forEach(item => {
      const product = products?.nodes.find(p => p.id === item.id);
      if (product) {
        total += parseFloat(product.priceRange.minVariantPrice.amount) * item.quantity;
        items += item.quantity;
      }
    });
    
    return { total, items };
  };
  
  const cartTotal = calculateTotal();
  
  // Filter products by search query and category
  const filteredProducts = products?.nodes.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === null || 
      product.collections?.nodes.some(collection => collection.handle === selectedCategory);
      
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories from products
  const categories = products?.nodes.reduce((acc: Array<{handle: string, title: string}>, product) => {
    if (product.collections) {
      product.collections.nodes.forEach(collection => {
        if (!acc.some(cat => cat.handle === collection.handle)) {
          acc.push({
            handle: collection.handle,
            title: collection.title
          });
        }
      });
    }
    return acc;
  }, []).sort((a, b) => a.title.localeCompare(b.title)) || [];
  
  return (
    <WholesalerPortalLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-neutral-900">Orders</h1>
          <p className="text-neutral-500 mt-1">Place new orders and track your order history</p>
        </div>
        
        {/* Success message */}
        {actionData?.success && (
          <motion.div 
            className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {actionData.message}
          </motion.div>
        )}
        
        {/* Tabs */}
        <div className="border-b border-neutral-200">
          <nav className="flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'place'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
              onClick={() => setActiveTab('place')}
            >
              Place Orders
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'history'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
              onClick={() => setActiveTab('history')}
            >
              Order History
            </button>
          </nav>
        </div>
        
        {/* Place Orders Tab */}
        {activeTab === 'place' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Search and filter */}
              <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="relative md:w-48">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Filter className="h-4 w-4 text-neutral-400" />
                    </div>
                    <select
                      className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg appearance-none bg-white"
                      value={selectedCategory || ''}
                      onChange={(e) => setSelectedCategory(e.target.value || null)}
                    >
                      <option value="">All Categories</option>
                      {categories.map(category => (
                        <option key={category.handle} value={category.handle}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ChevronRight className="h-4 w-4 text-neutral-400" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Product listing */}
              <Suspense fallback={<div className="text-center py-12">Loading products...</div>}>
                <Await resolve={products}>
                  {() => (
                    <div className="space-y-4">
                      {filteredProducts?.length === 0 && (
                        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                          <p className="text-neutral-500">No products found matching your criteria.</p>
                        </div>
                      )}
                      
                      {filteredProducts?.map(product => (
                        <motion.div
                          key={product.id}
                          className="bg-white rounded-xl shadow-sm overflow-hidden"
                          whileHover={{ y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex flex-col md:flex-row">
                            {product.featuredImage && (
                              <div className="w-full md:w-32 h-32 flex-shrink-0">
                                <img
                                  src={product.featuredImage.url}
                                  alt={product.featuredImage.altText || product.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            
                            <div className="p-4 md:p-5 flex-1 flex flex-col justify-between">
                              <div>
                                <h3 className="text-lg font-medium text-neutral-900">{product.title}</h3>
                                <p className="text-sm text-neutral-500 mt-1 line-clamp-2">
                                  {product.description}
                                </p>
                              </div>
                              
                              <div className="flex items-center justify-between mt-4">
                                <div>
                                  <p className="font-medium text-neutral-900">
                                    <Money
                                      data={product.priceRange.minVariantPrice}
                                      withoutTrailingZeros
                                    />
                                  </p>
                                  <p className="text-xs text-neutral-500">
                                    {product.variants.nodes[0].availableForSale
                                      ? 'In stock'
                                      : 'Out of stock'
                                    }
                                  </p>
                                </div>
                                
                                <div className="flex items-center">
                                  {getQuantity(product.id) > 0 ? (
                                    <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden">
                                      <button
                                        type="button"
                                        className="p-2 hover:bg-neutral-100"
                                        onClick={() => updateCart(product.id, getQuantity(product.id) - 1)}
                                      >
                                        <Minus className="h-4 w-4 text-neutral-500" />
                                      </button>
                                      <span className="px-3 py-1">{getQuantity(product.id)}</span>
                                      <button
                                        type="button"
                                        className="p-2 hover:bg-neutral-100"
                                        onClick={() => updateCart(product.id, getQuantity(product.id) + 1)}
                                        disabled={!product.variants.nodes[0].availableForSale}
                                      >
                                        <Plus className="h-4 w-4 text-neutral-500" />
                                      </button>
                                    </div>
                                  ) : (
                                    <motion.button
                                      type="button"
                                      className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                      onClick={() => updateCart(product.id, 1)}
                                      disabled={!product.variants.nodes[0].availableForSale}
                                      whileHover={{ scale: 1.03 }}
                                      whileTap={{ scale: 0.98 }}
                                    >
                                      Add to Order
                                    </motion.button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </Await>
              </Suspense>
            </div>
            
            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-8">
                <div className="p-6 border-b border-neutral-200">
                  <h3 className="text-lg font-semibold text-neutral-900">Your Order</h3>
                  <p className="text-sm text-neutral-500 mt-1">
                    {cartTotal.items} {cartTotal.items === 1 ? 'item' : 'items'} in your order
                  </p>
                </div>
                
                {cart.length === 0 ? (
                  <div className="p-6">
                    <div className="flex flex-col items-center justify-center py-8">
                      <ShoppingCart className="h-12 w-12 text-neutral-300 mb-4" />
                      <p className="text-neutral-500 text-center">Your order is empty</p>
                      <p className="text-neutral-400 text-sm text-center mt-1">
                        Add products to your order from the list
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="px-6 py-4 max-h-96 overflow-y-auto">
                      <ul className="divide-y divide-neutral-100">
                        {cart.map(item => {
                          const product = products?.nodes.find(p => p.id === item.id);
                          if (!product) return null;
                          
                          return (
                            <li key={item.id} className="py-4">
                              <div className="flex justify-between">
                                <div className="pr-4">
                                  <h4 className="text-sm font-medium text-neutral-900">
                                    {product.title}
                                  </h4>
                                  <div className="mt-1 flex items-center gap-2">
                                    <span className="text-xs text-neutral-500">
                                      Qty: {item.quantity}
                                    </span>
                                    <button
                                      type="button"
                                      className="text-rose-500 hover:text-rose-700 text-xs"
                                      onClick={() => updateCart(item.id, 0)}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium text-neutral-900">
                                    <Money
                                      data={{
                                        amount: (parseFloat(product.priceRange.minVariantPrice.amount) * item.quantity).toString(),
                                        currencyCode: product.priceRange.minVariantPrice.currencyCode,
                                      }}
                                      withoutTrailingZeros
                                    />
                                  </p>
                                  <p className="text-xs text-neutral-500 mt-1">
                                    <Money
                                      data={product.priceRange.minVariantPrice}
                                      withoutTrailingZeros
                                    /> each
                                  </p>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    
                    <div className="px-6 py-4 border-t border-neutral-200 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-neutral-700">Subtotal</span>
                        <span className="font-medium text-neutral-900">
                          ${cartTotal.total.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-700">Shipping</span>
                        <span className="text-neutral-500">Calculated at checkout</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-700">Tax</span>
                        <span className="text-neutral-500">Calculated at checkout</span>
                      </div>
                    </div>
                    
                    <div className="px-6 py-4 border-t border-neutral-200">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-neutral-900">Total</span>
                        <span className="font-semibold text-lg text-neutral-900">
                          ${cartTotal.total.toFixed(2)}
                        </span>
                      </div>
                      
                      <Form method="post">
                        {/* Include cart items as hidden inputs */}
                        {cart.map(item => (
                          <input
                            key={item.id}
                            type="hidden"
                            name={`items[${item.id}]`}
                            value={item.quantity}
                          />
                        ))}
                        
                        <motion.button
                          type="submit"
                          className="w-full bg-rose-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-rose-600 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Processing...' : 'Place Wholesale Order'}
                          {!isSubmitting && <ChevronRight className="h-4 w-4" />}
                        </motion.button>
                      </Form>
                      
                      <p className="text-center text-xs text-neutral-500 mt-4">
                        By placing your order, you agree to our terms and conditions for wholesale purchases.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Order History Tab */}
        {activeTab === 'history' && (
          <Suspense fallback={<div className="text-center py-12">Loading order history...</div>}>
            <Await resolve={orders}>
              {(resolvedOrders) => (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-neutral-200">
                      <thead className="bg-neutral-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Order
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Total
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-neutral-200">
                        {resolvedOrders?.edges && resolvedOrders.edges.length > 0 ? (
                          resolvedOrders.edges.map(({node: order}) => (
                            <tr key={order.id} className="hover:bg-neutral-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                                #{order.orderNumber}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                                {new Date(order.processedAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  order.fulfillmentStatus === 'FULFILLED'
                                    ? 'bg-green-100 text-green-800'
                                    : order.fulfillmentStatus === 'IN_PROGRESS'
                                    ? 'bg-blue-100 text-blue-800'
                                    : order.fulfillmentStatus === 'PARTIALLY_FULFILLED'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-neutral-100 text-neutral-800'
                                }`}>
                                  {order.fulfillmentStatus.replace('_', ' ')}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                                <Money
                                  data={order.currentTotalPrice}
                                  withoutTrailingZeros
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                <a
                                  href={`/account/orders/${order.id.split('/').pop()}`}
                                  className="text-rose-500 hover:text-rose-700 font-medium"
                                >
                                  View Details
                                </a>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                              <Package className="h-12 w-12 mx-auto text-neutral-300 mb-4" />
                              <p>No orders found</p>
                              <p className="text-sm text-neutral-400 mt-1">
                                Your wholesale orders will appear here once you place them
                              </p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </Await>
          </Suspense>
        )}
      </div>
    </WholesalerPortalLayout>
  );
}

const PRODUCTS_QUERY = `#graphql
  query WholesaleProducts {
    products(first: 50) {
      nodes {
        id
        title
        handle
        description
        featuredImage {
          id
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 1) {
          nodes {
            id
            availableForSale
          }
        }
        collections(first: 10) {
          nodes {
            id
            title
            handle
          }
        }
      }
    }
  }
`;

const ORDERS_QUERY = `#graphql
  query CustomerOrders($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            currentTotalPrice {
              amount
              currencyCode
            }
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    id
                    title
                    image {
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`; 