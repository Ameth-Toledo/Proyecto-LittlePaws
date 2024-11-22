import { Component, Input } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderEntidadComponent } from "../../components/header-entidad/header-entidad.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CardDenunciasComponent } from "../../components/card-denuncias/card-denuncias.component";
import { CardAnimalesComponent } from "../../components/card-animales/card-animales.component";
import { MascotasService } from '../../services/mascotas/mascotas.service';
import { PetsRequest, PetsResponse } from '../../models/pets';


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
  @Input() mascotas!: PetsResponse[]; 

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
    this.view_mascotas() 
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

  onSubmit(mascotaForm: any) {
    const formData = new FormData();
    formData.append('name', this.mascota.name);
    formData.append('race', this.mascota.race);
    formData.append('age', this.mascota.age.toString());
    formData.append('gender', this.mascota.gender);
    formData.append('species', this.mascota.species);
    formData.append('weight', this.mascota.weight.toString());
    formData.append('size', this.mascota.size);
    formData.append('entity_id', this.mascota.entity_id.toString());

    if (this.mascota.file) {
      formData.append('file', this.mascota.file, this.mascota.file.name);
    }

    this.mascotasService.createMascota(formData).subscribe(
      (response: PetsRequest) => {
        console.log('Mascota creada:', response);
        this.imageUrl = response.image; 
        alert('Mascota creada exitosamente!');
      },
      (error: any) => {
        console.error('Error al crear la mascota:', error);
        
        if (error.error && error.error.detail) {
          console.log('Detalles del error:', error.error.detail); 
          alert(`Error al crear la mascota: ${error.error.detail.join(', ')}`);
        } else if (error.status && error.status === 400) {
          alert('Datos inválidos, por favor revisa la información ingresada.');
        } else {
          alert('Hubo un problema al crear la mascota. Intenta nuevamente más tarde.');
        }
      }
    );
  }
  

  view_mascotas() {
    this.mascotasService.getAllMascotas().subscribe((response: PetsResponse[]) => {
      console.log(response);
      this.mascotas = response; 
    });
  }
  
  
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.mascota.file = file;
    }
  }
  triggerFileInput() {
    document.getElementById('file')?.click(); 
  }

  enviarDenuncias(event: Event) {
    event.preventDefault();
    this.router.navigate(['/denuncias']);
    this.isSidebarOpen = false;
  }

}
