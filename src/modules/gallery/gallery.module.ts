import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { Gallery, GallerySchema } from './entities/gallery.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Gallery.name, schema: GallerySchema }])],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
