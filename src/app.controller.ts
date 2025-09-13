import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(){
    return{
      message: "Hello World! This is working from vercel"
    }
  }

  @Post()
  saveInfo(@Body() body: any){
    return{
    ...body,
    };
}
}
