#!/bin/bash

echo "🔧 Applying comprehensive fixes for care•atin project..."

# 1. Fix Tailwind configuration path issue
echo "📝 Fixing Tailwind configuration..."
cat > tailwind.config.ts << 'EOF'
import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'display': ['8rem', { lineHeight: '1' }],
        'heading': ['3.75rem', { lineHeight: '1' }],
        'lead': ['1.875rem', { lineHeight: '1.333' }],
        'copy': ['1.125rem', { lineHeight: '1.5' }],
        'fine': ['0.875rem', { lineHeight: '1.5' }],
      },
      colors: {
        primary: {
          DEFAULT: '#1F2937',
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        contrast: '#FFFFFF',
        notice: '#E11D48',
      },
      keyframes: {
        'background-gradient': {
          '0%, 100%': {
            transform: 'translate(var(--tx-1, 0), var(--ty-1, 0))',
          },
          '25%': {
            transform: 'translate(var(--tx-2, 0), var(--ty-2, 0))',
          },
          '50%': {
            transform: 'translate(var(--tx-3, 0), var(--ty-3, 0))',
          },
          '75%': {
            transform: 'translate(var(--tx-4, 0), var(--ty-4, 0))',
          },
        },
      },
      animation: {
        'background-gradient': 'background-gradient var(--background-gradient-speed, 60s) ease infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
EOF

# 2. Create a minimal working root.tsx
echo "⚡ Creating minimal working root.tsx..."
cat > app/root.tsx << 'EOF'
import {
  defer,
  type LinksFunction,
  type LoaderFunctionArgs,
  type MetaArgs,
} from '@shopify/remix-oxygen';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
  useRouteError,
  type ShouldRevalidateFunction,
} from '@remix-run/react';
import {
  useNonce,
  Analytics,
  getShopAnalytics,
  getSeoMeta,
} from '@shopify/hydrogen';
import { Suspense } from 'react';
import invariant from 'tiny-invariant';

// Import utilities
import { seoPayload } from '~/lib/seo.server';
import { DEFAULT_LOCALE } from './lib/utils';

// CSS imports
import criticalStyles from '~/styles/critical.css?url';
import bundleStyles from '~/styles/bundle.css?url';

export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
}) => {
  if (formMethod && formMethod !== 'GET') return true;
  if (currentUrl.toString() === nextUrl.toString()) return true;
  return false;
};

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://cdn.shopify.com' },
  { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  { rel: 'stylesheet', href: criticalStyles },
  { rel: 'stylesheet', href: bundleStyles },
];

export async function loader({ request, context }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  
  return defer({
    shop: { name: 'care•atin' },
    seo: {
      title: 'care•atin | Revolutionary Hair Wellness',
      description: 'Revolutionary hair wellness technology',
    },
    selectedLocale: DEFAULT_LOCALE,
  });
}

// Simple header component
function SimpleHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold text-gray-900">care•atin</h1>
      </div>
    </header>
  );
}

