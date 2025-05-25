#!/bin/bash

# Care Hydrogen App - Component Cleanup Script
# This script removes duplicate components and optimizes the component structure

echo "🧹 Starting Care Hydrogen App component cleanup..."

# Remove duplicate/unused components
echo "📁 Removing duplicate AddToCart components..."
rm -f /Users/yvonne/Desktop/care/new-hydrogen-app/app/components/SimpleAddToCartButton.tsx
rm -f /Users/yvonne/Desktop/care/new-hydrogen-app/app/components/StandaloneAddToCart.tsx

echo "📁 Removing unused performance monitoring components..."
rm -f /Users/yvonne/Desktop/care/new-hydrogen-app/app/components/PerformanceMonitor.tsx
rm -f /Users/yvonne/Desktop/care/new-hydrogen-app/app/components/EnhancedPerformanceMonitor.tsx
rm -f /Users/yvonne/Desktop/care/new-hydrogen-app/app/components/HydrationAnalyzer.tsx

echo "📁 Removing excessive optimization components..."
rm -f /Users/yvonne/Desktop/care/new-hydrogen-app/app/components/LazyHydrate.tsx
rm -f /Users/yvonne/Desktop/care/new-hydrogen-app/app/components/ResourcePreload.tsx
rm -f /Users/yvonne/Desktop/care/new-hydrogen-app/app/components/FontOptimization.tsx

echo "📁 Removing excessive visual effect components..."
rm -f /Users/yvonne/Desktop/care/new-hydrogen-app/app/components/LightGlow.tsx
rm -f /Users/yvonne/Desktop/care/new-hydrogen-app/app/components/WarmthPulse.tsx
rm -f /Users/yvonne/Desktop/care/new-hydrogen-app/app/components/WavyBackground.tsx

echo "📁 Removing duplicate server components..."
rm -rf /Users/yvonne/Desktop/care/new-hydrogen-app/app/components/server

echo "📁 Removing utility components that are no longer needed..."
rm -f /Users/yvonne/Desktop/care/new-hydrogen-app/app/components/utility/ClientOnly.tsx

echo "✅ Component cleanup completed!"

echo "🔧 Component structure optimized:"
echo "├── product/"
echo "│   ├── AddToCartButton.tsx (consolidated)"
echo "│   ├── ProductForm.tsx (consolidated)"
echo "│   └── index.ts"
echo "├── ui/"
echo "│   └── MobileOptimizedVideo.tsx (new)"
echo "└── styles/"
echo "    └── mobile-optimizations.css (new)"

echo "🎯 Next steps:"
echo "1. Update imports across the app to use new consolidated components"
echo "2. Test the product page functionality"
echo "3. Verify mobile experience improvements"
echo "4. Check conversion path optimization"

echo "✨ Cleanup complete! Your app is now optimized for better performance and maintainability."
