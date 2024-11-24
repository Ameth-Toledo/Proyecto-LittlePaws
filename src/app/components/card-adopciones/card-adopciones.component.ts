import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdopcionResponse } from '../../models/adopcion';
import { AdopcionService } from '../../services/adopcion/adopcion.service';

@Component({
  selector: 'app-card-adopciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-adopciones.component.html',
  styleUrls: ['./card-adopciones.component.scss']
})
export class CardAdopcionesComponent implements OnInit {
  @Input() namePet: string = '';
  @Input() nameRefugio: string = '';
  @Input() userAdopcion: string = '';
  @Input() status: string = '';
  @Input() idAdopcion?: number;

  showIds: boolean = false;
  estado: string = '';
  adopciones: AdopcionResponse[] = [];
  adopcionSeleccionada?: AdopcionResponse;

  constructor(private adopcionesService: AdopcionService) {}

  ngOnInit(): void {
    this.viewAdopciones();
  }

  cambiarEstado(): void {
    if (!this.adopcionSeleccionada) {
      console.error('No hay adopción seleccionada para cambiar el estado.');
      return;
    }

    const estados = ['rechazado', 'proceso', 'aceptado'];
    const currentIndex = estados.indexOf(this.estado);
    this.estado = estados[(currentIndex + 1) % estados.length];

    console.log('Nuevo estado:', this.estado);

    this.actualizarEstadoAdopcion(this.adopcionSeleccionada.id_adopcion, this.estado);
  }

  actualizarEstadoAdopcion(idAdopcion: number, nuevoEstado: string): void {
    this.adopcionesService.updateAdopcion(idAdopcion, nuevoEstado).subscribe({
      next: (response) => {
        console.log('Estado actualizado exitosamente:', response);
        this.viewAdopciones();
      },
      error: (error) => {
        console.error('Error al actualizar el estado:', error);
        alert('No se pudo actualizar el estado de la adopción.');
      }
    });
  }

  viewAdopciones(): void {
    const entityId = 0; // Ajusta según sea necesario
    this.adopcionesService.getAllAdopciones(entityId).subscribe({
      next: (response: AdopcionResponse[]) => {
        console.log('Adopciones obtenidas:', response);
        this.adopciones = response;

        if (this.adopciones.length > 0) {
          this.adopcionSeleccionada = this.idAdopcion
            ? this.adopciones.find(adopcion => adopcion.id_adopcion === this.idAdopcion)
            : this.adopciones[0];

          this.estado = this.adopcionSeleccionada?.id_status || '';
        }
      },
      error: (error) => {
        console.error('Error al obtener las adopciones:', error);
        alert('Hubo un error al cargar las adopciones.');
      }
    });
  }
}
