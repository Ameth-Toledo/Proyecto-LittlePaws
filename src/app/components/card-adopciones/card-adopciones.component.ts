import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-adopciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-adopciones.component.html',
  styleUrl: './card-adopciones.component.scss'
})
export class CardAdopcionesComponent {
  @Input() namePet : string = '';
  @Input() nameRefugio : string = '';
  @Input() userAdopcion : string = '';

  estado : string  = 'Pendiente';

  cambiarEstado() {
    this.estado = this.estado === 'Pendiente' ? 'Revisado' : 'Pendiente';
  }
}
