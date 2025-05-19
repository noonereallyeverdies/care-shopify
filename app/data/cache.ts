export const CACHE_SHORT = {
  'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
};

export const CACHE_MEDIUM = {
  'Cache-Control': 'public, max-age=600, stale-while-revalidate=1200',
};

export const CACHE_LONG = {
  'Cache-Control': 'public, max-age=3600, stale-while-revalidate=7200',
};

export const CACHE_NONE = {
  'Cache-Control': 'no-store',
};

export const routeHeaders = {
  ...CACHE_SHORT,
};