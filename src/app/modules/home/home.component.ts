import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CardAnimalesComponent } from "../../components/card-animales/card-animales.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Router } from '@angular/router';
import { ChatbotComponent } from "../../components/chatbot/chatbot.component";
import { CommonModule } from '@angular/common';
import { AdopcionService } from '../../services/adopcion/adopcion.service';
import { MascotasService } from '../../services/mascotas/mascotas.service';
import { PetsResponse } from '../../models/pets';
import { AdopcionResponse } from '../../models/adopcion';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule ,HeaderComponent, CardAnimalesComponent, FooterComponent, ChatbotComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isModalOpen = false;
  progress = 0;
  imageViewed = false;
  selectedImage: string = ''; 
  timer: any;
  @Input() mascotas!: PetsResponse[];
  adopciones: AdopcionResponse[] = []; 

  ngOnInit(): void {
    this.view_mascotas(); 
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

  openModal(imageUrl: string) {
    this.selectedImage = imageUrl; 
    this.isModalOpen = true;
    this.imageViewed = false; 
    this.progress = 0; 
    this.startProgressBar();
  }

  closeModal() {
    this.isModalOpen = false;
    clearInterval(this.timer); 
    this.imageViewed = true; 
  }

  startProgressBar() {
    const totalDuration = 10; 
    const intervalDuration = 100; 
    let elapsedTime = 0;
    
    this.timer = setInterval(() => {
      elapsedTime += intervalDuration / 1000;
      this.progress = (elapsedTime / totalDuration) * 100; 
      
      if (elapsedTime >= totalDuration) {
        this.closeModal(); 
      }
    }, intervalDuration); 
  }

  constructor(private router: Router,  private adopcionesService : AdopcionService,private mascotasService: MascotasService) {}

  enviarVeterinarias(event: Event) {
    event.preventDefault();
    this.router.navigate(['/veterinarias']);
  }

  onPetDeleted(idMascota: number) {
    this.mascotas = this.mascotas.filter(mascota => mascota.id_mascota !== idMascota);
  }

  onPetUpdated(updatedPet: any) {
    this.view_mascotas()
    const index = this.mascotas.findIndex(mascota => mascota.id_mascota === updatedPet.idMascota);
    if (index !== -1) {
      this.mascotas[index] = updatedPet; 
      this.mascotas[index].image = updatedPet.imgSrc;
    }
  }
  

  view_mascotas(entityId?: number): void {
    if (entityId) {
      this.mascotasService.getAllMascotas(entityId).subscribe((response: PetsResponse[]) => {
        console.log(response);
        this.mascotas = response; // Solo las mascotas de la entidad seleccionada
      });
    } else {
      this.mascotasService.getAllMascotas(0).subscribe((response: PetsResponse[]) => { // Puedes usar un valor como 0 si no se pasa un entityId
        console.log(response);
        this.mascotas = response; // Esto carga todas las mascotas si no se pasa entidadId
      });
    }
  }

}
