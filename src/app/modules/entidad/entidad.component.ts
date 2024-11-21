import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderEntidadComponent } from "../../components/header-entidad/header-entidad.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CardDenunciasComponent } from "../../components/card-denuncias/card-denuncias.component";
import { CardAnimalesComponent } from "../../components/card-animales/card-animales.component";
import { MascotasService } from '../../services/mascotas/mascotas.service'; // Make sure to import the service
import { PetsResponse } from '../../models/pets';

// Modelo del mensaje
interface Message {
  senderName: string;
  userImage: string;
  snippet: string;
  content: string;
  responderName?: string;
}

@Component({
  selector: 'app-entidad',
  standalone: true,
  imports: [FormsModule, CommonModule, FooterComponent, HeaderEntidadComponent, CardDenunciasComponent, CardAnimalesComponent],
  templateUrl: './entidad.component.html',
  styleUrls: ['./entidad.component.scss']
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
  fileName: any;
  selectedFile: any;
  imageUrl: string | undefined;

  constructor(private router: Router, private mascotasService: MascotasService) {}

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
    this.isModalOpen = true;
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

  mascota: any = {
    name: '',
    race: '',
    age: '',
    gender: '',
    species: '',
    weight: '',
    size: '',
    file: null,
    entity_id: null
  };

  onSubmit(mascotaForm: NgForm) {
    const formData = new FormData();
    formData.append('name', this.mascota.name);
    formData.append('race', this.mascota.race);
    formData.append('age', this.mascota.age.toString());
    formData.append('gender', this.mascota.gender);
    formData.append('species', this.mascota.species);
    formData.append('weight', this.mascota.weight.toString());
    formData.append('size', this.mascota.size);
    formData.append('entity_id', this.mascota.entity_id.toString());
  
    // Agregar el archivo si se seleccionó
    if (this.mascota.file) {
      formData.append('file', this.mascota.file, this.mascota.file.name);
    }
  
    // Llamar al servicio para enviar la solicitud al backend
    this.mascotasService.createMascota(formData).subscribe(
      (response: PetsResponse) => {
        console.log('Mascota creada:', response);
        this.imageUrl = response.image; // Mostrar la imagen subida
        alert('Mascota creada exitosamente!');
      },
      (error: any) => {
        console.error('Error al crear la mascota:', error);
        
        // Verifica si el error tiene detalles específicos
        if (error.error && error.error.detail) {
          console.log('Detalles del error:', error.error.detail); // Mostrar detalles
          alert(`Error al crear la mascota: ${error.error.detail.join(', ')}`);
        } else if (error.status && error.status === 400) {
          // En caso de error de validación o parámetros incorrectos
          alert('Datos inválidos, por favor revisa la información ingresada.');
        } else {
          // Si no se obtiene un mensaje claro, muestra un mensaje genérico
          alert('Hubo un problema al crear la mascota. Intenta nuevamente más tarde.');
        }
      }
    );
  }
  
  // Método para manejar el cambio de archivo
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.mascota.file = file; // Usar 'mascota.file' aquí
    }
  }
  triggerFileInput() {
    document.getElementById('file')?.click();  // Abre el input de archivo
  }

  enviarDenuncias(event: Event) {
    event.preventDefault();
    this.router.navigate(['/denuncias']);
    this.isSidebarOpen = false;
  }

}
