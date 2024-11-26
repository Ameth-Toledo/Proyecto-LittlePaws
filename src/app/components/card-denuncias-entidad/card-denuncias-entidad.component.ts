import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DenunciaCommentsService } from '../../services/denunciaCommets/denuncia-comments.service';
import { DenunciasService } from '../../services/denuncia/denuncia.service';

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
  @Input() id_denuncia!: number;
  @Input() name!: string;
  idUser: number | null = null;
  showIds: boolean = false;

  constructor(
    private denunciasComentariosService: DenunciaCommentsService, private denunciasServices: DenunciasService,
  ) {
    this.obtenerUsuarioActual();
  }

  obtenerUsuarioActual() {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.idUser = parseInt(userId);
    }
  }
  
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
  actualizarSeguimiento() {
    const entidadId = localStorage.getItem('id_entidad');
    
    if (this.id_denuncia && this.idUser && entidadId) {
      const today = new Date().toISOString().split('T')[0]; 
      const seguimientoData = {
        seguimiento: true,
        id_entidad: parseInt(entidadId), 
        id_user: this.idUser, 
        id_denuncia: this.id_denuncia, 
        fecha: today,
      };
  
      console.log('Datos de seguimiento enviados:', seguimientoData);
  
      this.denunciasServices.updateSeguimiento(this.id_denuncia, seguimientoData).subscribe(
        (response: any) => {
          console.log('Seguimiento actualizado con éxito:', response);
          alert('El seguimiento se actualizó correctamente.');
        },
        (error: any) => {
          console.error('Error al actualizar el seguimiento:', error);
          alert('Hubo un problema al actualizar el seguimiento.');
        }
      );
    } else {
      alert('Por favor, asegúrate de que los datos sean correctos.');
    }
  }
  


  cerrarImagenCompleta() {
    this.imagenCompletaVisible = false;
    this.imagenSeleccionada = null;
  }

  seguirDenuncia() {
    alert('Ahora estás siguiendo esta denuncia.');
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
