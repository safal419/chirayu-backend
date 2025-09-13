import { IsString, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateNoticeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  date: Date;


   @IsString()
  @IsNotEmpty()
  priority: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
