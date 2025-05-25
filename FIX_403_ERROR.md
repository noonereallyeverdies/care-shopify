# 🚨 Fix for 403 Storefront API Error

## Root Cause
The website is failing because the Shopify Storefront API credentials are not properly configured. The error shows:
- **URL**: `https://your-store.myshopify.com` (placeholder not replaced)
- **Status**: 403 Forbidden (authentication failure)
- **API**: Storefront GraphQL endpoint cannot be accessed

## 🔧 Immediate Fix

### Step 1: Check Your `.env` File
Ensure you have a `.env` file (not `.env.example`) with REAL credentials:

```bash
# Check if .env exists
ls -la .env

# If not, create it from the example
cp .env.example .env
```

### Step 2: Update `.env` with Real Credentials

```env
# Replace these with your ACTUAL Shopify store details
SHOPIFY_STORE_DOMAIN=your-actual-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-real-storefront-token
SESSION_SECRET=generate-a-random-secret-here
```

### Step 3: Get Your Shopify Credentials

1. **Store Domain**: 
   - Format: `your-store-name.myshopify.com`
   - Find in Shopify Admin → Settings → Domains

2. **Storefront Access Token**:
   - Go to Shopify Admin
   - Apps → Develop apps → Create an app
   - Configure Storefront API access
   - Install the app
   - Get the Storefront API access token

### Step 4: Generate Storefront Access Token

```
1. In Shopify Admin, go to "Apps"
2. Click "Develop apps" (might be under "Apps and sales channels")
3. Click "Create an app"
4. Name your app (e.g., "Hydrogen Storefront")
5. Go to "API credentials" tab
6. Under "Storefront API", click "Configure"
7. Select these scopes:
   - unauthenticated_read_product_listings
   - unauthenticated_read_product_inventory
   - unauthenticated_read_product_pickup_locations
   - unauthenticated_read_customers
   - unauthenticated_read_content
8. Click "Save"
9. Click "Install app"
10. Copy the "Storefront API access token"
```

### Step 5: Generate Session Secret

```bash
# Generate a secure random secret
openssl rand -base64 32
```

### Step 6: Verify Environment Variables

```bash
# Check if variables are loaded
cat .env | grep SHOPIFY

# Should show:
# SHOPIFY_STORE_DOMAIN=your-real-store.myshopify.com
# SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_xxxxxxxxxxxxx
```

### Step 7: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Clear cache and restart
rm -rf node_modules/.cache
npm run dev
```

## 🔍 Troubleshooting

### If Still Getting 403:

1. **Check Token Format**:
   - Storefront tokens usually start with `shpat_`
   - Ensure no extra spaces or quotes

2. **Verify API Access**:
   ```bash
   curl -X POST https://YOUR-STORE.myshopify.com/api/2025-01/graphql.json \
     -H "Content-Type: application/json" \
     -H "X-Shopify-Storefront-Access-Token: YOUR-TOKEN" \
     -d '{"query": "{ shop { name } }"}'
   ```

3. **Check Store Status**:
   - Ensure store is not password protected
   - Ensure store is not in development mode only

4. **API Version**:
   - Check if `2025-01` is supported (might need `2024-10` or `2024-07`)

### Common Issues:

| Issue | Solution |
|-------|----------|
| "your-store" in URL | Replace with actual store subdomain |
| Token starts with quotes | Remove quotes from token value |
| Wrong token type | Use Storefront token, not Admin API token |
| Store offline | Check Shopify admin for store status |

## ✅ Correct `.env` Example

```env
# This is what your .env should look like (with real values)
SHOPIFY_STORE_DOMAIN=myawesomestore.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=shpat_1234567890abcdef1234567890abcdef
SESSION_SECRET=ajf93j2f9j329fj329fj329fj329fj329f
```

## 🚀 Quick Test

After fixing, test the connection:

```bash
# Run the dev server
npm run dev

# Visit http://localhost:3000
# Should load without 403/500 errors
```

## 📞 Still Having Issues?

1. Double-check token permissions in Shopify admin
2. Ensure you're using Storefront API token (not Admin API)
3. Verify store domain doesn't include `https://` or `/`
4. Check if store requires password (disable for testing)

The 403 error will be resolved once proper Shopify credentials are configured.
