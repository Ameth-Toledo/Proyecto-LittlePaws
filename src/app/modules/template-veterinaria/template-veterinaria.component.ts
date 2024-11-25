import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntidadService } from '../../services/entidad/entidad.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { VeterinariaHeadComponent } from '../../components/veterinaria-head/veterinaria-head.component';
import { MascotasService } from '../../services/mascotas/mascotas.service';
import { PetsResponse } from '../../models/pets';
import { CardAnimalesComponent } from '../../components/card-animales/card-animales.component';
import { MapsService } from '../../services/ubicacion/maps.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EntidadResponse } from '../../models/entidad';

@Component({
  selector: 'app-template-veterinaria',
  standalone: true,
  imports: [HeaderComponent, VeterinariaHeadComponent, FooterComponent, CommonModule, CardAnimalesComponent],
  templateUrl: './template-veterinaria.component.html',
  styleUrls: ['./template-veterinaria.component.scss'],
})
export class TemplateVeterinariaComponent implements OnInit, AfterViewInit {
  refugioData: any = null;
  selectedOption: string = 'fotos';
  @Input() mascotas!: PetsResponse[];
  latitude!: number;
  longitude!: number;
  entidadForm!: FormGroup;
  googleMapsUrl: SafeResourceUrl | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private entidadService: EntidadService,
    private mascotasService: MascotasService,
    private geolocationService: MapsService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.entidadForm = this.fb.group({
      location: [''] 
    });
  }

  ngOnInit(): void {
    this.view_mascotas();
    this.loadVeterinaria();
    
    const state = this.router.getCurrentNavigation()?.extras.state;
  
    if (state) {
      this.refugioData = state;
    } else {
      const entidadId = this.route.snapshot.paramMap.get('id');
      if (entidadId) {
        this.entidadService.getAdopcionById(Number(entidadId)).subscribe({
          next: (data) => {
            this.refugioData = data;
            this.view_mascotas(Number(entidadId));
          },
          error: (err) => {
            console.error('Error al cargar la veterinaria:', err);
          },
        });
      }
    }
  }
  
  ngAfterViewInit(): void {
    this.loadMapUrl();
  }

  loadVeterinaria(): void {
    const entidadId = this.route.snapshot.paramMap.get('id');
    if (entidadId) {
      this.entidadService.getAdopcionById(Number(entidadId)).subscribe({
        next: (data: EntidadResponse) => {
          this.refugioData = data;
          this.getUserLocation();
        },
        error: (err) => {
          console.error('Error al cargar la veterinaria:', err);
        },
      });
    }
  }

  getUserLocation() {
    if (this.refugioData && this.refugioData.location) {
      const locationParts = this.refugioData.location.split(',');
      if (locationParts.length === 2) {
        this.latitude = parseFloat(locationParts[0]);
        this.longitude = parseFloat(locationParts[1]);
        const locationString = `${this.latitude},${this.longitude}`;
        this.entidadForm.get('location')?.setValue(locationString);
        this.loadMapUrl();
      } else {
        console.error('La ubicación no tiene el formato esperado');
      }
    } else {
      console.error('No se encontraron datos de ubicación en la respuesta');
    }
  }

  loadMapUrl(): void {
    if (this.latitude && this.longitude) {
      const mapUrl = `https://www.google.com/maps?q=${this.latitude},${this.longitude}&output=embed`;
      this.googleMapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl);
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

  selectOption(option: string): void {
    this.selectedOption = option;
  }
}
