import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DenunciasService } from '../../services/denuncia/denuncia.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../../components/banner/banner.component';

@Component({
  selector: 'app-denuncias-form',
  standalone: true,
  imports: [CommonModule, BannerComponent, FooterComponent, HeaderComponent, ReactiveFormsModule],
  templateUrl: './denuncias-form.component.html',
  styleUrl: './denuncias-form.component.scss'
})
export class DenunciasFormComponent {
  fileName: string = '';
  adopcionForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private denunciaService: DenunciasService,
    private router: Router
  ) {
    const userId = localStorage.getItem('user_id');
    const parsedUserId = userId ? Number(userId) : 0; 

    this.adopcionForm = this.fb.group({
      id_usuario: [parsedUserId, Validators.required],
      motivo: ['', Validators.required],
      id_institucion: [null, Validators.required],
      description: ['', Validators.required],
      id_mascota: [null, Validators.required]
    });
  }

  ngOnInit(): void {}

  triggerFileInput(): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.fileName = file.name;
        this.selectedFile = file;
      }
    };
    fileInput.click();
  }

  resetForm(): void {
    const userId = localStorage.getItem('user_id');
    const parsedUserId = userId ? Number(userId) : 0;  

    this.adopcionForm.reset({
      id_usuario: parsedUserId,
      motivo: '',
      id_institucion: null,
      description: '',
      id_mascota: null
    });
  }

  onSubmit(): void {
    if (this.adopcionForm.invalid) {
      console.error('Formulario inválido. Errores:', this.getFormValidationErrors());
      alert('Por favor, complete todos los campos.');
      return;
    }
  
    if (!this.selectedFile) {
      alert('Por favor, seleccione un archivo.');
      return;
    }
  
    console.log('Form Data:', this.adopcionForm.value);
  

    const formData = new FormData();
    formData.append('id_usuario', this.adopcionForm.value.id_usuario?.toString() || '');
    formData.append('motivo', this.adopcionForm.value.motivo);
    formData.append('id_institucion', this.adopcionForm.value.id_institucion?.toString() || ''); 
    formData.append('description', this.adopcionForm.value.descripcion);
    formData.append('id_mascota', this.adopcionForm.value.id_mascota?.toString() || '');
  

    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.denunciaService.createDenuncia(formData).subscribe({
      next: (response) => {
        console.log('Denuncia enviada con éxito:', response);
        alert('Denuncia enviada con éxito');
        this.resetForm();  
      },
      error: (err) => {
        console.error('Error al enviar denuncia:', err);
        if (err.status === 422) {
          console.log('Detalles del error:', err.error?.detail);
          if (err.error?.detail && Array.isArray(err.error.detail)) {
            err.error.detail.forEach((error: any) => {
              console.log(`Campo: ${error.loc.join(' -> ')} | Mensaje: ${error.msg}`);
              alert(`Campo: ${error.loc.join(' -> ')} es obligatorio.`);
            });
          }
          alert('Hubo un error con los datos proporcionados. Verifique los detalles e intente nuevamente.');
        } else {
          alert('Hubo un error al enviar los datos, por favor inténtelo de nuevo.');
        }
      }
    });
  }
  
  getFormValidationErrors(): any {
    const errors: any = {};
    Object.keys(this.adopcionForm.controls).forEach(key => {
      const controlErrors = this.adopcionForm.get(key)?.errors;
      if (controlErrors) {
        errors[key] = controlErrors;
      }
    });
    return errors;
  }
}
