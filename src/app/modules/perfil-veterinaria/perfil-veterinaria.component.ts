import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { VeterinariaHeadComponent } from "../../components/veterinaria-head/veterinaria-head.component";
import { MapsService } from '../../services/ubicacion/maps.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-perfil-veterinaria',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, VeterinariaHeadComponent],
  templateUrl: './perfil-veterinaria.component.html',
  styleUrl: './perfil-veterinaria.component.scss'
})
export class PerfilVeterinariaComponent {
  selectedOption: string = 'fotos';
  latitude!: number;
  longitude!: number;
  entidadForm!: FormGroup;
  googleMapsUrl: SafeResourceUrl | undefined;
  selectOption(option : string): void {
    this.selectedOption = option;
  }
  constructor(private geolocationService: MapsService, private fb: FormBuilder, private sanitizer: DomSanitizer){
    this.entidadForm = this.fb.group({
      location: [''] 
    });
  
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
  
}
