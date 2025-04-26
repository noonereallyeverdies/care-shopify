import {
  json,
  type MetaArgs,
  type LoaderFunctionArgs,
  redirect,
} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {flattenConnection, getSeoMeta, Image} from '@shopify/hydrogen';

import {PageHeader, Section} from '~/components/Text';
import {Link} from '~/components/Link';
import {Grid} from '~/components/Grid';
import {getImageLoadingPriority, PAGINATION_SIZE} from '~/lib/const';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import type {ArticleFragment} from 'storefrontapi.generated';
import { Card, CardContent, CardImage } from '~/components/ui/layouts/Card';

const BLOG_HANDLE = 'journal';

export const headers = routeHeaders;

export const loader = async ({
  request,
  context: {storefront},
}: LoaderFunctionArgs) => {
  console.log('[Journal Index Loader] Starting to fetch blog data...');
  const {language, country} = storefront.i18n;
  
  try {
    const {blog} = await storefront.query(BLOGS_QUERY, {
      variables: {
        blogHandle: BLOG_HANDLE,
        pageBy: PAGINATION_SIZE,
        language,
      },
    });

    console.log('[Journal Index Loader] Blog query response:', blog ? 'received' : 'null');

    if (!blog) {
      console.log('[Journal Index Loader] Blog not found, redirecting to homepage');
      return redirect('/');
    }

    if (!blog.articles) {
      console.log('[Journal Index Loader] Blog exists but has no articles');
      const seo = seoPayload.blog({
        blog, 
        url: request.url,
      });
      return json({
        articles: [],
        seo,
        hasArticles: false
      });
    }

    console.log('[Journal Index Loader] Processing articles...');
    const articles = flattenConnection(blog.articles).map((article) => {
      const {publishedAt} = article!;
      return {
        ...article,
        publishedAt: new Intl.DateTimeFormat(`${language}-${country}`, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(new Date(publishedAt!)),
      };
    });

    const seo = seoPayload.blog({blog, url: request.url});

    console.log('[Journal Index Loader] Returning data with', articles.length, 'articles');
    return json({
      articles, 
      seo,
      hasArticles: articles.length > 0
    });
  } catch (error) {
    console.error('[Journal Index Loader] Error fetching blog data:', error);
    return json({
      articles: [],
      seo: seoPayload.blog({
        blog: {
          title: 'Hair Science Journal',
          seo: {
            title: 'Hair Science Journal | care•atin',
            description: 'Discover the latest research on hair health and red light therapy for growth, strength, and beautiful hair.',
          }
        },
        url: request.url,
      }),
      hasArticles: false,
      error: true
    });
  }
};

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Journals() {
  const {articles, hasArticles, error} = useLoaderData<typeof loader>();

  // Define categories for better organization
  const categories = [
    { name: 'hair science', handle: 'science', description: 'The biology and research behind hair growth' },
    { name: 'red light therapy', handle: 'red-light-therapy', description: 'How red light transforms your hair from within' },
    { name: 'success stories', handle: 'success-stories', description: 'Real results from real people' },
    { name: 'hair care tips', handle: 'hair-care-tips', description: 'Daily routines for healthier hair' },
  ];

  return (
    <>
      <PageHeader heading="the hair science journal" className="brand-heading" />
      <Section className="section-spacing">
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <p className="text-lg text-neutral-700 brand-body mb-6">
            explore our collection of expert insights, research-backed articles, and hair transformation stories for healthier, more vibrant hair with red light therapy
          </p>
          
          <div className="prose prose-rose prose-sm max-w-none mb-8">
            <p>
              Welcome to care•atin's hair science journal, where we combine scientific research with practical advice to help you achieve your best hair yet. Our articles are meticulously researched and written by experts in dermatology, trichology, and hair science.
            </p>
          </div>
        </div>
        
        {/* Categories Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-medium mb-8 text-center brand-heading lowercase">explore by topic</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div key={category.handle} className="bg-rose-50 rounded-xl p-6 text-center hover:bg-rose-100 transition-colors">
                <h3 className="font-medium mb-2 lowercase brand-heading">{category.name}</h3>
                <p className="text-sm text-neutral-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {error && (
          <div className="text-center p-8 rounded-lg bg-rose-50 max-w-2xl mx-auto">
            <h3 className="text-xl font-medium text-rose-700 mb-2 brand-heading">we're working on our journal</h3>
            <p className="text-neutral-700 brand-body">Our blog content is being carefully curated and will be available soon. Please check back later for insightful articles about hair health and red light therapy.</p>
          </div>
        )}
        
        {!error && !hasArticles && (
          <div className="text-center max-w-2xl mx-auto">
            <Card variant="flat" padding="lg">
              <h3 className="text-xl font-medium text-neutral-800 mb-4 brand-heading">articles coming soon</h3>
              <CardContent>
                <p className="text-neutral-700 mb-6">We're preparing insightful articles about hair health, red light technology, and transformative care routines.</p>
                <p className="text-neutral-600">Check back soon for our expertly crafted content.</p>
              </CardContent>
            </Card>
          </div>
        )}
        
        {hasArticles && (
          <>
            {/* Featured Article Section (if articles exist) */}
            {articles.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-medium mb-8 brand-heading lowercase">featured article</h2>
                
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {articles[0].image && (
                      <div className="aspect-video rounded-xl overflow-hidden">
                        <Image
                          data={articles[0].image}
                          aspectRatio="3/2"
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div>
                      <Link to={`/${BLOG_HANDLE.toLowerCase()}/${articles[0].handle}`}>
                        <h3 className="text-2xl font-medium mb-3 hover:text-rose-500 transition-colors brand-heading">{articles[0].title}</h3>
                      </Link>
                      
                      <div className="text-sm text-neutral-500 mb-4 brand-body">{articles[0].publishedAt}</div>
                      
                      {articles[0].contentHtml && (
                        <div 
                          className="prose prose-sm max-w-none mb-4 line-clamp-3"
                          dangerouslySetInnerHTML={{ 
                            __html: articles[0].contentHtml.substring(0, 300) + '...' 
                          }}
                        />
                      )}
                      
                      <Link 
                        to={`/${BLOG_HANDLE.toLowerCase()}/${articles[0].handle}`}
                        className="inline-flex items-center text-rose-500 font-medium"
                      >
                        Read more
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Latest Articles Grid */}
            <div>
              <h2 className="text-2xl font-medium mb-8 brand-heading lowercase">latest articles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article, i) => (
                  <ArticleCard
                    blogHandle={BLOG_HANDLE.toLowerCase()}
                    article={article}
                    key={article.id}
                    loading={getImageLoadingPriority(i, 2)}
                  />
                ))}
              </div>
            </div>
            
            {/* Newsletter Section */}
            <div className="mt-20 bg-neutral-50 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl font-medium mb-4 brand-heading lowercase">stay informed</h2>
              <p className="max-w-2xl mx-auto mb-8">Get the latest hair science research, tips, and exclusive offers delivered directly to your inbox.</p>
              
              <div className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input type="email" placeholder="your email address" className="flex-grow rounded-full px-6 py-3 border border-neutral-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 focus:outline-none" />
                  <button type="submit" className="bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition-colors whitespace-nowrap">subscribe</button>
                </div>
              </div>
            </div>
          </>
        )}
      </Section>
    </>
  );
}

