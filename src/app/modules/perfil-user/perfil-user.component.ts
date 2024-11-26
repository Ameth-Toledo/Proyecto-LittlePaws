import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Router } from '@angular/router';
import { MascotasExtraviadas } from '../../models/mascotas-extraviadas'; 
import { MascotasExtraviadasService } from '../../services/mascotas_e/mascotas-extraviadas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil-user',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.scss']
})
export class PerfilUserComponent {
  @Input() nameUser: string = '';
  @Input() emailUser: string = '';
  mascota: any = {};
  usuarioId: number | null = null;  
  selectedFile: any;
  fileName: any;

  constructor(
    private router: Router,
    private mascotasService: MascotasExtraviadasService,
  ) {
    this.obtenerUsuarioId();  
  }

  obtenerUsuarioId() {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.usuarioId = parseInt(userId, 10);
    } else {
      console.error('No se encontró el usuario_id en el localStorage');
    }
  }

  enviarDenunciasForm(event: Event) {
    event.preventDefault();
    this.router.navigate(['/denuncias-form']);
  }

  enviarAdopcionesUser(event : Event) {
    event.preventDefault();
    this.router.navigate(['ver-adopciones-user']);
  }

  abrirModal() {
    const modal = document.getElementById('modal-add-mascotas');
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  abrirModalEditProfile() {
    const modal = document.getElementById('modal-edit-profile');
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.mascota.file = file;
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        const imagePreview = document.getElementById('image-preview') as HTMLImageElement;
        if (imagePreview) {
          imagePreview.src = imageUrl;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput(): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.fileName = file.name;
        this.selectedFile = file;
        this.mascota.file = file;
      }
    };
    fileInput.click();
  }

  cerrarModal() {
    const modal = document.getElementById('modal-add-mascotas');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  cerrarModalEditProfile() {
    const modal = document.getElementById('modal-edit-profile');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  crearMascota() {
    if (!this.usuarioId) {
      console.error('El usuario_id no está disponible');
      return;
    }
  
    if (!this.isValidDate(this.mascota.fecha_extravio)) {
      console.error('La fecha de extravío no es válida');
      return;
    }
    const formData = new FormData();
    formData.append('nombre', this.mascota.nombre);
    formData.append('raza', this.mascota.raza);
    formData.append('edad', this.mascota.edad.toString());
    formData.append('sexo', this.mascota.sexo);
    formData.append('especie', this.mascota.especie);
    formData.append('telefono', this.mascota.telefono);
    formData.append('direccion', this.mascota.direccion);
    formData.append('usuario_id', this.usuarioId.toString());
    formData.append('descripcion', this.mascota.descripcion);
  
    const fechaExtrav = new Date(this.mascota.fecha_extravio).toISOString().split('T')[0];
    formData.append('fecha_extravio', fechaExtrav);
  
    const fechaPublicacion = new Date().toISOString().split('T')[0];
    formData.append('fecha_publicacion', fechaPublicacion);
  
    if (this.mascota.file) {
      const fileExtension = this.mascota.file.name.split('.').pop();
      if (!['jpg', 'jpeg', 'png'].includes(fileExtension)) {
        console.error('Archivo inválido. Debe ser .jpg, .jpeg o .png');
        return;
      }
      formData.append('file', this.mascota.file, this.mascota.file.name);
    } else {
      console.error('No se seleccionó un archivo');
      return;
    }

    console.log('Datos enviados en el formulario:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
  
    this.mascotasService.createMascotaExtraviada(formData).subscribe(
      (response: MascotasExtraviadas) => {
        console.log('Mascota extraviada creada:', response);
        this.cerrarModal();
      },
      error => {
        console.error('Error al crear la mascota extraviada:', error);
      }
    );
  }
  
  isValidDate(date: any): boolean {
    return !isNaN(Date.parse(date));
  }
}