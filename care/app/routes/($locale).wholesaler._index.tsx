import React from 'react';
import { json, defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, Await } from '@remix-run/react';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { 
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Package,
  Clock,
  BarChart3
} from 'lucide-react';

import { WholesalerPortalLayout } from '~/components/WholesalerPortalLayout';
import { requireWholesaler, getWholesalerData } from '~/lib/wholesaler.server';

export const meta = () => {
  return [
    { title: 'Wholesaler Dashboard | care•atin' },
    { description: 'Manage your wholesale account, orders, and view analytics' },
  ];
};

export async function loader({ request, context, params }: LoaderFunctionArgs) {
  const customer = await requireWholesaler({ request, context, params });
  
  // Get featured products for quick ordering
  const { storefront } = context;
  const { products } = await storefront.query(FEATURED_PRODUCTS_QUERY);

  // Get wholesaler-specific data (analytics, orders, etc.)
  const wholesalerDataPromise = getWholesalerData(customer, { storefront });
  
  return defer({
    customer,
    products,
    wholesalerData: wholesalerDataPromise,
  });
}

export default function WholesalerDashboard() {
  const { customer, wholesalerData, products } = useLoaderData<typeof loader>();
  
  return (
    <WholesalerPortalLayout>
      <div className="space-y-8">
        {/* Welcome header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-neutral-900">
              Welcome back, {customer.firstName}
            </h1>
            <p className="text-neutral-500 mt-1">
              Here's what's happening with your wholesale account
            </p>
          </div>
          <motion.button 
            className="bg-rose-500 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-rose-600 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Quick Order</span>
          </motion.button>
        </div>
        
        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Sales"
            value="$15,420.50"
            change="+12.5%"
            trend="up"
            icon={<DollarSign className="h-5 w-5 text-emerald-500" />}
          />
          <StatCard 
            title="Orders"
            value="48"
            change="+8.2%"
            trend="up"
            icon={<ShoppingBag className="h-5 w-5 text-blue-500" />}
          />
          <StatCard 
            title="Avg. Order Value"
            value="$321.26"
            change="+5.1%"
            trend="up"
            icon={<TrendingUp className="h-5 w-5 text-indigo-500" />}
          />
          <StatCard 
            title="Active Products"
            value="12"
            change="0%"
            trend="neutral"
            icon={<Package className="h-5 w-5 text-amber-500" />}
          />
        </div>
        
        {/* Performance Charts */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">Sales Performance</h3>
                <p className="text-sm text-neutral-500">Last 7 weeks</p>
              </div>
              <select className="bg-neutral-100 border-none rounded-lg px-3 py-2 text-sm text-neutral-700">
                <option>Last 7 weeks</option>
                <option>Last 30 days</option>
                <option>Last 12 months</option>
              </select>
            </div>
            
            <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading chart data...</div>}>
              <Await resolve={wholesalerData}>
                {(resolvedData) => (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={resolvedData?.analytics?.recentPerformance || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12, fill: '#737373' }}
                        tickFormatter={(date) => {
                          const d = new Date(date);
                          return `${d.getMonth() + 1}/${d.getDate()}`;
                        }}
                      />
                      <YAxis 
                        tick={{ fontSize: 12, fill: '#737373' }}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, 'Sales']}
                        labelFormatter={(date) => {
                          const d = new Date(date);
                          return `Week of ${d.toLocaleDateString()}`;
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="sales" 
                        stroke="#f43f5e" 
                        strokeWidth={2}
                        dot={{ fill: '#f43f5e', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: '#f43f5e', stroke: '#fff', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </Await>
            </Suspense>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">Top Products</h3>
                <p className="text-sm text-neutral-500">By sales volume</p>
              </div>
              <BarChart3 className="h-5 w-5 text-neutral-400" />
            </div>
            
            <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading product data...</div>}>
              <Await resolve={wholesalerData}>
                {(resolvedData) => (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={resolvedData?.analytics?.topProducts || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12, fill: '#737373' }}
                      />
                      <YAxis 
                        tick={{ fontSize: 12, fill: '#737373' }}
                        tickFormatter={(value) => `$${value/1000}k`}
                      />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, 'Sales']}
                      />
                      <Bar 
                        dataKey="sales" 
                        fill="#f43f5e" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </Await>
            </Suspense>
          </div>
        </div>
        
        {/* Recent Orders & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">Recent Orders</h3>
                <p className="text-sm text-neutral-500">Your last 5 wholesale orders</p>
              </div>
              <button className="text-rose-500 text-sm font-medium hover:text-rose-600">
                View All Orders
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 px-2 text-neutral-500 font-medium">Order #</th>
                    <th className="text-left py-3 px-2 text-neutral-500 font-medium">Date</th>
                    <th className="text-left py-3 px-2 text-neutral-500 font-medium">Amount</th>
                    <th className="text-left py-3 px-2 text-neutral-500 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-3 px-2 font-medium text-neutral-900">#W-2023-1205</td>
                    <td className="py-3 px-2 text-neutral-700">Dec 5, 2023</td>
                    <td className="py-3 px-2 text-neutral-700">$1,245.80</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Fulfilled
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-3 px-2 font-medium text-neutral-900">#W-2023-1128</td>
                    <td className="py-3 px-2 text-neutral-700">Nov 28, 2023</td>
                    <td className="py-3 px-2 text-neutral-700">$876.50</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        Processing
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-3 px-2 font-medium text-neutral-900">#W-2023-1115</td>
                    <td className="py-3 px-2 text-neutral-700">Nov 15, 2023</td>
                    <td className="py-3 px-2 text-neutral-700">$1,890.25</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Fulfilled
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-3 px-2 font-medium text-neutral-900">#W-2023-1102</td>
                    <td className="py-3 px-2 text-neutral-700">Nov 2, 2023</td>
                    <td className="py-3 px-2 text-neutral-700">$750.00</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Fulfilled
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-neutral-50">
                    <td className="py-3 px-2 font-medium text-neutral-900">#W-2023-1020</td>
                    <td className="py-3 px-2 text-neutral-700">Oct 20, 2023</td>
                    <td className="py-3 px-2 text-neutral-700">$1,125.75</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Fulfilled
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-neutral-900">Quick Actions</h3>
              <p className="text-sm text-neutral-500">Common wholesaler tasks</p>
            </div>
            
            <div className="space-y-3">
              <motion.a
                href="/wholesaler/orders/new"
                className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
                whileHover={{ x: 3 }}
              >
                <div className="bg-rose-100 p-2 rounded-lg">
                  <ShoppingBag className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-900">Place New Order</h4>
                  <p className="text-xs text-neutral-500">Order products at wholesale rates</p>
                </div>
              </motion.a>
              
              <motion.a
                href="/wholesaler/marketing"
                className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
                whileHover={{ x: 3 }}
              >
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Package className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-900">Marketing Materials</h4>
                  <p className="text-xs text-neutral-500">Access product images and content</p>
                </div>
              </motion.a>
              
              <motion.a
                href="/wholesaler/analytics"
                className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
                whileHover={{ x: 3 }}
              >
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-indigo-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-900">View Reports</h4>
                  <p className="text-xs text-neutral-500">Detailed sales and performance data</p>
                </div>
              </motion.a>
              
              <motion.a
                href="/wholesaler/account"
                className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
                whileHover={{ x: 3 }}
              >
                <div className="bg-amber-100 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-900">Order History</h4>
                  <p className="text-xs text-neutral-500">View and track past orders</p>
                </div>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </WholesalerPortalLayout>
  );
}

function StatCard({ title, value, change, trend, icon }) {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-neutral-500 text-sm">{title}</p>
          <h3 className="text-2xl font-semibold text-neutral-900 mt-1">{value}</h3>
        </div>
        <div className="bg-neutral-100 p-2 rounded-lg">
          {icon}
        </div>
      </div>
      
      <div className="mt-4 flex items-center">
        <span className={`text-xs font-medium ${
          trend === 'up' ? 'text-emerald-500' : 
          trend === 'down' ? 'text-red-500' : 
          'text-neutral-500'
        }`}>
          {change}
        </span>
        <span className="text-xs text-neutral-500 ml-1">vs last month</span>
      </div>
    </motion.div>
  );
}

const FEATURED_PRODUCTS_QUERY = `#graphql
  query FeaturedProducts {
    products(first: 8, sortKey: BEST_SELLING) {
      nodes {
        id
        title
        handle
        featuredImage {
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
      }
    }
  }
`; 