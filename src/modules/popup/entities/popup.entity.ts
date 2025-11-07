import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PopupImageDocument = PopupImage & Document;

@Schema({ timestamps: true })
export class PopupImage {
  @Prop({ required: true })
  imageUrl: string; // URL of the image

  @Prop({ default: false })
  isActive: boolean; // Optionally, to control popup visibility
}

export const PopupImageSchema = SchemaFactory.createForClass(PopupImage);
