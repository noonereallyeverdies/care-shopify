#!/bin/bash

echo "🧹 Starting technical debt cleanup..."

# Create backup directory
mkdir -p .cleanup-backup/$(date +%Y%m%d_%H%M%S)
BACKUP_DIR=".cleanup-backup/$(date +%Y%m%d_%H%M%S)"

echo "📁 Creating backup in $BACKUP_DIR"

# Backup files we're about to delete
echo "💾 Backing up files before deletion..."
cp app/components/Shared/Button.tsx $BACKUP_DIR/ 2>/dev/null || echo "  - Shared/Button.tsx not found"
cp app/components/ui/buttons/Button.tsx $BACKUP_DIR/ 2>/dev/null || echo "  - ui/buttons/Button.tsx not found"
cp app/components/ui/buttons/PrimaryButton.tsx $BACKUP_DIR/ 2>/dev/null || echo "  - ui/buttons/PrimaryButton.tsx not found"
cp app/components/StandaloneAddToCart.tsx $BACKUP_DIR/ 2>/dev/null || echo "  - StandaloneAddToCart.tsx not found"
cp app/components/SimpleAddToCartButton.tsx $BACKUP_DIR/ 2>/dev/null || echo "  - SimpleAddToCartButton.tsx not found"
cp app/components/ProductFormV2.tsx $BACKUP_DIR/ 2>/dev/null || echo "  - ProductFormV2.tsx not found"

# Remove duplicate button components
echo "🗑️  Removing duplicate Button components..."
rm -f app/components/Shared/Button.tsx
rm -f app/components/ui/buttons/Button.tsx
rm -f app/components/ui/buttons/PrimaryButton.tsx

# Remove duplicate AddToCart components
echo "🗑️  Removing duplicate AddToCart components..."
rm -f app/components/StandaloneAddToCart.tsx
rm -f app/components/SimpleAddToCartButton.tsx

# Remove duplicate ProductForm components
echo "🗑️  Removing duplicate ProductForm components..."
rm -f app/components/ProductFormV2.tsx

# Update import statements across the codebase
echo "🔄 Updating import statements..."

# Update Button imports
find app -name "*.tsx" -o -name "*.ts" | xargs sed -i '' \
  -e 's|~/components/Shared/Button|~/components/Button|g' \
  -e 's|~/components/ui/buttons/Button|~/components/Button|g' \
  -e 's|~/components/ui/buttons/PrimaryButton|~/components/Button|g' \
  2>/dev/null || echo "  - Some Button import updates may have failed"

# Update AddToCart imports
find app -name "*.tsx" -o -name "*.ts" | xargs sed -i '' \
  -e 's|~/components/SimpleAddToCartButton|~/components/AddToCart|g' \
  -e 's|~/components/StandaloneAddToCart|~/components/AddToCart|g' \
  2>/dev/null || echo "  - Some AddToCart import updates may have failed"

# Update ProductForm imports
find app -name "*.tsx" -o -name "*.ts" | xargs sed -i '' \
  -e 's|~/components/ProductFormV2|~/components/ProductForm|g' \
  2>/dev/null || echo "  - Some ProductForm import updates may have failed"

# Clean up empty directories
echo "🧹 Cleaning up empty directories..."
find app/components -type d -empty -delete 2>/dev/null || echo "  - Some directories may not be empty"

echo "✅ Technical debt cleanup complete!"
echo "📁 Backup saved to: $BACKUP_DIR"
echo ""
echo "🔍 Next steps:"
echo "1. Run 'npm run type-check' to verify TypeScript compilation"
echo "2. Run your tests to ensure functionality is preserved"
echo "3. Review the changes and commit when satisfied"
echo ""
echo "🔄 To undo these changes, restore files from: $BACKUP_DIR"
