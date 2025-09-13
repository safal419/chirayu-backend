import { IsString, IsOptional, IsArray, IsDateString, IsEnum, IsNumber } from 'class-validator';

export class CreateArticleDto {

  @IsString()
  title: string;

  @IsString()
  excerpt: string;

  @IsString()
  content: string;

  @IsString()
  author: string;

  @IsString()
  category: string;

  @IsEnum(['draft', 'published'])
  status: string;

  @IsDateString()
  publishDate: string;


  @IsOptional()
  @IsString()
  image?: string;

  @IsArray()
  tags: string[];
}
