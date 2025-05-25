#!/bin/bash

# Development Setup Script
# This script helps new developers get started quickly

set -e  # Exit on any error

echo "🚀 Setting up Hydrogen Development Environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check Node.js version
print_status "Checking Node.js version..."
NODE_VERSION=$(node --version | cut -d'v' -f2)
REQUIRED_VERSION="18.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" = "$REQUIRED_VERSION" ]; then
    print_success "Node.js version $NODE_VERSION is compatible"
else
    print_error "Node.js version $NODE_VERSION is not compatible. Please install Node.js >= $REQUIRED_VERSION"
    exit 1
fi

# Check npm version
print_status "Checking npm version..."
npm --version

# Install dependencies
print_status "Installing dependencies..."
npm install

# Setup environment file
if [ ! -f ".env.local" ]; then
    print_status "Creating environment file..."
    cp .env.example .env.local
    print_warning "Please update .env.local with your Shopify configuration"
else
    print_success "Environment file already exists"
fi

# Run codegen
print_status "Running GraphQL codegen..."
npm run codegen

# Setup git hooks
if [ -d ".git" ]; then
    print_status "Setting up git hooks..."
    npx husky install
    npx husky add .husky/pre-commit "npm run validate"
    print_success "Git hooks configured"
fi

# Validate setup
print_status "Validating setup..."
npm run typecheck

# Success message
print_success "Development environment setup complete!"
echo ""
echo "🎉 You're ready to start developing!"
echo ""
echo "Available commands:"
echo "  npm run dev          - Start development server"
echo "  npm run dev:debug    - Start with debug logging"
echo "  npm run test         - Run all tests"
echo "  npm run test:ui      - Run tests with UI"
echo "  npm run lint         - Lint and fix code"
echo "  npm run typecheck    - Check TypeScript types"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your Shopify store configuration"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
print_warning "Make sure your Shopify store is set up with products for testing"
