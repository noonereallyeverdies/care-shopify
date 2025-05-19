import { defineConfig } from 'vite';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        require('postcss-import'),
        require('tailwindcss/nesting'), // The nesting plugin for tailwindcss
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  plugins: [
    tailwindcss(),
  ],
});
