import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AlumniDocument = Alumni & Document;

@Schema({ timestamps: true })
export class Alumni {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  graduationYear: number;

  @Prop({ required: true })
  currentPosition: string;

  @Prop()
  company: string;

  @Prop()
  location: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  achievements: string;

  @Prop()
  image: string;

  @Prop()
  linkedIn: string;

  @Prop()
  testimonial: string;
}

export const AlumniSchema = SchemaFactory.createForClass(Alumni);
