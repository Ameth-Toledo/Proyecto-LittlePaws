import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MapsService } from '../../services/ubicacion/maps.service';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [FormsModule, GoogleMapsModule,CommonModule],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class MapaComponent {
  searchQuery = '';
  center: google.maps.LatLngLiteral = { lat: 19.432608, lng: -99.133209 }; // Coordenadas iniciales (CDMX)
  zoom = 15;

  constructor(private placesService: MapsService) {}

  searchPlace() {
    this.placesService.getPlaceLocation(this.searchQuery).subscribe(
      (response) => {
        if (response?.candidates?.length) {
          const location = response.candidates[0].geometry.location;
          this.center = { lat: location.lat, lng: location.lng };
        } else {
          alert('Lugar no encontrado');
        }
      },
      (error) => {
        console.error('Error al buscar lugar:', error);
      }
    );
  }
}

