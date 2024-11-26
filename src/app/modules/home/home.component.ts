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
import { MascotasExtraviadasService } from '../../services/mascotas_e/mascotas-extraviadas.service';
import { CardMascotasExtraviadosComponent } from '../../components/card-mascotas-extraviados/card-mascotas-extraviados.component';
import { MascotasExtraviadas } from '../../models/mascotas-extraviadas';
import { MapsService } from '../../services/ubicacion/maps.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule ,HeaderComponent, CardAnimalesComponent, FooterComponent, ChatbotComponent, CardMascotasExtraviadosComponent],
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
  mascotasExtraviadas: any[] = [];
  latitude!: number;
  longitude!: number;
  entidadForm!: FormGroup;
  
  constructor(private router: Router,  private mascotasExtraviadasService: MascotasExtraviadasService,private mascotasService: MascotasService, private geolocationService: MapsService,   private fb: FormBuilder,) {
    this.entidadForm = this.fb.group({
      location: [''] 
    });
  }


  ngOnInit(): void {
    this.view_mascotas(); 
    this.cargarMascotas();
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

  getUserLocation() {
    this.geolocationService.getCurrentPosition()
      .then(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
  
        const locationString = `${this.latitude},${this.longitude}`;
        this.entidadForm.get('location')?.setValue(locationString);

        this.updateMapIframe(this.latitude, this.longitude);
  
        console.log(`Ubicación asignada al formulario: ${locationString}`);
      })
      .catch(error => {
        console.error('Error al obtener la ubicación', error);
        alert('No se pudo obtener la ubicación, por favor actívela y recargue la página.');
      });
  }
  

  updateMapIframe(lat: number, lng: number) {
    const iframe = document.getElementById('googleMapIframe') as HTMLIFrameElement;
    if (iframe) {
      const googleMapsUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1`;
      iframe.src = googleMapsUrl;
    }
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
        this.mascotas = response; 
      });
    } else {
      this.mascotasService.getAllMascotas(0).subscribe((response: PetsResponse[]) => {
        console.log(response);
        this.mascotas = response; 
      });
    }
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
