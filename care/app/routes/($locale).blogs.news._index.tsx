import {
  defer,
  type LoaderFunctionArgs,
  type MetaArgs
} from '@shopify/remix-oxygen';
import { useLoaderData, Await } from '@remix-run/react';
import {flattenConnection, getSeoMeta, Image} from '@shopify/hydrogen';
import { Suspense } from 'react';
import invariant from 'tiny-invariant';

import {PageHeader, Section} from '~/components/Text';
import {Link} from '~/components/Link';
import {Grid} from '~/components/Grid';
import {getImageLoadingPriority, PAGINATION_SIZE} from '~/lib/const';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import type {ArticleFragment} from 'storefrontapi.generated';
import { Card, CardContent, CardImage } from '~/components/ui/layouts/Card';
import { Link as RouterLink } from 'react-router-dom';

const BLOG_HANDLE = 'news';

export const headers = routeHeaders;

// --- Loader Function ---
export async function loader({ request, context, params }: LoaderFunctionArgs) {
  const { storefront } = context;
  const { blogHandle } = params; // Get blog handle from params if needed, otherwise use constant
  
  invariant(BLOG_HANDLE, 'Missing blog handle');

  const { blog } = await storefront.query(BLOGS_QUERY, {
    variables: {
      blogHandle: BLOG_HANDLE,
      pageBy: PAGINATION_SIZE,
      language: storefront.i18n.language,
    },
  });

  if (!blog?.articles) {
    throw new Response('Not found', { status: 404 });
  }

  const articles = flattenConnection(blog.articles);

  const seo = seoPayload.blog({ blog, url: request.url });

  return defer({ articles, seo });
}

// --- Meta Function ---
export const meta = ({ data }: MetaArgs<typeof loader>) => {
  // Truncate description
  let description = data?.seo?.description || '';
  if (description.length > 155) {
    description = description.substring(0, 152) + '...'; 
  }
  
  return getSeoMeta({ 
    ...data?.seo, 
    description // Use the truncated description
  });
};

// --- Default Component ---
export default function BlogIndex() {
  const { articles } = useLoaderData<typeof loader>();

  return (
    <>
      <PageHeader heading={BLOG_HANDLE} className="capitalize text-center py-8 bg-neutral-100" />
      <Section as="div" className="py-12">
        <Grid as="ol" layout="blog" className="gap-8">
          {articles.map((article, i) => (
            <ArticleCard
              blogHandle={BLOG_HANDLE}
              article={article as ArticleFragment}
              key={article.id}
              loading={getImageLoadingPriority(i, 2)}
            />
          ))}
        </Grid>
      </Section>
    </>
  );
}

// --- ArticleCard Component ---
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
    // Use Remix Link component here
    <Card as={Link} to={`/blogs/${blogHandle}/${article.handle}`} className="hover:shadow-lg transition-shadow duration-300 block">
      {article.image && (
        <CardImage className="aspect-[3/2]">
          {/* Use Hydrogen Image component for optimization */}
          <Image
            data={article.image}
            alt={article.image.altText || `Image for ${article.title}`}
            loading={loading}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="w-full h-full object-cover"
          />
        </CardImage>
      )}
      <CardContent className="p-4">
        <h3 className="text-2xl font-medium mb-3 hover:text-rose-500 transition-colors brand-heading">
          {article.title}
        </h3>
        {/* Optional: Add excerpt or published date */}
        {/* {article.excerpt && <p className="text-primary/70 text-sm">{article.excerpt}</p>} */}
      </CardContent>
    </Card>
  );
}

// --- GraphQL Query ---
const ARTICLE_ITEM_FRAGMENT = `#graphql
  fragment ArticleItem on Article {
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
    blog {
      handle
    }
  }
`;

const BLOGS_QUERY = `#graphql
  query BlogIndexQuery(
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
        nodes {
          ...ArticleItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
  ${ARTICLE_ITEM_FRAGMENT}
`; 