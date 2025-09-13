import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema({ timestamps: true })
export class Article {

  @Prop({ required: true })
  title: string;

  @Prop()
  excerpt: string;

  @Prop()
  content: string;

  @Prop({ default: 'Unknown' })
  author: string;

  @Prop()
  category: string;

  @Prop({ default: 'draft', enum: ['draft', 'published'] })
  status: string;

  @Prop()
  publishDate: Date;

  @Prop()
  image: string;

  @Prop({ type: [String], default: [] })
  tags: string[];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
