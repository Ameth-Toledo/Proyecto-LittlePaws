import { Component, Input } from '@angular/core';
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

export class CardAdopcionesComponent {
  @Input() namePet: string = '';
  @Input() nameRefugio: string = '';
  @Input() userAdopcion: string = '';
  @Input() status: string = '';
  @Input() idAdopcion: number | undefined;
  showIds: boolean = false;
  estado: string = '';

  adopciones: AdopcionResponse[] = [];
  adopcionSeleccionada: AdopcionResponse | undefined;

  constructor(private adopcionesService: AdopcionService) {}

  ngOnInit() {
    this.view_adopciones();
  }

  cambiarEstado() {
    if (this.adopcionSeleccionada) {
      switch (this.estado) {
        case 'rechazado':
          this.estado = 'proceso';
          break;
        case 'proceso':
          this.estado = 'aceptado';
          break;
        case 'aceptado':
          this.estado = 'rechazado';
          break;
      }
      console.log('Nuevo estado:', this.estado);
      this.actualizarEstadoAdopcion(this.adopcionSeleccionada.id_adopcion, this.estado);
    } else {
      console.error('No se pudo obtener la adopción seleccionada.');
    }
  }

  actualizarEstadoAdopcion(idAdopcion: number, nuevoEstado: string) {
    const idAdopcionNum = Number(idAdopcion);
    if (isNaN(idAdopcionNum)) {
      console.error('El ID de adopción es inválido:', idAdopcion);
      return;
    }

    this.adopcionesService.updateAdopcion(idAdopcionNum, nuevoEstado).subscribe(
      (response) => {
        console.log('Adopción actualizada:', response);
        this.view_adopciones();
      },
      (error) => {
        console.error('Error al actualizar adopción:', error);
        alert('Hubo un error al actualizar el estado de la adopción.');
      }
    );
  }

  view_adopciones() {
    this.adopcionesService.getAdopciones().subscribe(
      (response: AdopcionResponse[]) => {
        console.log('Adopciones obtenidas:', response);
        this.adopciones = response;
        
        if (this.adopciones.length > 0) {
          if (this.idAdopcion) {
            this.adopcionSeleccionada = this.adopciones.find(adopcion => adopcion.id_adopcion === this.idAdopcion);
          } else {
            this.adopcionSeleccionada = this.adopciones[0];
          }

          if (this.adopcionSeleccionada) {
            this.estado = this.adopcionSeleccionada.id_status;
          }
        }
      },
      (error: any) => {
        console.error('Error al obtener adopciones:', error);
        alert('Hubo un error al obtener las adopciones.');
      }
    );
  }
}
