import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateAlumniDto {
  @IsString()
  name: string;

  @IsNumber()
  graduationYear: number;

  @IsString()
  currentPosition: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  achievements?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  linkedIn?: string;

  @IsOptional()
  @IsString()
  testimonial?: string;
}
