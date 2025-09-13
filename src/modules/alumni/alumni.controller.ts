import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AlumniService } from './alumni.service';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { UpdateAlumniDto } from './dto/update-alumni.dto';
import { Alumni } from './entities/alumni.schema';

@Controller('alumni')
export class AlumniController {
  constructor(private readonly alumniService: AlumniService) {}

  @Get()
  async findAll(): Promise<Alumni[]> {
    return this.alumniService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Alumni> {
    return this.alumniService.findOne(id);
  }

  @Post()
  async create(@Body() createAlumniDto: CreateAlumniDto): Promise<Alumni> {
    return this.alumniService.create(createAlumniDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlumniDto: UpdateAlumniDto,
  ): Promise<Alumni> {
    return this.alumniService.update(id, updateAlumniDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.alumniService.remove(id);
  }
}
