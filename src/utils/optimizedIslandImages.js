import { islandImages } from './IslandImages';
import { getOptimizedImageUrl } from './imageOptimization';

/**
 * Creates optimized versions of the island images for different display sizes
 * @param {Object} options - Options for optimization
 * @returns {Object} - Object with optimized image URLs
 */
export const getOptimizedIslandImages = (options = {}) => {
  const { 
    deviceType = 'desktop', // 'mobile', 'tablet', or 'desktop'
    quality = 85,
    cacheBust = false
  } = options;
  
  // Determine width based on device type
  let width;
  switch (deviceType) {
    case 'mobile':
      width = 640;
      break;
    case 'tablet':
      width = 1024;
      break;
    case 'desktop':
    default:
      width = 1600;
      break;
  }
  
  // Create a new object with optimized URLs
  const optimizedImages = {};
  
  // Process each image
  Object.entries(islandImages).forEach(([key, url]) => {
    const optimizedUrl = getOptimizedImageUrl(url, { width, quality });
    
    // Add cache busting if needed (helps prevent caching issues during development)
    const finalUrl = cacheBust 
      ? `${optimizedUrl}${optimizedUrl.includes('?') ? '&' : '?'}cb=${Date.now()}` 
      : optimizedUrl;
      
    optimizedImages[key] = finalUrl;
  });
  
  return optimizedImages;
};

/**
 * Get the device type based on window width
 * @returns {string} - 'mobile', 'tablet', or 'desktop'
 */
export const getDeviceType = () => {
  if (typeof window === 'undefined') return 'desktop'; // Default to desktop for SSR
  
  const width = window.innerWidth;
  
  if (width < 768) return 'mobile';
  if (width < 1280) return 'tablet';
  return 'desktop';
};

/**
 * Get optimized island images for the current device
 * @param {Object} options - Additional options
 * @returns {Object} - Optimized island images
 */
export const getResponsiveIslandImages = (options = {}) => {
  const deviceType = getDeviceType();
  return getOptimizedIslandImages({ deviceType, ...options });
}; 