import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PopupImageService } from './popup.service';
import { CreatePopupImageDto, UpdatePopupImageDto } from './dto/create-update-popup-image.dto';

@Controller('popup-image')
export class PopupImageController {
  constructor(private readonly popupImageService: PopupImageService) {}

  @Post()
  create(@Body() createDto: CreatePopupImageDto) {
    return this.popupImageService.create(createDto);
  }

  @Get()
  find() {
    return this.popupImageService.find();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdatePopupImageDto) {
    return this.popupImageService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.popupImageService.remove(id);
  }
}
