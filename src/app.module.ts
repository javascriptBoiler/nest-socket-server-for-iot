import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './socket.gateway';
import { SocketService } from './socket/socket.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppGateway, SocketService, AppService],
})
export class AppModule {}
