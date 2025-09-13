import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlumniService } from './alumni.service';
import { AlumniController } from './alumni.controller';
import { Alumni, AlumniSchema } from './entities/alumni.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Alumni.name, schema: AlumniSchema }])],
  providers: [AlumniService],
  controllers: [AlumniController],
})
export class AlumniModule {}
