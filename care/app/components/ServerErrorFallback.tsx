import React from 'react';

interface ServerErrorProps {
  status?: number;
  message?: string;
  stack?: string;
}

/**
 * A simple error fallback component used when server-side errors occur.
 * This component doesn't rely on any router hooks or context,
 * making it safe to use during server rendering errors.
 * 
 * IMPORTANT: This component must not use any Remix or React Router components or hooks.
 */
export function ServerErrorFallback({ 
  status = 500, 
  message = 'An unexpected error occurred', 
  stack 
}: ServerErrorProps) {
  const isDev = process.env.NODE_ENV === 'development';
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/fonts/fonts.css" />
        <title>Error {status} - Care-atin</title>
        <style dangerouslySetInnerHTML={{ __html: `
          body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.5;
            margin: 0;
            padding: 0;
          }
          .container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          header {
            background-color: white;
            border-bottom: 1px solid #e5e7eb;
            padding: 1rem;
          }
          header h1 {
            font-size: 1.25rem;
            font-weight: bold;
            margin: 0;
          }
          main {
            flex-grow: 1;
            padding: 2rem 1rem;
          }
          .error-box {
            background-color: white;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            margin: 0 auto;
            max-width: 32rem;
            padding: 2rem;
          }
          h2 {
            color: #dc2626;
            font-size: 1.5rem;
            margin-top: 0;
          }
          .home-link {
            background-color: #2563eb;
            border-radius: 0.25rem;
            color: white;
            display: inline-block;
            font-weight: 500;
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            text-decoration: none;
          }
          .home-link:hover {
            background-color: #1d4ed8;
          }
          footer {
            background-color: #f3f4f6;
            border-top: 1px solid #e5e7eb;
            padding: 1rem;
            text-align: center;
          }
          .stack-trace {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 0.25rem;
            color: #334155;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            font-size: 0.875rem;
            line-height: 1.7;
            margin-top: 1.5rem;
            overflow-x: auto;
            padding: 1rem;
            white-space: pre-wrap;
          }
        `}} />
      </head>
      <body>
        <div className="container">
          <header>
            <h1>Care-atin</h1>
          </header>
          <main>
            <div className="error-box">
              <h2>{status === 404 ? 'Page Not Found' : 'Server Error'}</h2>
              <p>{message}</p>
              {isDev && stack && (
                <div className="stack-trace">{stack}</div>
              )}
              <a className="home-link" href="/">Back to Home</a>
            </div>
          </main>
          <footer>
            &copy; {new Date().getFullYear()} Care-atin
          </footer>
        </div>
      </body>
    </html>
  );
}

export default ServerErrorFallback; 