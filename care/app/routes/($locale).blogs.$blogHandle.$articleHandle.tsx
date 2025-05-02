import { json, type LoaderFunctionArgs, type MetaArgs } from '@shopify/remix-oxygen';
import { useLoaderData } from '@remix-run/react';
import { getSeoMeta, flattenConnection, Image } from '@shopify/hydrogen';
import invariant from 'tiny-invariant';
import { PageHeader, Section } from '~/components/Text';
import { seoPayload } from '~/lib/seo.server';
import { routeHeaders } from '~/data/cache';

export const headers = routeHeaders;

// --- Loader ---
export async function loader({ params, context }: LoaderFunctionArgs) {
  const { language, country } = context.storefront.i18n;
  const { blogHandle, articleHandle } = params;

  invariant(blogHandle, 'Missing blog handle');
  invariant(articleHandle, 'Missing article handle');

  const { blog } = await context.storefront.query(ARTICLE_QUERY, {
    variables: {
      blogHandle,
      articleHandle,
      language,
    },
  });

  if (!blog?.articleByHandle) {
    throw new Response(null, { status: 404 });
  }

  const article = blog.articleByHandle;

  const formattedDate = new Intl.DateTimeFormat(`${language}-${country}`, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt));

  const seo = seoPayload.article({ article, url: request.url });

  return json({
    article,
    formattedDate,
    seo,
  });
}

// --- Meta ---
export const meta = ({ data }: MetaArgs<typeof loader>) => {
  return getSeoMeta(data.seo);
};

// --- Default Component ---
export default function Article() {
  const { article, formattedDate } = useLoaderData<typeof loader>();
  const { title, image, contentHtml, author } = article;

  return (
    <>
      <PageHeader heading={title} className="text-center py-8 md:py-12" />
      <Section as="article" className="py-8">
        <div className="max-w-3xl mx-auto px-4">
          {/* Optional: Author and Date */} 
          <div className="text-center text-sm text-primary/60 mb-6">
            <span>Published {formattedDate}</span>
            {author?.name && <span> by {author.name}</span>}
          </div>
          
          {image && (
            <Image
              data={image}
              className="w-full mx-auto mb-8 rounded-lg shadow-md aspect-video object-cover"
              sizes="(min-width: 1024px) 80vw, 100vw"
              loading="eager"
            />
          )}
          <div
            dangerouslySetInnerHTML={{ __html: contentHtml }}
            className="prose prose-lg max-w-none mx-auto text-primary/80 leading-relaxed"
          />
        </div>
      </Section>
    </>
  );
}

// --- GraphQL Query ---
const ARTICLE_QUERY = `#graphql
  query ArticleDetails(
    $language: LanguageCode
    $blogHandle: String!
    $articleHandle: String!
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
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