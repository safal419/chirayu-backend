import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureCloudinary } from './multer-config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    configureCloudinary();

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://chirayueducationalacademy.edu.np',
      'https://chirayueducationalacademy.netlify.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
