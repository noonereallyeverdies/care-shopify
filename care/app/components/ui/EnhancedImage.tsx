import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface EnhancedImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  // Framer Motion props
  initial?: any;
  animate?: any;
  transition?: any;
  whileHover?: any;
  whileTap?: any;
}

/**
 * Enhanced Image Component with robust error handling and fallback system
 * Prevents 404 errors and ensures visual consistency across the app
 */
export function EnhancedImage({
  src,
  alt,
  fallbackSrc = '/images/PRODUCTPHOTOT.webp', // Default fallback
  className = '',
  style,
  loading = 'lazy',
  onError,
  onLoad,
  initial,
  animate,
  transition,
  whileHover,
  whileTap,
  ...props
}: EnhancedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Reset state when src changes
  useEffect(() => {
    setImageSrc(src);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    if (!hasError) {
      console.warn(`Image failed to load: ${imageSrc}, falling back to: ${fallbackSrc}`);
      setImageSrc(fallbackSrc);
      setHasError(true);
    }
    
    if (onError) {
      onError(event);
    }
  };

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    if (onLoad) {
      onLoad(event);
    }
  };

  // Common image props
  const imageProps = {
    ref: imgRef,
    src: imageSrc,
    alt,
    className: `${className} ${isLoading ? 'opacity-75' : 'opacity-100'} transition-opacity`,
    style,
    loading,
    onError: handleError,
    onLoad: handleLoad,
    ...props,
  };

  // Return motion image if animation props are provided
  if (initial || animate || transition || whileHover || whileTap) {
    return (
      <motion.img
        {...imageProps}
        initial={initial}
        animate={animate}
        transition={transition}
        whileHover={whileHover}
        whileTap={whileTap}
      />
    );
  }

  // Return regular image
  return <img {...imageProps} />;
}