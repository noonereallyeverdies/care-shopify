#!/bin/bash

# Environment Setup Script
# This script helps set up environment configuration quickly

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "${BLUE}=================================${NC}"
    echo -e "${BLUE}  Care-atin Environment Setup    ${NC}"
    echo -e "${BLUE}=================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if .env already exists
check_existing_env() {
    if [ -f ".env" ]; then
        print_warning ".env file already exists!"
        read -p "Do you want to backup and replace it? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            mv .env .env.backup.$(date +%Y%m%d_%H%M%S)
            print_success "Backed up existing .env file"
        else
            print_info "Keeping existing .env file"
            exit 0
        fi
    fi
}

# Copy template
setup_env_file() {
    if [ ! -f ".env.example" ]; then
        print_error ".env.example not found!"
        exit 1
    fi
    
    cp .env.example .env
    print_success "Created .env from .env.example"
}

# Interactive configuration
configure_shopify() {
    echo -e "\n${BLUE}🛍️  Shopify Configuration${NC}"
    echo "Enter your Shopify store details:"
    
    # Store domain
    read -p "Store domain (e.g., my-store.myshopify.com): " store_domain
    if [ ! -z "$store_domain" ]; then
        # Remove protocol if present
        store_domain=$(echo $store_domain | sed 's|^https\?://||')
        sed -i.bak "s/your-store-name.myshopify.com/$store_domain/" .env
        print_success "Set store domain: $store_domain"
    fi
    
    # Storefront token
    read -p "Storefront API token (shpat_...): " storefront_token
    if [ ! -z "$storefront_token" ]; then
        sed -i.bak "s/shpat_your_storefront_access_token_here/$storefront_token/" .env
        print_success "Set storefront token"
    fi
    
    # Session secret
    read -p "Generate secure session secret? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        if command -v openssl &> /dev/null; then
            session_secret=$(openssl rand -base64 32)
            sed -i.bak "s/your-secure-random-session-secret-here/$session_secret/" .env
            print_success "Generated secure session secret"
        else
            print_warning "OpenSSL not found. Please generate a secure session secret manually."
        fi
    fi
}

# Optional configurations
configure_optional() {
    echo -e "\n${BLUE}⚙️  Optional Configuration${NC}"
    
    # Customer accounts
    read -p "Configure customer accounts? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Customer Account API Client ID: " customer_id
        read -p "Shop ID (gid://shopify/Shop/NUMBER): " shop_id
        
        if [ ! -z "$customer_id" ]; then
            sed -i.bak "s/^# PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID=/PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID=$customer_id/" .env
        fi
        if [ ! -z "$shop_id" ]; then
            sed -i.bak "s/^# SHOP_ID=/SHOP_ID=$shop_id/" .env
        fi
        print_success "Configured customer accounts"
    fi
    
    # Analytics
    read -p "Configure analytics? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Google Analytics Measurement ID (GA-...): " ga_id
        read -p "Google Tag Manager Container ID (GTM-...): " gtm_id
        
        if [ ! -z "$ga_id" ]; then
            sed -i.bak "s/^# GA_MEASUREMENT_ID=/GA_MEASUREMENT_ID=$ga_id/" .env
        fi
        if [ ! -z "$gtm_id" ]; then
            sed -i.bak "s/^# GTM_CONTAINER_ID=/GTM_CONTAINER_ID=$gtm_id/" .env
        fi
        print_success "Configured analytics"
    fi
}

# Validate configuration
validate_config() {
    echo -e "\n${BLUE}🔍 Validating Configuration...${NC}"
    
    if [ -f "scripts/validate-env.cjs" ]; then
        if command -v node &> /dev/null; then
            node scripts/validate-env.cjs
        else
            print_warning "Node.js not found. Please run 'npm run validate:env' manually."
        fi
    else
        print_warning "Validation script not found. Please run 'npm run validate:env' manually."
    fi
}

# Cleanup backup files
cleanup() {
    if [ -f ".env.bak" ]; then
        rm .env.bak
    fi
}

# Main script
main() {
    print_header
    
    # Check if npm/node is available
    if ! command -v npm &> /dev/null; then
        print_error "npm not found. Please install Node.js and npm first."
        exit 1
    fi
    
    check_existing_env
    setup_env_file
    configure_shopify
    configure_optional
    validate_config
    cleanup
    
    echo -e "\n${GREEN}🎉 Environment setup complete!${NC}"
    echo -e "\n${BLUE}Next steps:${NC}"
    echo "1. Review and edit .env file if needed"
    echo "2. Run 'npm run validate:env' to validate configuration"
    echo "3. Run 'npm run dev' to start development server"
    echo -e "\n${YELLOW}Remember: Never commit .env files to version control!${NC}"
}

# Run main function
main