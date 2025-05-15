# Environment Configuration Documentation

## Overview

This document provides comprehensive guidance on managing environment configurations for the Care-atin Shopify application. The configuration has been consolidated and optimized for clarity, security, and maintainability.

## Environment Files Structure

### Primary Files

- **`.env`** - Active development configuration (never commit to version control)
- **`.env.example`** - Template with all available variables and documentation
- **`.env.production.example`** - Production-specific template
- **`.env.staging.example`** - Staging-specific template

### Removed Files

- **`.env.new`** - Moved to `.env.new.backup` (redundant)
- Any other environment files have been consolidated

## Environment Variables Reference

### Required Variables

```bash
# Shopify Store Configuration
PUBLIC_STORE_DOMAIN=your-store-name.myshopify.com
PUBLIC_STOREFRONT_API_TOKEN=shpat_your_token_here
SESSION_SECRET=your-secure-session-secret
```

### Optional Variables

#### Shopify Extended Configuration
```bash
PUBLIC_STOREFRONT_API_VERSION=2025-01
PUBLIC_STOREFRONT_ID=
PRIVATE_STOREFRONT_API_TOKEN=
PUBLIC_CHECKOUT_DOMAIN=
```

#### Customer Account API
```bash
PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID=
PUBLIC_CUSTOMER_ACCOUNT_API_URL=
SHOP_ID=gid://shopify/Shop/YOUR_SHOP_ID
```

#### Analytics & Tracking
```bash
GA_MEASUREMENT_ID=G-XXXXXXXXXX
GTM_CONTAINER_ID=GTM-XXXXXXX
CLARITY_PROJECT_ID=your_clarity_id
FACEBOOK_PIXEL_ID=your_pixel_id
```

#### Application Configuration
```bash
NODE_ENV=development|staging|production
DEBUG_MODE=true|false
ENABLE_PERFORMANCE_MONITORING=true|false
ENABLE_AB_TESTING=true|false
```

#### Error Tracking
```bash
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

## Environment-Specific Configurations

### Development
```bash
# Optimal development settings
NODE_ENV=development
DEBUG_MODE=true
ENABLE_PERFORMANCE_MONITORING=true
ENABLE_AB_TESTING=false

# Use development session secret (insecure)
SESSION_SECRET=dev-session-secret-replace-in-production

# Analytics typically disabled or using test IDs
```

### Staging
```bash
# Staging environment settings
NODE_ENV=staging
DEBUG_MODE=true
ENABLE_PERFORMANCE_MONITORING=true
ENABLE_AB_TESTING=true

# Secure session secret
SESSION_SECRET=staging-secure-random-secret

# Limited analytics or test configurations
```

### Production
```bash
# Production environment settings
NODE_ENV=production
DEBUG_MODE=false
ENABLE_PERFORMANCE_MONITORING=true
ENABLE_AB_TESTING=true

# Highly secure session secret
SESSION_SECRET=super-secure-production-secret

# Full analytics configuration
GA_MEASUREMENT_ID=G-PROD-XXXXXXX
GTM_CONTAINER_ID=GTM-PROD-XXX
SENTRY_DSN=https://prod-sentry-dsn...
```

## Getting Started

### 1. Initial Setup

```bash
# Copy example file
npm run setup:env

# Edit .env with your values
nano .env
```

### 2. Validate Configuration

```bash
# Validate current environment
npm run validate:env

# Validate production configuration
npm run validate:env:production
```

### 3. Generate Secure Session Secret

```bash
# Generate a secure random string
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Security Best Practices

### 1. Session Secrets
- **Minimum 32 characters**
- **Unique per environment**
- **Never reuse development secrets in production**
- **Rotate regularly**

### 2. Token Management
- **Use environment-specific tokens**
- **Regularly audit and rotate tokens**
- **Limit token permissions to minimum required**
- **Monitor token usage**

### 3. Environment File Handling
- **Never commit .env files to version control**
- **Restrict file permissions (600)**
- **Use secure storage for production secrets**
- **Regular security audits**

## Environment Validation

The application includes automatic environment validation that checks:

### Startup Validation
- Required variables presence
- Format validation (domains, tokens, shop IDs)
- Security checks (session secret strength)
- Environment-specific requirements

### Runtime Validation
- Token validity
- Store accessibility
- Customer account configuration

### Manual Validation

```bash
# Run validation script
npm run validate:env

# Example output:
🔧 Validating Environment Configuration...

✅ Success:
  ✅ PUBLIC_STORE_DOMAIN is set
  ✅ Store domain format is valid
  ✅ PUBLIC_STOREFRONT_API_TOKEN is set
  ✅ Storefront token format is valid
  ✅ SESSION_SECRET is set
  ✅ Session secret is secure

🎉 Environment validation passed!
```

## Troubleshooting

### Common Issues

