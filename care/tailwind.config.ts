import type {Config} from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F9F5F2',
          100: '#F3EAE4',
          200: '#E6D5C9',
          300: '#D9C0AE',
          400: '#D1B5A0',
          500: '#C49B7C', // Brand primary color
          600: '#A57C5E', // Darker variant
          700: '#8C684E',
          800: '#73553F',
          900: '#5A4230',
        },
        secondary: {
          50: '#F3F5F5',
          100: '#E7EBEB',
          200: '#CFD6D7',
          300: '#B7C2C3',
          400: '#A0ADAF',
          500: '#94A3A4', // Secondary sage
          600: '#7A8B8C', // Tech accent
          700: '#657273',
          800: '#50595A',
          900: '#3B4041',
        },
        brand: {
          light: '#F3E8E1',  // Brand light color
          ritual: '#E6D7CF', // Brand ritual color
        },
        // Clean girl color palette
        stone: {
          25: '#FCFCFB',
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },
        rose: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#F43F5E',
        },
        amber: {
          25: '#FFFEF7',
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        'extralight': '200',
        'light': '300',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        '3xl': '2rem',
        '4xl': '2.5rem',
        '5xl': '3rem',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'gentle': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#4D4D4D',
            a: {
              color: '#C49B7C',
              '&:hover': {
                color: '#A57C5E',
              },
            },
            h1: {
              fontFamily: 'Manrope, ui-sans-serif, system-ui, sans-serif',
              color: '#2D2D2D',
            },
            h2: {
              fontFamily: 'Manrope, ui-sans-serif, system-ui, sans-serif',
              color: '#2D2D2D',
            },
            h3: {
              fontFamily: 'Manrope, ui-sans-serif, system-ui, sans-serif',
              color: '#2D2D2D',
            },
            h4: {
              fontFamily: 'Manrope, ui-sans-serif, system-ui, sans-serif',
              color: '#2D2D2D',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
