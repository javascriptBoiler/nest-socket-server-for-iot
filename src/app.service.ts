import { Injectable } from '@nestjs/common';
import { measureMemory } from 'vm';
import { AppGateway } from './socket.gateway';

export interface IMeasure {
  deviceId: string,
  measure: string,
  value: string,
  time: Date
}

@Injectable()
export class AppService {
  initialData: IMeasure;

  constructor(private readonly websocketGateway: AppGateway) {
    this.initialData = {
      deviceId: '123',
      measure: 'Temperature',
      value: '18',
      time: new Date()
    }
  }

  getInitialMeasure(): IMeasure {
    return this.initialData;
  }

  createNewMeasure(body): IMeasure {
    this.initialData = {
      ...body,
      time: new Date()
    }
    this.sendMessageToClients(this.initialData);
    return this.initialData;
  }

  sendMessageToClients(data: IMeasure): void {
    // Access the WebSocket server instance and send a message
    const response = this.websocketGateway.server.emit('update_data', data);    
  }

}
