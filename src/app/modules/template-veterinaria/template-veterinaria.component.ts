import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntidadService } from '../../services/entidad/entidad.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { VeterinariaHeadComponent } from '../../components/veterinaria-head/veterinaria-head.component';
import { MascotasService } from '../../services/mascotas/mascotas.service';
import { PetsResponse } from '../../models/pets';
import { CardAnimalesComponent } from '../../components/card-animales/card-animales.component';

@Component({
  selector: 'app-template-veterinaria',
  standalone: true,
  imports: [HeaderComponent, VeterinariaHeadComponent, FooterComponent, CommonModule, CardAnimalesComponent],
  templateUrl: './template-veterinaria.component.html',
  styleUrls: ['./template-veterinaria.component.scss'],
})
export class TemplateVeterinariaComponent implements OnInit {
  refugioData: any = null;
  selectedOption: string = 'fotos';
  @Input() mascotas!: PetsResponse[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private entidadService: EntidadService,
    private mascotasService: MascotasService
  ) {}

  ngOnInit(): void {
    this.view_mascotas();
  
    const state = this.router.getCurrentNavigation()?.extras.state;
  
    if (state) {
      this.refugioData = state;
    } else {
      const entidadId = this.route.snapshot.paramMap.get('id');
      if (entidadId) {
        this.entidadService.getAdopcionById(Number(entidadId)).subscribe({
          next: (data) => {
            this.refugioData = data;
            // Fetch the mascotas of the current entity
            this.view_mascotas(Number(entidadId)); // Pass the entity_id here
          },
          error: (err) => {
            console.error('Error al cargar la veterinaria:', err);
          },
        });
      }
    }
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
  

  selectOption(option: string): void {
    this.selectedOption = option;
  }
}
