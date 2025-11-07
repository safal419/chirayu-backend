import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './modules/file/file.module';
import { NoticesModule } from './modules/notices/notices.module';
import { AcademicsModule } from './modules/academics/academics.module';
import { EventsModule } from './modules/events/events.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { ResultsModule } from './modules/results/results.module';
import { ArticlesModule } from './modules/article/article.module';
import { AlumniModule } from './modules/alumni/alumni.module';
import { PopupImageModule } from './modules/popup/popup.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI || ''),
    FileModule,
    NoticesModule,
    EventsModule,
    GalleryModule,
    ResultsModule,
    ArticlesModule,
    AlumniModule,
    AcademicsModule,
    PopupImageModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
