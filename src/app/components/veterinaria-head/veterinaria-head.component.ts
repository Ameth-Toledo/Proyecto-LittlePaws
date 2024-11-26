import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-veterinaria-head',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './veterinaria-head.component.html',
  styleUrl: './veterinaria-head.component.scss'
})
export class VeterinariaHeadComponent {
  modalAbierto = false
  cantidadDonacion: number | null = null;

  @Input() tituloDonacion: string = '';

  @Input() nameVeterinaria : string = '';
  @Input() descripcionVeterinaria : string = '';
  @Input() imgSrc : string = '';
  @Input() telefonoVeterinaria : string = '';
  @Input() emailVeterinaria : string = '';
  @Input() direccionVeterinaria : string = '';
  @Input() horarioVeterinaria : string = '';

  cerrarModal() {
    this.modalAbierto = false;
  }

  abrirModal() {
    this.modalAbierto = true;
  }  
} 
