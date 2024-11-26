import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { EntidadService } from '../../services/entidad/entidad.service';
import { MapsService } from '../../services/ubicacion/maps.service';
import { GmailService } from '../../services/gmail/gmail.service';
import { ModalExitoComponent } from "../../components/modal-exito/modal-exito.component";
import { ModalWarningComponent } from "../../components/modal-warning/modal-warning.component";
import { ModalErrorComponent } from "../../components/modal-error/modal-error.component";

@Component({
  selector: 'app-registrar-veterinaria',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, GoogleMapsModule, ReactiveFormsModule, ModalExitoComponent, ModalWarningComponent, ModalErrorComponent],
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
  title = 'Google Maps with Geolocation';
  latitude!: number;
  longitude!: number;
  zoom = 15;
  
  entidadForm: FormGroup;
  selectedFile: File | null = null;
  fileName: any;

  isMapVisible = true;

  showModalWarning : boolean = false;
  showModalError : boolean = false;
  showModalExito : boolean = false;

  toggleMap() : void {
    this.isMapVisible = !this.isMapVisible;
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private entidadService: EntidadService,
    private geolocationService: MapsService,
    private gmailService: GmailService
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
      location: [''], 
      id_user: [parsedUserId, Validators.required],
    });

    console.log('ID de usuario cargado desde localStorage:', parsedUserId);
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
      }
    };
    fileInput.click();
  }

  enviarRefugio(): void {
    console.log('Estado del formulario:', this.entidadForm.valid);
    
    if (this.entidadForm.invalid || !this.selectedFile) {
      this.showModalWarning = true;
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
      next: async (response: any) => {
        console.log('Entidad creada exitosamente', response);
        await this.enviarCorreoBienvenida(this.entidadForm.value.email, this.entidadForm.value.name);
        this.router.navigate([`perfil-veterinaria/${response.id}`]);
        this.showModalExito = true;
      },
      error: (err: any) => {
        console.error('Error al crear la entidad', err);
        this.showModalError = true;
      }
    });
  }

  async enviarCorreoBienvenida(email: string, name: string) {
    const subject = 'Bienvenido a nuestra plataforma';
    const body = `
      <p>Hola ${name},</p>
      <p>Tu registro de veterinaria se ha completado exitosamente.</p>
      <p>Gracias por formar parte de nuestra comunidad.</p>
    `;

    this.gmailService.gapiLoaded$.subscribe(async (isLoaded) => {
      if (isLoaded) {
        try {
          await this.gmailService.sendEmail(email, subject, body);
          console.log('Correo de bienvenida enviado');
        } catch (error) {
          console.error('Error al enviar el correo de bienvenida:', error);
        }
      } else {
        console.error('gapi no está listo');
      }
    });
  }

  closeModalWarning() {
    this.showModalWarning = false;
  }

  closeModalError() {
    this.showModalError = false;
  }

  closeModalExito() {
    this.showModalExito = false;
  }

  ngOnInit() {
    this.getUserLocation();
  }

  getUserLocation() {
    this.geolocationService.getCurrentPosition()
      .then(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        const locationString = `${this.latitude},${this.longitude}`;
        this.entidadForm.get('location')?.setValue(locationString);
        console.log(`Ubicación asignada al formulario: ${locationString}`);
      })
      .catch(error => {
        console.error('Error al obtener la ubicación', error);
        alert('Ocurrió un error al intentar obtener la ubicación.');
      });
  }

  
}
