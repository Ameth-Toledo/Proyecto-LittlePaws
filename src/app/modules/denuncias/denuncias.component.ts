import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CardDenunciasComponent } from "../../components/card-denuncias/card-denuncias.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-denuncias',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, CardDenunciasComponent],
  templateUrl: './denuncias.component.html',
  styleUrl: './denuncias.component.scss'
})
export class DenunciasComponent {
  selectedImages: string[] = [];
  currentEditIndex: number | null = null;

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0]; // Solo tomamos el primer archivo para reemplazar
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (this.currentEditIndex !== null) {
          this.selectedImages[this.currentEditIndex] = e.target.result; // Reemplazar imagen
          this.currentEditIndex = null; // Restablecer el índice
        } else {
          this.selectedImages.push(e.target.result); // Agregar la imagen leída
        }
      };

      reader.readAsDataURL(file); // Leer la imagen como URL
    }
  }

  uploadImage(): void {
    const input = document.getElementById('imagenes') as HTMLInputElement;
    if (input) {
      input.click(); // Abrir el explorador de archivos al hacer clic en el botón
    }
  }

  editImage(): void {
    // Establecemos el índice del elemento que deseamos editar (puedes implementar lógica adicional si necesitas seleccionar cuál editar)
    this.currentEditIndex = this.selectedImages.length > 0 ? this.selectedImages.length - 1 : null; // Por ahora editamos la última imagen
    const input = document.getElementById('imagenes') as HTMLInputElement;
    if (input) {
      input.click(); // Abrir el explorador de archivos para seleccionar una nueva imagen
    }
  }
}
