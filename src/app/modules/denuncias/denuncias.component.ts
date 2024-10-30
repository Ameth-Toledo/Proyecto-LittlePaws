import { Component } from '@angular/core';
import { DenunciaResponse, Denuncias } from '../../models/denuncias';
import { FormsModule } from '@angular/forms';
import { DenunciasService } from '../../services/denuncia/denuncia.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-denuncias',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './denuncias.component.html',
  styleUrls: ['./denuncias.component.scss']
})
export class DenunciasComponent {
  denunciaRequest: Denuncias = {
    id_usuario: 1, // Cambia esto según el contexto del usuario logueado
    motivo: '',
    id_institucion: 1, // Cambia esto según el contexto de la institución
    descripcion: '',
    id_mascota: 0, // Asegúrate de que este valor se asigne correctamente
    imagen: ''
  };

  selectedImages: string[] = [];

  constructor(private denunciasService: DenunciasService, private router: Router) {}

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      const fileReaders = files.map(file => {
        const reader = new FileReader();
        return new Promise<string>((resolve, reject) => {
          reader.onload = (e: any) => resolve(e.target.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(fileReaders).then(images => {
        this.selectedImages = this.selectedImages.concat(images); // Combina nuevas imágenes con las existentes
      }).catch(error => {
        console.error('Error leyendo archivos:', error);
      });
    }
  }

  submitDenuncia(): void {
    // Asegúrate de que el id_mascota tenga un valor antes de enviarlo
    this.denunciaRequest.imagen = this.selectedImages.join(','); // Enviar imágenes como una cadena separada por comas
    this.denunciasService.createDenuncia(this.denunciaRequest).subscribe({
      next: (response: DenunciaResponse) => {
        console.log('Denuncia creada:', response);
        // Opcionalmente navegar o mostrar un mensaje de éxito
        this.router.navigate(['/some-route']); // Cambia a la ruta deseada
      },
      error: (error: any) => {
        console.error('Error al crear la denuncia:', error);
      }
    });
  }

  uploadImage(): void {
    const input = document.getElementById('imagenes') as HTMLInputElement;
    if (input) {
      input.click(); // Abrir el explorador de archivos
    }
  }
}
