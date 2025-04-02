import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';
import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.stone[800],
        contrast: colors.stone[50],
        accent: colors.stone[900],
        brand: colors.rose[100],
        'red-light-accent': colors.red[600],
        notice: 'rgb(var(--color-accent) / <alpha-value>)',
        shopPay: 'rgb(var(--color-shop-pay) / <alpha-value>)',
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
      },
      animation: {
        shimmer: 'shimmer var(--shimmer-duration) cubic-bezier(0, 0, 0.12, 1) infinite',
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
              fontFamily: theme('fontFamily.sans').join(', '),
              fontWeight: '600',
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
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"IBMPlexSerif"', 'Palatino', 'ui-serif'],
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
      boxShadow: {
        border: 'inset 0px 0px 0px 1px rgb(var(--color-primary) / 0.08)',
        darkHeader: 'inset 0px -1px 0px 0px rgba(21, 21, 21, 0.4)',
        lightHeader: 'inset 0px -1px 0px 0px rgba(21, 21, 21, 0.05)',
      },
    },
  },
  plugins: [formsPlugin, typographyPlugin],
};