#### 1. 401 Unauthorized Errors
```bash
# Check token validity
curl -H "X-Shopify-Storefront-Access-Token: $PUBLIC_STOREFRONT_API_TOKEN" \
     "https://$PUBLIC_STORE_DOMAIN/api/2025-01/graphql" \
     -X POST -d '{"query":"{ shop { name } }"}'
```

#### 2. Invalid Domain Format
- Ensure domain includes `.myshopify.com`
- No protocol (http/https) prefix
- No trailing slashes

#### 3. Customer Account Issues
- Verify both CLIENT_ID and SHOP_ID are set
- Ensure SHOP_ID format: `gid://shopify/Shop/[NUMERIC_ID]`
- Check customer account API is enabled in Shopify

#### 4. Session Secret Warnings
- Generate a new secure secret for production
- Ensure minimum 32 characters
- Use different secrets per environment

## Deploy to Different Environments

### Shopify Oxygen (Production)

```bash
# Set environment variables in Shopify Partners Dashboard
# Or use CLI:
shopify hydrogen env set PRODUCTION --env-file=.env.production.example
```

### Vercel Deployment

```bash
# Set environment variables
vercel env add PUBLIC_STORE_DOMAIN production
vercel env add PUBLIC_STOREFRONT_API_TOKEN production
vercel env add SESSION_SECRET production
```

### Netlify Deployment

```bash
# Using Netlify CLI
netlify env:set PUBLIC_STORE_DOMAIN "your-store.myshopify.com"
netlify env:set PUBLIC_STOREFRONT_API_TOKEN "shpat_your_token"
netlify env:set SESSION_SECRET "your-secure-secret"
```

### Docker Deployment

```dockerfile
# Example Dockerfile environment
ENV PUBLIC_STORE_DOMAIN=your-store.myshopify.com
ENV PUBLIC_STOREFRONT_API_TOKEN=shpat_your_token
ENV SESSION_SECRET=your-secure-secret
```

## Environment Variables in Code

### Server-side Usage

```typescript
// app/lib/env.server.ts
export const config = createEnvironmentConfig(env);

// Access in loaders/actions
export async function loader({ context }: LoaderFunctionArgs) {
  const { env } = context;
  const config = createEnvironmentConfig(env);
  // Use config.shopify.storeDomain, etc.
}
```

### Client-side Usage

```typescript
// Only PUBLIC_ variables are available on client
const storeDomain = window.ENV?.PUBLIC_STORE_DOMAIN;
const storefrontToken = window.ENV?.PUBLIC_STOREFRONT_API_TOKEN;
```

### Type Safety

```typescript
// env.d.ts provides full typing
declare global {
  interface Env {
    PUBLIC_STORE_DOMAIN: string;
    PUBLIC_STOREFRONT_API_TOKEN: string;
    SESSION_SECRET: string;
    // ... all other variables
  }
}
```

## Monitoring & Maintenance

### Regular Tasks

1. **Monthly Security Review**
   - Rotate session secrets
   - Audit environment variables
   - Check token permissions

2. **Quarterly Updates**
   - Update Shopify API versions
   - Review and optimize configuration
   - Update documentation

3. **Environment Sync**
   - Ensure all environments have required variables
   - Validate configuration across environments
   - Test deployments with new configurations

### Automated Monitoring

```typescript
// Add to application startup
import { createEnvironmentConfig, logEnvironmentConfig } from '~/lib/env.server';

export async function loader({ context }: LoaderFunctionArgs) {
  const config = createEnvironmentConfig(context.env);
  
  // Log configuration in development
  if (context.env.NODE_ENV === 'development') {
    logEnvironmentConfig(config);
  }
}
```

## Migration Guide

### From Old Configuration

If migrating from the previous multiple `.env` files:

1. **Backup existing files**
   ```bash
   cp .env .env.backup
   cp .env.new .env.new.backup
   ```

2. **Use new template**
   ```bash
   npm run setup:env
   ```

3. **Transfer values**
   - Copy values from old files to new `.env`
   - Ensure all required variables are set
   - Remove old redundant files

4. **Validate new configuration**
   ```bash
   npm run validate:env
   ```

5. **Test application**
   ```bash
   npm run dev
   ```

## Best Practices Summary

✅ **DO:**
- Use `.env.example` as template for new environments
- Validate configuration before deployment
- Generate unique session secrets per environment
- Keep environment-specific configurations separate
- Regularly audit and rotate secrets
- Use the validation script before deployment

❌ **DON'T:**
- Commit `.env` files to version control
- Use development secrets in production
- Share production secrets in insecure channels
- Use weak or default session secrets
- Mix environment configurations
- Ignore validation warnings

## Support

For additional help with environment configuration:

1. Run the validation script: `npm run validate:env`
2. Check the troubleshooting section above
3. Review Shopify's [environment documentation](https://shopify.dev/docs/custom-storefronts/hydrogen)
4. Contact the development team for environment-specific issues

---

*Last updated: [Current Date]*
*Version: 1.0*