#!/usr/bin/env node

/**
 * Environment Validation Script
 * 
 * This script validates environment configuration and checks for common issues.
 * Run with: npm run validate:env
 */

const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateEnvironment() {
  log('\n🔧 Validating Environment Configuration...\n', 'cyan');
  
  let errors = [];
  let warnings = [];
  let success = [];
  
  // Check required variables
  const required = {
    'PUBLIC_STORE_DOMAIN': process.env.PUBLIC_STORE_DOMAIN,
    'PUBLIC_STOREFRONT_API_TOKEN': process.env.PUBLIC_STOREFRONT_API_TOKEN,
    'SESSION_SECRET': process.env.SESSION_SECRET,
  };
  
  // Validate required variables
  Object.entries(required).forEach(([key, value]) => {
    if (!value) {
      errors.push(`❌ Missing required variable: ${key}`);
    } else {
      success.push(`✅ ${key} is set`);
    }
  });
  
  // Validate store domain
  if (process.env.PUBLIC_STORE_DOMAIN) {
    if (!process.env.PUBLIC_STORE_DOMAIN.includes('.myshopify.com')) {
      errors.push(`❌ PUBLIC_STORE_DOMAIN should be a valid Shopify domain (*.myshopify.com)`);
    } else {
      success.push(`✅ Store domain format is valid`);
    }
  }
  
  // Validate storefront token
  if (process.env.PUBLIC_STOREFRONT_API_TOKEN) {
    const token = process.env.PUBLIC_STOREFRONT_API_TOKEN;
    if (!token.startsWith('shpat_') && !token.match(/^[a-f0-9]{32}$/)) {
      warnings.push(`⚠️  Storefront token should start with "shpat_" or be a 32-character hex string`);
    } else {
      success.push(`✅ Storefront token format is valid`);
    }
  }
  
  // Validate session secret
  if (process.env.SESSION_SECRET) {
    const secret = process.env.SESSION_SECRET;
    if (secret.length < 32) {
      warnings.push(`⚠️  Session secret should be at least 32 characters for security`);
    }
    if (secret.includes('dev-session-secret') && process.env.NODE_ENV === 'production') {
      errors.push(`❌ Production environment should not use default development session secret`);
    }
    if (secret.length >= 32 && !secret.includes('dev-session-secret')) {
      success.push(`✅ Session secret is secure`);
    }
  }
  
  // Check customer account configuration
  const hasCustomerAccountId = !!process.env.PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID;
  const hasShopId = !!process.env.SHOP_ID;
  
  if (hasCustomerAccountId && !hasShopId) {
    warnings.push(`⚠️  Customer account client ID is set but SHOP_ID is missing`);
  } else if (!hasCustomerAccountId && hasShopId) {
    warnings.push(`⚠️  SHOP_ID is set but customer account client ID is missing`);
  } else if (hasCustomerAccountId && hasShopId) {
    // Validate shop ID format
    if (!process.env.SHOP_ID.startsWith('gid://shopify/Shop/')) {
      errors.push(`❌ SHOP_ID should be in format: gid://shopify/Shop/[NUMERIC_ID]`);
    } else {
      success.push(`✅ Customer account configuration is complete`);
    }
  }
  
  // Check for development-specific configurations
  if (process.env.NODE_ENV === 'development') {
    if (process.env.DEBUG_MODE !== 'true') {
      warnings.push(`⚠️  Consider enabling DEBUG_MODE in development`);
    }
    if (process.env.ENABLE_PERFORMANCE_MONITORING !== 'true') {
      warnings.push(`⚠️  Consider enabling ENABLE_PERFORMANCE_MONITORING in development`);
    }
  }
  
  // Check for production-specific configurations
  if (process.env.NODE_ENV === 'production') {
    if (process.env.DEBUG_MODE === 'true') {
      warnings.push(`⚠️  DEBUG_MODE should be false in production`);
    }
    if (!process.env.SENTRY_DSN) {
      warnings.push(`⚠️  Consider adding SENTRY_DSN for error tracking in production`);
    }
    // Check analytics configuration
    const analyticsProviders = [
      'GA_MEASUREMENT_ID',
      'GTM_CONTAINER_ID',
      'CLARITY_PROJECT_ID',
      'FACEBOOK_PIXEL_ID'
    ];
    const configuredAnalytics = analyticsProviders.filter(provider => process.env[provider]);
    if (configuredAnalytics.length === 0) {
      warnings.push(`⚠️  No analytics providers configured for production`);
    } else {
      success.push(`✅ Analytics configured: ${configuredAnalytics.join(', ')}`);
    }
  }
  
  // Output results
  log('📊 Validation Results:\n', 'bright');
  
  if (success.length > 0) {
    log('✅ Success:', 'green');
    success.forEach(msg => log(`  ${msg}`, 'green'));
    log('');
  }
  
  if (warnings.length > 0) {
    log('⚠️  Warnings:', 'yellow');
    warnings.forEach(msg => log(`  ${msg}`, 'yellow'));
    log('');
  }
  
  if (errors.length > 0) {
    log('❌ Errors:', 'red');
    errors.forEach(msg => log(`  ${msg}`, 'red'));
    log('');
    log('❌ Environment validation failed. Please fix the errors above.', 'red');
    process.exit(1);
  } else {
    log('🎉 Environment validation passed!', 'green');
    if (warnings.length > 0) {
      log('💡 Consider addressing the warnings above for optimal configuration.', 'yellow');
    }
  }
}

function checkEnvFiles() {
  log('\n📁 Checking environment files...\n', 'cyan');
  
  const rootDir = process.cwd();
  const envFiles = [
    '.env',
    '.env.example',
    '.env.production.example',
    '.env.staging.example'
  ];
  
  envFiles.forEach(file => {
    const filePath = path.join(rootDir, file);
    if (fs.existsSync(filePath)) {
      log(`✅ ${file} exists`, 'green');
    } else {
      log(`❌ ${file} not found`, 'red');
    }
  });
  
  // Check for old/redundant files
  const oldFiles = ['.env.new', '.env.local', '.env.development'];
  const foundOldFiles = oldFiles.filter(file => 
    fs.existsSync(path.join(rootDir, file))
  );
  
  if (foundOldFiles.length > 0) {
    log('\n⚠️  Old/redundant environment files found:', 'yellow');
    foundOldFiles.forEach(file => log(`  ${file}`, 'yellow'));
    log('Consider removing these files to avoid confusion.', 'yellow');
  }
}

function main() {
  log('🔍 Environment Configuration Validator', 'bright');
  log('=====================================\n', 'bright');
  
  checkEnvFiles();
  validateEnvironment();
  
  log('\n💡 Tips:', 'blue');
  log('  - Use .env.example as a template for new environments', 'blue');
  log('  - Never commit .env files to version control', 'blue');
  log('  - Regenerate session secrets for each environment', 'blue');
  log('  - Test your configuration changes after updates\n', 'blue');
}

if (require.main === module) {
  main();
}

module.exports = { validateEnvironment, checkEnvFiles };