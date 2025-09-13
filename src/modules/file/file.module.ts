import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileService } from './file.service';
import { FileSchema } from './file.model';
import { FilesController } from './file.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'File', schema: FileSchema }])],
  controllers: [FilesController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}