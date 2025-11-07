import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PopupImage, PopupImageDocument } from './entities/popup.entity';
import { CreatePopupImageDto, UpdatePopupImageDto } from './dto/create-update-popup-image.dto';

@Injectable()
export class PopupImageService {
  constructor(
    @InjectModel(PopupImage.name) private popupImageModel: Model<PopupImageDocument>,
  ) {}

  // Create new popup image (or replace existing if you want only one)
  async create(createDto: CreatePopupImageDto): Promise<PopupImage> {
    // Optional: Delete old popup images if only 1 is allowed
    await this.popupImageModel.deleteMany({});
    const newImage = new this.popupImageModel(createDto);
    return newImage.save();
  }

  // Get the current popup image
  async find(): Promise<PopupImage | null> {
    return this.popupImageModel.findOne().exec();
  }

  // Update popup image
  async update(id: string, updateDto: UpdatePopupImageDto): Promise<PopupImage> {
    const updated = await this.popupImageModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    if (!updated) throw new NotFoundException('Popup image not found');
    return updated;
  }

  // Delete popup image
  async remove(id: string): Promise<void> {
    const deleted = await this.popupImageModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Popup image not found');
  }
}
