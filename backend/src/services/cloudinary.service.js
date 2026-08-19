import { v2 as cloudinary } from 'cloudinary';
import { config } from '../../config/env.js';

// Configure Cloudinary instance
if (config.cloudinary.url) {
  cloudinary.config({
    cloudinary_url: config.cloudinary.url,
  });
} else if (config.cloudinary.cloudName && config.cloudinary.apiKey && config.cloudinary.apiSecret) {
  cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
    secure: true,
  });
} else {
  // Default fallback configuration
  cloudinary.config({
    cloud_name: 'rahnoxa-cdn',
    secure: true,
  });
}

/**
 * Upload a local file buffer or data URI to Cloudinary
 * @param {string|Buffer} file - File buffer, base64 data URI, or remote image URL
 * @param {Object} options - Cloudinary upload options (folder, tags, transformations)
 * @returns {Promise<Object>} Upload result containing secure_url, public_id, etc.
 */
export async function uploadToCloudinary(file, options = {}) {
  const uploadOptions = {
    folder: options.folder || 'rahnoxa/projects',
    resource_type: options.resource_type || 'auto',
    transformation: options.transformation || [
      { quality: 'auto', fetch_format: 'auto' },
    ],
    ...options,
  };

  return new Promise((resolve, reject) => {
    if (typeof file === 'string' && (file.startsWith('http://') || file.startsWith('https://') || file.startsWith('data:'))) {
      cloudinary.uploader.upload(file, uploadOptions, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    } else if (Buffer.isBuffer(file)) {
      const uploadStream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      uploadStream.end(file);
    } else {
      reject(new Error('Invalid file format for Cloudinary upload'));
    }
  });
}

/**
 * Generate an optimized Cloudinary delivery URL with auto-format and auto-quality
 * @param {string} publicIdOrUrl - Cloudinary public ID or existing URL
 * @param {Object} transformations - Image width, height, crop mode
 * @returns {string} Optimized CDN URL
 */
export function getOptimizedImageUrl(publicIdOrUrl, transformations = {}) {
  if (!publicIdOrUrl) return 'https://res.cloudinary.com/demo/image/upload/v1/sample.jpg';
  
  if (publicIdOrUrl.includes('cloudinary.com')) {
    return publicIdOrUrl;
  }

  return cloudinary.url(publicIdOrUrl, {
    quality: 'auto',
    fetch_format: 'auto',
    crop: transformations.crop || 'fill',
    width: transformations.width,
    height: transformations.height,
    secure: true,
  });
}

export default cloudinary;
