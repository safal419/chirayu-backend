import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions, uploadBufferToCloudinary } from '../../multer-config';

@Controller('files')
export class FilesController {
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 10, multerOptions)) 
  async upload(@UploadedFiles() files: Express.Multer.File[]) {
    const folder = 'image';
    const results = await Promise.all(
      files.map((file) => uploadBufferToCloudinary(file.buffer, folder))
    );

    return {
      urls: results.map((r) => r.secure_url),
      publicIds: results.map((r) => r.public_id),
    };
  }
}
