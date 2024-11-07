import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderEntidadComponent } from "../../components/header-entidad/header-entidad.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  senderName: string;
  userImage: string;
  snippet: string;
  content: string;
}


@Component({
  selector: 'app-entidad',
  standalone: true,
  imports: [FormsModule, CommonModule, FooterComponent, HeaderEntidadComponent],
  templateUrl: './entidad.component.html',
  styleUrl: './entidad.component.scss'
})

export class EntidadComponent {
  isSidebarOpen = false;
  isModalOpen = false;
  activeModal: string | null = null;
  messages: Message[] = [
    {
      senderName: 'Juan Perez',
      userImage: 'path/to/user-image1.jpg',
      snippet: 'Hola, tengo una duda sobre...',
      content: 'Hola, tengo una duda sobre el servicio de adopción...'
    },
    {
      senderName: 'Maria Gomez',
      userImage: 'path/to/user-image2.jpg',
      snippet: '¿Cómo puedo donar?',
      content: 'Hola, quisiera saber cómo puedo realizar una donación...'
    }
  ];

  selectedMessage: Message | null = null;
  replyMessage = '';

  openMessage(message: any) {
    this.selectedMessage = message;
  }
  
  sendMessage() {
    if (this.replyMessage.trim()) {
      // Lógica para enviar mensaje
      console.log('Mensaje enviado:', this.replyMessage);
      this.replyMessage = ''; // Resetear el campo de texto
    }
  }

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  openModal(section: string) {
    this.activeModal = section;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.activeModal = null;
  }

  enviarDenuncias(event: Event) {
    event.preventDefault();
    this.router.navigate(['/denuncias']);
    this.isSidebarOpen = false;
  }
}

