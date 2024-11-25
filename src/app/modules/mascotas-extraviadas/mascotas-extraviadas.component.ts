import { Component, OnInit } from '@angular/core';
import { MascotasExtraviadasService } from '../../services/mascotas_e/mascotas-extraviadas.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { CardMascotasExtraviadosComponent } from '../../components/card-mascotas-extraviados/card-mascotas-extraviados.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mascotas-extraviadas',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CardMascotasExtraviadosComponent,CommonModule
  ],
  templateUrl: './mascotas-extraviadas.component.html',
  styleUrls: ['./mascotas-extraviadas.component.scss'],
})
export class MascotasExtraviadasComponent implements OnInit {
  mascotas: any[] = []; 

  constructor(private mascotasService: MascotasExtraviadasService) {}

  ngOnInit() {
    this.cargarMascotas();
  }

  cargarMascotas() {
    this.mascotasService.getMascotasExtraviadas().subscribe(
      (response) => {
        this.mascotas = response; 
      },
      (error) => {
        console.error('Error al cargar las mascotas:', error);
      }
    );
  }
}
