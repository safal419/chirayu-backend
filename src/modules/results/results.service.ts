import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Result, ResultDocument } from './entities/result.entity';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';

@Injectable()
export class ResultsService {
  constructor(@InjectModel(Result.name) private resultModel: Model<ResultDocument>) {}

  async create(createResultDto: CreateResultDto): Promise<Result> {
    const result = new this.resultModel(createResultDto);
    return result.save();
  }

  async findAll(): Promise<Result[]> {
    return this.resultModel.find().sort({ year: -1, batch: 1 }).exec();
  }

  async findOne(id: string): Promise<Result> {
    const result = await this.resultModel.findById(id).exec();
    if (!result) {
      throw new NotFoundException(`Result with ID ${id} not found`);
    }
    return result;
  }

  async update(id: string, updateResultDto: UpdateResultDto): Promise<Result> {
    const updatedResult = await this.resultModel
      .findByIdAndUpdate(id, updateResultDto, { new: true })
      .exec();
    if (!updatedResult) {
      throw new NotFoundException(`Result with ID ${id} not found`);
    }
    return updatedResult;
  }

  async remove(id: string): Promise<void> {
    const result = await this.resultModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Result with ID ${id} not found`);
    }
  }
}
