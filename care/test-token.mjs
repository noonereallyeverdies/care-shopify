/**
 * Simple test script to verify Shopify storefront access token
 * Run with: node test-token.mjs
 */

import { readFileSync } from 'fs';

const testStorefrontToken = async () => {
  // Load environment variables manually
  const envFile = readFileSync('.env', 'utf8');
  const envVars = {};
  
  envFile.split('\n').forEach(line => {
    if (line.includes('=') && !line.startsWith('#')) {
      const [key, ...values] = line.split('=');
      envVars[key.trim()] = values.join('=').replace(/"/g, '').trim();
    }
  });
  
  const domain = envVars.PUBLIC_STORE_DOMAIN;
  const token = envVars.PUBLIC_STOREFRONT_API_TOKEN;
  const apiVersion = envVars.PUBLIC_STOREFRONT_API_VERSION || '2025-01';
  
  if (!domain || !token) {
    console.error('❌ Missing environment variables');
    console.log('Set PUBLIC_STORE_DOMAIN and PUBLIC_STOREFRONT_API_TOKEN in .env');
    return;
  }
  
  // Simple shop query to test token
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
  console.log('API Version:', apiVersion);
  console.log('URL:', url);
  console.log('');
  
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
      const data = JSON.parse(result);
      if (data.errors) {
        console.log('⚠️  GraphQL errors:', data.errors);
      } else {
        console.log('✅ Shop data retrieved successfully');
        console.log('Shop Name:', data.data?.shop?.name);
        console.log('Domain:', data.data?.shop?.primaryDomain?.url);
      }
    } else {
      console.error('❌ Token error:', response.status, response.statusText);
      console.error('Response:', result);
      
      if (response.status === 401) {
        console.log('\n🔧 How to fix:');
        console.log('1. This token appears to be invalid or expired');
        console.log('2. Go to your Shopify Admin');
        console.log('3. Settings → Apps and sales channels → Develop apps');
        console.log('4. Create a new app or update existing');
        console.log('5. Enable Storefront API scopes');
        console.log('6. Copy the new access token to .env file');
        console.log('7. Make sure the token starts with "shpat_"');
      }
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
};

testStorefrontToken();
