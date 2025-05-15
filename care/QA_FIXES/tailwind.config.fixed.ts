import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // FIXED: Correct path for Tailwind to scan files
    './components/**/*.{js,ts,jsx,tsx}', // In case components are outside app
  ],
  theme: {
    extend: {
      fontSize: {
        'display': ['8rem', { lineHeight: '1' }],
        'heading': ['3.75rem', { lineHeight: '1' }],
        'lead': ['1.875rem', { lineHeight: '1.333' }],
        'copy': ['1.125rem', { lineHeight: '1.5' }],
        'fine': ['0.875rem', { lineHeight: '1.5' }],
      },
      colors: {
        primary: {
          DEFAULT: '#1F2937',
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        contrast: '#FFFFFF',
        notice: '#E11D48',
      },
      keyframes: {
        'background-gradient': {
          '0%, 100%': {
            transform: 'translate(var(--tx-1, 0), var(--ty-1, 0))',
          },
          '25%': {
            transform: 'translate(var(--tx-2, 0), var(--ty-2, 0))',
          },
          '50%': {
            transform: 'translate(var(--tx-3, 0), var(--ty-3, 0))',
          },
          '75%': {
            transform: 'translate(var(--tx-4, 0), var(--ty-4, 0))',
          },
        },
      },
      animation: {
        'background-gradient': 'background-gradient var(--background-gradient-speed, 60s) ease infinite',
      },
    },
  },
  plugins: [
    // Add recommended plugins for better styling
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} satisfies Config;