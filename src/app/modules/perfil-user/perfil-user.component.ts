import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MascotasExtraviadasService } from '../../services/mascotas_e/mascotas-extraviadas.service';
import { RegisterService } from '../../services/register/register.service';
import { UserUpdate, UserOut, UserCreate } from '../../models/users';
import { MascotasExtraviadas } from '../../models/mascotas-extraviadas';

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
  selectedFile: File | null = null;
  fileName: string | null = null;

  userForm: any = {
    nombre_completo: { name: '', last_name: '' },
    email: '',
    password: '',
    rol: ''
  };

  constructor(
    private router: Router,
    private mascotasService: MascotasExtraviadasService,
    private registerService: RegisterService
  ) {
    this.obtenerUsuarioId();
    this.cargarUsuario();
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

  enviarAdopcionesUser(event: Event) {
    event.preventDefault();
    this.router.navigate(['/ver-adopciones-user']);
  }

  abrirModalEditProfile() {
    const modal = document.getElementById('modal-edit-profile');
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  cerrarModalEditProfile() {
    const modal = document.getElementById('modal-edit-profile');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  
  cargarUsuario() {
    if (this.usuarioId) {
      this.registerService.getUserById(this.usuarioId).subscribe(
        (user: UserOut) => {
          console.log(user);  // Log the user response to see the structure
  
          // Directly assign the name and last name if 'nombre_completo' is an object
          if (user.nombre_completo && user.nombre_completo.name && user.nombre_completo.last_name) {
            const fullName = user.nombre_completo.name;  // Full name like "Milton Vazquez"
            const nameParts = fullName.split(' ');  // Split the name into an array, e.g. ['Milton', 'Vazquez']
            
            // Set name and last_name
            this.userForm.nombre_completo = {
              name: nameParts[0],  // First name "Milton"
              last_name: user.nombre_completo.last_name  // Last name "Vazquez"
            };
  
            this.nameUser = nameParts[0];  // First name "Milton"
            this.emailUser = user.email;
          }
  
          this.userForm.email = user.email;
          this.userForm.rol = user.rol;
          this.emailUser = user.email;
        },
        (error) => console.error('Error al cargar el usuario:', error)
      );
    }
  }
  
  
  

  cerrarModal() {
    const modal = document.getElementById('modal-add-mascotas');
    if (modal) {
      modal.style.display = 'none';
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

  abrirModal() {
    const modal = document.getElementById('modal-add-mascotas');
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  guardarCambios() {
    if (!this.usuarioId) {
      console.error('No se encontró el usuario_id para actualizar');
      return;
    }
  
    this.registerService.updateUser(this.usuarioId, this.userForm as UserCreate).subscribe(
      (updatedUser: UserOut) => {  // Cambiar el tipo de `user` a `UserOut`
        console.log('Usuario actualizado:', updatedUser);
        this.nameUser = updatedUser.nombre_completo.name;  // Actualización según `UserOut`
        this.emailUser = updatedUser.email;
  
        // Aquí ya no es necesario incluir `password`, ya que `UserOut` no lo requiere
        const userUpdate: UserUpdate = {
          nombre_completo: this.userForm.nombre_completo!,
          email: updatedUser.email,
          password: '',  // Puedes asignar un valor vacío o manejarlo según lo necesario
          rol: this.userForm.rol!
        };
  
        console.log('Usuario actualizado (ajustado):', userUpdate);
        this.cerrarModalEditProfile();
      },
      (error) => console.error('Error al actualizar el usuario:', error)
    );
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const imagePreview = document.getElementById('image-preview') as HTMLImageElement;
        if (imagePreview) {
          imagePreview.src = reader.result as string;
        }
      };
      reader.readAsDataURL(this.selectedFile);
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

    if (this.selectedFile) {
      const fileExtension = this.selectedFile.name.split('.').pop()?.toLowerCase();
      if (!['jpg', 'jpeg', 'png'].includes(fileExtension || '')) {
        console.error('Archivo inválido. Debe ser .jpg, .jpeg o .png');
        return;
      }
      formData.append('file', this.selectedFile, this.selectedFile.name);
    } else {
      console.error('No se seleccionó un archivo');
      return;
    }

    this.mascotasService.createMascotaExtraviada(formData).subscribe(
      (response: MascotasExtraviadas) => {
        console.log('Mascota extraviada creada:', response);
        this.cerrarModalEditProfile();
      },
      error => console.error('Error al crear la mascota extraviada:', error)
    );
  }

  isValidDate(date: string): boolean {
    return !isNaN(Date.parse(date));
  }
}
