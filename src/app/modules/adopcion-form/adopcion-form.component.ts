import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdopcionService } from '../../services/adopcion/adopcion.service';
import { AdopcionResponse } from '../../models/adopcion';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../../components/banner/banner.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adopcion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BannerComponent, FooterComponent, HeaderComponent],
  templateUrl: './adopcion-form.component.html',
  styleUrls: ['./adopcion-form.component.scss']
})
export class AdopcionFormComponent implements OnInit {
  showIds: boolean = false; 
  fileName: string = '';
  adopcionForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private adopcionService: AdopcionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.adopcionForm = this.fb.group({
      id_mascota: [''], 
      id_usuario: [localStorage.getItem('user_id'), Validators.required],
      fecha_adopcion: [new Date().toISOString().split('T')[0], Validators.required],
      curp: ['', [Validators.required]],
      seguimiento: [''],
      observaciones: ['', Validators.required],
      condiciones: ['', Validators.required],
      id_status: ['proceso', Validators.required],
      id_entidad: [null], 
      name: [localStorage.getItem('username'), Validators.required],
      email: [localStorage.getItem('email'), [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      cellphone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      agreement: [false, Validators.requiredTrue],
    });
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const idMascota = Number(params['id_mascota']);
      const idEntidad = Number(params['id_entidad']);
  
      console.log('Datos obtenidos de la URL:', { idMascota, idEntidad });
  
      if (!isNaN(idMascota) && !isNaN(idEntidad)) {
        this.adopcionForm.patchValue({
          id_mascota: idMascota,
          id_entidad: idEntidad,
        });
  
        console.log('Formulario actualizado con:', this.adopcionForm.value);
      } else {
        console.warn('Parámetros inválidos:', params);
      }
    });
  }
  
  
  
  enviarTerminos(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/terms-and-conditions']);
  }

  triggerFileInput(): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.fileName = file.name;
        console.log('Archivo seleccionado:', file.name); 
      }
    };
    fileInput.click();
  }

  resetForm(): void {
    this.adopcionForm.reset({
      id_mascota: null,
      id_usuario: null,
      fecha_adopcion: '',
      curp: '',
      imagen: '',
      seguimiento: '',
      observaciones: '',
      condiciones: '',
      id_status: '',
      name: '',
      email: '',
      direccion: '',
      cellphone: '',
      agreement: false
    });
  }

  onSubmit(): void {
    if (this.adopcionForm.invalid) {
      console.error('Formulario inválido. Errores:', this.getFormValidationErrors());
      return;
    }
  
    const formData = new FormData();
    Object.entries(this.adopcionForm.value).forEach(([key, value]) => {
        if (key === 'id_mascota' || key === 'id_entidad') {
        formData.append(key, value as string);
      } else {
        formData.append(key, value as string);
      }
    });
  
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name); 
    }
  
    this.adopcionService.createAdopcion(formData).subscribe(
      (response: AdopcionResponse) => {
        console.log('Adopción creada:', response);
      },
      (error: any) => {
        console.error('Error al crear la adopción:', error);
      }
    );
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
