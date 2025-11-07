import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Academic, AcademicDocument } from './entities/academic.entity';
import { CreateAcademicDto } from './dto/create-academic.dto';
import { UpdateAcademicDto } from './dto/update-academic.dto';

@Injectable()
export class AcademicsService {
  constructor(
    @InjectModel(Academic.name) private academicModel: Model<AcademicDocument>,
  ) {}

  async create(createAcademicDto: CreateAcademicDto): Promise<Academic> {
    const academic = new this.academicModel(createAcademicDto);
    return academic.save();
  }

  async findAll(): Promise<Academic[]> {
    return this.academicModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Academic> {
    const item = await this.academicModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`Academic item with ID ${id} not found`);
    }
    return item;
  }

  async update(id: string, updateAcademicDto: UpdateAcademicDto): Promise<Academic> {
    const updated = await this.academicModel
      .findByIdAndUpdate(id, updateAcademicDto, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Academic item with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.academicModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Academic item with ID ${id} not found`);
    }
  }
}
