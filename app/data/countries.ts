export type I18nLocale = {
  language: string;
  country: string;
  label: string;
  currency: string;
};

// Define the dictionary of countries and their attributes
export const countries: Record<string, I18nLocale> = {
  '/': {
    language: 'EN',
    country: 'US',
    label: 'United States (USD $)',
    currency: 'USD',
  },
  '/en-us': {
    language: 'EN',
    country: 'US',
    label: 'United States (USD $)',
    currency: 'USD',
  },
  '/en-ca': {
    language: 'EN',
    country: 'CA',
    label: 'Canada (CAD $)',
    currency: 'CAD',
  },
  '/fr-ca': {
    language: 'FR',
    country: 'CA',
    label: 'Canada (CAD $)',
    currency: 'CAD',
  },
  '/en-au': {
    language: 'EN',
    country: 'AU',
    label: 'Australia (AUD $)',
    currency: 'AUD',
  },
  '/en-gb': {
    language: 'EN',
    country: 'GB',
    label: 'United Kingdom (GBP £)',
    currency: 'GBP',
  },
};

// Initialize the default locale (US)
countries.default = countries['/'];
