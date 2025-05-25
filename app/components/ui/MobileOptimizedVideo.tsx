import React, { useState, useEffect } from 'react';

interface MobileOptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Mobile-optimized video component that removes autoplay on mobile devices
 * and provides better mobile user experience
 */
export function MobileOptimizedVideo({ 
  src, 
  poster, 
  className = '',
  children 
}: MobileOptimizedVideoProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePlayClick = () => {
    const video = document.querySelector('video') as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay={!isMobile} // Only autoplay on desktop
        muted
        loop
        playsInline
        poster={poster}
        preload={isMobile ? "none" : "metadata"}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={src} type="video/mp4" />
        {children}
      </video>
      
      {/* Mobile play button overlay */}
      {isMobile && !isPlaying && (
        <button
          onClick={handlePlayClick}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity hover:bg-opacity-40"
          aria-label="Play video"
        >
          <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-black ml-1" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </button>
      )}
      
      {/* Video controls for mobile when playing */}
      {isMobile && isPlaying && (
        <button
          onClick={handlePlayClick}
          className="absolute bottom-4 right-4 w-10 h-10 bg-black bg-opacity-60 rounded-full flex items-center justify-center"
          aria-label="Pause video"
        >
          <svg 
            className="w-5 h-5 text-white" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        </button>
      )}
    </div>
  );
}
