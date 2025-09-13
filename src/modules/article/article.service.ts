import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './entities/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

 async findOne(id: string): Promise<Article> {
  const article = await this.articleModel.findById(id).exec();
  if (!article) throw new NotFoundException(`Article with _id ${id} not found`);
  return article;
}


  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const newArticle = new this.articleModel(createArticleDto);
    return newArticle.save();
  }


async update(id: string, updateArticleDto: UpdateArticleDto): Promise<Article> {
  const updated = await this.articleModel
    .findByIdAndUpdate(id, updateArticleDto, { new: true })
    .exec();

  if (!updated) {
    throw new NotFoundException(`Article with _id ${id} not found`);
  }

  return updated;
}

 
async remove(id: string): Promise<void> {
  const result = await this.articleModel.findByIdAndDelete(id).exec();
  if (!result) throw new NotFoundException(`Article with _id ${id} not found`);
}
}
