import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService, IMeasure } from './app.service';
import {CreateMeasureeDto} from './dto'

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return 'welcome to the api service';
  }

  @Get('measure')
  getCurrentMeasure(): IMeasure {
    return this.appService.getInitialMeasure();
  }

  @Post('measure')
  createNewRecord(@Body() body: CreateMeasureeDto,): IMeasure {
    return this.appService.createNewMeasure(body);
  }
}
