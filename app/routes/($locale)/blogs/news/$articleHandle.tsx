import { validateLocaleParameter } from "~/lib/locale-utils";
import {
  json,
  type MetaArgs,
  type LinksFunction,
  type LoaderFunctionArgs,
  redirect,
} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';
import {getSeoMeta, Image} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';

import {PageHeader, Section} from '~/components/Text';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';

import styles from '../styles/custom-font.css?url';
import articleStyles from '../styles/article.css?url';

const BLOG_HANDLE = 'journal';

export const headers = routeHeaders;

export const links: LinksFunction = () => {
  return [
    {rel: 'stylesheet', href: styles},
    {rel: 'stylesheet', href: articleStyles}
  ];
};

export async function loader({request, params, context}: LoaderFunctionArgs) {
  validateLocaleParameter(args);  console.log('[Journal Article Loader] Starting to fetch article data...');
  const {language, country} = context.storefront.i18n;

  invariant(params.journalHandle, 'Missing journal handle');
  
  try {
    const {blog} = await context.storefront.query(ARTICLE_QUERY, {
      variables: {
        blogHandle: BLOG_HANDLE,
        articleHandle: params.journalHandle,
        language,
      },
    });

    console.log('[Journal Article Loader] Blog query response:', blog ? 'received' : 'null');

    // If the blog doesn't exist, redirect to journal index
    if (!blog) {
      console.log('[Journal Article Loader] Blog not found, redirecting to journal index');
      return redirect('/journal');
    }

    // If the article doesn't exist, redirect to journal index
    if (!blog.articleByHandle) {
      console.log('[Journal Article Loader] Article not found, redirecting to journal index');
      return redirect('/journal');
    }

    const article = blog.articleByHandle;
    
    console.log('[Journal Article Loader] Article found:', article.title);

    const formattedDate = new Intl.DateTimeFormat(`${language}-${country}`, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(article?.publishedAt!));

    // Get more articles for the "related articles" section
    const {blog: blogWithArticles} = await context.storefront.query(BLOG_ARTICLES_QUERY, {
      variables: {
        blogHandle: BLOG_HANDLE,
        pageBy: 4, // Get 4 articles so we can exclude the current one
        language,
      },
    });

    let relatedArticles = [];
    
    if (blogWithArticles?.articles) {
      // Filter out the current article and take up to 3 related articles
      relatedArticles = blogWithArticles.articles.edges
        .map(edge => edge.node)
        .filter(node => node.id !== article.id)
        .slice(0, 3)
        .map(relatedArticle => ({
          ...relatedArticle,
          publishedAt: new Intl.DateTimeFormat(`${language}-${country}`, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(new Date(relatedArticle.publishedAt)),
        }));
    }

    const seo = seoPayload.article({article, url: request.url});

    // Estimate reading time based on content length (rough estimate)
    const wordCount = article.contentHtml.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readingTimeMinutes = Math.max(1, Math.round(wordCount / 200)); // Assuming 200 words per minute

    return json({
      article, 
      formattedDate, 
      seo, 
      relatedArticles,
      readingTimeMinutes,
      currentUrl: request.url
    });
  } catch (error) {
    console.error('[Journal Article Loader] Error fetching article data:', error);
    return redirect('/journal');
  }
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Article() {
  const {article, formattedDate, relatedArticles, readingTimeMinutes, currentUrl} = useLoaderData<typeof loader>();

  const {title, image, contentHtml, author} = article;

  // Function to handle social sharing
  const handleShare = (platform: string) => {
    let shareUrl = '';
    
    switch(platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        break;
      case 'pinterest':
        if (image?.url) {
          shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&media=${encodeURIComponent(image.url)}&description=${encodeURIComponent(title)}`;
        }
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
        break;
      default:
        // If on a device that supports native sharing
        if (navigator.share) {
          navigator.share({
            title: title,
            url: currentUrl
          }).catch(console.error);
          return;
        }
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 pt-12 md:pt-16">
        <Link 
          to="/journal" 
          className="text-rose-600 hover:text-rose-700 transition-colors inline-flex items-center gap-2 brand-body mb-8"
          aria-label="Back to journal"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6"/>
          </svg>
          <span>back to journal</span>
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-serif font-medium mb-6 brand-heading">{title}</h1>
        
        <div className="flex flex-wrap items-center justify-between gap-4 text-neutral-600 mb-8">
          <div className="flex items-center gap-2 brand-body">
            <span className="font-medium">{author?.name || 'care•atin team'}</span>
            <span className="mx-2">•</span>
            <span>{formattedDate}</span>
            <span className="mx-2">•</span>
            <span>{readingTimeMinutes} min read</span>
          </div>
          
          {/* Share buttons */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-500">Share:</span>
            <button 
              onClick={() => handleShare('facebook')}
              className="text-neutral-500 hover:text-blue-600 transition-colors"
              aria-label="Share on Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"></path>
              </svg>
            </button>
            <button 
              onClick={() => handleShare('twitter')}
              className="text-neutral-500 hover:text-blue-400 transition-colors"
              aria-label="Share on Twitter"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.162 5.65593C21.3985 5.99362 20.589 6.2154 19.76 6.31393C20.6337 5.79136 21.2877 4.96894 21.6 3.99993C20.78 4.48793 19.881 4.82993 18.944 5.01493C18.3146 4.34151 17.4803 3.89489 16.5709 3.74451C15.6615 3.59413 14.7279 3.74842 13.9153 4.18338C13.1026 4.61834 12.4564 5.30961 12.0771 6.14972C11.6978 6.98983 11.6067 7.93171 11.818 8.82893C10.1551 8.74558 8.52834 8.31345 7.04329 7.56059C5.55823 6.80773 4.24812 5.75098 3.19799 4.45893C2.82628 5.09738 2.63095 5.82315 2.63199 6.56193C2.63199 8.01193 3.36999 9.29293 4.49199 10.0429C3.828 10.022 3.17862 9.84271 2.59799 9.51993V9.57193C2.59819 10.5376 2.93236 11.4735 3.5439 12.221C4.15544 12.9684 5.00647 13.4814 5.95299 13.6729C5.33661 13.84 4.6903 13.8646 4.06299 13.7449C4.30897 14.5762 4.80827 15.3031 5.48329 15.824C6.15831 16.345 6.97386 16.6337 7.81499 16.6499C6.69938 17.5245 5.35404 17.9998 3.97499 17.9969C3.64899 17.9969 3.32399 17.9769 2.99999 17.9369C4.40328 18.8793 6.04783 19.3736 7.72499 19.3719C16.735 19.3719 21.656 11.8739 21.656 5.45793C21.656 5.27593 21.651 5.09193 21.643 4.91093C22.4583 4.31631 23.1591 3.5865 23.725 2.75093C22.968 3.08887 22.1606 3.30645 21.332 3.39693C22.1791 2.82786 22.8338 1.97642 23.163 0.999927C22.3486 1.48662 21.4585 1.83093 20.526 2.01893C19.8766 1.34045 19.0235 0.894696 18.1047 0.749833C17.1859 0.604969 16.2474 0.768597 15.4347 1.2152C14.622 1.66181 13.9753 2.36692 13.5956 3.20953C13.2159 4.05214 13.124 5.00151 13.335 5.90393C7.44999 5.62993 3.89599 3.06493 1.67299 0.860927C0.812636 2.22048 0.79568 3.9127 1.61699 5.29293C1.07676 5.27078 0.551062 5.12431 0.085989 4.86593V4.91893C0.0866565 5.89285 0.428767 6.83645 1.0605 7.58028C1.69223 8.32412 2.57486 8.81286 3.54199 8.96893C3.04404 9.10101 2.52622 9.12338 2.01999 9.03393C2.28233 9.86954 2.80368 10.5923 3.50873 11.1011C4.21378 11.6099 5.0645 11.8703 5.93899 11.8429C4.29048 13.1337 2.25216 13.8351 0.15799 13.8339C-0.0521491 13.8341 -0.262345 13.821 -0.471989 13.7949C1.65676 15.1308 4.15469 15.8449 6.70699 15.8419C11.054 15.8419 13.401 13.9509 15.025 12.3499C16.649 10.7489 17.938 8.38693 18.872 5.99993C19.6824 3.97519 20.0742 1.80489 20.025 0.632927L20.017 0.565927C20.0274 0.488214 20.0293 0.409925 20.023 0.331927C20.023 0.285927 20.018 0.240927 20.013 0.195927C20.0155 0.145259 20.0155 0.0945925 20.013 0.0439272C20.0059 0.0433051 20.0059 0.0433051 20.017 0.565927C19.984 0.536927 19.951 0.505927 19.917 0.476927C19.8743 0.43827 19.8323 0.398948 19.791 0.359927C19.766 0.334927 19.741 0.308927 19.716 0.282927C19.715 0.282927 19.715 0.282927 19.714 0.282927C19.727 0.295927 19.74 0.308927 19.754 0.322927C21.247 1.27793 22.0919 2.39293 22.162 2.52793C22.159 3.26993 22.159 4.51293 22.159 5.65593H22.162Z"></path>
              </svg>
            </button>
            <button 
              onClick={() => handleShare('pinterest')}
              className="text-neutral-500 hover:text-red-600 transition-colors"
              aria-label="Share on Pinterest"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.04 21.54C10 21.83 10.97 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38647 21.2388 8.17317C20.7362 6.95987 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6135 2.25866 13.3132 2 12 2C10.6868 2 9.38647 2.25866 8.17317 2.7612C6.95987 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 16.25 4.67 19.9 8.44 21.34C8.35 20.56 8.26 19.27 8.44 18.38L9.59 13.44C9.59 13.44 9.3 12.86 9.3 11.94C9.3 10.56 10.16 9.53 11.14 9.53C12 9.53 12.4 10.16 12.4 10.97C12.4 11.83 11.83 13.06 11.54 14.24C11.37 15.22 12.06 16.08 13.06 16.08C14.84 16.08 16.22 14.18 16.22 11.5C16.22 9.1 14.5 7.46 12.03 7.46C9.21 7.46 7.55 9.56 7.55 11.77C7.55 12.63 7.83 13.5 8.29 14.07C8.38 14.13 8.38 14.21 8.35 14.36L8.06 15.45C8.06 15.62 7.95 15.68 7.78 15.56C6.5 15 5.76 13.18 5.76 11.71C5.76 8.55 8 5.68 12.32 5.68C15.76 5.68 18.44 8.15 18.44 11.43C18.44 14.87 16.31 17.63 13.26 17.63C12.29 17.63 11.34 17.11 11 16.5L10.33 18.87C10.1 19.73 9.47 20.88 9.04 21.57V21.54Z"></path>
              </svg>
            </button>
            <button 
              onClick={() => handleShare('linkedin')}
              className="text-neutral-500 hover:text-blue-700 transition-colors"
              aria-label="Share on LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z"></path>
                <path d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z"></path>
                <path d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13.5V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V13.5C19 9 13 9.00001 11 12V10C11 9.44772 10.5523 9 10 9H9C8.44771 9 8 9.44772 8 10V18C8 18.5523 8.44771 19 9 19H10C10.5523 19 11 18.5523 11 18V13.5" strokeWidth="1"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {image && (
        <div className="w-full mx-auto mb-12 max-w-5xl overflow-hidden">
          <Image
            data={image}
            className="w-full h-auto object-cover"
            sizes="(min-width: 1024px) 80vw, 90vw"
            loading="eager"
            alt={image.altText || title}
          />
        </div>
      )}
      
      <article className="max-w-3xl mx-auto px-4 mb-20">
        <div
          dangerouslySetInnerHTML={{__html: contentHtml}}
          className="article prose prose-rose prose-lg max-w-none mx-auto brand-body"
        />
        
        {/* Author bio section */}
        <div className="mt-16 pt-8 border-t border-neutral-200 bg-neutral-50 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
              <span className="text-xl font-serif">{author?.name?.[0] || 'C'}</span>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">{author?.name || 'care•atin team'}</h3>
              <p className="text-neutral-600 mb-4">
                Our team combines expertise in dermatology, trichology, and hair science to provide you with evidence-based content about hair health and red light therapy.
              </p>
            </div>
          </div>
        </div>
        
        {/* Call to action */}
        <div className="mt-16 bg-rose-50 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-medium mb-4 lowercase brand-heading">ready to transform your hair?</h3>
          <p className="mb-6 max-w-xl mx-auto">Experience the benefits of red light therapy for yourself with our clinically proven devices.</p>
          <Link to="/collections/all" className="inline-block bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition-colors">shop our products</Link>
        </div>
      </article>
      
      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <Section className="bg-neutral-50 py-20">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-medium mb-12 text-center brand-heading lowercase">you might also enjoy</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <Link key={relatedArticle.id} to={`/journal/${relatedArticle.handle}`} className="group">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    {relatedArticle.image && (
                      <div className="aspect-video overflow-hidden">
                        <Image
                          data={relatedArticle.image}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          sizes="(min-width: 768px) 30vw, 90vw"
                          alt={relatedArticle.image.altText || relatedArticle.title}
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h3 className="text-lg font-medium mb-2 group-hover:text-rose-500 transition-colors brand-heading">{relatedArticle.title}</h3>
                      <span className="text-sm text-neutral-500 brand-body">{relatedArticle.publishedAt}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}
    </>
  );
}

const ARTICLE_QUERY = `#graphql
  query ArticleDetails(
    $language: LanguageCode
    $blogHandle: String!
    $articleHandle: String!
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        id
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }
`;

const BLOG_ARTICLES_QUERY = `#graphql
  query BlogArticles(
    $language: LanguageCode
    $blogHandle: String!
    $pageBy: Int!
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      articles(first: $pageBy) {
        edges {
          node {
            id
            title
            handle
            publishedAt
            image {
              id
              altText
              url
              width
              height
            }
          }
        }
      }
    }
  }
`;
