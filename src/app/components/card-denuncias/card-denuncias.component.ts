import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DenunciaCommentsService } from '../../services/denunciaCommets/denuncia-comments.service'; 
import { RegisterService } from '../../services/register/register.service';

@Component({
  selector: 'app-card-denuncias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-denuncias.component.html',
  styleUrls: ['./card-denuncias.component.scss']
})
export class CardDenunciasComponent implements OnInit {
  @Input() nombre!: string;
  @Input() descripcion!: string;
  @Input() imagenes!: string[]; 
  @Input() name!: string;
  @Input() id_denuncia!: number;  
  @Input() estado!: string ;
  
  comentario: string = '';
  comentarios: string[] = []; 
  showIds: boolean = false;
  modalVisible = false;  
  imagenCompletaVisible = false;
  imagenSeleccionada: string | null = null;
  idUser: number | null = null;

  constructor(
    private denunciasComentariosService: DenunciaCommentsService,
  ) {
    this.obtenerUsuarioActual();
  }

  ngOnInit(): void {
    console.log('ID de denuncia recibido:', this.id_denuncia); 
  }

  obtenerUsuarioActual() {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.idUser = parseInt(userId);
    }
  }

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

  enviarComentario() {
    if (this.comentario.trim() && this.idUser !== null && this.id_denuncia !== undefined) {
      const comentarioData = {
        id_denuncia: this.id_denuncia,  
        id_user: this.idUser,          
        comentario: this.comentario,
        fecha: new Date().toISOString().split('T')[0] 
      };

      console.log('Datos enviados al servidor:', comentarioData);

      this.denunciasComentariosService.createComentario(comentarioData).subscribe(
        (response: any) => {
          console.log('Comentario enviado correctamente', response);
          this.comentarios.push(this.comentario);
          this.comentario = '';
        },
        (error: any) => {
          console.error('Error al enviar comentario', error);
          alert('Hubo un problema al enviar el comentario.');
        }
      );
    } else {
      alert('Por favor, escribe un comentario válido y asegúrate de que el usuario y la denuncia estén correctamente asignados.');
    }
  }
}
