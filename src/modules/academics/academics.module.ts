import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AcademicsService } from './academics.service';
import { AcademicsController } from './academics.controller';
import { Academic, AcademicSchema } from './entities/academic.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Academic.name, schema: AcademicSchema }])],
  controllers: [AcademicsController],
  providers: [AcademicsService],
})
export class AcademicsModule {}
