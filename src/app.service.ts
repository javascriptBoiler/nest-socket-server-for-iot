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
  initialData: IMeasure[];

  constructor(private readonly websocketGateway: AppGateway) {
    this.initialData = [{
      deviceId: '123',
      measure: 'Temperature',
      value: '18',
      time: new Date()
    },
    {
      deviceId: '456',
      measure: 'Humidity',
      value: '40',
      time: new Date()
    },
    {
      deviceId: '789',
      measure: 'Pressure',
      value: '120',
      time: new Date()
    }]
  }

  getInitialMeasure(): IMeasure[] {
    return this.initialData;
  }

  getInitialMeasureByID(deviceID: string): IMeasure {
    return this.initialData.find((each) => each?.deviceId === `${deviceID}`);
  }

  updateMeasure(body, deviceId): IMeasure {
    const time = new Date();
    this.initialData = this.initialData.map((each)=>{
      if( each?.deviceId === `${deviceId}`) {
        return {
          ...body,
          time
        }
      } else{
        return each;
      }
    })
    
    this.sendMessageToClients(deviceId, {...body, time});
    return this.getInitialMeasureByID(deviceId);
  }

  sendMessageToClients(deviceId: string, body): void {
    // Access the WebSocket server instance and send a message
    this.websocketGateway.sendmessage(deviceId, body);  
  }

}
