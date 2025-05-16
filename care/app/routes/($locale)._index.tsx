import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';

export async function loader({context}: LoaderFunctionArgs) {
  console.log('[HOMEPAGE LOADER] Minimal diagnostic loader');
  
  return json({
    message: 'Minimal homepage loaded successfully',
    timestamp: Date.now(),
  });
}

export default function Homepage() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Diagnostic Mode Active</h1>
      <p>If you see this, the JSON parsing error is not in the root or homepage loaders.</p>
      <p>The error must be deeper in the MiniOxygen/Vite pipeline.</p>
    </div>
  );
}
