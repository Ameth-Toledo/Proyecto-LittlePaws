import { Component, Input } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderEntidadComponent } from "../../components/header-entidad/header-entidad.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardDenunciasComponent } from "../../components/card-denuncias/card-denuncias.component";
import { MascotasService } from '../../services/mascotas/mascotas.service';
import { CardAnimalesEntidadComponent } from "../../components/card-animales-entidad/card-animales-entidad.component";
import { CardMascotasExtraviadosComponent } from "../../components/card-mascotas-extraviados/card-mascotas-extraviados.component";
import { CardComentariosComponent } from "../../components/card-comentarios/card-comentarios.component";
import { ComentarioService } from '../../services/comentarios/comentario.service';
import { CardAdopcionesComponent } from "../../components/card-adopciones/card-adopciones.component";
import { ChatbotComponent } from "../../components/chatbot/chatbot.component";
import { PetsRequest, PetsResponse } from '../../models/pets';
import { AdopcionService } from '../../services/adopcion/adopcion.service';
import { AdopcionResponse } from '../../models/adopcion';
import { MascotasExtraviadasService } from '../../services/mascotas_e/mascotas-extraviadas.service';

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
  imports: [FormsModule, CommonModule, FooterComponent, HeaderEntidadComponent, CardDenunciasComponent, CardAnimalesEntidadComponent, CardMascotasExtraviadosComponent, CardComentariosComponent, CardAdopcionesComponent, ChatbotComponent],
  templateUrl: './entidad.component.html',
  styleUrls: ['./entidad.component.scss']
})

export class EntidadComponent {
  @Input() mascotas!: PetsResponse[]; 
  @Input() namaPet!: string;

  isSidebarOpen = false;
  isModalOpen = false;
  activeModal: string | null = null;
  
  comentarios: any[] = [];
  messages: Message[] = [
    { senderName: 'Juan Perez', userImage: 'usuario.png', snippet: 'Hola, tengo una duda sobre...', content: 'Hola, tengo una duda sobre el servicio de adopción...' },
    { senderName: 'Maria Gomez', userImage: 'usuario.png', snippet: '¿Cómo puedo donar?', content: 'Hola, quisiera saber cómo puedo realizar una donación...' }
  ];

  fileName: any;
  selectedFile: any;
  imageUrl: string | undefined;
  pets: any[] = [];
  adopciones: AdopcionResponse[] = []; 
  mascotasExtraviadas: any[] = [];

  constructor(
    private router: Router,
    private mascotasService: MascotasService,
    private comentarioService: ComentarioService,
    private adopcionesService: AdopcionService,
    private mascotasExtraviadasService: MascotasExtraviadasService
  ) {}

  selectedMessage: Message | null = null;
  replyMessage = '';

  ngOnInit(): void {
    this.setEntityId(); 
    if (this.mascota.entity_id) {
      this.view_mascotas(this.mascota.entity_id);
    }
    this.view_adopciones(this.mascota.entity_id);
    this.loadComentarios();
    this.cargarMascotas()
  }

  setEntityId() {
    const idEntidad = localStorage.getItem('id_entidad');
    if (idEntidad) {
      this.mascota.entity_id = idEntidad;
    }
  }

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
    this.view_mascotas(this.mascota.entity_id);
  }

  openModalExtraviadas(section : string) {
    this.activeModal = section;
    this.isModalOpen = true;
  }

  openModalComentarios(section : string) {
    this.activeModal = section;
    this.isModalOpen = true;
    if (section === 'Comentarios') {
      this.loadComentarios();
    }
  }

  openModalAdopciones(section : string) {
    this.activeModal = section;
    this.isModalOpen = true;
    this.view_adopciones(this.mascota.entity_id);
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
        alert('Hubo un problema al crear la mascota. Intenta nuevamente más tarde.');
      }
    );
  }

  onPetDeleted(idMascota: number) {
    this.mascotas = this.mascotas.filter(mascota => mascota.id_mascota !== idMascota);
  }

  onPetUpdated(updatedPet: any) {
    this.view_mascotas(this.mascota.entity_id);  
    const index = this.mascotas.findIndex(mascota => mascota.id_mascota === updatedPet.idMascota);
    if (index !== -1) {
      this.mascotas[index] = updatedPet;
      this.mascotas[index].image = updatedPet.imgSrc;
    }
  }

  view_mascotas(entityId?: number): void {
    console.log('Entity ID:', entityId);
    if (entityId) {
      this.mascotasService.getAllMascotas(entityId).subscribe((response: PetsResponse[]) => {
        console.log(response);
        this.mascotas = response;
      });
    } else {
      this.mascotasService.getAllMascotas(0).subscribe((response: PetsResponse[]) => {
        console.log(response);
        this.mascotas = response;
      });
    }
  }

  view_adopciones(entityId?: number): void {
    console.log('Entity ID:', entityId);
    if (entityId) {
      this.adopcionesService.getAllAdopciones(entityId).subscribe(
        (response: AdopcionResponse[]) => {
          console.log(response);
          this.adopciones = response;
        },
        (error: any) => {
          console.error('Error al obtener adopciones por entidad:', error);
          alert('Hubo un error al obtener las adopciones por entidad.');
        }
      );
    } else {
      this.adopcionesService.getAllAdopciones(0).subscribe(
        (response: AdopcionResponse[]) => {
          console.log(response);
          this.adopciones = response;
        },
        (error: any) => {
          console.error('Error al obtener adopciones:', error);
          alert('Hubo un error al obtener las adopciones.');
        }
      );
    }
  }

  
  actualizarListaAdopciones(event: { idAdopcion: number; nuevoEstado: string }) {
    const index = this.adopciones.findIndex(adopcion => adopcion.id_adopcion === event.idAdopcion);
    if (index !== -1) {
      this.adopciones[index].estado = event.nuevoEstado;
      console.log('Adopción actualizada en la lista:', this.adopciones[index]);
    }
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

  loadComentarios(): void {
    this.comentarioService.getAllComentarios().subscribe(
      (response) => {
        console.log(response);
        this.comentarios = response;
      },
      (error) => {
        console.error('Error al cargar los comentarios:', error);
        alert('Hubo un error al cargar los comentarios.');
      }
    );
  }

  cargarMascotas() {
    this.mascotasExtraviadasService.getMascotasExtraviadas().subscribe(
      (response) => {
        this.mascotasExtraviadas = response; 
      },
      (error) => {
        console.error('Error al cargar las mascotas:', error);
      }
    );
  }
}
