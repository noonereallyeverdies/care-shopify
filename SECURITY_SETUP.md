# 🔐 Security Setup Instructions

## Critical: Environment Variables Setup

Your application was missing proper environment variable configuration. Follow these steps:

### 1. Replace Placeholder Values in .env

The `.env` file currently contains placeholder values. You MUST replace them with your actual Shopify credentials:

```bash
# Get these from your Shopify Partner Dashboard or store admin
PRIVATE_STOREFRONT_API_TOKEN=your_actual_private_token
PUBLIC_STOREFRONT_API_TOKEN=your_actual_public_token
PUBLIC_STORE_DOMAIN=your-actual-store.myshopify.com
PUBLIC_STOREFRONT_ID=your_actual_storefront_id

# Customer Account API (if using customer accounts)
PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID=your_actual_client_id
PUBLIC_CUSTOMER_ACCOUNT_API_URL=https://shopify.com/your_actual_shop_id
SHOP_ID=your_actual_shop_id

# Generate a secure session secret
SESSION_SECRET=your_secure_random_session_secret_here
```

### 2. Generate a Secure Session Secret

Use one of these methods to generate a secure session secret:

**Option A: Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option B: OpenSSL**
```bash
openssl rand -hex 32
```

**Option C: Online Generator** (for development only)
Visit: https://randomkeygen.com/ and use a 256-bit WEP key

### 3. Shopify Store Configuration

1. **Get your Storefront API tokens:**
   - Go to your Shopify admin
   - Navigate to Apps > Develop apps
   - Create a private app or use existing Hydrogen app
   - Enable Storefront API access
   - Copy the generated tokens

2. **Store Domain:**
   - Your store domain should be in format: `your-store.myshopify.com`
   - Do NOT include https:// prefix

### 4. Verify Setup

Test your setup:
```bash
npm run dev
```

If you see errors about missing environment variables, double-check your `.env` file values.

## Security Best Practices

- Never commit real API tokens to git (already configured in .gitignore)
- Use different credentials for development and production
- Rotate session secrets periodically
- Use environment-specific .env files for different stages

## Production Deployment

For production, set these environment variables in your hosting platform:
- Vercel: Use the Environment Variables section in project settings
- Netlify: Use Environment variables in Site settings
- Other: Consult your hosting provider's documentation

## Need Help?

If you need assistance getting your Shopify credentials:
1. Visit: https://shopify.dev/docs/custom-storefronts/building-with-the-storefront-api/getting-started
2. Contact your Shopify Partner or store owner
3. Check Shopify's documentation for Hydrogen setup
