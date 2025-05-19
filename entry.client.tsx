/**
 * This is the entry point for the browser bundle.
 * This file is created as a workaround for importing Node.js modules in the browser.
 */

// Import browser environment setup
import setupBrowserEnvironment from './browser-env.js';

// Set up browser environment first
setupBrowserEnvironment();

// Import the original entry client code
import {RemixBrowser} from '@remix-run/react';
import {startTransition, StrictMode} from 'react';
import {hydrateRoot} from 'react-dom/client';

if (!window.location.origin.includes('webcache.googleusercontent.com')) {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>,
    );
  });
} 