import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdopcionResponse } from '../../models/adopcion';
import { AdopcionService } from '../../services/adopcion/adopcion.service';
import { GmailService } from '../../services/gmail/gmail.service';  // Import the GmailService

@Component({
  selector: 'app-card-adopciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-adopciones.component.html',
  styleUrls: ['./card-adopciones.component.scss']
})
export class CardAdopcionesComponent implements OnInit {
  @Input() namePet: string = '';
  @Input() nameRefugio: string = '';
  @Input() userAdopcion: string = '';
  @Input() status: string = '';
  @Input() idAdopcion?: number;

  showIds: boolean = false;
  estado: string = '';
  adopciones: AdopcionResponse[] = [];
  adopcionSeleccionada?: AdopcionResponse;

  constructor(
    private adopcionesService: AdopcionService,
    private gmailService: GmailService  // Inject GmailService
  ) {}

  ngOnInit(): void {
    this.viewAdopciones();
  }

  cambiarEstado(): void {
    if (!this.adopcionSeleccionada) {
      console.error('No hay adopción seleccionada para cambiar el estado.');
      return;
    }

    const estados = ['rechazado', 'proceso', 'aceptado'];
    const currentIndex = estados.indexOf(this.estado);
    this.estado = estados[(currentIndex + 1) % estados.length];

    console.log('Nuevo estado:', this.estado);

    this.actualizarEstadoAdopcion(this.adopcionSeleccionada.id_adopcion, this.estado);
  }

  actualizarEstadoAdopcion(idAdopcion: number, nuevoEstado: string): void {
    this.adopcionesService.updateAdopcion(idAdopcion, nuevoEstado).subscribe({
      next: (response) => {
        console.log('Estado actualizado exitosamente:', response);
        this.viewAdopciones();
        
        // Enviar correo solo si el estado es 'aceptado' o 'rechazado'
        if (nuevoEstado === 'aceptado' || nuevoEstado === 'rechazado') {
          this.enviarCorreoNotificacion(this.adopcionSeleccionada?.id_usuario, nuevoEstado);
        }
      },
      error: (error) => {
        console.error('Error al actualizar el estado:', error);
        alert('No se pudo actualizar el estado de la adopción.');
      }
    });
  }

  viewAdopciones(): void {
    const entityId = 0;  // Esto probablemente deba cambiar según la lógica de tu app
    this.adopcionesService.getAllAdopciones(entityId).subscribe({
      next: (response: AdopcionResponse[]) => {
        console.log('Adopciones obtenidas:', response);
        this.adopciones = response;

        if (this.adopciones.length > 0) {
          this.adopcionSeleccionada = this.idAdopcion
            ? this.adopciones.find(adopcion => adopcion.id_adopcion === this.idAdopcion)
            : this.adopciones[0];

          this.estado = this.adopcionSeleccionada?.id_status || '';
        }
      },
      error: (error) => {
        console.error('Error al obtener las adopciones:', error);
        alert('Hubo un error al cargar las adopciones.');
      }
    });
  }

  enviarCorreoNotificacion(id_usuario: number | undefined, estado: string): void {
    const subject = `Estado de tu adopción: ${estado}`;
    const body = `
      <p>Hola,</p>
      <p>Tu adopción ha sido ${estado}.</p>
      <p>Gracias por tu interés en adoptar.</p>
      <p>Atentamente,</p>
      <p>El equipo de adopciones.</p>
    `;

    if (id_usuario) {
      this.gmailService.gapiLoaded$.subscribe(async (isLoaded) => {
        if (isLoaded) {
          try {
            const userEmail = localStorage.getItem('email'); 
            if (userEmail) {
              // Enviar correo con el email del usuario
              await this.gmailService.sendEmail(userEmail, subject, body);
              console.log('Correo de notificación enviado');
            } else {
              console.error('No se pudo obtener el correo del usuario desde localStorage');
            }
          } catch (error) {
            console.error('Error al enviar el correo de notificación:', error);
          }
        } else {
          console.error('gapi no está listo');
        }
      });
    } else {
      console.error('El id_usuario no está definido, no se enviará el correo.');
    }
  }
}
