import { MetaFunction } from '@remix-run/node';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  twitterCard?: 'summary' | 'summary_large_image';
  structuredData?: object;
  noindex?: boolean;
  alternateLanguages?: Array<{ lang: string; href: string }>;
}

export function generateSEOMeta({
  title,
  description,
  keywords,
  canonical,
  ogImage = '/images/og-default.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  structuredData,
  noindex = false,
  alternateLanguages = []
}: SEOProps): ReturnType<MetaFunction> {
  const meta: Array<any> = [
    // Basic meta tags
    { title },
    { name: 'description', content: description },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    
    // Keywords (use sparingly)
    ...(keywords ? [{ name: 'keywords', content: keywords }] : []),
    
    // Robots
    { name: 'robots', content: noindex ? 'noindex, nofollow' : 'index, follow' },
    
    // Open Graph
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: ogType },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:site_name', content: 'care•atin' },
    
    // Twitter Cards
    { name: 'twitter:card', content: twitterCard },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: ogImage },
    
    // Brand specific
    { name: 'author', content: 'care•atin' },
    { name: 'theme-color', content: '#C49B7C' },
    { name: 'color-scheme', content: 'light' },
    
    // Performance & Security
    { name: 'referrer', content: 'same-origin' },
    { httpEquiv: 'X-Frame-Options', content: 'DENY' },
    { httpEquiv: 'X-Content-Type-Options', content: 'nosniff' },
  ];

  // Add canonical URL if provided
  if (canonical) {
    meta.push({ tagName: 'link', rel: 'canonical', href: canonical });
    meta.push({ property: 'og:url', content: canonical });
  }

  // Add alternate language links
  alternateLanguages.forEach(({ lang, href }) => {
    meta.push({ tagName: 'link', rel: 'alternate', hrefLang: lang, href });
  });

  // Add structured data
  if (structuredData) {
    meta.push({
      'script:ld+json': structuredData
    });
  }

  return meta;
}

// Predefined structured data schemas
export const careAtinSchemas = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'care•atin',
    description: 'Revolutionary hair wellness technology',
    url: 'https://care-atin.com',
    logo: 'https://care-atin.com/images/logo/care-atin-logo.svg',
    sameAs: [
      'https://instagram.com/careatin',
      'https://facebook.com/careatin',
      'https://twitter.com/careatin'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-CARE-ATIN',
      contactType: 'Customer Service',
      availableLanguage: 'English'
    }
  },

  product: {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'care•atin photonique touch™',
    description: 'Revolutionary hair wellness device with biomimetic red light therapy',
    brand: {
      '@type': 'Brand',
      name: 'care•atin'
    },
    category: 'Hair Care Device',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1,247',
      bestRating: '5',
      worstRating: '1'
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'care•atin'
      }
    }
  },

  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'care•atin',
    url: 'https://care-atin.com',
    description: 'Revolutionary hair wellness technology',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://care-atin.com/search?q={search_term}',
      'query-input': 'required name=search_term'
    }
  },

  faq: (questions: Array<{ question: string; answer: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer
      }
    }))
  }),

  review: (reviews: Array<{ author: string; rating: number; text: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    review: reviews.map(({ author, rating, text }) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: author
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: rating,
        bestRating: 5
      },
      reviewBody: text
    }))
  })
};

// Generate breadcrumb structured data
export function generateBreadcrumbs(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}