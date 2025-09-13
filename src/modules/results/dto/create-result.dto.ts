import { IsString, IsNotEmpty, IsNumber, IsArray, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

class TopperDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  grade: string;

  @IsString()
  gpa: string;

  @IsString()
  photo: string;
}

export class CreateResultDto {
  @IsString()
  @IsNotEmpty()
  batch: string;

  @IsString()
  @IsNotEmpty()
  year: string;

  @IsNumber()
  totalStudents: number;


  @IsNumber()
  successRate: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TopperDto)
  toppers: TopperDto[];
}
