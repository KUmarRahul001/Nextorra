import { Router } from 'express';
import { uploadMiddleware } from '../../middleware/upload.middleware.js';
import { uploadToCloudinary } from '../../services/cloudinary.service.js';
import { authenticate, authorize } from '../../middleware/auth.middleware.js';

const router = Router();

// POST /v1/upload/image - Upload single image to Cloudinary CDN
router.post(
  '/image',
  authenticate,
  authorize('superadmin', 'admin'),
  uploadMiddleware.single('image'),
  async (req, res, next) => {
    try {
      if (!req.file && !req.body.image) {
        return res.status(400).json({
          success: false,
          error: { code: 'NO_FILE', message: 'No image file or URL provided for upload' },
        });
      }

      const folder = req.body.folder || 'rahnoxa/showcases';
      let uploadResult;

      if (req.file) {
        uploadResult = await uploadToCloudinary(req.file.buffer, { folder });
      } else if (req.body.image) {
        uploadResult = await uploadToCloudinary(req.body.image, { folder });
      }

      return res.status(200).json({
        success: true,
        url: uploadResult.secure_url || uploadResult.url,
        public_id: uploadResult.public_id,
        format: uploadResult.format,
        width: uploadResult.width,
        height: uploadResult.height,
        bytes: uploadResult.bytes,
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
