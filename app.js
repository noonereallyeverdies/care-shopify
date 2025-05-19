import express from 'express';
import { createRequestHandler } from '@shopify/remix-oxygen';
import { createReadableStreamFromReadable } from '@remix-run/node';

const app = express();
const port = process.env.PORT || 4000;

// Serve static files
app.use(express.static('public'));

// Handle API requests and rendering
app.all('*', async (req, res) => {
  try {
    const env = {
      SESSION_SECRET: '1234',
      PUBLIC_STOREFRONT_API_TOKEN: process.env.PUBLIC_STOREFRONT_API_TOKEN || 'your-storefront-api-token',
      PRIVATE_STOREFRONT_API_TOKEN: process.env.PRIVATE_STOREFRONT_API_TOKEN || 'your-private-storefront-api-token',
      PUBLIC_STORE_DOMAIN: process.env.PUBLIC_STORE_DOMAIN || 'your-store.myshopify.com',
    };

    // Create a Remix request handler
    const handleRequest = createRequestHandler({
      build: await import('./build/index.js'),
      mode: process.env.NODE_ENV,
      getLoadContext: () => ({ env }),
    });

    // Handle the request
    const response = await handleRequest(
      new Request(`http://${req.headers.host}${req.url}`, {
        method: req.method,
        headers: new Headers(req.headers),
        body: req.method !== 'GET' && req.method !== 'HEAD' ? createReadableStreamFromReadable(req) : undefined,
      }),
      { env }
    );

    // Set headers
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }

    // Set status code
    res.status(response.status);

    // Stream the response body
    if (response.body) {
      response.body.pipe(res);
    } else {
      res.end();
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 