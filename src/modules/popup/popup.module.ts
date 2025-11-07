import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PopupImageService } from './popup.service';
import { PopupImageController } from './popup.controller';
import { PopupImage, PopupImageSchema } from './entities/popup.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: PopupImage.name, schema: PopupImageSchema }])],
  controllers: [PopupImageController],
  providers: [PopupImageService],
})
export class PopupImageModule {}
