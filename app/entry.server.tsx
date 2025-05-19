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
      'style-src': [
        "'self'",
        "'unsafe-inline'",
        "https://cdn.shopify.com",
        "http://localhost:*",
        "https://fonts.googleapis.com",
      ],
      'font-src': [
        "'self'",
        "https://fonts.gstatic.com",
        "https://cdn.shopify.com",
      ],
      'img-src': [
        "'self'",
        "data:",
        "https://cdn.shopify.com",
        "https://shopify.com",
        "http://localhost:*",
      ],
      // Default script-src, connect-src, etc., from createContentSecurityPolicy
      // will be retained unless explicitly overridden here.
    }
  });

  // The manual header manipulation previously here is no longer needed.

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
