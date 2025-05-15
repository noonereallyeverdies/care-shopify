import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Handles missing class error
 */
export function missingClass(string?: string, prefix?: string) {
  if (!string) return '';
  const prefixed = prefix ? `${prefix}${string}` : string;
  const classes = prefixed.replace(/\s+/g, ' ').trim().split(' ');
  return classes.join(' ');
}

/**
 * Formats text content
 */
export function formatText(input?: string | null): string {
  if (!input) return '';
  return input.trim();
}

/**
 * Gets input style classes
 */
export function getInputStyleClasses(errors?: string | null): string {
  return errors
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';
}

/**
 * Status message utility
 */
export function statusMessage(status: string): string {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'Order is being processed';
    case 'shipped':
      return 'Order has been shipped';
    case 'delivered':
      return 'Order delivered successfully';
    case 'cancelled':
      return 'Order has been cancelled';
    default:
      return status;
  }
}

/**
 * Parses currency values
 */
export function parseAsCurrency(value: any): string {
  if (!value) return '$0.00';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
}

/**
 * Checks if path is local
 */
export function isLocalPath(path: string): boolean {
  try {
    new URL(path);
    return false;
  } catch (e) {
    return !path.startsWith('http');
  }
}

/**
 * Gets excerpt from text
 */
export function getExcerpt(text: string, wordLimit: number = 30): string {
  if (!text) return '';
  const words = text.split(' ');
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
}

/**
 * Check if current path is home path (client-side only)
 */
export function isHomePath() {
  if (typeof window === 'undefined') return false;
  return window.location.pathname === '/';
}

/**
 * Prefix path with locale
 */
export function prefixPathWithLocale(path: string, locale?: string) {
  if (locale && locale !== 'en') {
    return `/${locale}${path}`;
  }
  return path;
}

// Default locale configuration
export const DEFAULT_LOCALE = {
  language: 'EN',
  country: 'US',
};

// Parse menu utility
export function parseMenu(menu: any, storeDomain?: string, env?: any) {
  if (!menu) return null;
  
  // Simple menu parser - customize as needed
  return {
    ...menu,
    items: menu.items || [],
  };
}
