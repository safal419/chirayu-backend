import { memoryStorage } from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { Request, Response, NextFunction } from 'express';

export function configureCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export const multerStorage = memoryStorage();
export const multerOptions = {
  storage: multerStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
};

// Helper to upload a buffer to Cloudinary
export function uploadBufferToCloudinary(buffer: Buffer, folder = 'default') {
  return new Promise<any>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

// Express-style middleware (optional) that uploads req.file to Cloudinary and attaches result
export const uploadToCloudinaryMiddleware = (field = 'file') => {
  return async (req: Request & { file?: Express.Multer.File }, res: Response, next: NextFunction) => {
    try {
      const file = req.file;
      if (!file || !file.buffer) return next();
      const folder = (req.body.folderId || req.headers['folderid'] || 'default').toString();
      const result = await uploadBufferToCloudinary(file.buffer, folder);
      // attach cloudinary info to req.file for downstream handlers
      (req.file as any).cloudinaryUrl = result.secure_url;
      (req.file as any).publicId = result.public_id;
      (req.file as any).raw = result;
      next();
    } catch (err) {
      console.error('Cloudinary upload error', err);
      next(err);
    }
  };
};