import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000'); // URL de tu servidor
  }

  // Escuchar mensajes cargados al conectarse
  loadMessages(): Observable<any[]> {
    return new Observable((observer) => {
      this.socket.on('loadMessages', (messages: any[] | undefined) => {
        observer.next(messages);
      });
    });
  }

  // Escuchar nuevos mensajes
  onNewMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('newMessage', (message: any) => {
        observer.next(message);
      });
    });
  }

  // Enviar un mensaje
  sendMessage(message: any): void {
    this.socket.emit('newMessage', message);
  }
}
