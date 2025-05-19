import type {EntryContext, AppLoadContext} from '@shopify/remix-oxygen';
import {RemixServer} from '@remix-run/react';
import {isbot} from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  context: AppLoadContext,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
    directives: {
      styleSrc: [
        "'self'",
        "'unsafe-inline'", // Required for certain dynamic styles and dev environments
        "https://cdn.shopify.com",
        "http://localhost:*", // For local development
        "https://fonts.googleapis.com",
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com",
        "https://cdn.shopify.com",
      ],
      imgSrc: [
        "'self'",
        "data:",
        "https://cdn.shopify.com",
        "https://shopify.com",
        "http://localhost:*", // For local development assets
      ],
      // Retain default script-src, connect-src, etc., from createContentSecurityPolicy
      // by not explicitly overriding them unless necessary.
    }
  });

  // The manual header manipulation below is no longer needed as directives are set above
  // const headerParts = originalHeader.split(';');
  // const imgSrcDirective = "img-src 'self' data: https://cdn.shopify.com https://shopify.com http://localhost:*";
  // const header = [...headerParts, imgSrcDirective].join(';');

  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} nonce={nonce} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