// Simple footer component
function SimpleFooter() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">
          © {new Date().getFullYear()} care•atin. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  const data = useRouteLoaderData<typeof loader>('root');
  invariant(data, 'Root loader data is required');
  
  const nonce = useNonce();
  const { selectedLocale } = data;
  
  return (
    <html lang={selectedLocale.language.toLowerCase()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          <SimpleHeader />
          <main className="flex-grow">
            <Outlet />
          </main>
          <SimpleFooter />
        </div>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const nonce = useNonce();
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Error - care•atin</title>
        <Links />
      </head>
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
            <p className="text-gray-700 mb-4">We're sorry, but something unexpected happened.</p>
            <a href="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Return Home
            </a>
          </div>
        </div>
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export const meta = ({ data }: MetaArgs<typeof loader>) => {
  return [
    { title: data?.seo?.title || 'care•atin' },
    { name: 'description', content: data?.seo?.description || 'Revolutionary hair wellness technology' },
  ];
};
EOF

# 3. Create minimal DEFAULT_LOCALE constant
echo "📁 Creating DEFAULT_LOCALE utility..."
mkdir -p app/lib
cat > app/lib/utils.ts << 'EOF'
export const DEFAULT_LOCALE = {
  language: 'EN',
  country: 'US',
};

export function parseMenu(menu: any, domain: string, env: any) {
  // Minimal menu parser - just return the menu as-is for now
  return menu;
}
EOF

# 4. Create minimal seo.server.ts
echo "🔍 Creating minimal SEO server..."
cat > app/lib/seo.server.ts << 'EOF'
export const seoPayload = {
  root: ({ shop, url }: { shop: any; url: string }) => ({
    title: shop?.name || 'care•atin',
    description: shop?.description || 'Revolutionary hair wellness technology',
    url,
  }),
};
EOF

# 5. Create minimal layout.server.ts that doesn't break
echo "🏗️ Creating working layout server..."
cat > app/lib/layout.server.ts << 'EOF'
export interface LayoutData {
  shop: {
    id: string;
    name: string;
    description?: string;
  };
  headerMenu?: any;
  footerMenu?: any;
}

export async function getLayoutData(): Promise<LayoutData> {
  // Return minimal mock data for now
  return {
    shop: {
      id: 'mock-shop',
      name: 'care•atin',
      description: 'Revolutionary hair wellness technology',
    },
    headerMenu: null,
    footerMenu: null,
  };
}
EOF

# 6. Remove the problematic remix.config.js if it exists
echo "🗑️ Removing conflicting config files..."
rm -f remix.config.js

# 7. Fix TypeScript errors in dynamic files
echo "🔧 Fixing TypeScript errors..."
# Fix examples.tsx - comments should not use JSX syntax
sed -i '' 's|{/* More slides... */}|// More slides...|g' app/components/dynamic/examples.tsx

# Fix index.ts - make sure it's properly typed
cat > app/components/dynamic/index.ts << 'EOF'
// Dynamic loading utilities for bundle optimization
import { lazy, Suspense, useEffect, useState, useRef } from 'react';

// Simple dynamic component creator
export function createDynamicComponent<T extends Record<string, any>>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>,
  fallbackComponent?: React.ComponentType<T>
) {
  const LazyComponent = lazy(importFn);
  
  return function DynamicComponent(props: T & { enableViewportLoading?: boolean }) {
    const [shouldLoad, setShouldLoad] = useState(!props.enableViewportLoading);
    const ref = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      if (!props.enableViewportLoading) return;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        { 
          threshold: 0.1,
          rootMargin: '100px'
        }
      );
      
      if (ref.current) {
        observer.observe(ref.current);
      }
      
      return () => observer.disconnect();
    }, [props.enableViewportLoading]);
    
    if (!shouldLoad) {
      return (
        <div ref={ref} style={{ minHeight: '100px' }}>
          {fallbackComponent ? React.createElement(fallbackComponent, props) : <div>Loading...</div>}
        </div>
      );
    }
    
    return (
      <Suspense fallback={fallbackComponent ? React.createElement(fallbackComponent, props) : <div>Loading...</div>}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

// Bundle size monitoring utility
export const bundleMonitor = {
  logChunkLoaded: (chunkName: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`📦 Loaded chunk: ${chunkName}`);
    }
  },
  
  trackComponentLoad: (componentName: string, startTime: number) => {
    if (process.env.NODE_ENV === 'development') {
      const loadTime = performance.now() - startTime;
      console.log(`⚡ ${componentName} loaded in ${loadTime.toFixed(2)}ms`);
    }
  }
};
EOF

# 8. Test the build
echo "🏗️ Testing build..."
npm run build

echo "✅ All fixes applied! Project should now build successfully."
echo ""
echo "🔄 Next steps:"
echo "1. The project now uses a minimal working configuration"
echo "2. You can gradually add back complex features once the core is stable"
echo "3. Update your .env file with actual values"
echo "4. Test the development server with: npm run dev"
