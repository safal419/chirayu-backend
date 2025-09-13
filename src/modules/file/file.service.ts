import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { File } from './file.model';
import { uploadBufferToCloudinary } from '../../multer-config';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File.name) private fileModel: Model<File>,
  ) {}

  async uploadFiles(files: Express.Multer.File[]): Promise<string[]> {
    if (!files || files.length === 0) return [];

    try {
      const uploads = await Promise.all(
        files.map(async (file) => {
          // ensure buffer present (use memoryStorage in multer)
          if (!file.buffer) {
            throw new Error('File buffer is missing. Use memoryStorage for multer.');
          }

          // choose a folder name (adjust as needed)
          const folder = process.env.CLOUDINARY_FOLDER || 'uploads';

          const result = await uploadBufferToCloudinary(file.buffer, folder);

          const createdFile = new this.fileModel({
            name: file.originalname,
            path: result.secure_url,
            publicId: result.public_id,
            raw: result,
          });

          await createdFile.save();

          return result.secure_url;
        }),
      );

      return uploads;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('FileService.uploadFiles error', error);
      throw error;
    }
  }
}