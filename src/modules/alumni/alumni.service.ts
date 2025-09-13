import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Alumni, AlumniDocument } from './entities/alumni.schema';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { UpdateAlumniDto } from './dto/update-alumni.dto';

@Injectable()
export class AlumniService {
  constructor(@InjectModel(Alumni.name) private alumniModel: Model<AlumniDocument>) {}

  async findAll(): Promise<Alumni[]> {
    return this.alumniModel.find().exec();
  }

  async findOne(id: string): Promise<Alumni> {
    const alumni = await this.alumniModel.findById(id).exec();
    if (!alumni) throw new NotFoundException(`Alumni with _id ${id} not found`);
    return alumni;
  }

  async create(createAlumniDto: CreateAlumniDto): Promise<Alumni> {
    const newAlumni = new this.alumniModel(createAlumniDto);
    return newAlumni.save();
  }

  async update(id: string, updateAlumniDto: UpdateAlumniDto): Promise<Alumni> {
    const updated = await this.alumniModel
      .findByIdAndUpdate(id, updateAlumniDto, { new: true })
      .exec();

    if (!updated) throw new NotFoundException(`Alumni with _id ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.alumniModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Alumni with _id ${id} not found`);
  }
}
