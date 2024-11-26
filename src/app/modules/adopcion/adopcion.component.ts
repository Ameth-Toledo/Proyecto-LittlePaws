import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CardAnimalesComponent } from "../../components/card-animales/card-animales.component";
import { CommonModule } from '@angular/common';
import { PetsResponse } from '../../models/pets';
import { AdopcionResponse } from '../../models/adopcion';
import { MascotasService } from '../../services/mascotas/mascotas.service';

@Component({
  selector: 'app-adopcion',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CardAnimalesComponent, CommonModule],
  templateUrl: './adopcion.component.html',
  styleUrls: ['./adopcion.component.scss']
})
export class AdopcionComponent implements OnInit {
  @Input() mascotas: PetsResponse[] = [];
  adopciones: AdopcionResponse[] = [];

  constructor(private mascotasService: MascotasService) {}

  ngOnInit(): void {
    this.view_mascotas();
  }
  
  view_mascotas(entityId?: number): void {
    if (entityId) {
      this.mascotasService.getAllMascotas(entityId).subscribe((response: PetsResponse[]) => {
        this.mascotas = response;
      });
    } else {
      this.mascotasService.getAllMascotas(0).subscribe((response: PetsResponse[]) => {
        this.mascotas = response;
      });
    }
  }
}
