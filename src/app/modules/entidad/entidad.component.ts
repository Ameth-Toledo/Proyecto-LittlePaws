import { Component, Input } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderEntidadComponent } from "../../components/header-entidad/header-entidad.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CardDenunciasComponent } from "../../components/card-denuncias/card-denuncias.component";
import { MascotasService } from '../../services/mascotas/mascotas.service';
import { CardAnimalesEntidadComponent } from "../../components/card-animales-entidad/card-animales-entidad.component";
import { CardMascotasExtraviadosComponent } from "../../components/card-mascotas-extraviados/card-mascotas-extraviados.component";
import { PetsRequest, PetsResponse } from '../../models/pets';
import { CardAnimalesComponent } from '../../components/card-animales/card-animales.component';


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
  imports: [FormsModule, CommonModule, FooterComponent, HeaderEntidadComponent, CardDenunciasComponent, CardAnimalesEntidadComponent, CardMascotasExtraviadosComponent, CardAnimalesComponent],
  templateUrl: './entidad.component.html',
  styleUrls: ['./entidad.component.scss']
})

export class EntidadComponent {
  @Input() mascotas!: PetsResponse[]; 
  @Input() namaPet!: string; 

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

  ngOnInit(): void {
    this.setEntityId();  // Establecer el ID de la entidad al cargar el componente
  }

  // Método para obtener el id_entidad desde localStorage
  setEntityId() {
    const idEntidad = localStorage.getItem('id_entidad');
    if (idEntidad) {
      this.mascota.entity_id = idEntidad;  
    }
  }

  showIds: boolean = false;

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

  openModalExtraviadas(section : string) {
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
  
  

  onPetDeleted(idMascota: number) {
    this.mascotas = this.mascotas.filter(mascota => mascota.id_mascota !== idMascota);
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

  enviar() {

  }
}
