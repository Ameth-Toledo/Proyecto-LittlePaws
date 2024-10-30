import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { BannerComponent } from "../../components/banner/banner.component";
import { Router } from '@angular/router';
import { AdopcionService } from '../../services/adopcion/adopcion.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-adopcion',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, BannerComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './adopcion.component.html',
  styleUrls: ['./adopcion.component.scss']
})
export class AdopcionComponent implements OnInit {
  adopcionForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private adopcionService: AdopcionService
  ) {
    this.adopcionForm = this.fb.group({
      id_mascota: [1, Validators.required],
      id_usuario: [localStorage.getItem('user_id'), Validators.required],
      fecha_adopcion: [new Date().toISOString().split('T')[0], Validators.required],
      curp: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]{18}$/)]],
      imagen: ['http://example.com/image.png'],
      seguimiento: ['Pending'],
      observaciones: ['First adoption attempt', Validators.required],
      condiciones: ['Adopter must provide a suitable home.', Validators.required],
      status: ['pending', Validators.required],
      name: [localStorage.getItem('username'), Validators.required],
      email: [localStorage.getItem('email'), [Validators.required, Validators.email]],
      direccion: ['123 Main St, Springfield', Validators.required],
      cellphone: ['5551234', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      agreement: [false, Validators.requiredTrue]  // Add this line
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
      console.log('Form Data to Submit:', formData); // Log the data to inspect
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
}
