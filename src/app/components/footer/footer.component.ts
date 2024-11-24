import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComentarioService } from '../../services/comentarios/comentario.service';
import { Comentarios } from '../../models/comentarios';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  isModalOpen = false;
  isAlertVisible = false;
  isThanksModalOpen = false;

  comentarioRequest: Comentarios = {
    content: '',
    createdAt: new Date().toISOString().split('T')[0]
  };

  constructor(private comentariosService: ComentarioService) {}

  openThanksModal() {
    this.isThanksModalOpen = true;
  }

  closeThanksModal() {
    this.isThanksModalOpen = false;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  copyLink() {
    const link = 'https://ameth-toledo.github.io/prueba/';
    navigator.clipboard.writeText(link).then(() => {
      this.showAlert();
    });
  }

  showAlert() {
    this.isAlertVisible = true;
    setTimeout(() => {
      this.isAlertVisible = false;
    }, 3000);
  }

  enviarComentario() {
    if (this.comentarioRequest.content.trim()) {
      this.comentariosService.createComentario(this.comentarioRequest).subscribe(
        (response) => {
          console.log('Comentario enviado con éxito:', response);
          this.comentarioRequest.content = '';
          this.openThanksModal();
        },
        (error) => {
          console.error('Error al enviar el comentario:', error);
        }
      );
    } else {
      console.warn('El comentario no puede estar vacío');
    }
  }
}
