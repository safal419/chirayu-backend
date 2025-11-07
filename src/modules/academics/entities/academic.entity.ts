import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AcademicDocument = Academic & Document;

@Schema({ timestamps: true })
export class Academic {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  grades: string;

  @Prop({ required: true })
  ageGroup: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  subjects: string[];

  @Prop()
  color: string;
}

export const AcademicSchema = SchemaFactory.createForClass(Academic);
