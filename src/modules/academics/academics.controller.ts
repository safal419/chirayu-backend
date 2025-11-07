import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcademicsService } from './academics.service';
import { CreateAcademicDto } from './dto/create-academic.dto';
import { UpdateAcademicDto } from './dto/update-academic.dto';

@Controller('academics')
export class AcademicsController {
  constructor(private readonly academicsService: AcademicsService) {}

  @Post()
  create(@Body() createAcademicDto: CreateAcademicDto) {
    return this.academicsService.create(createAcademicDto);
  }

  @Get()
  findAll() {
    return this.academicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.academicsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAcademicDto: UpdateAcademicDto) {
    return this.academicsService.update(id, updateAcademicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.academicsService.remove(id);
  }
}
