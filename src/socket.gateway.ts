import { 
  WebSocketGateway, 
  OnGatewayInit, 
  OnGatewayDisconnect, 
  WebSocketServer,
  SubscribeMessage
 } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AppService } from './app.service';

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayInit, OnGatewayDisconnect {

  constructor(){}

  @WebSocketServer() public server: Server;
  private subscriptions: { [deviceId: string]: Socket[] } = {};


  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
    // ... (handle disconnection logic)
  }

  @SubscribeMessage('subscribe')
  handleSubscribe(client: Socket, deviceId: string) {
    // Subscribe the client to the specified room
    console.log('Client join:', deviceId);
    client.join(`${deviceId}`);
  }

  @SubscribeMessage('unsubscribe')
  handleUnsubscribe(client: Socket, deviceId: string) {
    // Unsubscribe the client from the specified room
    client.leave(`${deviceId}`);
  }

  @SubscribeMessage('updateRoom')
  handleRoomUpdate(client: Socket, data: any) {
    // Broadcast the update to all clients in the room
    const deviceId = Object.keys(client.rooms)[1]; // Get the room name (device ID)
    this.server.to(`${deviceId}`).emit('roomUpdate', data);
  }

  sendmessage(deviceId, data){
    this.server.to(`${deviceId}`).emit('roomUpdate', data);
  }
}