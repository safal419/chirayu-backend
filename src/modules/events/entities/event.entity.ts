import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ required: true })
  time: string; // HH:mm format

  @Prop({ required: true })
  location: string;


  @Prop({ required: true })
  status: string;

  @Prop()
  image: string; // URL or file path

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  attendees: number;


}

export const EventSchema = SchemaFactory.createForClass(Event);
