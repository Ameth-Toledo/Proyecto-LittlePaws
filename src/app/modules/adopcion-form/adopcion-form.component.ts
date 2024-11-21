import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { BannerComponent } from "../../components/banner/banner.component";
import { Router } from '@angular/router';
import { AdopcionService } from '../../services/adopcion/adopcion.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-adopcion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BannerComponent, FooterComponent, HeaderComponent],
  templateUrl: './adopcion-form.component.html',
  styleUrl: './adopcion-form.component.scss'
})
export class AdopcionFormComponent {
  adopcionForm: FormGroup;
  fileName : string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private adopcionService: AdopcionService
  ) {
    this.adopcionForm = this.fb.group({
      id_mascota: [ null , Validators.required],
      id_usuario: [localStorage.getItem('user_id'), Validators.required],
      fecha_adopcion: [new Date().toISOString().split('T')[0], Validators.required],
      curp: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]{18}$/)]],
      imagen: ['http://example.com/image.png'],
      seguimiento: ['Pending'],
      observaciones: [' ', Validators.required],
      condiciones: [' ', Validators.required],
      status: ['pending', Validators.required],
      name: [localStorage.getItem('username'), Validators.required],
      email: [localStorage.getItem('email'), [Validators.required, Validators.email]],
      direccion: [' ', Validators.required],
      cellphone: [' ', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      agreement: [false, Validators.requiredTrue]  
    });
  }

  ngOnInit(): void {}

  enviarTerminos(event: Event) {
    event.preventDefault();
    this.router.navigate(['/terms-and-conditions']);
  }

  onSubmit() {
    if (this.adopcionForm.valid) {
      const formData = this.adopcionForm.value;
      console.log('Form Data to Submit:', formData); 
      this.adopcionService.createAdopcion(formData).subscribe(
        (response: any) => {
          console.log('Adopción creada con éxito:', response);
        },
        (error: any) => {
          console.error('Error al crear adopción:', error);
          if (error.error.detail) {
            console.error('Validation Errors:', error.error.detail);
          }
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }

  resetForm() {
    this.adopcionForm.reset({
      id_mascota: null,
      id_usuario: null,
      fecha_adopcion: '',
      curp: '',
      imagen: '',
      seguimiento: '',
      observaciones: '',
      condiciones: '',
      status: '',
      name: '',
      email: '',
      direccion: '',
      cellphone: '',
      agreement: false
    });
  }  

  triggerFileInput(): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.fileName = file.name;
      }
    };
    fileInput.click();
  }
}
