import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';
import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',  // All app files
    './components/**/*.{js,ts,jsx,tsx}', // All component files
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519',
        },
        contrast: 'rgb(var(--color-contrast) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        brand: 'rgb(var(--color-brand) / <alpha-value>)',
        notice: 'rgb(var(--color-accent) / <alpha-value>)',
        shopPay: 'rgb(var(--color-shop-pay) / <alpha-value>)',
        stone: {
          50: '#faf9f7',
          100: '#f5f4f1',
          200: '#ebeae6',
          300: '#dbd9d3',
          400: '#adaba7',
          500: '#8e8c88',
          600: '#6e6c68',
          700: '#504f4c',
          800: '#343331',
          900: '#1a1918',
        },
        rose: {
          50: '#fff6f9',
          100: '#ffedf2',
          200: '#ffd6e2',
          300: '#ffb0ca',
          400: '#ff89b1',
          500: '#f95d94',
          600: '#e93a79',
          700: '#cf1f5d',
          800: '#9f1a4c',
          900: '#7d193e',
        },
      },
      keyframes: {
        shimmer: {
          '0%': {
            transform: 'translate(-50%, -50%) scale(0)',
            opacity: '0.25',
          },
          '50%': {
            transform: 'translate(150%, 150%) scale(1)',
            opacity: '0.5',
          },
          '100%': {
            transform: 'translate(350%, 350%) scale(0)',
            opacity: '0.25',
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        }
      },
      animation: {
        shimmer: 'shimmer var(--shimmer-duration) cubic-bezier(0, 0, 0.12, 1) infinite',
        fadeIn: 'fadeIn 0.5s ease-out',
        slideUp: 'slideUp 0.5s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        breathe: 'breathe 15s ease-in-out infinite',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.primary / 80%'),
            '--tw-prose-headings': theme('colors.primary'),
            '--tw-prose-lead': theme('colors.primary / 80%'),
            '--tw-prose-links': theme('colors.primary'),
            '--tw-prose-bold': theme('colors.primary'),
            '--tw-prose-counters': theme('colors.primary / 60%'),
            '--tw-prose-bullets': theme('colors.primary / 40%'),
            '--tw-prose-hr': theme('colors.primary / 10%'),
            '--tw-prose-quotes': theme('colors.primary'),
            '--tw-prose-quote-borders': theme('colors.primary / 20%'),
            '--tw-prose-captions': theme('colors.primary / 60%'),
            '--tw-prose-code': theme('colors.primary'),
            '--tw-prose-pre-code': theme('colors.stone[200]'),
            '--tw-prose-pre-bg': theme('colors.primary'),
            '--tw-prose-th-borders': theme('colors.primary / 20%'),
            '--tw-prose-td-borders': theme('colors.primary / 10%'),
            a: {
              textDecoration: 'underline',
              fontWeight: '400',
            },
            'h1, h2, h3, h4': {
              fontFamily: theme('fontFamily.serif').join(', '),
              fontWeight: '400',
            },
            p: {
              fontFamily: theme('fontFamily.sans').join(', '),
            },
          },
        },
      }),
      screens: {
        sm: '32em',
        md: '48em',
        lg: '64em',
        xl: '80em',
        '2xl': '96em',
        'sm-max': {max: '48em'},
        'sm-only': {min: '32em', max: '48em'},
        'md-only': {min: '48em', max: '64em'},
        'lg-only': {min: '64em', max: '80em'},
        'xl-only': {min: '80em', max: '96em'},
        '2xl-only': {min: '96em'},
      },
      spacing: {
        nav: 'var(--height-nav)',
        screen: 'var(--screen-height, 100vh)',
      },
      height: {
        screen: 'var(--screen-height, 100vh)',
        'screen-no-nav':
          'calc(var(--screen-height, 100vh) - var(--height-nav))',
        'screen-dynamic': 'var(--screen-height-dynamic, 100vh)',
      },
      width: {
        mobileGallery: 'calc(100vw - 3rem)',
      },
      fontFamily: {
        sans: ['Montserrat', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'ui-serif', 'Georgia', 'Cambria', 'serif'],
      },
      fontSize: {
        display: ['var(--font-size-display)', '1.1'],
        heading: ['var(--font-size-heading)', '1.25'],
        lead: ['var(--font-size-lead)', '1.333'],
        copy: ['var(--font-size-copy)', '1.5'],
        fine: ['var(--font-size-fine)', '1.333'],
      },
      maxWidth: {
        'prose-narrow': '45ch',
        'prose-wide': '80ch',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'apple-sm': '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
        'apple-md': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'apple-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'apple-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
        'apple-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        'glossier': '0 4px 20px rgba(0, 0, 0, 0.08)',
        border: 'inset 0px 0px 0px 1px rgb(var(--color-primary) / 0.08)',
        darkHeader: 'inset 0px -1px 0px 0px rgba(21, 21, 21, 0.08)',
        lightHeader: 'inset 0px -1px 0px 0px rgba(21, 21, 21, 0.03)',
        premium: '0 20px 50px -12px rgba(212, 98, 124, 0.15)',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [formsPlugin, typographyPlugin],
  // Important performance optimizations
  future: {
    hoverOnlyWhenSupported: true, // Better performance on mobile
    disableColorOpacityUtilitiesByDefault: true, // Reduce CSS size
  },
  // Aggressively purge unused tailwind styles
  safelist: [],
};
