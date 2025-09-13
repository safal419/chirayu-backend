import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ResultDocument = Result & Document;

@Schema({ timestamps: true })
export class Result {
  @Prop({ required: true })
  batch: string;

  @Prop({ required: true })
  year: string;

  @Prop({ required: true })
  totalStudents: number;


  @Prop({ required: true })
  successRate: number;

  @Prop({ type: [{ name: String, grade: String, gpa: String, photo: String, school:String }], default: [] })
  toppers: { name: string; grade: string; gpa: string; photo: string; school:string; }[];
}

export const ResultSchema = SchemaFactory.createForClass(Result);
