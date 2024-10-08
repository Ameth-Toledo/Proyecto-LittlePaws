import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-donaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-donaciones.component.html',
  styleUrl: './card-donaciones.component.scss'
})
export class CardDonacionesComponent {
  @Input() tituloDonacion : string = '';
  @Input() imagenCausa : string = '';
  @Input() descripcionCausa :string = '';
  @Input() porcentajeDonacion : string = '';
  @Input() metaDonacion : string = '';
  @Input() cantidadDonada : string = '';

  modalAbierto: boolean = false;
  cantidadDonacion: number | null = null;

  abrirModal() {
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.cantidadDonacion = null; // Reinicia la cantidad al cerrar
  }

  realizarDonacion() {
    if (this.cantidadDonacion) {
      // Lógica para procesar la donación
      console.log(`Donación de ${this.cantidadDonacion} realizada.`);
      this.cerrarModal(); // Cierra el modal después de realizar la donación
    } else {
      alert("Por favor, ingresa una cantidad válida."); // Alerta si no se ingresa cantidad
    }
  }
}