function ArticleCard({
  blogHandle,
  article,
  loading,
}: {
  blogHandle: string;
  article: ArticleFragment;
  loading?: HTMLImageElement['loading'];
}) {
  return (
    <Card 
      as="article" 
      variant="default" 
      padding="none" 
      className="hover-lift"
      hoverable
    >
      <Link to={`/${blogHandle}/${article.handle}`} className="block">
        {article.image && (
          <CardImage 
            src={article.image.url}
            alt={article.image.altText || article.title}
            aspectRatio="3/2"
          />
        )}
        <div className="p-6">
          <h2 className="text-lg font-medium mb-3 brand-heading">{article.title}</h2>
          <span className="block text-sm text-neutral-500 mb-3 brand-body">{article.publishedAt}</span>
          
          {article.contentHtml && (
            <div 
              className="prose prose-sm max-w-none mb-3 line-clamp-2 text-neutral-600"
              dangerouslySetInnerHTML={{ 
                __html: article.contentHtml.substring(0, 150) + '...' 
              }}
            />
          )}
          
          <span className="text-rose-500 font-medium inline-flex items-center text-sm">
            Read more
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    </Card>
  );
}

const BLOGS_QUERY = `#graphql
query Blog(
  $language: LanguageCode
  $blogHandle: String!
  $pageBy: Int!
  $cursor: String
) @inContext(language: $language) {
  blog(handle: $blogHandle) {
    title
    seo {
      title
      description
    }
    articles(first: $pageBy, after: $cursor) {
      edges {
        node {
          ...Article
        }
      }
    }
  }
}

fragment Article on Article {
  author: authorV2 {
    name
  }
  contentHtml
  handle
  id
  image {
    id
    altText
    url
    width
    height
  }
  publishedAt
  title
}
`;
