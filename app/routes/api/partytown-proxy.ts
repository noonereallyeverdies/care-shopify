/**
 * Partytown Proxy Endpoint
 * 
 * This API route serves as a proxy for third-party scripts loaded via Partytown.
 * It helps to avoid CORS issues and provides more control over third-party requests.
 */
import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';

export async function loader({ request, context }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get('url');
  
  if (!targetUrl) {
    return json({ error: 'Missing URL parameter' }, { status: 400 });
  }
  
  try {
    // Validate URL to prevent proxy abuse
    const parsedUrl = new URL(targetUrl);
    const allowedDomains = [
      'google-analytics.com',
      'googletagmanager.com',
      'analytics.google.com',
      'connect.facebook.net',
      'script.hotjar.com',
      'static.hotjar.com',
      'snap.licdn.com',
      'cdn.heapanalytics.com'
      // Add other allowed domains here
    ];
    
    const isDomainAllowed = allowedDomains.some(domain => 
      parsedUrl.hostname.endsWith(domain)
    );
    
    if (!isDomainAllowed) {
      return json(
        { error: 'Domain not allowed' }, 
        { status: 403 }
      );
    }
    
    // Forward the request to the target URL
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' 
        ? await request.blob() 
        : undefined,
    });
    
    // Create a new response with appropriate headers
    const proxyResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
    });
    
    // Copy headers from the original response
    for (const [key, value] of response.headers.entries()) {
      // Avoid security headers that might conflict
      if (!['content-security-policy', 'frame-options'].includes(key.toLowerCase())) {
        proxyResponse.headers.set(key, value);
      }
    }
    
    // Set caching headers for better performance
    proxyResponse.headers.set('Cache-Control', 'public, max-age=3600');
    
    return proxyResponse;
  } catch (error) {
    console.error('Partytown proxy error:', error);
    return json(
      { error: 'Failed to proxy request' }, 
      { status: 500 }
    );
  }
}
