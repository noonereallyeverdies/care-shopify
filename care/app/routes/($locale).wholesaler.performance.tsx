import React, { useState } from 'react';
import { json, defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, Await } from '@remix-run/react';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { ArrowUp, ArrowDown, TrendingUp, Calendar, Filter, ChevronDown } from 'lucide-react';

import { WholesalerPortalLayout } from '~/components/WholesalerPortalLayout';
import { requireWholesaler } from '~/lib/wholesaler.server';

export const meta = () => {
  return [
    { title: 'Sales Performance | Wholesaler Portal' },
    { description: 'Track your sales performance and analytics' },
  ];
};

export async function loader({ request, context, params }: LoaderFunctionArgs) {
  const customer = await requireWholesaler({ request, context, params });
  
  // In a real implementation, you would fetch sales data from Shopify or another data source
  const salesData = getMockSalesData();
  
  return defer({
    customer,
    salesData,
  });
}

export default function WholesalerPerformance() {
  const { customer, salesData } = useLoaderData<typeof loader>();
  const [timeframe, setTimeframe] = useState<'30d' | '90d' | '1y'>('30d');
  const [productView, setProductView] = useState<'top' | 'trending'>('top');
  
  // Get the appropriate data based on the selected timeframe
  const {
    salesByMonth,
    salesByCategory,
    topProducts,
    trendingProducts,
    revenueMetrics,
    orderMetrics,
    customerMetrics
  } = salesData[timeframe];
  
  return (
    <WholesalerPortalLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-neutral-900">Sales Performance</h1>
            <p className="text-neutral-500 mt-1">Track your sales metrics and performance analytics</p>
          </div>
          
          {/* Timeframe selector */}
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-neutral-400" />
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as '30d' | '90d' | '1y')}
              className="border border-neutral-300 rounded-lg px-3 py-2 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            >
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
          </div>
        </div>
        
        {/* Metrics Overview */}
        <Suspense fallback={<div className="text-center py-12">Loading performance metrics...</div>}>
          <Await resolve={salesData}>
            {() => (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Revenue metrics */}
                <MetricCard
                  title="Total Revenue"
                  value={`$${revenueMetrics.total.toLocaleString()}`}
                  change={revenueMetrics.change}
                  trend={revenueMetrics.trend}
                  description={`${revenueMetrics.change > 0 ? 'Up' : 'Down'} from previous period`}
                  icon={<TrendingUp className="h-6 w-6 text-rose-500" />}
                />
                
                {/* Order metrics */}
                <MetricCard
                  title="Total Orders"
                  value={orderMetrics.total.toLocaleString()}
                  change={orderMetrics.change}
                  trend={orderMetrics.trend}
                  description={`${orderMetrics.averageValue} average order value`}
                  icon={<TrendingUp className="h-6 w-6 text-blue-500" />}
                />
                
                {/* Customer metrics */}
                <MetricCard
                  title="New Customers"
                  value={customerMetrics.total.toLocaleString()}
                  change={customerMetrics.change}
                  trend={customerMetrics.trend}
                  description={`${customerMetrics.repeatRate}% repeat customers`}
                  icon={<TrendingUp className="h-6 w-6 text-green-500" />}
                />
              </div>
            )}
          </Await>
        </Suspense>
        
        {/* Sales Over Time Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-xl font-semibold text-neutral-900">Sales Performance Over Time</h2>
          </div>
          
          <Suspense fallback={<div className="h-80 flex items-center justify-center">Loading chart...</div>}>
            <Await resolve={salesData}>
              {() => (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={salesByMonth}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#f43f5e" 
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                        yAxisId="left"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="orders" 
                        stroke="#3b82f6"
                        fillOpacity={1}
                        fill="url(#colorOrders)"
                        yAxisId="right"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </Await>
          </Suspense>
        </div>
        
        {/* Two Column Layout for Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales by Category */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">Sales by Category</h2>
            
            <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading chart...</div>}>
              <Await resolve={salesData}>
                {() => (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={salesByCategory}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          nameKey="name"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {salesByCategory.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={pieColors[index % pieColors.length]} 
                            />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </Await>
            </Suspense>
          </div>
          
          {/* Product Performance */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-xl font-semibold text-neutral-900">Product Performance</h2>
              
              <div className="mt-2 sm:mt-0 flex">
                <span className="inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    className={`relative inline-flex items-center px-4 py-2 rounded-l-md border ${
                      productView === 'top'
                        ? 'bg-rose-50 border-rose-500 text-rose-800'
                        : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                    } text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500`}
                    onClick={() => setProductView('top')}
                  >
                    Top Selling
                  </button>
                  <button
                    type="button"
                    className={`relative inline-flex items-center px-4 py-2 rounded-r-md border ${
                      productView === 'trending'
                        ? 'bg-rose-50 border-rose-500 text-rose-800'
                        : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                    } text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500`}
                    onClick={() => setProductView('trending')}
                  >
                    Trending
                  </button>
                </span>
              </div>
            </div>
            
            <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading chart...</div>}>
              <Await resolve={salesData}>
                {() => (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={productView === 'top' ? topProducts : trendingProducts}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" />
                        <YAxis 
                          type="category" 
                          dataKey="name" 
                          width={100}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                          formatter={(value) => productView === 'top' 
                            ? `$${value.toLocaleString()}`
                            : `${value.toLocaleString()}%`
                          } 
                        />
                        <Bar 
                          dataKey="value" 
                          fill={productView === 'top' ? "#f43f5e" : "#3b82f6"}
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </Await>
            </Suspense>
          </div>
        </div>
        
        {/* Sales Forecast */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-6">Sales Forecast</h2>
          
          <Suspense fallback={<div className="h-80 flex items-center justify-center">Loading chart...</div>}>
            <Await resolve={salesData}>
              {() => (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={salesByMonth.concat(getForecastData(salesByMonth))}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#f43f5e"
                        strokeWidth={2}
                        dot={{ fill: "#f43f5e", r: 5 }}
                        activeDot={{ r: 7 }}
                        name="Actual Revenue"
                      />
                      <Line
                        type="monotone"
                        dataKey="forecast"
                        stroke="#9333ea"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: "#9333ea", r: 5 }}
                        activeDot={{ r: 7 }}
                        name="Forecasted Revenue"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </Await>
          </Suspense>
          
          <div className="mt-4 p-4 bg-purple-50 border border-purple-100 rounded-lg">
            <p className="text-purple-800 text-sm">
              <strong>Forecast Analysis:</strong> Based on your current sales trajectory, we predict continued growth over the next 3 months, with an estimated 15% increase in revenue. To maximize this opportunity, consider increasing inventory of trending products.
            </p>
          </div>
        </div>
      </div>
    </WholesalerPortalLayout>
  );
}

// Metric Card Component
function MetricCard({ title, value, change, trend, description, icon }) {
  const isPositive = change > 0;
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm p-6"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-neutral-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-neutral-900 mt-1">{value}</h3>
          
          <div className="flex items-center mt-1">
            <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
              )}
              <span className="font-medium text-sm">{Math.abs(change)}%</span>
            </div>
            <span className="text-neutral-500 text-xs ml-2">{description}</span>
          </div>
        </div>
        
        <div className="bg-neutral-100 p-3 rounded-full">
          {icon}
        </div>
      </div>
      
      <div className="mt-4 h-12">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trend}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={isPositive ? "#10b981" : "#ef4444"} 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

// Colors for pie chart
const pieColors = ['#f43f5e', '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#6366f1'];

// Generate forecast data based on current data
function getForecastData(actualData) {
  const lastThreeMonths = actualData.slice(-3);
  const lastMonthRevenue = lastThreeMonths[2].revenue;
  const growthRate = 0.05; // 5% monthly growth
  
  return [
    {
      name: 'Forecast 1',
      forecast: lastMonthRevenue * (1 + growthRate),
      revenue: null,
    },
    {
      name: 'Forecast 2',
      forecast: lastMonthRevenue * (1 + growthRate) * (1 + growthRate),
      revenue: null,
    },
    {
      name: 'Forecast 3',
      forecast: lastMonthRevenue * (1 + growthRate) * (1 + growthRate) * (1 + growthRate),
      revenue: null,
    },
  ];
}

// Mock data for sales performance
function getMockSalesData() {
  return {
    '30d': {
      salesByMonth: [
        { name: 'Week 1', revenue: 12000, orders: 120 },
        { name: 'Week 2', revenue: 19000, orders: 150 },
        { name: 'Week 3', revenue: 15000, orders: 135 },
        { name: 'Week 4', revenue: 21000, orders: 180 },
      ],
      salesByCategory: [
        { name: 'Shampoo', value: 14000 },
        { name: 'Conditioner', value: 12500 },
        { name: 'Styling', value: 10000 },
        { name: 'Treatment', value: 8500 },
        { name: 'Accessories', value: 5000 },
      ],
      topProducts: [
        { name: 'Volumizing Shampoo', value: 12500 },
        { name: 'Repair Mask', value: 8800 },
        { name: 'Moisture Conditioner', value: 7200 },
        { name: 'Styling Cream', value: 5600 },
        { name: 'Heat Protectant', value: 4800 },
      ],
      trendingProducts: [
        { name: 'Curl Definer', value: 125 },
        { name: 'Hair Oil', value: 89 },
        { name: 'Scalp Treatment', value: 76 },
        { name: 'Dry Shampoo', value: 58 },
        { name: 'Color Protect', value: 42 },
      ],
      revenueMetrics: {
        total: 67000,
        change: 15,
        trend: [
          { value: 14500 },
          { value: 16200 },
          { value: 15800 },
          { value: 16700 },
          { value: 17500 },
          { value: 19200 },
          { value: 18000 },
        ],
      },
      orderMetrics: {
        total: 585,
        change: 8,
        averageValue: '$114.53',
        trend: [
          { value: 130 },
          { value: 145 },
          { value: 140 },
          { value: 152 },
          { value: 158 },
          { value: 165 },
          { value: 160 },
        ],
      },
      customerMetrics: {
        total: 85,
        change: 12,
        repeatRate: 62,
        trend: [
          { value: 18 },
          { value: 21 },
          { value: 19 },
          { value: 22 },
          { value: 24 },
          { value: 26 },
          { value: 25 },
        ],
      },
    },
    '90d': {
      salesByMonth: [
        { name: 'Jan', revenue: 30000, orders: 320 },
        { name: 'Feb', revenue: 42000, orders: 385 },
        { name: 'Mar', revenue: 67000, orders: 585 },
      ],
      salesByCategory: [
        { name: 'Shampoo', value: 35000 },
        { name: 'Conditioner', value: 32000 },
        { name: 'Styling', value: 28000 },
        { name: 'Treatment', value: 25000 },
        { name: 'Accessories', value: 19000 },
      ],
      topProducts: [
        { name: 'Volumizing Shampoo', value: 28500 },
        { name: 'Repair Mask', value: 21200 },
        { name: 'Moisture Conditioner', value: 19800 },
        { name: 'Styling Cream', value: 15600 },
        { name: 'Heat Protectant', value: 13800 },
      ],
      trendingProducts: [
        { name: 'Curl Definer', value: 150 },
        { name: 'Hair Oil', value: 120 },
        { name: 'Scalp Treatment', value: 95 },
        { name: 'Dry Shampoo', value: 85 },
        { name: 'Color Protect', value: 70 },
      ],
      revenueMetrics: {
        total: 139000,
        change: 28,
        trend: [
          { value: 28000 },
          { value: 30000 },
          { value: 32000 },
          { value: 35000 },
          { value: 38000 },
          { value: 42000 },
          { value: 45000 },
        ],
      },
      orderMetrics: {
        total: 1290,
        change: 18,
        averageValue: '$107.75',
        trend: [
          { value: 280 },
          { value: 295 },
          { value: 310 },
          { value: 325 },
          { value: 345 },
          { value: 375 },
          { value: 390 },
        ],
      },
      customerMetrics: {
        total: 220,
        change: 25,
        repeatRate: 58,
        trend: [
          { value: 45 },
          { value: 50 },
          { value: 53 },
          { value: 58 },
          { value: 63 },
          { value: 68 },
          { value: 73 },
        ],
      },
    },
    '1y': {
      salesByMonth: [
        { name: 'Jan', revenue: 28000, orders: 280 },
        { name: 'Feb', revenue: 32000, orders: 310 },
        { name: 'Mar', revenue: 36000, orders: 340 },
        { name: 'Apr', revenue: 42000, orders: 380 },
        { name: 'May', revenue: 48000, orders: 420 },
        { name: 'Jun', revenue: 53000, orders: 480 },
        { name: 'Jul', revenue: 58000, orders: 510 },
        { name: 'Aug', revenue: 63000, orders: 540 },
        { name: 'Sep', revenue: 69000, orders: 580 },
        { name: 'Oct', revenue: 75000, orders: 620 },
        { name: 'Nov', revenue: 82000, orders: 680 },
        { name: 'Dec', revenue: 95000, orders: 780 },
      ],
      salesByCategory: [
        { name: 'Shampoo', value: 188000 },
        { name: 'Conditioner', value: 165000 },
        { name: 'Styling', value: 142000 },
        { name: 'Treatment', value: 120000 },
        { name: 'Accessories', value: 85000 },
      ],
      topProducts: [
        { name: 'Volumizing Shampoo', value: 145000 },
        { name: 'Repair Mask', value: 125000 },
        { name: 'Moisture Conditioner', value: 112000 },
        { name: 'Styling Cream', value: 98000 },
        { name: 'Heat Protectant', value: 85000 },
      ],
      trendingProducts: [
        { name: 'Curl Definer', value: 180 },
        { name: 'Hair Oil', value: 165 },
        { name: 'Scalp Treatment', value: 150 },
        { name: 'Dry Shampoo', value: 135 },
        { name: 'Color Protect', value: 120 },
      ],
      revenueMetrics: {
        total: 681000,
        change: 42,
        trend: [
          { value: 45000 },
          { value: 48000 },
          { value: 52000 },
          { value: 57000 },
          { value: 63000 },
          { value: 72000 },
          { value: 78000 },
        ],
      },
      orderMetrics: {
        total: 5920,
        change: 35,
        averageValue: '$115.03',
        trend: [
          { value: 420 },
          { value: 440 },
          { value: 470 },
          { value: 510 },
          { value: 550 },
          { value: 580 },
          { value: 620 },
        ],
      },
      customerMetrics: {
        total: 850,
        change: 38,
        repeatRate: 64,
        trend: [
          { value: 65 },
          { value: 72 },
          { value: 78 },
          { value: 85 },
          { value: 92 },
          { value: 98 },
          { value: 105 },
        ],
      },
    },
  };
} 