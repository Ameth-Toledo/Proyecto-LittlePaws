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
    id_usuario: 1,
    motivo: '',
    id_institucion: 1, 
    descripcion: '',
    id_mascota: 0, 
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
        this.selectedImages = this.selectedImages.concat(images); 
      }).catch(error => {
        console.error('Error leyendo archivos:', error);
      });
    }
  }

  submitDenuncia(): void {
    this.denunciaRequest.imagen = this.selectedImages.join(','); 
    this.denunciasService.createDenuncia(this.denunciaRequest).subscribe({
      next: (response: DenunciaResponse) => {
        console.log('Denuncia creada:', response);
        this.router.navigate(['/some-route']); 
      },
      error: (error: any) => {
        console.error('Error al crear la denuncia:', error);
      }
    });
  }

  uploadImage(): void {
    const input = document.getElementById('imagenes') as HTMLInputElement;
    if (input) {
      input.click(); 
    }
  }
}
