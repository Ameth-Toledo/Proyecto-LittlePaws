import { Component } from '@angular/core';
import { Denuncias } from '../../models/denuncias';
import { FormsModule } from '@angular/forms';
import { DenunciasService } from '../../services/denuncia/denuncia.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-denuncias-form',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, HeaderComponent],
  templateUrl: './denuncias-form.component.html',
  styleUrl: './denuncias-form.component.scss'
})
export class DenunciasFormComponent {
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
      next: (response) => {
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
