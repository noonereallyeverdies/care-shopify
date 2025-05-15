#!/bin/bash
echo "Starting minimal development server..."

# Set environment variables
export NODE_OPTIONS="--max-old-space-size=4096"
export DEBUG="shopify:*"

# Start with minimal options
npm run dev 