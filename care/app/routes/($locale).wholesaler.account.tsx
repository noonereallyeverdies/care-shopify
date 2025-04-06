import React, { useState } from 'react';
import { json, defer, type LoaderFunctionArgs, type ActionFunctionArgs, redirect } from '@shopify/remix-oxygen';
import { useLoaderData, Form, useActionData, useNavigation } from '@remix-run/react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Building, Globe, ShieldCheck } from 'lucide-react';

import { WholesalerPortalLayout } from '~/components/WholesalerPortalLayout';
import { requireWholesaler } from '~/lib/wholesaler.server';

export const meta = () => {
  return [
    { title: 'Manage Account | Wholesaler Portal' },
    { description: 'Update your wholesaler account information and preferences' },
  ];
};

export async function loader({ request, context, params }: LoaderFunctionArgs) {
  const customer = await requireWholesaler({ request, context, params });
  
  // Fetch additional wholesaler profile information
  // In a real implementation, you might have additional metafields for wholesaler-specific data
  const wholesalerProfile = {
    businessName: 'Salon Elegance',
    businessType: 'Salon & Spa',
    taxId: 'US123456789',
    website: 'https://salonelegance.com',
    shippingAddress: {
      address1: '123 Main Street',
      address2: 'Suite 101',
      city: 'Los Angeles',
      province: 'California',
      zip: '90210',
      country: 'United States'
    },
    billingAddress: {
      address1: '123 Main Street',
      address2: 'Suite 101',
      city: 'Los Angeles',
      province: 'California',
      zip: '90210',
      country: 'United States'
    },
    contactPreferences: {
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: true
    }
  };
  
  return defer({
    customer,
    wholesalerProfile
  });
}

export async function action({ request, context, params }: ActionFunctionArgs) {
  const customer = await requireWholesaler({ request, context, params });
  
  const formData = await request.formData();
  const action = formData.get('_action');
  
  try {
    if (action === 'updateProfile') {
      // In a real implementation, update the customer profile via Shopify Admin API
      // or a custom app extension/metafields
      
      // Mock successful update
      return json({
        success: true,
        message: 'Profile updated successfully'
      });
    }
    
    if (action === 'updateContactPreferences') {
      // In a real implementation, update preferences in your database/Shopify
      
      // Mock successful update
      return json({
        success: true,
        message: 'Contact preferences updated successfully'
      });
    }
    
    return json({
      success: false,
      message: 'Unknown action'
    });
  } catch (error) {
    return json({
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred'
    });
  }
}

