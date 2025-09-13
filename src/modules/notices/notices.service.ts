import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notice, NoticeDocument } from './entities/notice.entity';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';

@Injectable()
export class NoticesService {
  constructor(
    @InjectModel(Notice.name) private noticeModel: Model<NoticeDocument>,
  ) {}

  async create(createNoticeDto: CreateNoticeDto): Promise<Notice> {
    const notice = new this.noticeModel(createNoticeDto);
    return notice.save();
  }

  async findAll(): Promise<Notice[]> {
    return this.noticeModel.find().sort({ date: -1 }).exec();
  }

  async findOne(id: string): Promise<Notice> {
    const notice = await this.noticeModel.findById(id).exec();
    if (!notice) {
      throw new NotFoundException(`Notice with ID ${id} not found`);
    }
    return notice;
  }

  async update(id: string, updateNoticeDto: UpdateNoticeDto): Promise<Notice> {
    const updatedNotice = await this.noticeModel
      .findByIdAndUpdate(id, updateNoticeDto, { new: true })
      .exec();

    if (!updatedNotice) {
      throw new NotFoundException(`Notice with ID ${id} not found`);
    }
    return updatedNotice;
  }

  async remove(id: string): Promise<void> {
    const result = await this.noticeModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Notice with ID ${id} not found`);
    }
  }
}
