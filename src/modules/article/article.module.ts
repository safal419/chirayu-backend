import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesService } from './article.service';
import { ArticlesController } from './article.controller';
import { Article, ArticleSchema } from './entities/article.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }])],
  providers: [ArticlesService],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
