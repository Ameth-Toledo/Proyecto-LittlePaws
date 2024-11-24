import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-denuncias-entidad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-denuncias-entidad.component.html',
  styleUrl: './card-denuncias-entidad.component.scss'
})
export class CardDenunciasEntidadComponent {
  @Input() nombre!: string;
  @Input() descripcion!: string;
  @Input() imagenes!: string[];

  modalVisible = false;
  imagenCompletaVisible = false;
  imagenSeleccionada: string | null = null;
  comentario: string = '';
  comentarios: string[] = []; 

  toggleModal() {
    this.modalVisible = !this.modalVisible;
  }

  verImagenCompleta(imagen: string) {
    this.imagenSeleccionada = imagen;
    this.imagenCompletaVisible = true;
  }

  cerrarImagenCompleta() {
    this.imagenCompletaVisible = false;
    this.imagenSeleccionada = null;
  }

  seguirDenuncia() {
    alert('Ahora estás siguiendo esta denuncia.');
  }

  enviarComentario() {
    if (this.comentario.trim()) {
      this.comentarios.push(this.comentario); 
      this.comentario = ''; 
    } else {
      alert('Por favor, escribe un comentario válido.');
    }
  }
}