export default function WholesalerAccount() {
  const { customer, wholesalerProfile } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  
  const [activeTab, setActiveTab] = useState('profile');
  
  return (
    <WholesalerPortalLayout>
      <motion.div 
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <h1 className="text-3xl font-semibold text-neutral-900">Account Management</h1>
          <p className="text-neutral-500 mt-1">Manage your wholesaler account details and preferences</p>
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
        
        {/* Error message */}
        {actionData?.success === false && (
          <motion.div 
            className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg"
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
                activeTab === 'profile'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              Account Information
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'addresses'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
              onClick={() => setActiveTab('addresses')}
            >
              Addresses
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'preferences'
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
              onClick={() => setActiveTab('preferences')}
            >
              Preferences
            </button>
          </nav>
        </div>
        
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">Account Information</h2>
            
            <Form method="post" className="space-y-6">
              <input type="hidden" name="_action" value="updateProfile" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Contact Name</label>
                  <div className="flex border border-neutral-300 rounded-lg overflow-hidden">
                    <div className="bg-neutral-50 p-2 text-neutral-500 border-r border-neutral-300">
                      <User className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      defaultValue={`${customer.firstName} ${customer.lastName}`}
                      className="w-full p-2 outline-none"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                  <div className="flex border border-neutral-300 rounded-lg overflow-hidden">
                    <div className="bg-neutral-50 p-2 text-neutral-500 border-r border-neutral-300">
                      <Mail className="h-5 w-5" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      defaultValue={customer.email}
                      className="w-full p-2 outline-none"
                      disabled
                    />
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">Please contact support to change your email</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Phone Number</label>
                  <div className="flex border border-neutral-300 rounded-lg overflow-hidden">
                    <div className="bg-neutral-50 p-2 text-neutral-500 border-r border-neutral-300">
                      <Phone className="h-5 w-5" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      defaultValue={customer.phone || ''}
                      className="w-full p-2 outline-none"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Business Name</label>
                  <div className="flex border border-neutral-300 rounded-lg overflow-hidden">
                    <div className="bg-neutral-50 p-2 text-neutral-500 border-r border-neutral-300">
                      <Building className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      name="businessName"
                      defaultValue={wholesalerProfile.businessName}
                      className="w-full p-2 outline-none"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Business Type</label>
                  <div className="flex border border-neutral-300 rounded-lg overflow-hidden">
                    <div className="bg-neutral-50 p-2 text-neutral-500 border-r border-neutral-300">
                      <Building className="h-5 w-5" />
                    </div>
                    <select
                      name="businessType"
                      defaultValue={wholesalerProfile.businessType}
                      className="w-full p-2 outline-none bg-white"
                    >
                      <option value="Salon & Spa">Salon & Spa</option>
                      <option value="Retail Store">Retail Store</option>
                      <option value="Online Retailer">Online Retailer</option>
                      <option value="Distributor">Distributor</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Tax ID / Business Number</label>
                  <div className="flex border border-neutral-300 rounded-lg overflow-hidden">
                    <div className="bg-neutral-50 p-2 text-neutral-500 border-r border-neutral-300">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      name="taxId"
                      defaultValue={wholesalerProfile.taxId}
                      className="w-full p-2 outline-none"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Website</label>
                  <div className="flex border border-neutral-300 rounded-lg overflow-hidden">
                    <div className="bg-neutral-50 p-2 text-neutral-500 border-r border-neutral-300">
                      <Globe className="h-5 w-5" />
                    </div>
                    <input
                      type="url"
                      name="website"
                      defaultValue={wholesalerProfile.website}
                      placeholder="https://example.com"
                      className="w-full p-2 outline-none"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <motion.button
                  type="submit"
                  className="bg-rose-500 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-rose-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </motion.button>
              </div>
            </Form>
          </div>
        )}
        
        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">Business Addresses</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-neutral-900">Shipping Address</h3>
                  <button className="text-rose-500 text-sm font-medium hover:text-rose-600">Edit</button>
                </div>
                
                <div className="border border-neutral-200 rounded-lg p-4 bg-neutral-50">
                  <p className="font-medium text-neutral-900">{wholesalerProfile.businessName}</p>
                  <p className="text-neutral-700">{wholesalerProfile.shippingAddress.address1}</p>
                  {wholesalerProfile.shippingAddress.address2 && (
                    <p className="text-neutral-700">{wholesalerProfile.shippingAddress.address2}</p>
                  )}
                  <p className="text-neutral-700">
                    {wholesalerProfile.shippingAddress.city}, {wholesalerProfile.shippingAddress.province} {wholesalerProfile.shippingAddress.zip}
                  </p>
                  <p className="text-neutral-700">{wholesalerProfile.shippingAddress.country}</p>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-neutral-900">Billing Address</h3>
                  <button className="text-rose-500 text-sm font-medium hover:text-rose-600">Edit</button>
                </div>
                
                <div className="border border-neutral-200 rounded-lg p-4 bg-neutral-50">
                  <p className="font-medium text-neutral-900">{wholesalerProfile.businessName}</p>
                  <p className="text-neutral-700">{wholesalerProfile.billingAddress.address1}</p>
                  {wholesalerProfile.billingAddress.address2 && (
                    <p className="text-neutral-700">{wholesalerProfile.billingAddress.address2}</p>
                  )}
                  <p className="text-neutral-700">
                    {wholesalerProfile.billingAddress.city}, {wholesalerProfile.billingAddress.province} {wholesalerProfile.billingAddress.zip}
                  </p>
                  <p className="text-neutral-700">{wholesalerProfile.billingAddress.country}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">Contact Preferences</h2>
            
            <Form method="post" className="space-y-6">
              <input type="hidden" name="_action" value="updateContactPreferences" />
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="emailNotifications"
                      name="emailNotifications"
                      type="checkbox"
                      defaultChecked={wholesalerProfile.contactPreferences.emailNotifications}
                      className="h-4 w-4 text-rose-500 focus:ring-rose-400 border-neutral-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="emailNotifications" className="text-neutral-900 font-medium">Email Notifications</label>
                    <p className="text-neutral-500 text-sm">Receive order confirmations, shipping updates, and account notices</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="smsNotifications"
                      name="smsNotifications"
                      type="checkbox"
                      defaultChecked={wholesalerProfile.contactPreferences.smsNotifications}
                      className="h-4 w-4 text-rose-500 focus:ring-rose-400 border-neutral-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="smsNotifications" className="text-neutral-900 font-medium">SMS Notifications</label>
                    <p className="text-neutral-500 text-sm">Receive text alerts for order status changes and important updates</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="marketingEmails"
                      name="marketingEmails"
                      type="checkbox"
                      defaultChecked={wholesalerProfile.contactPreferences.marketingEmails}
                      className="h-4 w-4 text-rose-500 focus:ring-rose-400 border-neutral-300 rounded"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="marketingEmails" className="text-neutral-900 font-medium">Marketing Communications</label>
                    <p className="text-neutral-500 text-sm">Receive emails about new products, special offers, and wholesale promotions</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-neutral-200">
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Language & Currency</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Preferred Language</label>
                    <select
                      name="language"
                      className="w-full p-2 border border-neutral-300 rounded-lg bg-white"
                    >
                      <option value="en-US">English (United States)</option>
                      <option value="en-CA">English (Canada)</option>
                      <option value="fr-CA">French (Canada)</option>
                      <option value="es-US">Spanish (United States)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Preferred Currency</label>
                    <select
                      name="currency"
                      className="w-full p-2 border border-neutral-300 rounded-lg bg-white"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="CAD">CAD (C$)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <motion.button
                  type="submit"
                  className="bg-rose-500 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-rose-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save Preferences'}
                </motion.button>
              </div>
            </Form>
          </div>
        )}
      </motion.div>
    </WholesalerPortalLayout>
  );
} 