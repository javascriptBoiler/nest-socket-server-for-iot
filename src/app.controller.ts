import { Controller, Get, Patch, Body, Param } from '@nestjs/common';
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
  getCurrentMeasure(): IMeasure[] {
    return this.appService.getInitialMeasure();
  }

  @Get('measure/:deviceId')
  getCurrentMeasureByDevice(@Param('deviceId') deviceId: string): IMeasure {
    return this.appService.getInitialMeasureByID(deviceId);
  }

  @Patch('measure/:deviceId')
  createNewRecord(
    @Body() body: CreateMeasureeDto,
    @Param('deviceId') deviceId: string
  ): IMeasure {
    return this.appService.updateMeasure(body, deviceId);
  }
}
