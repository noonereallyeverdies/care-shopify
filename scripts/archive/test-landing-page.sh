#!/bin/bash

# Landing Page Test Script
# This script helps you quickly verify that all fixes are working

echo "🧪 LANDING PAGE VERIFICATION SCRIPT"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo ""
echo "🔍 Step 1: Checking component files..."

# List of critical files
CRITICAL_FILES=(
    "app/routes/(\$locale)/_index.tsx"
    "app/components/sections/HeroSection.tsx"
    "app/components/sections/TestimonialsSection.tsx"
    "app/components/sections/DeviceShowcaseSection.tsx"
    "app/components/sections/InteractiveBeforeAfterTool.tsx"
    "app/components/sections/FinalConversionSection.tsx"
    "app/components/ui/Container.tsx"
    "app/components/SocialProofLogos.tsx"
)

ALL_EXIST=true
for file in "${CRITICAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file NOT FOUND"
        ALL_EXIST=false
    fi
done

if [ "$ALL_EXIST" = false ]; then
    echo ""
    echo "❌ Some critical files are missing. Please check your file structure."
    exit 1
fi

echo ""
echo "🔧 Step 2: Running TypeScript check..."
if npm run typecheck > /dev/null 2>&1; then
    echo "✅ TypeScript check passed"
else
    echo "❌ TypeScript errors found. Run 'npm run typecheck' for details."
    exit 1
fi

echo ""
echo "📦 Step 3: Testing build process..."
if npm run build > /dev/null 2>&1; then
    echo "✅ Build successful"
else
    echo "❌ Build failed. Run 'npm run build' for details."
    exit 1
fi

echo ""
echo "🎉 ALL TESTS PASSED!"
echo ""
echo "✅ Your landing page is ready to run!"
echo ""
echo "🚀 To start development server:"
echo "   npm run dev"
echo ""
echo "🌐 Then visit: http://localhost:3000"
echo ""
echo "📱 Things to test manually:"
echo "   • CTA button visibility and click"
echo "   • All sections loading properly"
echo "   • Mobile responsiveness"
echo "   • Video playback in hero section"
echo "   • Product showcase (if product exists)"
echo ""
echo "💡 If product showcase doesn't work, update the product handle in:"
echo "   app/routes/(\$locale)/_index.tsx (line ~48)"
