
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ArticlesService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entities/article.schema';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async findAll(): Promise<Article[]> {
    return this.articlesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Article> {
    return this.articlesService.findOne(id);
  }

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articlesService.create(createArticleDto);
  }

@Put(':id')
async update(
  @Param('id') id: string,
  @Body() updateArticleDto: UpdateArticleDto,
) {
  return this.articlesService.update(id, updateArticleDto);
}


  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.articlesService.remove(id);
  }
}
