#!/bin/bash
echo "Fixing serialization issue by temporarily modifying files..."

# Backup files that might be causing issues
echo "Backing up analytics files..."
cp app/lib/analytics.ts app/lib/analytics.ts.bak
cp app/root.tsx app/root.tsx.bak

# Replace analytics.ts with a simple stub file
echo "Creating stub analytics file..."
cat > app/lib/analytics.ts << 'EOF'
// Stub analytics file - real version in analytics.ts.bak
export function useCareAtinPageTracking() {
  // No-op implementation to fix serialization issues
  console.log('Analytics tracking disabled');
}

export const careAtinEvents = {
  HERO_CTA_CLICK: { action: 'click', category: 'hero', label: 'primary_cta' }
};
EOF

# Start the server
echo "Starting server with shopify CLI..."
npm run dev 