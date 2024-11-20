import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapaComponent } from '../../components/mapa/mapa.component';
import { EntidadService } from '../../services/entidad/entidad.service';

@Component({
  selector: 'app-registrar-veterinaria',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, GoogleMapsModule, MapaComponent, ReactiveFormsModule],
  templateUrl: './registrar-veterinaria.component.html',
  styleUrls: ['./registrar-veterinaria.component.scss']
})
export class RegistrarVeterinariaComponent {
  refugioData: any = {
    name: '',
    phone: '',
    email: '',
    address: '',
    hours: '',
    location: '',
    social_networks: '',
    fotoPerfil: '',
    description: '',
    id_user: ''
  };
  entidadForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private entidadService: EntidadService
  ) {
    const userId = localStorage.getItem('user_id');
    const parsedUserId = userId ? Number(userId) : 0;

    this.entidadForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      cellphone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      social_networks: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      hours_operation: ['', Validators.required],
      location: [''], // Campo opcional
      id_user: [parsedUserId, Validators.required],
    });

    console.log('ID de usuario cargado desde localStorage:', parsedUserId);
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      this.selectedFile = input.files[0];
      console.log('Archivo seleccionado:', this.selectedFile.name);
    } else {
      console.log('No se seleccionó ningún archivo.');
    }
  }

  enviarRefugio(): void {
    console.log('Estado del formulario:', this.entidadForm.valid);
    Object.keys(this.entidadForm.controls).forEach((key) => {
      console.log(`${key}:`, this.entidadForm.controls[key].errors);
    });

    if (this.entidadForm.invalid || !this.selectedFile) {
      alert('Por favor completa todos los campos correctamente.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.entidadForm.value.name);
    formData.append('address', this.entidadForm.value.address);
    formData.append('description', this.entidadForm.value.description);
    formData.append('type', this.entidadForm.value.type);
    formData.append('cellphone', this.entidadForm.value.cellphone);
    formData.append('social_networks', this.entidadForm.value.social_networks);
    formData.append('email', this.entidadForm.value.email);
    formData.append('hours_operation', this.entidadForm.value.hours_operation);
    formData.append('location', this.entidadForm.value.location || '');
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('id_user', this.entidadForm.value.id_user);

    console.log('Datos a enviar:', formData);

    this.entidadService.createEntidad(this.entidadForm.value.id_user, formData).subscribe({
      next: (response: any) => {
        console.log('Entidad creada exitosamente', response);
        this.router.navigate([`perfil-refugio/${response.name.replace(/\s+/g, '-').toLowerCase()}`]);
      },
      error: (err: any) => {
        console.error('Error al crear la entidad', err);
        alert('Ocurrió un error al crear la entidad.');
      }
    });
  }
}
