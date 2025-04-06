import React, { useState } from 'react';
import { json, defer, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, Await } from '@remix-run/react';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Download, Image, FileText, Video, Search, FolderOpen, Eye, Calendar } from 'lucide-react';

import { WholesalerPortalLayout } from '~/components/WholesalerPortalLayout';
import { requireWholesaler } from '~/lib/wholesaler.server';

export const meta = () => {
  return [
    { title: 'Marketing Materials | Wholesaler Portal' },
    { description: 'Access brand assets and marketing resources for your business' },
  ];
};

export async function loader({ request, context, params }: LoaderFunctionArgs) {
  const customer = await requireWholesaler({ request, context, params });
  
  // In a real implementation, you would fetch marketing materials from a CMS or database
  const marketingMaterials = getMockMarketingMaterials();
  
  return defer({
    customer,
    marketingMaterials,
  });
}

export default function WholesalerMarketing() {
  const { customer, marketingMaterials } = useLoaderData<typeof loader>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Filter materials by search query and category
  const filteredMaterials = marketingMaterials.filter(material => {
    const matchesSearch = searchQuery === '' || 
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = activeCategory === null || material.category === activeCategory;
      
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories
  const categories = Array.from(new Set(marketingMaterials.map(m => m.category)));
  
  return (
    <WholesalerPortalLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-neutral-900">Marketing Materials</h1>
          <p className="text-neutral-500 mt-1">Access brand assets and marketing resources for your business</p>
        </div>
        
        {/* Search and filters */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Search marketing materials..."
                className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === null
                ? 'bg-rose-100 text-rose-800'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
            onClick={() => setActiveCategory(null)}
          >
            All Materials
          </button>
          
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-rose-100 text-rose-800'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Marketing materials */}
        <Suspense fallback={<div className="text-center py-12">Loading marketing materials...</div>}>
          <Await resolve={marketingMaterials}>
            {() => (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMaterials.length === 0 ? (
                  <div className="col-span-full bg-white rounded-xl shadow-sm p-8 text-center">
                    <FolderOpen className="h-12 w-12 mx-auto text-neutral-300 mb-4" />
                    <p className="text-neutral-500">No marketing materials found</p>
                    <p className="text-sm text-neutral-400 mt-1">
                      Try adjusting your search or filters
                    </p>
                  </div>
                ) : (
                  filteredMaterials.map((material) => (
                    <MaterialCard key={material.id} material={material} />
                  ))
                )}
              </div>
            )}
          </Await>
        </Suspense>
        
        {/* Upcoming campaigns */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Upcoming Campaigns</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Campaign
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {mockCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-neutral-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-neutral-100 rounded-full flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-neutral-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-neutral-900">{campaign.title}</div>
                            <div className="text-sm text-neutral-500">{campaign.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                        {campaign.startDate} - {campaign.endDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          campaign.type === 'Seasonal'
                            ? 'bg-blue-100 text-blue-800'
                            : campaign.type === 'Product Launch'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {campaign.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-rose-500 hover:text-rose-700">Access Materials</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </WholesalerPortalLayout>
  );
}

// Material Card Component
function MaterialCard({ material }) {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {material.thumbnail && (
        <div className="h-48 w-full overflow-hidden">
          <img 
            src={material.thumbnail} 
            alt={material.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center mb-2">
          {material.type === 'image' && <Image className="h-5 w-5 text-blue-500 mr-2" />}
          {material.type === 'document' && <FileText className="h-5 w-5 text-green-500 mr-2" />}
          {material.type === 'video' && <Video className="h-5 w-5 text-purple-500 mr-2" />}
          
          <span className="text-sm font-medium text-neutral-500">
            {material.type.charAt(0).toUpperCase() + material.type.slice(1)}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">{material.title}</h3>
        <p className="text-neutral-500 text-sm mb-4 line-clamp-2">{material.description}</p>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-xs text-neutral-400">
            {new Date(material.dateAdded).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
          
          <div className="flex space-x-2">
            <motion.button
              className="p-2 bg-neutral-100 rounded-full hover:bg-neutral-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Preview"
            >
              <Eye className="h-4 w-4 text-neutral-700" />
            </motion.button>
            
            <motion.button
              className="p-2 bg-rose-100 rounded-full hover:bg-rose-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Download"
            >
              <Download className="h-4 w-4 text-rose-700" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Mock data for marketing materials
function getMockMarketingMaterials() {
  return [
    {
      id: '1',
      title: 'Brand Logo Pack',
      description: 'Complete set of care•atin logos in various formats (PNG, SVG, EPS)',
      type: 'image',
      category: 'Brand Assets',
      thumbnail: '/images/c-logo.png',
      fileSize: '12.5 MB',
      dateAdded: '2023-10-15T00:00:00Z',
      downloadUrl: '#',
    },
    {
      id: '2',
      title: 'Product Photography',
      description: 'High-resolution images of care•atin product line',
      type: 'image',
      category: 'Product Assets',
      thumbnail: '/images/PRODUCTPHOTOT.png',
      fileSize: '45.2 MB',
      dateAdded: '2023-11-02T00:00:00Z',
      downloadUrl: '#',
    },
    {
      id: '3',
      title: 'Brand Guidelines',
      description: 'Official brand guidelines for care•atin including typography, color palette, and usage rules',
      type: 'document',
      category: 'Brand Assets',
      thumbnail: '/images/hair.jpg',
      fileSize: '3.8 MB',
      dateAdded: '2023-09-28T00:00:00Z',
      downloadUrl: '#',
    },
    {
      id: '4',
      title: 'Social Media Templates',
      description: 'Ready-to-use social media templates for Instagram, Facebook, and Twitter',
      type: 'image',
      category: 'Social Media',
      thumbnail: '/images/prettyhair.jpg',
      fileSize: '18.7 MB',
      dateAdded: '2023-12-05T00:00:00Z',
      downloadUrl: '#',
    },
    {
      id: '5',
      title: 'Product Catalogs 2024',
      description: 'Updated catalogs with wholesale pricing and product details',
      type: 'document',
      category: 'Sales Materials',
      thumbnail: '/images/nature_shot.jpg',
      fileSize: '6.2 MB',
      dateAdded: '2024-01-10T00:00:00Z',
      downloadUrl: '#',
    },
    {
      id: '6',
      title: 'Brand Story Video',
      description: 'Short video explaining the care•atin brand story and values',
      type: 'video',
      category: 'Marketing Videos',
      thumbnail: '/images/model-shot.jpeg',
      fileSize: '78.3 MB',
      dateAdded: '2023-08-22T00:00:00Z',
      downloadUrl: '#',
    },
    {
      id: '7',
      title: 'Product Training Materials',
      description: 'Training documents for sales staff about product features and benefits',
      type: 'document',
      category: 'Training',
      thumbnail: '/images/testimonial1.jpg',
      fileSize: '4.5 MB',
      dateAdded: '2023-11-18T00:00:00Z',
      downloadUrl: '#',
    },
    {
      id: '8',
      title: 'Email Templates',
      description: 'HTML email templates for announcing new products and promotions',
      type: 'document',
      category: 'Digital Marketing',
      thumbnail: '/images/testimonial2.jpg',
      fileSize: '2.3 MB',
      dateAdded: '2023-12-12T00:00:00Z',
      downloadUrl: '#',
    },
    {
      id: '9',
      title: 'Product Demo Videos',
      description: 'Step-by-step demonstration videos of care•atin products in use',
      type: 'video',
      category: 'Marketing Videos',
      thumbnail: '/images/testimonial3.jpg',
      fileSize: '120.8 MB',
      dateAdded: '2024-01-25T00:00:00Z',
      downloadUrl: '#',
    },
  ];
}

// Mock data for upcoming campaigns
const mockCampaigns = [
  {
    id: '1',
    title: 'Summer Collection Launch',
    description: 'Launch of new summer haircare line',
    startDate: 'May 15, 2024',
    endDate: 'June 30, 2024',
    type: 'Product Launch',
  },
  {
    id: '2',
    title: 'Back to School Promotion',
    description: 'Special discounts for back to school season',
    startDate: 'Aug 1, 2024',
    endDate: 'Sept 15, 2024',
    type: 'Seasonal',
  },
  {
    id: '3',
    title: 'Holiday Gift Sets',
    description: 'Limited edition holiday gift bundles',
    startDate: 'Nov 1, 2024',
    endDate: 'Dec 31, 2024',
    type: 'Seasonal',
  },
  {
    id: '4',
    title: 'Professional Styling Series',
    description: 'New professional styling product range',
    startDate: 'July 10, 2024',
    endDate: 'Aug 31, 2024',
    type: 'Product Launch',
  },
  {
    id: '5',
    title: 'Brand Anniversary',
    description: 'Special promotion for brand anniversary',
    startDate: 'Sept 5, 2024',
    endDate: 'Sept 25, 2024',
    type: 'Special Event',
  },
]; 