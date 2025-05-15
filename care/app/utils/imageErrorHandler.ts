/**
 * Global image error handler utility
 * Provides fallback images and error handling for the entire app
 */

// Default fallback images by type
export const defaultImages = {
  product: '/images/PRODUCTPHOTOT.webp',
  testimonial: '/images/prettyhair.jpg',
  expert: '/images/scientist-avatar.jpg',
  logo: '/images/badge-dermatologist.svg',
  beforeAfter: '/images/prettyhair.jpg',
  general: '/images/prettyhair.jpg',
} as const;

export type ImageType = keyof typeof defaultImages;

/**
 * Handle image error with appropriate fallback
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement>,
  type: ImageType = 'general'
): void {
  const img = event.currentTarget;
  const currentSrc = img.src;
  const fallbackSrc = defaultImages[type];
  
  // Prevent infinite fallback loops
  if (currentSrc !== fallbackSrc) {
    console.warn(`Image failed to load: ${currentSrc}, using fallback: ${fallbackSrc}`);
    img.src = fallbackSrc;
  } else {
    console.error(`Fallback image also failed: ${fallbackSrc}`);
    img.style.display = 'none';
  }
}

/**
 * Preload critical images to prevent 404s
 */
export function preloadImages(imageUrls: string[]): Promise<void[]> {
  return Promise.all(
    imageUrls.map(url => 
      new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => {
          console.warn(`Failed to preload image: ${url}`);
          resolve(); // Don't reject to avoid breaking the Promise.all
        };
        img.src = url;
      })
    )
  );
}

/**
 * Create image with automatic error handling
 */
export function createImageElement(
  src: string,
  alt: string,
  type: ImageType = 'general'
): HTMLImageElement {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.onerror = (event) => handleImageError(event as any, type);
  return img;
}
