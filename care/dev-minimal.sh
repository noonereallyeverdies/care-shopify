#!/bin/bash
echo "Starting minimal development server..."

# Use npx directly to bypass CLI issues
NODE_ENV=development npx @shopify/hydrogen dev --no-codegen 