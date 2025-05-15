import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

// Use standard module paths instead of node: prefixes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve a simple HTML page for testing
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Temporary Home Page</title>
      <style>
        body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; }
        .container { background-color: #f9f9f9; border-radius: 8px; padding: 2rem; }
        h1 { color: #333; }
        .message { background-color: #e6f7ff; border-left: 4px solid #1890ff; padding: 1rem; margin: 1rem 0; }
      </style>
      <script type="text/javascript">
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "rhpnn7b8cz");
      </script>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-KH4FC8SN8F"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-KH4FC8SN8F');
      </script>
    </head>
    <body>
      <div class="container">
        <h1>care•atin | The Science of Shine</h1>
        <div class="message">
          <p>We're currently upgrading our website. Please check back soon!</p>
        </div>
        <p>Discover care•atin's innovative approach to hair care, combining red light therapy and science for healthier, stronger hair.</p>
      </div>
    </body>
    </html>
  `);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 