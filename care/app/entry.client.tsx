import { RemixBrowser } from '@remix-run/react';
import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

function hydrate() {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
}

if (typeof window !== 'undefined') {
  if (window.requestIdleCallback) {
    window.requestIdleCallback(hydrate);
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(hydrate, 1);
  }
}
