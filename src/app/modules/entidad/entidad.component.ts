import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderEntidadComponent } from "../../components/header-entidad/header-entidad.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardDenunciasComponent } from "../../components/card-denuncias/card-denuncias.component";
import { CardAnimalesComponent } from "../../components/card-animales/card-animales.component";

//modelo del mensaje
interface Message {
  senderName: string;
  userImage: string;
  snippet: string;
  content: string;
  responderName? : string
}

@Component({
  selector: 'app-entidad',
  standalone: true,
  imports: [FormsModule, CommonModule, FooterComponent, HeaderEntidadComponent, CardDenunciasComponent, CardAnimalesComponent],
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
      userImage: 'usuario.png',
      snippet: 'Hola, tengo una duda sobre...',
      content: 'Hola, tengo una duda sobre el servicio de adopción...'
    },
    {
      senderName: 'Maria Gomez',
      userImage: 'usuario.png',
      snippet: '¿Cómo puedo donar?',
      content: 'Hola, quisiera saber cómo puedo realizar una donación...'
    }
  ];

  constructor(private router: Router) {}

  selectedMessage: Message | null = null;
  replyMessage = '';

  openMessage(message: Message) {
    this.selectedMessage = message;
  }

  sendMessage() {
    if (this.replyMessage.trim()) {
      const currentUser = 'Administrador';
      this.selectedMessage!.responderName = currentUser;

      console.log('Mensaje enviado:', this.replyMessage);
      this.replyMessage = '';
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  openModal(section: string) {
    this.activeModal = section;
    this.isModalOpen = true;
  }

  openModalDenuncias(section : string) {
    this.activeModal = section;
    this.isModalOpen = true
  }

  openModalAdd(section : string) {
    this.activeModal = section;
    this.isModalOpen = true;
  }

  openModalView(section : string) {
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
