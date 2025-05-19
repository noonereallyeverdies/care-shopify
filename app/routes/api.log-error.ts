import { json } from '@shopify/remix-oxygen';
import type { ActionFunctionArgs } from '@shopify/remix-oxygen';

/**
 * Server-side error logging endpoint
 * In a production app, this would integrate with services like CloudWatch, 
 * Datadog, Sentry, or a custom logging solution
 */
export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const error = await request.json();
    
    // Log the error to the server logs
    console.error('[Server Error]', error);
    
    // In production, you would send this to your logging service:
    // await sentryClient.captureException(error);
    // or
    // await logToCloudWatch(error);
    
    return json({ success: true });
  } catch (e) {
    console.error('Failed to process error report', e);
    return json({ error: 'Failed to process error' }, { status: 500 });
  }
}

// Default export for Remix
export default function ErrorLoggerRoute() {
  // This route doesn't render anything
  return null;
}
