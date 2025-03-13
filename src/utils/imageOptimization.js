/**
 * Image Optimization Utilities
 * 
 * This file contains utilities to optimize images for better performance.
 */

/**
 * Creates a low-quality placeholder version of an image and returns a Promise that resolves with the data URL
 * This is useful for showing a blurred version while the full image loads
 * 
 * @param {string} src - The source URL of the image
 * @param {number} width - The width to resize the image to (default: 20)
 * @returns {Promise<string>} - A Promise that resolves with the data URL of the blurred image
 */
export const createImagePlaceholder = (src, width = 20) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Calculate height to maintain aspect ratio
      const aspectRatio = img.width / img.height;
      const height = Math.floor(width / aspectRatio);
      
      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;
      
      // Draw the image at a smaller size
      ctx.drawImage(img, 0, 0, width, height);
      
      // Get the data URL
      try {
        const dataURL = canvas.toDataURL('image/jpeg', 0.1);
        resolve(dataURL);
      } catch (err) {
        // If CORS issues prevent from creating a data URL, just resolve with original
        resolve(src);
      }
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
  });
};

/**
 * Preloads an array of images and tracks their loading status
 * 
 * @param {Array<string>} imageUrls - Array of image URLs to preload
 * @param {Function} onProgress - Callback function that receives the loading progress (0-100)
 * @param {Function} onComplete - Callback function called when all images are loaded
 * @returns {Promise<Array<HTMLImageElement>>} - Promise that resolves with array of loaded image elements
 */
export const preloadImages = (imageUrls, onProgress, onComplete) => {
  let loadedCount = 0;
  const totalImages = imageUrls.length;
  const loadedImages = [];

  return new Promise((resolve) => {
    if (!imageUrls.length) {
      onComplete && onComplete([]);
      resolve([]);
      return;
    }

    imageUrls.forEach((url, index) => {
      const img = new Image();
      img.src = url;
      
      img.onload = img.onerror = () => {
        loadedCount++;
        loadedImages[index] = img;
        
        // Calculate progress percentage
        const progress = Math.round((loadedCount / totalImages) * 100);
        onProgress && onProgress(progress);
        
        if (loadedCount === totalImages) {
          onComplete && onComplete(loadedImages);
          resolve(loadedImages);
        }
      };
    });
  });
};

/**
 * Creates an optimized version of an image URL with responsive parameters
 * 
 * @param {string} url - The original image URL
 * @param {Object} options - Options for optimization
 * @param {number} options.width - The desired width
 * @param {number} options.quality - The desired quality (0-100)
 * @returns {string} - The optimized image URL
 */
export const getOptimizedImageUrl = (url, options = {}) => {
  const { width = 800, quality = 80 } = options;
  
  // For images hosted on platforms with image optimization APIs like Cloudinary or Imgix,
  // you would modify the URL here to include their optimization parameters
  
  // For now, we'll just return the original URL since we don't have a 
  // backend image optimization service integrated
  return url;
}; 