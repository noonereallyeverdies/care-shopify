/**
 * Simple test script to verify Shopify storefront access token
 * Run with: node test-token.js
 */

const testStorefrontToken = async () => {
  // Load environment variables
  require('dotenv').config();
  
  const domain = process.env.PUBLIC_STORE_DOMAIN;
  const token = process.env.PUBLIC_STOREFRONT_API_TOKEN;
  const apiVersion = process.env.PUBLIC_STOREFRONT_API_VERSION || '2025-01';
  
  if (!domain || !token) {
    console.error('❌ Missing environment variables');
    console.log('Set PUBLIC_STORE_DOMAIN and PUBLIC_STOREFRONT_API_TOKEN in .env');
    return;
  }
  
  const query = `
    query {
      shop {
        name
        description
        primaryDomain {
          url
        }
      }
    }
  `;
  
  const url = `https://${domain}/api/${apiVersion}/graphql.json`;
  
  console.log('🔍 Testing storefront access token...');
  console.log('Store:', domain);
  console.log('Token:', token.substring(0, 12) + '...');
  console.log('URL:', url);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query }),
    });
    
    const result = await response.text();
    
    if (response.ok) {
      console.log('✅ Token is working!');
      console.log('Response:', JSON.parse(result));
    } else {
      console.error('❌ Token error:', response.status, response.statusText);
      console.error('Response:', result);
      
      if (response.status === 401) {
        console.log('\n🔧 How to fix:');
        console.log('1. Go to your Shopify Admin');
        console.log('2. Settings → Apps and sales channels → Develop apps');
        console.log('3. Create a new app or update existing');
        console.log('4. Enable Storefront API scopes');
        console.log('5. Copy the new access token to .env file');
      }
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
};

testStorefrontToken();
