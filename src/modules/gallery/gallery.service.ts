import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gallery, GalleryDocument } from './entities/gallery.entity';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(Gallery.name) private galleryModel: Model<GalleryDocument>,
  ) {}

  async create(createGalleryDto: CreateGalleryDto): Promise<Gallery> {
    const gallery = new this.galleryModel(createGalleryDto);
    return gallery.save();
  }

  async findAll(): Promise<Gallery[]> {
    return this.galleryModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Gallery> {
    const gallery = await this.galleryModel.findById(id).exec();
    if (!gallery) {
      throw new NotFoundException(`Gallery with ID ${id} not found`);
    }
    return gallery;
  }

  async update(id: string, updateGalleryDto: UpdateGalleryDto): Promise<Gallery> {
    const updatedGallery = await this.galleryModel
      .findByIdAndUpdate(id, updateGalleryDto, { new: true })
      .exec();

    if (!updatedGallery) {
      throw new NotFoundException(`Gallery with ID ${id} not found`);
    }
    return updatedGallery;
  }

  async remove(id: string): Promise<void> {
    const result = await this.galleryModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Gallery with ID ${id} not found`);
    }
  }
}
