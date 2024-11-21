import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-denuncias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-denuncias.component.html',
  styleUrl: './card-denuncias.component.scss'
})
export class CardDenunciasComponent {
  @Input() nombre!: string;
  @Input() descripcion!: string;
  @Input() imagenes!: string[]; 

  estado : string  = 'Pendiente';

  modalVisible = false;  
  imagenCompletaVisible = false;
  imagenSeleccionada : string | null = null;

  toggleModal() {
    this.modalVisible = !this.modalVisible;  
  }

  verImagenCompleta(imagen : string) {
    this.imagenSeleccionada = imagen;
    this.imagenCompletaVisible = true;
  }

  cerrarImagenCompleta() {
    this.imagenCompletaVisible = false;
    this.imagenSeleccionada = null;
  }

  cambiarEstado() {
    this.estado = this.estado === 'Pendiente' ? 'Revisado' : 'Pendiente';
  }
}
