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
  modalExito : boolean = false;
  modalError : boolean = false;
  modalAdvertencia : boolean = false;

  cantidadDonacion: number | null = null;  // Puede ser null

  abrirModal() {
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.modalExito = false;
    this.modalError = false;
    this.modalAdvertencia = false;
    this.cantidadDonacion = null;  
  }

  realizarDonacion() {
    if (this.cantidadDonacion !== null && this.cantidadDonacion > 0) {
        console.log(`Donación de ${this.cantidadDonacion} realizada.`);
        this.modalExito = true;
    } else if (this.cantidadDonacion !== null && this.cantidadDonacion <= 0) {
        this.modalAdvertencia = true;
    } else {
        this.modalError = true;
    }
  }
}
