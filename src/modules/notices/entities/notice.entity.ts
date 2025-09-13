import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoticeDocument = Notice & Document;

@Schema({ timestamps: true })
export class Notice {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ required: true })
  priority: string; 

  @Prop({ required: true })
  content: string;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
